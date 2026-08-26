/// <reference types="@nasl/types" />
namespace extensions.cw_signature_view_vue3.viewComponents {
  const { Component, Prop, ViewComponent, Method, Param, ViewComponentOptions } = nasl.ui;

  @ExtensionComponent({
    type: 'both',
    ideusage: {
      idetype: 'element',
    },
  })
  @Component({
    title: '签名板组件',
    description: '签名板组件',
  })
  export class CwSignatureView extends ViewComponent {
    @Method({
      title: '重新加载签名板',
      description: '重新加载签名板',
    })
    reloadSignature(): void {}

    @Method({
      title: '获取签名板生成图片',
      description: '获取签名板生成图片',
    })
    getSignature(): void {}

    @Method({
      title: '清除签名板生成图片',
      description: '清除签名板生成图片',
    })
    clearSignature(): void {}

    @Method({
      title: '旋转签名板生成图片',
      description: '旋转签名板生成图片',
    })
    rotateSignature(
      @Param({
        title: '旋转角度',
        description: '旋转角度',
      })
      angle: nasl.core.Decimal = 90,
    ): void {}

    @Method({
      title: '签名板是否为空',
      description: '当前签名板是否为空',
    })
    isEmpty(): nasl.core.Boolean {
      return false;
    }

    constructor(options?: Partial<CwSignatureViewOptions>) {
      super();
    }
  }

  export class CwSignatureViewOptions extends ViewComponentOptions {
    @Prop({
      title: '是否开启笔锋',
      description: '是否开启笔锋',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    openSmooth: nasl.core.Boolean = true;

    @Prop({
      title: '画笔颜色',
      description: '设置画笔颜色',
      setter: {
        concept: 'InputSetter',
      },
    })
    penColor: nasl.core.String = 'black';

    @Prop({
      title: '画笔宽度',
      description: '设置画笔宽度',
      setter: {
        concept: 'NumberInputSetter',
      },
    })
    penWidth: nasl.core.Integer = 2;

    @Prop({
      title: '画布背景颜色',
      description: '设置画布背景颜色',
      setter: {
        concept: 'InputSetter',
      },
    })
    bgColor: nasl.core.String = '#F8F9FA';
  }
}
