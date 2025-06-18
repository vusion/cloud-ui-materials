/// <reference types="@nasl/types" />
namespace extensions.cw_amap_new.viewComponents {
  const { Component, Prop, ViewComponent, Slot, Method, Event, ViewComponentOptions } = nasl.ui;

  @ExtensionComponent({
    type: 'both',
    ideusage: {
      idetype: 'element',
    },
  })
  @Component({
    title: '地图导航',
    description: '地图导航',
  })
  export class CwAmapNewNav extends ViewComponent {
    constructor(options?: Partial<CwAmapNewNavOptions>) {
      super();
    }
  }

  export class CwAmapNewNavOptions extends ViewComponentOptions {
    @Prop({
      title: '是否开启导航',
      description: '是否开启导航',
      setter: { concept: 'SwitchSetter' },
    })
    canto: nasl.core.Boolean = true;

    @Prop({
      title: '位置坐标',
      description: '位置坐标',
      setter: { concept: 'InputSetter' },
    })
    lalg: nasl.core.String;

    @Prop({
      title: '导航名称',
      description: '导航页标题显示的名称',
      setter: { concept: 'InputSetter' },
    })
    label: nasl.core.String;

    @Prop({
      title: '打开方式',
      description: '链接打开方式',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '新标签页' }, { title: '当前窗口' }, { title: '父级窗口' }, { title: '顶级窗口' }],
      },
    })
    target: '_blank' | '_self' | '_parent' | '_top' = '_self';
    
    @Prop({
      title: '是否调起高德地图APP',
      description: '是否调起高德地图APP',
      setter: { concept: 'SwitchSetter' },
    })
    callnativet: nasl.core.Boolean = true;
  }
}
