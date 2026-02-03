/// <reference types="@nasl/types" />
namespace extensions.vue_library_example.viewComponents {
  const { Component, Prop, ViewComponent, Event, Method, ViewComponentOptions, Param } = nasl.ui;

  @ExtensionComponent({
    type: 'both',
    ideusage: {
      idetype: 'element',
    }
  })
  @Component({
    title: '对话框',
    description: 'WebSocket智能对话组件，支持实时消息收发',
  })
  export class CwdChatDialog extends ViewComponent {
    constructor(options?: Partial<CwdChatDialogOptions>) {
      super();
    }

    @Method({
      title: '发送消息',
      description: '主动发送一条消息',
    })
    sendMessage(
      @Param({
        title: '消息内容',
        description: '要发送的消息内容',
      })
      message: nasl.core.String,
    ): void {}

    @Method({
      title: '清空消息',
      description: '清空所有消息记录',
    })
    clearMessages(): void {}
  }

  export class CwdChatDialogOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: '标题',
      description: '对话框的标题',
      setter: {
        concept: 'InputSetter'
      }
    })
    title: nasl.core.String = '胜小利智能对话';

    @Prop({
      group: '主要属性',
      title: '用户ID',
      description: '当前用户的唯一标识',
      setter: {
        concept: 'InputSetter'
      }
    })
    userID: nasl.core.String = 'user001';

    @Prop({
      group: '主要属性',
      title: 'WebSocket地址',
      description: 'WebSocket服务器地址',
      setter: {
        concept: 'InputSetter'
      }
    })
    wsUrl: nasl.core.String = 'wss://eai.slof.com/yyzxhgk/api/websocket';

    @Prop({
      group: '主要属性',
      title: '输入提示',
      description: '输入框的占位提示文字',
      setter: {
        concept: 'InputSetter'
      }
    })
    placeholder: nasl.core.String = '请输入您的问题...';


    @Event({
      title: '连接成功',
      description: 'WebSocket连接建立成功时触发',
    })
    onConnect: (event: null) => void;

    @Event({
      title: '连接断开',
      description: 'WebSocket连接断开时触发',
    })
    onDisconnect: (event: null) => void;

    @Event({
      title: '发送消息',
      description: '发送消息时触发',
    })
    onSend: (event: {
      message: nasl.core.String;
      payload: {
        question: nasl.core.String;
        userID: nasl.core.String;
        sxl: nasl.core.Boolean;
        project: nasl.core.String;
      };
    }) => void;

    @Event({
      title: '接收消息',
      description: '接收到服务器消息时触发',
    })
    onReceive: (event: {
      message: nasl.core.String;
      data: {
        id: nasl.core.String;
        result: nasl.core.String;
        finish: nasl.core.Boolean;
        success: nasl.core.Boolean;
        userid: nasl.core.String;
      };
    }) => void;

    @Event({
      title: '连接错误',
      description: 'WebSocket连接发生错误时触发',
    })
    onError: (event: {
      error: any;
    }) => void;
  }
}