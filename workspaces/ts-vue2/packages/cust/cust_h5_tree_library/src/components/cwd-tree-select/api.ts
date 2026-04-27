/// <reference types="@nasl/types" />

namespace extensions.vue_library_example.viewComponents {
  const { Component, Prop, ViewComponent, Slot, Method, Param, Event, ViewComponentOptions } = nasl.ui;

  @ExtensionComponent({
    type: 'h5'
  })
  @Component({
    title: '树选择器',
    description: '适用于H5的树形结构选择组件，支持单选、多选、搜索、清除等功能',
  })
  export class CwdTreeSelect<T, V> extends ViewComponent {
    @Prop({
      title: '选中值',
      description: '当前选中的值',
      sync: true
    })
    value: nasl.collection.List<V> | V;

    @Method({
      title: '清空选择',
      description: '清空所有已选择的项',
    })
    clear(): void {}

    @Method({
      title: '展开所有节点',
      description: '展开树的所有节点',
    })
    expandAll(): void {}

    @Method({
      title: '收起所有节点',
      description: '收起树的所有节点',
    })
    collapseAll(): void {}

    @Method({
      title: '重新加载数据',
      description: '重新加载数据源',
    })
    reload(): void {}

    constructor(options?: Partial<CwdTreeSelectOptions<T, V>>) {
      super();
    }
  }

  export class CwdTreeSelectOptions<T, V> extends ViewComponentOptions {
    @Prop({
      group: '数据属性',
      title: '数据源',
      description: '展示数据的输入源，可设置为数据集对象或者返回数据集的逻辑',
      setter: {
        concept: 'InputSetter'
      }
    })
    dataSource: { list: nasl.collection.List<T>; total: nasl.core.Integer } | nasl.collection.List<T>;

    @Prop({
      group: '数据属性',
      title: '数据类型',
      description: '数据源返回的数据结构的类型，自动识别类型进行展示说明',
    })
    dataSchema: T;

    @Prop({
      group: '数据属性',
      title: '值字段',
      description: '用于标识节点值的字段名',
      setter: {
        concept: 'PropertySelectSetter'
      }
    })
    valueField: (item: T) => V;

    @Prop({
      group: '数据属性',
      title: '文本字段',
      description: '用于显示节点文本的字段名',
      setter: {
        concept: 'PropertySelectSetter'
      }
    })
    textField: (item: T) => nasl.core.String;

    @Prop({
      group: '数据属性',
      title: '父节点字段',
      description: '用于标识父节点的字段名，如果不填写则自动检测常用字段名',
      setter: {
        concept: 'PropertySelectSetter'
      }
    })
    parentIdField: (item: T) => V;

    @Prop({
      group: '主要属性',
      title: '选中值',
      description: '当前选中的值',
      sync: true
    })
    value: nasl.collection.List<V> | V;

    @Prop({
      group: '主要属性',
      title: '占位符',
      description: '输入框占位符文本',
      setter: {
        concept: 'InputSetter'
      }
    })
    placeholder: nasl.core.String = '请选择';

    @Prop({
      group: '交互属性',
      title: '多选模式',
      description: '是否支持多选',
      setter: {
        concept: 'SwitchSetter'
      }
    })
    multiple: nasl.core.Boolean = false;

    @Prop({
      group: '交互属性',
      title: '可搜索',
      description: '是否支持搜索功能',
      setter: {
        concept: 'SwitchSetter'
      }
    })
    searchable: nasl.core.Boolean = true;

    @Prop({
      group: '交互属性',
      title: '可清除',
      description: '是否显示清除按钮',
      setter: {
        concept: 'SwitchSetter'
      }
    })
    clearable: nasl.core.Boolean = true;

    @Prop({
      group: '交互属性',
      title: '父子节点关联',
      description: '多选模式下，父子节点选中状态是否关联',
      setter: {
        concept: 'SwitchSetter'
      }
    })
    checkRelation: nasl.core.Boolean = false;

    @Prop({
      group: '样式属性',
      title: '组件高度',
      description: '组件输入框的高度，单位为px',
      setter: {
        concept: 'NumberInputSetter'
      }
    })
    height: nasl.core.Integer = 44;

    @Prop({
      group: '样式属性',
      title: '下拉面板高度',
      description: '下拉面板的最大高度，单位为px',
      setter: {
        concept: 'NumberInputSetter'
      }
    })
    dropdownHeight: nasl.core.Integer = 300;

    @Prop({
      group: '样式属性',
      title: '挂载到 body',
      description: '是否将弹出层挂载到 body 元素下，解决容器遮挡问题',
      setter: {
        concept: 'SwitchSetter'
      }
    })
    appendToBody: nasl.core.Boolean = false;

    @Prop({
      group: '样式属性',
      title: '弹出方向',
      description: '下拉面板的弹出方向',
      setter: {
        concept: 'EnumSelectSetter',
        options: [
          { title: '自动', value: 'auto' },
          { title: '向下', value: 'bottom' },
          { title: '向上', value: 'top' }
        ]
      }
    })
    placement: 'auto' | 'bottom' | 'top' = 'auto';

    disabled: nasl.core.Boolean = false;

    @Prop({
      group: '样式属性',
      title: '最多显示标签数',
      description: '多选模式下最多显示的标签数量，超出时显示省略',
      setter: {
        concept: 'NumberInputSetter'
      }
    })
    maxTagCount: nasl.core.Integer = 3;

    @Event({
      title: '选择改变',
      description: '选中值改变时触发',
    })
    onChange: (event: {
      value: V | nasl.collection.List<V>;
      values: nasl.collection.List<V>;
      item: T;
      items: nasl.collection.List<T>;
    }) => void;

    @Event({
      title: '单选后',
      description: '单选模式下选中值改变时触发',
    })
    onSingleSelect: (event: {
      value: V;
      item: T;
    }) => void;

    @Event({
      title: '多选后',
      description: '多选模式下选中值改变时触发',
    })
    onMultipleSelect: (event: {
      values: nasl.collection.List<V>;
      items: nasl.collection.List<T>;
    }) => void;

    @Event({
      title: '展开改变',
      description: '节点展开状态改变时触发',
    })
    onExpand: (event: {
      expanded: nasl.core.Boolean;
      node: T;
      expandedNodes: nasl.collection.List<T>;
    }) => void;

    @Event({
      title: '搜索',
      description: '搜索内容改变时触发',
    })
    onSearch: (event: {
      query: nasl.core.String;
    }) => void;

    @Event({
      title: '清除',
      description: '点击清除按钮时触发',
    })
    onClear: (event: null) => void;

    @Slot({
      title: '下拉面板内容',
      description: '自定义下拉面板显示的内容，可以完全替代默认的树结构',
    })
    slotDefault: () => Array<nasl.ui.ViewComponent>;
  }
}