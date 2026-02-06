/// <reference types="@nasl/types" />
namespace extensions.huagong_print_lib.viewComponents {
  const { Component, Prop, ViewComponent, Slot, Method, ViewComponentOptions } = nasl.ui;

  @ExtensionComponent({
    type: 'both',
    ideusage: {
      idetype: 'container',
    },
  })
  @Component({
    title: '打印容器',
    description: '打印容器，支持横向/竖向打印，容器内 DOM 与导出 PDF 效果一致；被「打印原子行」包裹的内容不会被截断，超出单页高度时自动分页。',
  })
  export class HgPrintBlock extends ViewComponent {
    @Method({
      title: '打印',
      description: '将容器内容按当前方向与边距导出为 PDF 并调起打印。',
    })
    print(): void { }

    constructor(options?: Partial<HgPrintBlockOptions>) {
      super();
    }
  }

  export class HgPrintBlockOptions extends ViewComponentOptions {
    @Prop({
      title: '打印方向',
      description: '横向或竖向打印，对应 A4 纸张方向。',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '竖向' }, { title: '横向' }],
      },
    })
    printDirection: 'vertical' | 'horizontal' = 'vertical';

    @Prop({
      title: '垂直页边距',
      description: '上下页边距（pt）',
      setter: {
        concept: 'NumberInputSetter',
      },
    })
    yBorder: nasl.core.Integer = 10;

    @Prop({
      title: '水平页边距',
      description: '左右页边距（pt）',
      setter: {
        concept: 'NumberInputSetter',
      },
    })
    xBorder: nasl.core.Integer = 10;

    @Prop({
      title: '是否隐藏打印内容',
      description: '为 true 时页面上不显示打印区域（仅打印时可见）',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    hideOnScreen: nasl.core.Boolean = false;

    @Prop({
      title: '是否调试',
      description: '开启后控制台输出打印过程日志',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    debug: nasl.core.Boolean = false;

    @Slot({
      title: '打印内容',
      description: '在此插槽内放置需要打印的内容；使用「打印表头」包裹的部分会在每一页顶部重复显示；使用「打印原子行」包裹的部分不会被截断，超出单页高度时会整块分页。',
      snippets: [
        {
          title: '打印表头',
          code: '<hg-print-header><u-text text="表头内容，每页顶部重复"></u-text></hg-print-header>',
        },
        {
          title: '打印原子行',
          code: '<hg-print-item><u-text text="此处内容不会被截断，超出单页将整块分页"></u-text></hg-print-item>',
        },
      ],
    })
    slotDefault: () => Array<nasl.ui.ViewComponent>;
  }
}
