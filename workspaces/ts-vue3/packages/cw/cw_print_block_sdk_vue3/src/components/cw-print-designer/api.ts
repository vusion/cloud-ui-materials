/// <reference types="@nasl/types" />
namespace extensions.cw_print_block_sdk_vue3.viewComponents {
  const { Component, Prop, ViewComponent, Slot, Method, Param, ViewComponentOptions } = nasl.ui;
  type ViewComponentType = nasl.ui.ViewComponent;

  @ExtensionComponent({
    type: 'both',
    ideusage: {
      idetype: 'container',
    },
  })
  @Component({
    title: '分页打印组件',
    description: '分页打印组件',
  })
  export class CwPrintDesigner extends ViewComponent {
    @Method({
      title: '打印',
      description: '打印',
    })
    print(
      @Param({
        title: '页眉页码',
        description: '页眉页码',
      })
      pagerInHeader?: nasl.core.String,
      @Param({
        title: '页眉页码大小',
        description: '页眉页码大小',
      })
      pagerSizeInHeader?: nasl.core.String,
      @Param({
        title: '页脚页码大小',
        description: '页脚页码大小',
      })
      pagerSizeInFooter?: nasl.core.String,
      @Param({
        title: '页脚页码',
        description: '页脚页码',
      })
      pagerInFooter?: nasl.core.String,
      @Param({
        title: '避免分页的元素名',
        description: '避免分页的元素名',
      })
      itemElement?: nasl.core.String,
    ): void {}

    constructor(options?: Partial<CwPrintDesignerOptions>) {
      super();
    }
  }

  export class CwPrintDesignerOptions extends ViewComponentOptions {
    @Prop({
      title: '是否展示打印区域',
      description: '是否显示打印区域',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    isShowPrint: nasl.core.Boolean = false;

    @Prop({
      title: '打印尺寸',
      description: '请选择打印纸张尺寸',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: 'A3', value: 'a3' },
          { title: 'A4', value: 'a4' },
          { title: 'A5', value: 'a5' },
          { title: 'B3', value: 'b3' },
          { title: 'B4', value: 'b4' },
          { title: 'B5', value: 'b5' },
          { title: '自定义', value: 'custom' },
        ],
      },
    })
    paperSize: 'a3' | 'a4' | 'a5' | 'b3' | 'b4' | 'b5' | 'custom' = 'a4';

    @Prop({
      title: '纸张宽度',
      description: '纸张宽度',
      setter: {
        concept: 'NumberInputSetter',
      },
      if: (_) => _.paperSize === 'custom',
    })
    pageWidth: nasl.core.Integer = 794;

    @Prop({
      title: '纸张高度',
      description: '纸张高度',
      setter: {
        concept: 'NumberInputSetter',
      },
      if: (_) => _.paperSize === 'custom',
    })
    pageHeight: nasl.core.Integer = 794;

    @Prop({
      title: '打印出纸方向',
      description: '请选择打印页面方向',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: '纵向', value: 'v' },
          { title: '横向', value: 'h' },
        ],
      },
    })
    pageDirection: 'v' | 'h' = 'v';

    @Prop({
      title: '是否按比例缩放打印',
      description: '开启等比例缩放，画布宽度跟所内容自动变宽',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    isRate: nasl.core.Boolean = false;

    @Prop({
      title: '是否显示页眉区域',
      description: '是否显示页眉区域',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    showHeader: nasl.core.Boolean = false;

    @Prop({
      title: '是否显示页尾区域',
      description: '设置页脚区域高度，单位mm',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    showFooter: nasl.core.Boolean = false;

    @Prop({
      title: '垂直页边距',
      description: '设置垂直页边距，单位mm',
      setter: {
        concept: 'NumberInputSetter',
      },
    })
    yBorder: nasl.core.Integer = 0;

    @Prop({
      title: '水平页边距',
      description: '设置水平页边距，单位mm',
      setter: {
        concept: 'NumberInputSetter',
      },
    })
    xBorder: nasl.core.Integer = 0;

    @Slot({
      title: '打印内容插槽',
      description: '打印内容插槽',
    })
    slotContent: () => Array<ViewComponentType>;

    @Slot({
      title: '页眉插槽',
      description: '页眉插槽',
    })
    slotHeader: () => Array<ViewComponentType>;

    @Slot({
      title: '页脚插槽',
      description: '页脚插槽',
    })
    slotFooter: () => Array<ViewComponentType>;
  }
}
