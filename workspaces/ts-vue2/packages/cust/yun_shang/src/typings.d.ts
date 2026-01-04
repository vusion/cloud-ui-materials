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
    ideusage?: {
      idetype?: 'element' | 'modal' | 'popover' | 'container' | string;
      [key: string]: any;
    };
  }

  export function ExtensionComponent(options?: ExtensionComponentOptions): (target: any) => void;
}

declare module 'virtual-lcap:lcap-ui' {
  export const ULinearLayout: any;
  export const UAbsoluteLayout: any;
  export const UGridLayout: any;
  export const UGridLayoutRow: any;
  export const UGridLayoutColumn: any;
  export const UMultiLayout: any;
  export const UMultiLayoutItem: any;
  export const UCrumb: any;
  export const UCrumbItem: any;
  export const USidebar: any;
  export const USidebarItem: any;
  export const USidebarGroup: any;
  export const USidebarDivider: any;
  export const UNavbarMulti: any;
  export const UNavbarItemMulti: any;
  export const UNavbarDividerMulti: any;
  export const UNavbarDropdownMulti: any;
  export const UNavbarMenuMulti: any;
  export const UNavbarMenuGroupMulti: any;
  export const UNavbarMenuItemMulti: any;
  export const UNavbarMenuDividerMulti: any;
  export const UNavbarSelectMulti: any;
  export const UNavbarSelectGroupMulti: any;
  export const UNavbarSelectItemMulti: any;
  export const UNavbarSelectDividerMulti: any;
  export const UNavbarGroupMulti: any;
  export const UDropdown: any;
  export const UDropdownItem: any;
  export const UDropdownGroup: any;
  export const UToc: any;
  export const UTocItem: any;
  export const UAnchor: any;
  export const URouterView: any;
  export const UIframe: any;
  export const UPanel: any;
  export const UPanelGroup: any;
  export const UCollapse: any;
  export const UCollapseItem: any;
  export const UCard: any;
  export const UCardGroup: any;
  export const UText: any;
  export const ULink: any;
  export const UButton: any;
  export const IIco: any;
  export const UGallery: any;
  export const ULabel: any;
  export const UBadge: any;
  export const UCarousel: any;
  export const UCarouselItem: any;
  export const UInfoList: any;
  export const UInfoListItem: any;
  export const UInfoListGroup: any;
  export const UImage: any;
  export const UAlert: any;
  export const UCountDown: any;
  export const UDivider: any;
  export const UTimeline: any;
  export const UTimelineItem: any;
  export const UTableView: any;
  export const UTableViewColumn: any;
  export const UTableViewColumnConfig: any;
  export const UTableViewColumnDynamic: any;
  export const UTableViewColumnGroup: any;
  export const UTableViewExpander: any;
  export const UListView: any;
  export const UGridView: any;
  export const UCalendarView: any;
  export const UListComponents: any;
  export const UForm: any;
  export const UFormItem: any;
  export const UFormGroup: any;
  export const UInput: any;
  export const UNumberInput: any;
  export const UTextarea: any;
  export const URadios: any;
  export const URadio: any;
  export const USwitch: any;
  export const UCheckboxes: any;
  export const UCheckbox: any;
  export const UCapsules: any;
  export const UCapsule: any;
  export const UCapsulesGroup: any;
  export const URate: any;
  export const UComboSlider: any;
  export const UUploader: any;
  export const UValidator: any;
  export const UTabs: any;
  export const UTab: any;
  export const USelectableSteps: any;
  export const USelectableStep: any;
  export const UPagination: any;
  export const USelect: any;
  export const USelectItem: any;
  export const USelectGroup: any;
  export const USelectDivider: any;
  export const UCascader: any;
  export const URegionSelect: any;
  export const UTreeViewNew: any;
  export const UTreeViewNodeNew: any;
  export const UTransfer: any;
  export const UDatePicker: any;
  export const UTimePicker: any;
  export const UDateTimePicker: any;
  export const UTreeSelectNew: any;
  export const ULinearProgress: any;
  export const UCircularProgress: any;
  export const UPopupCombination: any;
  export const UModal: any;
  export const UDrawer: any;
  export const UToastSingle: any;
  export const EWatermark: any;
  export const UCopy: any;
  export const UTaskbox: any;
  export const UProcessTaskbox: any;
  export const UProcessMyprocess: any;
  export const UProcessButton: any;
  export const UProcessInfo: any;
  export const UProcessRecord: any;
  export const UProcessGraph: any;
}
