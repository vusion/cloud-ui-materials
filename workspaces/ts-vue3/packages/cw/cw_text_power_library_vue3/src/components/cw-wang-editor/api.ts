/// <reference types="@nasl/types" />
namespace extensions.cw_text_power_library_vue3.viewComponents {
  const { Component, Prop, ViewComponent, Method, Param, Event, ViewComponentOptions } = nasl.ui;

  @ExtensionComponent({
    type: 'both',
    ideusage: {
      idetype: 'element',
    },
  })
  @Component({
    title: '富文本',
    description: '富文本',
  })
  export class CwWangEditor extends ViewComponent {
    @Method({
      title: '取消拖拽',
      description: '取消拖拽。',
    })
    cancel(): void {}

    @Method({
      title: '导出 blob',
      description: '导出 blob',
    })
    exportToBlob(
      @Param({
        title: '导出结果',
        description: '导出结果在result.value上',
      })
      result: nasl.core.String,
    ): void {}

    @Method({
      title: '导出 docx 文件',
      description: '导出 docx 文件',
    })
    exportToDocx(
      @Param({
        title: '导出文件名',
        description: '导出文件名',
      })
      filename: nasl.core.String,
    ): void {}

    @Method({
      title: '导出 docx XML',
      description: '导出 docx 文件对应的xml片段',
    })
    exportToDocxXml(
      @Param({
        title: '导出结果',
        description: '导出结果在result.value上',
      })
      result: nasl.core.String,
    ): void {}

    constructor(options?: Partial<CwWangEditorOptions>) {
      super();
    }
  }

  export class CwWangEditorOptions extends ViewComponentOptions {
    @Prop({
      title: '内容',
      description: '需要传入的文本内容',
      setter: { concept: 'InputSetter' },
    })
    value: nasl.core.String = '';

    @Prop({
      title: '启用只读模式',
      description: '启用只读模式',
      setter: { concept: 'SwitchSetter' },
    })
    readOnly: nasl.core.Boolean = false;

    @Prop({
      title: '启用滚动',
      description: '启用滚动',
      setter: { concept: 'SwitchSetter' },
    })
    scroll: nasl.core.Boolean = true;

    @Prop({
      title: '显示docx按钮',
      description: '显示docx按钮',
      setter: { concept: 'SwitchSetter' },
    })
    showDocxButton: nasl.core.Boolean = false;

    @Prop({
      title: '输入占位符',
      description: '输入提示',
      setter: { concept: 'InputSetter' },
    })
    placeholder: nasl.core.String = '';

    @Prop({
      title: '编辑器样式',
      description: '编辑器样式CSS',
      setter: { concept: 'InputSetter' },
    })
    editorStyle: nasl.core.String = '';

    @Prop({
      title: '上传图片地址',
      description: '上传图片地址',
      setter: { concept: 'InputSetter' },
    })
    uploadImgServer: nasl.core.String = '';

    @Prop({
      title: '支持上传图片的文件类型',
      description:
        '若要限制上传文件类型，请输入类型名称，格式为".后缀名"，多个文件类型时使用英文逗号隔开。',
      setter: { concept: 'InputSetter' },
    })
    accept: nasl.core.String = '.png,.jpg,.jpeg,.webp';

    @Prop({
      title: '支持上传视频的文件类型',
      description:
        '若要限制上传文件类型，请输入类型名称，格式为".后缀名"，多个文件类型时使用英文逗号隔开。',
      setter: { concept: 'InputSetter' },
    })
    acceptVideo: nasl.core.String = '.mp4,.avi,.mov,.wmv,.mkv,.flv,.mpeg,.rmvb,.3gp,.webm';

    @Prop({
      title: 'URL 字段名',
      description: '请求返回的 URL 字段名',
      setter: { concept: 'InputSetter' },
    })
    urlField: nasl.core.String = 'filePath';

    @Prop({
      title: '使用原始URL',
      description: '控制插入图片/视频时是否直接使用服务端返回的原始URL',
      setter: { concept: 'SwitchSetter' },
    })
    viaOriginURL: nasl.core.Boolean = true;

    @Event({
      title: '内容改变时',
      description: '内容修改时触发',
    })
    onChange: (event: { value: nasl.core.String; editor: nasl.core.String }) => void;

    @Event({
      title: '上传失败时',
      description: '上传文件失败时触发',
    })
    onUploadFail: (event: { value: nasl.core.String }) => void;

    @Event({
      title: '输入时',
      description: '输入时触发',
    })
    onInput: (event: nasl.core.String) => void;
  }
}
