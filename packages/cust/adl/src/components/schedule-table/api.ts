/// <reference types="@nasl/types" />
namespace extensions.adl.viewComponents {
  const { Component, Prop, ViewComponent, Slot, Method, Event, ViewComponentOptions } = nasl.ui;

  @ExtensionComponent({
    type: 'pc',
    ideusage: {
      idetype: 'element',
    },
  })
  @Component({
    title: '排班表格',
    description: '排班表格',
  })
  export class ScheduleTable extends ViewComponent {
    constructor(options?: Partial<ScheduleTableOptions>) {
      super();
    }
  }

  export class ScheduleTableOptions extends ViewComponentOptions {
    @Prop({
      title: '年',
      description: '年份信息',
      setter: {
        concept: 'NumberInputSetter',
      },
    })
    year: nasl.core.Integer = 2025;

    @Prop({
      title: '月',
      description: '月份信息',
      setter: {
        concept: 'NumberInputSetter',
      },
    })
    month: nasl.core.Integer = 1;

    @Prop({
      title: '姓名列表',
      description: '形如["阿狸","提莫","盖伦","琴女","安妮"]',
      setter: {
        concept: 'InputSetter',
      },
    })
    names: nasl.collection.List<nasl.core.String> = [];

    @Prop({
      title: '值',
      description: '排班表格形如二级嵌套数组',
      setter: {
        concept: 'InputSetter',
      },
    })
    value: nasl.collection.List<any> = [];

    @Prop({
      title: '排班选择器参数',
      description:
        '形如{ label: "白班", value: "白班", highlight: "green" }, { label: "夜班", value: "夜班", highlight: "red" }, { label: "休息", value: "休息" }',
      setter: {
        concept: 'InputSetter',
      },
    })
    options: nasl.collection.List<any> = [];

    @Prop({
      title: '夜班的文本标识',
      description: '夜班的文本标识',
      setter: {
        concept: 'InputSetter',
      },
    })
    nightShiftValue: nasl.core.String = '夜班';

    @Prop({
      title: '休息的文本标识',
      description: '休息的文本标识',
      setter: {
        concept: 'InputSetter',
      },
    })
    restAfterNightShiftValue: nasl.core.String = '休息';

    @Prop({
      title: '节假日提示映射',
      description: '用于指定哪些日期为节假日，并配置对应提示文案，格式为 { "2025-05-01": "劳动节" }',
      setter: {
        concept: 'InputSetter',
      },
    })
    holidays: nasl.collection.Map<nasl.core.String, nasl.core.String> = {};

    @Prop({
      title: '节假日高亮颜色',
      description: '节假日表头背景色，用于突出显示法定假日，支持任意合法 CSS 颜色值',
      setter: {
        concept: 'InputSetter',
      },
    })
    holidayColor: nasl.core.String = '';

    @Event({
      title: '值变化时',
      description: '值变化时触发',
    })
    onInput: (event: nasl.collection.List<nasl.collection.List<nasl.core.String>>) => void;
  }
}
