/// <reference types="@nasl/types" />
namespace extensions.lxy_antv_table_view_library.viewComponents {
  const { Component, Prop, ViewComponent, ViewComponentOptions } = nasl.ui;

  @ExtensionComponent({
    type: 'pc',
    ideusage: {
      idetype: 'element',
    },
  })
  @Component({
    title: '合并表格组件',
    description: '',
    group: 'lxy_antv_table_view_library(antv依赖库)',
  })
  export class AntvTableView extends ViewComponent {
    constructor(options?: Partial<AntvTableViewOptions>) {
      super();
    }
  }

  export class AntvTableViewOptions extends ViewComponentOptions {
    @Prop({
      group: '数据属性',
      title: '数据源',
      description: '表格需要展示数据',
    })
    dataSource: nasl.collection.Map<nasl.core.String, nasl.core.String>;

    @Prop({
      group: '数据属性',
      title: '表头字段',
      description:
        "表头相关设置rows代表行头，columns代表列头，values代表取值，例如{rows:['province','city'],columns:['type','sub_type'],values:['number']}",
    })
    fields: nasl.collection.Map<nasl.core.String, nasl.core.String|nasl.collection.List<nasl.core.String>>;

    @Prop({
      group: '数据属性',
      title: '字段映射',
      description: "字段与label的映射关系,如 [{field:'number',name:'数量'}]",
    })
    meta: nasl.collection.List<nasl.collection.Map<nasl.core.String, nasl.core.String>>;

    @Prop({
      group: '主要属性',
      title: '表格类型',
      description: '表格类型',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: '卡片', value: 'gird' },
          { title: '树形', value: 'tree' },
        ],
      },
    })
    hierarchyType: 'gird' | 'tree' = 'gird';

    @Prop({
      group: '样式属性',
      title: '宽度',
      description: '表格宽度',
      setter: {
        concept: 'NumberInputSetter',
      },
    })
    width: nasl.core.Integer = 800;

    @Prop({
      group: '样式属性',
      title: '高度',
      description: '表格高度',
      setter: {
        concept: 'NumberInputSetter',
      },
    })
    height: nasl.core.Integer = 400;

    @Prop({
      group: '样式属性',
      title: '单元格宽度',
      description: '单元格宽度',
      setter: {
        concept: 'NumberInputSetter',
      },
    })
    cellWidth: nasl.core.Integer = 120;

    @Prop({
      group: '样式属性',
      title: '单元格高度',
      description: '单元格高度',
      setter: {
        concept: 'NumberInputSetter',
      },
    })
    cellHeight: nasl.core.Integer = 36;
  }
}
