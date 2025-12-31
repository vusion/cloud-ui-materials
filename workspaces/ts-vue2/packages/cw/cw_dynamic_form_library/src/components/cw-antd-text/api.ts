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
    title: '文本',
    description: '文本',
  })
  export class CwAntdText extends ViewComponent {
    constructor(options?: Partial<CwAntdTextOptions>) {
      super();
    }
  }

  export class CwAntdTextOptions extends ViewComponentOptions {
    @Prop({
      title: '值',
      description: '需要传入的值',
      setter: {
        concept: 'InputSetter'
      }
    })
    value: nasl.core.String = 'fdafd';

    @Prop({
      title: '样式',
      description: '自定义样式',
      setter: {
        concept: 'InputSetter'
      }
    })
    cwStyle: nasl.core.String = '';
  }
}