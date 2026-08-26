declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}
declare module '*.module.less' {
  const classes: { [key: string]: string };
  export default classes;
}
declare module 'print-js' {
  interface PrintJSOptions {
    printable: string;
    type?: string;
    scanStyles?: boolean;
    documentTitle?: string;
    style?: string;
  }
  function printJS(options: PrintJSOptions | string): void;
  export default printJS;
}
