import { useState, useEffect } from 'react';

export default function FilterPanel({ filters, onFilterChange }) {
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [selectedSources, setSelectedSources] = useState([]);
  const [includeCompleted, setIncludeCompleted] = useState(false);

  useEffect(() => {
    onFilterChange({
      types: selectedTypes,
      topics: selectedTopics,
      sources: selectedSources,
      includeCompleted,
    });
  }, [selectedTypes, selectedTopics, selectedSources, includeCompleted, onFilterChange]);

  const handleTypeChange = (e) => {
    const value = e.target.value;
    setSelectedTypes(prev => 
      prev.includes(value)
        ? prev.filter(t => t !== value)
        : [...prev, value]
    );
  };

  const handleTopicChange = (e) => {
    const value = e.target.value;
    setSelectedTopics(prev =>
      prev.includes(value)
        ? prev.filter(t => t !== value)
        : [...prev, value]
    );
  };

  const handleSourceChange = (e) => {
    const value = e.target.value;
    setSelectedSources(prev =>
      prev.includes(value)
        ? prev.filter(s => s !== value)
        : [...prev, value]
    );
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Filters</h3>
        
        {/* Type Filter */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Difficulty Type
          </label>
          <div className="space-y-2">
            {filters.types.map(type => (
              <label key={type} className="flex items-center">
                <input
                  type="checkbox"
                  value={type}
                  checked={selectedTypes.includes(type)}
                  onChange={handleTypeChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">{type}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Topics Filter */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Topics
          </label>
          <div className="grid grid-cols-2 gap-2">
            {filters.topics.map(topic => (
              <label key={topic} className="flex items-center">
                <input
                  type="checkbox"
                  value={topic}
                  checked={selectedTopics.includes(topic)}
                  onChange={handleTopicChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">{topic}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Source Filter */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Source
          </label>
          <div className="space-y-2">
            {filters.sources.map(source => (
              <label key={source} className="flex items-center">
                <input
                  type="checkbox"
                  value={source}
                  checked={selectedSources.includes(source)}
                  onChange={handleSourceChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">{source}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Include Completed Questions */}
        <div className="mt-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={includeCompleted}
              onChange={(e) => setIncludeCompleted(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-700">
              Include completed questions
            </span>
          </label>
        </div>
      </div>
    </div>
  );
} 