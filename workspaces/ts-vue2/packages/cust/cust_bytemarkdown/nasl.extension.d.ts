declare namespace extensions.cw_bytemarkdown.viewComponents {
  const ViewComponent: typeof nasl.ui.ViewComponent, ViewComponentOptions: typeof nasl.ui.ViewComponentOptions;
  export class ByteMarkdownEditor extends ViewComponent {
    constructor(options?: Partial<ByteMarkdownEditorOptions>);
  }
  export class ByteMarkdownEditorOptions extends ViewComponentOptions {
    /**
     * 内容
     * 显示文本
     */
    value: nasl.core.String;
    /**
     * 内容变化
     * 内容变化
     */
    onChange: (value: string) => void;
  }
  export {};
}
declare namespace extensions.cw_bytemarkdown.viewComponents {
  const ViewComponent: typeof nasl.ui.ViewComponent, ViewComponentOptions: typeof nasl.ui.ViewComponentOptions;
  export class ByteMarkdownPreview extends ViewComponent {
    constructor(options?: Partial<ByteMarkdownPreviewOptions>);
  }
  export class ByteMarkdownPreviewOptions extends ViewComponentOptions {
    /**
     * 内容
     * 显示文本
     */
    text: nasl.core.String;
    /**
     * 显示目录
     * 是否显示目录大纲
     */
    showToc: nasl.core.Boolean;
  }
  export {};
}