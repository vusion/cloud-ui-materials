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
    title: '模版渲染器',
    description: '模版渲染器',
  })
  export class CwFormTemplateRender extends ViewComponent {
    constructor(options?: Partial<CwFormTemplateRenderOptions>) {
      super();
    }
    @Method({
      title: '手动验证',
      description: '手动验证',
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

  export class CwFormTemplateRenderOptions extends ViewComponentOptions {
    @Prop({
      title: '渲染类型',
      description: '渲染类型',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '渲染模式' }, { title: '设计模式' }],
      },
    })
    type: 'render' | 'designer' = 'render';

    @Prop({
      title: '初始化模版',
      description: '初始化模版',
      setter: {
        concept: 'InputSetter',
      },
    })
    initLayout: nasl.core.String = '';

    @Prop({
      title: '初始化数据',
      description: '初始化数据',
      setter: {
        concept: 'InputSetter',
      },
    })
    initData: nasl.core.String = '{}';

    @Prop({
      title: '数据权限',
      description: '数据权限',
      setter: {
        concept: 'InputSetter',
      },
    })
    dataPermission: nasl.core.String;

    @Event({
      title: '渲染成功',
      description: '渲染成功',
    })
    onRenderSuccess: (event: { type: nasl.core.String; initLayout: nasl.core.String; initData: nasl.core.String }) => void;

    @Event({
      title: '渲染失败',
      description: '渲染失败',
    })
    onRenderFailed: (event: { type: nasl.core.String; initLayout: nasl.core.String; initData: nasl.core.String }) => void;
  }
}
