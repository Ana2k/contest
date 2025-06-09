<script setup lang="ts">
import { ref, computed } from 'vue'
import { useQuestionStore } from '@/store/useQuestionStore'
import type { QuestionFilters } from '@/types/question'
import { filterQuestions } from '../utils/filterQuestions'

const store = useQuestionStore()

const difficulties = ['Easy', 'Medium', 'Hard']
const selectedDifficulties = ref<string[]>([])
const selectedTopics = ref<string[]>([])
const questionCount = ref(5)

const topics = computed(() => {
  const uniqueTopics = new Set<string>()
  store.questions.forEach(q => {
    q.topics.forEach(t => uniqueTopics.add(t))
  })
  return Array.from(uniqueTopics).sort()
})

const canGenerate = computed(() => {
  return selectedDifficulties.value.length > 0 || selectedTopics.value.length > 0
})

const generateContest = () => {
  const filtered = filterQuestions(store.questions, {
    difficulties: selectedDifficulties.value,
    topics: selectedTopics.value,
    count: questionCount.value
  })
  store.setSelectedQuestions(filtered)
}

const resetFilters = () => {
  selectedDifficulties.value = []
  selectedTopics.value = []
  questionCount.value = 5
  store.setSelectedQuestions([])
}
</script>

<template>
  <div class="filter-panel">
    <h2 class="filter-title">Filters</h2>

    <div class="filter-section">
      <h3 class="section-title">Difficulty</h3>
      <div class="filter-options">
        <label v-for="diff in difficulties" :key="diff" class="filter-option">
          <input
            type="checkbox"
            :value="diff"
            v-model="selectedDifficulties"
            class="filter-checkbox"
          />
          <span class="filter-label" :class="'difficulty-' + diff.toLowerCase()">
            {{ diff }}
          </span>
        </label>
      </div>
    </div>

    <div class="filter-section">
      <h3 class="section-title">Topics</h3>
      <div class="filter-options">
        <label v-for="topic in topics" :key="topic" class="filter-option">
          <input
            type="checkbox"
            :value="topic"
            v-model="selectedTopics"
            class="filter-checkbox"
          />
          <span class="filter-label">{{ topic }}</span>
        </label>
      </div>
    </div>

    <div class="filter-section">
      <h3 class="section-title">Question Count</h3>
      <div class="count-input">
        <input
          type="number"
          v-model.number="questionCount"
          min="1"
          max="100"
          class="number-input"
        />
        <span class="count-label">questions</span>
      </div>
    </div>

    <div class="filter-actions">
      <button
        @click="generateContest"
        class="generate-button"
        :disabled="!canGenerate"
      >
        Generate Contest
      </button>
      <button
        @click="resetFilters"
        class="reset-button"
      >
        Reset Filters
      </button>
    </div>

    <div v-if="store.selectedQuestions.length" class="selected-info">
      <div class="info-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="16" x2="12" y2="12"/>
          <line x1="12" y1="8" x2="12.01" y2="8"/>
        </svg>
      </div>
      <span>{{ store.selectedQuestions.length }} questions selected</span>
    </div>
  </div>
</template>

<style scoped>
.filter-panel {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.filter-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 0.5rem;
}

.filter-section {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.section-title {
  font-size: 0.875rem;
  font-weight: 500;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.filter-options {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.filter-option {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.filter-checkbox {
  width: 1rem;
  height: 1rem;
  border-radius: 0.25rem;
  border: 1px solid var(--border-color);
  cursor: pointer;
}

.filter-label {
  font-size: 0.875rem;
  color: var(--text-color);
}

.difficulty-easy {
  color: var(--success-color);
}

.difficulty-medium {
  color: var(--warning-color);
}

.difficulty-hard {
  color: var(--error-color);
}

.count-input {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.number-input {
  width: 4rem;
  padding: 0.5rem;
  border: 1px solid var(--border-color);
  border-radius: 0.375rem;
  font-size: 0.875rem;
}

.count-label {
  font-size: 0.875rem;
  color: #64748b;
}

.filter-actions {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 0.5rem;
}

.generate-button {
  background-color: var(--primary-color);
  color: white;
  padding: 0.75rem;
  border-radius: 0.375rem;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;
}

.generate-button:hover:not(:disabled) {
  background-color: var(--secondary-color);
}

.generate-button:disabled {
  background-color: #94a3b8;
  cursor: not-allowed;
}

.reset-button {
  background-color: white;
  color: var(--text-color);
  padding: 0.75rem;
  border-radius: 0.375rem;
  font-weight: 500;
  border: 1px solid var(--border-color);
  cursor: pointer;
  transition: all 0.2s;
}

.reset-button:hover {
  background-color: #f1f5f9;
}

.selected-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  background-color: #f8fafc;
  border: 1px solid var(--border-color);
  border-radius: 0.375rem;
  font-size: 0.875rem;
  color: #64748b;
}

.info-icon {
  color: var(--primary-color);
  display: flex;
  align-items: center;
}
</style> 