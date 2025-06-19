<script setup>
import { ref, onMounted } from 'vue'
import Papa from 'papaparse'

const questions = ref([])
const selectAll = ref(true)
const shuffledQuestions = ref([])

const loadCSV = async () => {
    try {
        const response = await fetch('/core.csv')
        const csvText = await response.text()
        Papa.parse(csvText, {
            header: true,
            complete: (results) => {
                questions.value = results.data.map(q => ({ ...q, selected: true }))
            }
        })
    } catch (error) {
        console.error('Error loading CSV:', error)
    }
}

const toggleSelectAll = () => {
    questions.value.forEach(q => q.selected = selectAll.value)
}

const shuffleQuestions = () => {
    const eligible = questions.value.filter(q => q.selected)
    shuffledQuestions.value = [...eligible].sort(() => Math.random() - 0.5).slice(0, 4)
}

onMounted(() => {
    loadCSV()
})
</script>

<template>
    <div class="qs-container">
        <h2>Question Selector</h2>
        <table class="qs-table">
            <thead>
                <tr>
                    <th><input type="checkbox" v-model="selectAll" @change="toggleSelectAll"></th>
                    <th>Topic</th>
                    <th>Question</th>
                    <th>Difficulty</th>
                    <th>Link</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(q, idx) in questions" :key="q.Link + idx">
                    <td><input type="checkbox" v-model="q.selected"></td>
                    <td>{{ q.Topic }}</td>
                    <td>{{ q.Question }}</td>
                    <td>{{ q.Difficulty }}</td>
                    <td><a :href="q.Link" target="_blank">Solve</a></td>
                </tr>
            </tbody>
        </table>
        <button class="qs-shuffle-btn" @click="shuffleQuestions">Shuffle Selected</button>
        <div v-if="shuffledQuestions.length" class="qs-shuffled">
            <h3>Shuffled Questions</h3>
            <ul>
                <li v-for="q in shuffledQuestions" :key="q.Link">
                    <strong>{{ q.Topic }}</strong>: {{ q.Question }} ({{ q.Difficulty }})
                    <a :href="q.Link" target="_blank">Solve</a>
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
.qs-container {
    max-width: 900px;
    margin: 0 auto;
    padding: 24px 0;
}

.qs-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 18px;
    font-size: 1rem;
}

.qs-table th,
.qs-table td {
    border: 1px solid #eee;
    padding: 6px 10px;
    text-align: left;
}

.qs-table th {
    background: #f8f8f8;
}

.qs-shuffle-btn {
    padding: 8px 18px;
    background: #4CAF50;
    color: #fff;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;
    margin-bottom: 18px;
}

.qs-shuffle-btn:hover {
    background: #388e3c;
}

.qs-shuffled {
    background: #fafafa;
    border: 1px solid #eee;
    border-radius: 6px;
    padding: 12px 18px;
}

.qs-shuffled h3 {
    margin-top: 0;
}

.qs-shuffled ul {
    padding-left: 18px;
}

.qs-shuffled li {
    margin-bottom: 6px;
}
</style>