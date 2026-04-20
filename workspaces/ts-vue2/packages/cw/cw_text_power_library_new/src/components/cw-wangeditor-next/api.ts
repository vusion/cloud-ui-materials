/// <reference types="@nasl/types" />

namespace extensions.cw_text_power_library_new.viewComponents {
  const {
    Component,
    Prop,
    ViewComponent,
    Method,
    Param,
    Event,
    ViewComponentOptions,
  } = nasl.ui;

  /**
   * 对标 legacy cw-wang-editor 的新版富文本组件
   * 原 YAML: workspaces/legacy-yaml/packages/cw/cw_text_power_library/components/cw-wang-editor/api.yaml
   */
  @ExtensionComponent({
    type: "both",
    ideusage: {
      idetype: "element",
    },
  })
  @Component({
    title: "富文本",
    description: "富文本编辑器（新版实现，API 与旧版保持一致）",
  })
  export class CwWangeditorNext extends ViewComponent {
    constructor(options?: Partial<CwWangeditorNextOptions>) {
      super();
    }

    /** 取消拖拽 */
    @Method({
      title: "取消拖拽",
      description: "取消拖拽。",
    })
    cancel(): void {
      // 运行时由组件实现，这里只做类型声明
    }

    /** 导出 blob */
    @Method({
      title: "导出 blob",
      description: "导出 blob",
    })
    exportToBlob(
      @Param({
        title: "导出结果",
        description: "导出结果在 result.value 上",
      })
      result: { value: nasl.core.String }
    ): void {
      // 运行时由组件实现，这里只做类型声明
    }

    /** 导出 docx 文件 */
    @Method({
      title: "导出 docx 文件",
      description: "导出 docx 文件",
    })
    exportToDocx(
      @Param({
        title: "文件名",
        description: "导出文件名",
      })
      filename: nasl.core.String
    ): void {
      // 运行时由组件实现，这里只做类型声明
    }

    /** 导出 docx 对应的 XML 片段 */
    @Method({
      title: "导出 docx XML 片段",
      description: "导出 docx 文件对应的 XML 片段",
    })
    exportToDocxXml(
      @Param({
        title: "导出结果",
        description: "导出结果在 result.value 上",
      })
      result: { value: nasl.core.String }
    ): void {
      // 运行时由组件实现，这里只做类型声明
    }
  }

  export class CwWangeditorNextOptions extends ViewComponentOptions {
    /** 富文本内容（v-model） */
    @Prop({
      title: "内容",
      description: "需要传入的文本内容",
      sync: true,
      setter: {
        concept: "InputSetter",
      },
    })
    value: nasl.core.String = "";

    /** 启用只读模式 */
    @Prop({
      title: "启用只读模式",
      description: "启用只读模式",
      setter: {
        concept: "SwitchSetter",
      },
    })
    readOnly: nasl.core.Boolean = false;

    /** 启用滚动 */
    @Prop({
      title: "启用滚动",
      description: "启用滚动",
      setter: {
        concept: "SwitchSetter",
      },
    })
    scroll: nasl.core.Boolean = true;

    /** 显示 docx 按钮 */
    @Prop({
      title: "显示 docx 按钮",
      description: "显示 docx 按钮",
      setter: {
        concept: "SwitchSetter",
      },
    })
    showDocxButton: nasl.core.Boolean = false;

    /** 输入占位符 */
    @Prop({
      title: "输入占位符",
      description: "输入提示",
      setter: {
        concept: "InputSetter",
      },
    })
    placeholder: nasl.core.String = "";

    /** 编辑器样式 CSS */
    @Prop({
      title: "编辑器样式",
      description: "编辑器样式 CSS",
      setter: {
        concept: "InputSetter",
      },
    })
    editorStyle: nasl.core.String = "";

    /** 上传图片地址 */
    @Prop({
      title: "上传图片地址",
      description: "上传图片地址",
      setter: {
        concept: "InputSetter",
      },
    })
    uploadImgServer: nasl.core.String = "";

    /** 支持上传图片的文件类型 */
    @Prop({
      title: "支持上传图片的文件类型",
      description:
        "若要限制上传文件类型，请输入类型名称，格式为“.后缀名”，多个文件类型时使用英文逗号隔开。例如“.jpeg,.png,.gif”",
      setter: {
        concept: "InputSetter",
      },
    })
    accept: nasl.core.String =
      ".png,.jpg,.jpeg,.webp";

    /** 支持上传视频的文件类型 */
    @Prop({
      title: "支持上传视频的文件类型",
      description:
        "若要限制上传文件类型，请输入类型名称，格式为“.后缀名”，多个文件类型时使用英文逗号隔开。例如“.jpeg,.png,.gif”",
      setter: {
        concept: "InputSetter",
      },
    })
    acceptVideo: nasl.core.String =
      "mp4,avi,mov,wmv,mkv,flv,mpeg,rmvb,3gp,webm";

    /** URL 字段名 */
    @Prop({
      title: "URL 字段名",
      description: "请求返回的 URL 字段名",
      setter: {
        concept: "InputSetter",
      },
    })
    urlField: nasl.core.String = "filePath";

    /** 内容改变时触发 */
    @Event({
      title: "内容改变时",
      description: "内容修改时触发",
    })
    onChange: (event: {
      value: nasl.core.String;
      editor: nasl.core.String;
    }) => void;

    /** 上传失败时触发 */
    @Event({
      title: "上传失败时",
      description: "上传文件失败时触发",
    })
    onUploadFail: (event: {
      value: nasl.core.String;
    }) => void;

    /** 输入时触发 */
    @Event({
      title: "输入时",
      description: "输入时触发",
    })
    onInput: (event: {
      value: nasl.core.String;
    }) => void;
  }
}
