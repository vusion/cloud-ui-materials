/// <reference types="@nasl/types" />
namespace extensions.cw_text_power_library_ele.viewComponents {
  const { Component, Prop, ViewComponent, ViewComponentOptions } = nasl.ui;

  @ExtensionComponent({
    type: 'both',
    ideusage: {
      idetype: 'element',
    },
  })
  @Component({
    title: '打字机文本',
    description: '打字机文本',
  })
  export class CwTypedView extends ViewComponent {
    constructor(options?: Partial<CwTypedViewOptions>) {
      super();
    }
  }

  export class CwTypedViewOptions extends ViewComponentOptions {
    @Prop({
      title: '文本内容',
      description: '需要传入的值',
      setter: {
        concept: 'InputSetter',
      },
    })
    value: nasl.core.String = '请在这里输入内容';

    @Prop({
      title: '打字速度',
      description: '打字速度，单位为毫秒',
      setter: {
        concept: 'NumberInputSetter',
      },
    })
    typeSpeed: nasl.core.Decimal = 40;

    @Prop({
      title: '展示光标',
      description: '展示光标',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    showCursor: nasl.core.Boolean = false;
  }
}
