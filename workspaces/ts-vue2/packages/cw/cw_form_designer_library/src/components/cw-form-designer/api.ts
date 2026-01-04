/// <reference types="@nasl/types" />
namespace extensions.cw_form_designer_library.viewComponents {
  const { Component, Prop, ViewComponent, Slot, Method, Param, Event, ViewComponentOptions } = nasl.ui;

  @ExtensionComponent({
    type: 'pc',
    ideusage: {
      idetype: 'element',
    },
  })
  @Component({
    title: '表单设计器',
    description: '表单设计器',
  })
  export class CwFormDesigner extends ViewComponent {
    constructor(options?: Partial<CwFormDesignerOptions>) {
      super();
    }
    @Method({
      title: '获取表单JSON',
      description: '获取表单JSON',
    })
    getFormJSON(): any {}

    @Method({
      title: '获取表单模版',
      description: '获取表单模版',
    })
    getFormTemplate(): any {}

    @Method({
      title: '获取表单数据结构',
      description: '获取表单数据结构',
    })
    getFormEntity(): any {}
  }

  export class CwFormDesignerOptions extends ViewComponentOptions {
    @Prop({
      title: '初始化布局',
      description: '初始化布局',
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
    initData: nasl.core.String = '';
  }
}
