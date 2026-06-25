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
    title: '自定义输入框',
    description: '自定义输入框',
  })
  export class CwInputAreaView extends ViewComponent {
    constructor(options?: Partial<CwInputAreaViewOptions>) {
      super();
    }
  }

  export class CwInputAreaViewOptions extends ViewComponentOptions {
  
    /**
     * 需要传入的值
     */
    @Prop({
      title: '值',
      description: '需要传入的值',
      sync:true
    })
    value: nasl.core.String;

    /**
     * 匹配Map
     */
    @Prop({
      title: '匹配Map',
      description: '匹配Map'
    })
    titleMap: nasl.core.String;

    @Prop({
      title:"占位符",
      description:"占位符"
    })
    placeholder: nasl.core.String = '请输入内容';

    @Prop({
      title:"禁用",
      description:"是否禁用"
    })
    disabled:nasl.core.Boolean = false

    @Event({
      title: '改变事件',
      description: '改变事件',
    })
    onChange: (event: nasl.core.String) => void;
  }
}
