/// <reference types="@nasl/types" />
namespace extensions.hg_relation_map.viewComponents {
  const { Component, Prop, ViewComponent, Slot, Method, Param, Event, ViewComponentOptions } = nasl.ui;

  @ExtensionComponent({
    type: 'both',
    ideusage: {
      idetype: 'container',
    }
  })
  @Component({
    title: '单据关联图',
    description: '单据关联图',
  })
  export class RelationMapView<T,V> extends ViewComponent {
    constructor(options?: Partial<RelationMapViewOptions<T,V>>) {
      super();
    }
  }

  export class RelationMapViewOptions<T,V> extends ViewComponentOptions {
   

    @Prop({
      title: '表头',
      description: '表头数据',
      setter: {
        concept: 'InputSetter'
      }
    })
    header: nasl.collection.List<nasl.core.String> = [];


    @Prop({
      group: '数据属性',
      title: '数据源',
      description: '展示数据的输入源，可设置为数据集对象或者返回数据集的逻辑',
      docDescription: '列表展示的数据。数据源可以绑定变量或者逻辑。变量或逻辑的返回值可以是数组，也可以是对象。对象格式为{list:[], total:10}',
    })
    dataSource: { list: nasl.collection.List<T>; total: nasl.core.Integer } | nasl.collection.List<T>;

    @Prop({
      group: '数据属性',
      title: '数据类型',
      description: '数据源返回的数据结构的类型，自动识别类型进行展示说明',
      docDescription: '列表每一行的数据类型。该属性为展示属性，由数据源推倒得到，无需填写。',
    })
    dataSchema: T;

    @Event({
      title: '单元点击',
      description: '单元点击',
    })
    onCellClick: (event: T) => void;

    @Slot({
      title: '项',
      description: '项',
    })
    slotItem: (current: nasl.ui.Current<T>) => Array<nasl.ui.ViewComponent>;
  }
}
