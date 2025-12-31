/// <reference types="@nasl/types" />
/// <reference types="../../../.lcap/lcap-ui/runtime/nasl.ui.d.ts" />
namespace extensions.cw_form_designer_library.viewComponents {
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
    type: "pc",
    show: true,
    ideusage: {
      "idetype": "container",
      "structured": true,
      "dataSource": {
        "dismiss": "!this.getAttribute('dataSource') && this.getDefaultElements().length > 0",
        "display": 3,
        "loopRule": "nth-last-child(-n+2):not(:only-child)",
        "loopElem": "> label[class^='ex-u-checkbox']:not([data-nodepath])",
        "emptySlot": {
          "display": "inline",
          "condition": "!this.getAttribute('dataSource')",
          "accept": false
        }
      },
      "childAccept": "target.tag === 'ex-u-checkbox'",
      "slotWrapperInlineStyle": {
        "item": "display:inline-block;width:90px;"
      },
      "displaySlotConditions": {
        "checkAll": false
      },
      "style": [{
        "selector": "> label[class^='ex-u-checkbox']:not([data-nodepath]):nth-last-child(-n+2):not(:only-child)",
        "declaration": "opacity: unset !important"
      }]
    }
  })
  @Component({
    title: '多选组',
    icon: 'checkboxes',
    description: '多项中选择多个时使用',
    group: "Form"
  })
  export class ExUCheckboxes<T, V, C> extends ViewComponent {
    @Prop({
      title: '数据'
    })
    data: nasl.collection.List<T>;
    @Prop({
      title: '选中值'
    })
    value: ExUCheckboxesOptions<T, V, C>['value'];
    @Prop({
      title: '全选中'
    })
    allChecked: nasl.core.Boolean;
    @Prop({
      title: '禁用'
    })
    disabled: nasl.core.Boolean;
    @Prop({
      title: '只读'
    })
    readonly: nasl.core.Boolean;
    @Prop({
      title: '预览'
    })
    preview: nasl.core.Boolean;
    @Method({
      title: 'undefined',
      description: '清除缓存，重新加载'
    })
    reload(): void {}
    constructor(options?: Partial<ExUCheckboxesOptions<T, V, C>>) {
      super();
    }
  }
  export class ExUCheckboxesOptions<T, V, C> extends ViewComponentOptions {
    @Prop({
      group: '数据属性',
      title: '数据源',
      description: '展示数据的输入源，可设置为集合类型变量（List<T>）或输出参数为集合类型的逻辑。',
      docDescription: '支持动态绑定集合类型变量（List\<T>）或输出参数为集合类型的逻辑',
      designerValue: [{}, {}, {}],
      bindOpen: true
    })
    dataSource: nasl.collection.List<T> | {
      list: nasl.collection.List<T>;
      total: nasl.core.Integer;
    };
    @Prop({
      group: '数据属性',
      title: '数据类型',
      description: '数据源返回的数据结构的类型，自动识别类型进行展示说明',
      docDescription: '该属性为只读状态，当数据源动态绑定集合List\<T>后，会自动识别T的类型并进行展示。'
    })
    dataSchema: T;
    @Prop({
      group: '数据属性',
      title: '选项文本',
      description: '集合的元素类型中，用于显示文本的属性名称',
      setter: {
        concept: 'PropertySelectSetter'
      }
    })
    private textField: (item: T) => any;
    @Prop<ExUCheckboxesOptions<T, V, C>, 'valueField'>({
      group: '数据属性',
      title: '值字段',
      description: '用于标识选中值的字段',
      docDescription: '集合的元素类型中，用于标识选中值的属性，支持自定义变更。',
      setter: {
        concept: 'PropertySelectSetter'
      }
    })
    valueField: (item: T) => V = ((item: any) => item.value) as any;
    @Prop({
      group: '数据属性',
      title: '选中值',
      description: '当前选中的值',
      sync: true,
      docDescription: '多选组的选中项，返还结构为List\<T>。',
      settable: true
    })
    value: C extends '' ? nasl.collection.List<V> : nasl.core.String;
    @Prop<ExUCheckboxesOptions<T, V, C>, 'checkAll'>({
      group: '主要属性',
      title: '全选控制',
      description: '是否进行全选',
      setter: {
        concept: 'SwitchSetter'
      },
      onChange: [{
        clear: ['min', 'max']
      }]
    })
    checkAll: nasl.core.Boolean = false;
    @Prop<ExUCheckboxesOptions<T, V, C>, 'checkAllText'>({
      group: '主要属性',
      title: '全选展示内容',
      description: '全选功能展示的文案内容',
      if: _ => _.checkAll === true,
      implicitToString: true
    })
    checkAllText: nasl.core.String = '全选';
    @Prop<ExUCheckboxesOptions<T, V, C>, 'checkAllDisplay'>({
      group: '主要属性',
      title: '展示方式',
      description: '选择展开方式',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{
          title: '同行展示'
        }, {
          title: '分行展示'
        }]
      },
      if: _ => _.checkAll === true
    })
    checkAllDisplay: 'inline' | 'block' = 'inline';
    @Prop<ExUCheckboxesOptions<T, V, C>, 'min'>({
      group: '主要属性',
      title: '最小选中数',
      description: '可以勾选多选框的最小数量',
      docDescription: '多选组可以勾选多选框的最小数量。',
      setter: {
        concept: 'NumberInputSetter',
        precision: 0
      },
      if: _ => _.checkAll === false
    })
    min: nasl.core.Integer = 0;
    @Prop<ExUCheckboxesOptions<T, V, C>, 'max'>({
      group: '主要属性',
      title: '最大选中数',
      description: '可以勾选多选框的最大数量',
      docDescription: '多选组可以勾选多选框的最大数量。',
      setter: {
        concept: 'NumberInputSetter',
        precision: 0
      },
      if: _ => _.checkAll === false
    })
    max: nasl.core.Integer;
    @Prop({
      group: '主要属性',
      title: '转换器',
      description: '将选中的值以选择的符号作为连接符，转为字符串格式；选择“json”则转为JSON字符串格式',
      docDescription: '将选中的值以选择的符号作为连接符，转为字符串格式；选择“json”则转为JSON字符串格式',
      bindHide: true,
      setter: {
        concept: 'EnumSelectSetter',
        options: [{
          title: '无'
        }, {
          title: "以', '连接"
        }, {
          title: "以'|'连接"
        }, {
          title: "以';'连接"
        }, {
          title: 'json'
        }]
      }
    })
    converter: '' | 'join' | 'join:|' | 'join:;' | 'json' = '';
    @Prop({
      group: '主要属性',
      title: '排列方向',
      description: '设置多选组的排列方向',
      setter: {
        concept: "EnumSelectSetter",
        options: [{
          title: '水平'
        }, {
          title: '垂直'
        }]
      }
    })
    direction: 'horizontal' | 'vertical' = 'horizontal';
    @Prop<ExUCheckboxesOptions<T, V, C>, 'column'>({
      group: '主要属性',
      title: '每行排列数',
      description: '水平排列时每行展示的选项数量',
      setter: {
        concept: "NumberInputSetter",
        precision: 0,
        min: 1
      },
      if: _ => _.direction === 'horizontal'
    })
    column: nasl.core.Integer;
    @Prop({
      group: '状态属性',
      title: '只读',
      description: '正常显示，但禁止选择/输入',
      docDescription: '正常显示，但禁止选择或输入',
      setter: {
        concept: 'SwitchSetter'
      },
      settable: true
    })
    readonly: nasl.core.Boolean = false;
    @Prop({
      group: '状态属性',
      title: '预览',
      description: '显示预览态',
      docDescription: '',
      setter: {
        concept: 'SwitchSetter'
      },
      settable: true
    })
    preview: nasl.core.Boolean = false;
    @Prop({
      group: '状态属性',
      title: '禁用',
      description: '置灰显示，且禁止任何交互（焦点、点击、选择、输入等）',
      docDescription: '置灰显示，且禁止任何交互（焦点、点击、选择、输入等）',
      setter: {
        concept: 'SwitchSetter'
      },
      settable: true
    })
    disabled: nasl.core.Boolean = false;
    @Event({
      title: '输入时',
      description: '切换选项时触发'
    })
    onInput: (event: nasl.collection.List<V>) => any;
    @Event({
      title: '选中后',
      description: '切换选项时触发'
    })
    onCheck: (event: {
      value: nasl.collection.List<V> | nasl.core.String;
      oldValue: nasl.collection.List<V> | nasl.core.String;
    }) => any;
    @Event({
      title: '改变后',
      description: '选中状态改变时触发'
    })
    onChange: (event: {
      value: nasl.collection.List<V> | nasl.core.String;
      oldValue: nasl.collection.List<V> | nasl.core.String;
    }) => any;
    @Event({
      title: '加载前',
      description: '加载前触发'
    })
    onBeforeLoad: (event: any) => any;
    @Event({
      title: '加载后',
      description: '加载后触发'
    })
    onLoad: (event: any) => any;
    @Slot({
      title: 'undefined',
      description: '插入`<checkbox>`子组件。',
      emptyBackground: 'add-sub',
      snippets: [{
        title: '多选项',
        code: '<ex-u-checkbox><template slot="item">节点</template></ex-u-checkbox>'
      }]
    })
    slotDefault: () => Array<nasl.ui.UCheckbox<T, V>>;
    @Slot({
      title: '全选/反选文本',
      description: '全选/反选'
      // snippets: [
      //     {
      //         title: '全选/反选文本',
      //         code: "<u-text text='全选'></u-text>",
      //     },
      // ],
    })
    slotCheckAll: () => Array<nasl.ui.ViewComponent>;
    @Slot({
      title: '自定义选项',
      description: '自定义选项的结构和样式'
    })
    slotItem: (current: nasl.ui.Current<T>) => Array<nasl.ui.ViewComponent>;
  }
  @ExtensionComponent({
    type: "pc",
    show: true,
    ideusage: {
      "idetype": "container",
      "parentAccept": "target.tag === 'ex-u-checkboxes'",
      "displaySlotInline": {
        "item": true
      },
      "additionalAttribute": {
        "autofocus": "\"false\""
      }
    }
  })
  @Component({
    title: '多选项',
    description: '多选项'
  })
  export class ExUCheckbox<T, V> extends ViewComponent {
    @Prop({
      title: '选中'
    })
    value: ExUCheckboxOptions<T, V>['value'] = false;
    @Prop({
      title: '禁用'
    })
    disabled: nasl.core.Boolean;
    @Prop({
      title: '只读'
    })
    readonly: nasl.core.Boolean;
    constructor(options?: Partial<ExUCheckboxOptions<T, V>>) {
      super();
    }
  }
  export class ExUCheckboxOptions<T, V> extends ViewComponentOptions {
    @Prop({
      title: '文本',
      description: '显示文本内容'
    })
    private text: nasl.core.String;
    @Prop({
      group: '数据属性',
      title: '值',
      description: '标志选中状态的值，`null`表示不确定状态',
      sync: true,
      docDescription: '选项返还的选项值。'
    })
    private value: nasl.core.Boolean | null = false;
    @Prop({
      group: '数据属性',
      title: '选项值',
      description: '用于标识选项的值'
    })
    label: V;
    @Prop({
      group: '主要属性',
      title: '自动获取焦点',
      setter: {
        concept: 'SwitchSetter'
      }
    })
    autofocus: nasl.core.Boolean = false;
    @Prop({
      group: '状态属性',
      title: '只读',
      description: '正常显示，但禁止选择/输入',
      docDescription: '正常显示，但禁止选择或输入',
      setter: {
        concept: 'SwitchSetter'
      },
      settable: true
    })
    readonly: nasl.core.Boolean = false;
    @Prop({
      group: '状态属性',
      title: '禁用',
      description: '置灰显示，且禁止任何交互（焦点、点击、选择、输入等）',
      docDescription: '置灰显示，且禁止任何交互（焦点、点击、选择、输入等）。',
      setter: {
        concept: 'SwitchSetter'
      },
      settable: true
    })
    disabled: nasl.core.Boolean = false;
    @Event({
      title: '选中前',
      description: '切换选中状态前触发'
    })
    onBeforeCheck: (event: {
      value: nasl.core.Boolean;
      oldValue: nasl.core.Boolean;
    }) => any;
    @Event({
      title: '输入时',
      description: '切换选中状态时触发'
    })
    onInput: (event: V) => any;
    @Event({
      title: '选中后',
      description: '切换选中状态时触发'
    })
    onCheck: (event: {
      value: V;
    }) => any;
    @Event({
      title: '改变后',
      description: '选中状态改变时触发'
    })
    onChange: (event: {
      value: V;
      oldValue: V;
    }) => any;
    @Slot({
      title: '项',
      description: '插入文本或 HTML。'
    })
    slotItem: () => Array<nasl.ui.ViewComponent>;
  }
}