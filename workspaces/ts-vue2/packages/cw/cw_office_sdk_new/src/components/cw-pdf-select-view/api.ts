/// <reference types="@nasl/types" />

namespace extensions.cw_office_sdk_new.viewComponents {
    const { Component, Prop, ViewComponent, Slot, Method, Param, Event, ViewComponentOptions } = nasl.ui;

    @ExtensionComponent({
        type: 'both',
        ideusage: {
            idetype: 'element',
        }
    })
    @Component({
        title: 'pdf选择容器',
        description: 'pdf选择容器',
    })
    export class CwPdfSelectView extends ViewComponent {
        @Prop({
            title: '文件地址',
        })
        value: CwPdfSelectViewOptions['value'];

        @Method({
            title: '上传修改后的pdf',
            description: '上传修改后的pdf',
        })
        uploadFile(): nasl.core.String { return '' }

        @Method({
            title: '获取选择的列表',
            description: '获取选择的列表',
        })
        getSelected(): nasl.collection.List<nasl.core.Integer> { return [] }

        constructor(options?: Partial<CwPdfSelectViewOptions>) {
            super();
        }
    }

    export class CwPdfSelectViewOptions extends ViewComponentOptions {
        @Prop({
            title: '文件地址',
            description: '需要传入的值',
        })
        value: nasl.core.String;

        @Prop({
            title: '文件访问策略',
            description: '文件访问策略',
            setter: {
                concept: 'EnumSelectSetter',
                options: [{ title: '任何人可访问' }, { title: '用户登录后可访问' }],
            },
        })
        access: 'public' | 'private' = 'public';
    }
}

