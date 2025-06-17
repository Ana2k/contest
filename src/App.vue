<script setup>
import { ref, onMounted } from 'vue'
import Papa from 'papaparse'
import Timer from './components/Timer.vue'

const questions = ref([])
const shuffledQuestions = ref([])

const loadCSV = async () => {
  try {
    const response = await fetch('/core.csv')
    const csvText = await response.text()
    Papa.parse(csvText, {
      header: true,
      complete: (results) => {
        questions.value = results.data
        shuffleQuestions()
      }
    })
  } catch (error) {
    console.error('Error loading CSV:', error)
  }
}

const shuffleQuestions = () => {
  shuffledQuestions.value = [...questions.value]
    .sort(() => Math.random() - 0.5)
    .slice(0, 10) // Get 4 random questions
}

onMounted(() => {
  loadCSV()
})
</script>

<template>
  <div class="container">
    <div class="header">
      <h1>Random Questions</h1>
      <div class="timer-wrapper">
        <Timer />
      </div>
    </div>
    <button @click="shuffleQuestions">Shuffle Questions</button>

    <table>
      <thead>
        <tr>
          <th>Topic</th>
          <th>Question Link</th>
          <th>Difficulty</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="question in shuffledQuestions" :key="question.Link">
          <td>{{ question.Topic }}</td>
          <td><a :href="question.Link" target="_blank">{{ question.Question }}</a></td>
          <td>{{ question.Difficulty }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
}

.timer-wrapper {
  position: sticky;
  top: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f4f4f4;
}

button {
  padding: 8px 16px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 20px 0;
}

button:hover {
  background-color: #45a049;
}

a {
  color: #2196F3;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>