/// <reference types="@nasl/types" />
namespace extensions.xy_2.viewComponents {
  const { Component, Prop, ViewComponent, Slot, Method, Event, ViewComponentOptions } = nasl.ui;

  @ExtensionComponent({
    type: 'both',
    ideusage: {
      idetype: 'element',
    },
  })
  @Component({
    title: '游戏内容实时渲染器',
    description: '游戏内容实时渲染器',
  })
  export class GameHtmlReader extends ViewComponent {
    constructor(options?: Partial<GameHtmlReaderOptions>) {
      super();
    }

    @Method({
      title: '重新拉取内容',
      description: '重新拉取 HTML 内容并渲染',
    })
    reloadContent(): void {}
  }

  export class GameHtmlReaderOptions extends ViewComponentOptions {
    @Prop({
      title: '内容 URL',
      description: '用于抓取 HTML 内容的地址，支持 GBK 解码',
      setter: {
        concept: 'InputSetter',
      },
    })
    dhTarget: nasl.core.String = '';

    @Prop({
      title: '段落样式（p）',
      description: '控制 <p> 标签的样式，支持对象或 CSS 字符串格式',
      setter: {
        concept: 'InputSetter',
      },
    })
    pStyle: nasl.core.String = '';

    @Prop({
      title: '一级标题样式（h1）',
      description: '控制 <h1> 标签的样式，支持对象或 CSS 字符串格式',
      setter: {
        concept: 'InputSetter',
      },
    })
    h1Style: nasl.core.String = '';

    @Prop({
      title: '二级标题样式（h2）',
      description: '控制 <h2> 标签的样式，支持对象或 CSS 字符串格式',
      setter: {
        concept: 'InputSetter',
      },
    })
    h2Style: nasl.core.String = '';

    @Prop({
      title: '三级标题样式（h3）',
      description: '控制 <h3> 标签的样式，支持对象或 CSS 字符串格式',
      setter: {
        concept: 'InputSetter',
      },
    })
    h3Style: nasl.core.String = '';

    @Prop({
      title: '内联文字样式（span）',
      description: '控制 <span> 标签的样式，支持对象或 CSS 字符串格式',
      setter: {
        concept: 'InputSetter',
      },
    })
    spanStyle: nasl.core.String = '';

    @Prop({
      title: '列表项样式（li）',
      description: '控制 <li> 标签的样式，支持对象或 CSS 字符串格式',
      setter: {
        concept: 'InputSetter',
      },
    })
    liStyle: nasl.core.String = '';

    @Prop({
      title: '加粗文字样式（strong）',
      description: '控制 <strong> 标签的样式，支持对象或 CSS 字符串格式',
      setter: {
        concept: 'InputSetter',
      },
    })
    strongStyle: nasl.core.String = '';

    @Prop({
      title: '图片样式（img）',
      description: '控制 <img> 标签的样式，支持对象或 CSS 字符串格式',
      setter: {
        concept: 'InputSetter',
      },
    })
    imgStyle: nasl.core.String = '';

    @Prop({
      title: '高亮文字样式',
      description: '控制文字高亮样式，如 span[style*=color]，支持对象或 CSS 字符串格式',
      setter: {
        concept: 'InputSetter',
      },
    })
    highlightStyle: nasl.core.String = '';

    @Prop({
      title: '自定义样式',
      description: '字符串，传入类似.class1 { display: none; } img[src*="ad"] { display: none !important; }',
      setter: {
        concept: 'InputSetter',
      },
    })
    customCss: nasl.core.String = '';

    @Prop({
      title: '是否启用节选',
      description: '来控制是否启用节选功能',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    enableSegment: nasl.core.Boolean = false;

    @Prop({
      title: '片段标签名称',
      description: '于指定作为分隔范围的 HTML 标签名称，例如 h2、h3、p 等。系统会在这些标签中定位范围的起点和终点。',
      setter: {
        concept: 'InputSetter',
      },
    })
    segmentTag: nasl.core.String = 'h2';

    @Prop({
      title: '开始标签索引',
      description: '指定开始提取内容的位置，从第几个 segmentTag 标签之后开始（不包含该标签）。索引从 0 开始计数。若不传，则默认提取整个页面内容。',
      setter: {
        concept: 'NumberInputSetter',
      },
    })
    startTagIndex: nasl.core.Integer = 0;

    @Prop({
      title: '结束标签索引',
      description:
        '指定结束提取内容的位置，在第几个 segmentTag 标签之前结束（不包含该标签）。如果未传，则表示一直提取到最后一个元素为止。若起始索引 ≥ 结束索引，将返回空内容。',
      setter: {
        concept: 'NumberInputSetter',
      },
    })
    endTagIndex: nasl.core.Integer = 0;

    @Prop({
      title: '是否进行视觉表格纵向拆分',
      description: '将每行横向表格切分为多个视觉表格块，按照纵向排列展示，适用于多列平铺场景。',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    verticalTableSplit: nasl.core.Boolean = false;

    @Prop({
      title: '隐藏空表格',
      description: '在进行视觉切分后，若某些表格区域中所有单元格均为空白并为白色背景，则自动隐藏该区域。',
      setter: {
        concept: 'SwitchSetter',
      },
    })
    hideEmptyVerticalTables: nasl.core.Boolean = false;

    @Prop({
      title: '表格最大宽度',
      description: '用于控制表格的最大显示宽度，可设置为 100%、800px 等，默认不限制宽度。',
      setter: {
        concept: 'InputSetter',
      },
    })
    tableMaxWidth: nasl.core.String = 'unset';
  }
}
