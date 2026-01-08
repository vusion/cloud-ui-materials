/// <reference types="@nasl/types" />
namespace extensions.cw_bytemarkdown.viewComponents {
  const { Component, Prop, ViewComponent, Slot, Method, Event, ViewComponentOptions } = nasl.ui;

  @ExtensionComponent({
    type: 'both',
    ideusage: {
      idetype: 'element',
    }
  })
  @Component({
    title: 'markdown渲染组件',
    description: 'markdown渲染组件',
  })
  export class ByteMarkdownPreview extends ViewComponent {
    constructor(options?: Partial<ByteMarkdownPreviewOptions>) {
      super();
    }
  }

  export class ByteMarkdownPreviewOptions extends ViewComponentOptions {
     @Prop({
      title: '内容',
      description: '显示文本',
      setter: {
        concept: 'InputSetter'
      }
    })
    text: nasl.core.String = '';

    @Prop({
      title: '显示目录',
      description: '是否显示目录大纲',
      setter: {
        concept: 'SwitchSetter'
      }
    })
    showToc: nasl.core.Boolean = false;
  }
}