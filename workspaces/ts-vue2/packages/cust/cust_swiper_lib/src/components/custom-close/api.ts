/// <reference types="@nasl/types" />
namespace extensions.cust_swiper_lib.viewComponents {
  const { Component, Prop, ViewComponent, Slot, Method, Event, ViewComponentOptions } = nasl.ui;

  @ExtensionComponent({
    type: 'h5',
    ideusage: {
      idetype: 'element',
    }
  })
  @Component({
    title: '关闭图标',
    description: '关闭图标',
  })
  export class CustomClose extends ViewComponent {
    constructor(options?: Partial<CustomCloseOptions>) {
      super();
    }
  }

  export class CustomCloseOptions extends ViewComponentOptions {
     @Prop({
      title: '状态',
      description: '显示状态',
      setter: {
        concept: 'InputSetter'
      }
    })
    status: nasl.core.Boolean = false;
    @Event({
      title: '点击事件',
      description: '点击按钮后',
    })
    onClick: (event: { index: nasl.core.Integer }) => void;
  }
}