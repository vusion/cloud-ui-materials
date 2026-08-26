declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}
declare module '*.module.less' {
  const classes: { [key: string]: string };
  export default classes;
}

declare class Highlight {
  constructor(...ranges: Range[]);
}

interface HighlightRegistry {
  set(name: string, highlight: Highlight): void;
  delete(name: string): void;
  clear(): void;
}

interface CSSNamespace {
  highlights: HighlightRegistry;
}

interface CSS {
  highlights: HighlightRegistry;
}

declare module 'xss' {
  interface IWhiteList {
    [key: string]: string[];
  }
  interface IFiltersXSSOptions {
    whiteList?: IWhiteList;
  }
  export class FilterXSS {
    constructor(options?: IFiltersXSSOptions);
    process(html: string): string;
  }
}

declare module 'file-saver' {
  export function saveAs(data: Blob, filename?: string): Promise<void>;
}

declare module 'typed.js' {
  interface TypedOptions {
    strings?: string[];
    typeSpeed?: number;
    showCursor?: boolean;
  }
  export default class Typed {
    constructor(element: string | Element, options?: TypedOptions);
    destroy(): void;
  }
}
