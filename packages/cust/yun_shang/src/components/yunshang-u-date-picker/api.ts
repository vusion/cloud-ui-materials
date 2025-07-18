/// <reference types="@nasl/types" />
/// <reference types="../../../.lcap/lcap-ui/runtime/nasl.ui.d.ts" />
namespace extensions.yun_shang.viewComponents {
  const { Component, Prop, ViewComponent, Slot, Method, Param, Event, ViewComponentOptions } = nasl.ui;
  type ViewComponent = nasl.ui.ViewComponent;
  @ExtensionComponent({
    replaceNaslUIComponent: 'UDatePicker',
    type: 'pc',
    show: true,
    ideusage: {
      idetype: 'container',
      additionalAttribute: {
        ':value': null,
        autofocus: '"false"',
      },
      translateBindingProperty: ['value', 'placeholder'],
      events: {
        click: true,
      },
    },
  })
  @Component({
    title: '日期选择',
    icon: 'date-picker',
    description: '日期选择',
    // group: 'Selector'
  })
  export class YunshangUDatePicker extends ViewComponent {
    @Prop({
      title: '值',
    })
    value: YunshangUDatePickerOptions['value'];
    @Prop({
      title: '起始值',
    })
    startDate: YunshangUDatePickerOptions['startDate'];
    @Prop({
      title: '结束值',
    })
    endDate: YunshangUDatePickerOptions['endDate'];
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
    @Prop({
      title: '区间选择',
    })
    range: nasl.core.Boolean;
    @Method({
      title: 'undefined',
      description: '关闭日期选择器',
    })
    close(): void {}
    constructor(options?: Partial<YunshangUDatePickerOptions>) {
      super();
    }
  }
  export class YunshangUDatePickerOptions extends ViewComponentOptions {
    @Prop({
      group: '数据属性',
      title: '日期类型',
      description: '日期格式设置',
      docDescription: '日期选择弹出层里的日期展示格式，支持日期、月份、季度、年份4种模式。默认日期格式',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          {
            title: '日期',
          },
          {
            title: '周',
          },
          {
            title: '月份',
          },
          {
            title: '季度',
          },
          {
            title: '年份',
          },
        ],
      },
    })
    picker: 'date' | 'week' | 'month' | 'quarter' | 'year' = 'date';
    @Prop({
      group: '数据属性',
      title: '区间选择',
      description: '是否支持进行日期区间选择，关闭则为日期点选择',
      setter: {
        concept: 'SwitchSetter',
      },
      onChange: [
        {
          clear: ['placeholderRight', 'value', 'startDate', 'endDate'],
        },
      ],
      settable: true,
    })
    range: nasl.core.Boolean = false;
    @Prop<YunshangUDatePickerOptions, 'value'>({
      group: '数据属性',
      title: '值',
      description: '默认显示的日期值，格式如2018-08-08',
      sync: true,
      docDescription: '当前选择的值',
      if: (_) => _.range !== true,
      settable: true,
    })
    value: nasl.core.String | nasl.core.Integer | nasl.core.Date | nasl.core.DateTime;
    @Prop<YunshangUDatePickerOptions, 'startDate'>({
      group: '数据属性',
      title: '起始值',
      description: '默认显示的起始日期值，格式如2018-08-08',
      sync: true,
      if: (_) => _.range === true,
      settable: true,
    })
    startDate: nasl.core.String | nasl.core.Integer | nasl.core.Date | nasl.core.DateTime;
    @Prop<YunshangUDatePickerOptions, 'endDate'>({
      group: '数据属性',
      title: '结束值',
      description: '默认显示的结束日期值，格式如2018-08-08',
      sync: true,
      if: (_) => _.range === true,
      settable: true,
    })
    endDate: nasl.core.String | nasl.core.Integer | nasl.core.Date | nasl.core.DateTime;
    @Prop({
      group: '数据属性',
      title: '最小日期值',
      description: '最小可选的日期值，默认为10年前，日期填写格式为“yyyy-mm-dd”',
      docDescription: '设置日期范围，支持输入的最小日期',
    })
    minDate: nasl.core.String | nasl.core.Integer | nasl.core.Date | nasl.core.DateTime;
    @Prop({
      group: '数据属性',
      title: '最大日期值',
      description: '最大可选的日期值，默认为9年后，日期填写格式为“yyyy-mm-dd”',
      docDescription: '设置日期范围，支持输入的最大日期',
    })
    maxDate: nasl.core.String | nasl.core.Integer | nasl.core.Date | nasl.core.DateTime;
    @Prop({
      group: '数据属性',
      title: '时间格式',
      description: '输入对应格式的字符串（8:00:00）即可',
    })
    private time: nasl.core.String | nasl.core.Integer = '00:00:00';
    @Prop<YunshangUDatePickerOptions, 'yearDiff'>({
      group: '数据属性',
      title: '最小年份差值',
      description: '最小可选年份值与当前年份值的差值',
      docDescription: '设置日期范围，最小可选择的年份',
      setter: {
        concept: 'NumberInputSetter',
      },
      if: (_) => _.range !== true,
    })
    yearDiff: nasl.core.Decimal | nasl.core.Integer = 20;
    @Prop<YunshangUDatePickerOptions, 'yearAdd'>({
      group: '数据属性',
      title: '最大年份差值',
      description: '最大可选年份值与当前年份值的差值',
      docDescription: '设置日期范围，最大可选择的年份',
      setter: {
        concept: 'NumberInputSetter',
      },
      if: (_) => _.range !== true,
    })
    yearAdd: nasl.core.Decimal | nasl.core.Integer = 20;
    @Prop({
      group: '主要属性',
      title: '高级格式化',
      onChange: [
        {
          clear: ['advancedFormatValue'],
        },
      ],
      setter: {
        concept: 'SwitchSetter',
      },
    })
    advancedFormatEnable: nasl.core.Boolean = false;
    @Prop<YunshangUDatePickerOptions, 'advancedFormatValue'>({
      group: '主要属性',
      title: '高级格式化内容',
      description: '用来控制日期的展示格式',
      bindHide: true,
      if: (_) => _.advancedFormatEnable === true,
    })
    advancedFormatValue: nasl.core.String;
    @Prop<YunshangUDatePickerOptions, 'showFormatter'>({
      group: '主要属性',
      title: '日期展示格式',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          {
            title: '中国（2023年7月26日）',
            if: (_) => _.picker === 'date',
          },
          {
            title: 'ISO（2023-07-26）',
            if: (_) => _.picker === 'date',
          },
          {
            title: 'US（7/26/2023）',
            if: (_) => _.picker === 'date',
          },
          {
            title: 'EU（26/7/2023）',
            if: (_) => _.picker === 'date',
          },
          {
            title: '2023-28周',
            if: (_) => _.picker === 'week',
          },
          {
            title: '2023年第28周',
            if: (_) => _.picker === 'week',
          },
          {
            title: '2023-W28',
            if: (_) => _.picker === 'week',
          },
          {
            title: '中国（2023年7月）',
            if: (_) => _.picker === 'month',
          },
          {
            title: 'ISO（2023-07）',
            if: (_) => _.picker === 'month',
          },
          {
            title: 'US/EU（7/2023）',
            if: (_) => _.picker === 'month',
          },
          {
            title: '2023年第3季度',
            if: (_) => _.picker === 'quarter',
          },
          {
            title: '2023年Q3',
            if: (_) => _.picker === 'quarter',
          },
          {
            title: '2023-Q3',
            if: (_) => _.picker === 'quarter',
          },
          {
            title: '中国（2023年）',
            if: (_) => _.picker === 'year',
          },
          {
            title: 'ISO（2023）',
            if: (_) => _.picker === 'year',
          },
        ],
      },
      if: (_) => _.advancedFormatEnable === false,
    })
    showFormatter:
      | 'YYYY年M月D日'
      | 'YYYY-MM-DD'
      | 'M/D/YYYY'
      | 'D/M/YYYY'
      | 'GGGG-W周'
      | 'GGGG年第W周'
      | 'GGGG-WWWW'
      | 'YYYY年M月'
      | 'YYYY-MM'
      | 'M/YYYY'
      | 'YYYY年第Q季度'
      | 'YYYY年QQ'
      | 'YYYY-QQ'
      | 'YYYY年'
      | 'YYYY';
    @Prop({
      group: '主要属性',
      title: '自动获取焦点',
      description: '设置是否自动获取焦点',
      docDescription: '控制是否在进入页面时聚焦到该组件',
      designerValue: false,
      setter: {
        concept: 'SwitchSetter',
      },
    })
    autofocus: nasl.core.Boolean = false;
    @Prop({
      group: '主要属性',
      title: '占位符',
      description: '为空时显示的占位符文本',
      docDescription: '日期选择框无内容时的提示信息，支持自定义编辑，默认为请输入',
    })
    placeholder: nasl.core.String = '请选择日期';
    @Prop<YunshangUDatePickerOptions, 'placeholderRight'>({
      group: '主要属性',
      title: '右侧占位符',
      description: '为空时显示的占位符文本（右侧）',
      docDescription: '日期选择框无内容时的提示信息，支持自定义编辑, 在没有设置的时候使用placeholder作为右侧占位符内容',
      if: (_) => _.range === true,
    })
    placeholderRight: nasl.core.String = '请选择日期';
    @Prop({
      group: '主要属性',
      title: '日历弹窗对齐方式',
      description: '日历弹窗对齐方式',
      docDescription: '日期选择弹出层与输入框的对齐方式，支持左对齐、右对齐2种模式。默认为左对齐',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          {
            title: '左对齐',
          },
          {
            title: '右对齐',
          },
        ],
      },
    })
    alignment: 'left' | 'right' = 'left';
    @Prop({
      group: '主要属性',
      title: '转换器',
      description: '转换器，用于转换时间结果',
      docDescription: '用于转换选中的日期格式，支持JSON、Unix 时间戳、Date对象、YYYY-MM-DD共4种模式。默认YYYY-MM-DD',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          {
            title: 'JSON',
          },
          {
            title: 'Unix 时间戳',
          },
          {
            title: 'Date 对象',
          },
          {
            title: 'YYYY-MM-DD',
          },
        ],
      },
    })
    converter: 'json' | 'timestamp' | 'date' | 'format' = 'format';
    @Prop({
      group: '主要属性',
      title: '前缀图标',
      docDescription: '支持添加前缀图标',
      setter: {
        concept: 'IconSetter',
      },
    })
    preIcon: nasl.core.String = 'calendar';
    @Prop({
      group: '主要属性',
      title: '后缀图标',
      docDescription: '支持添加后缀图标',
      setter: {
        concept: 'IconSetter',
      },
    })
    suffixIcon: nasl.core.String = '';
    @Prop({
      group: '主要属性',
      title: '弹出层位置依据',
      description: `设置弹出层依据哪个元素定位位置，可选值：'body'表示添加到 document.body，'reference'表示添加到参考元素中。`,
      docDescription: '设置弹出层添加到哪个元素',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          {
            title: '引用元素下',
          },
          {
            title: '全局body',
          },
        ],
      },
    })
    appendTo: 'reference' | 'body' = 'body';
    @Prop({
      group: '主要属性',
      title: '显示快捷选项',
      description: '显示快捷选项',
      docDescription: '显示快捷选项',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    showShortCuts: nasl.core.Boolean = true;
    @Prop({
      group: '交互属性',
      title: '可清除',
      description: '可点击清除按钮一键清除内容',
      docDescription: '控制是否显示清除按钮，支持一键清除所选内容',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    clearable: nasl.core.Boolean;
    @Prop<YunshangUDatePickerOptions, 'clearIcon'>({
      group: '交互属性',
      title: '清除图标',
      description: '设置清除图标',
      setter: {
        concept: 'IconSetter',
      },
      if: (_) => _.clearable === true,
    })
    clearIcon: nasl.core.String;
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
      title: '弹出状态',
      description: '弹出状态分为“True(弹出)/False(关闭)”，默认为“关闭”',
      docDescription: '开启时加载日期组件时，下拉框自动弹出，默认关闭',
      setter: {
        concept: 'SwitchSetter',
      },
      settable: true,
    })
    opened: nasl.core.Boolean = false;
    @Prop({
      group: '样式属性',
      title: '宽度',
      description: '设置日期选择输入框宽度大小',
      docDescription: '设置日期选择框宽度大小，支持占满、巨大、大、中型、正常、小共6种模式',
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
      title: '高度',
      description: '设置日期选择输入框高度大小',
      docDescription: '设置日期选择框高度大小，支持占满、巨大、大、中型、正常、小共6种模式',
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
    @Event({
      title: '值输入后',
      description: '值变化时触发 (表单验证可以检测到其值得变化)',
    })
    onInput: (event: nasl.core.Date) => any;
    @Event({
      title: '值变化时',
      description: '值变化时触发',
    })
    onChange: (event: { date: nasl.core.String; time: nasl.core.String }) => any;
    @Event({
      title: '选择后',
      description: '选择日期后触发',
    })
    onSelect: (event: { date: nasl.core.String; time: nasl.core.String }) => any;
    @Event({
      title: '弹出/隐藏时',
      description: '弹出/隐藏时触发',
    })
    onToggle: (event: { opened: nasl.core.Boolean }) => any;
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
    @Slot({
      title: '组件插槽',
      description: '快捷选项',
    })
    slotExtra: () => Array<ViewComponent>;
  }
}
