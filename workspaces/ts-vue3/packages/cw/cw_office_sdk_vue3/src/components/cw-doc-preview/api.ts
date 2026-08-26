/// <reference types="@nasl/types" />
namespace extensions.cw_office_sdk_vue3.viewComponents {
  const { Component, Prop, ViewComponent, ViewComponentOptions } = nasl.ui;

  @ExtensionComponent({
    type: 'both',
    ideusage: {
      idetype: 'element',
    },
  })
  @Component({
    title: 'docx预览',
    description: 'docx预览',
  })
  export class CwDocPreview extends ViewComponent {
    constructor(options?: Partial<CwDocPreviewOptions>) {
      super();
    }
  }

  export class CwDocPreviewOptions extends ViewComponentOptions {
    @Prop({
      title: '链接地址',
      description: '需要传入的值',
      setter: {
        concept: 'InputSetter',
      },
    })
    value: nasl.core.String = '请在这里编写代码';

    @Prop({
      title: '是否开启缩放',
      description: '是否开启缩放',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    panZoom: nasl.core.Boolean = false;

    @Prop({
      title: '加载中提示',
      description: '加载中显示的提示文字',
      setter: {
        concept: 'InputSetter',
      },
    })
    emptyText: nasl.core.String = '文件加载中';

    @Prop({
      title: '禁用页面的渲染宽度',
      description: '禁用页面的渲染宽度',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    ignoreWidth: nasl.core.Boolean = false;

    @Prop({
      title: '禁用页面的渲染高度',
      description: '禁用页面的渲染高度',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    ignoreHeight: nasl.core.Boolean = false;
  }
}
