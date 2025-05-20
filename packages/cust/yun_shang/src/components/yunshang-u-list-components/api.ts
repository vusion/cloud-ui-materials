/// <reference types="@nasl/types" />
/// <reference types="../../../.lcap/lcap-ui/runtime/nasl.ui.d.ts" />
namespace extensions.yun_shang.viewComponents {
  const { Component, Prop, ViewComponent, Slot, Method, Param, Event, ViewComponentOptions } = nasl.ui;
  @ExtensionComponent({
    replaceNaslUIComponent: 'UListComponents',
    type: 'pc',
    show: true,
    ideusage: {
      idetype: 'container',
      additionalAttribute: {
        ':dataSource': '"[{}, {}, {}]"',
      },
      childAccept: false,
      useTemplateInDefaultSlot: true,
      style: [
        {
          selector: '.yunshang-u-for-com-item:not(:first-child)',
          declaration: 'opacity: 0.4; cursor: not-allowed !important; pointer-events: none',
        },
        {
          selector: '.yunshang-u-for-com-frag:not(:first-child)',
          declaration: 'opacity: 0.4; cursor: not-allowed !important; pointer-events: none',
        },
      ],
    },
  })
  @Component({
    title: '组件列表',
    icon: 'forcom',
    description: '组件列表',
    group: 'Table',
  })
  export class YunshangUListComponents<T> extends ViewComponent {
    @Prop({
      title: '数据',
    })
    data: nasl.collection.List<T>;
    @Method({
      title: 'undefined',
      description: '清除缓存，重新加载',
    })
    reload(): void {}
    constructor(options?: Partial<YunshangUListComponentsOptions<T>>) {
      super();
    }
  }
  export class YunshangUListComponentsOptions<T> extends ViewComponentOptions {
    @Prop({
      group: '数据属性',
      title: '数据源',
      description: '展示数据的输入源，可设置为数据集对象或者返回数据集的逻辑',
      docDescription: '组件的数据源，配置内容为数据集对象或者返回数据集的逻辑。',
      bindOpen: true,
    })
    dataSource:
      | nasl.collection.List<T>
      | {
          list: nasl.collection.List<T>;
          total: nasl.core.Integer;
        };
    @Prop({
      group: '数据属性',
      title: '数据类型',
      description: '数据源返回的数据结构的类型，自动识别类型进行展示说明',
      docDescription: 'IDE 根据配置的数据源动态计算返回内容的数据结构，用于动态配置项 current.item 的类型说明。',
    })
    dataSchema: T;
    @Prop({
      group: '数据属性',
      title: '唯一字段',
      description: '唯一字段，默认使用数据 index 作为唯一字段',
    })
    idField: (item: T) => any;
    @Prop({
      group: '样式属性',
      title: '均分宽度',
      description: '设置是否均分宽度',
      docDescription: `支持根据组件列表所占宽度自动均匀排布各项。
- 开启：默认根据组件列表宽度自动计算每一项内容宽度，宽度为 100% / 每行项数。
- 关闭：每一项内容自适应宽度。`,
      setter: {
        concept: 'SwitchSetter',
      },
    })
    equalWidth: nasl.core.Boolean = true;
    @Event({
      title: '拖拽后',
      description: '拖拽后触发。',
    })
    onDrag: (options: nasl.collection.List<any>) => any;
    @Slot({
      title: '默认',
      description: '内容自定义',
    })
    slotDefault: (current: nasl.ui.Current<T>) => Array<nasl.ui.ViewComponent>;
  }
}
