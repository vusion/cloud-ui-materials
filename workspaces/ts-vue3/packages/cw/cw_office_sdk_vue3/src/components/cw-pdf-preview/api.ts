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
    title: 'pdf预览',
    description: 'pdf预览',
  })
  export class CwPdfPreview extends ViewComponent {
    constructor(options?: Partial<CwPdfPreviewOptions>) {
      super();
    }
  }

  export class CwPdfPreviewOptions extends ViewComponentOptions {
    @Prop({
      title: '链接地址',
      description: '需要传入的值',
      setter: {
        concept: 'InputSetter',
      },
    })
    value: nasl.core.String = '请在这里编写代码';

    @Prop({
      title: '字体地址',
      description: 'cMapUrl',
      setter: {
        concept: 'InputSetter',
      },
    })
    cMapUrl: nasl.core.String = '';

    @Prop({
      title: '是否开启缩放',
      description: '是否开启缩放',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    panZoom: nasl.core.Boolean = false;

    @Prop({
      title: '最大缩放比例',
      description: '最大缩放比例',
      setter: {
        concept: 'NumberInputSetter',
      },
    })
    maxScale: nasl.core.Decimal = 3;

    @Prop({
      title: '最小缩放比例',
      description: '最小缩放比例',
      setter: {
        concept: 'NumberInputSetter',
      },
    })
    minScale: nasl.core.Decimal = 1;
  }
}
