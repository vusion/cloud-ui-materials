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
      "idetype": "element",
      "useFxOrEg": {
        "property": "value",
        "displayAsAttr": true
      },
      "additionalAttribute": {
        ":value": null,
        "autofocus": "\"false\""
      },
      "forceUpdateWhenAttributeChange": true,
      "translateBindingProperty": ["value", "placeholder"]
    }
  })
  @Component({
    title: '数字输入',
    icon: 'number',
    description: '输入数字时使用',
    group: 'Form'
  })
  export class ExUNumberInput extends ViewComponent {
    @Prop({
      title: '值'
    })
    value: ExUNumberInputOptions['value'];
    @Prop({
      title: '格式化后的值'
    })
    formattedValue: nasl.core.String;
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
    constructor(options?: Partial<ExUNumberInputOptions>) {
      super();
    }
  }
  export class ExUNumberInputOptions extends ViewComponentOptions {
    @Prop({
      title: '格式化',
      description: '格式化字符串，具体参见示例。也可以传入一个包含`get`和`set`方法的格式化对象。'
    })
    private formatter: nasl.core.String;
    @Prop({
      group: '数据属性',
      title: '值',
      description: '输入的值',
      sync: true,
      docDescription: '输入框的值。',
      setter: {
        concept: 'NumberInputSetter'
      },
      settable: true
    })
    value: nasl.core.Decimal | nasl.core.Integer;
    @Prop({
      group: '数据属性',
      title: '最小值',
      description: '最小可输入的值',
      docDescription: '限制输入数值的最小值。',
      setter: {
        concept: 'NumberInputSetter'
      }
    })
    min: nasl.core.Decimal | nasl.core.Integer;
    @Prop({
      group: '数据属性',
      title: '最大值',
      description: '最大可输入的值',
      docDescription: '限制输入数值的最大值。',
      setter: {
        concept: 'NumberInputSetter'
      }
    })
    max: nasl.core.Decimal | nasl.core.Integer;
    @Prop({
      group: '数据属性',
      title: '精度',
      description: '限制数字输入要保留的最小精度单位，默认不限制精度，如需保留两位小数，则填入0.01',
      docDescription: '限制数字要保留的最小单位，整数、小数均可，如需要保留两位小数，则填入0.01。',
      setter: {
        concept: 'NumberInputSetter'
      }
    })
    private precision: nasl.core.Decimal | nasl.core.Integer = 1;
    @Prop({
      group: '数据属性',
      title: '精度',
      description: '控制数据存储时小数点后保留几位。例如：精度为2，则数据存储时小数点后保留2位。',
      docDescription: '限制值要保留的小数位数。默认0，不保留小数位',
      setter: {
        concept: 'NumberInputSetter'
      }
    })
    decimalLength: nasl.core.Decimal | nasl.core.Integer;
    @Prop<ExUNumberInputOptions, 'decimalPlacesValue'>({
      group: '主要属性',
      title: '小数位数',
      description: '控制数据展示时小数点后保留几位，仅影响展示，不影响数据实际存储的值。例如：小数位数为2，则数据展示时小数点后保留2位。',
      if: _ => _.advancedFormatEnable === false,
      setter: {
        concept: 'NumberInputSetter',
        precision: 0
      },
      bindHide: true
    })
    decimalPlacesValue: nasl.core.Integer;
    @Prop<ExUNumberInputOptions, 'decimalPlacesOmitZero'>({
      group: '主要属性',
      title: '隐藏末尾0',
      description: '控制数据展示时最后一个是否展示0，仅影响展示，不影响数据实际存储的值。',
      if: _ => _.advancedFormatEnable === false,
      setter: {
        concept: 'SwitchSetter'
      }
    })
    decimalPlacesOmitZero: nasl.core.Boolean = true;
    @Prop<ExUNumberInputOptions, 'thousandths'>({
      group: '主要属性',
      title: '千位符',
      setter: {
        concept: 'SwitchSetter'
      },
      if: _ => _.advancedFormatEnable === false
    })
    thousandths: nasl.core.Boolean = false;
    @Prop<ExUNumberInputOptions, 'percentSign'>({
      group: '主要属性',
      title: '百分号',
      setter: {
        concept: 'SwitchSetter'
      },
      if: _ => _.advancedFormatEnable === false
    })
    percentSign: nasl.core.Boolean = false;
    @Prop({
      group: '主要属性',
      title: '单位显示位置',
      description: '输入框中显示的单位',
      bindHide: true,
      setter: {
        concept: 'EnumSelectSetter',
        options: [{
          title: '前缀'
        }, {
          title: '后缀'
        }]
      }
    })
    unitType: 'prefix' | 'suffix' = 'prefix';
    @Prop({
      group: '主要属性',
      title: '单位',
      description: '输入框中显示的单位',
      implicitToString: true
    })
    unitValue: nasl.core.String;
    @Prop<ExUNumberInputOptions, 'advancedFormatEnable'>({
      group: '主要属性',
      title: '高级格式化',
      description: '用来控制数字的展示格式',
      onChange: [{
        clear: ['advancedFormatValue']
      }],
      setter: {
        concept: 'SwitchSetter'
      },
      bindHide: true
    })
    advancedFormatEnable: nasl.core.Boolean = false;
    @Prop<ExUNumberInputOptions, 'advancedFormatValue'>({
      group: '主要属性',
      title: '高级格式化内容',
      description: '用来控制数字的展示格式',
      if: _ => _.advancedFormatEnable === true,
      bindHide: true,
      implicitToString: true
    })
    advancedFormatValue: nasl.core.String;
    @Prop({
      group: '主要属性',
      title: '占位符',
      description: '为空时显示的占位符文本',
      docDescription: '为空时的提示文本。',
      implicitToString: true
    })
    placeholder: nasl.core.String;
    @Prop({
      group: '主要属性',
      title: '自动获取焦点',
      description: '设置是否自动获取焦点',
      docDescription: '是否自动获取输入框的焦点。',
      designerValue: false,
      setter: {
        concept: 'SwitchSetter'
      }
    })
    autofocus: nasl.core.Boolean;
    @Prop({
      group: '主要属性',
      title: '隐藏按钮',
      description: '是否隐藏上下点击按钮',
      docDescription: '是否隐藏数值加减按钮',
      setter: {
        concept: 'SwitchSetter'
      }
    })
    hideButtons: nasl.core.Boolean = false;
    @Prop<ExUNumberInputOptions, 'buttonDisplay'>({
      group: '主要属性',
      title: '按钮样式',
      description: '按钮样式',
      docDescription: '按钮样式',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{
          title: '尾部'
        }, {
          title: '两端'
        }]
      },
      if: _ => !_.hideButtons
    })
    buttonDisplay: 'tail' | 'bothEnds' = 'tail';
    @Prop({
      group: '主要属性',
      title: '加号按钮图标',
      description: '加号按钮图标',
      docDescription: '加号按钮图标',
      setter: {
        concept: 'IconSetter'
      },
      if: _ => _.buttonDisplay === 'bothEnds'
    })
    plusIcon: nasl.core.String;
    @Prop({
      group: '主要属性',
      title: '减号按钮图标',
      description: '减号按钮图标',
      docDescription: '减号按钮图标',
      setter: {
        concept: 'IconSetter'
      },
      if: _ => _.buttonDisplay === 'bothEnds'
    })
    minusIcon: nasl.core.String;
    @Prop({
      group: '主要属性',
      title: '上箭头按钮图标',
      description: '上箭头按钮图标',
      docDescription: '上箭头按钮图标',
      setter: {
        concept: 'IconSetter'
      },
      if: _ => _.buttonDisplay === 'tail'
    })
    upIcon: nasl.core.String;
    @Prop({
      group: '主要属性',
      title: '下箭头按钮图标',
      description: '下箭头按钮图标',
      docDescription: '下箭头按钮图标',
      setter: {
        concept: 'IconSetter'
      },
      if: _ => _.buttonDisplay === 'tail'
    })
    downIcon: nasl.core.String;
    @Prop({
      group: '交互属性',
      title: '可清除',
      description: '可点击清除按钮一键清除内容',
      docDescription: '开启并在输入框有内容时会显示清除按钮',
      setter: {
        concept: 'SwitchSetter'
      }
    })
    clearable: nasl.core.Boolean;
    @Prop<ExUNumberInputOptions, 'clearIcon'>({
      group: '交互属性',
      title: '清除图标',
      description: '设置清除图标',
      setter: {
        concept: 'IconSetter'
      },
      if: _ => _.clearable
    })
    clearIcon: nasl.core.String;
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
      docDescription: '置灰显示，且禁止任何交互（焦点、点击、选择、输入等）',
      setter: {
        concept: 'SwitchSetter'
      },
      settable: true
    })
    disabled: nasl.core.Boolean = false;
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
      group: '样式属性',
      title: '间隔',
      description: '间隔，表示点击按钮或按上下键所增加或减少的量',
      docDescription: '限制点击按钮或按上下键所增加或减少的量。',
      setter: {
        concept: 'NumberInputSetter'
      }
    })
    step: nasl.core.Decimal | nasl.core.Integer = 1;
    @Prop({
      group: '样式属性',
      title: '宽度',
      description: '设置数字输入框宽度大小',
      docDescription: '设置数字输入框宽度大小，可选占满、巨大、大、中型、正常、小、迷你。',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{
          title: '占满'
        }, {
          title: '巨大'
        }, {
          title: '大'
        }, {
          title: '中型'
        }, {
          title: '正常'
        }, {
          title: '小'
        }, {
          title: '迷你'
        }]
      }
    })
    width: 'full' | 'huge' | 'large' | 'medium' | 'normal' | 'small' | 'mini' = 'normal';
    @Prop({
      group: '样式属性',
      title: '高度',
      description: '设置数字输入框高度大小',
      docDescription: '设置数字输入框高度大小，可选占满、巨大、大、中型、正常、小、迷你。',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{
          title: '占满'
        }, {
          title: '巨大'
        }, {
          title: '大'
        }, {
          title: '中型'
        }, {
          title: '正常'
        }, {
          title: '小'
        }, {
          title: '迷你'
        }]
      }
    })
    height: 'full' | 'huge' | 'large' | 'medium' | 'normal' | 'small' | 'mini' = 'normal';
    @Event({
      title: '输入时',
      description: '输入时触发'
    })
    onInput: (event: nasl.core.String) => any;
    @Event({
      title: '验证时',
      description: '输入验证时触发'
    })
    onValidate: (event: {
      trigger: nasl.core.String;
      valid: nasl.core.Boolean;
      triggerValid: nasl.core.Boolean;
      touched: nasl.core.Boolean;
      dirty: nasl.core.Boolean;
      firstError: nasl.core.String;
      value: nasl.core.String;
      oldValue: nasl.core.String;
    }) => any;
    @Event({
      title: '改变后',
      description: '值变化时触发（与原生事件不同）'
    })
    onChange: (event: {
      value: nasl.core.Decimal | nasl.core.Integer;
      oldValue: nasl.core.Decimal | nasl.core.Integer;
      formattedValue: nasl.core.String;
      valid: nasl.core.Boolean;
    }) => any;
    @Event({
      title: '聚焦后',
      description: '获得焦点时触发'
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
      title: '失焦后',
      description: '失去焦点时触发'
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
      title: '键盘按下',
      description: '键盘按键按下时触发'
    })
    onKeydown: (event: KeyboardEvent) => any;
    @Event({
      title: '键盘松开',
      description: '键盘按键松开时触发'
    })
    onKeyup: (event: KeyboardEvent) => any;

    // @Slot({
    //     title: '默认',
    //     description: '插入 HTML 或 `Component`, 可展示额外内容。',
    // })
    // slotDefault: () => Array<ViewComponent>;
  }
}