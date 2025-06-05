// Get completed questions from localStorage
export const getCompletedQuestions = () => {
  const completed = localStorage.getItem('completedQuestions');
  return completed ? JSON.parse(completed) : [];
};

// Save completed question to localStorage
export const saveCompletedQuestion = (link) => {
  const completed = getCompletedQuestions();
  if (!completed.includes(link)) {
    completed.push(link);
    localStorage.setItem('completedQuestions', JSON.stringify(completed));
  }
};

// Reset completed questions history
export const resetCompletedQuestions = () => {
  localStorage.removeItem('completedQuestions');
};

// Filter questions based on criteria
export const filterQuestions = (questions, filters) => {
  const completedQuestions = getCompletedQuestions();
  
  return questions.filter(q => {
    // Skip completed questions unless explicitly included
    if (!filters.includeCompleted && completedQuestions.includes(q.link)) {
      return false;
    }

    // Filter by type
    if (filters.types?.length && !filters.types.includes(q.type)) {
      return false;
    }

    // Filter by topics
    if (filters.topics?.length && !q.topics.some(topic => filters.topics.includes(topic))) {
      return false;
    }

    // Filter by source
    if (filters.sources?.length && !filters.sources.includes(q.source)) {
      return false;
    }

    return true;
  });
};

// Generate a contest with specified difficulty combination
export const generateContest = (questions, difficultyCombination) => {
  const validQuestions = questions.filter(q => {
    switch (difficultyCombination) {
      case 'medium-hard':
        return q.type === 'Medium' || q.type === 'Hard';
      case 'hard-only':
        return q.type === 'Hard';
      case 'medium-only':
        return q.type === 'Medium';
      case 'all':
        return true;
      default:
        return false;
    }
  });

  // Shuffle array using Fisher-Yates algorithm
  const shuffled = [...validQuestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 4);
}; 