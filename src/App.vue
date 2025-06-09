<script setup lang="ts">
import FileUpload from '@/components/FileUpload.vue'
import FilterPanel from '@/components/FilterPanel.vue'
import QuestionList from '@/components/QuestionList.vue'
import { useQuestionStore } from '@/store/useQuestionStore'

const store = useQuestionStore()
</script>

<template>
  <div class="app-container">
    <header class="app-header">
      <h1>LeetCode Contest Generator</h1>
      <p class="subtitle">Generate practice contests from your question bank</p>
    </header>

    <main class="main-content">
      <div class="upload-section">
        <FileUpload />
      </div>

      <div class="content-wrapper">
        <aside class="filter-panel">
          <FilterPanel v-if="store.questions.length" />
        </aside>

        <section class="question-list">
          <QuestionList />
        </section>
      </div>
    </main>
  </div>
</template>

<style>
:root {
  --primary-color: #2563eb;
  --secondary-color: #1e40af;
  --background-color: #f8fafc;
  --text-color: #1e293b;
  --border-color: #e2e8f0;
  --success-color: #22c55e;
  --error-color: #ef4444;
  --warning-color: #f59e0b;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  line-height: 1.5;
  color: var(--text-color);
  background-color: var(--background-color);
}

.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-header {
  background-color: white;
  padding: 1.5rem 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.app-header h1 {
  color: var(--primary-color);
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.subtitle {
  color: #64748b;
  font-size: 1.1rem;
}

.main-content {
  flex: 1;
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
}

.upload-section {
  margin-bottom: 2rem;
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.content-wrapper {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 2rem;
  align-items: start;
}

.filter-panel {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 2rem;
}

.question-list {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

@media (max-width: 1024px) {
  .content-wrapper {
    grid-template-columns: 1fr;
  }

  .filter-panel {
    position: static;
  }
}

@media (max-width: 640px) {
  .main-content {
    padding: 1rem;
  }

  .app-header {
    padding: 1rem;
  }

  .app-header h1 {
    font-size: 1.5rem;
  }

  .subtitle {
    font-size: 1rem;
  }
}
</style> 