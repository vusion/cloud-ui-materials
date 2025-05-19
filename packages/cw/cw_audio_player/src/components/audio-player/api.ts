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
      title: '内容',
      description: '显示文本',
      setter: {
        concept: 'InputSetter'
      }
    })
    text: nasl.core.String = '';
  }
}