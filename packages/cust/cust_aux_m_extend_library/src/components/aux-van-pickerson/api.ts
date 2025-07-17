/// <reference types="@nasl/types" />
/// <reference types="../../../.lcap/lcap-ui/runtime/nasl.ui.d.ts" />
namespace extensions.cust_aux_m_extend_library.viewComponents {
  const { Component, Prop, ViewComponent, Slot, Method, Param, Event, ViewComponentOptions } = nasl.ui;
  @ExtensionComponent({
    replaceNaslUIComponent: 'VanPickerson',
    type: 'h5',
    show: true,
    ideusage: {
      idetype: 'drawerdropdown',
      cacheOpenKey: 'popupOpened',
      drawerCSSSelector: '.van-popup',
      dataSource: {
        dismiss: "!this.getAttribute('dataSource')",
        display: 6,
        loopRule: 'nth-child(n+2)',
        loopElem: "> label[class^='u-radios_radio']:not([data-nodepath])",
      },
      scopedSlots: ['title', 'picker-top', 'pannel-title', 'picker-bottom'],
      displaySlotConditions: {
        option: "!!this.getAttribute('dataSource') && this.getAttribute('optionIsSlot') && this.getAttribute('optionIsSlot').value",
      },
      translateBindingProperty: ['title', 'cancelButtonText', 'confirmButtonText', 'placeholder', 'value'],
      useFxOrEg: {
        property: 'value',
        displayAsAttr: true,
      },
      namedSlotOmitWrapper: ['picker-top', 'picker-bottom', 'option'],
      slotWrapperInlineStyle: {
        option: 'width: 100%',
      },
      style: [
        {
          selector: '.van-picker-pick-column__wrapper > li:nth-child(n+2)',
          declaration: 'opacity: 0.4; cursor: not-allowed !important; pointer-events: none',
          fromNodePath: true,
        },
        {
          selector: '.van-picker-list > .van-picker-list__item:nth-child(n+2)',
          declaration: 'opacity: 0.4; cursor: not-allowed !important; pointer-events: none',
          fromNodePath: true,
        },
      ],
    },
  })
  @Component({
    title: '选择器',
    icon: 'picker',
    description: '提供多个选项集合供用户选择，支持单列选择和多列级联。',
    // group: "Selector"
  })
  export class AuxVanPickerson<T, V, M extends nasl.core.Boolean, P extends nasl.core.Boolean, C> extends ViewComponent {
    constructor(options?: Partial<AuxVanPickersonOptions<T, V, M, P, C>>) {
      super();
    }
    @Prop({
      title: '选中值',
    })
    value: AuxVanPickersonOptions<T, V, M, P, C>['value'];
    @Prop({
      title: '数据',
    })
    data: nasl.collection.List<T>;
    @Prop({
      title: '当前页数',
    })
    page: nasl.core.Integer;
    @Prop({
      title: '当前页数',
    })
    size: nasl.core.Integer;
    @Prop({
      title: '过滤文本',
    })
    filterText: nasl.core.String;
    @Prop({
      title: '禁用',
    })
    disabled: nasl.core.Boolean;
    @Prop({
      title: '只读',
    })
    readonly: nasl.core.Boolean;
    @Prop({
      title: '预览',
    })
    preview: nasl.core.Boolean;
    @Method({
      title: 'undefined',
      description: '重新加载数据',
    })
    reload(): any {}
    @Method({
      title: 'undefined',
      description: '打开选择器',
    })
    open(): any {}
    @Method({
      title: 'undefined',
      description: '关闭选择器',
    })
    close(): any {}
  }
  export class AuxVanPickersonOptions<T, V, M extends nasl.core.Boolean, P extends nasl.core.Boolean, C> extends ViewComponentOptions {
    @Prop({
      title: '左侧标题',
      description: '左侧标题',
    })
    private labelField: nasl.core.String;
    @Prop({
      title: '默认选中项的索引',
      description: '默认选中项的索引',
      setter: {
        concept: 'NumberInputSetter',
      },
    })
    private defaultIndex: nasl.core.Decimal = 0;
    @Prop({
      title: '是否使用新版外观',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    isNew: nasl.core.Boolean = false;
    @Prop({
      group: '数据属性',
      title: '值',
      description: '用于标识选择器的值',
      sync: true,
      settable: true,
    })
    value: M extends true ? (C extends '' ? nasl.collection.List<V> : nasl.core.String) : V;
    @Prop({
      group: '数据属性',
      title: '数据源',
      description: '展示数据的输入源，可设置为数据集对象或者返回数据集的逻辑',
      designerValue: [{}, {}, {}, {}, {}, {}],
      bindOpen: true,
    })
    dataSource:
      | nasl.collection.List<T>
      | {
          total: nasl.core.Integer;
          list: nasl.collection.List<T>;
        };
    @Prop({
      group: '数据属性',
      title: '数据类型',
      description: '集合类型每一元素的数据类型',
    })
    dataSchema: T;
    @Prop({
      group: '数据属性',
      title: '文本字段',
      description: '选项文本的字段名',
      setter: {
        concept: 'PropertySelectSetter',
      },
    })
    textField: (item: T) => any = ((item: any) => item.text) as any;
    @Prop<AuxVanPickersonOptions<T, V, M, P, C>, 'optionIsSlot'>({
      group: '数据属性',
      title: '动态选项插槽',
      description: '自定义选项内容',
      docDescription: '自定义选项内容',
      setter: {
        concept: 'SwitchSetter',
      },
      bindHide: true,
      if: (_) => !!_.dataSource,
    })
    optionIsSlot: nasl.core.Boolean = true;
    @Prop({
      group: '数据属性',
      title: '值字段',
      description: '选项值的字段名',
      setter: {
        concept: 'PropertySelectSetter',
      },
    })
    valueField: (item: T) => V = ((item: any) => item.value) as any;
    @Prop<AuxVanPickersonOptions<T, V, M, P, C>, 'pageSize'>({
      group: '数据属性',
      title: '默认每页条数',
      setter: {
        concept: 'NumberInputSetter',
        min: 10,
      },
      if: (_) => _.pageable === true,
    })
    pageSize: nasl.core.Decimal = 50;
    @Prop({
      group: '数据属性',
      title: '初始化排序规则',
      description: '设置数据初始化时的排序字段和顺序规则',
    })
    sorting: {
      field: nasl.core.String;
      order: nasl.core.String;
    } = {
      field: '',
      order: 'desc',
    };
    @Prop<AuxVanPickersonOptions<T, V, M, P, C>, 'matchMethod'>({
      group: '数据属性',
      title: '匹配方法',
      description: '设置过滤时的匹配方法',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          {
            title: '包括',
          },
          {
            title: '匹配开头',
          },
          {
            title: '匹配结尾',
          },
        ],
      },
      if: (_) => _.filterable === true,
    })
    matchMethod: 'includes' | 'startsWith' | 'endsWith' = 'includes';
    @Prop({
      group: '主要属性',
      title: '分页加载更多',
      description: '设置是否分页加载更多',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    pageable: nasl.core.Boolean = false;
    @Prop({
      group: '主要属性',
      title: '列表样式',
      description: '设置列表样式，仅列表展示时支持多选',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          {
            title: '选择器',
          },
          {
            title: '列表',
          },
        ],
      },
    })
    type: 'picker' | 'list' = 'picker';
    @Prop({
      group: '主要属性',
      title: '占位提示',
      implicitToString: true,
    })
    placeholder: nasl.core.String = '请选择';
    @Prop({
      group: '主要属性',
      title: '工具栏标题',
      implicitToString: true,
    })
    title: nasl.core.String = '标题';
    @Prop<AuxVanPickersonOptions<T, V, M, P, C>, 'confirmButtonText'>({
      group: '主要属性',
      title: '确认按钮文字',
      if: (_) => _.isNew === false,
      implicitToString: true,
    })
    confirmButtonText: nasl.core.String = '确认';
    @Prop<AuxVanPickersonOptions<T, V, M, P, C>, 'cancelButtonText'>({
      group: '主要属性',
      title: '取消按钮文字',
      if: (_) => _.isNew === false,
      implicitToString: true,
    })
    cancelButtonText: nasl.core.String = '取消';
    @Prop<AuxVanPickersonOptions<T, V, M, P, C>, 'visibleItemCount'>({
      group: '主要属性',
      title: '可见选项个数',
      description: '设置可见选项个数',
      setter: {
        concept: 'NumberInputSetter',
        precision: 0,
        min: 1,
      },
      if: (_) => _.type === 'picker',
    })
    visibleItemCount: nasl.core.Integer = 6;
    @Prop({
      group: '主要属性',
      title: '对齐方式',
      description: '设置右侧内容的对齐方式',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          {
            title: '左',
          },
          {
            title: '中',
          },
          {
            title: '右',
          },
        ],
      },
    })
    inputAlign: 'left' | 'center' | 'right';
    @Prop({
      group: '主要属性',
      title: '显示工具栏',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    showToolbar: nasl.core.Boolean = true;
    @Prop({
      group: '主要属性',
      title: '转换器',
      description: '将选中的值以选择的符号作为连接符，转为字符串格式；选择“json”则转为JSON字符串格式。',
      docDescription: '将选中的值以选择的符号作为连接符，转为字符串格式；选择“json”则转为JSON字符串格式',
      bindHide: true,
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          {
            title: '无',
          },
          {
            title: "以', '连接",
          },
          {
            title: "以'|'连接",
          },
          {
            title: "以';'连接",
          },
          {
            title: 'json',
          },
        ],
      },
    })
    converter: '' | 'join' | 'join:|' | 'join:;' | 'json' = '';
    @Prop({
      group: '交互属性',
      title: '支持筛选',
      description: '设置是否支持筛选，开启将会支持搜索。',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    filterable: nasl.core.Boolean = false;
    @Prop({
      group: '交互属性',
      title: '可多选',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    multiple: nasl.core.Boolean = false;
    @Prop<AuxVanPickersonOptions<T, V, M, P, C>, 'enableSelectAll'>({
      group: '交互属性',
      title: '全选',
      setter: {
        concept: 'SwitchSetter',
      },
      if: (_) => _.multiple === true,
    })
    enableSelectAll: nasl.core.Boolean = false;
    @Prop<AuxVanPickersonOptions<T, V, M, P, C>, 'enableSelectedCount'>({
      group: '交互属性',
      title: '已选中项数',
      description: '是否显示当前已选中项数',
      setter: {
        concept: 'SwitchSetter',
      },
      if: (_) => _.multiple === true,
    })
    enableSelectedCount: nasl.core.Boolean = false;
    @Prop({
      group: '交互属性',
      title: '点击遮罩层后关闭',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    closeOnClickOverlay: nasl.core.Boolean = false;
    @Prop({
      group: '状态属性',
      title: '初始加载',
      description: '是否在初始时立即加载',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    initialLoad: nasl.core.Boolean = true;
    @Prop({
      group: '状态属性',
      title: '只读',
      description: '正常显示，但禁止选择/输入',
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
      setter: {
        concept: 'SwitchSetter',
      },
      settable: true,
    })
    disabled: nasl.core.Boolean = false;
    @Prop({
      group: '交互属性',
      title: '可清除',
      description: '可点击清除按钮一键清除所选内容',
      docDescription: '控制是否显示清除按钮，支持一键清除所选内容',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    clearable: nasl.core.Boolean = false;
    @Prop({
      group: '交互属性',
      title: '自动清除筛选',
      description: '是否自动清除筛选文本',
      docDescription: '是否自动清除筛选文本',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          {
            title: '关闭',
          },
          {
            title: '取消时',
          },
          {
            title: '确认时',
          },
          {
            title: '总是',
          },
        ],
      },
    })
    private clearFilter: 'none' | 'cancel' | 'confirm' | 'always' = 'cancel';
    @Prop({
      group: '状态属性',
      title: '预览',
      description: '显示预览态',
      docDescription: '',
      setter: {
        concept: 'SwitchSetter',
      },
      settable: true,
    })
    preview: nasl.core.Boolean = false;
    @Event({
      title: '点击完成按钮时触发',
      description: '回调参数：选中值，选中值对应的索引',
    })
    onConfirm: (event: M extends true ? nasl.collection.List<V> : V) => void;
    @Event({
      title: '点击取消按钮时触发',
      description: '回调参数：选中值，选中值对应的索引',
    })
    onCancel: (event: nasl.ui.BaseEvent) => void;
    @Event({
      title: '选项改变时触发',
      description: '回调参数：Picker 实例，选中值，选中值对应的索引',
    })
    onChange: (event: { item: T; value: V; index: number }) => void;
    @Event({
      title: '弹出前',
      description: '弹出前触发。',
    })
    onBeforeOpen: (event: any) => any;
    @Event({
      title: '关闭前',
      description: '关闭前触发。',
    })
    onBeforeClose: (event: { type: nasl.core.String }) => any;
    // @Slot({
    //   title: 'undefined',
    //   description: '插入`<van-picker-action-slot>`子组件',
    //   snippets: [{
    //     title: '事件插槽',
    //     code: '<van-picker-action-slot target-method="confirm"></van-picker-action-slot>'
    //   }]
    // })
    // slotDefault: () => Array<VanPickerActionSlot>;
    @Slot({
      title: '组件插槽',
      description: 'option',
    })
    slotOption: (current: nasl.ui.Current<T>) => Array<nasl.ui.ViewComponent>;
    @Slot({
      title: '组件插槽',
      description: '自定义标题',
    })
    slotTitle: () => Array<nasl.ui.ViewComponent>;
    @Slot({
      title: '组件插槽',
      description: '自定义',
    })
    'slot-pannel-title': () => Array<nasl.ui.ViewComponent>;
    slotPannelTitle: () => Array<nasl.ui.ViewComponent>;
    @Slot({
      title: '组件插槽',
      description: '自定义选择器顶部内容',
    })
    'slot-picker-top': () => Array<nasl.ui.ViewComponent>;
    slotPickerTop: () => Array<nasl.ui.ViewComponent>;
    @Slot({
      title: '组件插槽',
      description: '自定义选择器底部内容',
    })
    'slot-picker-bottom': () => Array<nasl.ui.ViewComponent>;
    slotPickerBottom: () => Array<nasl.ui.ViewComponent>;
  }
}
