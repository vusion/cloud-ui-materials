/// <reference types="@nasl/types" />
namespace extensions.cw_watermark_vue3.viewComponents {
  const { Component, Prop, ViewComponent, ViewComponentOptions } = nasl.ui;

  @ExtensionComponent({
    type: 'both',
    ideusage: {
      idetype: 'element',
    },
  })
  @Component({
    title: '全局图片水印',
    description: '全局图片水印',
  })
  export class CwWatermark extends ViewComponent {
    constructor(options?: Partial<CwWatermarkOptions>) {
      super();
    }
  }

  export class CwWatermarkOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: '水印类型',
      description: '请选择水印类型',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: '图片水印', value: 'image' },
          { title: '文字水印', value: 'text' },
        ],
      },
    })
    type: 'image' | 'text' = 'image';

    @Prop<CwWatermarkOptions, 'text'>({
      group: '主要属性',
      title: '文字水印的内容',
      description: '文字水印的内容',
      if: (_) => _.type === 'text',
      setter: { concept: 'InputSetter' },
    })
    text: nasl.core.String = '';

    @Prop<CwWatermarkOptions, 'color'>({
      group: '主要属性',
      title: '文字水印的颜色',
      description: '文字水印的颜色',
      if: (_) => _.type === 'text',
      setter: { concept: 'InputSetter' },
    })
    color: nasl.core.String = '#000';

    @Prop<CwWatermarkOptions, 'fontSize'>({
      group: '主要属性',
      title: '文字水印的字体大小',
      description: '文字水印的字体大小',
      if: (_) => _.type === 'text',
      setter: { concept: 'NumberInputSetter' },
    })
    fontSize: nasl.core.Integer = 16;

    @Prop<CwWatermarkOptions, 'cSpace'>({
      group: '主要属性',
      title: '文字水印的水平间距',
      description: '文字水印的水平间距',
      if: (_) => _.type === 'text',
      setter: { concept: 'NumberInputSetter' },
    })
    cSpace: nasl.core.Integer = 20;

    @Prop<CwWatermarkOptions, 'vSpace'>({
      group: '主要属性',
      title: '文字水印的垂直间距',
      description: '文字水印的垂直间距',
      if: (_) => _.type === 'text',
      setter: { concept: 'NumberInputSetter' },
    })
    vSpace: nasl.core.Integer = 50;

    @Prop<CwWatermarkOptions, 'src'>({
      group: '主要属性',
      title: '水印图片的url',
      description: '水印图片的url',
      if: (_) => _.type === 'image',
      setter: { concept: 'ImageSetter' },
    })
    src: nasl.core.String = '';

    @Prop({
      group: '主要属性',
      title: '水印图片的透明度',
      description: '水印图片的透明度',
      setter: { concept: 'NumberInputSetter' },
    })
    opacity: nasl.core.Decimal;
  }
}
