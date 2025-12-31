/// <reference types="@nasl/types" />
/// <reference types="../../../.lcap/lcap-ui/runtime/nasl.ui.d.ts" />
namespace extensions.cw_form_designer_library.viewComponents {
  const {
    Component,
    Prop,
    ViewComponent,
    Slot,
    Method,
    Param,
    Event,
    ViewComponentOptions
  } = nasl.ui;
  @ExtensionComponent({
    type: "pc",
    show: true,
    ideusage: {
      "idetype": "container",
      "additionalAttribute": {
        ":showInDesigner": true
      },
      "slotWrapperInlineStyle": {
        "file-list": "display:flex"
      },
      "displaySlotConditions": {
        "dragDescription": false
      },
      "disableSlotAutoFill": [{
        "slot": "file-list",
        "expression": "!this.getElement(el => el.slotTarget === 'file-list')"
      }]
    }
  })
  @Component({
    title: '文件上传',
    icon: 'uploader',
    description: '通过点击或者拖拽上传文件。',
    group: 'Form'
  })
  export class ExUUploader extends ViewComponent {
    @Prop({
      title: '值'
    })
    value: ExUUploaderOptions['value'];
    @Prop({
      title: '上传地址'
    })
    url: ExUUploaderOptions['url'];
    @Prop({
      title: '禁用'
    })
    disabled: nasl.core.Boolean;
    @Prop({
      title: '只读'
    })
    readonly: nasl.core.Boolean;
    @Prop({
      title: '预览'
    })
    preview: nasl.core.Boolean;
    @Method({
      title: '选择',
      description: '选择文件上传'
    })
    select(): void {}
    constructor(options?: Partial<ExUUploaderOptions>) {
      super();
    }
  }
  export class ExUUploaderOptions extends ViewComponentOptions {
    @Prop({
      title: '接收数据类型',
      description: '接收数据类型。可选值：`text`、`xml`、`json`'
    })
    private dataType: nasl.core.String = 'json';
    @Prop({
      group: '数据属性',
      title: '值',
      description: '当前文件列表',
      sync: true,
      docDescription: '当前的文件列表',
      settable: true
    })
    value: nasl.core.String;
    @Prop({
      group: '数据属性',
      title: '存储方式',
      description: "",
      bindHide: true
    })
    fileConnectionGroup: () => any;
    @Prop({
      group: '高级属性',
      title: '上传地址',
      description: '上传的 URL 地址',
      docDescription: '文件上传的URL地址，如/upload',
      settable: true
    })
    url: nasl.core.String;
    @Prop({
      group: '高级属性',
      title: '上传的文件字段',
      description: '上传的文件字段名，后端需要这个字段获取',
      docDescription: '默认file，支持自定义，后端通过该字段获取文件'
    })
    name: nasl.core.String = 'file';
    @Prop({
      group: '数据属性',
      title: '支持上传的文件类型',
      description: '若要限制上传文件类型，请输入类型名称，格式为“.后缀名”，多个文件类型时使用英文逗号隔开。例如“.jpeg,.png,.gif”',
      tooltipLink: 'http://help.lcap.163yun.com/1.%E5%BC%80%E5%8F%91%E5%BA%94%E7%94%A8/2.%E9%A1%B5%E9%9D%A2/05.PC%E9%A1%B5%E9%9D%A2%E5%9F%BA%E7%A1%80%E7%BB%84%E4%BB%B6/06.%E8%A1%A8%E5%8D%95/150.%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0.html#%E7%BB%84%E4%BB%B6%E8%AF%B4%E6%98%8E',
      docDescription: '支持对上传的文件类型进行限制，格式为“.后缀名”，如“.jpeg”表示仅支持上传jpeg格式的文件。多个文件类型时需使用英文逗号隔开，如“.jpeg,.png,.gif”表示仅支持上传jpeg、png、gif格式的文件。若为空值，则支持上传所有类型的文件',
      setter: {
        concept: 'InputSetter',
        placeholder: '所有类型'
      }
    })
    accept: nasl.core.String;
    @Prop({
      group: '高级属性',
      title: 'cookie值',
      description: '通过设置 withCredentials 为 true 获得的第三方 cookies，将会依旧享受同源策略',
      docDescription: '通过设置 withCredentials 为 true 获得的第三方 cookies，将会依旧享受同源策略',
      setter: {
        concept: 'SwitchSetter'
      }
    })
    withCredentials: nasl.core.Boolean = false;
    @Prop({
      group: '高级属性',
      title: '附加数据',
      docDescription: '补充描述'
    })
    data: object;
    @Prop({
      group: '高级属性',
      title: '列表数量上限',
      docDescription: '列表数量上限，默认为999',
      setter: {
        concept: 'NumberInputSetter',
        precision: 0
      }
    })
    limit: nasl.core.Integer;
    @Prop({
      group: '数据属性',
      title: '最大文件大小',
      description: '可上传的最大文件大小。默认为50MB；如果为数字，则表示单位为字节；如果为字符串，可以添加以下单位：`KB`、`MB`、`GB`',
      docDescription: '可上传的最大文件大小。默认50MB；如果为数字，则表示单位为字节；如果为字符串，可以添加以下单位kB、MB、GB',
      implicitToString: true
    })
    maxSize: nasl.core.String;
    @Prop<ExUUploaderOptions, 'listType'>({
      group: '高级属性',
      title: '列表类型',
      docDescription: '列表的展示类型，支持使用文本、图片和卡片',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{
          title: '文本'
        }, {
          title: '图片'
        }, {
          title: '卡片'
        }]
      },
      onChange: [{
        clear: ['showFileList'],
        if: _ => _ === 'card'
      }]
    })
    listType: 'text' | 'image' | 'card' = 'text';
    @Prop({
      group: '高级属性',
      title: 'URL 字段',
      description: '请求返回的 URL 字段名',
      docDescription: '请求返回的URL字段名'
    })
    urlField: nasl.core.String = 'url';
    @Prop<ExUUploaderOptions, 'fileIconSwitcher'>({
      group: '高级属性',
      title: '文件图标',
      description: '是否展示文件图标',
      docDescription: '是否展示文件图标',
      setter: {
        concept: 'SwitchSetter'
      },
      if: _ => _.listType === 'text'
    })
    fileIconSwitcher: nasl.core.Boolean = true;
    @Prop({
      title: 'undefined'
    })
    private iconMap: Object = {
      'doc|docx': 'file-doc',
      'jpg|jpeg|png|bmp|gif|tiff|tif|webp|svg|psd|raw': 'file-jpg',
      pdf: 'file-pdf',
      xlsx: 'file-xlxs',
      txt: 'file-txt',
      'ppt|pptx': 'file-ppt',
      zip: 'file-zip',
      csv: 'file-csv'
    };
    @Prop<ExUUploaderOptions, 'fileType'>({
      group: '高级属性',
      title: '文件类型',
      docDescription: '列表的展示类型，支持使用文本、图片和卡片',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{
          title: '文档'
        }, {
          title: '图片'
        }, {
          title: 'PDF'
        }, {
          title: '表格'
        }, {
          title: '文本'
        }, {
          title: '幻灯片'
        }, {
          title: '压缩包'
        }, {
          title: 'CSV'
        }]
      },
      if: _ => _.fileIconSwitcher === true && _.listType === 'text'
    })
    fileType: 'doc|docx' | 'jpg|jpeg|png|bmp|gif|tiff|tif|webp|svg|psd|raw' | 'pdf' | 'xlsx' | 'txt' | 'ppt|pptx' | 'zip' | 'csv' = 'doc|docx';
    @Prop<ExUUploaderOptions, 'fileIcon'>({
      group: '高级属性',
      title: '文件图标',
      docDescription: '支持从图标库选择图标或上传自定义图标。',
      setter: {
        concept: 'IconSetter',
        title: '选择文件图标'
      },
      if: _ => _.fileIconSwitcher === true && _.listType === 'text'
    })
    fileIcon: nasl.core.String;
    @Prop<ExUUploaderOptions, 'downloadIconSwitcher'>({
      group: '高级属性',
      title: '下载图标',
      description: '是否展示下载图标',
      docDescription: '是否展示下载图标',
      setter: {
        concept: 'SwitchSetter'
      },
      if: _ => _.listType === 'text'
    })
    downloadIconSwitcher: nasl.core.Boolean = true;
    @Prop<ExUUploaderOptions, 'downloadIcon'>({
      group: '高级属性',
      title: '下载图标',
      setter: {
        concept: 'IconSetter'
      },
      if: _ => _.downloadIconSwitcher === true && _.listType === 'text'
    })
    downloadIcon: nasl.core.String = 'download';
    @Prop<ExUUploaderOptions, 'fileSize'>({
      group: '高级属性',
      title: '文件大小',
      description: '是否展示文件大小，单位小于1MB则展示KB，大于1MB则展示MB。',
      docDescription: '是否展示文件大小',
      setter: {
        concept: 'SwitchSetter'
      },
      if: _ => _.listType === 'text'
    })
    fileSize: nasl.core.Boolean = true;
    @Prop({
      group: '高级属性',
      title: '请求 headers',
      docDescription: '请求头'
    })
    headers: Object;
    @Prop({
      group: '主要属性',
      title: '多文件上传',
      docDescription: '开启后可上传多个文件，默认关闭，多文件可设置数量上限',
      setter: {
        concept: 'SwitchSetter'
      }
    })
    multiple: nasl.core.Boolean = false;
    @Prop<ExUUploaderOptions, 'multipleOnce'>({
      group: '主要属性',
      title: '调用一次节点上传多个文件',
      description: '利用原生 multipart/form-data 传输多个文件的能力，一次性上传多个文件',
      docDescription: '开启后支持一次性上传多个文件',
      setter: {
        concept: 'SwitchSetter'
      },
      if: _ => _.multiple === true
    })
    multipleOnce: nasl.core.Boolean = false;
    @Prop<ExUUploaderOptions, 'openCropper'>({
      group: '高级属性',
      title: '启用图片裁剪',
      description: '设置是否启用图片裁剪功能，只对单文件上传有效',
      docDescription: '开启后支持对选择的图片进行裁剪后上传',
      setter: {
        concept: 'SwitchSetter'
      },
      if: _ => !_.multiple,
      settable: false
    })
    openCropper: nasl.core.Boolean = false;
    @Prop<ExUUploaderOptions, 'fixedCropper'>({
      group: '高级属性',
      title: '固定图片裁剪框大小',
      setter: {
        concept: 'SwitchSetter'
      },
      if: _ => _.openCropper === true && _.multiple !== true
    })
    fixedCropper: nasl.core.Boolean = false;
    @Prop<ExUUploaderOptions, 'cropperBoxWidth'>({
      group: '高级属性',
      title: '图片裁剪框宽度',
      setter: {
        concept: 'NumberInputSetter'
      },
      if: _ => _.openCropper === true && _.multiple !== true
    })
    cropperBoxWidth: nasl.core.Decimal | nasl.core.Integer = 200;
    @Prop<ExUUploaderOptions, 'cropperBoxHeight'>({
      group: '高级属性',
      title: '图片裁剪框高度',
      setter: {
        concept: 'NumberInputSetter'
      },
      if: _ => _.cropperPreviewShape === 'rect' && _.openCropper === true && _.multiple !== true
    })
    cropperBoxHeight: nasl.core.Decimal | nasl.core.Integer = 0;
    @Prop<ExUUploaderOptions, 'cropperPreviewShape'>({
      group: '高级属性',
      title: '图片裁剪框预览形状',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{
          title: '矩形'
        }, {
          title: '正方形'
        }, {
          title: '圆形'
        }]
      },
      onChange: [{
        update: {
          cropperBoxHeight: 200
        },
        if: _ => _ === 'rect'
      }, {
        update: {
          cropperBoxHeight: 0
        },
        if: _ => _ === 'circle'
      }, {
        update: {
          cropperBoxHeight: 0
        },
        if: _ => _ === 'square'
      }],
      if: _ => _.openCropper === true && _.multiple !== true
    })
    cropperPreviewShape: 'rect' | 'square' | 'circle' = 'circle';
    @Prop<ExUUploaderOptions, 'cropperTitle'>({
      group: '高级属性',
      title: '图片裁剪框标题',
      if: _ => _.openCropper === true && _.multiple !== true,
      implicitToString: true
    })
    cropperTitle: nasl.core.String = '图片裁剪';
    @Prop({
      group: '主要属性',
      title: '自动上传',
      docDescription: '开启后选择文件后会自动上传，默认开启',
      setter: {
        concept: 'SwitchSetter'
      }
    })
    private autoUpload: nasl.core.Boolean = true;
    @Prop<ExUUploaderOptions, 'showFileList'>({
      group: '高级属性',
      title: '显示文件列表',
      docDescription: '开启后上传多个文件时，会显示文件列表，默认开启',
      setter: {
        concept: 'SwitchSetter'
      },
      if: _ => _.listType !== 'card'
    })
    showFileList: nasl.core.Boolean = true;
    @Prop({
      group: '高级属性',
      title: '转换器',
      docDescription: '支持使用JSON或URL字符串',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{
          title: 'JSON'
        }, {
          title: 'URL字符串'
        }]
      }
    })
    converter: 'json' | 'simple' = 'json';
    @Prop({
      group: '高级属性',
      title: '展示方式',
      description: '行内展示，或块级换行展示',
      docDescription: '支持行内展示或块级换行展示',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{
          title: '行内展示'
        }, {
          title: '块级展示，宽度会充满父元素'
        }]
      }
    })
    display: 'inline' | 'block' = 'block';
    @Prop({
      group: '主要属性',
      title: '辅助文本',
      description: '辅助说明的文本信息，如上传的数量、大小等，在上传组件下方展示。',
      docDescription: '在上传组件下方展示一些提示信息，如上传的数量、大小等，默认为null',
      implicitToString: true
    })
    description: nasl.core.String;
    @Prop({
      group: '主要属性',
      title: '报错信息',
      description: '设置是否展示上传时的出错信息，如超出数量、大小',
      docDescription: '是否展示上传时的出错信息，如超出数量、大小',
      setter: {
        concept: 'SwitchSetter'
      }
    })
    showErrorMessage: nasl.core.Boolean = true;
    @Prop({
      group: '高级属性',
      title: '辅助文本',
      description: '辅助说明的文本信息',
      docDescription: '拖拽位置的文字指引',
      implicitToString: true
    })
    dragDescription: nasl.core.String = '点击/拖动文件到这里';
    @Prop({
      group: '主要属性',
      title: '文件校验',
      description: '文件校验函数，可自定义校验规则，如文件名称包含特殊字符等，返回string类型的出错信息',
      docDescription: '文件校验函数，可自定义校验规则，如文件名称包含特殊字符等，返回string类型的出错信息',
      setter: {
        concept: 'AnonymousFunctionSetter'
      },
      bindOpen: true
    })
    checkFile: (file: nasl.ui.File) => nasl.core.String;
    @Prop({
      group: '主要属性',
      title: '文件访问策略',
      docDescription: '支持任何人可访问和用户登录后可访问两种方式',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{
          title: '任何人可访问'
        }, {
          title: '用户登录后可访问'
        }]
      }
    })
    access: 'public' | 'private';
    @Prop({
      group: '高级属性',
      title: '文件有效期',
      description: '是否开启文件有效期控制',
      docDescription: '支持配置文件自动清理，开启后可自定义上传后有效天数',
      setter: {
        concept: 'SwitchSetter'
      }
    })
    ttl: nasl.core.Boolean;
    @Prop<ExUUploaderOptions, 'ttlValue'>({
      group: '高级属性',
      title: '上传后有效天数',
      description: '文件上传后的有效期天数',
      docDescription: '开启文件有效期开关后显示，可配置文件自动清理的时间',
      setter: {
        concept: 'NumberInputSetter'
      },
      if: _ => _.ttl === true
    })
    ttlValue: nasl.core.Decimal | nasl.core.Integer;
    @Prop({
      group: '高级属性',
      title: '源地址访问',
      description: '开启后支持通过文件存储源地址访问文件',
      docDescription: '开启后支持通过文件存储源地址访问文件',
      setter: {
        concept: 'SwitchSetter'
      }
    })
    viaOriginURL: nasl.core.Boolean;
    @Prop({
      group: '主要属性',
      title: '启用压缩',
      description: '启用压缩后上传的文件按压缩规则进行压缩后上传，压缩规则可在自定义配置参数管理',
      docDescription: '启用压缩后上传的文件按压缩规则进行压缩后上传，压缩规则可在自定义配置参数管理',
      setter: {
        concept: 'SwitchSetter'
      }
    })
    lcapIsCompress: nasl.core.Boolean;
    @Prop<ExUUploaderOptions, 'previewIcon'>({
      group: '主要属性',
      title: '预览图标',
      description: '预览图标',
      docDescription: '预览图标',
      setter: {
        concept: 'IconSetter'
      },
      if: _ => _.listType === 'card'
    })
    previewIcon: nasl.core.String;
    @Prop<ExUUploaderOptions, 'addIcon'>({
      group: '主要属性',
      title: '添加图标',
      description: '添加图标',
      docDescription: '添加图标',
      setter: {
        concept: 'IconSetter'
      },
      if: _ => _.listType === 'card'
    })
    addIcon: nasl.core.String = 'add';
    @Prop<ExUUploaderOptions, 'uploadIcon'>({
      group: '主要属性',
      title: '上传图标',
      description: '上传图标',
      docDescription: '上传图标',
      setter: {
        concept: 'IconSetter'
      },
      if: _ => _.draggable === true
    })
    uploadIcon: nasl.core.String;
    @Prop({
      group: '主要属性',
      title: '删除图标',
      description: '删除图标',
      docDescription: '删除图标',
      setter: {
        concept: 'IconSetter'
      }
    })
    removeIcon: nasl.core.String = 'remove';
    @Prop({
      group: '交互属性',
      title: '可拖拽',
      docDescription: '开启后支持拖拽上传文件，默认关闭',
      setter: {
        concept: 'SwitchSetter'
      }
    })
    draggable: nasl.core.Boolean = false;
    @Prop<ExUUploaderOptions, 'pastable'>({
      group: '交互属性',
      title: '是否可以粘贴',
      description: '开启后支持粘贴上传文件，默认关闭',
      docDescription: '开启后支持粘贴上传文件，默认关闭',
      setter: {
        concept: 'SwitchSetter'
      },
      if: _ => _.draggable === true
    })
    pastable: nasl.core.Boolean = false;
    @Prop({
      group: '状态属性',
      title: '只读',
      description: '正常显示，但禁止选择/输入',
      docDescription: '正常显示，但禁止选择或输入',
      setter: {
        concept: 'SwitchSetter'
      },
      settable: true
    })
    readonly: nasl.core.Boolean = false;
    @Prop({
      group: '状态属性',
      title: '禁用',
      description: '置灰显示，且禁止任何交互（焦点、点击、选择、输入等）',
      docDescription: '置灰显示，且禁止任何交互（焦点、点击、选择、输入等）',
      setter: {
        concept: 'SwitchSetter'
      },
      settable: true
    })
    disabled: nasl.core.Boolean = false;
    @Prop({
      group: '状态属性',
      title: '预览',
      description: '显示预览态',
      docDescription: '',
      setter: {
        concept: 'SwitchSetter'
      },
      settable: true
    })
    preview: nasl.core.Boolean = false;
    @Event({
      title: '上传前',
      description: '上传前触发'
    })
    onBeforeUpload: (event: {
      file: nasl.core.String;
    }) => any;
    @Event({
      title: '进度改变时',
      description: '发送进度改变时触发，在上传进度条时使用'
    })
    onProgress: (event: {
      item: nasl.ui.File;
      file: nasl.core.String;
    }) => any;
    @Event({
      title: '文件数量超额',
      description: '文件数量超额时触发'
    })
    onCountExceed: (event: {
      files: nasl.collection.List<nasl.ui.File>;
      value: {
        url: nasl.core.String;
        name: nasl.core.String;
      };
      count: nasl.core.Integer;
      limit: nasl.core.Integer;
      message: nasl.core.String;
    }) => any;
    @Event({
      title: '文件大小超额',
      description: '文件大小超额时触发'
    })
    onSizeExceed: (event: {
      maxSize: nasl.core.Decimal | nasl.core.Integer;
      size: nasl.core.Decimal | nasl.core.Integer;
      message: nasl.core.String;
      name: nasl.core.String;
      file: nasl.ui.File;
    }) => any;
    @Event({
      title: '上传成功时',
      description: '上传成功时触发'
    })
    onSuccess: (event: {
      item: nasl.ui.File;
      file: nasl.core.String;
    }) => any;
    @Event({
      title: '上传错误时',
      description: '上传报错时触发'
    })
    onError: (event: {
      item: nasl.ui.File;
      file: nasl.core.String;
    }) => any;
    @Event({
      title: '删除时',
      description: '点击删除按钮时触发'
    })
    onRemove: (event: {
      value: {
        url: nasl.core.String;
        name: nasl.core.String;
      };
      item: nasl.ui.File;
      index: nasl.core.Integer;
    }) => any;
    @Slot({
      title: 'undefined',
      description: '插入文本 或 HTML。'
    })
    slotDefault: () => Array<nasl.ui.ViewComponent>;
    @Slot({
      title: '文件列表',
      description: '文件列表。'
    })
    'slot-file-list': () => Array<nasl.ui.ViewComponent>;
    slotFileList: () => Array<nasl.ui.ViewComponent>; // 防止 ide 编译报错

    @Slot({
      title: '拖拽文字',
      description: '拖拽文字自定义'
    })
    slotDragDescription: () => Array<nasl.ui.ViewComponent>;
  }
}