declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}
declare module '*.module.less' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module 'wybie-watermark' {
  interface WaterMarkInstance {
    remove(): void;
  }

  interface WaterMarkStatic {
    init(config: Record<string, unknown>): Promise<WaterMarkInstance>;
  }

  const WaterMark: WaterMarkStatic;
  export default WaterMark;
}
