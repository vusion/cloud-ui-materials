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
    title: '轮播图',
    description: '轮播图',
  })
  export class CustSwiperView extends ViewComponent {
    constructor(options?: Partial<CustSwiperViewOptions>) {
      super();
    }
  }

  export class CustSwiperViewOptions extends ViewComponentOptions {
     @Prop({
      title: '内容',
      description: '数据源',
      setter: {
        concept: 'InputSetter'
      }
    })
    list: nasl.collection.List<any> = [];
  }
}