/// <reference types="@nasl/types" />
namespace extensions.cust_local_office_preview.viewComponents {
  const { Component, Prop, ViewComponent, Slot, Method, Event, ViewComponentOptions } = nasl.ui;

  @ExtensionComponent({
    type: 'both',
    ideusage: {
      idetype: 'element',
    }
  })
  @Component({
    title: 'ppt组件',
    description: 'ppt组件',
  })
  export class LocalPptPreview extends ViewComponent {
    constructor(options?: Partial<LocalPptPreviewOptions>) {
      super();
    }
  }

  export class LocalPptPreviewOptions extends ViewComponentOptions {
     @Prop({
      title: '文件地址',
      description: '文件地址',
      setter: {
        concept: 'InputSetter'
      }
    })
    urlString: nasl.core.String = '';

    @Event({
      title: '转换错误',
      description: 'ppt转换错误',
    })
    onError: (event: nasl.core.String) => void;
  }
}