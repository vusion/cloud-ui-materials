import Component from '../index';

export default {
  id: 'cw-sender-examples',
  title: '组件列表/CwSender/示例',
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
    template: '<div><cw-sender v-bind="$props" :value.sync="value" @submit="onSubmit" :file-list.sync="fileList" @change="onChange" :maxCount="2"></cw-sender><div>{{value}}</div><div>{{fileList}}</div></div>',
    methods: {
      onSubmit(data) {
        console.log(data);
        console.log(this.value);
      },
      onChange(data) {
        console.log('change', data);
      }
    },
  }),
  args: {
    maxSize: 10,
    value: 'Hello world',
    fileList: [
      {
          uid: '1',
          name: 'excel-file.xlsx',
          size: 111111,
          description: 'Checking the data',
        },
    ],
    // value: {
    //   fileList: [
    //     // {
    //     //   uid: '1',
    //     //   name: 'excel-file.xlsx',
    //     //   size: 111111,
    //     //   description: 'Checking the data',
    //     // },
    //     // {
    //     //   uid: '2',
    //     //   name: 'word-file.docx',
    //     //   size: 222222,
    //     //   status: 'uploading',
    //     //   percent: 23,
    //     // },
    //     // {
    //     //   uid: '2',
    //     //   name: 'word-file.docx',
    //     //   size: 222222,
    //     //   status: 'uploading',
    //     //   percent: 23,
    //     // },
    //     // {
    //     //   uid: '2',
    //     //   name: 'word-file.docx',
    //     //   size: 222222,
    //     //   status: 'uploading',
    //     //   percent: 23,
    //     // },
    //     // {
    //     //   uid: '2',
    //     //   name: 'word-file.docx',
    //     //   size: 222222,
    //     //   status: 'uploading',
    //     //   percent: 23,
    //     // },
    //   ]
    // }
  },
};
