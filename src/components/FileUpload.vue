<script setup lang="ts">
import { ref } from 'vue'
import { useQuestionStore } from '@/store/useQuestionStore'

const store = useQuestionStore()
const isDragging = ref(false)
const error = ref('')

const handleDragOver = (e: DragEvent) => {
  e.preventDefault()
  isDragging.value = true
}

const handleDragLeave = (e: DragEvent) => {
  e.preventDefault()
  isDragging.value = false
}

const handleDrop = async (e: DragEvent) => {
  e.preventDefault()
  isDragging.value = false
  error.value = ''

  const file = e.dataTransfer?.files[0]
  if (!file) return

  if (file.type !== 'text/csv') {
    error.value = 'Please upload a CSV file'
    return
  }

  const success = await store.uploadCSV(file)
  if (!success) {
    error.value = 'Error parsing CSV file. Please check the format.'
  }
}

const handleFileInput = async (e: Event) => {
  const input = e.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return

  if (file.type !== 'text/csv') {
    error.value = 'Please upload a CSV file'
    return
  }

  const success = await store.uploadCSV(file)
  if (!success) {
    error.value = 'Error parsing CSV file. Please check the format.'
  }
}
</script>

<template>
  <div class="w-full max-w-2xl mx-auto p-6">
    <div
      :class="[
        'border-2 border-dashed rounded-lg p-8 text-center',
        isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
      ]"
      @dragover="handleDragOver"
      @dragleave="handleDragLeave"
      @drop="handleDrop"
    >
      <input
        type="file"
        accept=".csv"
        @change="handleFileInput"
        class="hidden"
        id="csv-upload"
      />
      <label
        for="csv-upload"
        class="cursor-pointer block"
      >
        <div class="space-y-2">
          <svg
            class="mx-auto h-12 w-12 text-gray-400"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 48 48"
            aria-hidden="true"
          >
            <path
              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <div class="text-gray-600">
            <span class="font-medium text-blue-600 hover:text-blue-500">
              Upload a CSV file
            </span>
            or drag and drop
          </div>
          <p class="text-xs text-gray-500">
            CSV file with columns: Question Link, Type, Topics, Source List
          </p>
        </div>
      </label>
    </div>
    <p v-if="error" class="mt-2 text-sm text-red-600 text-center">
      {{ error }}
    </p>
  </div>
</template> 