/// <reference types="@nasl/types" />
namespace extensions.cw_verifycode_library_vue3.viewComponents {
  const { Component, Prop, ViewComponent, Method, ViewComponentOptions } = nasl.ui;

  @ExtensionComponent({
    type: 'both',
    ideusage: {
      idetype: 'element',
    },
  })
  @Component({
    title: '验证码',
    description: '验证码',
  })
  export class CwVerifycodeView extends ViewComponent {
    @Method({
      title: '验证',
      description: '验证',
    })
    validate(): nasl.core.Boolean {
      return false as unknown as nasl.core.Boolean;
    }

    @Method({
      title: '刷新',
      description: '刷新',
    })
    refresh(): void {}

    constructor(options?: Partial<CwVerifycodeViewOptions>) {
      super();
    }
  }

  export class CwVerifycodeViewOptions extends ViewComponentOptions {
    @Prop({
      title: '值',
      description: '需要传入的值',
      setter: {
        concept: 'InputSetter',
      },
    })
    value: nasl.core.String;

    @Prop({
      title: '类型',
      description: '需要传入的值',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: '混合', value: 'blend' },
          { title: '数字', value: 'number' },
          { title: '字母', value: 'letter' },
        ],
      },
    })
    type: 'blend' | 'number' | 'letter' = 'number';
  }
}
