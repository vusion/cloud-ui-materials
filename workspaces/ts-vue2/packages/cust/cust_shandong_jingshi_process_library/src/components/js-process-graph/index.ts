import JsProcessGraph from './index.vue';

import Vue from 'vue';
import { JFlowVuePlugin } from '@joskii/jflow-vue2-plugin';
import ProcessNodeGroup from "./components/custom/process-node-group.js";
import GatewayGroup from "./components/custom/gateway.js";
import FrameGroup from "./components/custom/frame-group.js";
import TaskNodeGroup from "./components/custom/task-node-group.js";
import FlowBranchLink from "./components/custom/flow-link-branch.js";
Vue.use(JFlowVuePlugin, {
  customGroups: {
    ProcessNodeGroup,
    GatewayGroup,
    FrameGroup,
    TaskNodeGroup,
  },
  customLink: {
    FlowBranchLink
  }
});

export {
  JsProcessGraph,
};

export default JsProcessGraph;
