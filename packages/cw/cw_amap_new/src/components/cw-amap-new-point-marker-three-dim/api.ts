/// <reference types="@nasl/types" />
namespace extensions.cw_amap_new.viewComponents {
  const { Component, Prop, ViewComponent, Slot, Method, Event, ViewComponentOptions } = nasl.ui;

  @ExtensionComponent({
    type: 'both',
    ideusage: {
      idetype: 'container',
    },
  })
  @Component({
    title: '3d标记点',
    description: '3d标记点',
  })
  export class CwAmapNewPointMarkerThreeDim<T, V> extends ViewComponent {
    constructor(options?: Partial<CwAmapNewPointMarkerThreeDimOptions<T, V>>) {
      super();
    }

    @Method({
      title: 'undefined',
      description: '清除缓存，重新加载',
    })
    reload(): void {}
  }

  export class CwAmapNewPointMarkerThreeDimOptions<T, V> extends ViewComponentOptions {
    @Prop({
      group: '数据属性',
      title: '数据源',
      description: '展示数据的输入源，可设置为集合类型变量（List<T>）或输出参数为集合类型的逻辑。',
      docDescription: '支持动态绑定集合类型变量（List<T>）或输出参数为集合类型的逻辑',
      designerValue: [{}, {}, {}],
      bindOpen: true,
    })
    dataSource: { list: nasl.collection.List<T>; total: nasl.core.Integer } | nasl.collection.List<T>;

    @Prop({
      group: '数据属性',
      title: '数据类型',
      description: '数据源返回的数据结构的类型，自动识别类型进行展示说明',
      docDescription: '该属性为只读状态，当数据源动态绑定集合List<T>后，会自动识别T的类型并进行展示。',
    })
    dataSchema: T;

    @Prop({
      group: '数据属性',
      title: 'ID字段',
      description: '集合的元素类型中，用于显示ID的属性名称',
      docDescription: '集合的元素类型中，用于显示ID的属性名称',
      setter: {
        concept: 'PropertySelectSetter',
      },
    })
    idField: (item: T) => V = ((item: any) => item.id) as any;

    @Prop({
      group: '数据属性',
      title: '位置字段',
      description: '集合的元素类型中，用于显示ID的属性名称',
      docDescription: '集合的元素类型中，用于标识点位置的属性',
      setter: {
        concept: 'PropertySelectSetter',
      },
    })
    positionField: (item: T) => V = ((item: any) => item.position) as any;

    @Prop({
      group: '数据属性',
      title: '类型字段',
      description: '集合的元素类型中，用于标记点类型的属性。请和纹理设置配合使用',
      setter: {
        concept: 'PropertySelectSetter',
      },
      docDescription: '集合的元素类型中，用于标识子级字段的的属性，支持自定义变更',
    })
    typeField: (item: T) => V = ((item: any) => item.type) as any;

    @Prop({
      group: '数据属性',
      title: '文本字段',
      description: '集合的元素类型中，用于标记点文本的属性',
      docDescription: '集合的元素类型中，用于标识文本的的属性，支持自定义变更',
      setter: {
        concept: 'PropertySelectSetter',
      },
    })
    textContentField: (item: T) => V = ((item: any) => item.textContent) as any;

    @Prop({
      title: '地图中心点',
      description: '当前地图的中心点位置',
      setter: { concept: 'InputSetter' },
    })
    center: nasl.collection.List<nasl.core.Decimal> = [120.190941, 30.18635];

    @Prop({
      title: '开启移动动画',
      description: '是否在点更新坐标的时候使用动画，注意打开此选项后，点的样式属性不会更新',
      setter: { concept: 'SwitchSetter' },
    })
    needMoveAnimate: nasl.core.Boolean = true;

    @Prop({
      title: '移动动画的时长',
      description: '移动动画的时长，单位为ms',
      setter: { concept: 'NumberInputSetter' },
      if: (_) => _.needMoveAnimate === true,
    })
    moveDuration: nasl.core.Integer = 100;

    @Prop({
      title: '是否使用点信息插槽',
      description: '是否使用点信息插槽',
      setter: { concept: 'SwitchSetter' },
    })
    hasInfoWindow: nasl.core.Boolean = true;

    @Prop({
      title: '纹理属性',
      description: '纹理属性',
      setter: { concept: 'InputSetter' },
    })
    textureMap: any;

    @Prop({
      title: '点信息插槽更新时间',
      description: '点信息插槽',
      setter: {
        concept: 'NumberInputSetter',
      },
    })
    debounceTime: nasl.core.Integer = 10;

    @Prop({
      group: '数据属性',
      title: '值',
      description: '选中点的id',
      sync: true,
    })
    value: nasl.core.String;

    @Prop({
      title: '弹出方向',
      description: '弹出方向。',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: '上' },
          { title: '下' },
          { title: '左' },
          { title: '右' },
          { title: '上左' },
          { title: '上右' },
          { title: '下左' },
          { title: '下右' },
          { title: '左上' },
          { title: '左下' },
          { title: '右上' },
          { title: '右下' },
        ],
      },
    })
    placement:
      | 'top'
      | 'bottom'
      | 'left'
      | 'right'
      | 'top-start'
      | 'top-end'
      | 'bottom-start'
      | 'bottom-end'
      | 'left-start'
      | 'left-end'
      | 'right-start'
      | 'right-end' = 'bottom';

    @Event({
      title: '选择后',
      description: '选择某一项时触发',
    })
    onClick: (event: any) => void;

    @Slot({
      title: '自定义选项',
      description: '自定义选项的结构和样式',
    })
    slotItem: (current: nasl.ui.Current<T>) => Array<nasl.ui.ViewComponent>;
  }
}
