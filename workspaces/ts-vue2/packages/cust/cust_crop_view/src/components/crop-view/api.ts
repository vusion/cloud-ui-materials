/// <reference types="@nasl/types" />
namespace extensions.cust_crop_view.viewComponents {
  const { Component, Prop, ViewComponent, Slot, Method, Event, ViewComponentOptions } = nasl.ui;

  @ExtensionComponent({
    type: 'pc',
    ideusage: {
      idetype: 'element',
    }
  })
  @Component({
    title: '选区组件',
    description: '选区组件',
  })
  export class CropView extends ViewComponent {

    @Method({
      title: '完成',
      description: '完成',
    })
    finish(): void {}
    
    constructor(options?: Partial<CropViewOptions>) {
      super();
    }
  }

  export class CropViewOptions extends ViewComponentOptions {
     @Prop({
      title: '图片',
      description: '图片地址',
      setter: {
        concept: 'InputSetter'
      }
    })
    img: nasl.core.String = '';


    @Event({
      title: '图片加载完成',
      description: '图片加载完成',
    })
    onImgLoad: (e: any) => void 

    @Event({
      title: '完成时',
      description: '完成',
    })
    onFinish: (e: any) => void 
  }
}
