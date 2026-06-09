/// <reference types="@nasl/types" />
namespace extensions.library_fdddf_colorpicker.viewComponents {
  const { Component, Prop, ViewComponent, Event, ViewComponentOptions } = nasl.ui;

  @ExtensionComponent({
    type: 'both',
    ideusage: {
      idetype: 'element',
    },
  })
  @Component({
    title: '颜色选择器',
    description: '',
  })
  export class FdddfColorpicker extends ViewComponent {
    constructor(options?: Partial<FdddfColorpickerOptions>) {
      super();
    }
  }

  export class FdddfColorpickerOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: '颜色值',
      description: '颜色值,hex或rgba格式',
      sync: true,
      bindOpen: true,
      setter: {
        concept: 'InputSetter',
      },
    })
    value: nasl.core.String = '#000000';

    @Prop({
      group: '主要属性',
      title: '调色板颜色列表',
      description: '调色板颜色列表',
      setter: {
        concept: 'InputSetter',
      },
    })
    colors: nasl.collection.List<nasl.core.String> = [
      '#F44336',
      '#E91E63',
      '#9C27B0',
      '#673AB7',
      '#3F51B5',
      '#2196F3',
      '#03A9F4',
      '#00BCD4',
      '#009688',
      '#4CAF50',
      '#8BC34A',
      '#CDDC39',
      '#FFEB3B',
      '#FFC107',
      '#FF9800',
      '#795548',
    ];

    @Prop({
      group: '主要属性',
      title: '标题',
      description: '标题',
      setter: {
        concept: 'InputSetter',
      },
    })
    label: nasl.core.String = 'ColorPicker';

    @Prop({
      group: '主要属性',
      title: '隐藏调色板',
      description: '是否隐藏调色板',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    hidePalette: nasl.core.Boolean = false;

    @Prop({
      group: '主要属性',
      title: '无文本输入框',
      description: '隐藏文本输入框，保留原生取色器与调色板',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    withoutInput: nasl.core.Boolean = false;

    @Event({
      title: 'change',
      description: '颜色值改变时触发',
    })
    onChange: (event: { value: nasl.core.String }) => void;
  }
}
