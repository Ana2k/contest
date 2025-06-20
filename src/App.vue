<script setup>
import { ref, onMounted } from 'vue'
import Timer from './components/Timer.vue'
import QuestionSelector from './components/QuestionSelector.vue'
import { useQuestions } from './composables/useQuestions'

const { questions, loadQuestions, selectedQuestions } = useQuestions()
const shuffledQuestions = ref([])
const showSelector = ref(false)

const shuffleQuestions = () => {
  shuffledQuestions.value = [...selectedQuestions.value]
    .sort(() => Math.random() - 0.5)
    .slice(0, 4) // Get 4 random questions
}

onMounted(async () => {
  await loadQuestions()
  shuffleQuestions()
})
</script>

<template>
  <div class="container">
    <div class="nav-tabs">
      <button @click="showSelector = false" :class="{ active: !showSelector }">Shuffle</button>
      <button @click="showSelector = true" :class="{ active: showSelector }">Select Questions</button>
    </div>
    <div v-if="!showSelector">
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
            <!-- <th>Topic</th> -->
            <th>Question Link</th>
            <th>Difficulty</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="question in shuffledQuestions" :key="question.Link">
            <!-- <td>{{ question.Topic }}</td> -->
            <td><a :href="question.Link" target="_blank">{{ question.Question }}</a></td>
            <td>{{ question.Difficulty }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      <QuestionSelector />
    </div>
  </div>
</template>

<!-- STYLE of this page -->
<style>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.nav-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 18px;
}

.nav-tabs button {
  background: #f7f7f7;
  color: #333;
  border: 1px solid #e0e0e0;
  border-radius: 6px 6px 0 0;
  padding: 8px 20px;
  font-size: 1rem;
  cursor: pointer;
  outline: none;
  transition: background 0.15s, color 0.15s;
}

.nav-tabs button.active {
  background: #fff;
  color: #2196F3;
  border-bottom: 2px solid #2196F3;
  font-weight: 600;
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