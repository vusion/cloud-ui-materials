/// <reference types="@nasl/types" />
namespace extensions.vue_library_demo.viewComponents {
  const { Component, Prop, ViewComponent, Slot, Method, Event, ViewComponentOptions } = nasl.ui;

  @ExtensionComponent({
    type: 'both',
  })
  @Component({
    title: 'uniSDK登录组件',
    description: 'uniSDK登录组件',
    icon: 'file.svg',
  })
  export class UniSdkLogin<T, V> extends ViewComponent {
    constructor(options?: Partial<UniSdkLoginOptions<T, V>>) {
      super();
    }
  }

  export class UniSdkLoginOptions<T, V> extends ViewComponentOptions {
    @Prop({
      title: '服务协议',
      description: '服务协议',
    })
    serviceAgreement: nasl.core.String = 'https://protocol.unisdk.netease.com/release/latest_v5.html';

    @Prop({
      title: '隐私协议',
      description: '隐私协议',
    })
    privacyAgreement: nasl.core.String = 'https://unisdk.update.netease.com/html/latest_v90.html';

    @Prop({
      title: '儿童信息保护及监护人须知',
      description: '儿童信息保护及监护人须知',
    })
    childrenPolicy: nasl.core.String = 'https://protocol.unisdk.netease.com/release/latest_v106.html';

    @Prop({
      title: '配置数据',
      description: '配置数据',
      sync: true,
      setter: {
        concept: 'InputSetter'
      }
    })
    URSConfig: nasl.core.String = '{}'

    @Event({
      title: '登录成功',
      description: '登录成功时触发',
    })
    onSuccess: (event: {
      value: V,
      item: T,
    }) => void;
  }

}