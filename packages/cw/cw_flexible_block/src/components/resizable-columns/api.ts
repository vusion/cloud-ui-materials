/// <reference types="@nasl/types" />
namespace extensions.cw_flexible_block.viewComponents {
  const { Component, Prop, ViewComponent, Slot, Method, Event, ViewComponentOptions } = nasl.ui;

  @ExtensionComponent({
    type: 'both',
    ideusage: {
      idetype: 'container',
      structured: true
    }
  })
  @Component({
    title: '伸缩布局',
    description: '伸缩布局',
  })
  export class ResizableColumns extends ViewComponent {
    constructor(options?: Partial<ResizableColumnsOptions>) {
      super();
    }
  }

  export class ResizableColumnsOptions extends ViewComponentOptions {
    @Prop({
      title: '默认左侧宽度',
      description: '默认左侧宽度'
    })
    leftWidth: nasl.core.Integer = 200;
    @Slot({
      title: '默认左侧容器',
      description: '左侧容器'
    })
    slotLeft: () => Array<nasl.ui.ViewComponent>;

    @Slot({
      title: '默认右侧容器',
      description: '右侧容器'
    })
    slotRight: () => Array<nasl.ui.ViewComponent>;
  }
}