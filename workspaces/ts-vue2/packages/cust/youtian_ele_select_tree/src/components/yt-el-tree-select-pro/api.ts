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
    replaceNaslUIComponent: "ElTreeSelectPro",
    type: "pc",
    show: true,
    ideusage: {
      "idetype": "container",
      "events": {
        "click": true
      },
      "dataSource": {
        "dismiss": "!this.getAttribute('dataSource')",
        "display": 3,
        "loopRule": "nth-last-child(-n+2)",
        "loopElem": "div.el-p-tree__item",
        "displayData": "\"[{value: '', label: ''}, {value:'1', label: ' '}, {value:'2', label: ' '}]\"",
        "propertyName": ":dataSource"
      },
      "ignoreProperty": ["filterable"],
      "additionalAttribute": {
        "valueField": "\"value\"",
        "textField": "\"label\""
      },
      "displaySlotConditions": {
        "option": "!!this.getAttribute('dataSource') && this.getAttribute('optionIsSlot') && this.getAttribute('optionIsSlot').value"
      },
      "slotWrapperInlineStyle": {
        "option": "width:100%;"
      },
      "slotInlineStyle": {
        "option": "min-height: 0;"
      }
    }
  })
  @Component({
    title: '树选择',
    icon: 'tree-view',
    description: '树选择',
    group: 'Selector'
  })
  export class YtElTreeSelectPro<T, V, M extends nasl.core.Boolean> extends ViewComponent {
    @Method({
      title: '重新加载',
      description: '清除缓存，重新加载'
    })
    reload(): void {}
    constructor(options?: Partial<YtElTreeSelectProOptions<T, V, M>>) {
      super();
    }
  }
  export class YtElTreeSelectProOptions<T, V, M extends nasl.core.Boolean> extends ViewComponentOptions {
    @Prop({
      group: '数据属性',
      title: '数据源',
      description: '展示数据的输入源，可设置为集合类型变量（List<T>）或输出参数为集合类型的逻辑。开启懒加载后，逻辑入参包含 node（当前展开的父节点数据；首次加载根节点时为空）。',
      docDescription: '支持动态绑定集合类型变量（List<T>）或输出参数为集合类型的逻辑。开启懒加载后：首次/重新加载时 node 为空返回根节点；展开节点时传入 node 返回该节点子列表。',
      designerValue: [{}, {}, {}],
      setter: {
        concept: 'DataSourceSetter'
      }
    })
    dataSource: nasl.collection.List<T> | {
      list: nasl.collection.List<T>;
      total: nasl.core.Integer;
    };
    @Prop({
      group: '数据属性',
      title: '数据类型',
      description: '数据源返回的数据结构的类型，自动识别类型进行展示说明',
      docDescription: '该属性为只读状态，当数据源动态绑定集合List<T>后，会自动识别T的类型并进行展示'
    })
    dataSchema: T;
    @Prop({
      group: '数据属性',
      title: '文本字段',
      description: '集合的元素类型中，用于显示文本的属性名称',
      setter: {
        concept: 'PropertySelectSetter'
      }
    })
    textField: (item: T) => any = ((item: any) => item.label) as any;
    @Prop<YtElTreeSelectProOptions<T, V, M>, 'optionIsSlot'>({
      group: '数据属性',
      title: '动态选项插槽',
      description: '自定义选项内容',
      docDescription: '自定义选项内容',
      setter: {
        concept: 'SwitchSetter'
      },
      bindHide: true,
      if: _ => !!_.dataSource
    })
    optionIsSlot: nasl.core.Boolean;
    @Prop({
      group: '数据属性',
      title: '值字段',
      description: '集合的元素类型中，用于标识选中值的属性',
      docDescription: '集合的元素类型中，用于标识选中值的属性',
      setter: {
        concept: 'PropertySelectSetter'
      }
    })
    valueField: (item: T) => any = ((item: any) => item.value) as any;
    @Prop({
      group: '数据属性',
      title: '子级值字段',
      description: '集合的元素类型中，用于标识子节点的属性，默认为children',
      docDescription: '集合的元素类型中，用于标识子节点的属性',
      setter: {
        concept: 'PropertySelectSetter'
      }
    })
    childrenField: (item: T) => nasl.collection.List<any> = ((item: any) => item.children) as any;
    @Prop({
      group: '数据属性',
      title: '懒加载',
      description: '开启后按节点异步加载子级数据。首次加载根节点，展开时再请求子节点。',
      setter: {
        concept: 'SwitchSetter'
      }
    })
    lazy: nasl.core.Boolean = false;
    @Prop<YtElTreeSelectProOptions<T, V, M>, 'hasChildrenField'>({
      group: '数据属性',
      title: '是否有子级字段',
      description: '标识节点是否还有未加载的子节点。字段值为 true 时展示展开图标，展开时触发懒加载。',
      docDescription: '集合的元素类型中，用于标识节点是否有子级的布尔属性',
      setter: {
        concept: 'PropertySelectSetter'
      },
      if: _ => !!_.lazy
    })
    hasChildrenField: (item: T) => nasl.core.Boolean;
    @Prop<YtElTreeSelectProOptions<T, V, M>, 'parentField'>({
      group: '数据属性',
      title: '父级值字段',
      description: '集合的元素类型中，用于标识父节点的属性。懒加载模式下不使用平铺转树，请勿配置。',
      docDescription: '集合的元素类型中，用于标识父级字段的属性，支持自定义变更。开启懒加载后该属性无效。',
      setter: {
        concept: 'PropertySelectSetter'
      },
      if: _ => !_.lazy
    })
    parentField: (item: T) => any;
    @Prop({
      group: '主要属性',
      title: '宽度自适应',
      description: '宽度随内容自适应',
      setter: {
        concept: 'SwitchSetter'
      }
    })
    autoWidth: nasl.core.Boolean = false;

    // @Prop({
    //   group: '主要属性',
    //   title: '自动聚焦',
    //   description: '自动聚焦',
    //   setter: { concept: 'SwitchSetter' },
    // })
    // autofocus: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '无边框',
      description: '无边框模式',
      setter: {
        concept: 'SwitchSetter'
      }
    })
    borderless: nasl.core.Boolean = false;
    @Prop({
      group: '主要属性',
      title: '是否允许清空',
      description: '是否允许清空',
      setter: {
        concept: 'SwitchSetter'
      }
    })
    clearable: nasl.core.Boolean = false;

    // @Prop({
    //   group: '主要属性',
    //   title: 'Data',
    //   description:
    //     '树选择的数据列表。结构：`[{ label: TNode, value: string | number, text: string, ... }]`，其中 `label` 表示选项呈现的内容，可自定义；`value` 表示选项的唯一值；表示当 `label` 用于选项复杂内容呈现时，`text` 用于搜索功能。<br />其中 `label` 和 `value` 可以使用 `keys` 属性定义别名。',
    //   setter: { concept: 'InputSetter' },
    // })
    // data: any[] = [];

    @Prop({
      group: '主要属性',
      title: '禁用组件',
      description: '是否禁用组件',
      setter: {
        concept: 'SwitchSetter'
      }
    })
    disabled: nasl.core.Boolean;
    @Prop({
      group: '主要属性',
      title: '空时内容。',
      description: '当下拉列表为空时显示的内容。',
      setter: {
        concept: 'InputSetter'
      }
    })
    empty: any;

    // @Prop({
    //   group: '主要属性',
    //   title: 'Filter',
    //   description:
    //     '过滤方法，用于对现有数据进行搜索过滤，判断是否过滤某一项数据。',
    //   setter: { concept: 'InputSetter' },
    // })
    // filter: any;

    @Prop({
      group: '主要属性',
      title: '是否可搜索',
      description: '是否可搜索',
      setter: {
        concept: 'SwitchSetter'
      }
    })
    filterable: nasl.core.Boolean = false;

    // @Prop({
    //   group: '主要属性',
    //   title: 'Input Props',
    //   description: '透传给 输入框 Input 组件的全部属性。',
    //   setter: { concept: 'InputSetter' },
    // })
    // inputProps: object;

    // @Prop({
    //   group: '主要属性',
    //   sync: true,
    //   title: 'Input Value',
    //   description: '输入框的值。支持语法糖 `.sync`。',
    //   setter: { concept: 'InputSetter' },
    // })
    // inputValue: nasl.core.String | nasl.core.Decimal;

    // @Prop({
    //   group: '主要属性',
    //   title: 'Default Input Value',
    //   description: '输入框的值。非受控属性。',
    //   setter: { concept: 'InputSetter' },
    // })
    // defaultInputValue: nasl.core.String | nasl.core.Decimal;

    // @Prop({
    //   group: '主要属性',
    //   title: 'Keys',
    //   description:
    //     '用来定义 `value / label / disabled / children` 在 `data` 数据中对应的字段别名，示例：`{ value: "key", label: "name", children: "list" }`。',
    //   setter: { concept: 'InputSetter' },
    // })
    // keys: object;

    // @Prop({
    //   group: '主要属性',
    //   title: 'Label',
    //   description: '左侧文本。',
    //   setter: { concept: 'InputSetter' },
    // })
    // label: any;

    // @Prop({
    //   group: '主要属性',
    //   title: 'Loading',
    //   description: '是否正在加载数据',
    //   setter: { concept: 'SwitchSetter' },
    // })
    // loading: nasl.core.Boolean = false;

    // @Prop({
    //   group: '主要属性',
    //   title: 'Loading Text',
    //   description: '远程加载时显示的文字，支持自定义。如加上超链接。',
    //   setter: { concept: 'InputSetter' },
    // })
    // loadingText: any;

    @Prop({
      group: '主要属性',
      title: '多选数量',
      description: '用于控制多选数量，值为 0 则不限制',
      setter: {
        concept: 'NumberInputSetter',
        min: 0
      }
    })
    max: nasl.core.Decimal;
    @Prop({
      group: '主要属性',
      title: '最小折叠数量',
      description: '最小折叠数量，用于多选情况下折叠选中项，超出该数值的选中项折叠。值为 0 则表示不折叠',
      setter: {
        concept: 'NumberInputSetter',
        min: 0
      }
    })
    minCollapsedNum: nasl.core.Decimal;
    @Prop({
      group: '主要属性',
      title: '多选',
      description: '是否允许多选',
      setter: {
        concept: 'SwitchSetter'
      }
    })
    multiple: nasl.core.Boolean = false;
    @Prop({
      group: '交互属性',
      title: '只能选中最后层级',
      description: '开启后，仅允许选中最后一层级（叶子）节点，父节点不可选中',
      setter: {
        concept: 'SwitchSetter'
      }
    })
    onlySelectLeaf: nasl.core.Boolean = false;
    @Prop<YtElTreeSelectProOptions<T, V, M>, 'expandOnClickNode'>({
      group: '交互属性',
      title: '点击节点支持展开收起',
      description: '是否支持点击父层级名称也能展开收起',
      setter: {
        concept: 'SwitchSetter'
      },
    })
    expandOnClickNode: nasl.core.Boolean = false;

    // @Prop({
    //   group: '主要属性',
    //   title: 'Panel Bottom Content',
    //   description: '面板内的底部内容。',
    //   setter: { concept: 'InputSetter' },
    // })
    // panelBottomContent: any;

    // @Prop({
    //   group: '主要属性',
    //   title: 'Panel Top Content',
    //   description: '面板内的顶部内容。',
    //   setter: { concept: 'InputSetter' },
    // })
    // panelTopContent: any;

    @Prop({
      group: '主要属性',
      title: '占位符',
      description: '占位符',
      setter: {
        concept: 'InputSetter'
      }
    })
    placeholder: nasl.core.String;

    // @Prop({
    //   group: '主要属性',
    //   title: 'Popup Props',
    //   description: '透传给 popup 组件的全部属性。',
    //   setter: { concept: 'InputSetter' },
    // })
    // popupProps: object;

    // @Prop({
    //   group: '主要属性',
    //   sync: true,
    //   title: 'Popup Visible',
    //   description: '是否显示下拉框。支持语法糖 `.sync`',
    //   setter: { concept: 'SwitchSetter' },
    // })
    // popupVisible: nasl.core.Boolean;

    // @Prop({
    //   group: '主要属性',
    //   title: 'Default Popup Visible',
    //   description: '是否显示下拉框。非受控属性',
    //   setter: { concept: 'SwitchSetter' },
    // })
    // defaultPopupVisible: nasl.core.Boolean;

    @Prop({
      group: '主要属性',
      title: '只读状态',
      description: '只读状态，值为真会隐藏输入框，且无法打开下拉框',
      setter: {
        concept: 'SwitchSetter'
      }
    })
    readonly: nasl.core.Boolean = false;

    // @Prop({
    //   group: '主要属性',
    //   title: 'Reserve Keyword',
    //   description: '多选且可搜索时，是否在选中一个选项后保留当前的搜索关键词',
    //   setter: { concept: 'SwitchSetter' },
    // })
    // reserveKeyword: nasl.core.Boolean = false;

    // @Prop({
    //   group: '主要属性',
    //   title: 'Select Input Props',
    //   description: '【开发中】透传 SelectInput 筛选器输入框组件的全部属性。',
    //   setter: { concept: 'InputSetter' },
    // })
    // selectInputProps: object;

    @Prop({
      group: '主要属性',
      title: '尺寸',
      description: '尺寸。可选项：small/medium/large',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{
          title: '小'
        }, {
          title: '中'
        }, {
          title: '大'
        }]
      }
    })
    size: 'small' | 'medium' | 'large' = 'medium';
    @Prop({
      group: '主要属性',
      title: '状态',
      description: '输入框状态。可选项：default/success/warning/error',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{
          title: '默认'
        }, {
          title: '成功'
        }, {
          title: '警告'
        }, {
          title: '错误'
        }]
      }
    })
    status: 'default' | 'success' | 'warning' | 'error' = 'default';

    // @Prop({
    //   group: '主要属性',
    //   title: 'Suffix',
    //   description: '后置图标前的后置内容。',
    //   setter: { concept: 'InputSetter' },
    // })
    // suffix: any;

    // @Prop({
    //   group: '主要属性',
    //   title: 'Tag Props',
    //   description: '透传 Tag 标签组件全部属性。',
    //   setter: { concept: 'InputSetter' },
    // })
    // tagProps: object;

    // @Prop({
    //   group: '主要属性',
    //   title: 'Tips',
    //   description: '输入框下方提示文本，会根据不同的 `status` 呈现不同的样式。',
    //   setter: { concept: 'InputSetter' },
    // })
    // tips: any;

    // @Prop({
    //   group: '主要属性',
    //   title: 'Tree Props',
    //   description: '透传 Tree 组件的全部属性。',
    //   setter: { concept: 'InputSetter' },
    // })
    // treeProps: object;

    @Prop({
      group: '数据属性',
      title: '选中值',
      description: '选择后，所选中的值',
      sync: true,
      docDescription: '通过组件进行选择后，最终选中的值，支持双向绑定到变量'
    })
    value: V | nasl.collection.List<V>;

    // @Prop({
    //   group: '主要属性',
    //   title: 'Default Value',
    //   description:
    //     '选中值，泛型 `TreeValueType` 继承自 `TreeSelectValue`。非受控属性。',
    //   setter: { concept: 'InputSetter' },
    // })
    // defaultValue: nasl.core.String | nasl.core.Decimal | object | any[];

    // @Prop({
    //   group: '主要属性',
    //   title: 'Value Type',
    //   description: '用于控制选中值的类型。假设数据选项为：`',
    //   setter: {
    //     concept: 'EnumSelectSetter',
    //     options: [{ title: 'value' }, { title: 'object' }],
    //   },
    // })
    // valueType: 'value' | 'object' = 'value';

    // @Event({
    //   title: 'On Blur',
    //   description: '输入框失去焦点时触发',
    // })
    // onBlur: (event: any) => any;

    @Event({
      title: '值改变',
      description: '节点选中状态变化时触发，`context.node` 表示当前变化的选项，`context. trigger` 表示触发变化的来源。泛型 `TreeValueType` 继承自 `TreeSelectValue` 。'
    })
    onChange: (event: any) => any;
    @Event({
      title: '清除时',
      description: '点击清除按钮时触发'
    })
    onClear: (event: any) => any;

    // @Event({
    //   title: 'On Enter',
    //   description:
    //     '回车键按下时触发。`inputValue` 表示输入框的值，`value` 表示选中值。泛型 `TreeValueType` 继承 `TreeSelectValue`',
    // })
    // onEnter: (event: any) => any;

    // @Event({
    //   title: 'On Focus',
    //   description: '输入框获得焦点时触发',
    // })
    // onFocus: (event: any) => any;

    // @Event({
    //   title: 'On Input Change',
    //   description:
    //     '输入框值发生变化时触发，`context.trigger` 表示触发输入框值变化的来源：文本输入触发、清除按钮触发、失去焦点等',
    // })
    // onInputChange: (event: any) => any;

    // @Event({
    //   title: 'On Popup Visible Change',
    //   description:
    //     '下拉框显示或隐藏时触发。单选场景，选中某个选项时触发关闭，此时需要添加参数 `node`。',
    // })
    // onPopupVisibleChange: (event: any) => any;

    // @Event({
    //   title: 'On Remove',
    //   description: '多选模式下，选中数据被移除时触发。',
    // })
    // onRemove: (event: any) => any;

    @Event({
      title: '输入值变化时',
      description: '输入值变化时，触发搜索事件。主要用于远程搜索新数据。设置 `filterable=true` 开启此功能。优先级高于本地数据搜索 `filter`，即一旦存在这个远程搜索事件 `filter` 失效'
    })
    onSearch: (event: nasl.core.String) => any;
    @Slot({
      title: '树节点内容',
      description: '自定义树节点内容'
    })
    slotOption: (current: nasl.ui.Current<T>) => Array<nasl.ui.ViewComponent>;

    // @Slot({
    //   title: 'Collapsed Items',
    //   description:
    //     '多选情况下，用于设置折叠项内容，默认为 `+N`。如果需要悬浮就显示其他内容，可以使用 collapsedItems 自定义。`value` 表示当前存在的所有标签，`collapsedSelectedItems` 表示折叠的标签，`count` 表示折叠的数量，`onClose` 表示移除标签的事件回调。',
    // })
    // slotCollapsedItems: () => Array<ViewComponent>;

    // @Slot({
    //   title: 'Empty',
    //   description: '当下拉列表为空时显示的内容。',
    // })
    // slotEmpty: () => Array<ViewComponent>;

    // @Slot({
    //   title: 'Label',
    //   description: '左侧文本。',
    // })
    // slotLabel: () => Array<ViewComponent>;

    // @Slot({
    //   title: 'Loading Text',
    //   description: '远程加载时显示的文字，支持自定义。如加上超链接。',
    // })
    // slotLoadingText: () => Array<ViewComponent>;

    // @Slot({
    //   title: 'Panel Bottom Content',
    //   description: '面板内的底部内容。',
    // })
    // slotPanelBottomContent: () => Array<ViewComponent>;

    // @Slot({
    //   title: 'Panel Top Content',
    //   description: '面板内的顶部内容。',
    // })
    // slotPanelTopContent: () => Array<ViewComponent>;

    // @Slot({
    //   title: 'Prefix Icon',
    //   description: '组件前置图标。',
    // })
    // slotPrefixIcon: () => Array<ViewComponent>;

    // @Slot({
    //   title: 'Suffix',
    //   description: '后置图标前的后置内容。',
    // })
    // slotSuffix: () => Array<ViewComponent>;

    // @Slot({
    //   title: 'Suffix Icon',
    //   description: '组件后置图标。',
    // })
    // slotSuffixIcon: () => Array<ViewComponent>;

    // @Slot({
    //   title: 'Tips',
    //   description: '输入框下方提示文本，会根据不同的 `status` 呈现不同的样式。',
    // })
    // slotTips: () => Array<ViewComponent>;

    // @Slot({
    //   title: 'Value Display',
    //   description: '自定义选中项呈现方式。',
    // })
    // slotValueDisplay: () => Array<ViewComponent>;
  }
  @ExtensionComponent({
    type: "pc",
    show: true,
    ideusage: {
      "idetype": "container",
      "bindStyleAttr": "inputStyle",
      "bindStyleSelector": ".__cw-form-compose-input",
      "events": {
        "click": true
      },
      "dataSource": {
        "dismiss": "!this.getAttribute('dataSource')",
        "display": 3,
        "loopRule": "nth-last-child(-n+2)",
        "loopElem": "div.el-p-tree__item",
        "displayData": "\"[{value: '', label: ''}, {value:'1', label: ' '}, {value:'2', label: ' '}]\"",
        "propertyName": ":dataSource"
      },
      "additionalAttribute": {
        "valueField": "\"value\"",
        "textField": "\"label\""
      },
      "displaySlotConditions": {
        "option": "!!this.getAttribute('dataSource') && this.getAttribute('optionIsSlot') && this.getAttribute('optionIsSlot').value"
      },
      "slotWrapperInlineStyle": {
        "label": "display: inline-block;",
        "option": "width:100%;"
      },
      "slotInlineStyle": {
        "option": "min-height: 0;"
      },
      "ignoreProperty": ["rules"],
      "forceRefresh": "parent",
      "namedSlotOmitWrapper": ["label"]
    },
    extends: [{
      "name": "ElFormItemPro",
      "excludes": ["slotDefault", "useRangeValue", "startFieldName", "endFieldName", "startInitialValue", "endInitialValue"]
    }, {
      "name": "YtElTreeSelectPro"
    }]
  })
  @Component({
    title: '表单树选择',
    description: '表单树选择',
    group: 'Form'
  })
  export class YtElFormTreeSelectPro<T, V, M extends nasl.core.Boolean> extends ViewComponent {
    constructor(options?: Partial<YtElFormTreeSelectProOptions<T, V, M> & nasl.ui.ElFormItemProOptions & Omit<YtElTreeSelectProOptions<T, V, M>, keyof nasl.ui.ElFormItemProOptions>>) {
      super();
    }
  }
  export class YtElFormTreeSelectProOptions<T, V, M extends nasl.core.Boolean> extends ViewComponentOptions {}
}