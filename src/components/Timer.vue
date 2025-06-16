<script setup>
import { ref, computed, onUnmounted } from 'vue'

const hours = ref(0)
const minutes = ref(0)
const seconds = ref(0)
const isRunning = ref(false)
const timerInterval = ref(null)

const totalSeconds = computed(() => hours.value * 3600 + minutes.value * 60 + seconds.value)

const updateFromTotal = (t) => {
    hours.value = Math.floor(t / 3600)
    minutes.value = Math.floor((t % 3600) / 60)
    seconds.value = t % 60
}

const tick = () => {
    let t = totalSeconds.value
    if (t > 0) {
        t--
        updateFromTotal(t)
    } else {
        stopTimer()
    }
}

const startTimer = () => {
    if (!isRunning.value && totalSeconds.value > 0) {
        isRunning.value = true
        timerInterval.value = setInterval(tick, 1000)
    }
}

const stopTimer = () => {
    isRunning.value = false
    if (timerInterval.value) clearInterval(timerInterval.value)
}

const resetTimer = () => {
    stopTimer()
    hours.value = 0
    minutes.value = 0
    seconds.value = 0
}

const addTime = (s) => {
    let t = totalSeconds.value + s
    if (t < 0) t = 0
    updateFromTotal(t)
}

onUnmounted(() => {
    if (timerInterval.value) clearInterval(timerInterval.value)
})

const onInput = (e, type) => {
    let val = parseInt(e.target.value)
    if (isNaN(val) || val < 0) val = 0
    if (type === 'h') hours.value = val
    if (type === 'm') minutes.value = val > 59 ? 59 : val
    if (type === 's') seconds.value = val > 59 ? 59 : val
}
</script>

<template>
    <div class="timer-container">
        <div class="timer-row">
            <input class="timer-input" type="number" min="00" max="99" :value="hours" @input="e => onInput(e, 'h')"> :
            <input class="timer-input" type="number" min="00" max="59" :value="minutes" @input="e => onInput(e, 'm')"> :
            <input class="timer-input" type="number" min="00" max="59" :value="seconds" @input="e => onInput(e, 's')">
        </div>
        <div class="timer-controls-row">
            <button class="timer-main-btn" @click="isRunning ? stopTimer() : startTimer()">
                <span v-if="!isRunning">Start</span>
                <span v-else>Stop</span>
            </button>
            <button class="timer-btn" @click="resetTimer">Reset</button>
        </div>
    </div>
</template>

<style scoped>
.timer-container {
    background: #fff;
    border: 1px solid #ececec;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
    padding: 12px 18px 10px 18px;
    min-width: 180px;
    max-width: 220px;
    font-family: 'Inter', 'Noto Sans JP', 'Helvetica Neue', Arial, sans-serif;
    color: #222;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
}

.timer-row {
    display: flex;
    align-items: center;
    gap: 2px;
    font-size: 1.5rem;
    margin-bottom: 2px;
}

.timer-input {
    width: 2.1em;
    font-size: 1.3rem;
    background: transparent;
    border: none;
    border-bottom: 1.5px solid #e0e0e0;
    color: #222;
    text-align: center;
    outline: none;
    margin: 0 1px;
    border-radius: 0;
    transition: border 0.2s;
}

.timer-input:focus {
    border-bottom: 1.5px solid #b3b3b3;
}

.timer-btn {
    background: #f7f7f7;
    color: #222;
    border: 1px solid #ececec;
    border-radius: 7px;
    padding: 3px 10px;
    font-size: 0.95rem;
    cursor: pointer;
    transition: background 0.15s, border 0.15s;
}

.timer-btn:hover {
    background: #f0f0f0;
    border: 1px solid #d3d3d3;
}

.timer-controls-row {
    display: flex;
    gap: 8px;
    margin-top: 2px;
    width: 100%;
    justify-content: center;
}

.timer-main-btn {
    background: #fff;
    color: #222;
    border: 1.5px solid #b3b3b3;
    border-radius: 7px;
    font-size: 1rem;
    padding: 3px 18px;
    cursor: pointer;
    font-weight: 500;
    transition: background 0.15s, border 0.15s;
}

.timer-main-btn:hover {
    background: #f7f7f7;
    border: 1.5px solid #888;
}
</style>