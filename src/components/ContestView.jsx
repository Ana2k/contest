import { useState, useCallback } from 'react';
import Timer, { GlobalTimer } from './Timer';
import { saveCompletedQuestion, resetCompletedQuestions } from '../utils/filterQuestions';

export default function ContestView({ questions, onGenerateContest }) {
  const [contestQuestions, setContestQuestions] = useState([]);
  const [questionTimes, setQuestionTimes] = useState({});
  const [isContestActive, setIsContestActive] = useState(false);
  const [difficultyCombination, setDifficultyCombination] = useState('medium-hard');

  const handleGenerateContest = useCallback(() => {
    const newContest = onGenerateContest(questions, difficultyCombination);
    setContestQuestions(newContest);
    setQuestionTimes({});
    setIsContestActive(false);
  }, [questions, difficultyCombination, onGenerateContest]);

  const handleTimeUpdate = useCallback((questionId, time) => {
    setQuestionTimes(prev => ({
      ...prev,
      [questionId]: time,
    }));
  }, []);

  const handleQuestionComplete = useCallback((link) => {
    saveCompletedQuestion(link);
    setContestQuestions(prev =>
      prev.map(q =>
        q.link === link ? { ...q, completed: true } : q
      )
    );
  }, []);

  const handleResetHistory = useCallback(() => {
    resetCompletedQuestions();
    setContestQuestions(prev =>
      prev.map(q => ({ ...q, completed: false }))
    );
  }, []);

  return (
    <div className="space-y-6">
      {/* Contest Controls */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="space-x-4">
            <select
              value={difficultyCombination}
              onChange={(e) => setDifficultyCombination(e.target.value)}
              className="select"
            >
              <option value="medium-hard">Medium & Hard</option>
              <option value="hard-only">Hard Only</option>
              <option value="medium-only">Medium Only</option>
              <option value="all">All Difficulties</option>
            </select>
            <button
              onClick={handleGenerateContest}
              className="btn btn-primary"
              disabled={!questions.length}
            >
              Generate Contest
            </button>
            <button
              onClick={handleResetHistory}
              className="btn btn-secondary"
            >
              Reset History
            </button>
          </div>
        </div>
        <GlobalTimer />
      </div>

      {/* Questions List */}
      {contestQuestions.length > 0 && (
        <div className="space-y-4">
          {contestQuestions.map((question, index) => (
            <div
              key={question.link}
              className={`bg-white p-6 rounded-lg shadow-sm ${
                question.completed ? 'opacity-75' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-medium">
                      Question {index + 1}
                    </span>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        question.type === 'Easy'
                          ? 'bg-difficulty-easy text-white'
                          : question.type === 'Medium'
                          ? 'bg-difficulty-medium text-gray-900'
                          : 'bg-difficulty-hard text-white'
                      }`}
                    >
                      {question.type}
                    </span>
                  </div>
                  <a
                    href={question.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    {question.link}
                  </a>
                  <div className="flex flex-wrap gap-2">
                    {question.topics.map(topic => (
                      <span
                        key={topic}
                        className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Timer
                    isActive={isContestActive}
                    onTimeUpdate={handleTimeUpdate}
                    questionId={question.link}
                  />
                  {!question.completed && (
                    <button
                      onClick={() => handleQuestionComplete(question.link)}
                      className="btn btn-primary"
                    >
                      Mark as Done
                    </button>
                  )}
                </div>
              </div>
              {question.completed && (
                <div className="mt-4 text-sm text-gray-600">
                  Completed in {questionTimes[question.link] || 0} seconds
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {!contestQuestions.length && (
        <div className="text-center text-gray-500 py-12">
          Generate a contest to get started
        </div>
      )}
    </div>
  );
} 