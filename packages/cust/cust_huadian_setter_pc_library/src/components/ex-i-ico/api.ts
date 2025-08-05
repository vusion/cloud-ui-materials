/// <reference types="@nasl/types" />
/// <reference types="../../../.lcap/lcap-ui/runtime/nasl.ui.d.ts" />
namespace extensions.cust_huadian_setter_pc_library.viewComponents {
  const { Component, Prop, ViewComponent, Slot, Method, Param, Event, ViewComponentOptions } = nasl.ui;
  @ExtensionComponent({
    replaceNaslUIComponent: 'IIco',
    type: 'pc',
    show: true,
    ideusage: {
      idetype: 'container',
      _kind: '扩展',
    },
  })
  @Component({
    title: '图标-扩展',
    icon: 'icon',
    description: '图标',
    group: 'Display',
  })
  export class ExIIco extends ViewComponent {
    constructor(options?: Partial<ExIIcoOptions>) {
      super();
    }
  }
  export class ExIIcoOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: '图标',
      docDescription: '支持从图标库选择图标或上传自定义图标。',
      setter: {
        concept: 'CustomSetter', // 固定名称
        name: 'ExIconSetter', // 自定义组件的名称 配置再entries下的key
        argumentMap: {}, // 自定义setter的其他属性
      },
    })
    name: nasl.core.String = '';
    @Prop({
      group: '主要属性',
      title: '图标布局',
      description: '图标和文本的布局方式',
      docDescription: '支持选择图标的展示方式，包括仅图标、组合图标-上下、组合图标-左右三种方式。',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          {
            title: '仅图标',
          },
          {
            title: '组合图标-上下',
          },
          {
            title: '组合图标-左右',
          },
        ],
      },
    })
    icotype: 'only' | 'top' | 'left' = 'top';
    @Prop({
      group: '交互属性',
      title: '链接类型',
      docDescription: '支持页面跳转、普通链接、下载链接。',
      bindHide: true,
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          {
            title: '页面跳转',
          },
          {
            title: '下载链接',
          },
        ],
      },
    })
    linkType: 'destination' | 'download' = 'destination';
    @Prop({
      group: '交互属性',
      title: '链接地址',
      docDescription: '链接的详细地址。',
    })
    hrefAndTo: nasl.core.String;
    @Prop({
      group: '交互属性',
      title: '链接打开方式',
      description: '链接跳转的打开方式，父级窗口和顶级窗口仅适用于iframe组件嵌套的情况，若不存在嵌套，则其打开方式同当前窗口。',
      docDescription:
        '可选新窗口、父级窗口、当前窗口和顶级窗口，其中父级窗口和顶级窗口仅适用于iframe组件嵌套的情况，若不存在嵌套，则打开方式同当前窗口。',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          {
            title: '新窗口',
          },
          {
            title: '当前窗口',
          },
          {
            title: '父级窗口',
          },
          {
            title: '顶级窗口',
          },
        ],
      },
    })
    target: '_blank' | '_self' | '_parent' | '_top' = '_self';
    @Event({
      title: '点击后',
      description: '点击此项时触发',
    })
    onClick: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    @Event({
      title: '双击',
      description: '双击此项时触发',
    })
    onDblclick: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    @Event({
      title: '右键点击',
      description: '右键点击此项时触发',
    })
    onRightclick: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    @Event({
      title: '鼠标移入',
      description: '鼠标移入此项时触发',
    })
    onOver: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    @Event({
      title: '鼠标移出',
      description: '鼠标移出此项时触发',
    })
    onOut: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    @Event({
      title: '鼠标按下',
      description: '鼠标按下此项时触发',
    })
    onDown: (event: {
      altKey: nasl.core.Boolean;
      button: nasl.core.Integer;
      clientX: nasl.core.Integer;
      clientY: nasl.core.Integer;
      ctrlKey: nasl.core.Boolean;
      metaKey: nasl.core.Boolean;
      movementX: nasl.core.Integer;
      movementY: nasl.core.Integer;
      offsetX: nasl.core.Integer;
      offsetY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      screenX: nasl.core.Integer;
      screenY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    @Slot({
      title: '默认',
      description: '插入文本或 HTML。',
    })
    slotDefault: () => Array<nasl.ui.ViewComponent>;
  }
}
