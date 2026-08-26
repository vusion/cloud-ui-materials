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
    title: '音频录制组件',
    description: '音频录制组件',
  })
  export class CwAudioRecord extends ViewComponent {
    @Method({
      title: '开始录制',
      description: '开始录制音频',
    })
    startRecord(): void {}

    @Method({
      title: '停止录制',
      description: '停止录制音频',
    })
    stopRecord(): void {}

    @Method({
      title: '暂停录制',
      description: '暂停录制音频',
    })
    pauseRecord(): void {}

    @Method({
      title: '恢复录制',
      description: '恢复录制音频',
    })
    resumeRecord(): void {}

    @Method({
      title: '上传录制',
      description: '上传录制的音频',
    })
    uploadRecord(
      @Param({
        title: '文件格式',
        description: '上传的文件格式（wav，mp3，pcm）',
      })
      type?: nasl.core.String,
    ): void {}

    @Method({
      title: '下载录制',
      description: '下载录制的音频',
    })
    downloadRecord(
      @Param({
        title: '文件格式',
        description: '下载的文件格式（wav，mp3，pcm）',
      })
      type?: nasl.core.String,
    ): void {}

    constructor(options?: Partial<CwAudioRecordOptions>) {
      super();
    }
  }

  export class CwAudioRecordOptions extends ViewComponentOptions {
    @Prop({
      title: '声波背景颜色',
      description: '设定声波背景颜色',
      setter: {
        concept: 'InputSetter',
      },
    })
    waveBgColor: nasl.core.String = 'rgb(200, 200, 200)';

    @Prop({
      title: '声波波形颜色',
      description: '设定波形绘制颜色',
      setter: {
        concept: 'InputSetter',
      },
    })
    waveColor: nasl.core.String = 'rgb(0, 0, 0)';

    @Prop({
      title: '最大文件大小（MB）',
      description: '上传文件的最大大小',
      setter: {
        concept: 'NumberInputSetter',
      },
    })
    maxFileSize: nasl.core.Integer = 10;

    @Prop({
      title: '上传音频地址',
      description: '上传的地址',
      setter: {
        concept: 'InputSetter',
      },
    })
    uploadUrl: nasl.core.String = '/gateway/lowcode/api/v1/app/upload';

    @Prop({
      title: '是否显示声波',
      description: '是否显示声波',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    isShowWave: nasl.core.Boolean = true;

    @Event({
      title: '上传成功时',
      description: '上传音频成功时',
    })
    onUploadSuccess: (event: nasl.core.String) => void;

    @Event({
      title: '上传失败时',
      description: '上传失败时',
    })
    onUploadError: (event: nasl.core.String) => void;

    @Slot({
      title: '默认',
      description: '插入音频录制控制组件',
    })
    slotDefault: () => Array<ViewComponentType>;
  }
}
