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

declare module 'virtual-lcap:lcap-ui' {
  export const VanAbsoluteLayout: any;
  export const VanAnchor: any;
  export const VanArea: any;
  export const VanBadge: any;
  export const VanButton: any;
  export const VanCalendar: any;
  export const VanCapsules: any;
  export const VanCapsulesItem: any;
  export const VanCapsulesGroup: any;
  export const VanCardu: any;
  export const VanCarduGroup: any;
  export const VanCascader: any;
  export const VanCellGroup: any;
  export const VanCell: any;
  export const VanCheckboxGroup: any;
  export const VanCheckbox: any;
  export const VanCircle: any;
  export const VanCollapse: any;
  export const VanCollapseItem: any;
  export const VanCopy: any;
  export const VanCountDownNew: any;
  export const VanDatetimePicker: any;
  export const VanDatetimePickerActionSlot: any;
  export const VanPickerActionSlot: any;
  export const VanDialog: any;
  export const VanDivider: any;
  export const VanDropdownMenu: any;
  export const VanDropdownItem: any;
  export const VanDropdownItemSon: any;
  export const VanFieldinput: any;
  export const VanFieldtextarea: any;
  export const VanForComponents: any;
  export const VanForm: any;
  export const VanField: any;
  export const VanGallery: any;
  export const VanGridView: any;
  export const VanIconv: any;
  export const VanIframe: any;
  export const VanImage: any;
  export const VanLinearLayout: any;
  export const VanLink: any;
  export const VanListView: any;
  export const VanMyProcess: any;
  export const VanNoticeBar: any;
  export const VanPickerson: any;
  export const VanPopup: any;
  export const VanPopupCombination: any;
  export const VanProcessButton: any;
  export const VanProcessInfo: any;
  export const VanProcessRecord: any;
  export const VanProgress: any;
  export const VanRadioGroup: any;
  export const VanRadio: any;
  export const VanRate: any;
  export const VanRouterView: any;
  export const VanRow: any;
  export const VanCol: any;
  export const VanSearch: any;
  export const VanSidebar: any;
  export const VanSidebarItem: any;
  export const VanSlider: any;
  export const VanStepperNew: any;
  export const VanSteps: any;
  export const VanStep: any;
  export const VanSwipe: any;
  export const VanSwipeItem: any;
  export const VanSwipeCell: any;
  export const VanSwitch: any;
  export const VanTabbar: any;
  export const VanTabbarItem: any;
  export const VanTabs: any;
  export const VanTab: any;
  export const VanTag: any;
  export const VanText: any;
  export const VanToast: any;
  export const VanUploader: any;
}
