/// <reference types="@nasl/types" />
namespace extensions.cw_dragable_list_vue3.viewComponents {
  const { Component, Prop, ViewComponent, Slot, ViewComponentOptions } = nasl.ui;

  @ExtensionComponent({
    type: 'both',
    ideusage: {
      idetype: 'container',
      structured: true,
      dataSource: {
        display: 3,
        emptySlot: {
          display: 'inline',
          condition: '!this.getAttribute("dataSource")',
          accept: false,
        },
      },
    },
  })
  @Component({
    title: '可拖拽数据列表',
    description: '可拖拽数据列表',
  })
  export class CwDragableList<T> extends ViewComponent {
    constructor(options?: Partial<CwDragableListOptions<T>>) {
      super();
    }
  }

  export class CwDragableListOptions<T> extends ViewComponentOptions {
    @Prop({
      group: '数据属性',
      title: '数据源',
      description: '展示数据的输入源，可设置为数据集对象或者返回数据集的逻辑',
      designerValue: [{}, {}, {}],
    })
    dataSource: nasl.collection.List<T>;

    @Prop({
      group: '数据属性',
      title: '数据类型',
      description:
        'IDE 根据配置的数据源动态计算返回内容的数据结构，用于动态配置项 current.item 的类型说明。',
    })
    dataSchema: T;

    @Prop({
      title: '分组',
      description: '相同分组可以互相拖拽',
    })
    group: nasl.core.String = 'group';

    @Prop({
      title: '分组',
      description: '列表的方向，默认横向',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: '横向', value: 'horizontal' },
          { title: '纵向', value: 'vertical' },
        ],
      },
    })
    direction: 'horizontal' | 'vertical' = 'horizontal';

    @Slot({
      title: '内容自定义',
      description: '内容自定义',
    })
    slotDefault: (current: nasl.ui.Current<T>) => Array<nasl.ui.ViewComponent>;
  }
}
