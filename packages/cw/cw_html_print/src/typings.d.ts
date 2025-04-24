declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}
declare module '*.module.less' {
  const classes: { [key: string]: string };
  export default classes;
}

namespace nasl.ui {
  export class BaseEvent {}
  export class ValidateResult {
    rawValue: nasl.core.String;
    value: nasl.core.String;
    trigger: nasl.core.String;
    muted: nasl.core.String;
    valid: nasl.core.Boolean;
    touched: nasl.core.Boolean;
    dirty: nasl.core.Boolean;
    firstError: nasl.core.String;
  }
}

namespace nasl.core {
  export class StringLiteral<T> {
    _value: T;
  }
}

declare namespace extensions {
  export interface ExtensionComponentOptions {
    type: 'pc' | 'h5' | 'both';
    show?: boolean;
    replaceNaslUIComponent?: string;
    extends?: any;
    ideusage?: {
      idetype?: 'element' | 'modal' | 'popover' | 'container' | string;
      [key: string]: any;
    };
  }

  export function ExtensionComponent(options?: ExtensionComponentOptions): (target: any) => void;
}
