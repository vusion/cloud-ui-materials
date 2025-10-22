import * as naslTypes from '@nasl/ast-mini';
import { logicNamespace, structureNamespace } from '../../utils';

// 生成流程图
export function genFlProcessGraph(node: naslTypes.ViewElement | any) {
  const view = node.likeComponent;
  // 流程需要使用页面输入参数‘taskId’，且不带数字后缀，这里不做唯一性命名
  const hasTaskIdParam = view.params.some((param: any) => param.name === 'taskId');
  if (!hasTaskIdParam) {
    view.addParam({
      concept: 'Param',
      name: 'taskId',
      typeAnnotation: {
        concept: 'TypeAnnotation',
        typeKind: 'primitive',
        typeNamespace: 'nasl.core',
        typeName: 'String',
      },
    });
  }
  const nameGroup = {
    getProcInstGraphEvent: view.getLogicUniqueName('getProcInstGraph'), // 获取流程图
  };

  view.addLogic({
    concept: view.concept === 'View' ? 'Logic' : 'BusinessLogic',
    name: `${nameGroup.getProcInstGraphEvent}`,
    description: '获取流程图',
    params: [],
    returns: [
      {
        concept: 'Return',
        name: 'result',
        typeAnnotation: {
          concept: 'TypeAnnotation',
          typeKind: 'generic',
          typeNamespace: 'nasl.collection',
          typeName: 'List',
          typeArguments: [
            {
              concept: 'TypeAnnotation',
              typeKind: 'reference',
              typeNamespace: structureNamespace,
              typeName: 'ProcInstGraph',
              name: 'T',
            },
          ],
        },
      },
    ],
    variables: [],
    body: [
      {
        concept: 'Start',
        label: '开始',
        folded: false,
      },
      {
        concept: 'Assignment',
        folded: false,
        left: {
          concept: 'Identifier',
          namespace: '',
          name: 'result',
          folded: false,
        },
        right: {
          concept: 'NewList',
          folded: false,
          typeAnnotation: {
            concept: 'TypeAnnotation',
            typeKind: 'generic',
            typeNamespace: 'nasl.collection',
            typeName: 'List',
            inferred: false,
            typeArguments: [
              {
                concept: 'TypeAnnotation',
                typeKind: 'reference',
                typeNamespace: structureNamespace,
                typeName: 'ProcInstGraph',
                name: 'T',
              },
            ],
          },
          items: [
            {
              concept: 'CallLogic',
              calleeNamespace: logicNamespace,
              calleeName: 'getProcInstGraph',
              handleError: false,
              folded: false,
              typeArguments: null,
              arguments: [
                {
                  concept: 'Argument',
                  keyword: 'taskId',
                  folded: false,
                  expression: {
                    concept: 'Identifier',
                    name: 'taskId',
                    folded: false,
                  },
                },
              ],
            },
          ],
        },
      },
      {
        concept: 'End',
        label: '结束',
        folded: false,
      },
    ],
    playground: [],
  });
  node.addBindAttribute({
    concept: 'BindAttribute',
    name: 'dataSource',
    type: 'dynamic',
    value: null,
    expression: {
      concept: 'CallLogic',
      calleeNamespace: '',
      calleeName: `${nameGroup.getProcInstGraphEvent}`,
      handleError: false,
      folded: false,
      typeArguments: null,
      arguments: [],
    },
    playground: [],
  });
  // node.addBindAttribute({
  //   concept: 'BindAttribute',
  //   name: 'taskId',
  //   type: 'dynamic',
  //   value: '',
  //   expression: {
  //     concept: 'Identifier',
  //     name: 'taskId',
  //   },
  // });
  // node.addBindAttribute({
  //   concept: 'BindAttribute',
  //   name: 'initialZoom',
  //   type: 'string',
  //   value: '1',
  // });

  return; // 不返回任何内容，在IDE中将不进行JSX2Nasl的转换，只执行上面的代码
}
