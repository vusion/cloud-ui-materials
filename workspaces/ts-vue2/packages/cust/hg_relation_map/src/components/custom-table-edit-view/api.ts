/// <reference types="@nasl/types" />
namespace extensions.hg_relation_map.viewComponents {
  const { Component, Prop, ViewComponent, Slot, Method, Param, Event, ViewComponentOptions } = nasl.ui;

  @ExtensionComponent({
    type: 'pc',
    ideusage: {
      idetype: 'element',
    }
  })
  @Component({
    title: '编辑表格',
    description: '编辑表格',
  })
  export class CustomTableEidtView extends ViewComponent {
    constructor(options?: Partial<CustomTableEidtViewOptions>) {
      super();
    }
  }

  export class CustomTableEidtViewOptions extends ViewComponentOptions {
    @Prop({
      title: '内容',
      description: '显示文本',
      setter: {
        concept: 'InputSetter'
      }
    })
    text: nasl.core.String = '';

    @Prop({
      title: '类型',
      description: '类型',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '主要' }, { title: '次要' }, { title: '默认' }]
      }
    })
    type: 'primary' | 'secondary' | 'default' = 'default';
  }
}
