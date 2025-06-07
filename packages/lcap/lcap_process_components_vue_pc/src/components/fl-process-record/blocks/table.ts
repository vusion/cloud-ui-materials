import * as naslTypes from '@nasl/ast-mini';
import { logicNamespace, structureNamespace } from '../../utils';

// 生成流程记录的表格
export function genFlProcessRecordTable(node: naslTypes.ViewElement | any) {
  const view = node.likeComponent;
  // 生成唯一name
  // 加到页面上的params、variables、logics等都需要唯一name
  // 页面上有ref引用的element也需要唯一name
  const nameGroup = {
    getRecordsEvent: view.getLogicUniqueName('getProcInstRecords'), // getProcInstRecords
    tableViewRecordRef: view.getViewElementUniqueName('table_view_record'), // 撤回重新提交到单选组
  };

  // 流程需要使用页面输入参数‘taskId’，且不带数字后缀，这里不做唯一性命名
  const hasTaskIdParam = view.params.some((param: any) => param.name === 'taskId');

  return `export function view(${hasTaskIdParam ? '' : `taskId: string`}) {
    function ${nameGroup.getRecordsEvent}(page: Long, size: Long) {
      let result;
      if (nasl.util.HasValue(taskId)) {
        result = ${logicNamespace}.getProcInstRecords(taskId, page, size)
      } else {
      }
      return result;
    }//查询流程记录

    return ${genTemplate(nameGroup)}
  }`;
}

function genTemplate(nameGroup: Record<string, string>) {
  return `<UTableView
    ref="${nameGroup.tableViewRecordRef}"
    dataSource={${nameGroup.getRecordsEvent}(elements.$ce.page, elements.$ce.size)}
    pagination={true}
    showSizer={true}
    pageSize={20}
    pageNumber={1}>
      <UTableViewColumn
        slotTitle={
          <UText text="流程节点"></UText>
        }
        slotCell={
          (current) => <UText
            text={(function match(_value) {
              if (_value === true) {
                return current.item.nodeTitle
              } else if (_value === false) {
                return '-'
              } else {
            }
          })(nasl.util.HasValue(current.item.nodeTitle))}
          ></UText>
        }
        slotExpander={
          (current) => <UTableViewExpander></UTableViewExpander>
        }>
      </UTableViewColumn>

      <UTableViewColumn
        slotTitle={
          <UText text="处理人"></UText>
        }
        slotCell={
          (current) => <UText
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
            })(nasl.util.HasValue(current.item.recordUser.displayName))}
          ></UText>
        }
        slotExpander={
          (current) => <UTableViewExpander></UTableViewExpander>
        }>
      </UTableViewColumn>

      <UTableViewColumn
        slotTitle={
          <UText text="处理时间"></UText>
        }
        slotCell={
          (current) => <UText
            text={(function match(_value) {
              if (_value === true) {
                return nasl.util.FormatDateTime(current.item.recordCreatedTime, 'yyyy-MM-dd HH:mm:ss', 'global')
              } else if (_value === false) {
                return '-'
              } else {
                }
            })(nasl.util.HasValue(current.item.recordCreatedTime))}
          ></UText>
        }
        slotExpander={
          (current) => <UTableViewExpander></UTableViewExpander>
        }>
      </UTableViewColumn>

      <UTableViewColumn
        slotTitle={
          <UText text="审批操作"></UText>
        }
        slotCell={
          (current) => <u-linear-layout direction="horizontal" wrap={true} mode="flex" justify="start" alignment="center">
            <UText
              style="padding-left:8px;padding-right:8px;border-top-left-radius:4px;border-top-right-radius:4px;border-bottom-right-radius:4px;border-bottom-left-radius:4px;padding-top:1px;padding-bottom:1px;width:auto;"
              overflow="ellipsis"
              widthStretch="false"
              display="inline"
              text={current.item.nodeOperationDisplayText}
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
                    return '#666666'
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
                    return '#F5F5F5'
                  }
                })(current.item.nodeOperation)
              }>
            </UText>
          </u-linear-layout>
        }
        slotExpander={
          (current) => <UTableViewExpander></UTableViewExpander>
        }>
      </UTableViewColumn>

      <UTableViewColumn
          slotTitle={
            <UText text="审批意见"></UText>
          }
          slotCell={
            (current) => <UText
              text={(function match(_value) {
                if (_value === true) {
                  return current.item.nodeOperationComment
                } else if (_value === false) {
                  return '-'
                } else {
                }
              })(nasl.util.HasValue(current.item.nodeOperationComment))}
            ></UText>
          }
          slotExpander={
            (current) => <UTableViewExpander></UTableViewExpander>
          }>
        </UTableViewColumn>

    </UTableView>`;
}
