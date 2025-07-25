import Component from '../index';

export default {
  id: 'aux-u-cascader-blocks',
  title: '组件列表/AuxUCascader/内置区块',
  component: Component,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
};

export const Block1 = {
  name: '基本用法',
  render: () => ({
    template: `<aux-u-cascader :emptyValueIsNull="true" :dataSource="[
{ text: '理学', value: '理学', children: [
{ text: '物理学', value: '物理学', children: [
{ text: '理论物理', value: '理论物理' },
{ text: '凝聚态物理', value: '凝聚态物理' },
{ text: '材料物理', value: '材料物理' },
]},
{ text: '数学', value: '数学', children: [
{ text: '基础数学', value: '基础数学' },
{ text: '计算数学', value: '计算数学' },
{ text: '应用数学', value: '应用数学' },
]},
{ text: '化学', value: '化学' },
]},
{ text: '工学', value: '工学', children: [
{ text: '计算机科学与技术', value: '计算机科学与技术', children: [
{ text: '计算机系统结构', value: '计算机系统结构' },
{ text: '计算机软件与理论', value: '计算机软件与理论', disabled: true },
{ text: '计算机应用技术', value: '计算机应用技术' },
] },
{ text: '软件工程', value: '软件工程', disabled: true },
{ text: '机械工程', value: '机械工程', children: [
{ text: '机械制造及其自动化', value: '机械制造及其自动化' },
{ text: '机械电子工程', value: '机械电子工程' },
{ text: '机械设计及理论', value: '机械设计及理论', disabled: true },
{ text: '车辆工程', value: '车辆工程', disabled: true },
] },
] },
]">
</aux-u-cascader>`,
  }),
};
