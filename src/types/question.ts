export type Difficulty = 'Easy' | 'Medium' | 'Hard'

export interface Question {
  link: string
  type: Difficulty
  topics: string[]
  source: string
  completed?: boolean
  timeSpent?: number
}

export interface QuestionFilters {
  types: Difficulty[]
  topics: string[]
  sources: string[]
  includeCompleted: boolean
}

export interface CSVData {
  questions: Question[]
  filters: {
    types: Difficulty[]
    topics: string[]
    sources: string[]
  }
} 