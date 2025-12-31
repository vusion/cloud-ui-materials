/// <reference types="@nasl/types" />
namespace extensions.cw_antd_x_vue_2.viewComponents {
  const { Component, Prop, ViewComponent, Slot, Method, Event, ViewComponentOptions } = nasl.ui;

  @ExtensionComponent({
    type: 'both',
    ideusage: {
      idetype: 'container',
      childAccept: "target.tag === 'cw-bubble'",
      dataSource: {
        dismiss: "!this.getAttribute('dataSource') && this.getDefaultElements().length > 0",
        display: 4,
        loopRule: 'nth-last-child(-n+2):not(:only-child)',
        loopElem: "> div",
        displayData: "\"[{role: 'ai'}, {role:'user'}, {role: 'ai'}, {role:'user'}]\"",
        propertyName: ':dataSource',
        emptySlot: {
          display: 'inline',
          condition: "!this.getAttribute('dataSource')",
          accept: false,
          content: '"请绑定数据源或插入子节点"',
        },
        slotWrapperInlineStyle: {
          default: 'display: inline-block;',
        },
      },
      additionalAttribute: {
        roleField: '"role"',
        leftRoleName: '"ai"',
        rightRoleName: '"user"',
      },
      displaySlotConditions: {
        itemFollter: "!!this.getAttribute('dataSource')"
      },
    },
  })
  @Component({
    title: '对话气泡',
    description: '对话气泡',
  })
  export class CwBubbleList<T> extends ViewComponent {
    constructor(options?: Partial<CwBubbleListOptions<T>>) {
      super();
    }

    @Method({
      title: '重新加载数据',
      description: '重新加载数据'
    })
    reload(): void {} // 需要提供重新加载数据源的方法
  }

  export class CwBubbleListOptions<T> extends ViewComponentOptions {
    @Prop({
      group: '数据属性',
      title: '数据源',
      description: '展示数据的输入源，可设置为数据集对象或者返回数据集的逻辑',
      docDescription: '列表展示的数据。数据源可以绑定变量或者逻辑。变量或逻辑的返回值可以是数组，也可以是对象。对象格式为{list:[], total:10}',
      bindOpen: true,
    })
    dataSource: { list: nasl.collection.List<T>; total: nasl.core.Integer } | nasl.collection.List<T>;

    @Prop({
      group: '数据属性',
      title: '数据类型',
      description: '数据源返回的数据结构的类型，自动识别类型进行展示说明',
      docDescription: '列表每一行的数据类型。该属性为展示属性，由数据源推倒得到，无需填写。',
    })
    dataSchema: T;

    @Prop({
      group: '数据属性',
      title: '角色字段',
      description: '角色的字段名',
      setter: {
        concept: "PropertySelectSetter"
      }
    })
    roleField: (item: T) => any = ((item: any) => item.role) as any;

    @Prop({
      group: '数据属性',
      title: '左侧角色值',
      description: '左侧展示的角色值',
      setter: {
        concept: "InputSetter"
      }
    })
    leftRoleName: nasl.core.String;

    @Prop({
      group: '数据属性',
      title: '右侧角色值',
      description: '右侧展示的角色值',
      setter: {
        concept: "InputSetter"
      }
    })
    rightRoleName: nasl.core.String;

    @Slot({
      title: '左侧对话气泡',
      description: '左侧对话气泡',
    })
    slotLeftBubble: (current: nasl.ui.Current<T>) => Array<nasl.ui.ViewComponent>;

    @Slot({
      title: '右侧对话气泡',
      description: '右侧对话气泡',
    })
    slotRightBubble: (current: nasl.ui.Current<T>) => Array<nasl.ui.ViewComponent>;
  }

  @ExtensionComponent({
    type: 'both',
    ideusage: {
      idetype: 'container',
      additionalAttribute: {
        role: '"ai"',
        content: '"Normal message"',
        name: '"Name"',
        time: '"2025-03-12 16:35:47"',
      },
       operator: {
        copy: false,
        duplicate: false,
        delete: false,
        cut: false,
        d2c: false,
      }
    }
  })
  @Component({
    title: '对话气泡项',
    description: '对话气泡项',
  })
  export class CwBubble<T> extends ViewComponent {
    constructor(options?: Partial<CwBubbleOptions<T>>) {
      super();
    }
  }

  export class CwBubbleOptions<T> extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: '内容值',
      description: '内容的值字段',
      setter: {
          concept: 'InputSetter',
      },
      bindOpen: true,
    })
    content: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '显示头像',
      description: '是否显示头像，默认开启',
      setter: {
          concept: 'SwitchSetter',
      },
    })
    showAvatar: nasl.core.Boolean = true;

    @Prop<CwBubbleOptions<T>, 'avatar'>({
      group: '主要属性',
      title: '头像值',
      description: '头像值对应的字段',
      setter: {
          concept: 'InputSetter',
      },
      if: (_) => _.showAvatar === true,
      bindOpen: true,
    })
    avatar: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '显示昵称',
      description: '是否显示昵称，默认开启',
      setter: {
          concept: 'SwitchSetter',
      },
    })
    showUserName: nasl.core.Boolean = true;

    @Prop<CwBubbleOptions<T>, 'name'>({
      group: '主要属性',
      title: '昵称值',
      description: '昵称值对应的字段',
      setter: {
          concept: 'InputSetter',
      },
      if: (_) => _.showUserName === true,
      bindOpen: true,
    })
    name: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '显示时间',
      description: '是否展示时间，默认开启',
      setter: {
          concept: 'SwitchSetter',
      },
    })
    showTime: nasl.core.Boolean = true;

    @Prop<CwBubbleOptions<T>, 'time'>({
      group: '主要属性',
      title: '时间值',
      description: '时间值对应的字段',
      setter: {
          concept: 'InputSetter',
      },
      if: (_) => _.showTime === true,
      bindOpen: true,
    })
    time: nasl.core.DateTime|nasl.core.Date|nasl.core.Time;

    @Prop({
      group: '主要属性',
      title: '文件列表值',
      description: '文件列表值对应的字段',
      setter: {
          concept: 'InputSetter',
      },
      bindOpen: true,
    })
    fileList: nasl.collection.List<any>;

    @Prop({
      group: '主要属性',
      title: '显示底部插槽',
      description: '是否显示底部插槽，默认关闭',
      setter: {
          concept: 'SwitchSetter',
      },
    })
    showFooter: nasl.core.Boolean = false;

    @Prop({
      group: '状态属性',
      title: '加载中',
      description: '是否加载中，默认关闭',
      setter: { concept: 'SwitchSetter' },
    })
    loading: nasl.core.Boolean = false;

    @Prop({
      group: '状态属性',
      title: '打字机效果',
      description: '是否打字机效果，默认开启',
      setter: { concept: 'SwitchSetter' },
    })
    typing: nasl.core.Boolean = true;

    @Prop({
      group: '样式属性',
      title: '气泡形状',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '全圆角' }, { title: '胶囊型' }, { title: '切角' }, { title: '无' }],
      },
    })
    shape: 'normal' | 'round' | 'corner' | 'none' = 'normal';

    @Prop({
      group: '样式属性',
      title: '填充背景',
      docDescription: '控制气泡是否填充背景，默认开启',
      setter: {
          concept: 'SwitchSetter',
      },
    })
    filled: nasl.core.Boolean = true;

    @Prop({
      group: '样式属性',
      title: '显示边框',
      docDescription: '控制气泡边框的显隐，默认开启',
      setter: {
          concept: 'SwitchSetter',
      },
    })
    border: nasl.core.Boolean = false;

    @Prop({
      group: '样式属性',
      title: '阴影',
      docDescription: '控制气泡是否展示阴影，默认开启',
      setter: {
          concept: 'SwitchSetter',
      },
    })
    shadow: nasl.core.Boolean = false;

    @Event({
      title: '打字完成时',
      description: '打字效果完成时触发',
    })
    onTypingComplete: (event: any) => any;

    @Slot({
      title: '底部内容',
      description: '底部内容',
    })
    slotFooter: () => Array<nasl.ui.ViewComponent>;
  }
}