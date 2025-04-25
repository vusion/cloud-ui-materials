/// <reference types="@nasl/types" />
namespace extensions.yun_shang_primary.viewComponents {
  const { Component, Prop, ViewComponent, Slot, Method, Event, ViewComponentOptions } = nasl.ui;
  type ViewComponent = nasl.ui.ViewComponent;

  @ExtensionComponent({
    type: 'pc',
    ideusage: {
      idetype: 'container',
    },
  })
  @Component({
    title: '云商上传组件',
    description: '云商上传组件',
  })
  export class YunShangUploader extends ViewComponent {
    constructor(options?: Partial<YunShangUploaderOptions>) {
      super();
    }
  }

  export class YunShangUploaderOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: '值',
      docDescription: '上传组件值',
      setter: {
        concept: 'InputSetter',
      },
    })
    value: nasl.collection.List<any> = [];

    @Prop({
      group: '主要属性',
      title: '可接受的文件类型',
      docDescription: '数组，形如 [“wav”]',
      setter: {
        concept: 'InputSetter',
      },
    })
    allowedExtensions: nasl.collection.List<any> = ['wav'];

    @Prop({
      group: '主要属性',
      title: '显示上传列表',
      docDescription: '开启后上传多个文件时，会显示文件列表，默认开启',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    showFileList: nasl.core.Boolean = true;

    @Prop({
      group: '数据属性',
      title: '支持上传的文件类型',
      description: '若要限制上传文件类型，请输入类型名称，格式为“.后缀名”，多个文件类型时使用英文逗号隔开。例如“.jpeg,.png,.gif”',
      setter: {
        concept: 'InputSetter',
        placeholder: '请输入支持上传的文件类型',
      },
    })
    acceptMime: nasl.core.String;

    @Event({
      title: '上传成功时',
      description: '上传成功时触发',
    })
    onSuccess: (event: {
      url: nasl.core.String;
      sourceUrl: nasl.core.String;
      name: nasl.core.String;
      size: nasl.core.Integer;
      type: nasl.core.String;
      uploadType: nasl.core.String;
      width: nasl.core.Integer;
      height: nasl.core.Integer;
      nosFileName: nasl.core.String;
      duration: nasl.core.Integer;
    }) => any;

    @Event({
      title: '上传错误时',
      description: '上传报错时触发',
    })
    onError: (event: { error: nasl.core.String }) => any;

    @Event({
      title: '删除时',
      description: '点击删除按钮时触发',
    })
    onRemove: (event: { name: nasl.core.String; status: nasl.core.String; type: nasl.core.String }) => any;

    @Slot({
      title: '内容',
      description: '内容',
    })
    slotDefault: () => Array<ViewComponent>;

    @Slot({
      title: '错误提示',
      description: '错误提示',
    })
    slotError: () => Array<ViewComponent>;
  }
}
