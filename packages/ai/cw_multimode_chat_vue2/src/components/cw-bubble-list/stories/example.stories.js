import Component from '../index';
import CwBubble from '../bubble.vue'

export default {
  id: 'cw-bubble-list-examples',
  title: '组件列表/CwBubbleList/示例',
  component: Component,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'padded',
  },
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
};

export const Example1 = {
  name: '模拟IDE数据',
  render: (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: {
      'cw-bubble': CwBubble,
    },
    template: `<cw-bubble-list
      :dataSource="loadList"
      roleField="entity1.role"
      leftRoleName="ai"
      rightRoleName="user"
      @typingComplete="onTypingComplete">
      <template #leftBubble="current">
        <cw-bubble
          placement="start"
          :content="current.item.entity1.content"
          :showFooter="true"
          :showUserName="true"
          :name="current.item.entity1.name"
          :showTime="true"
          :time="current.item.entity1.time"
          :item="current.item"
          :index="current.index"
          :loading="current.item.entity1.loading"
          :typing="current.item.entity1.typing">
           <template #footer><span @click="onClickAssist(current)">开始typing{{current.item.entity1.name}}{{current.index}}</span></template>
        </cw-bubble>
      </template>
      <template #rightBubble="current">
        <cw-bubble
          placement="end"
          :content="current.item.entity1.content"
          :showFooter="true"
          :showUserName="true"
          :name="current.item.entity1.name"
          :time="current.item.entity1.time"
          :item="current.item"
          :index="current.index">
          <template #footer><span>这是footer{{current.item.entity1.name}}</span></template>
        </cw-bubble>
      </template>
    </cw-bubble-list>`,
    methods: {
      onClickAssist(current) {
        if(current.index === 0) {
          // current.item.content = current.item.content + ' Typing message hhh';
          current.item.entity1.loading = !current.item.entity1.loading;
        }
      },
      onTypingComplete(current) {
        console.log('typingcomplete', current);
      },
      loadList() {
        return [
          {entity1: {
            key: 0,
            role: 'ai',
            content: 'Normal message💗💗💗💗💗💗',
            name: 'AI',
            time: '2022-01-01 12:00:00',
            loading: undefined,
            fileList: [
              {
                uid: '1',
                name: 'excel-file.xlsx',
                size: 111111,
                description: 'Checking the data',
              },
            ],
            typing: true,
          }},
          {entity1:{
            key: 0,
            role: 'user',
            content: 'This is user message',
            name: 'User',
            time: '2022-01-01 12:00:00',
          }},
          {entity1:{
            key: 0,
            role: 'user',
            content: `---
__Advertisement :)__

- __[pica](https://nodeca.github.io/pica/demo/)__ - high quality and fast image
  resize in browser.
- __[babelfish](https://github.com/nodeca/babelfish/)__ - developer friendly
  i18n with plurals support and easy syntax.

You will like those projects!

---

# h1 Heading 8-)
## h2 Heading
### h3 Heading
#### h4 Heading
##### h5 Heading
###### h6 Heading


## Horizontal Rules

## Blockquotes


> Blockquotes can also be nested...

> Render as markdown content to show rich text!

Link: [Ant Design X](https://x.ant.design)

## Images

![Minion](https://octodex.github.com/images/minion.png)
![Stormtroopocat](https://octodex.github.com/images/stormtroopocat.jpg "The Stormtroopocat")

Like links, Images also have a footnote style syntax

![Alt text][id]`,
            name: 'User',
            time: '2022-01-01 12:00:00',
            fileList: [
              {
                uid: '1',
                name: 'excel-file.xlsx',
                size: 111111,
                description: 'Checking the data',
              },
              {
                uid: '2',
                name: 'word-file.docx',
                size: 222222,
                status: 'uploading',
                percent: 23,
              },
            ]
          }},
        ];
      }
    }
  }),
  args: {
    text: 'Hello world',
    dataSource: [
      {entity1: {
        key: 0,
        role: 'ai',
        content: 'Normal message',
        name: 'AI',
        time: '2022-01-01 12:00:00',
        loading: undefined,
        fileList: [
          {
            uid: '1',
            name: 'excel-file.xlsx',
            size: 111111,
            description: 'Checking the data',
          },
        ],
        typing: true,
      }},
      {entity1:{
        key: 0,
        role: 'user',
        content: 'This is user message',
        name: 'User',
        time: '2022-01-01 12:00:00',
      }},
      {entity1:{
        key: 0,
        role: 'user',
        content: `
> Render as markdown content to show rich text!

Link: [Ant Design X](https://x.ant.design)
`,
        name: 'User',
        time: '2022-01-01 12:00:00',
        fileList: [
          {
            uid: '1',
            name: 'excel-file.xlsx',
            size: 111111,
            description: 'Checking the data',
          },
          {
            uid: '2',
            name: 'word-file.docx',
            size: 222222,
            status: 'uploading',
            percent: 23,
          },
        ]
      }},
    ],
  },
};




