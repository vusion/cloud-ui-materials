/// <reference types="@nasl/types" />
namespace extensions.lcap_process_components_vue_pc.viewComponents {
  const { Component, Prop, ViewComponent, Slot, Method, Event, ViewComponentOptions } = nasl.ui;

  @ExtensionComponent({
    type: 'pc',
    ideusage: {
      idetype: 'element',
    },
  })
  @Component({
    title: '流程图',
    description: '流程图',
    icon: 'process-flow',
    group: '流程',
  })
  export class FlProcessGraph<T> extends ViewComponent {
    @Method({
      title: 'undefined',
      description: '清除缓存，重新加载',
    })
    reload(): void {}

    @Prop({
      title: '数据',
    })
    data: nasl.collection.List<T>;
    constructor(options?: Partial<FlProcessGraphOptions<T>>) {
      super();
    }
  }
  export class FlProcessGraphOptions<T> extends ViewComponentOptions {
    @Prop({
      group: '数据属性',
      title: '数据源',
      description: '展示数据的输入源，可设置为数据集对象或者返回数据集的逻辑',
      docDescription: '流程图的数据源。',
    })
    // dataSource: T;
    dataSource: nasl.collection.List<T>;

    @Prop({
      group: '数据属性',
      title: '数据类型',
      description: '数据源返回的数据结构的类型，自动识别类型进行展示说明',
      docDescription: '流程图数据类型。该属性为展示属性，由数据源推倒得到，无需填写。',
    })
    dataSchema: nasl.collection.List<T>;

    @Prop({
      title: '初始缩放比',
      description: '',
    })
    initialZoom: nasl.core.String;
  }
}
