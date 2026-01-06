/// <reference types="@nasl/types" />
namespace extensions.cw_cut_printview.viewComponents {
  const { Component, Prop, ViewComponent, Slot, Method, Param, Event, ViewComponentOptions } = nasl.ui;

  @ExtensionComponent({
    type: 'pc',
    ideusage: {
      idetype: 'container',
    }
  })
  @Component({
    title: '分页组件表头组件',
    description: '分页组件表头组件',
  })
  export class CutPrintHeader extends ViewComponent {
    constructor(options?: Partial<CutPrintHeaderOptions>) {
      super();
    }
  }

  export class CutPrintHeaderOptions extends ViewComponentOptions {
    @Slot({
      title: '默认',
      description: '插入默认内容',
    })
    slotDefault: () => Array<nasl.ui.ViewComponent>;
  }
}
