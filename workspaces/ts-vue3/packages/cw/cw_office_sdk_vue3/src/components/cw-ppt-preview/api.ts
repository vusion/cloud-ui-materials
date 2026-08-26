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
    title: 'ppt预览',
    description: 'ppt预览',
  })
  export class CwPptPreview extends ViewComponent {
    constructor(options?: Partial<CwPptPreviewOptions>) {
      super();
    }
  }

  export class CwPptPreviewOptions extends ViewComponentOptions {
    @Prop({
      title: '链接地址',
      description: '预览的文件',
      setter: {
        concept: 'InputSetter',
      },
    })
    value: nasl.core.String;
  }
}
