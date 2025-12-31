/// <reference types="@nasl/types" />
namespace extensions.cw_pump_house_model_library.viewComponents {
  const { Component, Prop, ViewComponent, Slot, Method, Event, ViewComponentOptions } = nasl.ui;

  @ExtensionComponent({
    type: 'both',
    ideusage: {
      idetype: 'element',
    }
  })
  @Component({
    title: '泵房',
    description: '泵房',
  })
  export class PumpHouse extends ViewComponent {
    constructor(options?: Partial<PumpHouseOptions>) {
      super();
    }
  }

  export class PumpHouseOptions extends ViewComponentOptions {
    //  @Prop({
    //   title: '内容',
    //   description: '显示文本',
    //   setter: {
    //     concept: 'InputSetter'
    //   }
    // })
    // text: nasl.core.String = '';
  }
}