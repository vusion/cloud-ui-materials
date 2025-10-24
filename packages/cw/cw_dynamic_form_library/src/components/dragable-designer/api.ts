/// <reference types="@nasl/types" />
namespace extensions.cw_dynamic_form_library.viewComponents {
  const { Component, Prop, ViewComponent, Slot, Method, Param, Event, ViewComponentOptions } = nasl.ui;

  @ExtensionComponent({
    type: 'pc',
    ideusage: {
      idetype: 'element',
    }
  })
  @Component({
    title: '可拖拽设计器',
    description: '可拖拽设计器',
  })
  export class DragableDesigner extends ViewComponent {
    constructor(options?: Partial<DragableDesignerOptions>) {
      super();
    }
  }

  export class DragableDesignerOptions extends ViewComponentOptions {
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
