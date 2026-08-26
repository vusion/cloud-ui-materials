/// <reference types="@nasl/types" />
namespace extensions.cw_office_sdk_vue3.viewComponents {
  const { Component, Prop, ViewComponent, ViewComponentOptions } = nasl.ui;

  @ExtensionComponent({
    type: 'both',
    ideusage: {
      idetype: 'element',
    },
  })
  @Component({
    title: 'xlsx预览',
    description: 'xlsx预览',
  })
  export class CwXlsxPreview extends ViewComponent {
    constructor(options?: Partial<CwXlsxPreviewOptions>) {
      super();
    }
  }

  export class CwXlsxPreviewOptions extends ViewComponentOptions {
    @Prop({
      title: '链接地址',
      description: '预览的文件，可以是blob｜url｜arraybuffer',
      setter: {
        concept: 'InputSetter',
      },
    })
    value: nasl.core.String;
  }
}
