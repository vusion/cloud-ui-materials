import * as naslTypes from '@nasl/ast-mini';
import { logicNamespace, structureNamespace } from '../../utils';

// 生成流程记录的表格
export function genOwProcessRecordTable(node: naslTypes.ViewElement | any) {
  const view = node.likeComponent;
  // 生成唯一name
  // 加到页面上的params、variables、logics等都需要唯一name
  // 页面上有ref引用的element也需要唯一name
  const nameGroup = {
    getRecordsEvent: view.getLogicUniqueName('getProcInstRecords'), // 页面创建事件
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
  return `<VanListView
    pageable="auto-more"
    vusionDisabledAddslot={true}
    pageSize={5}
    dataSource={${nameGroup.getRecordsEvent}(elements.$ce.page, elements.$ce.size)}
    hiddenempty={true}
    scrollTarget="parent"
    style="border-color:#c06161;borderTopColor:#c06161;borderBottomColor:#c06161;borderLeftColor:#c06161;borderRightColor:#c04e4e;height:auto;"
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
      (current) =>  <VanLinearLayout direction="horizontal" wrap={true} style="--custom-start: auto; padding: 0 4.26667vw;">
        <VanLinearLayout direction="horizontal" gap="normal" mode="block" style="--van-space-base:0px;--custom-start: auto; border: .5px solid #E5E5E5;
box-shadow: 0 .53333vw 3.2vw rgba(0, 0, 0, .06);
border-radius: 1.06667vw;
background: #fff;
padding: 3.2vw 4.26667vw;
font-size: 3.73333vw;
margin-bottom: 2.13333vw;">
          <VanLinearLayout direction="horizontal" wrap={true} mode="flex" justify="start" alignment="center" widthStretch="false" style="width:100%;">
            <VanLinearLayout direction="horizontal" wrap={false} mode="flex" justify="start" alignment="center" style="text-align:left;--custom-start: auto; width: 18.66667vw;
margin-right: 2.13333vw;">
              <VanText text="流程节点：" style="color:#999;text-align:right;--custom-start: auto; font-size: 100%;
width: 18.66667vw;"></VanText>
            </VanLinearLayout>
            <VanText
              style="color:#333333;width:auto;text-align:left;--custom-start: auto; font-size: 100%;"
              overflow="ellipsis" widthStretch="true" text={
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

          <VanLinearLayout direction="horizontal" wrap={true} mode="flex" justify="start" alignment="center" widthStretch="false" style="width:100%;--custom-start: auto; margin-top: 2.13333vw;">
            <VanLinearLayout direction="horizontal" wrap={false} mode="flex" justify="start" alignment="center" style="text-align:left;--custom-start: auto; width: 18.66667vw;
margin-right: 2.13333vw;">
              <VanText text="处理人：" style="color:#999;text-align:right;--custom-start: auto; font-size: 100%;
width: 18.66667vw;"></VanText>
            </VanLinearLayout>
            <VanText
              style="color:#333333;width:auto;text-align:left;--custom-start: auto; font-size: 100%;"
              overflow="ellipsis" widthStretch="true" text={
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
              }>
            </VanText>
          </VanLinearLayout>

          <VanLinearLayout direction="horizontal" wrap={true} mode="flex" justify="start" alignment="center" widthStretch="false" style="width:100%;--custom-start: auto; margin-top: 2.13333vw;">
            <VanLinearLayout direction="horizontal" wrap={false} mode="flex" justify="start" alignment="center" style="text-align:left;--custom-start: auto; width: 18.66667vw;
margin-right: 2.13333vw;">
              <VanText text="处理时间：" style="color:#999;text-align:right;--custom-start: auto; font-size: 100%;
width: 18.66667vw;"></VanText>
            </VanLinearLayout>
            <VanText
              style="color:#333333;width:auto;text-align:left;--custom-start: auto; font-size: 100%;"
              overflow="ellipsis" widthStretch="true" text={
                (function match(_value) {
                  if (_value === true) {
                    return nasl.util.FormatDateTime(current.item.recordCreatedTime, 'yyyy-MM-dd HH:mm:ss', 'global')
                  } else if (_value === false) {
                    return '-'
                  } else {
                  }
                })(nasl.util.HasValue(current.item.recordCreatedTime))
              }>
            </VanText>
          </VanLinearLayout>

          <VanLinearLayout direction="horizontal" wrap={true} mode="flex" justify="start" alignment="center" widthStretch="false" style="width:100%;--custom-start: auto; margin-top: 2.13333vw;">
            <VanLinearLayout direction="horizontal" wrap={false} mode="flex" justify="start" alignment="center" style="text-align:left;--custom-start: auto; width: 18.66667vw;
margin-right: 2.13333vw;">
              <VanText text="审批操作：" style="color:#999;text-align:right;--custom-start: auto; font-size: 100%;
width: 18.66667vw;"></VanText>
            </VanLinearLayout>
            <VanText
              style="color:#333333;width:auto;text-align:left;border-top-left-radius:4px;border-top-right-radius:4px;border-bottom-right-radius:4px;border-bottom-left-radius:4px;--custom-start: auto; font-size: 100%;
padding:0 2.13vw;
max-width:calc(100% - 22vw);"
              overflow="ellipsis"
              widthStretch="false"
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
            </VanText>
          </VanLinearLayout>

          <VanLinearLayout direction="horizontal" wrap={true} mode="flex" justify="start" alignment="center" widthStretch="false" style="width:100%;--custom-start: auto; margin-top: 2.13333vw;">
            <VanLinearLayout direction="horizontal" wrap={false} mode="flex" justify="start" alignment="center" style="text-align:left;--custom-start: auto; width: 18.66667vw;
margin-right: 2.13333vw;">
              <VanText text="审批意见：" style="color:#999;text-align:right;--custom-start: auto; font-size: 100%;
width: 18.66667vw;"></VanText>
            </VanLinearLayout>
            <VanText
              style="color:#333333;width:auto;text-align:left;--custom-start: auto; font-size: 100%;"
              overflow="ellipsis" widthStretch="true" text={
                (function match(_value) {
                  if (_value === true) {
                    return current.item.nodeOperationComment
                  } else if (_value === false) {
                    return '-'
                  } else {
                  }
                })(nasl.util.HasValue(current.item.nodeOperationComment))
              }>
            </VanText>
          </VanLinearLayout>

        </VanLinearLayout>
      </VanLinearLayout>
    }>

  </VanListView>`;
}
