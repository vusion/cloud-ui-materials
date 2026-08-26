declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}
declare module '*.module.less' {
  const classes: { [key: string]: string };
  export default classes;
}
declare module '*?url' {
  const src: string;
  export default src;
}
declare module 'downloadjs' {
  const download: (data: BlobPart, filename?: string, mimeType?: string) => void;
  export default download;
}
declare module 'panzoom' {
  const panzoom: (element: HTMLElement, options?: Record<string, unknown>) => {
    dispose: () => void;
  };
  export default panzoom;
}
