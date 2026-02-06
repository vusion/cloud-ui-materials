/// <reference types="@nasl/types" />
namespace extensions.huagong_print_lib.viewComponents {
  const { Component, ViewComponent, Slot, ViewComponentOptions } = nasl.ui;

  @ExtensionComponent({
    type: 'both',
    ideusage: {
      idetype: 'container',
    },
  })
  @Component({
    title: '打印原子行',
    description: '包裹一段内容，打印时该段内容不会被截断；若高度超过一页 A4，将整块分到下一页或按页分多页展示。',
  })
  export class HgPrintItem extends ViewComponent {
    constructor(options?: Partial<HgPrintItemOptions>) {
      super();
    }
  }

  export class HgPrintItemOptions extends ViewComponentOptions {
    @Slot({
      title: '默认',
      description: '不可被截断的打印内容。',
    })
    slotDefault: () => Array<nasl.ui.ViewComponent>;
  }
}
