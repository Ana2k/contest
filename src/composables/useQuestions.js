import { ref } from 'vue'
import Papa from 'papaparse'

const questions = ref([])
const isLoaded = ref(false)

//Composable created shared between App.vue and QuestionSelector.vue as well. 


export async function loadQuestions(csvPath = '/current.csv') {
  if (isLoaded.value) return questions
  try {
    const response = await fetch(csvPath)
    const csvText = await response.text()
    Papa.parse(csvText, {
      header: true,
      complete: (results) => {
        //No selected - components manage their own selection states...
        questions.value = results.data
        isLoaded.value = true
      }
    })
  } catch (error) {
    console.error('Error loading CSV:', error)
  }
  return questions
}

export function useQuestions() {
  return { questions, loadQuestions }
} 