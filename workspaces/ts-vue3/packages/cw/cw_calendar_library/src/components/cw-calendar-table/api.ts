/// <reference types="@nasl/types" />
namespace extensions.cw_calendar_library.viewComponents {
  const { Component, Prop, ViewComponent, Slot, Method, Event, ViewComponentOptions } = nasl.ui;

  @ExtensionComponent({
    type: 'pc',
    ideusage: {
      idetype: 'element',
    },
  })
  @Component({
    title: '日历表格',
    description: '日历表格',
    group: 'cw_calendar_library(日历相关依赖库)',
  })
  export class CwCalendarTable extends ViewComponent {
    @Method({
      title: '带缓存地加载',
      description: '带缓存地加载',
    })
    load(): void {}

    @Method({
      title: '清除缓存，重新加载',
      description: '清除缓存，重新加载',
    })
    reload(): void {}

    @Method({
      title: '获取当前选择的年份',
      description: '获取当前选择的年份',
    })
    getSelectYear(): nasl.core.Integer {
      return 0;
    }

    @Method({
      title: '获取当前选择的月份',
      description: '获取当前选择的月份',
    })
    getSelectMonth(): nasl.core.Integer {
      return 0;
    }

    constructor(options?: Partial<CwCalendarTableOptions>) {
      super();
    }
  }

  export class CwCalendarTableOptions extends ViewComponentOptions {
    @Prop({
      group: '数据属性',
      title: '主数据源',
      description:
        '日历表格主数据源，数组方式表示直接的数据，函数需要返回一个 Promise；分页对象格式为 { content, totalPages }',
    })
    dataSourceParent:
      | nasl.collection.List<nasl.collection.Map<nasl.core.String, nasl.core.String>>
      | {
          content: nasl.collection.List<nasl.collection.Map<nasl.core.String, nasl.core.String>>;
          totalPages: nasl.core.Integer;
        };

    @Prop({
      group: '数据属性',
      title: '子数据源',
      description:
        '日历表格子数据源，数组方式表示直接的数据，函数需要返回一个 Promise；分页对象格式为 { content, totalPages }',
    })
    dataSource: nasl.collection.List<nasl.collection.Map<nasl.core.String, nasl.core.String>>;

    @Prop({
      group: '数据属性',
      title: '数据类型',
      description: '日历表格中每项的数据类型',
    })
    dataSchema: nasl.core.String;

    @Prop({
      group: '数据属性',
      title: '表格首项字段',
      description: '表格第一项内容的在 data-source 中的标识',
      setter: { concept: 'InputSetter' },
    })
    firstField: nasl.core.String = 'parent.name';

    @Prop({
      group: '数据属性',
      title: '主关键字段',
      description: '主数据源中的关键字段，用来将主/子数据源的数据关联',
      setter: { concept: 'InputSetter' },
    })
    parentKey: nasl.core.String = 'parent.name';

    @Prop({
      group: '数据属性',
      title: '子关键字段',
      description: '子数据源中的关键字段，用来将主/子数据源的数据关联',
      setter: { concept: 'InputSetter' },
    })
    childKey: nasl.core.String = 'child.name';

    @Prop({
      group: '数据属性',
      title: '数据内表示开始时间的字段',
      description: '数据内表示开始时间的字段',
      setter: { concept: 'InputSetter' },
    })
    startKey: nasl.core.String = 'startTime';

    @Prop({
      group: '数据属性',
      title: '数据内表示结束时间的字段',
      description: '数据内表示结束时间的字段',
      setter: { concept: 'InputSetter' },
    })
    endKey: nasl.core.String = 'endTime';

    @Prop({
      group: '数据属性',
      title: '直接传入的数据',
      description: '若传入数组则优先使用该数据，不再依赖数据源合并结果',
    })
    data: nasl.collection.List<nasl.collection.Map<nasl.core.String, nasl.core.String>>;

    @Prop({
      group: '主要属性',
      title: '最小日期',
      description: '最小日期，默认 5 年前',
      setter: { concept: 'InputSetter' },
    })
    minDate: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '最大日期',
      description: '最大日期，默认 4 年后',
      setter: { concept: 'InputSetter' },
    })
    maxDate: nasl.core.String;

    @Prop({
      group: '主要属性',
      title: '表格首项标题',
      description: '表格第一项内容的标题',
      setter: { concept: 'InputSetter' },
    })
    firstTitle: nasl.core.String = '姓名';

    @Prop({
      group: '主要属性',
      title: '表格项宽度',
      description: "表格每一项内容的宽度，默认 48 表示 '48px'",
      setter: { concept: 'InputSetter' },
    })
    width: nasl.core.String | nasl.core.Integer = 48;

    @Prop({
      group: '主要属性',
      title: '表格首项宽度',
      description: "表格首项宽度，默认 64 表示 '64px'",
      setter: { concept: 'InputSetter' },
    })
    firstWidth: nasl.core.String | nasl.core.Integer = 64;

    @Prop({
      group: '主要属性',
      title: '每页条数',
      description: '每页条数',
      setter: { concept: 'NumberInputSetter' },
    })
    pageSize: nasl.core.Integer = 20;

    @Event({
      title: '年份日期改变时',
      description: '年份或月份改变时触发，event.value 为 YYYY-MM 字符串',
    })
    onChange: (event: { value: nasl.core.String }) => void;

    @Slot({
      title: '默认',
      description: '自定义选项的结构和样式',
    })
    slotDefault: (
      current: nasl.ui.Current<nasl.collection.Map<nasl.core.String, nasl.core.String>>,
    ) => Array<nasl.ui.ViewComponent>;
  }
}
