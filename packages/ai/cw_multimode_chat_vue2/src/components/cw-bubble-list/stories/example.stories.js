import Component from '../index';
import CwBubble from '../bubble.vue';

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
    data() {
      return {
        list: this.loadList(),
        testContents: [`思考和行动过程：
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
    return false;">1. 2017年ATP3-06城市作战.pdf</a><br>`, `思考和行动过程：
<div style="display: block; background: #f8f9fa; border-radius: 6px; margin: 1em 0; padding: 12px 16px; border-left: 3px solid #e9ecef; position: relative; font-family: 'Segoe UI Variable', system-ui, -apple-system, sans-serif; font-size: 0.95em; color: #00BFFF; box-shadow: 0 1px 2px rgba(0,0,0,0.05);">好，我现在需要回答用户的问题：“美国陆军特种作战司令部的组成与职能”。首先，我得仔细回顾一下上下文内容，看看里面都提到了哪些相关信息。

从上下文中，我知道美国陆军特种作战司令部由四个下属司令部和三个配备平民、正规美国陆军和预备役部队军事人员的下属部队组成。具体来说，这四个下属司令部分别是：

1. 美国陆军特种部队司令部2. 美国陆军约翰·F·肯尼迪特战中心/学校（USAJFKSWCS）
3. 美国陆军特种作战航空司令部4. 军事信息支援行动司令部接下来是职能部分，特种作战司令部的职责包括为地区作战指挥官和美国大使提供经过训练并准备好的特种部队、游骑兵、特种作战航空队等人员。此外，司令部还负责制定条令、战术和技术，并为陆军特种作战部队配备装备。

另外，司令部的指挥官负责指挥本土的正规陆军特种作战部队，并监督国民警卫队的特种作战部队。他们还作为美国特种作战司令部的陆军军种部队指挥官，总部可以作为备选指挥中心。

总结起来，我需要将这些信息整理成一个清晰的结构，分为组成和职能两部分，每部分再细分具体的点。确保回答准确，并且语言风格与用户的问题相匹配。
</div>美国陆军特种作战司令部（United States Army Special Operations Command, USSOCOM）由四个下属司令部和三个配备平民、正规美国陆军和预备役部队军事人员的下属部队组成。

### **组成：**
1. 美国陆军特种部队司令部2. 美国陆军约翰·F·肯尼迪特战中心/学校（USAJFKSWCS）
3. 美国陆军特种作战航空司令部4. 军事信息支援行动司令部### **职能：**
1.为地区作战指挥官和美国大使提供经过训练并做好准备的特种部队、游骑兵、特种作战航空队、军事信息支援和民事事务人员。
2. 美国陆军特种作战司令部指挥官负责指挥美国本土的正规陆军特种作战部队，并监督和评估美国本土的陆军国民警卫队特种作战部队。
3. 制定陆军特种作战部队的条令、战术、技术和程序；提供装备。
4. 履行类似于美国陆军军种部队司令部的职能，作为特种部队的一个职能型陆军军种部队司令部，负责为指派到美国特种作战司令部的陆军特种作战部队配备人员/组织、训练、装备、管理和保障。
5. 指挥官被任命为美国特种作战司令部的陆军军种部队指挥官，并且总部被指定为美国特种作战司令部的备选指挥总部。

<br>**参考来源**<br>&emsp;<a data-longtext="美国陆军特种作战司令部由四个下属司令部和三个配备平民、正规美国陆军和预备役部队军事人员的下属部队组成。美国陆军特种作战司令部的下属司令部分别是美国陆军特种部队司令部、美国陆军约翰·F· 肯尼迪特战中心/学校（USAJFKSWCS）、美国陆军特种作战航空司令部和军事信息支援行动司令部。<br>美国陆军特种作战司令部为地区作战指挥官和美国大使提供经过训练并做好准备的特种部队、游骑兵、特种作战航空队、军事信息支援和民事事务人员。美国陆军特种作战司令部指挥官负责指挥美国本土的正规陆军特种作战部队。他还监督和评估美国本土的陆军国民警卫队特种作战部队。美国陆军特种作战司令部负责制定陆军特种作战部队的条令、战术、技术和程序；提供装备。该司令部经过专门组织、训练和装备，旨在建立完成下列12 项核心行动的能力：<br>美国陆军特种作战司令部履行类似于美国陆军军种部队司令部的职能，作为特种部队的一个职能型陆军军种部队司令部，它负责为指派到美国特种作战司令部的陆军特种作战部队配备人员/组织、训练、装备、管理和保障战区的美国陆军军种部队司令部对地区作战指挥官责任区域内的美国陆军部队实施管理控制，并为指派的部队提供支援，其中包括战区特种作战司令部<br>一、美国特种作战司令部<br>美国特种作战司令部由美国陆军特种作战司令部、海军特种作战司令部、空军特种作战司令部和海军陆战队特种作战司令部组成。联合特种作战司令部是美国特种作战司令部的下属联合司令部。美国陆军特种作战司令部指挥官被任命为美国特种作战司令部的陆军军种部队指挥官。美国陆军部队受美国特种作战司令部指挥官的作战指挥。此外，美国陆军特种作战司令部总部被指定为美国特种作战司令部的备选指挥总部。" onclick="
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
    return false;">1. 公开-BQ21020171QB39_04-1.md</a><br>`, `思考和行动中，请稍后。。。\n<div style="display: block; background: #FCFDFF; border-radius: 6px; margin: 1em 0; padding: 12px 16px; border-left: 3px solid #e9ecef; position: relative; font-family: 'Segoe UI Variable', system-ui, -apple-system, sans-serif; font-size: 0.95em; color: #555555; box-shadow: 0 1px 2px rgba(0,0,0,0.05);">好的，现在用户的问题是“特种部队针对叛乱分子的战略方法有哪几种”。根据提供的上下文，我需要回顾相关内容，并组织回答。\n 上文中提到了两种主要的方法：直接法和间接法。此外，还有针对不同叛乱战略的具体战术，如城市和农村方法。我需要将这些内容整理出来，确保用户能够清晰地理解每种方法的定义和应用场景。\n\n首先，我会列出直接法和间接法的基本概念及其子步骤。然后，详细说明针对不同叛乱战略（城市、恐怖主义、农村）的方法，以及特种部队如何通过平衡多种作战手段来实现反叛乱目标。最后，强调特种部队在情报活动和与当地安全部队合作中的作用。\n\n确保回答结构清晰，每种方法都明确分开，并附上简要的解释，使用户能够全面理解特种部队的战略选择及其实施方式。\n</div>根据提供的上下文，特种部队针对叛乱分子的战略方法主要有以下两种：**直接法**和**间接法**。此外，还针对不同类型叛乱（如城市叛乱、恐怖主义、农村叛乱）采取了具体的战略。\n\n### 1. **直接法**\n - **定义**：直接法是通过军事手段对叛乱分子进行打击。\n - **步骤**：\n - **塑造**：通过心理战、信息战等手段改变舆论，孤立叛乱分子。\n - **清除**：通过军事行动消灭或驱逐叛乱分子。\n - **占领**：控制叛乱地区的战略要点。\n - **建立**：在清剿后的地区重新建立秩序。\n - **过渡**：将权力移交给当地政府或其他合法力量。\n\n###2. **间接法**\n - **定义**：间接法通过非军事手段削弱叛乱分子的影响力和合法性。\n - **步骤**：\n - **协商**：与叛乱分子或其支持者进行谈判，争取和平解决冲突。\n - **发现**：通过情报活动识别叛乱网络的核心成员和组织结构。\n - **分离**：分化叛乱分子与其支持基础，削弱其社会根基。\n - **孤立**：切断叛乱分子的资金、物资和其他外部支持。\n - **影响**：通过宣传、心理战等手段改变民众对叛乱分子的看法。\n - **重新整合**：在叛乱被压制后，帮助当地政府重建社会秩序。\n\n###3. 针对不同类型叛乱的战略 - **城市叛乱**：\n - 特种部队通过情报渗透和直接行动打击叛乱分子的网络，控制关键区域。\n - **恐怖主义**：\n -采取快速、精确的军事行动摧毁恐怖组织的核心力量。\n - **农村叛乱**：\n - 在农村地区，特种部队可能与当地武装力量合作，逐步削弱叛乱分子的影响力。\n\n###4. 平衡多种作战手段 - 特种部队在反叛乱行动中会结合使用直接法和间接法，并综合运用心理战、宣传、情报活动等手段。\n - 同时，特种部队会与当地安全部队合作，帮助其重建能力，最终实现从军事主导向地方治理的平稳过渡。\n\n### 总结特种部队针对叛乱分子的战略方法主要包括**直接法**和**间接法**，并根据不同类型的叛乱（如城市、恐怖主义、农村）采取具体战术。通过情报活动、心理战、宣传和与当地安全部队的合作，特种部队能够在反叛乱行动中实现目标，逐步恢复社会秩序。\n\n<br>**参考来源**<br>&emsp;<a>1. 2014年FM3-18特种部队作战.pdf</a><br>`]
      }
    },
    template: `<div><cw-bubble-list
      :dataSource="list"
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
    </cw-bubble-list><div @click="onClickAddAnswer" style="padding-bottom: 300px">添加新回答</div></div>`,
    methods: {
      onClickAssist(current) {
        if (current.index === 0) {
          // current.item.content = current.item.content + ' Typing message hhh';
          current.item.entity1.loading = !current.item.entity1.loading;
        }
        current.item.entity1.typing = true;
        let count = 0;
        console.log(11)
//         const contents = [`思考和行动过程：
//   <div style="display: block; background: #f8f9fa; border-radius: 6px; margin: 1em 0; padding: 12px 16px; border-left: 3px solid #e9ecef; position: relative; font-family: 'Segoe UI Variable', system-ui, -apple-system, sans-serif; font-size: 0.95em; color: #00BFFF; box-shadow: 0 1px 2px rgba(0,0,0,0.05);">好，我现在要回答关于“城市作战的定义是什么”的问题。首先，我得看看提供的上下文里有哪些信息。

//   上下文中提到，美国陆军和海军陆战队对城市作战有不同的定义。陆军将其视为在人造建筑或高人口密度区域及其周边自然地带进行的各种军事行动。而海军陆战队则直接称其为在人造建筑和高人口密度的地方展开的军事活动（参考MCRP1-10.2）。

//   然后，这些信息都强调城市作战是统一地面行动中不可或缺的一部分。这说明它不仅限于单一军种，而是协同其他部队共同进行的复杂任务。

//   此外，上下文还提到在密集的城市地形中实施作战非常复杂且资源密集，指挥官需要精心安排部队和行动以完成任务。这里提到了地形、高密度人口等因素增加了复杂性，同时也涉及到与联合部队的协调。

//   综合来看，城市作战不仅仅是军事行动，还包括在复杂环境中应对多种挑战，如高人口密度、复杂的建筑环境以及与其他部队的合作。

//   所以，我应该把这些要点整理出来，明确陆军和海军陆战队的不同定义，并强调其复杂性和资源密集性。最后，总结它在整体联合战役中的重要地位。
//   </div>城市作战是指在以人造建筑和高人口密度为主要特征的复杂地形及其周边自然地带上实施的各种军事行动。根据美国陆军和海军陆战队的定义：

//   1. **美国陆军**将城市作战定义为：在以人造建筑或高人口密度为主要特征的复杂地形及其周边自然地带上计划并开展、或针对其中目标的所有类型的军事行动。

//   2. **美国海军陆战队**（MCRP1-10.2）将其定义为：在以人造建筑和高人口密度为主要特征的地方开展的军事行动。

//   城市作战是统一地面行动中不可或缺的一部分，涉及复杂的地形、密集的人口以及与其他部队和联合行动伙伴的合作。指挥官需要根据任务目的、时间和空间精心安排部队和行动以完成任务。

//   <br>**参考来源**<br>&emsp; <a data-longtext="这些短板可能
//   <br>会导致潜在动荡，增加人为风险的可能，同时会加重自然灾害的
//   <br>负面影响美国陆军将城市作战定义为：在以人造建筑或高人口
//   <br>密度为主要特征的复杂地形及其周边自然地带上计划并开展、或
//   <br>针对其中目标的所有类型的军事行动在海军陆战队的定义中，
//   <br>城市作战是指在以人造建筑和高人口密度为主要特征的地方开
//   <br>展的军事行动（MCRP 1-10.2）城市作战是统一地面行动中不可
//   <br>或缺的一部分" onclick="
//       // 创建提示框元素
//       const tooltip = document.createElement('div');
//       const arrow = document.createElement('div');
//       // 创建标题元素
//       const titleElement = document.createElement('h3');
//       titleElement.textContent = this.textContent.trim(); // 获取a标签文本并去除首尾空格
//       // 设置基础样式（修改定位方式为fixed）
//       Object.assign(tooltip.style, {
//         position: 'fixed',
//         background: '#ffffff',
//         color: '#000000',
//         padding: '8px 12px',
//         borderRadius: '8px',
//         fontSize: '14px',
//         lineHeight: '1.5',
//         maxWidth: '400px',
//         maxHeight: '400px',
//         overflowY: 'auto',
//         zIndex: '1000',
//         boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
//         opacity: '0',
//         transition: 'opacity 0.2s',
//         pointerEvents: 'auto',
//         whiteSpace: 'pre-wrap',
//         wordBreak: 'break-all',
//         boxSizing: 'border-box'
//       });
//       // 设置标题样式
//       Object.assign(titleElement.style, {
//         position: 'sticky',
//         top: '-8px',
//         backgroundColor: '#f8f9fa',
//         borderBottom: '1px solid #337eff',
//         fontSize: '12px',
//         color: '#337eff',
//         fontWeight: 'bold',
//         padding: '8px 8px',
//         borderRadius: '4px',
//         zIndex: '2'
//       });
//       // 先插入标题再插入箭头
//       tooltip.appendChild(titleElement);
//       tooltip.appendChild(arrow);
//       // 设置箭头样式（保持原有样式不变）
//       Object.assign(arrow.style, {
//         position: 'absolute',
//         top: '50%',
//         right: '100%',
//         marginTop: '-5px',
//         borderWidth: '5px',
//         borderStyle: 'solid',
//         borderColor: 'transparent #555 transparent transparent'
//       });
//       // 添加提示框到DOM
//       document.body.appendChild(tooltip);
//       // 设置内容（新增：将内容添加到标题元素之后）
//       const contentElement = document.createElement('div');
//       contentElement.textContent = this.dataset.longtext.replace(/(\s|<br>)/g, '\u00A0');
//       tooltip.appendChild(contentElement); // 将内容添加到标题下方
//       // 计算位置（保持原有计算逻辑，但使用fixed定位）
//       const rect = this.getBoundingClientRect();
//       const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
//       const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
//       let tooltipWidth = tooltip.offsetWidth;
//       let tooltipHeight = tooltip.offsetHeight;
//       let leftPos = rect.right + scrollLeft + 8;
//       if (leftPos + tooltipWidth > window.innerWidth) {
//         leftPos = rect.left + scrollLeft - tooltipWidth;
//       }
//       let topPos = rect.top + scrollTop - (tooltipHeight / 2);
//       if (topPos < 0) topPos = 0;
//       // 应用最终位置（使用fixed定位参数）
//       tooltip.style.left = leftPos + 'px';
//       tooltip.style.top = topPos + 'px';
//       // 显示提示框
//       tooltip.style.opacity = '1';
//       // 点击页面其他位置隐藏（保持原有逻辑不变）
//       const hideTooltip = () => {
//         tooltip.style.opacity = '0';
//         setTimeout(() => tooltip.remove(), 200);
//         document.removeEventListener('click', hideTooltip);
//       };
//       setTimeout(() => {
//         document.addEventListener('click', hideTooltip);
//       }, 10);
//       return false;">1. 2017年ATP3-06城市作战.pdf</a><br>`, `---
// __Advertisement :)__

//   i18n with plurals support and easy syntax.

// You will like those projects!

// ---
// ### **二、主要职能**

// 1. **美国陆军**将城市作战定义为：在以人造建筑或高人口密度为主要特征的复杂地形及其周边自然地带上计划并开展、或针对其中目标的所有类型的军事行动。

// 2. **美国海军陆战队**（MCRP1-10.2）将其定义为：在以人造建筑和高人口密度为主要特征的地方开展的军事行动。
// ---
//   `];
        const contents = [`思考和行动中，请稍后。。。\n<div style="display: block; background: #FCFDFF; border-radius: 6px; margin: 1em 0; padding: 12px 16px; border-left: 3px solid #e9ecef; position: relative; font-family: 'Segoe UI Variable', system-ui, -apple-system, sans-serif; font-size: 0.95em; color: #555555; box-shadow: 0 1px 2px rgba(0,0,0,0.05);">好的，现在用户的问题是“特种部队针对叛乱分子的战略方法有哪几种”。根据提供的上下文，我需要回顾相关内容，并组织回答。\n 上文中提到了两种主要的方法：直接法和间接法。此外，还有针对不同叛乱战略的具体战术，如城市和农村方法。我需要将这些内容整理出来，确保用户能够清晰地理解每种方法的定义和应用场景。\n\n首先，我会列出直接法和间接法的基本概念及其子步骤。然后，详细说明针对不同叛乱战略（城市、恐怖主义、农村）的方法，以及特种部队如何通过平衡多种作战手段来实现反叛乱目标。最后，强调特种部队在情报活动和与当地安全部队合作中的作用。\n\n确保回答结构清晰，每种方法都明确分开，并附上简要的解释，使用户能够全面理解特种部队的战略选择及其实施方式。\n</div>根据提供的上下文，特种部队针对叛乱分子的战略方法主要有以下两种：**直接法**和**间接法**。此外，还针对不同类型叛乱（如城市叛乱、恐怖主义、农村叛乱）采取了具体的战略。\n\n###1. **直接法**\n - **定义**：直接法是通过军事手段对叛乱分子进行打击。\n - **步骤**：\n - **塑造**：通过心理战、信息战等手段改变舆论，孤立叛乱分子。\n - **清除**：通过军事行动消灭或驱逐叛乱分子。\n - **占领**：控制叛乱地区的战略要点。\n - **建立**：在清剿后的地区重新建立秩序。\n - **过渡**：将权力移交给当地政府或其他合法力量。\n\n###2. **间接法**\n - **定义**：间接法通过非军事手段削弱叛乱分子的影响力和合法性。\n - **步骤**：\n - **协商**：与叛乱分子或其支持者进行谈判，争取和平解决冲突。\n - **发现**：通过情报活动识别叛乱网络的核心成员和组织结构。\n - **分离**：分化叛乱分子与其支持基础，削弱其社会根基。\n - **孤立**：切断叛乱分子的资金、物资和其他外部支持。\n - **影响**：通过宣传、心理战等手段改变民众对叛乱分子的看法。\n - **重新整合**：在叛乱被压制后，帮助当地政府重建社会秩序。\n\n###3. 针对不同类型叛乱的战略 - **城市叛乱**：\n - 特种部队通过情报渗透和直接行动打击叛乱分子的网络，控制关键区域。\n - **恐怖主义**：\n -采取快速、精确的军事行动摧毁恐怖组织的核心力量。\n - **农村叛乱**：\n - 在农村地区，特种部队可能与当地武装力量合作，逐步削弱叛乱分子的影响力。\n\n###4. 平衡多种作战手段 - 特种部队在反叛乱行动中会结合使用直接法和间接法，并综合运用心理战、宣传、情报活动等手段。\n - 同时，特种部队会与当地安全部队合作，帮助其重建能力，最终实现从军事主导向地方治理的平稳过渡。\n\n### 总结特种部队针对叛乱分子的战略方法主要包括**直接法**和**间接法**，并根据不同类型的叛乱（如城市、恐怖主义、农村）采取具体战术。通过情报活动、心理战、宣传和与当地安全部队的合作，特种部队能够在反叛乱行动中实现目标，逐步恢复社会秩序。\n\n<br>**参考来源**<br>&emsp;<a>1. 2014年FM3-18特种部队作战.pdf</a><br>`, `\n\n### **组成：**
1. 美国陆军特种部队司令部2. 美国陆军约翰·F·肯尼迪特战中心/学校（USAJFKSWCS）
3. 美国陆军特种作战航空司令部4. 军事信息支援行动司令部

### **职能：**
1.为地区作战指挥官和美国大使提供经过训练并做好准备的特种部队、游骑兵、特种作战航空队、军事信息支援和民事事务人员。`];
const interval = setInterval(() => {
          count++;
          current.item.entity1.content =  current.item.entity1.content + contents[count % contents.length];
          if(count > 5) {
            clearInterval(interval);
          }
        }, 1);
       
      },
      onClickStop(current) {
        current.item.entity1.typing = false;
      },
      onTypingComplete(current) {
        console.log('typingcomplete', current);
      },
      loadList() {
        return [
          {
            entity1: {
              key: 0,
              role: 'ai',
              content: `\`\`\`echarts
{
  "title": {
    "text": "维生素E库存趋势预测",
    "subtext": "基于维生素E近期数据的库存预测",
    "top": 20,
    "left": "center"
  },
  "grid": {
    "top": 80,
    "bottom": 80,
    "left": 60,
    "right": 40,
    "containLabel": true
  },
  "tooltip": {
    "trigger": "axis",
    "formatter": "{b}<br/>{a}: {c} 件"
  },
  "legend": {
    "data": ["预测库存线", "库存安全线"],
    "left": "center",
    "bottom": 10,
    "itemGap": 20
  },
  "xAxis": {
    "axisLabel": {
      "interval": 0,
      "rotate": 45,
      "align": "center"
    },
    "type": "category",
    "boundaryGap": false,
    "data": ["2025-04-24", "2025-04-25", "2025-04-26", "2025-04-27", "2025-04-28", "2025-04-29", "2025-04-30", "2025-05-01", "2025-05-02", "2025-05-03", "2025-05-04", "2025-05-05", "2025-05-06"]
  },
  "yAxis": {
    "type": "value",
    "axisLabel": {
      "formatter": "{value} 件"
    }
  },
  "series": [
    {
      "name": "预测库存线",
      "type": "line",
      "data": [20000, 18500, 16500, 15000, 13500, 12000, 10500, 8500, 7000, 5500, 4000, 2500, 15000],
      "symbol": "circle",
      "symbolSize": 6,
      "lineStyle": {
        "color": "#ff9900",
        "width": 2,
        "type": "dashed"
      },
      "emphasis": {
        "itemStyle": {
          "color": "#ff6600"
        }
      }
    },
    {
      "name": "库存安全线",
      "type": "line",
      "data": [4000, 4000, 4000, 4000, 4000, 4000, 4000, 4000, 4000, 4000, 4000, 4000, 4000],
      "lineStyle": {
        "type": "dotted",
        "color": "#ff3333",
        "width": 2
      }
    }
  ]
}
\`\`\``,
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
            },
          },
          {entity1: {
            key: 0,
            role: 'ai',
            content: `思考和行动中，请稍后。。。\n<div style="display: block; background: #FCFDFF; border-radius: 6px; margin: 1em 0; padding: 12px 16px; border-left: 3px solid #e9ecef; position: relative; font-family: 'Segoe UI Variable', system-ui, -apple-system, sans-serif; font-size: 0.95em; color: #555555; box-shadow: 0 1px 2px rgba(0,0,0,0.05);">好的，现在用户的问题是“特种部队针对叛乱分子的战略方法有哪几种”。根据提供的上下文，我需要回顾相关内容，并组织回答。\n 上文中提到了两种主要的方法：直接法和间接法。此外，还有针对不同叛乱战略的具体战术，如城市和农村方法。我需要将这些内容整理出来，确保用户能够清晰地理解每种方法的定义和应用场景。\n\n首先，我会列出直接法和间接法的基本概念及其子步骤。然后，详细说明针对不同叛乱战略（城市、恐怖主义、农村）的方法，以及特种部队如何通过平衡多种作战手段来实现反叛乱目标。最后，强调特种部队在情报活动和与当地安全部队合作中的作用。\n\n确保回答结构清晰，每种方法都明确分开，并附上简要的解释，使用户能够全面理解特种部队的战略选择及其实施方式。\n</div>根据提供的上下文，特种部队针对叛乱分子的战略方法主要有以下两种：**直接法**和**间接法**。此外，还针对不同类型叛乱（如城市叛乱、恐怖主义、农村叛乱）采取了具体的战略。\n\n###1. **直接法**\n - **定义**：直接法是通过军事手段对叛乱分子进行打击。\n - **步骤**：\n - **塑造**：通过心理战、信息战等手段改变舆论，孤立叛乱分子。\n - **清除**：通过军事行动消灭或驱逐叛乱分子。\n - **占领**：控制叛乱地区的战略要点。\n - **建立**：在清剿后的地区重新建立秩序。\n - **过渡**：将权力移交给当地政府或其他合法力量。\n\n###2. **间接法**\n - **定义**：间接法通过非军事手段削弱叛乱分子的影响力和合法性。\n - **步骤**：\n - **协商**：与叛乱分子或其支持者进行谈判，争取和平解决冲突。\n - **发现**：通过情报活动识别叛乱网络的核心成员和组织结构。\n - **分离**：分化叛乱分子与其支持基础，削弱其社会根基。\n - **孤立**：切断叛乱分子的资金、物资和其他外部支持。\n - **影响**：通过宣传、心理战等手段改变民众对叛乱分子的看法。\n - **重新整合**：在叛乱被压制后，帮助当地政府重建社会秩序。\n\n###3. 针对不同类型叛乱的战略 - **城市叛乱**：\n - 特种部队通过情报渗透和直接行动打击叛乱分子的网络，控制关键区域。\n - **恐怖主义**：\n -采取快速、精确的军事行动摧毁恐怖组织的核心力量。\n - **农村叛乱**：\n - 在农村地区，特种部队可能与当地武装力量合作，逐步削弱叛乱分子的影响力。\n\n###4. 平衡多种作战手段 - 特种部队在反叛乱行动中会结合使用直接法和间接法，并综合运用心理战、宣传、情报活动等手段。\n - 同时，特种部队会与当地安全部队合作，帮助其重建能力，最终实现从军事主导向地方治理的平稳过渡。\n\n### 总结特种部队针对叛乱分子的战略方法主要包括**直接法**和**间接法**，并根据不同类型的叛乱（如城市、恐怖主义、农村）采取具体战术。通过情报活动、心理战、宣传和与当地安全部队的合作，特种部队能够在反叛乱行动中实现目标，逐步恢复社会秩序。\n\n<br>**参考来源**<br>&emsp;<a>1. 2014年FM3-18特种部队作战.pdf</a><br>`,
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
          {
            entity1: {
              key: 0,
              role: 'user',
              content: 'This is user message',
              name: 'User',
              time: '2022-01-01 12:00:00',
            },
          },
          {
            entity1: {
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
              ],
            },
          },
        ];
      },
    },
  }),
  args: {
    text: 'Hello world',
    dataSource: [
      {
        entity1: {
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
        },
      },
      {
        entity1: {
          key: 0,
          role: 'user',
          content: 'This is user message',
          name: 'User',
          time: '2022-01-01 12:00:00',
        },
      },
      {
        entity1: {
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
          ],
        },
      },
    ],
  },
};
