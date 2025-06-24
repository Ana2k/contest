// Timer.test.js
// Component tests for Timer.vue.
// These tests check that the timer starts, stops, and resets as expected.

import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import Timer from './Timer.vue';

describe('Timer', () => {
  it('renders initial time', () => {
    const wrapper = mount(Timer, { props: { initial: 60 } });
    expect(wrapper.text()).toContain('60');
  });

  it('starts and counts down', async () => {
    vi.useFakeTimers();
    const wrapper = mount(Timer, { props: { initial: 2 } });
    await wrapper.find('button.start').trigger('click');
    vi.advanceTimersByTime(1000);
    expect(wrapper.text()).toContain('1');
    vi.useRealTimers();
  });

  // Add more tests for stop/reset as needed.
}); 