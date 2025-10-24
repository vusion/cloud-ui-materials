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
    title: '数字输入框',
    description: '数字输入框',
  })
  export class CwAntdInputNumber extends ViewComponent {
    constructor(options?: Partial<CwAntdInputNumberOptions>) {
      super();
    }
  }

  export class CwAntdInputNumberOptions extends ViewComponentOptions {
    @Prop({
      title: '值',
      description: '需要传入的值',
      setter: {
        concept: 'NumberInputSetter'
      }
    })
    value: nasl.core.String = '0';

    @Event({
      title: '值改变事件',
      description: '值改变事件'
    })
    onChange: (value: nasl.core.String) => void;
  }
}
