import Vue from 'vue';
import { JFlowVuePlugin } from '@joskii/jflow-vue2-plugin';
import FlProcessGraph from "./index.vue";
import ProcessNodeGroup from "./components/custom/process-node-group.js";
import GatewayGroup from "./components/custom/gateway.js";
// import FlowLink from './components/custom/flow-link';
import FlowBranchLink from "./components/custom/flow-link-branch.js";
Vue.use(JFlowVuePlugin, {
  customGroups: {
    ProcessNodeGroup,
    GatewayGroup
  },
  customLink: {
    FlowBranchLink
  }
});
export default FlProcessGraph;