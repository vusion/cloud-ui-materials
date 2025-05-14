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
      rightRoleName="user">
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
          :typing="current.item.entity1.typing"
          @typing-complete="onTypingComplete">
           <template #footer><span @click="onClickAssist(current)">开始typing{{current.item.entity1.name}}{{current.index}}</span><span style="margin-left: 10px;" @click="onClickStop(current)">停止typing{{current.item.entity1.name}}{{current.index}}</span></template>
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
          :index="current.index"
          @typing-complete="onTypingComplete">
          <template #footer><span>这是footer{{current.item.entity1.name}}</span></template>
        </cw-bubble>
      </template>
    </cw-bubble-list>`,
    methods: {
      onClickAssist(current) {
        if(current.index === 0) {
          current.item.entity1.loading = !current.item.entity1.loading;
        }
        let count = 0;
        console.log(11)
        const interval = setInterval(() => {
          current.item.entity1.content = current.item.entity1.content + '<div style="color: red;">Typing message hhh</div>';
          count++;
          if(count > 5) {
            clearInterval(interval);
            current.item.entity1.content =  `思考和行动过程：
  <div style="display: block; background: #f8f9fa; border-radius: 6px; margin: 1em 0; padding: 12px 16px; border-left: 3px solid #e9ecef; position: relative; font-family: 'Segoe UI Variable', system-ui, -apple-system, sans-serif; font-size: 0.95em; color: #00BFFF; box-shadow: 0 1px 2px rgba(0,0,0,0.05);">好，我现在要回答关于“城市作战的定义是什么”的问题。首先，我得看看提供的上下文里有哪些信息。

  上下文中提到，美国陆军和海军陆战队对城市作战有不同的定义。陆军将其视为在人造建筑或高人口密度区域及其周边自然地带进行的各种军事行动。而海军陆战队则直接称其为在人造建筑和高人口密度的地方展开的军事活动（参考MCRP1-10.2）。

  然后，这些信息都强调城市作战是统一地面行动中不可或缺的一部分。这说明它不仅限于单一军种，而是协同其他部队共同进行的复杂任务。

  此外，上下文还提到在密集的城市地形中实施作战非常复杂且资源密集，指挥官需要精心安排部队和行动以完成任务。这里提到了地形、高密度人口等因素增加了复杂性，同时也涉及到与联合部队的协调。

  综合来看，城市作战不仅仅是军事行动，还包括在复杂环境中应对多种挑战，如高人口密度、复杂的建筑环境以及与其他部队的合作。

  所以，我应该把这些要点整理出来，明确陆军和海军陆战队的不同定义，并强调其复杂性和资源密集性。最后，总结它在整体联合战役中的重要地位。
  </div>城市作战是指在以人造建筑和高人口密度为主要特征的复杂地形及其周边自然地带上实施的各种军事行动。根据美国陆军和海军陆战队的定义：

  1. **美国陆军**将城市作战定义为：在以人造建筑或高人口密度为主要特征的复杂地形及其周边自然地带上计划并开展、或针对其中目标的所有类型的军事行动。

  2. **美国海军陆战队**（MCRP1-10.2）将其定义为：在以人造建筑和高人口密度为主要特征的地方开展的军事行动。

  城市作战是统一地面行动中不可或缺的一部分，涉及复杂的地形、密集的人口以及与其他部队和联合行动伙伴的合作。指挥官需要根据任务目的、时间和空间精心安排部队和行动以完成任务。

  <br>**参考来源**<br>&emsp; <a data-longtext="这些短板可能
  <br>会导致潜在动荡，增加人为风险的可能，同时会加重自然灾害的
  <br>负面影响美国陆军将城市作战定义为：在以人造建筑或高人口
  <br>密度为主要特征的复杂地形及其周边自然地带上计划并开展、或
  <br>针对其中目标的所有类型的军事行动在海军陆战队的定义中，
  <br>城市作战是指在以人造建筑和高人口密度为主要特征的地方开
  <br>展的军事行动（MCRP 1-10.2）城市作战是统一地面行动中不可
  <br>或缺的一部分" onclick="
      // 创建提示框元素
      const tooltip = document.createElement('div');
      const arrow = document.createElement('div');
      // 创建标题元素
      const titleElement = document.createElement('h3');
      titleElement.textContent = this.textContent.trim(); // 获取a标签文本并去除首尾空格
      // 设置基础样式（修改定位方式为fixed）
      Object.assign(tooltip.style, {
        position: 'fixed',
        background: '#ffffff',
        color: '#000000',
        padding: '8px 12px',
        borderRadius: '8px',
        fontSize: '14px',
        lineHeight: '1.5',
        maxWidth: '400px',
        maxHeight: '400px',
        overflowY: 'auto',
        zIndex: '1000',
        boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
        opacity: '0',
        transition: 'opacity 0.2s',
        pointerEvents: 'auto',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-all',
        boxSizing: 'border-box'
      });
      // 设置标题样式
      Object.assign(titleElement.style, {
        position: 'sticky',
        top: '-8px',
        backgroundColor: '#f8f9fa',
        borderBottom: '1px solid #337eff',
        fontSize: '12px',
        color: '#337eff',
        fontWeight: 'bold',
        padding: '8px 8px',
        borderRadius: '4px',
        zIndex: '2'
      });
      // 先插入标题再插入箭头
      tooltip.appendChild(titleElement);
      tooltip.appendChild(arrow);
      // 设置箭头样式（保持原有样式不变）
      Object.assign(arrow.style, {
        position: 'absolute',
        top: '50%',
        right: '100%',
        marginTop: '-5px',
        borderWidth: '5px',
        borderStyle: 'solid',
        borderColor: 'transparent #555 transparent transparent'
      });
      // 添加提示框到DOM
      document.body.appendChild(tooltip);
      // 设置内容（新增：将内容添加到标题元素之后）
      const contentElement = document.createElement('div');
      contentElement.textContent = this.dataset.longtext.replace(/(\s|<br>)/g, '\u00A0');
      tooltip.appendChild(contentElement); // 将内容添加到标题下方
      // 计算位置（保持原有计算逻辑，但使用fixed定位）
      const rect = this.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
      let tooltipWidth = tooltip.offsetWidth;
      let tooltipHeight = tooltip.offsetHeight;
      let leftPos = rect.right + scrollLeft + 8;
      if (leftPos + tooltipWidth > window.innerWidth) {
        leftPos = rect.left + scrollLeft - tooltipWidth;
      }
      let topPos = rect.top + scrollTop - (tooltipHeight / 2);
      if (topPos < 0) topPos = 0;
      // 应用最终位置（使用fixed定位参数）
      tooltip.style.left = leftPos + 'px';
      tooltip.style.top = topPos + 'px';
      // 显示提示框
      tooltip.style.opacity = '1';
      // 点击页面其他位置隐藏（保持原有逻辑不变）
      const hideTooltip = () => {
        tooltip.style.opacity = '0';
        setTimeout(() => tooltip.remove(), 200);
        document.removeEventListener('click', hideTooltip);
      };
      setTimeout(() => {
        document.addEventListener('click', hideTooltip);
      }, 10);
      return false;">1. 2017年ATP3-06城市作战.pdf</a><br>`;
          }
        }, 100);
       
      },
      onClickStop(current) {
        current.item.entity1.typing = false;
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

![Alt text][id]
\`\`\`JSON
{
  "name": "John",
  "age": 30,
  "city": "New York"
}
\`\`\``,
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




