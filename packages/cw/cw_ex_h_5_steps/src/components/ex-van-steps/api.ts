/// <reference types="@nasl/types" />
/// <reference types="../../../.lcap/lcap-ui/runtime/nasl.ui.d.ts" />
namespace extensions.cw_ex_h_5_steps.viewComponents {
  const {
    Component,
    Prop,
    ViewComponent,
    Slot,
    Method,
    Param,
    Event,
    ViewComponentOptions
  } = nasl.ui;
  @ExtensionComponent({
    replaceNaslUIComponent: "VanSteps",
    type: "h5",
    show: true,
    ideusage: {
      "idetype": "container",
      "structured": true,
      "childAccept": "target.tag === 'ex-van-step'",
      "dataSource": {
        "dismiss": "this.getDefaultElements().length > 0 && !this.getAttribute('dataSource')",
        "display": 3,
        "emptySlot": {
          "display": "inline",
          "condition": "!this.getAttribute('dataSource')",
          "accept": false
        }
      },
      "namedSlotOmitWrapper": ["item"],
      "translateBindingProperty": ["value"]
    }
  })
  @Component({
    title: '步骤条',
    icon: 'steps',
    description: '用于展示操作流程的各个环节，让用户了解当前的操作在整体流程中的位置。',
    group: "Display"
  })
  export class ExVanSteps<T> extends ViewComponent {
    @Prop({
      title: '当前步骤'
    })
    value: ExVanStepsOptions<T>['value'] = 0;
    @Prop({
      title: '数据'
    })
    data: nasl.collection.List<T>;
    @Prop({
      title: '第一步'
    })
    isFirst: nasl.core.Boolean;
    @Prop({
      title: '最后一步'
    })
    isLast: nasl.core.Boolean;
    @Prop({
      title: '禁用'
    })
    disabled: nasl.core.Boolean;
    @Prop({
      title: '只读'
    })
    readonly: nasl.core.Boolean;
    @Method({
      title: '上一步',
      description: '上一步'
    })
    prev(): void {}
    @Method({
      title: '下一步',
      description: '下一步'
    })
    next(): void {}
    @Method({
      title: '重载数据',
      description: '重新加载数据'
    })
    reload(): void {}
    constructor(options?: Partial<ExVanStepsOptions<T>>) {
      super();
    }
  }
  export class ExVanStepsOptions<T> extends ViewComponentOptions {
    @Prop({
      group: '数据属性',
      title: '数据源',
      description: '展示数据的输入源，可设置为数据集对象或者返回数据集的逻辑。',
      designerValue: [{}, {}, {}],
      bindOpen: true
    })
    dataSource: nasl.collection.List<T> | {
      total: nasl.core.Integer;
      list: nasl.collection.List<T>;
    };
    @Prop({
      group: '数据属性',
      title: '数据类型',
      description: '集合类型每一元素的数据类型'
    })
    dataSchema: T;
    @Prop({
      group: '数据属性',
      title: '当前步骤',
      description: '指定当前步骤，从0开始记数。',
      sync: true,
      setter: {
        concept: "NumberInputSetter",
        precision: 0,
        min: 0
      },
      settable: true
    })
    value: nasl.core.Integer = 0;
    @Prop({
      group: '主要属性',
      title: '步骤条方向',
      description: '设置步骤条方向',
      setter: {
        concept: "EnumSelectSetter",
        options: [{
          title: '横向'
        }, {
          title: '垂直'
        }]
      }
    })
    direction: 'horizontal' | 'vertical' = 'horizontal';
    @Prop({
      group: '状态属性',
      title: '只读',
      description: '正常显示，但禁止选择/输入',
      setter: {
        concept: "SwitchSetter"
      },
      settable: true
    })
    readonly: nasl.core.Boolean = false;
    @Prop({
      group: '状态属性',
      title: '禁用',
      description: '置灰显示，且禁止任何交互（焦点、点击、选择、输入等）',
      setter: {
        concept: "SwitchSetter"
      },
      settable: true
    })
    disabled: nasl.core.Boolean = false;
    @Prop({
      group: '状态属性',
      title: '终点激活是否展示为完成',
      description: '终点激活情况下是否需要转为完成状态',
      setter: {
        concept: "SwitchSetter"
      },
      settable: true
    })
    lastFinish: nasl.core.Boolean = true;
    @Event({
      title: '切换步骤时',
      description: '切换步骤时'
    })
    onChangestep: (event: nasl.core.Integer) => void;
    @Slot({
      title: '组件插槽',
      description: '插入`<van-step>`子组件。',
      emptyBackground: 'add-sub',
      snippets: [{
        title: '步骤条项',
        code: '<van-step>stepn</van-step>'
      }]
    })
    slotDefault: () => Array<nasl.ui.ViewComponent>;
    @Slot({
      title: '组件插槽',
      description: '自定义选项的结构和样式'
    })
    slotItem: (current: nasl.ui.Current<T>) => Array<nasl.ui.ViewComponent>;
  }
  @Component({
    title: '步骤条项',
    group: "Display"
  })
  export class ExVanStepItem extends ViewComponent {
    @Prop({
      title: '状态',
    })
    status: 'wait' | 'process' | 'finish' | 'error';

    @Prop({
      title: '禁用',
    })
    disabled: nasl.core.Boolean;

    @Prop({
      title: '只读',
    })
    readonly: nasl.core.Boolean;

    constructor(options?: Partial<ExVanStepItemOptions>) {
      super();
    }
  }
  export class ExVanStepItemOptions extends ViewComponentOptions {
    @Prop({
      group: '主要属性',
      title: '状态',
      description: '设置步骤条的状态，分别为等待中、进行中、已完成、错误。',
      setter: {
        concept: "EnumSelectSetter",
        options: [{
          title: '等待中'
        }, {
          title: '进行中'
        }, {
          title: '已完成'
        }, {
          title: '错误'
        }]
      },
      settable: true,
    })
    status: 'wait' | 'process' | 'finish' | 'error';
    @Prop({
      group: '主要属性',
      title: '图标',
      description: '自定义步骤的图标',
      setter: {
        concept: "IconSetter"
      }
    })
    icon: nasl.core.String;
    @Prop({
      group: '状态属性',
      title: '只读',
      description: '正常显示，但禁止选择/输入',
      setter: {
        concept: "SwitchSetter"
      },
      settable: true,
    })
    readonly: nasl.core.Boolean = false;
    @Prop({
      group: '状态属性',
      title: '禁用',
      description: '置灰显示，且禁止任何交互（焦点、点击、选择、输入等）',
      setter: {
        concept: "SwitchSetter"
      },
      settable: true,
    })
    disabled: nasl.core.Boolean = false;
    @Event({
      title: '点击标题',
      description: '点击标题'
    })
    onClicktitle: (event: nasl.core.Integer) => void;
    @Event({
      title: '点击图标',
      description: '点击图标'
    })
    onClickicon: (event: nasl.core.Integer) => void;

    @Slot({
      title: '',
      description: ''
    })
    slotDefault: () => Array<nasl.ui.ViewComponent>;
  }
}