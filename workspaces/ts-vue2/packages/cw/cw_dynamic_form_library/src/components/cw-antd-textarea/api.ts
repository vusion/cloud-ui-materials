/// <reference types="@nasl/types" />
namespace extensions.cw_dynamic_form_library.viewComponents {
  const { Component, Prop, ViewComponent, Slot, Method, Param, Event, ViewComponentOptions } = nasl.ui;
  type ViewComponent = nasl.ui.ViewComponent;

  @ExtensionComponent({
    type: 'both',
    ideusage: {
      idetype: 'element',
    }
  })
  @Component({
    title: '多行输入',
    description: '多行输入',
  })
  export class CwAntdTextarea extends ViewComponent {
    constructor(options?: Partial<CwAntdTextareaOptions>) {
      super();
    }
  }

  export class CwAntdTextareaOptions extends ViewComponentOptions {
    @Prop({
      title: '值',
      description: '需要传入的值',
      setter: {
        concept: 'InputSetter'
      }
    })
    value: nasl.core.String = '请在这里编写代码';
  }
}
