/// <reference types="@nasl/types" />
namespace extensions.cw_dynamic_form_library.viewComponents {
  const { Component, Prop, ViewComponent, Slot, Method, Param, Event, ViewComponentOptions } = nasl.ui;
  type ViewComponent = nasl.ui.ViewComponent;

  @ExtensionComponent({
    type: 'pc',
    ideusage: {
      idetype: 'element',
    }
  })
  @Component({
    title: '日期选择器',
    description: '日期选择器',
  })
  export class CwAntdDatePicker extends ViewComponent {
    constructor(options?: Partial<CwAntdDatePickerOptions>) {
      super();
    }
  }

  export class CwAntdDatePickerOptions extends ViewComponentOptions {
    @Prop({
      title: '值',
      description: '需要传入的值',
      setter: {
        concept: 'InputSetter'
      }
    })
    value: nasl.core.String = '请在这里编写代码';

    @Prop({
      title: '格式',
      description: '日期格式',
      setter: {
        concept: 'InputSetter'
      }
    })
    format: nasl.core.String = 'YYYY-MM-DD';

    @Event({
      title: '值改变事件',
      description: '值改变事件'
    })
    onChange: (value: nasl.core.String) => void;
  }
}
