/// <reference types="@nasl/types" />
namespace extensions.cw_cut_printview.viewComponents {
  const { Component, Prop, ViewComponent, Slot, Method, Param, Event, ViewComponentOptions } = nasl.ui;

  @ExtensionComponent({
    type: 'both',
    ideusage: {
      idetype: 'container',
      
    }
  })
  @Component({
    title: '分页打印容器',
    description: '分页打印容器',
  })
  export class PaginationPrintBlock extends ViewComponent {
    @Method({
      title: '打印',
      description: '打印',
    })
    print(): void {}
    constructor(options?: Partial<PaginationPrintBlockOptions>) {
      super();
    }
  }

  export class PaginationPrintBlockOptions extends ViewComponentOptions {
    // @Prop({
    //   title: '打印尺寸',
    //   description: '打印尺寸',
    //   setter: {
    //     concept: 'EnumSelectSetter',
    //     options: [{ title: 'A4' }, { title: 'A3' }, { title: 'A5' }, { title: 'B3' }, { title: 'B4' }, { title: 'B5' }],
    //   },
    // })
    // paperSize: 'a4' | 'a3' | 'a5' | 'b3' | 'b4' | 'b5' = 'a4';

    // @Prop({
    //   title: '纸张宽度',
    //   description: '纸张宽度',
    //   setter: {
    //     concept: 'InputSetter',
    //   },
    // })
    // pageWidth: nasl.core.Integer = 210;

    // @Prop({
    //   title: '是否按比例缩放打印',
    //   description: '是否按比例缩放打印',
    //   setter: {
    //     concept: 'SwitchSetter',
    //   },
    // })
    // isRate: boolean = false;

    @Prop({
      title: '垂直页边距',
      description: '垂直页边距',
      setter: {
        concept: 'InputSetter',
      },
    })
    yBorder: nasl.core.Integer = 10;

    @Prop({
      title: '水平页边距',
      description: '水平页边距',
      setter: {
        concept: 'InputSetter',
      },
    })
    xBorder: nasl.core.Integer = 10;

    @Prop({
      title: '是否隐藏打印内容',
      description: '是否隐藏打印内容',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    hideOnScreen: boolean = false;

    @Prop({
      title: '默认打印方向',
      description: '默认打印方向',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '纵向' }, { title: '横向' }],
      },
    })
    printDirection: 'vertical' | 'horizontal' = 'vertical';

    @Slot({
      title: '打印内容',
      description: '打印内容'
    })
    slotDefault: () => Array<nasl.ui.ViewComponent>;
  }
}

