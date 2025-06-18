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
    title: '地图选点',
    description: '地图选点',
  })
  export class CwAmapNewPoi extends ViewComponent {
    constructor(options?: Partial<CwAmapNewPoiOptions>) {
      super();
    }

    @Method({
      title: 'POI点',
      description: 'POI点被选中后，获取经纬度以及详细地址信息',
    })
    poiPicked(): void {}
  }

  export class CwAmapNewPoiOptions extends ViewComponentOptions {
    @Prop({
      title: '默认城市',
      description: '默认城市',
      setter: {
        concept: 'InputSetter',
      },
    })
    city: nasl.core.String;

    @Event({
      title: '选择后',
      description: '点被选中后，可以调用逻辑（如，选择城北体育公园后，自动在详细地址输入框填充详细地址信息）',
    })
    onSelect: () => void;
  }
}
