/// <reference types="@nasl/types" />
namespace extensions.cw_dynamic_form_library.viewComponents {
  const { Component, Prop, ViewComponent, Slot, Method, Param, Event, ViewComponentOptions } = nasl.ui;
  type ViewComponent = nasl.ui.ViewComponent;

  @ExtensionComponent({
    type: 'pc',
    ideusage: {
      idetype: 'element',
    }
  })
  @Component({
    title: '自动完成',
    description: '自动完成',
  })
  export class CwAntdAutoComplete<T, V> extends ViewComponent {
    constructor(options?: Partial<CwAntdAutoCompleteOptions<T, V>>) {
      super();
    }
  }

  export class CwAntdAutoCompleteOptions<T, V> extends ViewComponentOptions {
    @Prop({
      group: '数据属性',
      title: '数据源',
      description: '展示数据的输入源，可设置为集合类型变量（List<T>）或输出参数为集合类型的逻辑。',
      docDescription: '支持动态绑定集合类型变量（List<T>）或输出参数为集合类型的逻辑',
      designerValue: [{}, {}, {}],
    })
    dataSource: { list: nasl.collection.List<T>; total: nasl.core.Integer } | nasl.collection.List<T>;

    @Prop({
      group: '数据属性',
      title: '数据类型',
      description: '数据源返回的数据结构的类型，自动识别类型进行展示说明',
      docDescription: '该属性为只读状态，当数据源动态绑定集合List<T>后，会自动识别T的类型并进行展示。',
    })
    dataSchema: T;

    @Prop<CwAntdAutoCompleteOptions<T, V>, 'valueField'>({
      group: '数据属性',
      title: '值字段',
      description: '集合的元素类型中，用于标识选中值的属性',
      docDescription: '集合的元素类型中，用于标识选中值的属性，支持自定义变更',
      setter: {
        concept: 'PropertySelectSetter',
      },
    })
    valueField: (item: T) => V = ((item: any) => item.value) as any;

    @Prop<CwAntdAutoCompleteOptions<T, V>, 'textField'>({
      group: '数据属性',
      title: '文本字段',
      description: '集合的元素类型中，用于标识显示文本的属性',
      docDescription: '集合的元素类型中，用于标识显示文本的属性，支持自定义变更',
      setter: {
        concept: 'PropertySelectSetter',
      },
    })
    textField: (item: T) => nasl.core.String = ((item: any) => item.label) as any;

    @Prop({
      title: '选中值',
      description: '当前选中的值',
      setter: {
        concept: 'InputSetter'
      }
    })
    value: nasl.core.String = '';

    @Prop({
      title: '输入框提示',
      description: '输入框提示',
      setter: {
        concept: 'InputSetter'
      }
    })
    placeholder: nasl.core.String = '';

    @Event({
      title: '值改变事件',
      description: '值改变事件'
    })
    onChange: (value: nasl.core.String) => void;
  }
}
