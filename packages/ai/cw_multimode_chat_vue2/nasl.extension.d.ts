declare namespace extensions.cw_antd_x_vue_2.viewComponents {
  const ViewComponent: typeof nasl.ui.ViewComponent, ViewComponentOptions: typeof nasl.ui.ViewComponentOptions;
  export class CwBubbleList<T> extends ViewComponent {
    constructor(options?: Partial<CwBubbleListOptions<T>>);
    /**
     * 重新加载数据
     * 重新加载数据
     */
    reload(): void;
  }
  export class CwBubbleListOptions<T> extends ViewComponentOptions {
    /**
     * 数据源
     * 展示数据的输入源，可设置为数据集对象或者返回数据集的逻辑
     */
    dataSource: {
      list: nasl.collection.List<T>;
      total: nasl.core.Integer;
    } | nasl.collection.List<T>;
    /**
     * 数据类型
     * 数据源返回的数据结构的类型，自动识别类型进行展示说明
     */
    dataSchema: T;
    /**
     * 角色字段
     * 角色的字段名
     */
    roleField: (item: T) => any;
    /**
     * 左侧角色值
     * 左侧展示的角色值
     */
    leftRoleName: nasl.core.String;
    /**
     * 右侧角色值
     * 右侧展示的角色值
     */
    rightRoleName: nasl.core.String;
    /**
     * 左侧对话气泡
     * 左侧对话气泡
     */
    slotLeftBubble: (current: nasl.ui.Current<T>) => Array<nasl.ui.ViewComponent>;
    /**
     * 右侧对话气泡
     * 右侧对话气泡
     */
    slotRightBubble: (current: nasl.ui.Current<T>) => Array<nasl.ui.ViewComponent>;
  }
  export class CwBubble<T> extends ViewComponent {
    constructor(options?: Partial<CwBubbleOptions<T>>);
  }
  export class CwBubbleOptions<T> extends ViewComponentOptions {
    /**
     * 内容值
     * 内容的值字段
     */
    content: nasl.core.String;
    /**
     * 显示头像
     * 是否显示头像，默认开启
     */
    showAvatar: nasl.core.Boolean;
    /**
     * 头像值
     * 头像值对应的字段
     */
    avatar: nasl.core.String;
    /**
     * 显示昵称
     * 是否显示昵称，默认开启
     */
    showUserName: nasl.core.Boolean;
    /**
     * 昵称值
     * 昵称值对应的字段
     */
    name: nasl.core.String;
    /**
     * 显示时间
     * 是否展示时间，默认开启
     */
    showTime: nasl.core.Boolean;
    /**
     * 时间值
     * 时间值对应的字段
     */
    time: nasl.core.DateTime | nasl.core.Date | nasl.core.Time;
    /**
     * 文件列表值
     * 文件列表值对应的字段
     */
    fileList: nasl.collection.List<any>;
    /**
     * 显示底部插槽
     * 是否显示底部插槽，默认关闭
     */
    showFooter: nasl.core.Boolean;
    /**
     * 加载中
     * 是否加载中，默认关闭
     */
    loading: nasl.core.Boolean;
    /**
     * 打字机效果
     * 是否打字机效果，默认开启
     */
    typing: nasl.core.Boolean;
    /**
     * 气泡形状
     */
    shape: 'normal' | 'round' | 'corner' | 'none';
    /**
     * 填充背景
     */
    filled: nasl.core.Boolean;
    /**
     * 显示边框
     */
    border: nasl.core.Boolean;
    /**
     * 阴影
     */
    shadow: nasl.core.Boolean;
    /**
     * 打字完成时
     * 打字效果完成时触发
     */
    onTypingComplete: (event: any) => any;
    /**
     * 底部内容
     * 底部内容
     */
    slotFooter: () => Array<nasl.ui.ViewComponent>;
  }
  export {};
}
declare namespace extensions.cw_antd_x_vue_2.viewComponents {
  const ViewComponent: typeof nasl.ui.ViewComponent, ViewComponentOptions: typeof nasl.ui.ViewComponentOptions;
  export class CwSender extends ViewComponent {
    constructor(options?: Partial<CwSenderOptions>);
    /**
     * 当前输入框的值
     */
    value: nasl.core.String;
    /**
     * 文件列表
     */
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
    /**
     * 值
     * 当前输入框的值
     */
    value: nasl.core.String;
    /**
     * 是否支持上传附件
     */
    supportAttachment: nasl.core.Boolean;
    /**
     * 文件列表值
     * 当前已上传的文件列表的值
     */
    fileList: nasl.collection.List<{
      name: nasl.core.String;
      percent: nasl.core.Decimal;
      size: nasl.core.Integer;
      status: 'success' | 'fail' | 'progress' | 'waiting';
      type: nasl.core.String;
      url: nasl.core.String;
      originFileObj: nasl.ui.File;
    }>;
    /**
     * 文件上传地址
     * 文件上传的URL地址，如/upload
     */
    url: nasl.core.String;
    /**
     * 支持上传的文件类型
     * 若要限制上传文件类型，请输入类型名称，格式为“.后缀名”，多个文件类型时使用英文逗号隔开。例如“.jpeg,.png,.gif”
     */
    accept: nasl.core.String;
    /**
     * 文件 URL 字段
     * 请求返回的 URL 字段名
     */
    urlField: nasl.core.String;
    /**
     * 上传的文件字段
     * 上传的文件字段名，后端需要这个字段获取
     */
    name: nasl.core.String;
    /**
     * 请求头
     * 设置上传的请求头部
     */
    headers: object;
    /**
     * HTTP 请求类型
     * HTTP 请求类型。可选项：POST/GET/PUT/OPTIONS/PATCH/post/get/put/options/patch
     */
    method: 'POST' | 'GET' | 'PUT' | 'OPTIONS' | 'PATCH' | 'post' | 'get' | 'put' | 'options' | 'patch';
    /**
     * 是否携带Cookie
     * 上传请求时是否携带 cookie
     */
    withCredentials: nasl.core.Boolean;
    /**
     * 附加数据
     * 上传请求所需的额外字段，默认字段有 `file`，表示文件信息。可以添加额外的文件名字段，如：`{file_name: "custom-file-name.txt"}`。
     */
    data: object;
    /**
     * 列表数量上限
     */
    maxCount: nasl.core.Integer;
    /**
     * 最大文件大小
     * 可上传的最大文件大小。默认为50MB；如果为数字，则表示单位为字节；如果为字符串，可以添加以下单位：`KB`、`MB`、`GB`
     */
    maxSize: nasl.core.String;
    /**
     * 文件访问策略
     */
    access: 'public' | 'private';
    /**
     * 文件有效期
     * 是否开启文件有效期控制
     */
    ttl: nasl.core.Boolean;
    /**
     * 上传后有效天数
     * 文件上传后的有效期天数
     */
    ttlValue: nasl.core.Decimal;
    /**
     * 源地址访问
     * 开启后支持通过文件存储源地址访问文件
     */
    viaOriginURL: nasl.core.Boolean;
    /**
     * 占位符
     * 为空时显示的占位符文本
     */
    placeholder: nasl.core.String;
    /**
     * 提交方式
     */
    submitType: 'enter' | 'shiftEnter';
    /**
     * 是否开启底部插槽
     */
    supportExtra: nasl.core.Boolean;
    /**
     * 最大字符数
     */
    maxlength: nasl.core.Integer;
    /**
     * 提交按钮形态
     */
    submitBtnShape: 'circle' | 'normal' | 'round';
    /**
     * 提交按钮图标
     */
    submitBtnIcon: 'arrowup' | 'plane';
    /**
     * 显示阴影
     */
    shadow: nasl.core.Boolean;
    /**
     * 显示边框
     */
    border: nasl.core.Boolean;
    /**
     * 禁用
     * 是否禁用
     */
    disabled: nasl.core.Boolean;
    /**
     * 只读
     * 正常显示，但禁止选择/输入
     */
    readonly: nasl.core.Boolean;
    /**
     * 加载中
     * 发送按钮加载中状态
     */
    loading: nasl.core.Boolean;
    /**
     * 点击发送按钮
     * 点击发送按钮时触发
     */
    onSubmit: (event: {
      content: nasl.core.String;
      fileList: nasl.collection.List<{
        name: nasl.core.String;
        percent: nasl.core.Decimal;
        size: nasl.core.Integer;
        status: 'success' | 'fail' | 'progress' | 'waiting';
        type: nasl.core.String;
        url: nasl.core.String;
        originFileObj: File;
      }>;
    }) => any;
    /**
     * 输入框值改变时
     * 选中值发生变化时触发
     */
    onChange: (event: {
      content: nasl.core.String;
      fileList: nasl.collection.List<{
        name: nasl.core.String;
        percent: nasl.core.Decimal;
        size: nasl.core.Integer;
        status: 'success' | 'fail' | 'progress' | 'waiting';
        type: nasl.core.String;
        url: nasl.core.String;
        originFileObj: File;
      }>;
    }) => any;
    /**
     * 点击取消按钮
     * 点击取消按钮时触发
     */
    onCancel: (event: any) => any;
    /**
     * 底部内容
     * 底部内容
     */
    slotDefault: () => Array<nasl.ui.ViewComponent>;
  }
  export {};
}