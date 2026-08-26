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
    title: '打印组件',
    description: '打印组件',
  })
  export class CwPrintView extends ViewComponent {
    @Method({
      title: '打印',
      description: '打印',
    })
    print(): void {}

    constructor(options?: Partial<CwPrintViewOptions>) {
      super();
    }
  }

  export class CwPrintViewOptions extends ViewComponentOptions {
    @Prop({
      title: '是否展示打印区域',
      description: '是否显示打印区域',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    isShowPrint: nasl.core.Boolean = false;

    @Slot({
      title: '默认插槽',
      description: '默认插槽',
    })
    slotDefault: () => Array<ViewComponentType>;
  }
}
