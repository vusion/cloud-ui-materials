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
    title: '缩略列表',
    description: '横向列表，超出宽度时显示部分内容，剩余数量显示为按钮',
  })
  export class AbbreviatedList<T,V> extends ViewComponent {
    constructor(options?: Partial<AbbreviatedListOptions<T,V>>) {
      super();
    }

  }

  export class AbbreviatedListOptions<T,V> extends ViewComponentOptions {

    @Prop({ 
      title: '宽度',
      description: '列表容器的宽度',
      setter: {
        concept: 'InputSetter'
      }
    })
    width: nasl.core.String = '100%';


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

    @Slot({
      title: '项',
      description: '项',
    })
    slotItem: (current: nasl.ui.Current<T>) => Array<nasl.ui.ViewComponent>;

    @Event({
      title: '更多点击',
      description: '点击显示剩余数量的按钮时触发',
    })
    onMoreClick: (count: nasl.core.Integer) => void;
  }
}
