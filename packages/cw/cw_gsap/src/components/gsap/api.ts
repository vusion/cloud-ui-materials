/// <reference types="@nasl/types" />
namespace extensions.cw_gsap.viewComponents {
  const { Component, Prop, ViewComponent, Slot, Method, Event, ViewComponentOptions } = nasl.ui;

  @ExtensionComponent({
    type: 'pc',
    ideusage: {
      idetype: 'element',
    },
  })
  @Component({
    title: '数字调动般',
    description: '数字调动般',
  })
  export class Gsap extends ViewComponent {
    constructor(options?: Partial<GsapOptions>) {
      super();
    }
  }

  export class GsapOptions extends ViewComponentOptions {
    @Prop({
      group: '数据属性',
      title: '跳动目标数字',
      description: '跳动目标数字',
      setter: {
        concept: 'NumberInputSetter',
      },
    })
    end: nasl.core.Decimal;

    @Prop({
      group: '数据属性',
      title: '延迟时间（秒）',
      description: '跳动到指定数字延迟时间',
      setter: {
        concept: 'NumberInputSetter',
      },
    })
    duration: nasl.core.Decimal;
  }
}
