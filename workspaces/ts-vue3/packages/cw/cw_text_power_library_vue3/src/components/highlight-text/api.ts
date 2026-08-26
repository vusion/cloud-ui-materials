/// <reference types="@nasl/types" />
namespace extensions.cw_text_power_library_vue3.viewComponents {
  const { Component, Prop, ViewComponent, Event, ViewComponentOptions } = nasl.ui;

  @ExtensionComponent({
    type: 'pc',
    ideusage: {
      idetype: 'element',
    },
  })
  @Component({
    title: '高亮文本',
    description: '高亮文本',
  })
  export class HighlightText extends ViewComponent {
    constructor(options?: Partial<HighlightTextOptions>) {
      super();
    }
  }

  export class HighlightTextOptions extends ViewComponentOptions {
    @Prop({
      title: '需要展示的内容',
      description: '需要展示的内容',
      setter: { concept: 'InputSetter' },
    })
    content: nasl.core.String = '';

    @Prop({
      title: '高亮关键字',
      description: '高亮关键字',
      setter: { concept: 'InputSetter' },
    })
    text: nasl.core.String = '';

    @Prop({
      title: '点击标识数据',
      description: '点击标识数据',
      setter: { concept: 'InputSetter' },
    })
    link: nasl.core.String = '';

    @Event({
      title: '选择后',
      description: '选择某一项时触发',
    })
    onClick: (event: nasl.core.String) => void;
  }
}
