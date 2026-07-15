/// <reference types="@nasl/types" />
namespace extensions.cust_flv_video.viewComponents {
  const { Component, Prop, ViewComponent, Slot, Method, Event, ViewComponentOptions } = nasl.ui;

  @ExtensionComponent({
    type: 'both',
    ideusage: {
      idetype: 'element',
    }
  })
  @Component({
    title: 'flv播放器',
    description: 'flv播放器',
  })
  export class CustFlvVideo extends ViewComponent {
    constructor(options?: Partial<CustFlvVideoOptions>) {
      super();
    }

    @Method({
      title: '播放',
      description: '开始播放视频',
    })
    play(): any {}

    @Method({
      title: '暂停',
      description: '暂停播放视频',
    })
    pause(): any {}

    @Method({
      title: '重新加载',
      description: '重新加载当前视频源',
    })
    reload(): any {}
  }

  export class CustFlvVideoOptions extends ViewComponentOptions {
    @Prop({
      title: '视频地址',
      description: 'FLV 视频流地址',
      setter: {
        concept: 'InputSetter'
      }
    })
    src: nasl.core.String = '';

    @Prop({
      title: '自动播放',
      description: '是否自动播放（部分浏览器需配合静音）',
      setter: {
        concept: 'SwitchSetter'
      }
    })
    autoplay: nasl.core.Boolean = false;

    @Prop({
      title: '静音',
      description: '是否静音播放',
      setter: {
        concept: 'SwitchSetter'
      }
    })
    muted: nasl.core.Boolean = false;

    @Prop({
      title: '直播流',
      description: '是否为直播流（点播请关闭）',
      setter: {
        concept: 'SwitchSetter'
      }
    })
    isLive: nasl.core.Boolean = true;

    @Prop({
      title: '显示控制条',
      description: '是否显示原生视频控制条',
      setter: {
        concept: 'SwitchSetter'
      }
    })
    controls: nasl.core.Boolean = true;

    @Prop({
      title: '封面图',
      description: '视频播放前显示的封面图地址',
      setter: {
        concept: 'InputSetter'
      }
    })
    poster: nasl.core.String = '';

    @Prop({
      title: '循环播放',
      description: '是否循环播放',
      setter: {
        concept: 'SwitchSetter'
      }
    })
    loop: nasl.core.Boolean = false;

    @Prop({
      title: '自动检测轨道',
      description: '自动读取 FLV 头信息识别是否包含音频/视频（监控直播流通常无音频，建议开启）',
      setter: {
        concept: 'SwitchSetter'
      }
    })
    autoDetectMedia: nasl.core.Boolean = true;

    @Prop({
      title: '包含音频',
      description: '关闭自动检测后生效，视频流是否包含音频轨道',
      setter: {
        concept: 'SwitchSetter'
      }
    })
    hasAudio: nasl.core.Boolean = true;

    @Prop({
      title: '包含视频',
      description: '关闭自动检测后生效，视频流是否包含视频轨道',
      setter: {
        concept: 'SwitchSetter'
      }
    })
    hasVideo: nasl.core.Boolean = true;

    @Event({
      title: '播放',
      description: '视频开始播放时触发',
    })
    onPlay: () => any;

    @Event({
      title: '暂停',
      description: '视频暂停时触发',
    })
    onPause: () => any;

    @Event({
      title: '加载完成',
      description: '视频元数据加载完成时触发',
    })
    onLoaded: () => any;

    @Event({
      title: '播放出错',
      description: '播放出错时触发',
    })
    onError: (event: {
      message?: nasl.core.String,
      errorType?: nasl.core.String,
      errorDetail?: nasl.core.String,
      errorInfo?: nasl.core.String,
    }) => any;
  }
}
