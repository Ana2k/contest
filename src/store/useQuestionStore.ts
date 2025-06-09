import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Question, QuestionFilters, CSVData } from '@/types/question'
import { parseCSV } from '@/utils/parseCSV'
import { filterQuestions, generateContest, saveCompletedQuestion, resetCompletedQuestions } from '@/utils/filterQuestions'

export const useQuestionStore = defineStore('questions', () => {
  // State
  const questions = ref<Question[]>([])
  const filters = ref<QuestionFilters>({
    types: [],
    topics: [],
    sources: [],
    includeCompleted: false
  })
  const availableFilters = ref<CSVData['filters']>({
    types: [],
    topics: [],
    sources: []
  })

  // Getters
  const filteredQuestions = computed(() => 
    filterQuestions(questions.value, filters.value)
  )

  const randomQuestions = computed(() => {
    const filtered = filteredQuestions.value
    const shuffled = [...filtered].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, 3)
  })

  // Actions
  const uploadCSV = async (file: File) => {
    try {
      const result = await parseCSV(file)
      questions.value = result.questions
      availableFilters.value = result.filters
      return true
    } catch (error) {
      console.error('Error parsing CSV:', error)
      return false
    }
  }

  const updateFilters = (newFilters: Partial<QuestionFilters>) => {
    filters.value = { ...filters.value, ...newFilters }
  }

  const generateNewContest = (difficultyCombination: string) => {
    return generateContest(questions.value, difficultyCombination)
  }

  const markQuestionComplete = (link: string) => {
    saveCompletedQuestion(link)
    questions.value = questions.value.map(q =>
      q.link === link ? { ...q, completed: true } : q
    )
  }

  const resetHistory = () => {
    resetCompletedQuestions()
    questions.value = questions.value.map(q => ({ ...q, completed: false }))
  }

  return {
    // State
    questions,
    filters,
    availableFilters,
    // Getters
    filteredQuestions,
    randomQuestions,
    // Actions
    uploadCSV,
    updateFilters,
    generateNewContest,
    markQuestionComplete,
    resetHistory
  }
}) 