/// <reference types="@nasl/types" />
/// <reference types="../../../.lcap/lcap-ui/runtime/nasl.ui.d.ts" />
namespace extensions.cust_gaoxin_navbar_library.viewComponents {
  const { Component, Prop, ViewComponent, Slot, Method, Param, Event, ViewComponentOptions } = nasl.ui;
  @ExtensionComponent({
    // replaceNaslUIComponent: 'UNavbarMulti',
    type: 'pc',
    show: true,
    ideusage: {
      idetype: 'container',
      structured: true,
      childAccept: "['gx-u-navbar-group-multi', 'gx-u-navbar-item-multi', 'gx-u-navbar-divider-multi'].includes(target.tag)",
    },
  })
  @Component({
    title: '导航栏',
    icon: 'navbar-multi',
    description: '通常用于页面顶部的导航菜单，放置 Logo、导航链接、用户信息等。',
    // group: 'Navigation',
  })
  export class GxUNavbarMulti<T, V> extends ViewComponent {
    @Prop({
      title: '数据',
    })
    data: nasl.collection.List<T>;
    @Prop({
      title: '选中值',
    })
    value: GxUNavbarMultiOptions<T, V>['value'];
    @Prop({
      title: '禁用',
    })
    disabled: nasl.core.Boolean;
    @Prop({
      title: '只读',
    })
    readonly: nasl.core.Boolean;
    constructor(options?: Partial<GxUNavbarMultiOptions<T, V>>) {
      super();
    }
  }
  export class GxUNavbarMultiOptions<T, V> extends ViewComponentOptions {
    @Prop<GxUNavbarMultiOptions<T, V>, 'hasDataSource'>({
      group: '数据属性',
      title: '数据源配置',
      bindHide: true,
      setter: {
        concept: 'SwitchSetter',
      },
      onChange: [
        {
          clear: [
            'optionIsSlot',
            'dataSource',
            'dataSchema',
            'textField',
            'toField',
            'iconField',
            'valueField',
            'parentField',
            'linkTypeField',
            'targetField',
          ],
        },
      ],
    })
    hasDataSource: nasl.core.Boolean = false;

    @Prop<GxUNavbarMultiOptions<T, V>, 'optionIsSlot'>({
      group: '数据属性',
      title: '动态选项插槽',
      description: '自定义选项内容',
      docDescription: '自定义选项内容',
      setter: {
        concept: 'SwitchSetter',
      },
      bindHide: true,
      if: (_) => _.hasDataSource,
    })
    optionIsSlot: nasl.core.Boolean;

    @Prop<GxUNavbarMultiOptions<T, V>, 'dataSource'>({
      group: '数据属性',
      title: '数据源',
      description: '展示数据的输入源，可设置为集合类型变量（List<T>）或输出参数为集合类型的逻辑。',
      docDescription: '支持动态绑定集合类型变量（List<T>）或输出参数为集合类型的逻辑',
      designerValue: [{}, {}, {}],
      if: (_) => _.hasDataSource === true,
      bindOpen: true,
    })
    dataSource:
      | nasl.collection.List<T>
      | {
          list: nasl.collection.List<T>;
          total: nasl.core.Integer;
        };
    @Prop<GxUNavbarMultiOptions<T, V>, 'dataSchema'>({
      group: '数据属性',
      title: '数据类型',
      description: '数据源返回的数据结构的类型，自动识别类型进行展示说明',
      docDescription: '该属性为只读状态，当数据源动态绑定集合List<T>后，会自动识别T的类型并进行展示',
      if: (_) => _.hasDataSource === true,
    })
    dataSchema: T;
    @Prop<GxUNavbarMultiOptions<T, V>, 'textField'>({
      group: '数据属性',
      title: '文本字段',
      description: '集合的元素类型中，用于显示文本的属性名称',
      setter: {
        concept: 'PropertySelectSetter',
      },
      if: (_) => _.hasDataSource === true,
    })
    textField: (item: T) => any = ((item: any) => item.text) as any;
    @Prop<GxUNavbarMultiOptions<T, V>, 'valueField'>({
      group: '数据属性',
      title: '值字段',
      description: '集合的元素类型中，用于标识选中值的属性',
      docDescription: '集合的元素类型中，用于标识选中值的属性，支持自定义变更',
      setter: {
        concept: 'PropertySelectSetter',
      },
      if: (_) => _.hasDataSource === true,
    })
    valueField: (item: T) => V = ((item: any) => item.value) as any;
    @Prop<GxUNavbarMultiOptions<T, V>, 'iconField'>({
      group: '数据属性',
      title: '图标属性字段',
      description: '集合的元素类型中，用于图标的属性名称',
      setter: {
        concept: 'PropertySelectSetter',
      },
      if: (_) => _.hasDataSource === true,
    })
    iconField: (item: T) => any = ((item: any) => item.icon) as any;
    @Prop<GxUNavbarMultiOptions<T, V>, 'toField'>({
      group: '数据属性',
      title: '跳转链接字段',
      description: '集合的元素类型中，用于跳转链接的属性名称',
      setter: {
        concept: 'PropertySelectSetter',
      },
      if: (_) => _.hasDataSource === true,
    })
    toField: (item: T) => any = ((item: any) => item.to) as any;
    @Prop<GxUNavbarMultiOptions<T, V>, 'parentField'>({
      group: '数据属性',
      title: '父级值字段',
      description: '集合的元素类型中，用于标识父节点的属性',
      docDescription: '集合的元素类型中，用于标识父级字段的属性，支持自定义变更',
      setter: {
        concept: 'PropertySelectSetter',
      },
      if: (_) => _.hasDataSource === true,
    })
    parentField: (item: T) => any;
    @Prop<GxUNavbarMultiOptions<T, V>, 'router'>({
      group: '数据属性',
      title: '使用路由',
      description: '是否根据 vue-router 来控制选择项',
      docDescription: '设置是否根据vue-router来控制选择哪一项，默认开启。开启后当前所在的导航栏项底部会有标识',
      setter: {
        concept: 'SwitchSetter',
      },
      onChange: [
        {
          clear: ['value'],
        },
      ],
    })
    router: nasl.core.Boolean = true;
    @Prop<GxUNavbarMultiOptions<T, V>, 'value'>({
      group: '数据属性',
      title: '选中值',
      description: '当前选中的值',
      sync: true,
      docDescription: '当前选择的值',
      if: (_) => _.router === false,
      settable: true,
    })
    value: V;
    @Prop<GxUNavbarMultiOptions<T, V>, any>({
      group: '数据属性',
      title: '字段',
      description: '显示文本字段',
      setter: {
        concept: 'PropertySelectSetter',
      },
    })
    private field: (item: T) => any = ((item: any) => item.text) as any;
    @Prop({
      group: '状态属性',
      title: '只读',
      description: '正常显示，但禁止选择/输入',
      docDescription: '正常显示，但禁止选择或输入',
      setter: {
        concept: 'SwitchSetter',
      },
      settable: true,
    })
    readonly: nasl.core.Boolean = false;
    @Prop({
      group: '状态属性',
      title: '禁用',
      description: '置灰显示，且禁止任何交互（焦点、点击、选择、输入等）',
      docDescription: '置灰显示，且禁止任何交互（焦点、点击、选择、输入等）',
      setter: {
        concept: 'SwitchSetter',
      },
      settable: true,
    })
    disabled: nasl.core.Boolean = false;
    @Prop({
      group: '主要属性',
      title: '展开图标',
      description: '切换展开收起图标',
      docDescription: '支持自定义展开图标，默认使用右箭头图标',
      setter: {
        concept: 'IconSetter',
      },
    })
    expandIcon: nasl.core.String = 'bottom-arrow';
    @Prop({
      group: '主要属性',
      title: '子菜单展开图标',
      description: '切换展开收起图标',
      docDescription: '支持自定义子菜单展开图标，默认使用右箭头图标',
      setter: {
        concept: 'IconSetter',
      },
    })
    popupExpandIcon: nasl.core.String = 'right-arrow';
    @Prop({
      group: '主要属性',
      title: '加载图标',
      description: '加载图标',
      docDescription: '支持自定义加载图标，默认使用加载图标',
      setter: {
        concept: 'IconSetter',
      },
    })
    loadingIcon: nasl.core.String = 'loading';
    @Event({
      title: '选择后',
      description: '选择某一项后触发。',
    })
    onSelect: (event: { selected: nasl.core.Boolean; item: T; oldItem: T; value: V; oldValue: V }) => any;
    @Slot({
      title: '默认',
      description: '插入`<gx-u-navbar-multi>`子组件。',
      snippets: [
        {
          title: '导航栏分组',
          code: '<gx-u-navbar-group-multi><template #title><u-text text="导航栏分组"></u-text></template><gx-u-navbar-item-multi><u-text text="导航栏项"></u-text></gx-u-navbar-item-multi></gx-u-navbar-group-multi>',
        },
        {
          title: '导航栏项',
          code: '<gx-u-navbar-item-multi><u-text text="导航栏项"></u-text></gx-u-navbar-item-multi>',
        },
        {
          title: '分隔线',
          code: '<gx-u-navbar-divider-multi></gx-u-navbar-divider-multi>',
        },
      ],
    })
    slotDefault: () => Array<nasl.ui.ViewComponent>;
    @Slot({
      title: '组件插槽',
      description: '内容自定义',
    })
    slotLeft: () => Array<nasl.ui.ViewComponent>;
    @Slot({
      title: '组件插槽',
      description: '内容自定义',
    })
    slotRight: () => Array<nasl.ui.ViewComponent>;

    @Slot({
      title: '导航栏插槽',
      description: '导航栏插槽',
    })
    slotNavbarNode: (current: { item: T; index: nasl.core.Integer }) => Array<nasl.ui.ViewComponent>;

    @Slot({
      title: '非叶子节点插槽',
      description: '非叶子节点插槽',
    })
    slotNonLeafNode: (current: { item: T; index: nasl.core.Integer }) => Array<nasl.ui.ViewComponent>;

    @Slot({
      title: '叶子节点插槽',
      description: '叶子节点插槽',
    })
    slotLeafNode: (current: { item: T; index: nasl.core.Integer }) => Array<nasl.ui.ViewComponent>;
  }
  @ExtensionComponent({
    type: 'pc',
    show: true,
    ideusage: {
      idetype: 'container',
      parentAccept: "['gx-u-navbar-group-multi', 'gx-u-navbar-multi'].includes(target.tag)",
    },
  })
  @Component({
    title: '导航栏项',
    description: '导航栏的子项目',
  })
  export class GxUNavbarItemMulti extends ViewComponent {
    @Prop({
      title: '禁用',
    })
    disabled: nasl.core.Boolean;
    constructor(options?: Partial<GxUNavbarItemMultiOptions>) {
      super();
    }
  }
  export class GxUNavbarItemMultiOptions extends ViewComponentOptions {
    @Prop({
      title: '文本',
      description: '文本内容',
    })
    private text: nasl.core.String;
    @Prop({
      title: '相关对象',
      description: '相关对象。当选择此项时，抛出的事件会传递该对象，便于开发',
    })
    private item: any;
    @Prop({
      title: '路由链接',
      description: '需要 vue-router，与`<router-link>`的`to`属性相同。可以是一个字符串或者是描述目标位置的对象。',
    })
    private to: nasl.core.String;
    @Prop({
      title: '替换地址',
      description:
        '需要 vue-router，与`<router-link>`的`replace`属性相同。如果为`true`，当点击时，会调用`router.replace()`而不是`router.push()`，于是导航后不会留下`history `记录。',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    private replace: nasl.core.Boolean = false;
    @Prop({
      title: '精确匹配',
      description: '需要 vue-router，与`<router-link>`的`exact`属性相同。是否与路由完全一致时才高亮显示。',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    private exact: nasl.core.Boolean = false;
    @Prop({
      group: '数据属性',
      title: '值',
      description: '用于标识此项的值',
      docDescription: '当前选择的值',
    })
    value: nasl.core.String;
    @Prop({
      group: '主要属性',
      title: '图标',
      docDescription: '支持从图标库选择图标或上传自定义图标',
      setter: {
        concept: 'IconSetter',
      },
    })
    icon: nasl.core.String = '';
    @Prop({
      group: '交互属性',
      title: '链接类型',
      docDescription: '支持页面跳转、下载链接',
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
      docDescription: '链接地址配置',
    })
    hrefAndTo: nasl.core.String;
    @Prop({
      group: '交互属性',
      title: '链接打开方式',
      description: '链接跳转的打开方式，父级窗口和顶级窗口仅适用于iframe组件嵌套的情况，若不存在嵌套，则其打开方式同当前窗口。',
      docDescription:
        '支持新窗口、当前窗口、父级窗口、顶级窗口四种方式，其中父级窗口和顶级窗口仅适用于iframe组件嵌套的情况，若不存在嵌套，则打开方式同当前窗口。',
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
    @Prop({
      group: '状态属性',
      title: '禁用',
      description: '置灰显示，且禁止任何交互（焦点、点击、选择、输入等）',
      docDescription: '置灰显示，且禁止任何交互（焦点、点击、选择、输入等）',
      setter: {
        concept: 'SwitchSetter',
      },
      settable: true,
    })
    disabled: nasl.core.Boolean = false;
    @Event({
      title: '点击',
      description: '在元素上按下并释放任意鼠标按钮时触发。',
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
      description: '在元素上双击鼠标按钮时触发。',
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
      description: '在右键菜单显示前触发。',
    })
    onContextmenu: (event: {
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
      description: '在元素上按下任意鼠标按钮时触发。',
    })
    onMousedown: (event: {
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
      title: '鼠标释放',
      description: '在元素上释放任意鼠标按钮时触发。',
    })
    onMouseup: (event: {
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
      description: '鼠标移入元素时触发。',
    })
    onMouseenter: (event: {
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
      description: '鼠标移出元素时触发。',
    })
    onMouseleave: (event: {
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
      title: '获得焦点',
      description: '获得焦点时触发。',
    })
    onFocus: (event: {
      cancelBubble: nasl.core.Boolean;
      detail: nasl.core.String;
      layerX: nasl.core.Integer;
      layerY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    @Event({
      title: '失去焦点',
      description: '失去焦点时触发。',
    })
    onBlur: (event: {
      cancelBubble: nasl.core.Boolean;
      detail: nasl.core.String;
      layerX: nasl.core.Integer;
      layerY: nasl.core.Integer;
      pageX: nasl.core.Integer;
      pageY: nasl.core.Integer;
      which: nasl.core.Integer;
    }) => any;
    @Event({
      title: '切换路由后',
      description: '使用 router 相关属性切换路由后触发',
    })
    onNavigate: (event: { to: nasl.core.String; replace: nasl.core.Boolean; append: nasl.core.Boolean }) => any;
    @Slot({
      title: '默认',
      description: '导航栏项的内容',
    })
    slotDefault: () => Array<nasl.ui.ViewComponent>;
  }
  @ExtensionComponent({
    type: 'pc',
    show: true,
    ideusage: {
      idetype: 'element',
      parentAccept: "['gx-u-navbar-group-multi', 'gx-u-navbar-multi'].includes(target.tag)",
    },
  })
  @Component({
    title: '导航栏分割线',
    description: '导航栏的分割线',
  })
  export class GxUNavbarDividerMulti extends ViewComponent {
    constructor(options?: Partial<GxUNavbarDividerMultiOptions>) {
      super();
    }
  }
  export class GxUNavbarDividerMultiOptions extends ViewComponentOptions {}
  @ExtensionComponent({
    type: 'pc',
    show: true,
  })
  @Component({
    title: '导航栏下拉菜单',
    description: '导航栏下拉菜单',
  })
  export class GxUNavbarDropdownMulti extends ViewComponent {
    @Prop({
      title: '禁用',
    })
    disabled: nasl.core.Boolean;
    constructor(options?: Partial<GxUNavbarDropdownMultiOptions>) {
      super();
    }
  }
  export class GxUNavbarDropdownMultiOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: '弹出方向',
      description: '弹出层的弹出方向',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          {
            title: '上',
          },
          {
            title: '下',
          },
          {
            title: '左',
          },
          {
            title: '右',
          },
          {
            title: '上左',
          },
          {
            title: '上右',
          },
          {
            title: '下左',
          },
          {
            title: '下右',
          },
          {
            title: '左上',
          },
          {
            title: '左下',
          },
          {
            title: '右上',
          },
          {
            title: '右下',
          },
        ],
      },
    })
    placement:
      | 'top'
      | 'bottom'
      | 'left'
      | 'right'
      | 'top-start'
      | 'top-end'
      | 'bottom-start'
      | 'bottom-end'
      | 'left-start'
      | 'left-end'
      | 'right-start'
      | 'right-end' = 'bottom';
    @Prop({
      group: '交互属性',
      title: '触发方式',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          {
            title: '点击',
          },
          {
            title: '悬浮',
          },
          {
            title: '右击',
          },
          {
            title: '双击',
          },
          {
            title: '手动',
          },
        ],
      },
    })
    trigger: 'click' | 'hover' | 'right-click' | 'double-click' | 'manual' = 'hover';
    @Prop({
      group: '状态属性',
      title: '禁用',
      description: '置灰显示，且禁止任何交互（焦点、点击、选择、输入等）',
      setter: {
        concept: 'SwitchSetter',
      },
      settable: true,
    })
    disabled: nasl.core.Boolean = false;
  }
  @ExtensionComponent({
    type: 'pc',
    show: true,
  })
  @Component({
    title: '导航菜单',
    description: '导航菜单',
  })
  export class GxUNavbarMenuMulti extends ViewComponent {
    constructor(options?: Partial<GxUNavbarMenuMultiOptions>) {
      super();
    }
  }
  export class GxUNavbarMenuMultiOptions extends ViewComponentOptions {}
  @ExtensionComponent({
    type: 'pc',
    show: true,
  })
  @Component({
    title: '导航菜单分组',
    description: '导航菜单分组',
  })
  export class GxUNavbarMenuGroupMulti extends ViewComponent {
    constructor(options?: Partial<GxUNavbarMenuGroupMultiOptions>) {
      super();
    }
  }
  export class GxUNavbarMenuGroupMultiOptions extends ViewComponentOptions {}
  @ExtensionComponent({
    type: 'pc',
    show: true,
  })
  @Component({
    title: '导航菜单项',
    description: '导航菜单项',
  })
  export class GxUNavbarMenuItemMulti extends ViewComponent {
    constructor(options?: Partial<GxUNavbarMenuItemMultiOptions>) {
      super();
    }
  }
  export class GxUNavbarMenuItemMultiOptions extends ViewComponentOptions {}
  @ExtensionComponent({
    type: 'pc',
    show: true,
  })
  @Component({
    title: '导航菜单分割线',
    description: '导航菜单分割线',
  })
  export class GxUNavbarMenuDividerMulti extends ViewComponent {
    constructor(options?: Partial<GxUNavbarMenuDividerMultiOptions>) {
      super();
    }
  }
  export class GxUNavbarMenuDividerMultiOptions extends ViewComponentOptions {}
  @ExtensionComponent({
    type: 'pc',
    show: true,
  })
  @Component({
    title: '导航选择',
    description: '导航选择',
  })
  export class GxUNavbarSelectMulti extends ViewComponent {
    constructor(options?: Partial<GxUNavbarSelectMultiOptions>) {
      super();
    }
  }
  export class GxUNavbarSelectMultiOptions extends ViewComponentOptions {}
  @ExtensionComponent({
    type: 'pc',
    show: true,
  })
  @Component({
    title: '导航选择分组',
    description: '导航选择分组',
  })
  export class GxUNavbarSelectGroupMulti extends ViewComponent {
    constructor(options?: Partial<GxUNavbarSelectGroupMultiOptions>) {
      super();
    }
  }
  export class GxUNavbarSelectGroupMultiOptions extends ViewComponentOptions {}
  @ExtensionComponent({
    type: 'pc',
    show: true,
  })
  @Component({
    title: '导航选择项',
    description: '导航选择项',
  })
  export class GxUNavbarSelectItemMulti extends ViewComponent {
    constructor(options?: Partial<GxUNavbarSelectItemMultiOptions>) {
      super();
    }
  }
  export class GxUNavbarSelectItemMultiOptions extends ViewComponentOptions {}
  @ExtensionComponent({
    type: 'pc',
    show: true,
  })
  @Component({
    title: '导航选择分割线',
    description: '导航选择分割线',
  })
  export class GxUNavbarSelectDividerMulti extends ViewComponent {
    constructor(options?: Partial<GxUNavbarSelectDividerMultiOptions>) {
      super();
    }
  }
  export class GxUNavbarSelectDividerMultiOptions extends ViewComponentOptions {}
  @ExtensionComponent({
    type: 'pc',
    show: true,
    ideusage: {
      idetype: 'container',
      structured: true,
      parentAccept: "['gx-u-navbar-group-multi', 'gx-u-navbar-multi'].includes(target.tag)",
      childAccept: "['gx-u-navbar-group-multi', 'gx-u-navbar-item-multi', 'gx-u-navbar-divider-multi'].includes(target.tag)",
      events: {
        click: true,
      },
    },
  })
  @Component({
    title: '导航栏分组',
    description: '导航栏分组',
  })
  export class GxUNavbarGroupMulti extends ViewComponent {
    @Prop({
      title: '禁用',
    })
    disabled: nasl.core.Boolean;
    constructor(options?: Partial<GxUNavbarGroupMultiOptions>) {
      super();
    }
  }
  export class GxUNavbarGroupMultiOptions extends ViewComponentOptions {
    @Prop({
      title: '标题',
      description: '显示的标题',
    })
    private title: nasl.core.String;
    @Prop({
      group: '交互属性',
      title: '可折叠',
      description: '设置是否可以展开/折叠',
      docDescription: '设置分组是否可折叠',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    collapsible: nasl.core.Boolean = false;
    @Prop({
      group: '交互属性',
      title: '触发方式',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          {
            title: '点击',
          },
          {
            title: '悬浮',
          },
          {
            title: '右击',
          },
          {
            title: '双击',
          },
        ],
      },
    })
    trigger: 'click' | 'hover' | 'right-click' | 'double-click' = 'click';
    @Prop({
      group: '状态属性',
      title: '展开状态',
      description: '展开状态分为“True(展开)/False(折叠)”，默认为“展开”',
      sync: true,
      docDescription: '设置分组的展开折叠状态。在某些场景下需要预置分组的展开或者折叠状态',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    expanded: nasl.core.Boolean = false;
    @Prop({
      group: '状态属性',
      title: '禁用展开/折叠',
      description: '置灰显示，且禁止展开/折叠操作',
      docDescription: '置灰显示，且禁止任何交互（焦点、点击、选择、输入等）',
      setter: {
        concept: 'SwitchSetter',
      },
      settable: true,
    })
    disabled: nasl.core.Boolean = false;
    @Slot({
      title: '默认',
      description: '插入`<gx-u-navbar-multi>`子组件。',
      snippets: [
        {
          title: '导航栏分组',
          code: '<gx-u-navbar-group-multi><template #title><u-text text="导航栏分组"></u-text></template><gx-u-navbar-item-multi><u-text text="导航栏项"></u-text></gx-u-navbar-item-multi></gx-u-navbar-group-multi>',
        },
        {
          title: '导航栏项',
          code: '<gx-u-navbar-item-multi><u-text text="导航栏项"></u-text></gx-u-navbar-item-multi>',
        },
      ],
    })
    slotDefault: () => Array<nasl.ui.ViewComponent>;
    @Slot({
      title: '标题',
      description: '标题自定义',
    })
    slotTitle: () => Array<nasl.ui.ViewComponent>;
  }
}
