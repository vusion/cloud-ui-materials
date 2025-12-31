import * as naslTypes from '@nasl/ast-mini';
import { genH5CreateBlock, genH5ApproveBlock, genH5ProcessFormBlock } from './h5';

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
  // h5端
  {
    name: 'apply-page',
    title: '一键生成申请页',
    frameworkKind: 'vue2',
    scope: 'h5',
    genBlock: (entity: naslTypes.Entity, parentElement: naslTypes.ViewElement, process: ProcessV2) =>
      genH5CreateBlock(entity, parentElement, process),
  },
  {
    name: 'approve-page',
    title: '一键生成审批页',
    frameworkKind: 'vue2',
    scope: 'h5',
    genBlock: (entity: naslTypes.Entity, parentElement: naslTypes.ViewElement, process: ProcessV2) =>
      genH5ApproveBlock(entity, parentElement, process),
  },
  {
    name: 'customize-process-form',
    title: '根据所选属性，定制流程表单',
    frameworkKind: 'vue2',
    scope: 'h5',
    genBlock: (entity: naslTypes.Entity, source: any, parentElement: naslTypes.ViewElement, process: ProcessV2) =>
      genH5ProcessFormBlock(entity, source, parentElement, process),
  },
];
