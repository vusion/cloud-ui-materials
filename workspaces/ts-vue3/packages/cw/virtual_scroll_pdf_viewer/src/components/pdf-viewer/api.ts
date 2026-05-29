/// <reference types="@nasl/types" />
namespace extensions.virtual_scroll_pdf_viewer.viewComponents {
  const { Component, Prop, ViewComponent, ViewComponentOptions } = nasl.ui;

  @ExtensionComponent({
    type: 'both',
    ideusage: {
      idetype: 'element',
    },
  })
  @Component({
    title: 'pdf高性能展示组件',
    description: 'pdf高性能展示组件',
  })
  export class PdfViewer extends ViewComponent {
    constructor(options?: Partial<PdfViewerOptions>) {
      super();
    }
  }

  export class PdfViewerOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: 'pdf链接',
      description: 'pdf链接',
      setter: {
        concept: 'InputSetter',
      },
    })
    value: nasl.core.String = '';

    @Prop({
      group: '主要属性',
      title: '是否启用手势缩放',
      description: '是否启用浏览器默认行为手势缩放',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    enableZoom: nasl.core.Boolean = false;
  }
}
