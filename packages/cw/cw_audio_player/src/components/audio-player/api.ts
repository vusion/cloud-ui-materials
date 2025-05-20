/// <reference types="@nasl/types" />
namespace extensions.cw_audio_player.viewComponents {
  const { Component, Prop, ViewComponent, Slot, Method, Event, ViewComponentOptions } = nasl.ui;

  @ExtensionComponent({
    type: 'pc',
    ideusage: {
      idetype: 'element',
    }
  })
  @Component({
    title: '音频播放器',
    description: '音频播放器',
  })
  export class AudioPlayer extends ViewComponent {
    constructor(options?: Partial<AudioPlayerOptions>) {
      super();
    }
  }

  export class AudioPlayerOptions extends ViewComponentOptions {
     @Prop({
      title: '音频源',
      description: '音频源',
      setter: {
        concept: 'InputSetter'
      }
    })
    src: nasl.core.String = '';

    @Prop({
      title: '内容',
      description: '显示文本',
      setter: {
        concept: 'InputSetter'
      }
    })
    speedList: nasl.collection.List<nasl.core.Decimal> = [0.5, 1.0, 1.5, 2.0];

    /* 事件描述 */
    @Event({
      title: '点击播放按钮',
      description: '返回一个bool，标识点击完之后，是否是播放状态',
    })
    onTogglePlay: (event: {
      isPlay: nasl.core.Boolean,
    }) => any;

    /* 事件描述 */
    @Event({
      title: '拖动音频播放进度条',
      description: '返回当前的播放进度',
    })
    onSeek: (event: {
      time: nasl.core.Decimal,
    }) => any;

    /* 事件描述 */
    @Event({
      title: '点击切换播放速度',
      description: '返回当前的播放速度',
    })
    onSpeedChange: (event: {
      speed: nasl.core.Decimal,
    }) => any;

    /* 事件描述 */
    @Event({
      title: '拖动音频音量进度条',
      description: '返回当前的音量',
    })
    onVolumeChange: (event: {
      volume: nasl.core.Decimal,
    }) => any;
  }
}