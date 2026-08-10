declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}
declare module '*.module.less' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module 'virtual-lcap:lcap-ui' {
  export * from '@lcap-ui/es/index.d.ts';
}

declare module '@lcap/vue2-utils' {
  export * from '@lcap/vue2-utils/dist/index';
}

declare module '@lcap/vue2-utils/utils' {
  export function listToTree(
    list: any[],
    options: {
      valueField?: string;
      parentField?: string;
      childrenField?: string;
    },
  ): any[];
}

declare module '@lcap/vue2-utils/plugins/types' {
  export type NaslComponentPluginOptions = any;
  export type Slot = (...args: any[]) => any;
}
