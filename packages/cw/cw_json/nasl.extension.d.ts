declare namespace extensions.cw_json.viewComponents {
  const ViewComponent: typeof nasl.ui.ViewComponent, ViewComponentOptions: typeof nasl.ui.ViewComponentOptions;
  export class CwJsonPretty extends ViewComponent {
    constructor(options?: Partial<CwJsonPrettyOptions>);
  }
  export class CwJsonPrettyOptions extends ViewComponentOptions {
    /**
     * json
     * json
     */
    jsonData: nasl.core.String;
    /**
     * 是否显示行号
     * 是否显示行号
     */
    showLines: nasl.core.Boolean;
    /**
     * 是否显示行号
     * 是否显示行号
     */
    showTypes: nasl.core.Boolean;
    /**
     * 控制显示的JSON深度
     * 控制显示的JSON深度
     */
    deep: nasl.core.Integer;
    /**
     * 是否允许JSON展开/折叠
     * 是否允许JSON展开/折叠
     */
    expandable: nasl.core.Boolean;
    /**
     * 控制缩进的空格数
     * 控制缩进的空格数
     */
    indentSpacing: nasl.core.Integer;
    /**
     * 选择主题
     * 选择主题
     */
    theme: 'light' | 'dark';
  }
  export {};
}