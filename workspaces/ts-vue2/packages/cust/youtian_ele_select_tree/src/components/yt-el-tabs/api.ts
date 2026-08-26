/// <reference types="@nasl/types" />
/// <reference types="../../../.lcap/lcap-ui/runtime/nasl.ui.d.ts" />
namespace extensions.youtian_ele_select_tree.viewComponents {
  const {
    Component,
    Prop,
    ViewComponent,
    Slot,
    Method,
    Param,
    Event,
    ViewComponentOptions
  } = nasl.ui;
  @ExtensionComponent({
    replaceNaslUIComponent: "ElTabs",
    type: "pc",
    show: true,
    ideusage: {
      "idetype": "container",
      "structured": true,
      "childAccept": "target.tag === 'el-tab-pane'",
      "dataSource": {
        "dismiss": "!this.getAttribute('dataSource') && this.getDefaultElements().length > 0",
        "display": 1,
        "loopRule": "nth-child(n+3)",
        "loopElem": " > .el-tabs__nav > .el-tabs__item",
        "emptySlot": {
          "display": "large",
          "condition": "!this.getAttribute('dataSource')",
          "accept": false
        }
      },
      "displaySlotInline": {
        "label": true
      },
      "events": {
        "click": true
      },
      "displaySlotConditions": {
        "label": "!!this.getAttribute('dataSource')",
        "content": "!!this.getAttribute('dataSource')"
      }
    }
  })
  @Component({
    title: '选项卡',
    icon: 'tabs',
    description: '分隔内容上有关联但属于不同类别的数据集合。',
    group: 'Selector'
  })
  export class ElTabs<T, V> extends ViewComponent {
    @Method({
      title: '重新加载',
      description: '清除缓存，重新加载'
    })
    reload(): void {}
    constructor(options?: Partial<ElTabsOptions<T, V>>) {
      super();
    }
  }
  export class ElTabsOptions<T, V> extends ViewComponentOptions {
    @Prop({
      group: '数据属性',
      title: '数据源',
      description: '展示数据的输入源，可设置为集合类型变量（List<T>）或输出参数为集合类型的逻辑。',
      docDescription: '支持动态绑定集合类型变量（List<T>）或输出参数为集合类型的逻辑',
      designerValue: [{}, {}, {}],
      setter: {
        concept: 'DataSourceSetter'
      }
    })
    dataSource: {
      list: nasl.collection.List<T>;
      total: nasl.core.Integer;
    } | nasl.collection.List<T>;
    @Prop({
      group: '数据属性',
      title: '数据类型',
      description: '数据源返回的数据结构的类型，自动识别类型进行展示说明',
      docDescription: '该属性为只读状态，当数据源动态绑定集合List<T>后，会自动识别T的类型并进行展示。'
    })
    dataSchema: T;
    @Prop<ElTabsOptions<T, V>, 'titleField'>({
      group: '数据属性',
      title: '文本字段',
      description: '集合的元素类型中，用于显示文本的属性名称',
      docDescription: '集合的元素类型中，用于显示文本的属性名称，支持自定义变更。',
      setter: {
        concept: 'PropertySelectSetter'
      }
    })
    titleField: (item: T) => nasl.core.String = ((item: any) => item.title) as any;
    @Prop<ElTabsOptions<T, V>, 'valueField'>({
      group: '数据属性',
      title: '值字段',
      description: '集合的元素类型中，用于标识选中值的属性',
      docDescription: '集合的元素类型中，用于标识选中值的属性，支持自定义变更',
      setter: {
        concept: 'PropertySelectSetter'
      }
    })
    valueField: (item: T) => V = ((item: any) => item.value) as any;
    @Prop<ElTabsOptions<T, V>, 'tabPaneProps'>({
      group: '数据属性',
      title: '标签页属性设置',
      description: '开启数据源后，设置每个标签页属性',
      setter: {
        concept: 'AnonymousFunctionSetter'
      },
      if: _ => !!_.dataSource,
      bindOpen: true
    })
    tabPaneProps: (current: nasl.ui.Current<T>) => {
      disabled: nasl.core.Boolean;
      closable: nasl.core.Boolean;
      lazy: nasl.core.Boolean;
    };
    @Prop({
      group: '数据属性',
      title: '选中值',
      description: '绑定值，选中选项卡的 name',
      setter: {
        concept: 'InputSetter'
      },
      sync: true
    })
    value: nasl.core.String;
    @Prop({
      group: '主要属性',
      title: '风格样式',
      description: '风格样式',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{
          title: '默认样式'
        }, {
          title: '选项卡样式的标签页'
        }, {
          title: '卡片化的标签页'
        }]
      }
    })
    type: '' | 'card' | 'border-card' = '';
    @Prop({
      group: '主要属性',
      title: '可关闭',
      description: '标签页是否可关闭',
      setter: {
        concept: 'SwitchSetter'
      }
    })
    closable: nasl.core.Boolean = false;
    @Prop({
      group: '主要属性',
      title: '可增加',
      description: '标签页是否可增加',
      setter: {
        concept: 'SwitchSetter'
      }
    })
    addable: nasl.core.Boolean = false;

    // @Prop({
    //   group: '主要属性',
    //   title: '可添加/关闭',
    //   description: '标签是否同时可增加和关闭',
    //   setter: { concept: 'SwitchSetter' },
    // })
    // editable: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '选项卡所在位置',
      description: '选项卡所在位置',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{
          title: '上'
        }, {
          title: '右'
        }, {
          title: '下'
        }, {
          title: '左'
        }]
      }
    })
    tabPosition: 'top' | 'right' | 'bottom' | 'left' = 'top';
    @Prop({
      group: '主要属性',
      title: '标签的宽度是否自撑开',
      description: '标签的宽度是否自撑开',
      setter: {
        concept: 'SwitchSetter'
      }
    })
    stretch: nasl.core.Boolean = false;
    @Prop({
      group: '主要属性',
      title: '切换标签之前的逻辑',
      description: '切换标签之前的钩子，若返回 false 则阻止切换。',
      setter: {
        concept: 'AnonymousFunctionSetter'
      }
    })
    beforeLeave: (activeName: nasl.core.String, oldActiveName: nasl.core.String) => nasl.core.Boolean;
    @Event({
      title: '改变时',
      description: '激活标签页改变时触发'
    })
    onInput: (event: nasl.core.String) => void;
    @Event({
      title: '点击标签页',
      description: 'tab 被选中时触发'
    })
    onTabClick: (event: {
      active: nasl.core.Boolean;
      loaded: nasl.core.Boolean;
      isClosable: nasl.core.Boolean;
      value: nasl.core.String;
    }) => void;
    @Event({
      title: '点击移除按钮时',
      description: '点击移除按钮后触发'
    })
    onTabRemove: (event: nasl.core.String) => void;
    @Event({
      title: '点击新增按钮',
      description: '点击 tabs 的新增按钮后触发'
    })
    onTabAdd: (event: {}) => void;
    @Event({
      title: '点击新增按钮或关闭',
      description: '点击 tabs 的新增按钮或 tab 被关闭后触发'
    })
    onTabEdit: (event: {
      value: nasl.core.String;
      action: 'add' | 'remove';
    }) => void;
    @Slot({
      title: '标签页',
      description: '内容',
      emptyBackground: 'add-sub',
      snippets: [{
        title: '标签页',
        code: '<el-tab-pane><template #label><el-text text="标签页"></el-text></template><template #default><el-text text="内容"></el-text></template></el-tab-pane>'
      }]
    })
    slotDefault: () => Array<nasl.ui.ViewComponent>;
    @Slot({
      title: '标签页标题',
      description: '标签页标题'
    })
    slotLabel: (current: nasl.ui.Current<T>) => Array<nasl.ui.ViewComponent>;
    @Slot({
      title: '标签页内容',
      description: '标签页内容'
    })
    slotContent: (current: nasl.ui.Current<T>) => Array<nasl.ui.ViewComponent>;
  }
  @ExtensionComponent({
    type: "pc",
    show: true,
    ideusage: {
      "idetype": "container",
      "parentAccept": "target.tag.endsWith('el-tabs')",
      "selector": [{
        "expression": "this.getElement(el => el.slotTarget === 'label')",
        "cssSelector": ".el-tabs__item"
      }, {
        "expression": "this",
        "cssSelector": ".el-tab-pane"
      }],
      "displaySlotInline": {
        "label": true
      },
      "events": {
        "click": true
      },
      "forceRefresh": "parent"
    }
  })
  @Component({
    title: '标签页',
    description: '标签页'
  })
  export class ElTabPane extends ViewComponent {
    constructor(options?: Partial<ElTabPaneOptions>) {
      super();
    }
  }
  export class ElTabPaneOptions extends ViewComponentOptions {
    // @Prop({
    //   group: '主要属性',
    //   title: '选项卡标题',
    //   description: '选项卡标题',
    //   setter: { concept: 'InputSetter' },
    // })
    // label: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '值',
      description: '与选项卡绑定值对应的标识符',
      setter: {
        concept: 'InputSetter'
      }
    })
    name: nasl.core.String;
    @Prop({
      group: '主要属性',
      title: '是否禁用',
      description: '是否禁用',
      setter: {
        concept: 'SwitchSetter'
      }
    })
    disabled: nasl.core.Boolean = false;
    @Prop({
      group: '主要属性',
      title: '标签是否可关闭',
      description: '标签是否可关闭',
      setter: {
        concept: 'SwitchSetter'
      }
    })
    closable: nasl.core.Boolean = false;
    @Prop({
      group: '主要属性',
      title: '标签是否延迟渲染',
      description: '标签是否延迟渲染',
      setter: {
        concept: 'SwitchSetter'
      }
    })
    lazy: nasl.core.Boolean = false;
    @Slot({
      title: '标签页内容',
      description: '标签页内容'
    })
    slotDefault: () => Array<nasl.ui.ViewComponent>;
    @Slot({
      title: '标签页标题',
      description: '标签页标题'
    })
    slotLabel: () => Array<nasl.ui.ViewComponent>;
  }
}