declare namespace extensions.vue_library_example.viewComponents {
  const ViewComponent: typeof nasl.ui.ViewComponent, ViewComponentOptions: typeof nasl.ui.ViewComponentOptions;
  export class CwdGlobalApiMonitor extends ViewComponent {
    constructor(options?: Partial<CwdGlobalApiMonitorOptions>);
    /**
     * 显示加载
     * 手动显示加载动画
     */
    show(): void;
    /**
     * 隐藏加载
     * 手动隐藏加载动画
     */
    hide(): void;
    /**
     * 重置状态
     * 重置监控状态，允许重新开始监控
     */
    reset(): void;
  }
  export class CwdGlobalApiMonitorOptions extends ViewComponentOptions {
    /**
     * 加载提示文字
     * 加载动画显示的提示文字
     */
    loadingText: nasl.core.String;
    /**
     * 自动开始监控
     * 组件挂载后是否自动开始监控接口请求，当检测到请求时显示加载动画
     */
    autoStart: nasl.core.Boolean;
    /**
     * 加载完成
     * 当所有接口请求完成并关闭加载动画时触发
     */
    onLoadingComplete: (event: null) => void;
  }
  export {};
}