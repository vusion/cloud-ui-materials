import * as naslTypes from '@nasl/ast-mini';
import { logicNamespace, structureNamespace } from '../../utils';

// 生成流程信息
export function genFlProcessInfo(node: naslTypes.ViewElement | any) {
  const view = node.likeComponent;
  // 生成唯一name
  // 加到页面上的params、variables、logics等都需要唯一name
  // 页面上有ref引用的element也需要唯一name
  const nameGroup = {
    // 局部变量
    processInfoVar: view.getVariableUniqueName('processInfo'), // 流程信息
    getProcInstInfoEvent: view.getLogicUniqueName('getProcInstInfo'), // 查询流程信息
    createdEvent: view.getLogicUniqueName('created'), // 页面创建事件

    // event中的变量
    // 查询流程信息
    processInfoDataVar: view.getVariableUniqueName('processInfoData'), // 流程信息数据
    processInfoCurrNodesVar: view.getVariableUniqueName('processInfoCurrNodes'), // 流程信息当前节点
  };

  // 流程需要使用页面输入参数‘taskId’，且不带数字后缀，这里不做唯一性命名
  const hasTaskIdParam = view.params.some((param: any) => param.name === 'taskId');

  return `export function view(${hasTaskIdParam ? '' : `taskId: string`}) {
    let ${nameGroup.processInfoVar}: { procInstInitiator: String, procInstStartTime: DateTime, procInstStatus: String, currNodeTitles: List<String>, currNodeParticipants: List<String> }; //流程信息

    function ${nameGroup.getProcInstInfoEvent}() {
      let ${nameGroup.processInfoDataVar}; //流程信息数据
      let ${nameGroup.processInfoCurrNodesVar}; //流程信息当前节点
      if (nasl.util.HasValue(taskId)) {
        ${nameGroup.processInfoDataVar} = ${logicNamespace}.getProcInstInfo(taskId)
        if (nasl.util.HasValue(${nameGroup.processInfoDataVar})) {
          ${nameGroup.processInfoVar}.procInstStartTime = ${nameGroup.processInfoDataVar}.procInstStartTime;
          ${nameGroup.processInfoVar}.procInstStatus = ${nameGroup.processInfoDataVar}.procInstStatus;
          ${nameGroup.processInfoVar}.procInstInitiator = (/*isExpression=true*/ function match(_value) {
            if (_value === true) {
              return ${nameGroup.processInfoDataVar}.procInstInitiator.displayName
            } else if (_value === false) {
              return ${nameGroup.processInfoDataVar}.procInstInitiator.userName
            } else {
            }
          })(nasl.util.HasValue(${nameGroup.processInfoDataVar}.procInstInitiator.displayName));
          if (nasl.util.HasValue(${nameGroup.processInfoDataVar}.procInstCurrNodes)) {
            ${nameGroup.processInfoVar}.currNodeTitles = nasl.util.ListTransform(${nameGroup.processInfoDataVar}.procInstCurrNodes, (item) => item.currNodeTitle)
            ${nameGroup.processInfoCurrNodesVar} = nasl.util.ListFilter(${nameGroup.processInfoDataVar}.procInstCurrNodes, (item) => nasl.util.HasValue(item.currNodeParticipants))
            if (nasl.util.HasValue(${nameGroup.processInfoCurrNodesVar})) {
              ${nameGroup.processInfoVar}.currNodeParticipants = nasl.util.ListDistinct(nasl.util.ListTransform(nasl.util.ListFlatten(nasl.util.ListTransform(${nameGroup.processInfoCurrNodesVar}, (item) => item.currNodeParticipants)), (item) => (/*isExpression=true*/ function match(_value) {
                if (_value === true) {
                  return item.displayName
                } else if (_value === false) {
                  return item.userName
                } else {
                }
              })(nasl.util.HasValue(item.displayName))))
            } else {
            }
          } else {
          }
        } else {
        }
      } else {
      }
    }//查询流程信息

    const $lifecycles = {
      onCreated: [
        function ${nameGroup.createdEvent}() {
          ${nameGroup.getProcInstInfoEvent}()
        }
      ]
    }

    return ${genTemplate(nameGroup)}
  }`;
}

function genTemplate(nameGroup: Record<string, string>) {
  return `<ULinearLayout
    direction="horizontal"
    wrap={true}
    mode="flex"
    justify="start"
    alignment="center"
    gap="normal"
    style="--space-base:0px;">
    <ULinearLayout
      direction="horizontal"
      wrap={true}
      widthStretch="false"
      mode="flex"
      justify="start"
      alignment="center"
      style="width:20%;">
      <UText text="发起人：" style="color:#999999;"></UText>
      <UText
        _ellipsisTitle={true}
        text={(function match(_value) {
          if (_value === true) {
            return ${nameGroup.processInfoVar}.procInstInitiator
          } else if (_value === false) {
            return '-'
          } else {
          }
        })(nasl.util.HasValue(${nameGroup.processInfoVar}, ${nameGroup.processInfoVar}.procInstInitiator))}
        style="width:20%;"
        overflow="ellipsis"
        widthStretch="true">
      </UText>
    </ULinearLayout>
    <ULinearLayout
      direction="horizontal"
      wrap={true}
      widthStretch="false"
      mode="flex"
      justify="start"
      alignment="center"
      style="width:20%;padding-left:10px;">
      <UText text="发起时间：" style="color:#999999;"></UText>
      <UText
        _ellipsisTitle={true}
        text={(function match(_value) {
          if (_value === true) {
            return nasl.util.FormatDateTime(${nameGroup.processInfoVar}.procInstStartTime, 'yyyy-MM-dd HH:mm:ss', 'global')
          } else if (_value === false) {
            return '-'
          } else {
        }})(nasl.util.HasValue(${nameGroup.processInfoVar}, ${nameGroup.processInfoVar}.procInstStartTime))}
        overflow="ellipsis"
        widthStretch="true">
      </UText>
    </ULinearLayout>
    <ULinearLayout
      direction="horizontal"
      wrap={true}
      widthStretch="false"
      mode="flex"
      justify="start"
      alignment="center"
      style="width:20%;padding-left:10px;">
      <UText text="当前状态：" style="color:#999999;"></UText>
      <UText
        style="color:#333333;padding-left:8px;padding-right:8px;border-top-left-radius:4px;border-top-right-radius:4px;border-bottom-right-radius:4px;border-bottom-left-radius:4px; --custom-start: auto; max-width:calc(100% - 70px);"
        _ellipsisTitle={true}
        text={(function match(_value) {
          if (_value === true) {
            return nasl.util.EnumItemToText(nasl.util.ToEnumItem<nasl.processV2.enums.ProcInstStatusEnum>(${nameGroup.processInfoVar}.procInstStatus))
          } else if (_value === false) {
            return '-'
          } else {
          }
        })(nasl.util.HasValue(${nameGroup.processInfoVar}, ${nameGroup.processInfoVar}.procInstStatus))}
        overflow="ellipsis"
        widthStretch="false"
        _color={
          (function match(_value) {
            if (${nameGroup.processInfoVar}.procInstStatus === 'Approving') {
              return '#337EFF'
            } else if (${nameGroup.processInfoVar}.procInstStatus === 'Approved') {
              return '#666666'
            } else {
              return ''
            }
          })(${nameGroup.processInfoVar}.procInstStatus)
        }
        _background-color={(function match(_value) {
          if (${nameGroup.processInfoVar}.procInstStatus === 'Approving') {
            return '#EAF2FF'
          } else if (${nameGroup.processInfoVar}.procInstStatus === 'Approved') {
            return '#F5F5F5'
          } else {
            return ''
          }
        })(${nameGroup.processInfoVar}.procInstStatus)
        }>
      </UText>
    </ULinearLayout>
    <ULinearLayout
      direction="horizontal"
      wrap={true}
      widthStretch="false"
      mode="flex"
      justify="start"
      alignment="center"
      style="width:20%;padding-left:10px;">
      <UText text="当前节点：" style="color:#999999;"></UText>
      <UText
        _ellipsisTitle={true}
        text={(function match(_value) {
          if (_value === true) {
            return nasl.util.Join(${nameGroup.processInfoVar}.currNodeTitles, '，')
          } else if (_value === false) {
            return '-'
          } else {
          }
        })(nasl.util.HasValue(${nameGroup.processInfoVar}, ${nameGroup.processInfoVar}.currNodeTitles))}
        overflow="ellipsis"
        widthStretch="true">
      </UText>
    </ULinearLayout>
    <ULinearLayout
      direction="horizontal"
      wrap={true}
      widthStretch="false"
      mode="flex"
      justify="start"
      alignment="center"
      style="width:20%;padding-left:10px;">
      <UText text="参与人：" style="color:#999999;"></UText>
      <UText
        _ellipsisTitle={true}
        text={(function match(_value) {
          if (_value === true) {
            return nasl.util.Join(${nameGroup.processInfoVar}.currNodeParticipants, '，')
          } else if (_value === false) {
            return '-'
          } else {
          }
        })(nasl.util.HasValue(${nameGroup.processInfoVar}, ${nameGroup.processInfoVar}.currNodeParticipants))}
        overflow="ellipsis"
        widthStretch="true">
      </UText>
    </ULinearLayout>
  </ULinearLayout>`;
}
