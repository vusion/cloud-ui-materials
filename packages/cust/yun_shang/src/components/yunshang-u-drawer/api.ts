/// <reference types="@nasl/types" />
/// <reference types="../../../.lcap/lcap-ui/runtime/nasl.ui.d.ts" />
namespace extensions.yun_shang.viewComponents {
  const { Component, Prop, ViewComponent, Slot, Method, Param, Event, ViewComponentOptions } = nasl.ui;
  @ExtensionComponent({
    replaceNaslUIComponent: 'UDrawer',
    type: 'pc',
    show: true,
    ideusage: {
      idetype: 'drawer',
      selector: {
        expression: "this.getElement(el => el.slotTarget === 'body')",
        cssSelector: "div[class^='yunshang-u-drawer_drawer']",
      },
      cacheOpenKey: 'visible',
      additionalAttribute: {
        ':mode': '"false"',
      },
      useFeedbackWrapper: true,
    },
  })
  @Component({
    title: '抽屉',
    icon: 'drawer',
    description: '抽屉',
    // group: 'Feedback',
  })
  export class YunshangUDrawer extends ViewComponent {
    @Prop({
      title: '显示状态',
    })
    visible: nasl.core.Boolean;
    @Method({
      title: 'undefined',
      description: '打开抽屉',
    })
    open(): void {}
    @Method({
      title: 'undefined',
      description: '关闭抽屉',
    })
    close(): void {}
    constructor(options?: Partial<YunshangUDrawerOptions>) {
      super();
    }
  }
  export class YunshangUDrawerOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: '抽屉位置',
      description: '抽屉弹出的位置',
      docDescription: '支持选择抽屉的显示位置，支持左、右两个位置',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          {
            title: '左',
          },
          {
            title: '右',
          },
          {
            title: '上',
          },
          {
            title: '下',
          },
        ],
      },
    })
    placement: 'left' | 'right' | 'top' | 'bottom' = 'right';
    @Prop({
      group: '主要属性',
      title: '显示顶部栏',
      docDescription: '控制抽屉顶部栏的开启和关闭',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    showHead: nasl.core.Boolean = true;
    @Prop({
      group: '主要属性',
      title: '显示底部栏',
      docDescription: '控制抽屉底部栏的开启和关闭',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    showFoot: nasl.core.Boolean = true;
    @Prop({
      group: '交互属性',
      title: '点击遮罩关闭',
      description: '点击遮罩关闭抽屉',
      docDescription: `控制抽屉打开时，点击遮罩区域的作用，默认开启。
- 开启：点击遮罩区域则自动关闭抽屉。
- 关闭：点击遮罩区域无实际作用`,
      setter: {
        concept: 'SwitchSetter',
      },
    })
    maskClosable: nasl.core.Boolean = true;
    @Prop({
      group: '状态属性',
      title: '显示状态',
      description: '显示状态分为“True(打开)/False(关闭)”，默认为“打开”',
      sync: true,
      docDescription: '控制抽屉是否进入页面时自动显示。开启表示自动显示，关闭表示不自动显示',
      setter: {
        concept: 'SwitchSetter',
      },
      settable: true,
    })
    visible: nasl.core.Boolean = false;
    @Prop({
      group: '样式属性',
      title: '尺寸',
      description: '抽屉的尺寸',
      docDescription: '支持配置抽屉的宽度或者高度，支持小、正常、大、三个尺寸',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          {
            title: '小',
          },
          {
            title: '正常',
          },
          {
            title: '大',
          },
        ],
      },
    })
    size: 'small' | 'normal' | 'large' = 'normal';

    @Prop({
      group: '样式属性',
      title: '宽度',
      description: '抽屉的宽度（高优先级）',
      docDescription: '配置一个数字',
      setter: {
        concept: 'NumberInputSetter',
      },
    })
    drawerWidth: nasl.core.Integer;

    @Event({
      title: '打开时',
      description: '打开抽屉时触发',
    })
    onOpen: (event: any) => any;
    @Event({
      title: '打开后',
      description: '打开抽屉后触发，动画执行完成后',
    })
    onOpened: (event: any) => any;
    @Event({
      title: '关闭前',
      description: '关闭抽屉前触发',
    })
    onBeforeClose: (event: { ok: nasl.core.Boolean }) => any;
    @Event({
      title: '关闭时',
      description: '关闭抽屉时触发',
    })
    onClose: (event: { ok: nasl.core.Boolean }) => any;
    @Event({
      title: '点击遮罩关闭时',
      description: '点击遮罩关闭抽屉时触发',
    })
    onMask: (event: any) => any;
    @Event({
      title: '点击esc关闭时',
      description: '点击esc关闭抽屉时触发',
    })
    onEsc: (event: any) => any;
    @Slot({
      title: '头部',
      description: '插入文本或 HTML。',
    })
    slotTitle: () => Array<nasl.ui.ViewComponent>;
    @Slot({
      title: '内容区',
      description: '插入文本或 HTML。',
    })
    slotBody: () => Array<nasl.ui.ViewComponent>;
    @Slot({
      title: '底部',
      description: '插入文本或 HTML。',
    })
    slotFoot: () => Array<nasl.ui.ViewComponent>;
  }
}
