/// <reference types="@nasl/types" />
namespace extensions.cw_html_print.viewComponents {
  const { Component, Prop, ViewComponent, Slot, Method, Event, ViewComponentOptions } = nasl.ui;

  @ExtensionComponent({
    type: 'both',
    ideusage: {
      idetype: 'element',
    }
  })
  @Component({
    title: 'demo',
    description: 'demo',
  })
  export class Demo extends ViewComponent {
    constructor(options?: Partial<DemoOptions>) {
      super();
    }
  }

  export class DemoOptions extends ViewComponentOptions {
     @Prop({
      title: '内容',
      description: '显示文本',
      setter: {
        concept: 'InputSetter'
      }
    })
    text: nasl.core.String = '';
  }
}