/// <reference types="@nasl/types" />
namespace extensions.cw_pdf_preview.viewComponents {
  const { Component, Prop, ViewComponent, Slot, Method, Event, ViewComponentOptions } = nasl.ui;

  @ExtensionComponent({
    type: 'pc',
    ideusage: {
      idetype: 'element',
    }
  })
  @Component({
    title: 'PDF预览组件',
    description: 'PDF预览组件',
  })
  export class PdfPreview extends ViewComponent {
    constructor(options?: Partial<PdfPreviewOptions>) {
      super();
    }
  }

  export class PdfPreviewOptions extends ViewComponentOptions {
     @Prop({
      title: 'url',
      description: '预览链接',
      setter: {
        concept: 'InputSetter'
      }
    })
    url: nasl.core.String = '';
  }
}