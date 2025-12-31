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
    title: '流程表单',
    description: '流程表单',
    icon: 'form',
    group: '流程',
  })
  export class OwProcessForm extends ViewComponent {
    constructor(options?: Partial<OwProcessFormOptions>) {
      super();
    }
  }

  export class OwProcessFormOptions extends ViewComponentOptions {
    @Slot({
      title: '默认',
      description: '插入默认内容',
    })
    slotDefault: () => Array<ViewComponent>;
  }
}
