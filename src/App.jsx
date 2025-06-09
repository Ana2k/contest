import { useState, useCallback } from 'react';
import UploadCSV from './components/UploadCSV';
import FilterPanel from './components/FilterPanel';
import ContestView from './components/ContestView';
import { filterQuestions, generateContest } from './utils/filterQuestions';

function App() {
  const [questions, setQuestions] = useState([]);
  const [filters, setFilters] = useState({
    types: [],
    topics: [],
    sources: [],
  });
  const [activeFilters, setActiveFilters] = useState({
    types: [],
    topics: [],
    sources: [],
    includeCompleted: false,
  });

  const handleUpload = useCallback(({ questions: newQuestions, filters: newFilters }) => {
    setQuestions(newQuestions);
    setFilters(newFilters);
  }, []);

  const handleFilterChange = useCallback((newFilters) => {
    setActiveFilters(newFilters);
  }, []);

  const filteredQuestions = filterQuestions(questions, activeFilters);

  const handleGenerateContest = useCallback((questions, difficultyCombination) => {
    return generateContest(questions, difficultyCombination);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">
            DSA Contest Generator
          </h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              <UploadCSV onUpload={handleUpload} />
              {questions.length > 0 && (
                <FilterPanel
                  filters={filters}
                  onFilterChange={handleFilterChange}
                />
              )}
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <ContestView
                questions={filteredQuestions}
                onGenerateContest={handleGenerateContest}
              />
            </div>
          </div>
      </div>
      </main>
      </div>
  );
}

export default App;
