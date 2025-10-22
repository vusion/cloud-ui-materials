import * as naslTypes from '@nasl/ast-mini';
import { genPcCreateBlock, genPcApproveBlock, genPcProcessFormBlock } from './pc';

export interface ProcessV2 {
  concept: 'ProcessV2';
  uniqueKey: string;
  name: string;
  title: string;
  description: string;
  bind: any;
  processDefinitions: any[];
  nextVersion: number;
  previewedVersion: number;
  getAncestor: any;
}

export default [
  // pc端
  {
    name: 'apply-page',
    title: '一键生成申请页',
    frameworkKind: 'vue2',
    scope: 'pc',
    genBlock: (entity: naslTypes.Entity, parentElement: naslTypes.ViewElement, process: ProcessV2) =>
      genPcCreateBlock(entity, parentElement, process),
  },
  {
    name: 'approve-page',
    title: '一键生成审批页',
    frameworkKind: 'vue2',
    scope: 'pc',
    genBlock: (entity: naslTypes.Entity, parentElement: naslTypes.ViewElement, process: ProcessV2) =>
      genPcApproveBlock(entity, parentElement, process),
  },
  {
    name: 'customize-process-form',
    title: '根据所选属性，定制流程表单',
    frameworkKind: 'vue2',
    scope: 'pc',
    genBlock: (entity: naslTypes.Entity, source: any, parentElement: naslTypes.ViewElement, process: ProcessV2) =>
      genPcProcessFormBlock(entity, source, parentElement, process),
  },
];
