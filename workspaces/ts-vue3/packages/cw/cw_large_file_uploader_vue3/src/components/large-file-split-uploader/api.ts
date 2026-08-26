/// <reference types="@nasl/types" />
namespace extensions.cw_large_file_uploader_vue3.viewComponents {
  const { Component, Prop, ViewComponent, Slot, Method, Event, ViewComponentOptions } = nasl.ui;

  @ExtensionComponent({
    type: 'pc',
  })
  @Component({
    title: '大文件上传',
    description: '大文件上传',
  })
  export class LargeFileSplitUploader extends ViewComponent {
    @Method({
      title: '选择',
      description: '选择文件上传',
    })
    select(): void {}

    constructor(options?: Partial<LargeFileSplitUploaderOptions>) {
      super();
    }
  }

  export class LargeFileSplitUploaderOptions extends ViewComponentOptions {
    @Prop({
      title: '接收数据类型',
      description: '接收数据类型。可选值：`text`、`xml`、`json`',
      setter: {
        concept: 'InputSetter',
      },
    })
    dataType: nasl.core.String = 'json';

    @Prop({
      group: '交互属性',
      title: '是否可以粘贴',
      description: '',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    pastable: nasl.core.Boolean = false;

    @Prop({
      group: '数据属性',
      title: '值',
      description: '当前文件列表',
      docDescription: '当前的文件列表',
      sync: true,
      setter: {
        concept: 'InputSetter',
      },
    })
    value: nasl.core.String = '';

    @Prop({
      group: '数据属性',
      title: '上传的文件字段',
      description: '上传的文件字段名，后端需要这个字段获取',
      docDescription: '默认file，支持自定义，后端通过该字段获取文件',
      setter: {
        concept: 'InputSetter',
      },
    })
    name: nasl.core.String = 'file';

    @Prop({
      group: '数据属性',
      title: '支持上传的文件类型',
      description:
        '若要限制上传文件类型，请输入类型名称，格式为".后缀名"，多个文件类型时使用英文逗号隔开。例如".jpeg,.png,.gif"',
      docDescription:
        '支持对上传的文件类型进行限制，格式为".后缀名"，如".jpeg"表示仅支持上传jpeg格式的文件。多个文件类型时需使用英文逗号隔开，如".jpeg,.png,.gif"表示仅支持上传jpeg、png、gif格式的文件。若为空值，则支持上传所有类型的文件',
      setter: {
        concept: 'InputSetter',
      },
    })
    accept: nasl.core.String;

    @Prop({
      group: '数据属性',
      title: 'cookie值',
      description: '通过设置 withCredentials 为 true 获得的第三方 cookies，将会依旧享受同源策略',
      docDescription: '通过设置 withCredentials 为 true 获得的第三方 cookies，将会依旧享受同源策略',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    withCredentials: nasl.core.Boolean = false;

    @Prop({
      group: '数据属性',
      title: '附加数据',
      description: '',
      docDescription: '补充描述',
      setter: {
        concept: 'InputSetter',
      },
    })
    data: object;

    @Prop({
      group: '数据属性',
      title: 'URL 字段',
      description: '请求返回的 URL 字段名',
      docDescription: '请求返回的URL字段名',
      setter: {
        concept: 'InputSetter',
      },
    })
    urlField: nasl.core.String = 'url';

    @Prop({
      group: '主要属性',
      title: '请求 headers',
      description: '',
      docDescription: '请求头',
      setter: {
        concept: 'InputSetter',
      },
    })
    headers: Object;

    @Prop<LargeFileSplitUploaderOptions, 'converter'>({
      group: '主要属性',
      title: '转换器',
      description: '',
      docDescription: '支持使用JSON或URL字符串',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: 'JSON', value: 'json' },
          { title: 'URL字符串', value: 'simple' },
        ],
      },
    })
    converter: 'json' | 'simple' = 'json';

    @Prop<LargeFileSplitUploaderOptions, 'display'>({
      group: '主要属性',
      title: '展示方式',
      description: '行内展示，或块级换行展示',
      docDescription: '支持行内展示或块级换行展示',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: '行内展示', value: 'inline' },
          { title: '块级展示，宽度会充满父元素', value: 'block' },
        ],
      },
    })
    display: 'inline' | 'block' = 'block';

    @Prop({
      group: '主要属性',
      title: '辅助文本',
      description: '辅助说明的文本信息，如上传的数量、大小等，在上传组件下方展示。',
      docDescription: '在上传组件下方展示一些提示信息，如上传的数量、大小等，默认为null',
      setter: {
        concept: 'InputSetter',
      },
    })
    description: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '报错信息',
      description: '设置是否展示上传时的出错信息，如超出数量、大小',
      docDescription: '是否展示上传时的出错信息，如超出数量、大小',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    showErrorMessage: nasl.core.Boolean = true;

    @Prop({
      group: '主要属性',
      title: '辅助文本',
      description: '辅助说明的文本信息',
      docDescription: '拖拽位置的文字指引',
      setter: {
        concept: 'InputSetter',
      },
    })
    dragDescription: nasl.core.String = '点击/拖动/粘贴文件到这里';

    @Prop<LargeFileSplitUploaderOptions, 'access'>({
      group: '主要属性',
      title: '文件访问策略',
      description: '',
      docDescription: '支持任何人可访问和用户登录后可访问两种方式',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: '任何人可访问', value: 'public' },
          { title: '用户登录后可访问', value: 'private' },
        ],
      },
    })
    access: 'public' | 'private';

    @Prop({
      group: '交互属性',
      title: '可拖拽',
      description: '',
      docDescription: '开启后支持拖拽上传文件，默认关闭',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    draggable: nasl.core.Boolean = false;

    @Prop({
      group: '状态属性',
      title: '只读',
      description: '正常显示，但禁止选择/输入',
      docDescription: '正常显示，但禁止选择或输入',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    readonly: nasl.core.Boolean = false;

    @Prop({
      group: '状态属性',
      title: '禁用',
      description: '置灰显示，且禁止任何交互（焦点、点击、选择、输入等）',
      docDescription: '置灰显示，且禁止任何交互（焦点、点击、选择、输入等）',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    disabled: nasl.core.Boolean = false;

    @Prop({
      title: '源地址访问',
      description: '',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    viaOriginURL: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '多文件上传',
      description: '',
      docDescription: '开启后可上传多个文件，默认关闭，多文件可设置数量上限',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    multiple: nasl.core.Boolean = false;

    @Prop({
      group: '数据属性',
      title: '上传地址',
      description: '上传地址',
      setter: {
        concept: 'InputSetter',
      },
    })
    url: nasl.core.String;

    @Prop({
      title: 'Authorization',
      description: '是否携带 Authorization 请求头',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    authorization: nasl.core.Boolean = true;

    @Event({
      title: '上传前',
      description: '上传前触发',
    })
    onBeforeUpload: (event: {
      file?: {};
      preventDefault?: () => void;
    }) => void;

    @Event({
      title: '进度改变时',
      description: '发送进度改变时触发，在上传进度条时使用',
    })
    onProgress: (event: {
      e: {};
      file: {};
      item: {};
      xhr: {};
    }) => void;

    @Event({
      title: '上传成功时',
      description: '上传成功时触发',
    })
    onSuccess: (event: {
      res: {};
      file: {};
      item: {};
      xhr: {};
    }) => void;

    @Event({
      title: '上传错误时',
      description: '上传报错时触发',
    })
    onError: (event: {
      e: {};
      file: {};
      item: {};
      xhr: {};
    }) => void;

    @Event({
      title: '删除时',
      description: '点击删除按钮时触发',
    })
    onRemove: (event: {
      value: {};
      item: {};
    }) => void;

    @Slot({
      title: 'undefined',
      description: '插入文本 或 HTML。',
    })
    slotDefault: () => Array<nasl.ui.ViewComponent>;
  }
}
