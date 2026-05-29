import Vue from 'vue';
import * as CloudUI from '@/index.js';
import Component from '../index.js';
import BlocksDemo1 from '../demos/blocks/BlocksDemo1.vue';
import BlocksDemo2 from '../demos/blocks/BlocksDemo2.vue';
import BlocksDemo3 from '../demos/blocks/BlocksDemo3.vue';
import BlocksDemo4 from '../demos/blocks/BlocksDemo4.vue';
import BlocksDemo5 from '../demos/blocks/BlocksDemo5.vue';
import BlocksDemo6 from '../demos/blocks/BlocksDemo6.vue';
import BlocksDemo7 from '../demos/blocks/BlocksDemo7.vue';
import BlocksDemo8 from '../demos/blocks/BlocksDemo8.vue';
import BlocksDemo9 from '../demos/blocks/BlocksDemo9.vue';
import BlocksDemo10 from '../demos/blocks/BlocksDemo10.vue';

Vue.use(CloudUI);

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Example/u-text.vue/blocks',
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

export const Demo3 = {
  render: () => ({
    components: {
      DeprecatedDemo: BlocksDemo4,
    },
    template: '<deprecated-demo />',
  }),
};

export const Demo4 = {
  render: () => ({
    components: {
      DeprecatedDemo: BlocksDemo5,
    },
    template: '<deprecated-demo />',
  }),
};

export const Demo5 = {
  render: () => ({
    components: {
      DeprecatedDemo: BlocksDemo6,
    },
    template: '<deprecated-demo />',
  }),
};

export const Demo6 = {
  render: () => ({
    components: {
      DeprecatedDemo: BlocksDemo7,
    },
    template: '<deprecated-demo />',
  }),
};

export const Demo7 = {
  render: () => ({
    components: {
      DeprecatedDemo: BlocksDemo8,
    },
    template: '<deprecated-demo />',
  }),
};

export const Demo8 = {
  render: () => ({
    components: {
      DeprecatedDemo: BlocksDemo9,
    },
    template: '<deprecated-demo />',
  }),
};

export const Demo9 = {
  render: () => ({
    components: {
      DeprecatedDemo: BlocksDemo10,
    },
    template: '<deprecated-demo />',
  }),
};
