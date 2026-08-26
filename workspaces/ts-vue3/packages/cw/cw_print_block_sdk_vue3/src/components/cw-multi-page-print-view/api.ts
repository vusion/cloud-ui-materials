/// <reference types="@nasl/types" />
namespace extensions.cw_print_block_sdk_vue3.viewComponents {
  const { Component, Prop, ViewComponent, Slot, Method, ViewComponentOptions } = nasl.ui;
  type ViewComponentType = nasl.ui.ViewComponent;

  @ExtensionComponent({
    type: 'pc',
    ideusage: {
      idetype: 'container',
    },
  })
  @Component({
    title: '多页打印组件',
    description: '多页打印组件',
  })
  export class CwMultiPagePrintView extends ViewComponent {
    @Method({
      title: '打印',
      description: '打印',
    })
    print(): void {}

    constructor(options?: Partial<CwMultiPagePrintViewOptions>) {
      super();
    }
  }

  export class CwMultiPagePrintViewOptions extends ViewComponentOptions {
    @Prop({
      title: '是否展示打印区域',
      description: '是否显示打印区域',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    isShowPrint: nasl.core.Boolean = false;

    @Prop({
      title: '页间重叠高度(px)',
      description: '0-50，0 表示不切片直接长图打印；>0 时按该值分页并在相邻页顶部重复显示。',
      setter: {
        concept: 'NumberInputSetter',
      },
    })
    overlapHeight: nasl.core.Integer = 0;

    @Slot({
      title: '默认插槽',
      description: '默认插槽',
    })
    slotDefault: () => Array<ViewComponentType>;
  }
}
