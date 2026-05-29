/// <reference types="@nasl/types" />
namespace extensions.cx_countup.viewComponents {
  const { Component, Prop, ViewComponent, ViewComponentOptions } = nasl.ui;

  @ExtensionComponent({
    type: 'both',
    ideusage: {
      idetype: 'element',
    },
  })
  @Component({
    title: '数字渐变',
    description: '数字渐变',
    group: 'cx_countup(数字渐变)',
  })
  export class CxCountup extends ViewComponent {
    constructor(options?: Partial<CxCountupOptions>) {
      super();
    }
  }

  export class CxCountupOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: '渐变开始数值',
      description: '渐变开始数值',
      setter: {
        concept: 'NumberInputSetter',
      },
    })
    start: nasl.core.Integer = 0;

    @Prop({
      group: '主要属性',
      title: '渐变结束数值',
      description: '渐变结束数值',
      setter: {
        concept: 'NumberInputSetter',
      },
    })
    end: nasl.core.Integer = 0;

    @Prop({
      group: '主要属性',
      title: '渐变时间间隔',
      description: '渐变时间间隔，时间单位为秒',
      setter: {
        concept: 'NumberInputSetter',
      },
    })
    duration: nasl.core.Integer = 2;

    @Prop({
      group: '主要属性',
      title: '是否循环播放',
      description: '是否循环播放',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    loop: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '循环播放之间的间隔',
      description: '循环播放之间的间隔，时间单位为秒',
      setter: {
        concept: 'NumberInputSetter',
      },
    })
    delay: nasl.core.Integer = 1;

    @Prop({
      group: '主要属性',
      title: '是否有分隔符',
      description: '是否有分隔符',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    isGroup: nasl.core.Boolean = false;
  }
}
