import { extendComponent, ElTabs as ElTabsComponent } from 'virtual-lcap:lcap-ui';
import ExtendElTabs from './index.vue';

export const ElTabs = extendComponent(ElTabsComponent, ExtendElTabs);
export default ElTabs;

import { ElTabPane } from 'virtual-lcap:lcap-ui';
export { ElTabPane };
