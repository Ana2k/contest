// These tests verify that the UI displays questions and handles user selection correctly.

import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import QuestionSelector from '../src/components/QuestionSelector.vue';

describe('QuestionSelector', () => {
  it('renders a list of questions', () => {
    const wrapper = mount(QuestionSelector, {
      props: {
        questions: [
          { id: 1, text: 'Q1' },
          { id: 2, text: 'Q2' },
        ],
      },
    });
    expect(wrapper.text()).toContain('Q1');
    expect(wrapper.text()).toContain('Q2');
  });

  it('emits an event when a question is selected', async () => {
    const wrapper = mount(QuestionSelector, {
      props: {
        questions: [
          { id: 1, text: 'Q1' },
        ],
      },
    });
    await wrapper.find('button').trigger('click');
    expect(wrapper.emitted()).toHaveProperty('select');
  });
}); 