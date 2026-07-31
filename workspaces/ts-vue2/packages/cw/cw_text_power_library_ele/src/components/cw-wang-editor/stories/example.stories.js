import Component from '../index';

export default {
  id: 'cw-wang-editor-examples',
  title: '组件列表/CwWangEditor/示例',
  component: Component,
  parameters: {
    layout: 'padded',
  },
  argTypes: {},
};

export const Example1 = {
  name: '基本用法',
  render: (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    template: '<cw-wang-editor v-bind="$props" showDocxButton></cw-wang-editor>',
  }),
  args: {
    value: '<p>hello</p>',
  },
};

export const Example2 = {
  name: '自定义上传地址',
  render: (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    template: '<cw-wang-editor v-bind="$props"></cw-wang-editor>',
  }),
  args: {
    value:
      "<p>hello</p><img src='https://p3-passport.byteimg.com/img/user-avatar/834687b5e4137f4d998a95be7330f543~180x180.awebp'>",
    uploadImgServer: '/upload/test',
  },
};

export const Example3 = {
  name: '只读模式',
  render: (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    data() {
      return {
        readOnly: true,
      };
    },
    template: `
      <div>
        <cw-wang-editor v-bind="$props" :readOnly="readOnly"></cw-wang-editor>
        <button @click="readOnly = !readOnly">切换</button>
      </div>
    `,
  }),
  args: {
    value:
      "<p>hello</p><img src='https://p3-passport.byteimg.com/img/user-avatar/834687b5e4137f4d998a95be7330f543~180x180.awebp'>",
  },
};
