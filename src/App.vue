<script setup lang="ts">
import FileUpload from '@/components/FileUpload.vue'
import FilterPanel from '@/components/FilterPanel.vue'
import QuestionList from '@/components/QuestionList.vue'
import { useQuestionStore } from '@/store/useQuestionStore'

const store = useQuestionStore()
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <header class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold text-gray-900">
          DSA Contest Generator
        </h1>
      </div>
    </header>

    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="px-4 py-6 sm:px-0">
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <!-- Left Sidebar -->
          <div class="lg:col-span-1 space-y-6">
            <FileUpload />
            <FilterPanel v-if="store.questions.length" />
          </div>

          <!-- Main Content -->
          <div class="lg:col-span-3">
            <QuestionList />
          </div>
        </div>
      </div>
    </main>
  </div>
</template> 