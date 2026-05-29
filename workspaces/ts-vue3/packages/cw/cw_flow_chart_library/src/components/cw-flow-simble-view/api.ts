/// <reference types="@nasl/types" />
namespace extensions.cw_flow_chart_library.viewComponents {
  const { Component, Prop, ViewComponent, Method, ViewComponentOptions } = nasl.ui;

  @ExtensionComponent({
    type: 'both',
    ideusage: {
      idetype: 'element',
    },
  })
  @Component({
    title: '简单流程绘制',
    description: '简单流程绘制',
  })
  export class CwFlowSimbleView extends ViewComponent {
    constructor(options?: Partial<CwFlowSimbleViewOptions>) {
      super();
    }

    @Method({
      title: '生成数据',
      description: '生成数据',
    })
    toJSON(): nasl.core.String {
      return '' as nasl.core.String;
    }

    @Method({
      title: '生成Base64图片',
      description: '生成Base64图片',
    })
    toPNG(): any {
      return undefined;
    }

    @Method({
      title: '生成图片',
      description: '生成图片',
    })
    exportPNG(): void {}
  }

  export class CwFlowSimbleViewOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: '值',
      description: '需要传入的值',
      setter: {
        concept: 'InputSetter',
      },
    })
    value: nasl.core.String = '';
  }
}
