/// <reference types="@nasl/types" />
namespace extensions.cw_dynamic_form_library.viewComponents {
  const { Component, Prop, ViewComponent, Slot, Method, Param, Event, ViewComponentOptions } = nasl.ui;
  type ViewComponent = nasl.ui.ViewComponent;

  @ExtensionComponent({
    type: 'both',
    ideusage: {
      idetype: 'element',
    }
  })
  @Component({
    title: '设计器',
    description: '设计器',
  })
  export class CwAntdCustomView extends ViewComponent {
    constructor(options?: Partial<CwAntdCustomViewOptions>) {
      super();
    }

    @Method({
      title: '提交',
      description: '提交表单'
    })
    handleFormSubmit(): void {}

    @Method({
      title: '表单设置',
      description: '显示表单设置'
    })
    handleShowFormSetting(): void {}

    @Event({
      title: '提交',
      description: '提交时'
    })
    onSubmit: (event: {
      $event: object;
      $event1: object;
    }) => void;

    @Event({
      title: '改变后',
      description: '改变后'
    })
    onChange: (event: {
      $event: object;
    }) => void;

    @Slot({
      title: '默认插槽',
      description: '默认插槽'
    })
    slotDefault: () => Array<ViewComponent>;
  }

  export class CwAntdCustomViewOptions extends ViewComponentOptions {
    @Prop({
      title: '动态内容',
      description: '需要传入的值',
      setter: {
        concept: 'InputSetter'
      }
    })
    value: nasl.core.String = '';

    @Prop({
      title: '自定义表单信息',
      description: '自定义表单信息',
      setter: {
        concept: 'InputSetter'
      }
    })
    customComponentList: nasl.core.String = '';
  }
}
