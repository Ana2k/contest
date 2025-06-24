// Unit tests for useQuestions.js composable.
// These tests ensure that question loading, filtering, and selection logic works as expected.

import { useQuestions } from '../src/composables/useQuestions';

//TODO() - add more test cases. 

const mockQuestions = [
  { id: 1, topic: 'DP', text: 'What is dynamic programming?' },
  { id: 2, topic: 'Graph', text: 'Explain Dijkstra\'s algorithm.' },
];

//checking the loading of the data is correct or not...
describe('useQuestions', () => {
  it('loads questions correctly', () => {
    const { questions } = useQuestions(mockQuestions);
    expect(questions.value.length).toBe(2);
  });

  //just checking if the filters are working....
  it('filters questions by topic', () => {
    const { filterByTopic, questions } = useQuestions(mockQuestions);
    filterByTopic('DP');
    expect(questions.value).toEqual([
      { id: 1, topic: 'DP', text: 'What is dynamic programming?' },
    ]);
  });
}); 