/// <reference types="@nasl/types" />
namespace extensions.cust_zrzyt_fujian_library.viewComponents {
  const { Component, Prop, ViewComponent, Slot, Method, Param, Event, ViewComponentOptions } = nasl.ui;
  type ViewComponent = nasl.ui.ViewComponent;

  @ExtensionComponent({
    type: 'both',
    ideusage: {
      idetype: 'container',
    },
  })
  @Component({
    title: '打印组件',
    description: '打印组件',
  })
  export class LodopPrint extends ViewComponent {
    @Method({
      title: '打印',
      description: '打印',
    })
    print(): void {}

    constructor(options?: Partial<LodopPrintOptions>) {
      super();
    }
  }

  export class LodopPrintOptions extends ViewComponentOptions {
    @Prop({
      title: '打印标题',
      description: '打印标题',
      setter: {
        concept: 'InputSetter',
      },
    })
    title: nasl.core.String = '';

    @Prop({
      title: '打印模式',
      description: '选择打印的模式,支持打印预览(preview)、直接打印(direct)、选择打印机(select)、打印维护(maintain)、打印设计(design)',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          {
            title: '打印预览',
          },
          {
            title: '直接打印',
          },
          {
            title: '选择打印机',
          },
          {
            title: '打印维护',
          },
          {
            title: '打印设计',
          },
        ],
      },
    })
    mode: 'preview' | 'direct' | 'select' | 'maintain' | 'design' = 'preview';

    @Prop({
      title: '打印区域上边距',
      description: '打印区域距离页面顶部的距离',
      setter: {
        concept: 'InputSetter',
      },
    })
    intTop: nasl.core.String | nasl.core.Decimal | nasl.core.Integer  = 0;

    @Prop({
      title: '打印区域左边距',
      description: '打印区域距离页面左侧的距离',
      setter: {
        concept: 'InputSetter',
      },
    })
    intLeft: nasl.core.String | nasl.core.Decimal | nasl.core.Integer  = 0;

    @Prop({
      title: '打印区域宽度',
      description: '打印区域的宽度',
      setter: {
        concept: 'InputSetter',
      },
    })
    intWidth: nasl.core.String = '100%';

    @Prop({
      title: '打印区域高度',
      description: '打印区域的高度',
      setter: {
        concept: 'InputSetter',
      },
    })
    intHeight: nasl.core.String = '100%';


    @Slot({
      title: '内容',
      description: '内容',
    })
    slotDefault: () => Array<ViewComponent>;
  }
}
