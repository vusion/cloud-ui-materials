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
    title: '栅格布局',
    description: '栅格布局',
  })
  export class CwAntdGrid extends ViewComponent {
    constructor(options?: Partial<CwAntdGridOptions>) {
      super();
    }
  }

  export class CwAntdGridOptions extends ViewComponentOptions {
    @Prop({
      title: '行数',
      description: '行数',
      setter: {
        concept: 'NumberInputSetter',
        min: 1,
      }
    })
    rows: nasl.core.Integer = 3;

    @Prop({
      title: '列数',
      description: '列数',
      setter: {
        concept: 'NumberInputSetter',
        min: 1,
      }
    })
    columns: nasl.core.Integer = 4;

    // @Prop({
    //   title: '布局模式',
    //   description: '布局模式',
    //   setter: {
    //     concept: 'InputSetter',
    //   }
    // })
    // gridType: nasl.core.String = '';

    // @Prop({
    //   title: '垂直对齐方式',
    //   description: 'flex 布局下的垂直对齐方式: top middle bottom',
    //   setter: {
    //     concept: 'EnumSelectSetter',
    //     options: [{ title: '顶部' }, { title: '居中' }, { title: '底部' }]
    //   }
    // })
    // align: 'top' | 'middle' | 'bottom' = 'top';

    // @Prop({
    //   title: '水平对齐方式',
    //   description: 'flex 布局下的水平对齐方式: left center right',
    //   setter: {
    //     concept: 'EnumSelectSetter',
    //     options: [{ title: '开始' }, { title: '结束' }, { title: '居中' }, { title: '两端对齐' }, { title: '分散对齐' }]
    //   }
    // })
    // justify: 'start' | 'end' | 'center' | 'space-around' | 'spance-between' = 'start';

    // @Prop({
    //   title: '间距',
    //   description: '间距',
    //   setter: {
    //     concept: 'NumberInputSetter',
    //   }
    // })
    // gutter: nasl.core.Integer = 0;
  }
}
