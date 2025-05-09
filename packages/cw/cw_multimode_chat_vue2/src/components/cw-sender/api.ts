/// <reference types="@nasl/types" />
namespace extensions.cw_antd_x_vue_2.viewComponents {
  const { Component, Prop, ViewComponent, Slot, Method, Event, ViewComponentOptions } = nasl.ui;

  @ExtensionComponent({
    type: 'both',
    ideusage: {
      idetype: 'container',
    }
  })
  @Component({
    title: '输入框',
    description: '输入框',
  })
  export class CwSender extends ViewComponent {
    constructor(options?: Partial<CwSenderOptions>) {
      super();
    }

    @Prop({
      title: '当前输入框的值',
    })
    value: nasl.core.String;

    @Prop({
      title: '文件列表',
    })
    fileList: nasl.collection.List<{
      name: nasl.core.String;
      percent: nasl.core.Decimal;
      size: nasl.core.Integer;
      status: 'success' | 'fail' | 'progress' | 'waiting';
      type: nasl.core.String;
      url: nasl.core.String;
      originFileObj: File;
    }>;
  }

  export class CwSenderOptions extends ViewComponentOptions {
    @Prop({
      group: '数据属性',
      title: '值',
      description: '当前输入框的值',
      sync: true,
      docDescription: '当前输入框的值',
    })
    value: nasl.core.String;

    @Prop({
      group: '数据属性',
      title: '是否支持上传附件',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    supportAttachment: nasl.core.Boolean = true;

    @Prop<CwSenderOptions, 'fileList'>({
      group: '数据属性',
      title: '文件列表值',
      description: '当前已上传的文件列表的值',
      sync: true,
      docDescription: '当前已上传的文件列表的值',
      if: (_) => _.supportAttachment === true,
    })
    fileList: nasl.collection.List<{
      name: nasl.core.String;
      percent: nasl.core.Decimal;
      size: nasl.core.Integer;
      status: 'success' | 'fail' | 'progress' | 'waiting';
      type: nasl.core.String;
      url: nasl.core.String;
      originFileObj: nasl.ui.File;
    }>;

    @Prop<CwSenderOptions, 'url'>({
      group: '数据属性',
      title: '文件上传地址',
      description: '文件上传的URL地址，如/upload',
      setter: { concept: 'InputSetter' },
      if: (_) => _.supportAttachment === true,
    })
    url: nasl.core.String;

    @Prop<CwSenderOptions, 'accept'>({
      group: '数据属性',
      title: '支持上传的文件类型',
      description:
        '若要限制上传文件类型，请输入类型名称，格式为“.后缀名”，多个文件类型时使用英文逗号隔开。例如“.jpeg,.png,.gif”',
      setter: {
        concept: 'InputSetter',
        placeholder: '所有类型',
      },
      if: (_) => _.supportAttachment === true,
    })
    accept: nasl.core.String;

    @Prop<CwSenderOptions, 'urlField'>({
      group: '数据属性',
      title: '文件 URL 字段',
      description: '请求返回的 URL 字段名',
      docDescription: '请求返回的URL字段名',
      if: (_) => _.supportAttachment === true,
    })
    urlField: nasl.core.String = 'result';

    @Prop<CwSenderOptions, 'name'>({
      group: '数据属性',
      title: '上传的文件字段',
      description: '上传的文件字段名，后端需要这个字段获取',
      setter: { concept: 'InputSetter' },
      if: (_) => _.supportAttachment === true,
    })
    name: nasl.core.String = 'file';

    @Prop<CwSenderOptions, 'headers'>({
      group: '数据属性',
      title: '请求头',
      description: '设置上传的请求头部',
      setter: { concept: 'InputSetter' },
      if: (_) => _.supportAttachment === true,
    })
    headers: object;

    @Prop<CwSenderOptions, 'method'>({
      group: '数据属性',
      title: 'HTTP 请求类型',
      description:
        'HTTP 请求类型。可选项：POST/GET/PUT/OPTIONS/PATCH/post/get/put/options/patch',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: 'POST' },
          { title: 'GET' },
          { title: 'PUT' },
          { title: 'OPTIONS' },
          { title: 'PATCH' },
          { title: 'post' },
          { title: 'get' },
          { title: 'put' },
          { title: 'options' },
          { title: 'patch' },
        ],
      },
      if: (_) => _.supportAttachment === true,
    })
    method:
      | 'POST'
      | 'GET'
      | 'PUT'
      | 'OPTIONS'
      | 'PATCH'
      | 'post'
      | 'get'
      | 'put'
      | 'options'
      | 'patch' = 'POST';

    @Prop<CwSenderOptions, 'withCredentials'>({
      group: '数据属性',
      title: '是否携带Cookie',
      description: '上传请求时是否携带 cookie',
      setter: { concept: 'SwitchSetter' },
      if: (_) => _.supportAttachment === true,
    })
    withCredentials: nasl.core.Boolean = false;

    @Prop<CwSenderOptions, 'data'>({
      group: '数据属性',
      title: '附加数据',
      description:
        '上传请求所需的额外字段，默认字段有 `file`，表示文件信息。可以添加额外的文件名字段，如：`{file_name: "custom-file-name.txt"}`。',
      setter: { concept: 'InputSetter' },
      if: (_) => _.supportAttachment === true,
    })
    data: object;

    @Prop<CwSenderOptions, 'maxCount'>({
        group: '数据属性',
        title: '列表数量上限',
        docDescription: '列表数量上限',
        setter: {
            concept: 'NumberInputSetter',
            precision: 0,
        },
        if: (_) => _.supportAttachment === true,
    })
    maxCount: nasl.core.Integer;

    @Prop<CwSenderOptions, 'maxSize'>({
        group: '数据属性',
        title: '最大文件大小',
        description: '可上传的最大文件大小。默认为50MB；如果为数字，则表示单位为字节；如果为字符串，可以添加以下单位：`KB`、`MB`、`GB`',
        docDescription: '可上传的最大文件大小。默认50MB；如果为数字，则表示单位为字节；如果为字符串，可以添加以下单位KB、MB、GB',
        implicitToString: true,
        if: (_) => _.supportAttachment === true,
    })
    maxSize: nasl.core.String;

    @Prop<CwSenderOptions, 'access'>({
      group: '数据属性',
      title: '文件访问策略',
      docDescription: '支持任何人可访问和用户登录后可访问两种方式',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '任何人可访问' }, { title: '用户登录后可访问' }],
      },
      if: (_) => _.supportAttachment === true,
    })
    access: 'public' | 'private';

    @Prop<CwSenderOptions, 'ttl'>({
      group: '数据属性',
      title: '文件有效期',
      description: '是否开启文件有效期控制',
      docDescription: '支持配置文件自动清理，开启后可自定义上传后有效天数',
      setter: {
        concept: 'SwitchSetter',
      },
      if: (_) => _.supportAttachment === true,
    })
    ttl: nasl.core.Boolean;

    @Prop<CwSenderOptions, 'ttlValue'>({
      group: '数据属性',
      title: '上传后有效天数',
      description: '文件上传后的有效期天数',
      docDescription: '开启文件有效期开关后显示，可配置文件自动清理的时间',
      setter: {
        concept: 'NumberInputSetter',
      },
      if: (_) => _.ttl === true && _.supportAttachment === true,
    })
    ttlValue: nasl.core.Decimal;

    @Prop<CwSenderOptions, 'viaOriginURL'>({
      group: '数据属性',
      title: '源地址访问',
      description: '开启后支持通过文件存储源地址访问文件',
      docDescription: '开启后支持通过文件存储源地址访问文件',
      setter: {
        concept: 'SwitchSetter',
      },
      if: (_) => _.supportAttachment === true,
    })
    viaOriginURL: nasl.core.Boolean;

    @Prop({
      group: '主要属性',
      title: '占位符',
      description: '为空时显示的占位符文本',
      docDescription: '内容为空时的提示文本。',
      implicitToString: true,
    })
    placeholder: nasl.core.String = '请输入';

    @Prop({
      group: '主要属性',
      title: '提交方式',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: 'Enter' }, { title: 'ShiftEnter' }],
      },
    })
    submitType: 'enter' | 'shiftEnter' = 'enter';

    @Prop({
      group: '主要属性',
      title: '是否开启底部插槽',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    supportExtra: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '最大字符数',
      docDescription: '限定输入文本最大长度。',
      setter: {
          concept: 'NumberInputSetter',
          precision: 0,
      },
    })
    maxlength: nasl.core.Integer;

    @Prop({
      group: '样式属性',
      title: '提交按钮形态',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '圆形' }, { title: '方形' }, { title: '椭圆' }],
      },
    })
    submitBtnShape: 'circle' | 'normal' | 'round' = 'circle';

    @Prop({
      group: '样式属性',
      title: '提交按钮图标',
      setter: {
        concept: 'EnumSelectSetter',
        options: [{ title: '箭头' }, { title: '飞机' }],
      },
    })
    submitBtnIcon: 'arrowup' | 'plane' = 'arrowup';

    @Prop({
        group: '样式属性',
        title: '显示阴影',
        setter: {
          concept: 'SwitchSetter',
      },
    })
    shadow: nasl.core.Boolean = true;

    @Prop({
        group: '样式属性',
        title: '显示边框',
        setter: {
            concept: 'SwitchSetter',
        },
    })
    border: nasl.core.Boolean = true;

    @Prop({
      group: '状态属性',
      title: '禁用',
      description: '是否禁用',
      setter: { concept: 'SwitchSetter' },
    })
    disabled: nasl.core.Boolean;

    @Prop({
        group: '状态属性',
        title: '只读',
        description: '正常显示，但禁止选择/输入',
        docDescription: '正常显示，但禁止选择或输入',
        setter: {
            concept: 'SwitchSetter',
        },
        settable: true,
    })
    readonly: nasl.core.Boolean = false;

    @Prop({
        group: '状态属性',
        title: '加载中',
        description: '发送按钮加载中状态',
        docDescription: '发送按钮加载中状态',
        setter: {
            concept: 'SwitchSetter',
        },
        settable: true,
    })
    loading: nasl.core.Boolean = false;
    
    @Event({
      title: '点击发送按钮',
      description: '点击发送按钮时触发',
    })
    onSubmit: (event: {
      content: nasl.core.String,
      fileList: nasl.collection.List<{
        name: nasl.core.String;
        percent: nasl.core.Decimal;
        size: nasl.core.Integer;
        status: 'success' | 'fail' | 'progress' | 'waiting';
        type: nasl.core.String;
        url: nasl.core.String;
        originFileObj: File;
      }>
    }) => any;

    @Event({
      title: '输入框值改变时',
      description: '选中值发生变化时触发',
    })
    onChange: (event: {
      content: nasl.core.String,
      fileList: nasl.collection.List<{
        name: nasl.core.String;
        percent: nasl.core.Decimal;
        size: nasl.core.Integer;
        status: 'success' | 'fail' | 'progress' | 'waiting';
        type: nasl.core.String;
        url: nasl.core.String;
        originFileObj: File;
      }>
    }) => any;

    @Event({
      title: '点击取消按钮',
      description: '点击取消按钮时触发',
    })
    onCancel: (event: any) => any;

    @Slot({
      title: '底部内容',
      description: '底部内容',
    })
    slotDefault: () => Array<nasl.ui.ViewComponent>;
  }
}