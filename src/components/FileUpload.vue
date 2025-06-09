<template>
  <div class="file-upload">
    <div class="upload-container" 
         @dragover.prevent="isDragging = true"
         @dragleave.prevent="isDragging = false"
         @drop.prevent="handleFileDrop"
         :class="{ 'is-dragging': isDragging }">
      <input
        type="file"
        ref="fileInput"
        accept=".csv"
        class="file-input"
        @change="handleFileChange"
      />
      
      <div class="upload-content">
        <div class="upload-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="17 8 12 3 7 8"/>
            <line x1="12" y1="3" x2="12" y2="15"/>
          </svg>
        </div>
        
        <h3 class="upload-title">Upload your questions CSV file</h3>
        <p class="upload-description">
          Drag and drop your CSV file here, or click to browse
        </p>
        <p class="upload-hint">
          Download our <a href="/sample_questions.csv" download class="sample-link">sample CSV file</a> to see the required format
        </p>
      </div>
    </div>

    <div v-if="error" class="error-message">
      {{ error }}
    </div>

    <div v-if="store.questions.length" class="upload-success">
      <div class="success-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
          <polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
      </div>
      <span>Successfully loaded {{ store.questions.length }} questions</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useQuestionStore } from '../store/useQuestionStore'
import { parseCSV } from '../utils/parseCSV'

const store = useQuestionStore()
const fileInput = ref<HTMLInputElement | null>(null)
const isDragging = ref(false)
const error = ref('')

const handleFileChange = async (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files?.length) {
    await processFile(input.files[0])
  }
}

const handleFileDrop = async (event: DragEvent) => {
  isDragging.value = false
  const file = event.dataTransfer?.files[0]
  if (file) {
    await processFile(file)
  }
}

const processFile = async (file: File) => {
  if (!file.name.endsWith('.csv')) {
    error.value = 'Please upload a CSV file'
    return
  }

  try {
    const text = await file.text()
    const questions = parseCSV(text)
    store.setQuestions(questions)
    error.value = ''
  } catch (e) {
    error.value = 'Error parsing CSV file. Please check the format.'
    console.error(e)
  }
}
</script>

<style scoped>
.file-upload {
  width: 100%;
}

.upload-container {
  border: 2px dashed var(--border-color);
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: #fafafa;
}

.upload-container:hover {
  border-color: var(--primary-color);
  background-color: #f0f7ff;
}

.upload-container.is-dragging {
  border-color: var(--primary-color);
  background-color: #f0f7ff;
}

.file-input {
  display: none;
}

.upload-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.upload-icon {
  color: var(--primary-color);
  margin-bottom: 0.5rem;
}

.upload-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-color);
}

.upload-description {
  color: #64748b;
  font-size: 0.875rem;
}

.upload-hint {
  font-size: 0.875rem;
  color: #64748b;
}

.sample-link {
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 500;
}

.sample-link:hover {
  text-decoration: underline;
}

.error-message {
  margin-top: 1rem;
  padding: 0.75rem;
  background-color: #fef2f2;
  border: 1px solid #fee2e2;
  border-radius: 6px;
  color: var(--error-color);
  font-size: 0.875rem;
}

.upload-success {
  margin-top: 1rem;
  padding: 0.75rem;
  background-color: #f0fdf4;
  border: 1px solid #dcfce7;
  border-radius: 6px;
  color: var(--success-color);
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.success-icon {
  display: flex;
  align-items: center;
}
</style> 