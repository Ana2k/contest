import Papa from 'papaparse';

export const parseCSV = (file) => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header) => header.trim(),
      complete: (results) => {
        const questions = results.data.map(row => ({
          link: row['Question Link']?.trim(),
          type: row['Type']?.trim(),
          topics: row['Topics']?.split('|').map(t => t.trim()).filter(Boolean) || [],
          source: row['Source List']?.trim(),
        })).filter(q => q.link && q.type); // Filter out invalid entries

        // Extract unique values for filters
        const uniqueTypes = [...new Set(questions.map(q => q.type))];
        const uniqueTopics = [...new Set(questions.flatMap(q => q.topics))];
        const uniqueSources = [...new Set(questions.map(q => q.source).filter(Boolean))];

        resolve({
          questions,
          filters: {
            types: uniqueTypes,
            topics: uniqueTopics,
            sources: uniqueSources,
          }
        });
      },
      error: (error) => {
        reject(error);
      }
    });
  });
}; 