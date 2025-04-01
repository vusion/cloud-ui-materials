import * as naslTypes from '@nasl/ast-mini';
import { logicNamespace, structureNamespace } from '../../utils';

// 生成流程记录的时间线
export function genFlProcessRecordTimeline(node: naslTypes.ViewElement | any) {
  const view = node.likeComponent;
  // 生成唯一name
  // 加到页面上的params、variables、logics等都需要唯一name
  // 页面上有ref引用的element也需要唯一name
  const nameGroup = {
    // 局部变量
    procInstRecordsPageData: view.getVariableUniqueName('procInstRecordsPageData'), // 流程记录分页数据
    procInstRecordsData: view.getVariableUniqueName('procInstRecordsData'), // 流程记录数据

    // 页面逻辑
    createdEvent: view.getLogicUniqueName('created'), // 页面创建事件
    getRecordsEvent: view.getLogicUniqueName('getProcInstRecords'), // 页面创建事件

    // 页面逻辑中的局部变量
    // getRecordsEvent
    procInstRecordsAddData: view.getVariableUniqueName('procInstRecordsAddData'),
  };

  // 流程需要使用页面输入参数‘taskId’，且不带数字后缀，这里不做唯一性命名
  const hasTaskIdParam = view.params.some((param: any) => param.name === 'taskId');

  return `export function view(${hasTaskIdParam ? '' : `taskId: string`}) {
    let ${nameGroup.procInstRecordsPageData}:{ page: Long, size: Long, total: Long }; //流程记录分页数据
    let ${nameGroup.procInstRecordsData}: List<${structureNamespace}.ProcInstRecord>; //流程记录数据
    function ${nameGroup.getRecordsEvent}() {
      let ${nameGroup.procInstRecordsAddData}
      if (nasl.util.HasValue(${nameGroup.procInstRecordsPageData}.page)) {
      } else {
          ${nameGroup.procInstRecordsPageData}.page = 1
      }
      if (nasl.util.HasValue(${nameGroup.procInstRecordsPageData}.size)) {
      } else {
          ${nameGroup.procInstRecordsPageData}.size = 20
      }
      if (nasl.util.HasValue(taskId)) {
        ${nameGroup.procInstRecordsAddData} = ${logicNamespace}.getProcInstRecords(taskId, ${nameGroup.procInstRecordsPageData}.page, ${nameGroup.procInstRecordsPageData}.size)
      } else {
      }
      if (nasl.util.HasValue(${nameGroup.procInstRecordsAddData})) {
        if (${nameGroup.procInstRecordsPageData}.page == 1) {
          ${nameGroup.procInstRecordsPageData}.total = ${nameGroup.procInstRecordsAddData}.total
        } else {
        }
        if (nasl.util.HasValue(${nameGroup.procInstRecordsAddData}.list)) {
          nasl.util.AddAll(${nameGroup.procInstRecordsData}, ${nameGroup.procInstRecordsAddData}.list)
        } else {
        }
      } else {
      }
    }//查询流程记录

    const $lifecycles = {
      onCreated: [
        function ${nameGroup.createdEvent}() {
          ${nameGroup.getRecordsEvent}()
        },
      ],
    }

    return ${genTemplate(nameGroup)}
  }`;
}

export function genTemplate(nameGroup: Record<string, string>) {
  return `<ULinearLayout direction="horizontal" wrap={true} style="overflow:hidden;">
    <UListComponents
    colnum={1}
    dataSourceWatch={nasl.util.NewList([${nameGroup.procInstRecordsData}])}
    dataSource={${nameGroup.procInstRecordsData}}
    style="width:100%;"
    slotDefault={
      (current) => <>
        <ULinearLayout wrap={true} mode="flex" justify="start" alignment="start" gap="normal" style="height:16px;--space-base:0px;--custom-start: auto; font-size:0;">
          <ULinearLayout
            _if={current.item.nodeOperation != 'revert' && current.item.nodeOperation != 'reject' && (current.item.nodeOperation != 'approve' && current.item.nodeOperation != 'submit')}
            direction="horizontal" wrap={true}
            style="width:16px;height:16px;border-top-width:2px;border-left-width:2px;border-right-width:2px;border-bottom-width:2px;border-style:solid;border-color:#337eff;--custom-start: auto; border-radius: 100%;">
          </ULinearLayout>
          <ULinearLayout
            _if={current.item.nodeOperation == 'approve' || current.item.nodeOperation == 'submit'}
            direction="horizontal" wrap={true} mode="flex" justify="center" alignment="center"
            style="width:16px;height:16px;border-top-width:2px;border-left-width:2px;border-right-width:2px;border-bottom-width:2px;border-style:solid;border-color:#337eff;background-color:#337eff;--custom-start: auto; border-radius: 100%;">
            <IIco name="correct" icotype="only" widthStretch="false" heightStretch="false"
              style="font-size:14px;color:#fff;">
            </IIco>
          </ULinearLayout>
          <ULinearLayout
            _if={current.item.nodeOperation == 'revert' || current.item.nodeOperation == 'reject'}
            direction="horizontal" wrap={true} mode="flex" justify="center" alignment="center"
            style="width:16px;height:16px;border-top-width:2px;border-left-width:2px;border-right-width:2px;border-bottom-width:2px;border-style:solid;border-color:#f24957;background-color:#f24957;--custom-start: auto; border-radius: 100%;">
            <IIco name="close" icotype="only" widthStretch="false" heightStretch="false"
              style="font-size:14px;color:#ffffff;background-color:#f24957;--custom-start: auto; line-height:1em;
              border-radius: 100%;"></IIco>
          </ULinearLayout>
          <UText text={current.item.nodeTitle} style="font-size:14px;margin-left:10px;--custom-start: auto; line-height:14px;font-weight: 500;"></UText>
        </ULinearLayout>

        <ULinearLayout wrap={false} mode="flex" justify="start" alignment="start" gap="normal" style="margin-left:7px;border-style:solid;border-color:#337eff;--space-base:0px;border-top-width:0px;border-bottom-width:0px;border-right-width:0px;width:auto;border-left-width:0px;--custom-start: auto; display: flex;align-items: stretch;">
          <ULinearLayout
            _if={${nameGroup.procInstRecordsData}.length != current.index + 1}
            direction="horizontal" wrap={true} widthStretch="false"
            style="width:0px;border-color:#337eff;borderTopColor:#337eff;borderBottomColor:#337eff;borderLeftColor:#337eff;borderRightColor:#337eff;border-left-width:1px;border-style:solid;border-top-width:0px;border-right-width:0px;border-bottom-width:0px;">
          </ULinearLayout>
          <ULinearLayout direction="horizontal" wrap={false} mode="flex" justify="start" alignment="start" widthStretch="false" style="padding-top:4px;padding-left:18px;padding-bottom:20px;width:100%;">
            <ULinearLayout direction="horizontal" wrap={false} style="margin-right:10px;min-width: 9%;">
            <ULinearLayout direction="horizontal" wrap={true} mode="flex" justify="start" alignment="center" style="color:#999999;">
              <UText text="处理人"></UText>
            </ULinearLayout>
            <ULinearLayout direction="horizontal" wrap={true} mode="flex" justify="start" alignment="center" style="color:#999999;">
              <UText text="处理时间"></UText>
            </ULinearLayout>
            <ULinearLayout direction="horizontal" wrap={true} mode="flex" justify="start" alignment="center" style="color:#999999;">
              <UText text="审批操作"></UText>
            </ULinearLayout>
            <ULinearLayout direction="horizontal" wrap={true} mode="flex" justify="start" alignment="center" style="color:#999999;">
              <UText text="审批意见"></UText>
            </ULinearLayout>
          </ULinearLayout>

          <ULinearLayout direction="horizontal" wrap={true} widthStretch="true" style="padding-right:10px;max-width:90%;">
            <ULinearLayout direction="horizontal" wrap={false} mode="flex" justify="start" alignment="center" style="width:100%;">
              <UText overflow="ellipsis" widthStretch="true"
                text={(function match(_value) {
                  if (_value === true) {
                    return current.item.recordUser.displayName
                  } else if (_value === false) {
                    return (function match(_value) {
                      if (_value === true) {
                        return current.item.recordUser.userName
                      } else if (_value === false) {
                        return '-'
                      } else {
                      }
                    })(nasl.util.HasValue(current.item.recordUser.userName))
                  } else {
                  }
                })(nasl.util.HasValue(current.item.recordUser.displayName))}>
              </UText>
            </ULinearLayout>
            <ULinearLayout direction="horizontal" wrap={false} mode="flex" justify="start" alignment="center" style="width:100%;">
              <UText overflow="ellipsis" widthStretch="true"
                text={(function match(_value) {
                  if (_value === true) {
                    return nasl.util.FormatDateTime(current.item.recordCreatedTime, 'yyyy-MM-dd HH:mm:ss', 'global')
                  } else if (_value === false) {
                    return '-'
                  } else {
                  }
                })(nasl.util.HasValue(current.item.recordCreatedTime))}>
              </UText>
            </ULinearLayout>
            <ULinearLayout direction="horizontal" wrap={false} mode="flex" justify="start" alignment="center" style="width:100%;">
              <UText
                style="padding-left:8px;padding-right:8px;border-top-left-radius:4px;border-top-right-radius:4px;border-bottom-right-radius:4px;border-bottom-left-radius:4px;padding-top:1px;padding-bottom:1px;width:auto;"
                text={current.item.nodeOperationDisplayText}
                overflow="ellipsis"
                widthStretch="false"
                display="inline"
                _color={
                (function match(_value) {
                  if (current.item.nodeOperation === 'launch' || current.item.nodeOperation === 'submit' || current.item.nodeOperation === 'reassign' || current.item.nodeOperation === 'addSign' || current.item.nodeOperation === 'cc') {
                    return '#337EFF'
                  } else if (current.item.nodeOperation === 'approve') {
                    return '#26BD71'
                  } else if (current.item.nodeOperation === 'reject') {
                    return '#F24957'
                  } else if (current.item.nodeOperation === 'revert' || current.item.nodeOperation === 'withdraw') {
                    return '#FF8024'
                  } else if (current.item.nodeOperation === 'end' || current.item.nodeOperation === 'terminate') {
                    return '#666666'
                  } else {
                    return '#333333'
                  }
                })(current.item.nodeOperation)
              }
              _background-color={
                (function match(_value) {
                  if (current.item.nodeOperation === 'launch' || current.item.nodeOperation === 'submit' || current.item.nodeOperation === 'reassign' || current.item.nodeOperation === 'addSign' || current.item.nodeOperation === 'cc') {
                    return '#EAF2FF'
                  } else if (current.item.nodeOperation === 'approve') {
                    return '#E9F8F0'
                  } else if (current.item.nodeOperation === 'reject') {
                    return '#FEEDEF'
                  } else if (current.item.nodeOperation === 'revert' || current.item.nodeOperation === 'withdraw') {
                    return '#FFF2E9'
                  } else if (current.item.nodeOperation === 'end' || current.item.nodeOperation === 'terminate') {
                    return '#F5F5F5'
                  } else {
                    return '#333333'
                  }
                })(current.item.nodeOperation)
              }>
              </UText>
            </ULinearLayout>
            <ULinearLayout direction="horizontal" wrap={false} mode="flex" justify="start" alignment="center" style="width:100%;">
              <UText overflow="ellipsis" widthStretch="true"
                text={(function match(_value) {
                  if (_value === true) {
                    return current.item.nodeOperationComment
                  } else if (_value === false) {
                    return '-'
                  } else {
                  }
                })(nasl.util.HasValue(current.item.nodeOperationComment))}>
              </UText>
            </ULinearLayout>
          </ULinearLayout>
        </ULinearLayout>
      </ULinearLayout>
    </>
    }></UListComponents>
    <ULinearLayout direction="horizontal" mode="block" style="text-align:center;width:240px;">
      <ULink
        _if={${nameGroup.procInstRecordsPageData}.total > ${nameGroup.procInstRecordsData}.length}
        text="查看更多"
        onClick={
          function click(){
            ${nameGroup.procInstRecordsPageData}.page = ${nameGroup.procInstRecordsPageData}.page + 1;
            ${nameGroup.getRecordsEvent}();
          }
        }
      ></ULink>
      <UText style="color:#999999;" _if={!(nasl.util.HasValue(${nameGroup.procInstRecordsData}))} text="暂无流程记录"></UText>
    </ULinearLayout>
  </ULinearLayout>
  `;
}
