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
    title: 'markdown编辑器',
    description: 'markdown编辑器',
  })
  export class ByteMarkdownEditor extends ViewComponent {
    constructor(options?: Partial<ByteMarkdownEditorOptions>) {
      super();
    }
  }

  export class ByteMarkdownEditorOptions extends ViewComponentOptions {
     @Prop({
      title: '内容',
      description: '显示文本',
      sync: true,
      setter: {
        concept: 'InputSetter'
      }
    })
    value: nasl.core.String = '';

    @Event({
      title: '内容变化',
      description: '内容变化',
    })
    onChange: (value: string) => void;
  }
}