<script setup lang="ts">
import { ref } from 'vue'
import { useQuestionStore } from '@/store/useQuestionStore'
import type { Question } from '@/types/question'

const store = useQuestionStore()
const difficultyCombination = ref('medium-hard')

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
</script>

<template>
  <div class="space-y-6">
    <!-- Contest Controls -->
    <div class="bg-white p-6 rounded-lg shadow-sm">
      <div class="flex items-center justify-between mb-4">
        <div class="space-x-4">
          <select
            v-model="difficultyCombination"
            class="select"
          >
            <option value="medium-hard">Medium & Hard</option>
            <option value="hard-only">Hard Only</option>
            <option value="medium-only">Medium Only</option>
            <option value="all">All Difficulties</option>
          </select>
          <button
            @click="handleGenerateContest"
            class="btn btn-primary"
            :disabled="!store.questions.length"
          >
            Generate Contest
          </button>
          <button
            @click="handleResetHistory"
            class="btn btn-secondary"
          >
            Reset History
          </button>
        </div>
      </div>
    </div>

    <!-- Questions List -->
    <div v-if="store.randomQuestions.length" class="space-y-4">
      <div
        v-for="(question, index) in store.randomQuestions"
        :key="question.link"
        :class="[
          'bg-white p-6 rounded-lg shadow-sm',
          question.completed ? 'opacity-75' : ''
        ]"
      >
        <div class="flex items-start justify-between">
          <div class="space-y-2">
            <div class="flex items-center space-x-2">
              <span class="text-lg font-medium">
                Question {{ index + 1 }}
              </span>
              <span
                :class="[
                  'px-2 py-1 text-xs font-medium rounded-full',
                  question.type === 'Easy'
                    ? 'bg-difficulty-easy text-white'
                    : question.type === 'Medium'
                    ? 'bg-difficulty-medium text-gray-900'
                    : 'bg-difficulty-hard text-white'
                ]"
              >
                {{ question.type }}
              </span>
            </div>
            <a
              :href="question.link"
              target="_blank"
              rel="noopener noreferrer"
              class="text-blue-600 hover:text-blue-800"
            >
              {{ question.link }}
            </a>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="topic in question.topics"
                :key="topic"
                class="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full"
              >
                {{ topic }}
              </span>
            </div>
          </div>
          <div class="flex items-center space-x-4">
            <button
              v-if="!question.completed"
              @click="handleQuestionComplete(question.link)"
              class="btn btn-primary"
            >
              Mark as Done
            </button>
            <span
              v-else
              class="text-sm text-green-600"
            >
              Completed
            </span>
          </div>
        </div>
      </div>
    </div>

    <div
      v-else
      class="text-center text-gray-500 py-12"
    >
      Generate a contest to get started
    </div>
  </div>
</template> 