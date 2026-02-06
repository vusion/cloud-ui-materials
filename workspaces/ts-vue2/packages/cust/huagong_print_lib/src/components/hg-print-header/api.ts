/// <reference types="@nasl/types" />
namespace extensions.huagong_print_lib.viewComponents {
  const { Component, Prop, ViewComponent, Slot, Method, Param, Event, ViewComponentOptions } = nasl.ui;

  @ExtensionComponent({
    type: 'both',
    ideusage: {
      idetype: 'container',
      structured: true, // 设计器显示“+”按钮，允许向默认插槽插入子元素
    },
  })
  @Component({
    title: '化工打印表头',
    description: '化工打印表头',
  })
  export class HgPrintHeader extends ViewComponent {
    constructor(options?: Partial<HgPrintHeaderOptions>) {
      super();
    }
  }

  export class HgPrintHeaderOptions extends ViewComponentOptions {
    @Slot({
      title: '默认',
      description: '表头内容，打印时每页顶部重复显示。可在此插槽内插入文本、布局等子元素。'
    })
    slotDefault: () => Array<nasl.ui.ViewComponent>;
  }
}
