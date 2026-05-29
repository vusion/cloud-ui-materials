import Vue from 'vue';

import Component from '../index.js';
import BlocksDemo1 from '../demos/blocks/BlocksDemo1.vue';
import BlocksDemo2 from '../demos/blocks/BlocksDemo2.vue';
import BlocksDemo3 from '../demos/blocks/BlocksDemo3.vue';



// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Example/u-linear-layout.vue/blocks',
  component: Component,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'padded',
  },
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

export const Demo0 = {
  render: () => ({
    components: {
      DeprecatedDemo: BlocksDemo1,
    },
    template: '<deprecated-demo />',
  }),
};

export const Demo1 = {
  render: () => ({
    components: {
      DeprecatedDemo: BlocksDemo2,
    },
    template: '<deprecated-demo />',
  }),
};

export const Demo2 = {
  render: () => ({
    components: {
      DeprecatedDemo: BlocksDemo3,
    },
    template: '<deprecated-demo />',
  }),
};
