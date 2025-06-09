<script setup lang="ts">
import { watch } from 'vue'
import { useQuestionStore } from '@/store/useQuestionStore'
import type { QuestionFilters } from '@/types/question'

const store = useQuestionStore()

const handleTypeChange = (type: string) => {
  const types = store.filters.types.includes(type)
    ? store.filters.types.filter(t => t !== type)
    : [...store.filters.types, type]
  store.updateFilters({ types })
}

const handleTopicChange = (topic: string) => {
  const topics = store.filters.topics.includes(topic)
    ? store.filters.topics.filter(t => t !== topic)
    : [...store.filters.topics, topic]
  store.updateFilters({ topics })
}

const handleSourceChange = (source: string) => {
  const sources = store.filters.sources.includes(source)
    ? store.filters.sources.filter(s => s !== source)
    : [...store.filters.sources, source]
  store.updateFilters({ sources })
}

const handleIncludeCompletedChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  store.updateFilters({ includeCompleted: target.checked })
}
</script>

<template>
  <div class="bg-white p-6 rounded-lg shadow-sm space-y-6">
    <div>
      <h3 class="text-lg font-medium text-gray-900 mb-4">Filters</h3>
      
      <!-- Type Filter -->
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Difficulty Type
        </label>
        <div class="space-y-2">
          <label
            v-for="type in store.availableFilters.types"
            :key="type"
            class="flex items-center"
          >
            <input
              type="checkbox"
              :value="type"
              :checked="store.filters.types.includes(type)"
              @change="handleTypeChange(type)"
              class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span class="ml-2 text-sm text-gray-700">{{ type }}</span>
          </label>
        </div>
      </div>

      <!-- Topics Filter -->
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Topics
        </label>
        <div class="grid grid-cols-2 gap-2">
          <label
            v-for="topic in store.availableFilters.topics"
            :key="topic"
            class="flex items-center"
          >
            <input
              type="checkbox"
              :value="topic"
              :checked="store.filters.topics.includes(topic)"
              @change="handleTopicChange(topic)"
              class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span class="ml-2 text-sm text-gray-700">{{ topic }}</span>
          </label>
        </div>
      </div>

      <!-- Source Filter -->
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Source
        </label>
        <div class="space-y-2">
          <label
            v-for="source in store.availableFilters.sources"
            :key="source"
            class="flex items-center"
          >
            <input
              type="checkbox"
              :value="source"
              :checked="store.filters.sources.includes(source)"
              @change="handleSourceChange(source)"
              class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span class="ml-2 text-sm text-gray-700">{{ source }}</span>
          </label>
        </div>
      </div>

      <!-- Include Completed Questions -->
      <div class="mt-4">
        <label class="flex items-center">
          <input
            type="checkbox"
            :checked="store.filters.includeCompleted"
            @change="handleIncludeCompletedChange"
            class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <span class="ml-2 text-sm text-gray-700">
            Include completed questions
          </span>
        </label>
      </div>
    </div>
  </div>
</template> 