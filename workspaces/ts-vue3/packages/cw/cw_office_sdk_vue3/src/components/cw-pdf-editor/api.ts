/// <reference types="@nasl/types" />
namespace extensions.cw_office_sdk_vue3.viewComponents {
  const { Component, ViewComponent, Slot, Method, ViewComponentOptions } = nasl.ui;
  type ViewComponentType = nasl.ui.ViewComponent;

  @ExtensionComponent({
    type: 'both',
    ideusage: {
      idetype: 'container',
    },
  })
  @Component({
    title: 'pdf编辑器',
    description: 'pdf编辑器',
  })
  export class CwPdfEditor extends ViewComponent {
    @Method({
      title: '保存文件',
      description: '保存当前编辑的 PDF 文件',
    })
    savePDF(): void {}

    constructor(options?: Partial<CwPdfEditorOptions>) {
      super();
    }
  }

  export class CwPdfEditorOptions extends ViewComponentOptions {
    @Slot({
      title: '默认插槽',
      description: '插入文本或 HTML。',
    })
    slotDefault: () => Array<ViewComponentType>;

    @Slot({
      title: 'pdf插槽',
      description: '插入上传PDF文件按钮',
    })
    slotPdf: () => Array<ViewComponentType>;

    @Slot({
      title: 'image插槽',
      description: '插入上传图片文件按钮',
    })
    slotImage: () => Array<ViewComponentType>;
  }
}
