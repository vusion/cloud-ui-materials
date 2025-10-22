/// <reference types="@nasl/types" />
namespace extensions.lcap_process_components_vue_pc.viewComponents {
  const { Component, Prop, ViewComponent, Slot, Method, Event, ViewComponentOptions } = nasl.ui;
  type ViewComponent = nasl.ui.ViewComponent;
  
  @ExtensionComponent({
    type: 'pc',
    ideusage: {
      idetype: 'container',
    }
  })
  @Component({
    title: '我的流程',
    description: '我的流程',
    icon: 'processmyprocess',
    group: '流程',
  })
  export class FlProcessMyProcess extends ViewComponent {
    constructor(options?: Partial<FlProcessMyProcessOptions>) {
      super();
    }
  }

  export class FlProcessMyProcessOptions extends ViewComponentOptions {
    @Slot({
      title: '默认',
      description: '插入默认内容',
    })
    slotDefault: () => Array<ViewComponent>;
  }
}