/// <reference types="@nasl/types" />
namespace extensions.cw_map.viewComponents {
  const { Component, Prop, ViewComponent, Slot, Method, Event, ViewComponentOptions } = nasl.ui;

  @ExtensionComponent({
    type: 'both',
    ideusage: {
      idetype: 'element',
    },
  })
  @Component({
    title: '浙江地图',
    description: '浙江地图',
  })
  export class ZhejiangMap extends ViewComponent {
    constructor(options?: Partial<ZhejiangMapOptions>) {
      super();
    }
  }

  export class ZhejiangMapOptions extends ViewComponentOptions {
    @Prop({
      title: '区域数据',
      description: '区域数据',    
      setter: {
        concept: 'InputSetter',
      },
    })
    areaData: any = undefined;

    @Prop({
      title: '市一级的标准',
      description: '市一级的标准',
      setter: {
        concept: 'InputSetter',
      },
    })
    cityThresholds: any = undefined;

    @Prop({
      title: '区一级的标准',
      description: '区一级的标准',
      setter: {
        concept: 'InputSetter',
      },
    })
    districtThresholds: any = undefined;

    @Prop({
      title: '地图缩放比例',
      description: '地图缩放比例',
      setter: {
        concept: 'NumberInputSetter',
      },
    })
    zoom: nasl.core.Decimal = 1;

    @Event({
      title: '点击区域',
      description: '点击区域',
    })
    onRegionClick: (event: nasl.core.String) => void;

    @Event({
      title: '点击地图层级',
      description: '点击地图层级',
    })
    onGoToLevel: (event: nasl.core.Integer) => void;
  }
}
