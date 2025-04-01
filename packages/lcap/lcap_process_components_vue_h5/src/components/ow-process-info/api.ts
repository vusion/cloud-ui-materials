/// <reference types="@nasl/types" />
namespace extensions.lcap_process_components_vue_h5.viewComponents {
  const { Component, Prop, ViewComponent, Slot, Method, Event, ViewComponentOptions } = nasl.ui;
  type ViewComponent = nasl.ui.ViewComponent;

  @ExtensionComponent({
    type: 'h5',
    ideusage: {
      idetype: 'container',
    },
  })
  @Component({
    title: '流程信息',
    description: '流程信息',
    icon: 'processinfo',
    group: '流程',
  })
  export class OwProcessInfo extends ViewComponent {
    constructor(options?: Partial<OwProcessInfoOptions>) {
      super();
    }
  }

  export class OwProcessInfoOptions extends ViewComponentOptions {
    @Slot({
      title: '默认',
      description: '插入默认内容',
    })
    slotDefault: () => Array<ViewComponent>;
  }
}