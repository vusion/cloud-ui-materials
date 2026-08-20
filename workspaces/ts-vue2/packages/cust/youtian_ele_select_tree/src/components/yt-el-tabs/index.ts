import { extendComponent, ElTabs } from 'virtual-lcap:lcap-ui';
import ExtendElTabs from './index.vue';

export const YtElTabs = extendComponent(ElTabs, ExtendElTabs);
export default YtElTabs;

import { ElTabPane as YtElTabPane } from 'virtual-lcap:lcap-ui';
export { YtElTabPane };
