import Papa from 'papaparse'
import type { CSVData, Question } from '@/types/question'

export const parseCSV = (file: File): Promise<CSVData> => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header: string) => header.trim(),
      complete: (results) => {
        const questions: Question[] = results.data
          .map((row: any) => ({
            link: row['Question Link']?.trim(),
            type: row['Type']?.trim(),
            topics: row['Topics']?.split('|').map((t: string) => t.trim()).filter(Boolean) || [],
            source: row['Source List']?.trim(),
          }))
          .filter((q: Question) => q.link && q.type)

        // Extract unique values for filters
        const uniqueTypes = [...new Set(questions.map(q => q.type))]
        const uniqueTopics = [...new Set(questions.flatMap(q => q.topics))]
        const uniqueSources = [...new Set(questions.map(q => q.source).filter(Boolean))]

        resolve({
          questions,
          filters: {
            types: uniqueTypes,
            topics: uniqueTopics,
            sources: uniqueSources,
          }
        })
      },
      error: (error) => {
        reject(error)
      }
    })
  })
} 