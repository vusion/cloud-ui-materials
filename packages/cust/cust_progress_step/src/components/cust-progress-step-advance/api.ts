/// <reference types="@nasl/types" />
namespace extensions.cust_progress_step.viewComponents {
  const { Component, Prop, ViewComponent, Slot, Method, Event, ViewComponentOptions } = nasl.ui;

  @ExtensionComponent({
    type: 'both',
    ideusage: {
      idetype: 'element',
    },
  })
  @Component({
    title: '支持并行输入步骤条',
    description: '支持并行输入步骤条',
  })
  export class CustProgressStepAdvance<T> extends ViewComponent {
    constructor(options?: Partial<CustProgressStepAdvanceOptions<T>>) {
      super();
    }
  }

  export class CustProgressStepAdvanceOptions<T> extends ViewComponentOptions {
    @Prop({
      title: '当前步骤',
    })
    currentStep: nasl.core.String;

    @Prop({
      title: '步骤数据',
    })
    data: nasl.collection.List<T>;
  }
}
