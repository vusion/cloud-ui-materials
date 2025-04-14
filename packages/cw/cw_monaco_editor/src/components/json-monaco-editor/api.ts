/// <reference types="@nasl/types" />
namespace extensions.cw_monaco_editor.viewComponents {
  const { Component, Prop, ViewComponent, Slot, Method, Event, ViewComponentOptions } = nasl.ui;

  @ExtensionComponent({
    type: 'pc',
    ideusage: {
      idetype: 'element',
    }
  })
  @Component({
    title: 'json代码编辑器',
    description: 'json代码编辑器',
  })
  export class JsonMonacoEditor extends ViewComponent {
    constructor(options?: Partial<JsonMonacoEditorOptions>) {
      super();
    }
  }

  export class JsonMonacoEditorOptions extends ViewComponentOptions {
     @Prop({
      title: '内容',
      description: '显示文本',
      setter: {
        concept: 'InputSetter'
      }
    })
    value: nasl.core.String = '';

    @Prop({
      title: '最大行数',
      description: '最大行数',
      setter: {
        concept: 'InputSetter'
      }
    })
    attrThreshold: nasl.core.Integer = 0;

    @Prop({
      title: '例子占位符',
      description: '例子占位符',
      setter: {
        concept: 'InputSetter'
      }
    })
    placeholder: nasl.core.String = '';

    @Event({
      title: '输入变化时',
      description: '输入变化时触发',
    })
    onChange: (event: {
      newValue: nasl.core.String,
      oldValue: nasl.core.String,
    }) => any;
  }
}
