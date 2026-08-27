/// <reference types="@nasl/types" />
namespace extensions.hg_relation_map.viewComponents {
  const { Component, Prop, ViewComponent, Slot, Method, Param, Event, ViewComponentOptions } = nasl.ui;

  @ExtensionComponent({
    type: 'both',
    ideusage: {
      idetype: 'element',
    }
  })
  @Component({
    title: '时间文本',
    description: '时间文本',
  })
  export class ZoneTimeView extends ViewComponent {
    constructor(options?: Partial<ZoneTimeViewOptions>) {
      super();
    }
  }

  export class ZoneTimeViewOptions extends ViewComponentOptions {
    @Prop({
      title: '时间',
      description: '显示时间',
      setter: {
        concept: 'InputSetter'
      }
    })
    text: nasl.core.String = '';
  }
}
