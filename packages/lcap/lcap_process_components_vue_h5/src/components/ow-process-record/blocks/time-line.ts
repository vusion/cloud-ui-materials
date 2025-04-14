import * as naslTypes from '@nasl/ast-mini';
import { logicNamespace, structureNamespace } from '../../utils';

// 生成流程记录的时间线
export function genOwProcessRecordTimeline(node: naslTypes.ViewElement | any) {
  const view = node.likeComponent;
  // 生成唯一name
  // 加到页面上的params、variables、logics等都需要唯一name
  // 页面上有ref引用的element也需要唯一name
  const nameGroup = {
    dataLength: view.getVariableUniqueName('procInstRecordsDatalen'), // 流程记录数据长度
    getRecordsEvent: view.getLogicUniqueName('getProcInstRecords'), // 页面创建事件
  };

  // 流程需要使用页面输入参数‘taskId’，且不带数字后缀，这里不做唯一性命名
  const hasTaskIdParam = view.params.some((param: any) => param.name === 'taskId');

  return `export function view(${hasTaskIdParam ? '' : `taskId: string`}) {
    let ${nameGroup.dataLength}: Long = 0; //流程记录数据长度
    function ${nameGroup.getRecordsEvent}(page: Long, size: Long) {
      let result;
      if (nasl.util.HasValue(taskId)) {
        result = ${logicNamespace}.getProcInstRecords(taskId, page, size)
        ${nameGroup.dataLength} = ${nameGroup.dataLength} + result.list.length
      } else {
      }
      return result;
    }//查询流程记录

    return ${genTemplate(nameGroup)}
  }`;
}

export function genTemplate(nameGroup: Record<string, string>) {
  return `<VanListView
    pageable="load-more"
    vusionDisabledAddslot={true}
    pageSize={5}
    dataSource={${nameGroup.getRecordsEvent}(elements.$ce.page, elements.$ce.size)}
    hiddenempty={false}
    scrollTarget="self"
    style="border-color:#c06161;borderTopColor:#c06161;borderBottomColor:#c06161;borderLeftColor:#c06161;borderRightColor:#c04e4e;height:100%;--custom-start: auto; min-height: 26.66667vw;
overflow: scroll;
margin-top: 2.66667vw;
font-size: 3.73333vw;"
    slotNext={
      <VanText text="下一页"></VanText>
    }
    slotPrev={
      <VanText text="上一页"></VanText>
    }
    slotEmpty={
      <VanLinearLayout direction="horizontal" wrap={true} style="--custom-start: auto; padding: 2.93337vw  1.06667vw;">
        <VanText text="暂无数据"></VanText>
      </VanLinearLayout>
    }
    slotItem={
      (current) => <VanLinearLayout direction="horizontal" wrap={true} style="--custom-start: auto; padding: 0 4.26667vw;
font-size: 3.73333vw;">
        <VanLinearLayout direction="vertical" gap="none" style="--custom-start: auto; padding-left: 7vw;
padding-right:  4.26667vw;">
          <VanLinearLayout wrap={true}  mode="flex" justify="start" alignment="center" gap="normal" style="--van-space-base:0px;">
            <VanIconv
              style="color:#f24957;--custom-start: auto; font-size: var(--van-step-icon-size);
width: 1.1em;
height: 1.1em;
vertical-align: -.15em;
fill: currentColor;
line-height: 1.1em;"
              name={
                (function match(_value) {
                  if (_value === true) {
                    return 'steps-process'
                  } else if (_value === false) {
                    return (function match(_value) {
                      if (_value === true) {
                        return 'steps-finish'
                      } else if (_value === false) {
                        return (function match(_value) {
                          if (_value === true) {
                            return 'steps-error'
                          } else if (_value === false) {
                            return 'steps-process'
                          } else {
                          }
                        })(current.item.nodeOperation == 'revert' || current.item.nodeOperation == 'reject')
                      } else {
                      }
                    })(current.item.nodeOperation == 'approve' || current.item.nodeOperation == 'submit' || current.item.nodeOperation == 'launch')
                  } else {
                  }
                })(current.item.nodeOperation != 'revert' && current.item.nodeOperation != 'reject' && current.item.nodeOperation != 'approve' && current.item.nodeOperation != 'launch' && current.item.nodeOperation != 'submit')
              }
              icotype="only"
              _color={
                (function match(_value) {
                  if (_value === true) {
                    return '#f24957'
                  } else if (_value === false) {
                  return '#337eff'
                  } else {
                  }
                })(current.item.nodeOperation == 'revert' || current.item.nodeOperation == 'reject')
              }>
                <VanText text="图标"></VanText>
              </VanIconv>

              <VanText overflow="ellipsis" widthStretch="true"
                style="width:auto;text-align:left;--custom-start: auto; font-weight: 500;
color: #333;
font-size: 3.73333vw;
margin-left: calc( 2.4vw + 4.26667vw);
line-height: 1.2em;"
                text={
                  (function match(_value) {
                    if (_value === true) {
                      return current.item.nodeTitle
                    } else if (_value === false) {
                      return '-'
                    } else {
                    }
                  })(nasl.util.HasValue(current.item.nodeTitle))
                }>
              </VanText>
          </VanLinearLayout>

          <VanLinearLayout gap="normal" mode="flex" justify="end" alignment="start" style="borderLeftColor:#337eff;border-left-width:0px;border-style:solid;height:100%;--custom-start: auto; margin-left: 1.6vw;
display: flex;
align-items: stretch;">
            <VanLinearLayout
              style="width:0px;border-left-width:1px;border-style:solid;borderLeftColor:#337eff;border-top-width:0px;border-bottom-width:0px;border-right-width:0px;--van-space-base:0px;height:auto;"
              _if={${nameGroup.dataLength} != current.index + 1}
              direction="horizontal" wrap={true} gap="normal">
            </VanLinearLayout>

            <VanLinearLayout direction="horizontal" wrap={true} gap="normal" style="--van-space-base:0px;text-align:right;--custom-start: auto; width:calc( 100% - 1px );
padding-bottom: 5.33334vw;
padding-top:2.13333vw;
padding-left: calc(4vw + 4.26667vw);">
              <VanLinearLayout direction="horizontal" wrap={false} mode="flex" justify="start" alignment="center" gap="normal" style="text-align:left;--van-space-base:0px;">
                <VanText text="处理人" style="color:#999;text-align:left;--custom-start: auto; font-size: 100%;
width: 18.66667vw;
margin-right: 2.13333vw;
line-height: 1.2em;"></VanText>
                <VanText
                  style="color:#333333;width:100%;text-align:left;--custom-start: auto; font-size: 100%;
line-height: 1.2em;"
                  overflow="ellipsis" widthStretch="true"
                  text={
                    (function match(_value) {
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
                    })(nasl.util.HasValue(current.item.recordUser.displayName))
                  }
                ></VanText>
              </VanLinearLayout>

            <VanLinearLayout direction="horizontal" wrap={false} mode="flex" justify="start" alignment="center" gap="normal" style="text-align:left;--van-space-base:0px;--custom-start: auto; margin-top:2.13333vw;">
              <VanText text="处理时间" style="color:#999;text-align:left;--custom-start: auto; font-size: 100%;
width: 18.66667vw;
margin-right: 2.13333vw;
line-height: 1.2em;"></VanText>
              <VanText
                style="color:#333333;width:100%;text-align:left;--custom-start: auto; font-size: 100%;
line-height: 1.2em;"
                overflow="ellipsis" widthStretch="true"
                text={
                  (function match(_value) {
                    if (_value === true) {
                      return nasl.util.FormatDateTime(current.item.recordCreatedTime, 'yyyy-MM-dd HH:mm:ss', 'global')
                    } else if (_value === false) {
                      return '-'
                    } else {
                    }
                  })(nasl.util.HasValue(current.item.recordCreatedTime))
                }
              ></VanText>
            </VanLinearLayout>

            <VanLinearLayout direction="horizontal" wrap={false} mode="flex" justify="start" alignment="center" gap="normal" style="text-align:left;--van-space-base:0px;--custom-start: auto; margin-top:2.13333vw;">
              <VanText text="审批操作" style="color:#999;text-align:left;--custom-start: auto; font-size: 100%;
width: 18.66667vw;
margin-right: 2.13333vw;
line-height: 1.2em;"></VanText>
              <VanText
                style="color:#333333;width:auto;text-align:left;border-top-left-radius:4px;border-top-right-radius:4px;border-bottom-right-radius:4px;border-bottom-left-radius:4px;--custom-start: auto; font-size: 100%;
padding:0 2.13vw;
max-width:calc(100% - 22vw);"
                text={current.item.nodeOperationDisplayText}
                overflow="ellipsis" widthStretch="false"
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
              }></VanText>
            </VanLinearLayout>


            <VanLinearLayout direction="horizontal" wrap={false} mode="flex" justify="start" alignment="center" gap="normal" style="text-align:left;--van-space-base:0px;--custom-start: auto; margin-top:2.13333vw;">
              <VanText text="审批意见" style="color:#999;text-align:left;--custom-start: auto; font-size: 100%;
width: 18.66667vw;
margin-right: 2.13333vw;
line-height: 1.2em;"></VanText>
              <VanText
                style="color:#333333;width:100%;text-align:left;--custom-start: auto; font-size: 100%;
line-height: 1.2em;"
                overflow="ellipsis" widthStretch="true"
                text={
                  (function match(_value) {
                    if (_value === true) {
                      return current.item.nodeOperationComment
                    } else if (_value === false) {
                      return '-'
                    } else {
                    }
                  })(nasl.util.HasValue(current.item.nodeOperationComment))
                }
              ></VanText>
            </VanLinearLayout>
            </VanLinearLayout>

          </VanLinearLayout>
        </VanLinearLayout>
      </VanLinearLayout>
    }>
  </VanListView>`;
}
