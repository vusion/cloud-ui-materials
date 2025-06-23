/// <reference types="@nasl/types" />
namespace extensions.cw_three_dimensional_model_library.viewComponents {
  const { Component, Prop, ViewComponent, Slot, Method, Event, ViewComponentOptions } = nasl.ui;

  @ExtensionComponent({
    type: 'both',
    ideusage: {
      idetype: 'element',
    }
  })
  @Component({
    title: '三维模型预览',
    description: '三维模型预览',
  })
  export class ModelPreview extends ViewComponent {
    constructor(options?: Partial<ModelPreviewOptions>) {
      super();
    }
  }

  export class ModelPreviewOptions extends ViewComponentOptions {
     @Prop({
      title: '地址',
      description: '链接地址',
      setter: {
        concept: 'InputSetter'
      }
    })
    link: nasl.core.String = '';
  }
}