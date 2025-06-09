<script setup lang="ts">
import { ref } from 'vue'
import { useQuestionStore } from '@/store/useQuestionStore'
import type { Question } from '@/types/question'

const store = useQuestionStore()
const difficultyCombination = ref('medium-hard')
const showCopySuccess = ref(false)

const handleGenerateContest = () => {
  const newContest = store.generateNewContest(difficultyCombination.value)
  // Update the store with new contest questions
  store.updateFilters({ contestQuestions: newContest })
}

const handleQuestionComplete = (link: string) => {
  store.markQuestionComplete(link)
}

const handleResetHistory = () => {
  store.resetHistory()
}

const copyToClipboard = async () => {
  const links = store.selectedQuestions.map(q => q.link).join('\n')
  await navigator.clipboard.writeText(links)
  showCopySuccess.value = true
  setTimeout(() => {
    showCopySuccess.value = false
  }, 2000)
}
</script>

<template>
  <div class="question-list">
    <div v-if="store.selectedQuestions.length" class="selected-questions">
      <div class="list-header">
        <h2 class="list-title">Selected Questions</h2>
        <div class="list-actions">
          <button @click="copyToClipboard" class="action-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
            </svg>
            Copy Links
          </button>
          <button @click="store.setSelectedQuestions([])" class="action-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
            Clear
          </button>
        </div>
      </div>

      <div class="questions-grid">
        <div v-for="(question, index) in store.selectedQuestions" 
             :key="question.id" 
             class="question-card">
          <div class="question-header">
            <span class="question-number">#{{ index + 1 }}</span>
            <span :class="['difficulty-badge', 'difficulty-' + question.difficulty.toLowerCase()]">
              {{ question.difficulty }}
            </span>
          </div>
          
          <a :href="question.link" 
             target="_blank" 
             class="question-title"
             :title="question.title">
            {{ question.title }}
          </a>
          
          <div class="question-topics">
            <span v-for="topic in question.topics" 
                  :key="topic" 
                  class="topic-tag">
              {{ topic }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="empty-state">
      <div class="empty-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
      </div>
      <h3 class="empty-title">No Questions Selected</h3>
      <p class="empty-description">
        Use the filters on the left to generate a contest with your desired questions
      </p>
    </div>

    <div v-if="showCopySuccess" class="copy-success">
      Links copied to clipboard!
    </div>
  </div>
</template>

<style scoped>
.question-list {
  position: relative;
  min-height: 200px;
}

.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.list-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-color);
}

.list-actions {
  display: flex;
  gap: 0.75rem;
}

.action-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  background-color: white;
  border: 1px solid var(--border-color);
  border-radius: 0.375rem;
  color: var(--text-color);
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.action-button:hover {
  background-color: #f8fafc;
  border-color: var(--primary-color);
  color: var(--primary-color);
}

.questions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
}

.question-card {
  background-color: white;
  border: 1px solid var(--border-color);
  border-radius: 0.5rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  transition: all 0.2s;
}

.question-card:hover {
  border-color: var(--primary-color);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.question-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.question-number {
  font-size: 0.875rem;
  font-weight: 500;
  color: #64748b;
}

.difficulty-badge {
  font-size: 0.75rem;
  font-weight: 500;
  padding: 0.25rem 0.5rem;
  border-radius: 1rem;
}

.difficulty-easy {
  background-color: #dcfce7;
  color: var(--success-color);
}

.difficulty-medium {
  background-color: #fef3c7;
  color: var(--warning-color);
}

.difficulty-hard {
  background-color: #fee2e2;
  color: var(--error-color);
}

.question-title {
  font-size: 1rem;
  font-weight: 500;
  color: var(--primary-color);
  text-decoration: none;
  line-height: 1.4;
}

.question-title:hover {
  text-decoration: underline;
}

.question-topics {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.topic-tag {
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  background-color: #f1f5f9;
  color: #64748b;
  border-radius: 1rem;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 1rem;
  text-align: center;
  background-color: white;
  border: 1px dashed var(--border-color);
  border-radius: 0.5rem;
}

.empty-icon {
  color: #94a3b8;
  margin-bottom: 1rem;
}

.empty-title {
  font-size: 1.125rem;
  font-weight: 500;
  color: var(--text-color);
  margin-bottom: 0.5rem;
}

.empty-description {
  font-size: 0.875rem;
  color: #64748b;
  max-width: 24rem;
}

.copy-success {
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  background-color: var(--success-color);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  animation: fadeInOut 2s ease-in-out;
}

@keyframes fadeInOut {
  0% { opacity: 0; transform: translate(-50%, 1rem); }
  15% { opacity: 1; transform: translate(-50%, 0); }
  85% { opacity: 1; transform: translate(-50%, 0); }
  100% { opacity: 0; transform: translate(-50%, -1rem); }
}

@media (max-width: 640px) {
  .questions-grid {
    grid-template-columns: 1fr;
  }

  .list-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .list-actions {
    width: 100%;
  }

  .action-button {
    flex: 1;
    justify-content: center;
  }
}
</style> 