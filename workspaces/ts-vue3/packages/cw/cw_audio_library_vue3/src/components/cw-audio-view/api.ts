/// <reference types="@nasl/types" />
namespace extensions.cw_audio_library_vue3.viewComponents {
  const { Component, Prop, ViewComponent, Slot, Method, Param, Event, ViewComponentOptions } = nasl.ui;
  type ViewComponentType = nasl.ui.ViewComponent;

  @ExtensionComponent({
    type: 'both',
    ideusage: {
      idetype: 'container',
    },
  })
  @Component({
    title: '音频播放组件',
    description: '音频播放组件',
  })
  export class CwAudioView extends ViewComponent {
    @Method({
      title: '继续播放',
      description: '继续播放',
    })
    play(): void {}

    @Method({
      title: '暂停播放',
      description: '暂停播放',
    })
    pause(): void {}

    @Method({
      title: '设置播放速率',
      description: '设置播放速率',
    })
    handleSetPlaybackRate(
      @Param({
        title: '播放速率',
        description: '播放速率范围(0.5 - 4）',
      })
      rate: nasl.core.Decimal,
    ): void {}

    @Method({
      title: '设置播放音量',
      description: '设置播放音量',
    })
    handleSetPlaybackVolume(
      @Param({
        title: '音量',
        description: '音量大小范围（0 - 1）',
      })
      volume: nasl.core.Decimal,
    ): void {}

    constructor(options?: Partial<CwAudioViewOptions>) {
      super();
    }
  }

  export class CwAudioViewOptions extends ViewComponentOptions {
    @Prop({
      title: '地址',
      description: '音频流地址',
      setter: {
        concept: 'InputSetter',
      },
    })
    src: nasl.core.String;

    @Prop({
      title: '是否显示播放器面板',
      description: '是否显示播放器面板',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    showControls: nasl.core.Boolean = true;

    @Event({
      title: '播放开始时',
      description: '播放开始时',
    })
    onStart: (event: {}) => void;

    @Event({
      title: '暂停播放时',
      description: '暂停播放时',
    })
    onPause: (event: {}) => void;

    @Event({
      title: '继续播放时',
      description: '继续播放时',
    })
    onPlay: (event: {}) => void;

    @Event({
      title: '播放结束时',
      description: '播放结束时',
    })
    onEnded: (event: {}) => void;

    @Event({
      title: '更新播放进度时',
      description: '更新播放进度时',
    })
    onVideoProgress: (event: nasl.core.String) => void;

    @Event({
      title: '加载完音频资源后',
      description: '加载完音频资源后',
    })
    onLoadedMetadata: (event: {}) => void;

    @Slot({
      title: '默认插槽',
      description: '自定义音频播放器插槽',
    })
    slotDefault: () => Array<ViewComponentType>;
  }
}
