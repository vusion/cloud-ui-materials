import Component from '../index.vue';

export default {
  id: 'cw-typed-view-examples',
  title: '组件列表/CwTypedView/示例',
  component: Component,
  parameters: {
    layout: 'padded',
  },
  argTypes: {},
};

export const Default = {
  name: '基本用法',
  render: () => ({
    template: `
      <cw-typed-view
        style="width:100px;"
        value="fdafaslfjafldajfldsajfldajlfdjaslfjdl"
        :showCursor="true"
      ></cw-typed-view>
    `,
  }),
};
