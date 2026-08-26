/// <reference types="@nasl/types" />
namespace extensions.cw_qrcode_library_vue3.viewComponents {
  const { Component, Event, ViewComponent, ViewComponentOptions } = nasl.ui;

  @ExtensionComponent({
    type: 'h5',
    ideusage: {
      idetype: 'element',
    },
  })
  @Component({
    title: '扫一扫',
    description: '扫一扫',
  })
  export class CwQrcodeScanView extends ViewComponent {
    constructor(options?: Partial<CwQrcodeScanViewOptions>) {
      super();
    }
  }

  export class CwQrcodeScanViewOptions extends ViewComponentOptions {
    @Event({
      title: 'onScan',
      description: '扫码成功后触发',
    })
    onScan: (event: nasl.core.String) => void;
  }
}

