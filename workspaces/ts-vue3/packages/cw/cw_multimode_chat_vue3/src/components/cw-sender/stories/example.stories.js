import Component from '../index';

export default {
  id: 'cw-sender-examples',
  title: '组件列表/CwSender/示例',
  component: Component,
  parameters: {
    layout: 'padded',
  },
  argTypes: {},
};

export const Example1 = {
  name: '基本用法',
  render: () => ({
    components: {
      'cw-sender': Component,
    },
    data() {
      return {
        value: 'Hello world',
        fileList: [
          {
            uid: '1',
            name: 'excel-file.xlsx',
            size: 111111,
            description: 'Checking the data',
          },
        ],
      };
    },
    methods: {
      onSubmit(data) {
        console.log(data);
        console.log(this.value);
      },
      onChange(data) {
        console.log('change', data);
      },
    },
    template: `<div>
      <cw-sender
        v-model:value="value"
        v-model:file-list="fileList"
        :max-size="10"
        :max-count="2"
        :data-nodepath="132"
        @submit="onSubmit"
        @change="onChange"
      />
      <div>{{ value }}</div>
      <div>{{ fileList }}</div>
    </div>`,
  }),
};
