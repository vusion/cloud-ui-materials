import * as naslTypes from '@nasl/ast-mini';
// h5端
import { genOwProcessInfo } from './ow-process-info/blocks';
import { genOwProcessMyProcess } from './ow-process-my-process/blocks';
import { genOwProcessRecordTable, genOwProcessRecordTimeline } from './ow-process-record/blocks';
import { genOwProcessForm } from './ow-process-form/blocks';
import { genOwProcessButton } from './ow-process-button/blocks';

export default [
  // h5端
  {
    name: 'ow-process-info',
    title: '生成流程信息组件',
    frameworkKind: 'vue2',
    scope: 'h5',
    genBlock: (node: naslTypes.ViewElement) => genOwProcessInfo(node),
  },
  {
    name: 'ow-process-my-process',
    title: '生成我的流程组件',
    frameworkKind: 'vue2',
    scope: 'h5',
    genBlock: (node: naslTypes.ViewElement) => genOwProcessMyProcess(node),
  },
  {
    name: 'ow-process-record-table',
    title: '生成流程记录表格组件',
    frameworkKind: 'vue2',
    scope: 'h5',
    genBlock: (node: naslTypes.ViewElement) => genOwProcessRecordTable(node),
  },
  {
    name: 'ow-process-record-timeline',
    title: '生成流程记录时间线组件',
    frameworkKind: 'vue2',
    scope: 'h5',
    genBlock: (node: naslTypes.ViewElement) => genOwProcessRecordTimeline(node),
  },
  {
    name: 'ow-process-form',
    title: '生成流程表单组件',
    frameworkKind: 'vue2',
    scope: 'h5',
    genBlock: (node: naslTypes.ViewElement) => genOwProcessForm(node),
  },
  {
    name: 'ow-process-button',
    title: '生成流程按钮组件',
    frameworkKind: 'vue2',
    scope: 'h5',
    genBlock: (node: naslTypes.ViewElement) => genOwProcessButton(node),
  },
];