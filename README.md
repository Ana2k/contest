# DSA Contest Generator (Vue 3)

A local-first single-page Vue 3 application that helps you generate randomized DSA practice contests from a CSV file of questions.

## Features

- **CSV Upload**: Upload a CSV file containing DSA practice questions
- **Filter Panel**: Filter questions by difficulty type, topics, and source
- **Contest Generator**: Generate random questions based on selected filters
- **State Management**: Pinia store for managing questions and filters
- **Type Safety**: Full TypeScript support
- **Responsive Design**: Works on both desktop and mobile devices

## Tech Stack

- Vue 3 (Composition API)
- TypeScript
- Pinia (State Management)
- TailwindCSS
- PapaParse (CSV parsing)
- Vite

## CSV Format

The application expects a CSV file with the following columns:

- `Question Link`: URL to the question
- `Type`: Difficulty level (Easy/Medium/Hard)
- `Topics`: Pipe-separated list of topics (e.g., "Array|Two Pointers|Sorting")
- `Source List`: Source of the question (e.g., "LeetCode", "CodeForces")

Example:
```csv
Question Link,Type,Topics,Source List
https://leetcode.com/problems/two-sum,Easy,Array|Hash Table,LeetCode
https://leetcode.com/problems/add-two-numbers,Medium,Linked List|Math,LeetCode
```

## Getting Started

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd contest-generator
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## Project Structure

```
src/
├── components/          # Vue components
│   ├── FileUpload.vue  # CSV upload component
│   ├── FilterPanel.vue # Filter controls
│   └── QuestionList.vue # Question display
├── store/              # Pinia stores
│   └── useQuestionStore.ts
├── types/              # TypeScript types
│   └── question.ts
├── utils/              # Utility functions
│   ├── parseCSV.ts
│   └── filterQuestions.ts
├── App.vue            # Root component
└── main.ts            # Application entry
```

## Usage

1. Prepare your CSV file following the format described above
2. Upload the CSV file using the upload panel
3. Use the filter panel to select:
   - Difficulty types (Easy/Medium/Hard)
   - Topics
   - Sources
4. Choose a difficulty combination for your contest:
   - Medium & Hard
   - Hard Only
   - Medium Only
   - All Difficulties
5. Click "Generate Contest" to create a new contest
6. Mark questions as done when completed

## Future Enhancements

- Backend integration with Flask or Node.js
- Database persistence for user history
- Integration with Google Sheets or LeetCode API
- Analytics dashboard (average time per topic, etc.)
- React version in a monorepo structure

## Contributing

Feel free to open issues or submit pull requests for any improvements or bug fixes.

## License

MIT
