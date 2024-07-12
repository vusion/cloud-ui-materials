import Component from '../index';

export default {
  id: 'cust-progress-step-advance-examples',
  title: '组件列表/CustProgressStepAdvance/示例',
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
    template: '<cust-progress-step-advance v-bind="$props"></cust-progress-step-advance>',
  }),
  args: {
    currentStep: '6',
    data: [
      { id: '1', title: '员工常驻外派申请' },
      { id: '2', title: '派出国人力信息审核&成本预测' },
      { id: '3', title: 'mobility预审核' },
      { id: '4', title: '派驻国人力审核' },
      [
        [
          { id: '5', title: '派驻国小微主审核' },
        ],
        [{ id: '6', title: '派出国小微主审核' }, { id: '6', title: '派出国平台主审核' }],
      ],
      { id: '7', title: 'mobility论证' },
      { id: '8', title: '出国系统审核' },
      { id: '9', title: '外派必要文件会签' },
      { id: '10', title: '申请完成' },
    ],
  },
};
