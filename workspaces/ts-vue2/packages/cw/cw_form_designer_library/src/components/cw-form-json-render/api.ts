/// <reference types="@nasl/types" />
namespace extensions.cw_form_designer_library.viewComponents {
  const { Component, Prop, ViewComponent, Slot, Method, Param, Event, ViewComponentOptions } = nasl.ui;
  type ValidateResult = nasl.ui.ValidateResult;
  @ExtensionComponent({
    type: 'pc',
    ideusage: {
      idetype: 'element',
    },
  })
  @Component({
    title: 'JSON渲染器',
    description: 'JSON渲染器',
  })
  export class CwFormJsonRender extends ViewComponent {
    constructor(options?: Partial<CwFormJsonRenderOptions>) {
      super();
    }
    @Method({
      title: 'undefined',
      description: '手动验证。',
    })
    validate(
      @Param({
        title: 'undefined',
        description: '触发方式，可选值：`submit`、`blur`和`input`之一，或者它们的任意组合。',
      })
      trigger: nasl.core.String = 'submit',
      @Param({
        title: 'undefined',
        description: '是否验证后无提示',
      })
      muted: nasl.core.Boolean = false
    ): any {}

    @Method({
      title: '获取表单数据',
      description: '获取表单数据',
    })
    getFormData(): any {}
  }

  export class CwFormJsonRenderOptions extends ViewComponentOptions {
    @Prop({
      title: '初始化JSON',
      description: '初始化JSON',
      setter: {
        concept: 'InputSetter',
      },
    })
    initJSON: nasl.core.String = '';

    @Prop({
      title: '初始化数据',
      description: '初始化数据',
      setter: {
        concept: 'InputSetter',
      },
    })
    initData: nasl.core.String = '';

    @Prop({
      title: '数据权限',
      description: '数据权限, 包括： 可编辑 editable, 隐藏 hidden, 只读 readonly, 预览 preview, 禁用 disabled',
      setter: {
        concept: 'InputSetter',
      },
    })
    dataPermission: nasl.core.String;

    @Event({
      title: '渲染成功',
      description: '渲染成功',
    })
    onRenderSuccess: (event: {
      type: nasl.core.String;
      initJSON: nasl.core.String;
      initLayout: nasl.core.String;
      initData: nasl.core.String;
    }) => void;

    @Event({
      title: '渲染失败',
      description: '渲染失败',
    })
    onRenderFailed: (event: { type: nasl.core.String; initJSON: nasl.core.String; initLayout: nasl.core.String; initData: nasl.core.String }) => void;
  }
}
