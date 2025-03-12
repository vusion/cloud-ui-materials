/// <reference types="@nasl/types" />
namespace extensions.cust_card_translate_lib.viewComponents {
  const { Component, Prop, ViewComponent, Slot, Method, Event, ViewComponentOptions } = nasl.ui;

  @ExtensionComponent({
    type: 'pc',
    ideusage: {
      idetype: 'element',
    }
  })
  @Component({
    title: '特效移动卡片',
    description: '特效移动卡片',
  })
  export class CardTranslateView extends ViewComponent {
    constructor(options?: Partial<CardTranslateViewOptions>) {
      super();
    }
  }

  export class CardTranslateViewOptions extends ViewComponentOptions {
     @Prop({
      title: '内容',
      description: '列表内容',
      setter: {
        concept: 'InputSetter'
      }
    })
    list: nasl.collection.List<any>;
  }
}