import { useState, useEffect, useCallback } from 'react';

export default function Timer({ isActive, onTimeUpdate, questionId }) {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId;
    if (isRunning && isActive) {
      intervalId = setInterval(() => {
        setTime(prevTime => {
          const newTime = prevTime + 1;
          onTimeUpdate?.(questionId, newTime);
          return newTime;
        });
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, isActive, onTimeUpdate, questionId]);

  const formatTime = useCallback((seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, []);

  const toggleTimer = useCallback(() => {
    setIsRunning(prev => !prev);
  }, []);

  const resetTimer = useCallback(() => {
    setTime(0);
    setIsRunning(false);
    onTimeUpdate?.(questionId, 0);
  }, [onTimeUpdate, questionId]);

  return (
    <div className="flex items-center space-x-4">
      <div className="text-2xl font-mono font-medium">
        {formatTime(time)}
      </div>
      <div className="space-x-2">
        <button
          onClick={toggleTimer}
          className={`btn ${
            isRunning ? 'btn-secondary' : 'btn-primary'
          }`}
          disabled={!isActive}
        >
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button
          onClick={resetTimer}
          className="btn btn-secondary"
          disabled={!isActive || time === 0}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export function GlobalTimer({ duration = 5400 }) { // 1.5 hours in seconds
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let intervalId;
    if (isActive && timeLeft > 0) {
      intervalId = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
    }
    return () => clearInterval(intervalId);
  }, [isActive, timeLeft]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleTimer = () => {
    setIsActive(prev => !prev);
  };

  const resetTimer = () => {
    setTimeLeft(duration);
    setIsActive(false);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="flex items-center justify-between">
        <div className="text-3xl font-mono font-medium">
          {formatTime(timeLeft)}
        </div>
        <div className="space-x-2">
          <button
            onClick={toggleTimer}
            className={`btn ${isActive ? 'btn-secondary' : 'btn-primary'}`}
            disabled={timeLeft === 0}
          >
            {isActive ? 'Pause' : 'Start Contest'}
          </button>
          <button
            onClick={resetTimer}
            className="btn btn-secondary"
            disabled={timeLeft === duration}
          >
            Reset
          </button>
        </div>
      </div>
      {timeLeft === 0 && (
        <p className="mt-2 text-sm text-red-600 text-center">
          Time's up! Contest ended.
        </p>
      )}
    </div>
  );
} 