/// <reference types="@nasl/types" />
namespace extensions.lcap_process_components_vue_pc.viewComponents {
  const { Component, Prop, ViewComponent, Slot, Method, Event, ViewComponentOptions } = nasl.ui;
  type ViewComponent = nasl.ui.ViewComponent;

  @ExtensionComponent({
    type: 'pc',
    ideusage: {
      idetype: 'container',
    },
  })
  @Component({
    title: '任务箱',
    description: '任务箱',
    icon: 'taskbox',
    group: '流程',
  })
  export class FlProcessTaskBox extends ViewComponent {
    constructor(options?: Partial<FlProcessTaskBoxOptions>) {
      super();
    }
  }

  export class FlProcessTaskBoxOptions extends ViewComponentOptions {
    @Slot({
      title: '默认',
      description: '插入默认内容',
    })
    slotDefault: () => Array<ViewComponent>;
  }
}