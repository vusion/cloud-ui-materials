import Component from '../index';

export default {
  id: 'pdf-preview-examples',
  title: '组件列表/PdfPreview/示例',
  component: Component,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'padded',
  },
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
};

export const Example1 = {
  name: '基本用法',
  render: (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    template: '<pdf-preview url="https://lcap-static-saas.nos-eastchina1.126.net/user/wkn030211/1747382919340_71c322eeeded4c2a9f04ed8a3ffef0c5.pdf" v-bind="$props"></pdf-preview>',
  }),
  args: {
    url: 'https://lcap-static-saas.nos-eastchina1.126.net/user/wkn030211/1747382919340_71c322eeeded4c2a9f04ed8a3ffef0c5.pdf',
  },
};
