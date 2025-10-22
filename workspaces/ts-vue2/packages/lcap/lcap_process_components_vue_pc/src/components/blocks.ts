import * as naslTypes from '@nasl/ast-mini';
// pc端
import { genFlProcessInfo } from './fl-process-info/blocks';
import { genFlProcessRecordTable, genFlProcessRecordTimeline } from './fl-process-record/blocks';
import { genFlProcessForm } from './fl-process-form/blocks';
import { genFlProcessMyProcess } from './fl-process-my-process/blocks';
import { genFlProcessTaskBox } from './fl-process-task-box/blocks';
import { genFlProcessGraph } from './fl-process-graph/blocks';
import { genFlProcessButton } from './fl-process-button/blocks';

export default [
  // pc端
  {
    name: 'fl-process-info',
    title: '生成流程信息组件',
    frameworkKind: 'vue2',
    scope: 'pc',
    genBlock: (node: naslTypes.ViewElement) => genFlProcessInfo(node),
  },
  {
    name: 'fl-process-record-table',
    title: '生成流程记录表格组件',
    frameworkKind: 'vue2',
    scope: 'pc',
    genBlock: (node: naslTypes.ViewElement) => genFlProcessRecordTable(node),
  },
  {
    name: 'fl-process-record-timeline',
    title: '生成流程记录时间线组件',
    frameworkKind: 'vue2',
    scope: 'pc',
    genBlock: (node: naslTypes.ViewElement) => genFlProcessRecordTimeline(node),
  },
  {
    name: 'fl-process-form',
    title: '生成流程表单组件',
    frameworkKind: 'vue2',
    scope: 'pc',
    genBlock: (node: naslTypes.ViewElement) => genFlProcessForm(node),
  },
  {
    name: 'fl-process-my-process',
    title: '生成我的流程组件',
    frameworkKind: 'vue2',
    scope: 'pc',
    genBlock: (node: naslTypes.ViewElement) => genFlProcessMyProcess(node),
  },
  {
    name: 'fl-process-task-box',
    title: '生成任务箱组件',
    frameworkKind: 'vue2',
    scope: 'pc',
    genBlock: (node: naslTypes.ViewElement) => genFlProcessTaskBox(node),
  },
  {
    name: 'fl-process-graph',
    title: '生成流程图组件',
    frameworkKind: 'vue2',
    scope: 'pc',
    genBlock: (node: naslTypes.ViewElement) => genFlProcessGraph(node),
  },
  {
    name: 'fl-process-button',
    title: '生成流程按钮组件',
    frameworkKind: 'vue2',
    scope: 'pc',
    genBlock: (node: naslTypes.ViewElement) => genFlProcessButton(node),
  },
];
