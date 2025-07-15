/// <reference types="@nasl/types" />
/// <reference types="../../../.lcap/lcap-ui/runtime/nasl.ui.d.ts" />
namespace extensions.yun_shang.viewComponents {
  const { Component, Prop, ViewComponent, Slot, Method, Param, Event, ViewComponentOptions } = nasl.ui;
  type ViewComponent = nasl.ui.ViewComponent;
  @ExtensionComponent({
    replaceNaslUIComponent: 'UDateTimePicker',
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
    title: '日期时间选择',
    icon: 'date-time-picker',
    description: '日期时间选择器',
    // group: 'Selector',
  })
  export class YunshangUDateTimePicker extends ViewComponent {
    @Prop({
      title: '值',
    })
    value: nasl.ui.UDatePickerOptions['value'];
    @Prop({
      title: '起始值',
    })
    startDate: nasl.ui.UDatePickerOptions['startDate'];
    @Prop({
      title: '结束值',
    })
    endDate: nasl.ui.UDatePickerOptions['endDate'];
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
    constructor(options?: Partial<YunshangUDateTimePickerOptions>) {
      super();
    }
  }
  export class YunshangUDateTimePickerOptions extends ViewComponentOptions {
    @Prop<YunshangUDateTimePickerOptions, 'minUnit'>({
      group: '主要属性',
      title: '最小单位',
      description: '最小时间单位',
      docDescription: '最小时间单位，支持秒或分',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          {
            title: '秒',
          },
          {
            title: '分',
          },
        ],
      },
      if: (_) => _.advancedFormatEnable === false,
    })
    minUnit: 'second' | 'minute' = 'second';
    @Prop<YunshangUDateTimePickerOptions, 'range'>({
      group: '数据属性',
      title: '区间选择',
      description: '是否支持进行日期时间区间选择，关闭则为日期时间点选择',
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
    @Prop<YunshangUDateTimePickerOptions, 'value'>({
      group: '数据属性',
      title: '值',
      description: '默认显示的日期时间值，格式如2018-08-08 08:08:08',
      sync: true,
      docDescription: '默认显示的日期时间值',
      if: (_) => _.range !== true,
      settable: true,
    })
    value: nasl.core.String | nasl.core.Decimal | nasl.core.Date | nasl.core.DateTime | nasl.core.Integer;
    @Prop<YunshangUDateTimePickerOptions, 'startDate'>({
      group: '数据属性',
      title: '起始值',
      description: '默认显示的起始日期时间值，格式如2018-08-08 08:08:08',
      sync: true,
      if: (_) => _.range === true,
      settable: true,
    })
    startDate: nasl.core.String | nasl.core.Decimal | nasl.core.Date | nasl.core.DateTime;
    @Prop<YunshangUDateTimePickerOptions, 'endDate'>({
      group: '数据属性',
      title: '结束值',
      description: '默认显示的结束日期时间值，格式如2018-08-08 08:08:08',
      sync: true,
      if: (_) => _.range === true,
      settable: true,
    })
    endDate: nasl.core.String | nasl.core.Decimal | nasl.core.Date | nasl.core.DateTime;
    @Prop({
      group: '数据属性',
      title: '最小日期时间值',
      description: '最小可选的日期时间值，填写null则不限制，日期填写格式为“yyyy-mm-dd  00:00:00”',
      docDescription: '支持输入的最小日期时间',
    })
    minDate: nasl.core.String | nasl.core.Decimal | nasl.core.Date | nasl.core.DateTime;
    @Prop({
      group: '数据属性',
      title: '最大日期时间值',
      description: '最大可选的日期时间值，填写null则不限制，日期填写格式为“yyyy-mm-dd  00:00:00”',
      docDescription: '支持输入的最大日期时间',
    })
    maxDate: nasl.core.String | nasl.core.Decimal | nasl.core.Date | nasl.core.DateTime;
    @Prop<YunshangUDateTimePickerOptions, 'yearDiff'>({
      group: '数据属性',
      title: '最小年份差值',
      description: '最小可选年份值与当前年份值的差值',
      docDescription: '最小可选年份值为当前年减去此值',
      setter: {
        concept: 'NumberInputSetter',
      },
      if: (_) => _.range !== true,
    })
    yearDiff: nasl.core.Decimal = 20;
    @Prop<YunshangUDateTimePickerOptions, 'yearAdd'>({
      group: '数据属性',
      title: '最大年份差值',
      description: '最大可选年份值与当前年份值的差值',
      docDescription: '最大可选年份值为当前年加上此值',
      setter: {
        concept: 'NumberInputSetter',
      },
      if: (_) => _.range !== true,
    })
    yearAdd: nasl.core.Decimal = 20;
    @Prop<YunshangUDateTimePickerOptions, 'showDateFormatter'>({
      group: '主要属性',
      title: '日期展示格式',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          {
            title: '中国（2023年7月26日）',
          },
          {
            title: 'ISO（2023-07-26）',
          },
          {
            title: 'US（7/26/2023）',
          },
          {
            title: 'EU（26/7/2023）',
          },
        ],
      },
      if: (_) => _.advancedFormatEnable === false,
    })
    showDateFormatter: 'YYYY年M月D日' | 'YYYY-MM-DD' | 'M/D/YYYY' | 'D/M/YYYY' = 'YYYY-MM-DD';
    @Prop<YunshangUDateTimePickerOptions, 'showTimeFormatter'>({
      group: '主要属性',
      title: '时间展示格式',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          {
            title: '12: 09: 09',
            if: (_) => _.minUnit === 'second',
          },
          {
            title: '12时09分09秒',
            if: (_) => _.minUnit === 'second',
          },
          {
            title: '12: 09',
            if: (_) => _.minUnit === 'minute',
          },
          {
            title: '12时09分',
            if: (_) => _.minUnit === 'minute',
          },
        ],
      },
      if: (_) => _.advancedFormatEnable === false,
    })
    showTimeFormatter: 'HH:mm:ss' | 'HH时mm分ss秒' | 'HH:mm' | 'HH时mm分' = 'HH:mm:ss';
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
    @Prop<YunshangUDateTimePickerOptions, 'advancedFormatValue'>({
      group: '主要属性',
      title: '高级格式化内容',
      description: '用来控制日期时间的展示格式',
      bindHide: true,
      if: (_) => _.advancedFormatEnable === true,
    })
    advancedFormatValue: nasl.core.String;
    @Prop({
      group: '主要属性',
      title: '占位符',
      description: '为空时显示的占位符文本',
      docDescription: '未选择状态下的提示文案',
      implicitToString: true,
    })
    placeholder: nasl.core.String = '请选择时间';
    @Prop<YunshangUDateTimePickerOptions, 'placeholderRight'>({
      group: '主要属性',
      title: '右侧占位符',
      description: '为空时显示的占位符文本（右侧）',
      docDescription: '日期选择框无内容时的提示信息，支持自定义编辑, 在没有设置的时候使用placeholder作为右侧占位符内容',
      if: (_) => _.range === true,
      implicitToString: true,
    })
    placeholderRight: nasl.core.String = '请选择时间';
    @Prop({
      group: '主要属性',
      title: '自动获取焦点',
      description: '设置是否自动获取焦点',
      docDescription: '是否自动聚焦',
      designerValue: false,
      setter: {
        concept: 'SwitchSetter',
      },
    })
    autofocus: nasl.core.Boolean = false;
    @Prop({
      group: '主要属性',
      title: '此刻按钮',
      description: '点击可快捷选择当前时间',
      docDescription: '快捷选择当前时间',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    showRightNowButton: nasl.core.Boolean = true;
    @Prop<YunshangUDateTimePickerOptions, 'rightNowTitle'>({
      group: '主要属性',
      title: '此刻按钮名称',
      docDescription: '支持自定义修改原此刻按钮名称。',
      if: (_) => _.showRightNowButton === true,
      implicitToString: true,
    })
    rightNowTitle: nasl.core.String = '';
    @Prop({
      group: '主要属性',
      title: '取消/确定按钮',
      description: '控制弹出层的关闭和设置的生效与否',
      docDescription: '是否显示取消/确定按钮。',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    showFooterButton: nasl.core.Boolean = true;
    @Prop<YunshangUDateTimePickerOptions, 'cancelTitle'>({
      group: '主要属性',
      title: '取消按钮名称',
      description: '取消按钮的显示名称，如果为空则不显示',
      docDescription: '支持自定义修改原取消按钮名称',
      if: (_) => _.showFooterButton === true,
      implicitToString: true,
    })
    cancelTitle: nasl.core.String = '';
    @Prop<YunshangUDateTimePickerOptions, 'okTitle'>({
      group: '主要属性',
      title: '确定按钮名称',
      description: '确定按钮的显示名称，如果为空则不显示',
      docDescription: '支持自定义修改原确定按钮名称',
      if: (_) => _.showFooterButton === true,
      implicitToString: true,
    })
    okTitle: nasl.core.String = '';
    @Prop({
      group: '主要属性',
      title: '转换器',
      docDescription: '- SON、Unix 时间戳、 Date 对象、 YYYY-MM-DD HH:mm:ss',
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
            title: 'YYYY-MM-DD HH: mm: ss',
          },
        ],
      },
    })
    converter: 'json' | 'timestamp' | 'date' | 'format' = 'json';
    @Prop({
      group: '主要属性',
      title: '前缀图标',
      docDescription: '选择并展示前缀图标',
      setter: {
        concept: 'IconSetter',
      },
    })
    preIcon: nasl.core.String = 'calendar';
    @Prop({
      group: '主要属性',
      title: '后缀图标',
      docDescription: '选择并展示后缀图标',
      setter: {
        concept: 'IconSetter',
      },
    })
    suffixIcon: nasl.core.String = '';
    @Prop({
      group: '主要属性',
      title: '弹出层位置依据',
      description: `设置弹出层依据哪个元素定位位置，可选值：'body'表示添加到 document.body，'reference'表示添加到参考元素中。`,
      docDescription: '设置添加到哪个元素，引用元素下、全局body',
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
      docDescription: '是否展示清除按钮',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    clearable: nasl.core.Boolean;
    @Prop<YunshangUDateTimePickerOptions, 'clearIcon'>({
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
      title: '弹出状态',
      description: '弹出状态分为“True(弹出)/False(关闭)”，默认为“关闭”',
      setter: {
        concept: 'SwitchSetter',
      },
      settable: true,
    })
    opened: nasl.core.Boolean = false;
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
      group: '样式属性',
      title: '宽度',
      description: '设置日期时间选择输入框宽度大小',
      docDescription: '支持占满、巨大、大、中型、正常、小、迷你。',
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
      description: '设置日期时间选择输入框高度大小',
      docDescription: '支持占满、巨大、大、中型、正常、小、迷你。',
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
      title: '值选择时',
      description: '日期值发生变化触发',
    })
    onSelect: (event: { date: nasl.core.String; time: nasl.core.String }) => any;
    @Event({
      title: '值变化时',
      description: '选择新时间触发',
    })
    onChange: (event: { date: nasl.core.String; time: nasl.core.String }) => any;
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
