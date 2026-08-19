/// <reference types="@nasl/types" />
/// <reference types="../../../.lcap/lcap-ui/runtime/nasl.ui.d.ts" />
namespace extensions.cw_eu_extend_cu_library.viewComponents {
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
    // replaceNaslUIComponent: "USwitch",
    type: "pc",
    show: true,
    ideusage: {
      "idetype": "element"
    }
  })
  @Component({
    title: '开关',
    icon: 'switch',
    description: '开关',
    // group: 'Form'
  })
  export class USwitch extends ViewComponent {
    @Prop({
      title: '值'
    })
    value: nasl.core.Boolean;
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
    constructor(options?: Partial<USwitchOptions>) {
      super();
    }
  }
  export class USwitchOptions extends ViewComponentOptions {
    @Prop({
      group: '数据属性',
      title: '值',
      description: '标识开关状态的值',
      sync: true,
      docDescription: '开关状态，返还true或者false。',
      setter: {
        concept: 'SwitchSetter'
      },
      settable: true
    })
    value: nasl.core.Boolean = false;
    @Prop({
      group: '主要属性',
      title: '显示开关文字',
      description: '是否显示开关`ON`和`OFF`文字',
      docDescription: '设置开关是否显示开关`ON`和`OFF`文字。',
      setter: {
        concept: 'SwitchSetter'
      }
    })
    withText: nasl.core.Boolean = false;
    @Prop<USwitchOptions, 'checkedChildren'>({
      group: '主要属性',
      title: '选中时的内容',
      docDescription: '选中时的内容',
      if: _ => _.withText === true
    })
    checkedChildren: nasl.core.String = "ON";
    @Prop<USwitchOptions, 'unCheckedChildren'>({
      group: '主要属性',
      title: '非选中时的内容	',
      docDescription: '非选中时的内容	',
      if: _ => _.withText === true
    })
    unCheckedChildren: nasl.core.String = "OFF";
    @Prop({
      group: '状态属性',
      title: '只读',
      description: '正常显示，但禁止选择/输入',
      docDescription: '正常显示，但禁止选择或输入。',
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
    @Event({
      title: '切换状态前',
      description: '切换开关状态前触发'
    })
    onBeforeToggle: (event: {
      value: nasl.core.Boolean;
      oldValue: nasl.core.Boolean;
    }) => any;
    @Event({
      title: '输入时',
      description: '切换开关状态时触发'
    })
    onInput: (event: nasl.core.Boolean) => any;
    @Event({
      title: '打开时',
      description: '开关打开时触发'
    })
    onOn: (event: any) => any;
    @Event({
      title: '关闭时',
      description: '开关关闭时触发'
    })
    onOff: (event: any) => any;
    @Event({
      title: '切换状态后',
      description: '切换开关状态时触发'
    })
    onToggle: (event: {
      value: nasl.core.Boolean;
      oldValue: nasl.core.Boolean;
    }) => any;
    @Event({
      title: '改变后',
      description: '开关状态改变时触发'
    })
    onChange: (event: {
      value: nasl.core.Boolean;
      oldValue: nasl.core.Boolean;
    }) => any;
  }
}