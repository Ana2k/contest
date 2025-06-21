import { ref, computed } from 'vue'
import Papa from 'papaparse'

const questions = ref([])
const isLoaded = ref(false)

//Composable created shared between App.vue and QuestionSelector.vue as well. 


export async function loadQuestions(csvPath = '/aditya_graph.csv') {
  if (isLoaded.value) return questions
  try {
    const response = await fetch(csvPath)
    const csvText = await response.text()
    Papa.parse(csvText, {
      header: true,
      complete: (results) => {
        // Add selected: true to each question by default
        questions.value = results.data.map(q => ({ ...q, selected: true }))
        isLoaded.value = true
      }
    })
  } catch (error) {
    console.error('Error loading CSV:', error)
  }
  return questions
}

const selectedQuestions = computed(() => questions.value.filter(q => q.selected))

export function useQuestions() {
  return { questions, loadQuestions, selectedQuestions }
} 