/// <reference types="@nasl/types" />
/// <reference types="../../../.lcap/lcap-ui/runtime/nasl.ui.d.ts" />

namespace extensions.cloudui_text {
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
    @Component({
        title: '锚点',
        icon: 'anchor',
        description: '锚点',
        group: "Navigation"
    })
    export class UAnchor extends ViewComponent {

        constructor(options?: Partial<UAnchorOptions>) { super(); }
    }

    export class UAnchorOptions extends ViewComponentOptions {
        @Prop({
            group: '数据属性',
            title: '标识',
            description: '锚点的唯一标识，用于跳转链接，如“/page#linkname”',
            docDescription: '锚点的唯一标识，用于跳转链接，标识为空时，默认将组件名作为标识',
            implicitToString: true,
        })
        label: nasl.core.String;

        @Slot({
            title: '默认',
            description: '内容',
        })
        slotDefault: () => Array<nasl.ui.ViewComponent>;
    }
}
