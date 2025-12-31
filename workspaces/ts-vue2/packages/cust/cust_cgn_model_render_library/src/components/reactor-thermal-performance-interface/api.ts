/// <reference types="@nasl/types" />
namespace extensions.cust_cgn_model_render_library.viewComponents {
  const { Component, Prop, ViewComponent, Slot, Method, Param, Event, ViewComponentOptions } = nasl.ui;

  @ExtensionComponent({
    type: 'pc',
    ideusage: {
      idetype: 'element',
    },
  })
  @Component({
    title: '反应堆热力性能主控界面',
    description: '反应堆热力性能主控界面',
  })
  export class ReactorThermalPerformanceInterface extends ViewComponent {
    constructor(options?: Partial<ReactorThermalPerformanceInterfaceOptions>) {
      super();
    }
  }

  export class ReactorThermalPerformanceInterfaceOptions extends ViewComponentOptions {
    @Prop({
      title: '经济数据',
      description: '经济数据',
      setter: {
        concept: 'InputSetter',
      },
    })
    economicData: nasl.collection.List<nasl.core.Decimal | nasl.core.Integer> = [];
  }
}
