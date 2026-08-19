import ComponentPreivew from 'virtual:lcap-theme-component-previews.js';

export default {
  title: '主题配置预览',
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

export const Components = {
  name: '组件预览',
  render: (args, { argTypes }) => {
    return {
      props: Object.keys(argTypes),
      components: {
        ComponentPreivew,
      },
      template: '<ComponentPreivew v-bind="$props" />',
    };
  },
};
