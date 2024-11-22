/// <reference types="@nasl/types" />
namespace extensions.cw_json.viewComponents {
  const { Component, Prop, ViewComponent, Slot, Method, Event, ViewComponentOptions } = nasl.ui;

  @ExtensionComponent({
    type: 'both',
    ideusage: {
      idetype: 'element',
    }
  })
  @Component({
    title: 'json展示器',
    description: 'json展示器',
  })
  export class CwJsonPretty extends ViewComponent {
    constructor(options?: Partial<CwJsonPrettyOptions>) {
      super();
    }
  }

  export class CwJsonPrettyOptions extends ViewComponentOptions {
    @Prop({
      title: 'json',
      description: 'json',
      sync: true,
      settable: true,
      setter: {
        concept: 'InputSetter'
      }
    })
    jsonData: nasl.core.String = '';

    @Prop({
      title: '是否显示行号',
      description: '是否显示行号',
      setter: {
        concept: 'InputSetter'
      }
    })
    showLines: nasl.core.Boolean = false;

    @Prop({
      title: '是否显示行号',
      description: '是否显示行号',
      setter: {
        concept: 'SwitchSetter'
      }
    })
    showTypes: nasl.core.Boolean = false;

    @Prop({
      title: '控制显示的JSON深度',
      description: '控制显示的JSON深度',
      setter: {
        concept: 'NumberInputSetter'
      }
    })
    deep: nasl.core.Integer = Infinity;

    @Prop({
      title: '是否允许JSON展开/折叠',
      description: '是否允许JSON展开/折叠',
      setter: {
        concept: 'SwitchSetter'
      }
    })
    expandable: nasl.core.Boolean = false;
    
    @Prop({
      title: '控制缩进的空格数',
      description: '控制缩进的空格数',
      setter: {
        concept: 'NumberInputSetter'
      }
    })
    indentSpacing: nasl.core.Integer = 2;

    @Prop({
      title: '选择主题',
      description: '选择主题',
      setter: {
        concept: "EnumSelectSetter",
        options: [{
          title: '光明'
        }, {
          title: '黑暗'
        }]
      }
    })
    theme: 'light' | 'dark' = 'light';
  }
}