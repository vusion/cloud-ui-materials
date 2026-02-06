/// <reference types="@nasl/types" />
namespace extensions.huagong_print_lib.viewComponents {
  const { Component, Prop, ViewComponent, Slot, Method, Param, Event, ViewComponentOptions } = nasl.ui;

  @ExtensionComponent({
    type: 'both',
    ideusage: {
      idetype: 'element',
    }
  })
  @Component({
    title: '徽章组件',
    description: '徽章组件',
  })
  export class HgBadgeCom extends ViewComponent {
    constructor(options?: Partial<HgBadgeComOptions>) {
      super();
    }
  }

  export class HgBadgeComOptions extends ViewComponentOptions {
    @Prop({
      title: 'X 偏移',
      description: '徽章在水平方向上的偏移量（px），相对于父容器左上角。',
      setter: {
        concept: 'NumberInputSetter',
      },
    })
    x: nasl.core.Integer = 0;

    @Prop({
      title: 'Y 偏移',
      description: '徽章在垂直方向上的偏移量（px），相对于父容器左上角。',
      setter: {
        concept: 'NumberInputSetter',
      },
    })
    y: nasl.core.Integer = 0;

    @Slot({
      title: '默认',
      description: '徽章内部显示的内容，例如数字、文本等。',
    })
    slotDefault: () => Array<nasl.ui.ViewComponent>;
  }
}
