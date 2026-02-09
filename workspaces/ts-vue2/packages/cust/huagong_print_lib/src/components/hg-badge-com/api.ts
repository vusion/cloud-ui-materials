/// <reference types="@nasl/types" />
namespace extensions.huagong_print_lib.viewComponents {
  const { Component, Prop, ViewComponent, Slot, Method, Param, Event, ViewComponentOptions } = nasl.ui;

  @ExtensionComponent({
    type: 'both',
    ideusage: {
      idetype: 'container',
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
      title: '默认在页面底部',
      description: '为 true 时徽章固定显示在每页底部居中；为 false 时使用下方 X、Y 指定位置。',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    atBottom: nasl.core.Boolean = true;

    @Prop({
      title: '是否占位模式',
      description: '为 true 时徽章占用页面底部区域，影响 打印内容区域 分页；为 false 时为覆盖模式，不参与分页。',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    inline: nasl.core.Boolean = true;

    @Prop({
      title: 'X 偏移',
      description: '徽章在水平方向上的偏移量（pt），相对于内容区左上角。仅当「默认在页面底部」为 false 时生效。',
      setter: {
        concept: 'NumberInputSetter',
      },
    })
    x: nasl.core.Integer = 0;

    @Prop({
      title: 'Y 偏移',
      description: '徽章在垂直方向上的偏移量（pt），相对于内容区左上角。仅当「默认在页面底部」为 false 时生效。',
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
