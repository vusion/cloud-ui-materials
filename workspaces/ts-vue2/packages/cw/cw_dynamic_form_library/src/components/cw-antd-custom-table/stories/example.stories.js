import Component from '../index';

export default {
  id: 'cw-antd-custom-table-examples',
  title: '组件列表/CwAntdCustomTable/示例',
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
  render: () => ({
    template: `
      <div style="padding: 20px; border: 1px solid #ddd; border-radius: 4px;">
        <h3>自定义表格组件</h3>
        <p>这是一个复杂的表格组件，支持动态列配置、数据源绑定等功能。</p>
        <p>在Storybook环境中，由于依赖复杂，建议在实际项目中使用。</p>
        <div style="margin-top: 20px; padding: 10px; background: #f5f5f5; border-radius: 4px;">
          <strong>注意：</strong>此组件需要完整的环境支持，包括数据源配置等依赖。
        </div>
      </div>
    `,
  }),
};