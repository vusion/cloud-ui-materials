/// <reference types="@nasl/types" />
namespace extensions.cw_dynamic_form_library.viewComponents {
  const { Component, Prop, ViewComponent, Slot, Method, Param, Event, ViewComponentOptions } = nasl.ui;
  type ViewComponent = nasl.ui.ViewComponent;

  @ExtensionComponent({
    type: 'pc',
    ideusage: {
      idetype: 'element',
    }
  })
  @Component({
    title: '输入框',
    description: '输入框',
  })
  export class CwAntdInput extends ViewComponent {
    constructor(options?: Partial<CwAntdInputOptions>) {
      super();
    }
  }

  export class CwAntdInputOptions extends ViewComponentOptions {
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
