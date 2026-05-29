import { test, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { ULink } from '../index';

test('test sync value', async () => {
  const syncState = {};
  const wrapper = mount(ULink, {
    propsData: {
      text: '12222',
    },
    listeners: {
      'sync:state': (name, v) => {
        syncState[name] = v;
      },
    },
  });

  await wrapper.vm.$nextTick();
  expect(syncState.disabled).toBe(false);

  await wrapper.setProps({
    disabled: true,
  });

  expect(syncState.disabled).toBe(true);
});
