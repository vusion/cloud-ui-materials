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
    title: '流程按钮',
    description: '流程按钮',
    icon: 'processbutton',
    group: '流程',
  })
  export class FlProcessButton extends ViewComponent {
    constructor(options?: Partial<FlProcessButtonOptions>) {
      super();
    }
  }

  export class FlProcessButtonOptions extends ViewComponentOptions {
    @Slot({
      title: '默认',
      description: '插入默认内容',
    })
    slotDefault: () => Array<ViewComponent>;
  }
}