/// <reference types="@nasl/types" />
namespace extensions.cw_cut_printview.viewComponents {
  const { Component, Prop, ViewComponent, Slot, Method, Param, Event, ViewComponentOptions } = nasl.ui;

  @ExtensionComponent({
    type: 'both',
    ideusage: {
      idetype: 'element',
    }
  })
  @Component({
    title: '分页组件',
    description: '分页组件',
  })
  export class PaginationPrintItem extends ViewComponent {
    constructor(options?: Partial<PaginationPrintItemOptions>) {
      super();
    }
  }

  export class PaginationPrintItemOptions extends ViewComponentOptions {
    @Prop({
      title: '是否横向打印',
      description: '是否横向打印',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    isHorizontal: nasl.core.Boolean = false;
  }
}
