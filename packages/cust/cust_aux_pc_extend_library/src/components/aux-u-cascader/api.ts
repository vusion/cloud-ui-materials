/// <reference types="@nasl/types" />
/// <reference types="../../../.lcap/lcap-ui/runtime/nasl.ui.d.ts" />
namespace extensions.cust_aux_pc_extend_library.viewComponents {
  const { Component, Prop, ViewComponent, Slot, Method, Param, Event, ViewComponentOptions } = nasl.ui;
  @ExtensionComponent({
    replaceNaslUIComponent: 'UCascader',
    type: 'pc',
    show: true,
    ideusage: {
      idetype: 'element',
      additionalAttribute: {
        autofocus: '"false"',
      },
    },
  })
  @Component({
    title: '级联选择',
    icon: 'cascade-select',
    description: '一次选择多个相关联的项',
  })
  export class AuxUCascader<T, V> extends ViewComponent {
    @Prop({
      title: '数据',
    })
    data: nasl.collection.List<T>;
    @Prop({
      title: '选中值',
    })
    value: AuxUCascaderOptions<T, V>['value'];
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
    @Prop({
      title: '打开',
    })
    opened: nasl.core.Boolean;
    @Method({
      title: 'undefined',
      description: '弹出实例。',
    })
    open(): void {}
    @Method({
      title: 'undefined',
      description: '关闭实例。',
    })
    close(): void {}
    @Method({
      title: 'undefined',
      description: '清空输入框。',
    })
    clear(): void {}
    @Method({
      title: 'undefined',
      description: '重新加载数据',
    })
    reload(): void {}
    constructor(options?: Partial<AuxUCascaderOptions<T, V>>) {
      super();
    }
  }
  export class AuxUCascaderOptions<T, V> extends ViewComponentOptions {
    @Prop({
      group: '数据属性',
      title: '数据源',
      description: '展示数据的输入源，可设置为数据集对象或者返回数据集的逻辑',
      docDescription: '数据列表，支持直接放置多层的数据源也支持通过单层的数据和`父节点字段名`或`子节点字段名`构建树形',
      bindOpen: true,
    })
    dataSource:
      | nasl.collection.List<T>
      | {
          list: nasl.collection.List<T>;
          total: nasl.core.Integer;
        };
    @Prop({
      group: '数据属性',
      title: '数据类型',
      description: '数据源返回的数据结构的类型，自动识别类型进行展示说明',
      docDescription: '集合类型每一元素的数据类型',
    })
    dataSchema: T;
    @Prop<AuxUCascaderOptions<T, V>, 'field'>({
      group: '数据属性',
      title: '文本字段',
      description: '集合的元素类型中，用于显示文本的属性名称',
      docDescription: '集合的元素类型中，用于显示文本的属性名称',
      setter: {
        concept: 'PropertySelectSetter',
      },
    })
    field: (item: T) => any = ((item: any) => item.text) as any;
    @Prop<AuxUCascaderOptions<T, V>, 'valueField'>({
      group: '数据属性',
      title: '值字段',
      description: '集合的元素类型中，用于标识选中值的属性',
      docDescription: '集合的元素类型中，用于标识选中值的属性',
      setter: {
        concept: 'PropertySelectSetter',
      },
    })
    valueField: (item: T) => V = ((item: any) => item.value) as any;
    @Prop<AuxUCascaderOptions<T, V>, 'childrenField'>({
      group: '数据属性',
      title: '子级值字段',
      description: '树形数据子节点字段名，默认为children',
      docDescription: '树形数据子节点字段名，默认为children',
      setter: {
        concept: 'PropertySelectSetter',
      },
    })
    childrenField: (item: T) => nasl.collection.List<any> = ((item: any) => item.children) as any;
    @Prop<AuxUCascaderOptions<T, V>, 'parentField'>({
      group: '数据属性',
      title: '父级值字段',
      description: '当数据源为平铺数据时自动生成级联数据的节点字段名，重要：值字段名需要一起配置',
      docDescription: '当数据源为平铺数据时自动生成级联数据的节点字段名，重要：值字段名需要一起配置',
      setter: {
        concept: 'PropertySelectSetter',
      },
    })
    parentField: (item: T) => any;
    @Prop({
      group: '数据属性',
      title: '值',
      sync: true,
      docDescription: '选择器的值',
      settable: true,
    })
    value: any;
    @Prop({
      group: '数据属性',
      title: '绑定值使用值字段',
      docDescription: '是否使用数组类型的value',
      bindHide: true,
      setter: {
        concept: 'SwitchSetter',
      },
    })
    useArrayLikeValue: nasl.core.Boolean = false;
    @Prop({
      group: '数据属性',
      title: '筛选',
      description: '设置是否可以筛选，开启将会显示搜索框。',
      docDescription: '是否可以过滤（搜索），开启将会显示搜索框',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    filterable: nasl.core.Boolean = false;
    @Prop<AuxUCascaderOptions<T, V>, 'filterHightlighterColor'>({
      group: '主要属性',
      title: '筛选文字高亮颜色',
      description: '设置筛选文字高亮颜色',
      docDescription: '设置筛选文字高亮颜色',
      if: (_) => _.filterable === true,
    })
    filterHightlighterColor: nasl.core.String;
    @Prop({
      group: '主要属性',
      title: '占位符',
      description: '为空时显示的占位符文本',
      docDescription: '搜索框为空时提示文本',
      implicitToString: true,
    })
    placeholder: nasl.core.String = '请选择';
    @Prop({
      group: '主要属性',
      title: '只显示最后一项',
      description: '定义是否显示完整的路径，ture时只显示最后一项',
      docDescription: '定义是否显示完整的路径，ture时只显示最后一项',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    showFinalValue: nasl.core.Boolean = false;
    @Prop({
      group: '主要属性',
      title: '自动获取焦点',
      description: '设置是否自动获取焦点',
      docDescription: '是否自动获取焦点',
      designerValue: false,
      setter: {
        concept: 'SwitchSetter',
      },
    })
    autofocus: nasl.core.Boolean = false;
    @Prop({
      group: '交互属性',
      title: '触发方式',
      docDescription: '触发方式',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          {
            title: '点击',
          },
          {
            title: '悬浮',
          },
        ],
      },
    })
    trigger: 'click' | 'hover' = 'click';
    @Prop({
      group: '交互属性',
      title: '可清空',
      description: '设置是否可以清空搜索框，开启后将在有内容时显示清除按钮。',
      docDescription: '开启并在输入框有内容时会显示清除按钮',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    clearable: nasl.core.Boolean = false;
    @Prop<AuxUCascaderOptions<T, V>, 'clearIcon'>({
      group: '交互属性',
      title: '清空图标',
      description: '设置清空图标',
      docDescription: '设置清空图标',
      setter: {
        concept: 'IconSetter',
      },
      if: (_) => _.clearable === true,
    })
    clearIcon: nasl.core.String;
    @Prop({
      group: '主要属性',
      title: '前缀图标',
      description: '设置前缀图标',
      docDescription: '设置前缀图标',
      setter: {
        concept: 'IconSetter',
      },
    })
    prefixIcon: nasl.core.String;
    @Prop({
      group: '主要属性',
      title: '后缀图标',
      description: '设置后缀图标',
      docDescription: '设置后缀图标',
      setter: {
        concept: 'IconSetter',
      },
    })
    suffixIcon: nasl.core.String = 'bottom-arrow';
    @Prop({
      group: '主要属性',
      title: '菜单展开图标',
      description: '设置菜单展开图标',
      docDescription: '设置菜单展开图标',
      setter: {
        concept: 'IconSetter',
      },
    })
    menuExpandIcon: nasl.core.String;
    @Prop({
      group: '主要属性',
      title: '加载图标',
      description: '设置加载图标',
      docDescription: '设置加载图标',
      setter: {
        concept: 'IconSetter',
      },
    })
    loadingIcon: nasl.core.String = 'loading';
    @Prop({
      group: '数据属性',
      title: '空值为null',
      description: '清空值时是否设置为null',
      designerValue: true,
      setter: {
        concept: 'SwitchSetter',
      },
    })
    emptyValueIsNull: nasl.core.Boolean;
    @Prop({
      group: '状态属性',
      title: '禁用',
      description: '置灰显示，且禁止任何交互（焦点、点击、选择、输入等）',
      docDescription: '禁用选择器',
      setter: {
        concept: 'SwitchSetter',
      },
      settable: true,
    })
    disabled: nasl.core.Boolean = false;
    @Prop({
      group: '状态属性',
      title: '弹出状态',
      description: '弹出状态分为“True(弹出)/False(关闭)”，默认为“弹出”',
      docDescription: '切换弹出/关闭状态',
      setter: {
        concept: 'SwitchSetter',
      },
      settable: true,
    })
    opened: nasl.core.Boolean = false;
    @Prop({
      group: '样式属性',
      title: '宽度',
      description: '设置级联框宽度大小',
      docDescription: '设置级联框宽度大小',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          {
            title: '占满',
          },
          {
            title: '巨大',
          },
          {
            title: '大',
          },
          {
            title: '中型',
          },
          {
            title: '正常',
          },
          {
            title: '小',
          },
          {
            title: '迷你',
          },
        ],
      },
    })
    width: 'full' | 'huge' | 'large' | 'medium' | 'normal' | 'small' | 'mini' = 'normal';
    @Prop({
      group: '样式属性',
      title: '下拉列表宽度',
      description: '设置下拉列表宽度',
      docDescription: '设置下拉列表宽度',
    })
    popperWidth: nasl.core.String;
    @Prop({
      group: '样式属性',
      title: '高度',
      description: '设置级联框高度大小',
      docDescription: '设置级联框高度大小',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          {
            title: '占满',
          },
          {
            title: '巨大',
          },
          {
            title: '大',
          },
          {
            title: '中型',
          },
          {
            title: '正常',
          },
          {
            title: '小',
          },
          {
            title: '迷你',
          },
        ],
      },
    })
    height: 'full' | 'huge' | 'large' | 'medium' | 'normal' | 'small' | 'mini' = 'normal';
    @Prop({
      group: '数据属性',
      title: '连接符',
      description: '将选中的值以选择的符号作为连接符，转为字符串格式,不可为空值',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          {
            title: "以', '连接",
          },
          {
            title: "以'|'连接",
          },
          {
            title: "以' / '连接",
          },
        ],
      },
    })
    private join: ',' | '|' | ' / ' = ' / ';
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
    @Prop({
      group: '状态属性',
      title: '暂无数据文案',
      description: '暂无数据状态显示的提示文案',
      docDescription: '当级联选择器为空时的提示文字。默认"暂无数据"。',
      implicitToString: true,
    })
    emptyText: nasl.core.String = '暂无数据';
    @Event({
      title: '输入时',
      description: '选择某一项时触发',
    })
    onInput: (event: V) => any;
    @Event({
      title: '选择后',
      description: '选择某一项时触发',
    })
    onSelect: (event: { value: V; values: nasl.collection.List<V>; items: nasl.collection.List<T> }) => any;
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
      title: '清空后',
      description: '清空后触发。',
    })
    onClear: (event: any) => any;
    @Event({
      title: '加载前',
      description: '加载前触发',
    })
    onBeforeLoad: (event: any) => any;
    @Event({
      title: '加载后',
      description: '加载后触发',
    })
    onLoad: (event: any) => any;
  }
}
