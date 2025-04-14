import * as naslTypes from '@nasl/ast-mini';
import type { ProcessV2 } from '../index';
import { logicNamespace } from '../../../src/components/utils';

export function genProcessV2LaunchLogic(
  entityFullName: string,
  process: ProcessV2,
  nameGroup: any,
) {
  return `export function ${nameGroup.processLaunch}(param1: ${entityFullName}) {
    let variable1;
    let result;
    variable1 = ${entityFullName}Entity.create(param1);
    result = ${logicNamespace}.launchProcess(nasl.util.NewAnonymousStructure({ data:variable1 }), '${process.uniqueKey}');
    return result;
  }`;
}
