/// <reference types="@nasl/types" />

namespace nasl.ui {
  @Component({
    title: '视频播放',
    icon: 'video.svg',
    description: '视频播放组件',
    group: 'Display'
  })
  export class CwVideoView extends ViewComponent {
    constructor(options?: Partial<CwVideoViewOptions>) {
      super();
    }

    @Method({
      title: '继续播放',
      description: '继续播放视频',
    })
    play(): void {}

    @Method({
      title: '暂停播放',
      description: '暂停播放视频',
    })
    pause(): void {}
  }

  export class CwVideoViewOptions extends ViewComponentOptions {
    @Prop({
      title: '地址',
      description: '视频流地址',
    })
    src: nasl.core.String;

    @Prop({
      title: '封面地址',
      description: '视频默认封面地址',
    })
    poster: nasl.core.String;

    @Prop({
      title: '中断进度',
      description: '从中断的进度开始播放',
    })
    breakProgress: nasl.core.String;

    @Prop({
      title: '自动播放',
      description: '是否自动播放',
      setter: { concept: 'SwitchSetter' },
    })
    autoplay: nasl.core.Boolean;

    @Prop({
      title: '可拖放',
      description: '是否可拖放',
      setter: { concept: 'SwitchSetter' },
    })
    draggable: nasl.core.Boolean;

    @Prop({
      title: '循环播放',
      description: '是否循环播放',
      setter: { concept: 'SwitchSetter' },
    })
    loop: nasl.core.Boolean;

    @Prop({
      title: '是否开启倍速播放',
      description: '是否开启倍速播放',
      setter: { concept: 'SwitchSetter' },
    })
    showPlaybackRates: nasl.core.Boolean;

    @Event({
      title: '播放开始时',
      description: '播放开始时触发',
    })
    onStart: (event: any) => any;

    @Event({
      title: '暂停播放时',
      description: '暂停播放时触发',
    })
    onPause: (event: any) => any;

    @Event({
      title: '继续播放时',
      description: '继续播放时触发',
    })
    onPlay: (event: any) => any;

    @Event({
      title: '播放结束时',
      description: '播放结束时触发',
    })
    onEnded: (event: any) => any;

    @Event({
      title: '更新播放进度时',
      description: '更新播放进度时触发',
    })
    onVideoProgress: (event: nasl.core.String) => any;
  }
}
