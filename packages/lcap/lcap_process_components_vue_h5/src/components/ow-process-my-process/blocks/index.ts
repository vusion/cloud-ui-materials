import * as naslTypes from '@nasl/ast-mini';
import { logicNamespace, structureNamespace } from '../../utils';

// 生成流程信息
export function genOwProcessMyProcess(node: naslTypes.ViewElement | any) {
  const view = node.likeComponent;
  // 生成唯一name
  // 加到页面上的params、variables、logics等都需要唯一name
  // 页面上有ref引用的element也需要唯一name
  const nameGroup = {
    tabValueVar: view.getVariableUniqueName('myProcessTabValue'), // 我的流程tab值
    filterVar: view.getVariableUniqueName('myProcessFilter'), // 我的流程筛选项
    // 逻辑
    reloadFilter: view.getLogicUniqueName('reloadFilter'), // 筛选项初始化
    getProcDefInfos: view.getLogicUniqueName('getProcDefInfos'), // 查询流程定义名称列表
    getProcInstInitiators: view.getLogicUniqueName('getProcInstInitiators'), // 查询流程实例发起人列表
    getViewed: view.getLogicUniqueName('getViewed'), // 查询查看状态
    getMyPendingTasks: view.getLogicUniqueName('getMyPendingTasks'), // 获取我的待办数据
    getMyCompletedTasks: view.getLogicUniqueName('getMyCompletedTasks'), // 获取我的已办数据
    getMyInitiatedTasks: view.getLogicUniqueName('getMyInitiatedTasks'), // 获取我的发起数据
    getMyCCTasks: view.getLogicUniqueName('getMyCCTasks'), // 获取抄送我的数据
    goToPage: view.getLogicUniqueName('goToPage'), // 跳转页面
    // 页面逻辑的局部变量
    // goToPage
    url: view.getVariableUniqueName('url'), // 跳转页面url

    // 组件名称
    listView1: view.getViewElementUniqueName('list_view_1'), // 我的待办表格
    listView2: view.getViewElementUniqueName('list_view_1'), // 我的已办表格
    listView3: view.getViewElementUniqueName('list_view_1'), // 我的发起表格
    listView4: view.getViewElementUniqueName('list_view_1'), // 抄送我的表格

    // 我的待办tab下的ref
    pickerson_proc1Ref: view.getViewElementUniqueName('pickerson_proc1'), // 流程pickerson
    pickerson_procInstInitiators1Ref: view.getViewElementUniqueName('pickerson_procInstInitiators1'), // 发起人pickerson
    datetime_procInstStartTime1Ref: view.getViewElementUniqueName('datetime_procInstStartTime1'), // 发起时间pickerson

    // 我的已办tab下的ref
    pickerson_proc2Ref: view.getViewElementUniqueName('pickerson_proc1'), // 流程pickerson
    pickerson_procInstInitiators2Ref: view.getViewElementUniqueName('pickerson_procInstInitiators1'), // 发起人pickerson
    datetime_procInstStartTime2Ref: view.getViewElementUniqueName('datetime_procInstStartTime1'), // 发起时间pickerson

    // 我的发起tab下的ref
    pickerson_proc3Ref: view.getViewElementUniqueName('pickerson_proc1'), // 流程pickerson
    datetime_procInstStartTime3Ref: view.getViewElementUniqueName('datetime_procInstStartTime1'), // 发起时间pickerson

    // 抄送我的tab下的ref
    pickerson_proc4Ref: view.getViewElementUniqueName('pickerson_proc1'), // 流程pickerson
    pickerson_procInstInitiators4Ref: view.getViewElementUniqueName('pickerson_procInstInitiators1'), // 发起人pickerson
    datetime_procInstStartTime4Ref: view.getViewElementUniqueName('datetime_procInstStartTime1'), // 发起时间pickerson
    pickerson_viewed4Ref: view.getViewElementUniqueName('pickerson_viewed1'), // 查看状态pickerson
  };

  return `export function view() {
    let ${nameGroup.tabValueVar}: string; //我的流程tab值
    let ${nameGroup.filterVar}: { procDefKey: string, procInstInitiator: string, procInstStartTimeAfter: DateTime, procInstStartTimeBefore: DateTime, viewed: Boolean }; //我的流程筛选项


    function ${nameGroup.reloadFilter}() {
      ${nameGroup.filterVar}.procDefKey = null
      ${nameGroup.filterVar}.procInstInitiator = null
      ${nameGroup.filterVar}.procInstStartTimeAfter = null
      ${nameGroup.filterVar}.procInstStartTimeBefore = null
      ${nameGroup.filterVar}.viewed = null
    }//筛选项初始化

    function ${nameGroup.getProcDefInfos}() {
      let result;
      result = ${logicNamespace}.getProcDefInfos(undefined)
      return result;
    }//查询流程定义名称列表

    function ${nameGroup.getProcInstInitiators}(page: Long, size: Long, filterText: string) {
      let result;
      result = ${logicNamespace}.getProcInstInitiators(page, size, filterText)
      return result;
    }//查询流程实例发起人列表

    function ${nameGroup.getViewed}() {
      let result;
      result = nasl.util.NewList([nasl.util.NewAnonymousStructure({ name:'未查看', value:false }), nasl.util.NewAnonymousStructure({ name:'已查看', value:true })])
      return result;
    }//查询查看状态

    function ${nameGroup.getMyPendingTasks}(page: Long, size: Long) {
      let result;
      result = ${logicNamespace}.getMyPendingTasks(${nameGroup.filterVar}.procDefKey, ${nameGroup.filterVar}.procInstStartTimeAfter, ${nameGroup.filterVar}.procInstStartTimeBefore, ${nameGroup.filterVar}.procInstInitiator, page, size, undefined);
      return result;
    }//获取我的待办数据

    function ${nameGroup.getMyCompletedTasks}(page: Long, size: Long) {
      let result;
      result = ${logicNamespace}.getMyCompletedTasks(${nameGroup.filterVar}.procDefKey, ${nameGroup.filterVar}.procInstStartTimeAfter, ${nameGroup.filterVar}.procInstStartTimeBefore, ${nameGroup.filterVar}.procInstInitiator, page, size, undefined)
      return result;
    }//获取我的已办数据

    function ${nameGroup.getMyInitiatedTasks}(page: Long, size: Long) {
      let result;
      result = ${logicNamespace}.getMyInitiatedTasks(${nameGroup.filterVar}.procDefKey, ${nameGroup.filterVar}.procInstStartTimeAfter, ${nameGroup.filterVar}.procInstStartTimeBefore, undefined, page, size, undefined)
      return result;
    }//获取我的发起数据

    function ${nameGroup.getMyCCTasks}(page: Long, size: Long) {
      let result;
      result = ${logicNamespace}.getMyCCTasks(${nameGroup.filterVar}.procDefKey, ${nameGroup.filterVar}.procInstStartTimeAfter, ${nameGroup.filterVar}.procInstStartTimeBefore, ${nameGroup.filterVar}.procInstInitiator, ${nameGroup.filterVar}.viewed, page, size, undefined)
      return result;
    }//获取抄送我的数据

    function ${nameGroup.goToPage}(itemTaskId: string) {
      let ${nameGroup.url};
      ${nameGroup.url} = ${logicNamespace}.getTaskDestinationUrl(itemTaskId, undefined);
      nasl.js.block(\`'use JSBlock' \n// 拼接全量url
${nameGroup.url} = window.location.origin + ${nameGroup.url};\`);
      nasl.ui.gotoLink(${nameGroup.url}, '_self') // 这个地方的翻译没有按照nasl2ts，原始翻译是nasl.ui.gotoLink(url, undefined
    }//跳转页面

    return <VanTabs type="line"
      value={$sync(${nameGroup.tabValueVar})}
      style="--custom-start: auto; font-family: var(--van-base-font-family);font: inherit;"
      onChange={
        function change(){
          ${nameGroup.reloadFilter}()
        }
      }>
      <VanTab name="待办"
        slotTitle={
          <VanText text="我的待办" style="--custom-start: auto; font-weight: var(--van-font-weight-bold);font-size: 3.6vw;"></VanText>
        }>
        <VanLinearLayout direction="vertical" gap="none" style="width:auto;">
          <VanLinearLayout wrap={true} style="width:0px;height:0px;">
            <VanPickerson
              ref="${nameGroup.pickerson_proc1Ref}"
              title="流程"
              showToolbar={true}
              pageSize={20}
              value={$sync(${nameGroup.filterVar}.procDefKey)}
              placeholder=""
              dataSource={${nameGroup.getProcDefInfos}()}
              closeOnClickOverlay={true}
              type="picker"
              isNew={false}
              textField="procDefTitle"
              valueField="procDefKey"
              initialLoad={false}
              onConfirm={
                function confirm(){
                  $refs.${nameGroup.listView1}.reload()
                }
              }
              slot-picker-bottom={
                <>
                  <VanPickerActionSlot targetMethod="cancel">
                    <VanButton type="info_secondary" size="normal" text="取消" squareroud="round"></VanButton>
                  </VanPickerActionSlot>
                  <VanPickerActionSlot targetMethod="confirm">
                    <VanButton type="info" size="normal" text="确认" squareroud="round"></VanButton>
                  </VanPickerActionSlot>
                </>
              }
              slot-picker-top={
                <>
                  <VanPickerActionSlot targetMethod="cancel">
                    <VanIconv name="left-arrow" icotype="only"></VanIconv>
                  </VanPickerActionSlot>
                  <VanPickerActionSlot targetMethod="confirm"></VanPickerActionSlot>
                </>
              }
              slot-pannel-title={
                <VanText text="标题"></VanText>
              }
              slotTitle={
                <VanLinearLayout direction="horizontal" wrap={true}>
                  <VanText text="流程"></VanText>
                </VanLinearLayout>
              }
              slotOption={
                (current) => <VanLinearLayout direction="horizontal" wrap={false} mode="flex" justify="center" alignment="center" gap="normal" style="width:100%;--van-space-base:0px;">
                  <VanText text={current.item.procDefTitle} overflow="ellipsis" style="font-size:16px;"></VanText>
                  <VanText
                    _if={${nameGroup.filterVar}.procDefKey == current.item.procDefKey}
                    text="取消选中"
                    style="font-size:12px;text-align:right;width:auto;color:#999;position:absolute;height:auto;top:0px;background-color:#fff;padding-left:8px;padding-right:8px;padding-top:4px;padding-bottom:4px;z-index:10; --custom-start: auto; line:height: 1em;
cursor: pointer;
right: -1.6vw;"
                    overflow="normal"
                    heightStretch="false"
                    widthStretch="false"
                    onClick={
                      function click(){
                        ${nameGroup.filterVar}.procDefKey = null;
                        $refs.${nameGroup.pickerson_proc1Ref}.close();
                        $refs.${nameGroup.pickerson_proc1Ref}.reload();
                        $refs.${nameGroup.listView1}.reload();
                      }
                    }></VanText>
                </VanLinearLayout>
              }>
            </VanPickerson>

            <VanPickerson
              ref="${nameGroup.pickerson_procInstInitiators1Ref}"
              title="发起人"
              showToolbar={true}
              pageSize={20}
              pageable={true}
              value={$sync(${nameGroup.filterVar}.procInstInitiator)}
              placeholder=""
              dataSource={${nameGroup.getProcInstInitiators}(elements.$ce.page, elements.$ce.size, elements.$ce.filterText)}
              closeOnClickOverlay={true}
              type="picker"
              isNew={false}
              valueField="userName"
              initialLoad={false}
              filterable={true}
              onConfirm={
                function confirm(){
                  $refs.${nameGroup.listView1}.reload()
                }
              }
              slot-picker-bottom={
                <>
                  <VanPickerActionSlot targetMethod="cancel">
                    <VanButton type="info_secondary" size="normal" text="取消" squareroud="round"></VanButton>
                  </VanPickerActionSlot>
                  <VanPickerActionSlot targetMethod="confirm">
                    <VanButton type="info" size="normal" text="确认" squareroud="round"></VanButton>
                  </VanPickerActionSlot>
                </>
              }
              slot-picker-top={
                <>
                  <VanPickerActionSlot targetMethod="cancel">
                    <VanIconv name="left-arrow" icotype="only"></VanIconv>
                  </VanPickerActionSlot>
                  <VanPickerActionSlot targetMethod="confirm"></VanPickerActionSlot>
                </>
              }
              slot-pannel-title={
                <VanText text="标题"></VanText>
              }
              slotTitle={
                <VanLinearLayout direction="horizontal" wrap={true}>
                  <VanText text="发起人"></VanText>
                </VanLinearLayout>
              }
              slotOption={
                (current) => <VanLinearLayout direction="horizontal" wrap={false} mode="flex" justify="center" alignment="center" gap="normal" style="width:100%;--van-space-base:0px;">
                  <VanText
                    text={(function match(_value) {
                      if (_value === true) {
                        return current.item.displayName + '（' + current.item.userName + '）'
                      } else if (_value === false) {
                        return current.item.userName
                      } else {
                      }
                    })(nasl.util.HasValue(current.item.displayName))} overflow="ellipsis" widthStretch="true" style="font-size:16px;text-align:center;"></VanText>
                    <VanText
                      _if={${nameGroup.filterVar}.procInstInitiator == current.item.userName}
                      text="取消选中"
                      style="font-size:12px;text-align:right;width:auto;color:#999;position:absolute;height:auto;top:0px;background-color:#fff;padding-left:8px;padding-right:8px;padding-top:4px;padding-bottom:4px;z-index:10; --custom-start: auto; line:height: 1em;
cursor: pointer;
right: -1.6vw;"
                      overflow="normal"
                      heightStretch="false"
                      widthStretch="false"
                      onClick={
                        function click(){
                          ${nameGroup.filterVar}.procInstInitiator = null;
                          $refs.${nameGroup.pickerson_procInstInitiators1Ref}.close();
                          $refs.${nameGroup.pickerson_procInstInitiators1Ref}.reload();
                          $refs.${nameGroup.listView1}.reload();
                        }
                      }></VanText>
                </VanLinearLayout>
              }>
            </VanPickerson>

            <VanDatetimePicker
              ref="${nameGroup.datetime_procInstStartTime1Ref}"
              type="date"
              title="发起时间"
              startValue={$sync(${nameGroup.filterVar}.procInstStartTimeAfter)}
              endValue={$sync(${nameGroup.filterVar}.procInstStartTimeBefore)}
              range={true}
              converter="date"
              closeOnClickOverlay={true}
              onConfirm={
                function confirm(){
                  if (nasl.util.HasValue(${nameGroup.filterVar}.procInstStartTimeBefore)) {
                    ${nameGroup.filterVar}.procInstStartTimeBefore = nasl.util.Convert<nasl.core.DateTime>(nasl.util.FormatDateTime(${nameGroup.filterVar}.procInstStartTimeBefore, 'yyyy-MM-dd 23:59:59', 'global'))
                  } else {
                  }
                  $refs.${nameGroup.listView1}.reload()
                }
              }
              slot-picker-bottom={
                <>
                  <VanPickerActionSlot targetMethod="cancel">
                    <VanButton type="info_secondary" size="normal" text="取消" squareroud="round"></VanButton>
                  </VanPickerActionSlot>
                  <VanPickerActionSlot targetMethod="confirm">
                    <VanButton type="info" size="normal" text="确认" squareroud="round"></VanButton>
                  </VanPickerActionSlot>
                </>
              }
              slot-picker-top={
                <>
                  <VanPickerActionSlot targetMethod="cancel">
                    <VanIconv name="left-arrow" icotype="only"></VanIconv>
                  </VanPickerActionSlot>
                  <VanPickerActionSlot targetMethod="confirm"></VanPickerActionSlot>
                </>
              }
              slot-pannel-title={
                <VanText text="标题"></VanText>
              }
              slotTitle={
                <VanLinearLayout direction="horizontal" wrap={true}>
                  <VanText text="发起时间"></VanText>
                </VanLinearLayout>
              }>
            </VanDatetimePicker>
          </VanLinearLayout>
          <VanRow gutter="0" alignment="center" style="--custom-start: auto; height:11.73333vw;">
            <VanCol span={8}>
              <VanLinearLayout direction="horizontal" wrap={true} mode="flex" gap="normal" justify="center" alignment="center" style="width:100%;text-align:center;--van-space-base:0px;">
                <VanLinearLayout
                style="background-color:#f7f8fa;--custom-start: auto; padding: .53333vw 2.13333vw;border-radius: 3.2vw;gap: 1.06667vw;"
                direction="horizontal" wrap={true} mode="flex" justify="center" alignment="center" onClick={
                  function click(){
                    $refs.${nameGroup.pickerson_proc1Ref}.reload()
                    $refs.${nameGroup.pickerson_proc1Ref}.open()
                  }
                }>
                  <VanText text="流程"></VanText>
                  <VanIconv name="bottom-triangle" icotype="only" style="color:#999;font-size:12px;">
                    <VanText text="图标"></VanText>
                  </VanIconv>
                </VanLinearLayout>
              </VanLinearLayout>
            </VanCol>
            <VanCol span={8}>
              <VanLinearLayout direction="horizontal" wrap={true} mode="flex" gap="normal" justify="center" alignment="center" style="width:100%;text-align:center;--van-space-base:0px;">
                <VanLinearLayout
                style="background-color:#f7f8fa;--custom-start: auto; padding: .53333vw 2.13333vw;border-radius: 3.2vw;gap: 1.06667vw;"
                direction="horizontal" wrap={true} mode="flex" justify="center" alignment="center" onClick={
                  function click(){
                    $refs.${nameGroup.pickerson_procInstInitiators1Ref}.reload()
                    $refs.${nameGroup.pickerson_procInstInitiators1Ref}.open()
                  }
                }>
                  <VanText text="发起人"></VanText>
                  <VanIconv name="bottom-triangle" icotype="only" style="color:#999;font-size:12px;">
                    <VanText text="图标"></VanText>
                  </VanIconv>
                </VanLinearLayout>
              </VanLinearLayout>
            </VanCol>
            <VanCol span={8}>
              <VanLinearLayout direction="horizontal" wrap={true} mode="flex" gap="normal" justify="center" alignment="center" style="width:100%;text-align:center;--van-space-base:0px;">
                <VanLinearLayout
                style="background-color:#f7f8fa;--custom-start: auto; padding: .53333vw 2.13333vw;border-radius: 3.2vw;gap: 1.06667vw;"
                direction="horizontal" wrap={true} mode="flex" justify="center" alignment="center" onClick={
                  function click(){
                    $refs.${nameGroup.datetime_procInstStartTime1Ref}.open()
                  }
                }>
                  <VanText text="发起时间"></VanText>
                  <VanIconv name="bottom-triangle" icotype="only" style="color:#999;font-size:12px;">
                    <VanText text="图标"></VanText>
                  </VanIconv>
                </VanLinearLayout>
              </VanLinearLayout>
            </VanCol>
          </VanRow>

          <VanLinearLayout wrap={true}>
            <VanListView
              ref="${nameGroup.listView1}"
              pageable="auto-more"
              vusionDisabledAddslot={true}
              pageSize={5}
              dataSource={${nameGroup.getMyPendingTasks}(elements.$ce.page, elements.$ce.size)}
              designerMode="success"
              hiddenempty={true}
              initialLoad={true}
              scrollTarget="parent"
              style="width:auto;height:auto;"
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
                (current) => <VanLinearLayout
                style="background-color:#fff;--van-space-base:0px;--custom-start: auto; margin: 4.26667vw;
padding: 3.2vw 4.26667vw;
border: .5px solid #E5E5E5;
box-shadow: 0 .53333vw 3.2vw rgba(0, 0, 0, .06);
border-radius: 1.06667vw;
font-size: 3.73333vw;"
                direction="horizontal" wrap={true} gap="normal" onClick={
                  function click(){
                    ${nameGroup.goToPage}(current.item.taskId)
                  }
                }>
                  <VanLinearLayout
                  style="--van-space-base:0px;borderBottomColor:#E5E5E5;border-bottom-width:1px;border-style:solid;--custom-start: auto; height: 8.2vw;
font-size: 3.73333vw;
font-weight: 500;
line-height: 5.86667vw;
box-sizing: border-box;
"
                  direction="horizontal" gap="normal" mode="flex" alignment="start" justify="space-between">
                    <VanText
                    style="text-align:left;--custom-start: auto; font-size:100%;"
                    widthStretch="true" overflow="ellipsis" text={
                      (function match(_value) {
                        if (_value === true) {
                          return current.item.procInstTitle
                        } else if (_value === false) {
                          return '-'
                        } else {
                        }
                      })(nasl.util.HasValue(current.item.procInstTitle))
                    }></VanText>
                    <VanIconv name="right-arrow" icotype="only" style="font-size:12px;--custom-start: auto; flex-shrink: 0;">
                      <VanText text="图标"></VanText>
                    </VanIconv>
                  </VanLinearLayout>
                  <VanLinearLayout style="--custom-start: auto; margin-top: 2.13333vw;" direction="horizontal" wrap={true} gap="normal" mode="flex" alignment="start" justify="space-between">
                    <VanText text="流程类型："  style="text-align:left;color:#999;--custom-start: auto; flex-shrink: 0;
font-size: 100%;
margin-right: 2.13333vw;"></VanText>
                    <VanText
                    style="text-align:right;--custom-start: auto; flex-shrink: 0;
font-size: 100%;
vertical-align: baseline;"
                    widthStretch="true" text={
                      (function match(_value) {
                        if (_value === true) {
                          return current.item.procDefTitle
                        } else if (_value === false) {
                          return '-'
                        } else {
                        }
                      })(nasl.util.HasValue(current.item.procDefTitle))
                    }></VanText>
                  </VanLinearLayout>

                  <VanLinearLayout style="--custom-start: auto; margin-top: 2.13333vw;" direction="horizontal" wrap={true} gap="normal" mode="flex" alignment="start" justify="space-between">
                    <VanText text="当前节点："  style="text-align:left;color:#999;--custom-start: auto; flex-shrink: 0;
font-size: 100%;
margin-right: 2.13333vw;"></VanText>
                    <VanText
                    style="text-align:right;--custom-start: auto; flex-shrink: 0;
font-size: 100%;
vertical-align: baseline;"
                    widthStretch="true" 
                    text={(function match(_value) {
                      if (_value === true) {
                        return nasl.util.Join(nasl.util.ListTransform(current.item.procInstCurrNodes, (item) => item.currNodeTitle), '，')
                      } else if (_value === false) {
                        return '-'
                      } else {
                      }
                    })(nasl.util.HasValue(current.item.procInstCurrNodes))}
                    ></VanText>
                  </VanLinearLayout>

                  <VanLinearLayout style="--custom-start: auto; margin-top: 2.13333vw;" direction="horizontal" wrap={true} gap="normal" mode="flex" alignment="start" justify="space-between">
                    <VanText text="发起人："  style="text-align:left;color:#999;--custom-start: auto; flex-shrink: 0;
font-size: 100%;
margin-right: 2.13333vw;"></VanText>
                    <VanText
                    style="text-align:right;--custom-start: auto; flex-shrink: 0;
font-size: 100%;
vertical-align: baseline;"
                    widthStretch="true" text={
                      (function match(_value) {
                      if (_value === true) {
                        return current.item.procInstInitiator.displayName
                      } else if (_value === false) {
                        return (function match(_value) {
                          if (_value === true) {
                            return current.item.procInstInitiator.userName
                          } else if (_value === false) {
                            return '-'
                          } else {
                          }
                        })(nasl.util.HasValue(current.item.procInstInitiator.userName))
                      } else {
                    }
                  })(nasl.util.HasValue(current.item.procInstInitiator.displayName))
                    }></VanText>
                  </VanLinearLayout>

                  <VanLinearLayout style="--custom-start: auto; margin-top: 2.13333vw;" direction="horizontal" wrap={true} gap="normal" mode="flex" alignment="start" justify="space-between">
                    <VanText text="发起时间："  style="text-align:left;color:#999;--custom-start: auto; flex-shrink: 0;
font-size: 100%;
margin-right: 2.13333vw;"></VanText>
                    <VanText
                    style="text-align:right;--custom-start: auto; flex-shrink: 0;
font-size: 100%;
vertical-align: baseline;"
                    widthStretch="true" text={
                      (function match(_value) {
                        if (_value === true) {
                          return nasl.util.FormatDateTime(current.item.procInstStartTime, 'yyyy-MM-dd HH:mm:ss', 'global')
                        } else if (_value === false) {
                          return '-'
                        } else {
                        }
                      })(nasl.util.HasValue(current.item.procInstStartTime))
                    }></VanText>
                  </VanLinearLayout>
                </VanLinearLayout>
              }></VanListView>
          </VanLinearLayout>
        </VanLinearLayout>
      </VanTab>

      <VanTab name="已办"
        slotTitle={
          <VanText text="我的已办" style="--custom-start: auto; font-weight: var(--van-font-weight-bold);font-size: 3.6vw;"></VanText>
        }>
        <VanLinearLayout direction="vertical" gap="none" style="width:auto;">
          <VanLinearLayout wrap={true} style="width:0px;height:0px;">
            <VanPickerson
              ref="${nameGroup.pickerson_proc2Ref}"
              title="流程"
              showToolbar={true}
              pageSize={20}
              value={$sync(${nameGroup.filterVar}.procDefKey)}
              placeholder=""
              dataSource={${nameGroup.getProcDefInfos}()}
              closeOnClickOverlay={true}
              type="picker"
              isNew={false}
              textField="procDefTitle"
              valueField="procDefKey"
              initialLoad={false}
              onConfirm={
                function confirm(){
                  $refs.${nameGroup.listView2}.reload()
                }
              }
              slot-picker-bottom={
                <>
                  <VanPickerActionSlot targetMethod="cancel">
                    <VanButton type="info_secondary" size="normal" text="取消" squareroud="round"></VanButton>
                  </VanPickerActionSlot>
                  <VanPickerActionSlot targetMethod="confirm">
                    <VanButton type="info" size="normal" text="确认" squareroud="round"></VanButton>
                  </VanPickerActionSlot>
                </>
              }
              slot-picker-top={
                <>
                  <VanPickerActionSlot targetMethod="cancel">
                    <VanIconv name="left-arrow" icotype="only"></VanIconv>
                  </VanPickerActionSlot>
                  <VanPickerActionSlot targetMethod="confirm"></VanPickerActionSlot>
                </>
              }
              slot-pannel-title={
                <VanText text="标题"></VanText>
              }
              slotTitle={
                <VanLinearLayout direction="horizontal" wrap={true}>
                  <VanText text="流程"></VanText>
                </VanLinearLayout>
              }
              slotOption={
                (current) => <VanLinearLayout direction="horizontal" wrap={false} mode="flex" justify="center" alignment="center" gap="normal" style="width:100%;--van-space-base:0px;">
                  <VanText text={current.item.procDefTitle} overflow="ellipsis" style="font-size:16px;"></VanText>
                  <VanText
                    _if={${nameGroup.filterVar}.procDefKey == current.item.procDefKey}
                    text="取消选中"
                    style="font-size:12px;text-align:right;width:auto;color:#999;position:absolute;height:auto;top:0px;background-color:#fff;padding-left:8px;padding-right:8px;padding-top:4px;padding-bottom:4px;z-index:10; --custom-start: auto; line:height: 1em;
cursor: pointer;
right: -1.6vw;"
                    overflow="normal"
                    heightStretch="false"
                    widthStretch="false"
                    onClick={
                      function click(){
                        ${nameGroup.filterVar}.procDefKey = null;
                        $refs.${nameGroup.pickerson_proc1Ref}.close();
                        $refs.${nameGroup.pickerson_proc1Ref}.reload();
                        $refs.${nameGroup.listView1}.reload();
                      }
                    }></VanText>
                </VanLinearLayout>
              }>
            </VanPickerson>

            <VanPickerson
              ref="${nameGroup.pickerson_procInstInitiators2Ref}"
              title="发起人"
              showToolbar={true}
              pageSize={20}
              pageable={true}
              value={$sync(${nameGroup.filterVar}.procInstInitiator)}
              placeholder=""
              dataSource={${nameGroup.getProcInstInitiators}(elements.$ce.page, elements.$ce.size, elements.$ce.filterText)}
              closeOnClickOverlay={true}
              type="picker"
              isNew={false}
              valueField="userName"
              initialLoad={false}
              filterable={true}
              onConfirm={
                function confirm(){
                  $refs.${nameGroup.listView2}.reload()
                }
              }
              slot-picker-bottom={
                <>
                  <VanPickerActionSlot targetMethod="cancel">
                    <VanButton type="info_secondary" size="normal" text="取消" squareroud="round"></VanButton>
                  </VanPickerActionSlot>
                  <VanPickerActionSlot targetMethod="confirm">
                    <VanButton type="info" size="normal" text="确认" squareroud="round"></VanButton>
                  </VanPickerActionSlot>
                </>
              }
              slot-picker-top={
                <>
                  <VanPickerActionSlot targetMethod="cancel">
                    <VanIconv name="left-arrow" icotype="only"></VanIconv>
                  </VanPickerActionSlot>
                  <VanPickerActionSlot targetMethod="confirm"></VanPickerActionSlot>
                </>
              }
              slot-pannel-title={
                <VanText text="标题"></VanText>
              }
              slotTitle={
                <VanLinearLayout direction="horizontal" wrap={true}>
                  <VanText text="发起人"></VanText>
                </VanLinearLayout>
              }
              slotOption={
                (current) => <VanLinearLayout direction="horizontal" wrap={false} mode="flex" justify="center" alignment="center" gap="normal" style="width:100%;--van-space-base:0px;">
                  <VanText
                    text={(function match(_value) {
                      if (_value === true) {
                        return current.item.displayName + '（' + current.item.userName + '）'
                      } else if (_value === false) {
                        return current.item.userName
                      } else {
                      }
                    })(nasl.util.HasValue(current.item.displayName))} overflow="ellipsis" widthStretch="true" style="font-size:16px;text-align:center;"></VanText>
                    <VanText
                      _if={${nameGroup.filterVar}.procInstInitiator == current.item.userName}
                      text="取消选中"
                      style="font-size:12px;text-align:right;width:auto;color:#999;position:absolute;height:auto;top:0px;background-color:#fff;padding-left:8px;padding-right:8px;padding-top:4px;padding-bottom:4px;z-index:10; --custom-start: auto; line:height: 1em;
cursor: pointer;
right: -1.6vw;"
                      overflow="normal"
                      heightStretch="false"
                      widthStretch="false"
                      onClick={
                        function click(){
                          ${nameGroup.filterVar}.procInstInitiator = null;
                          $refs.${nameGroup.pickerson_procInstInitiators2Ref}.close();
                          $refs.${nameGroup.pickerson_procInstInitiators2Ref}.reload();
                          $refs.${nameGroup.listView2}.reload();
                        }
                      }></VanText>
                </VanLinearLayout>
              }>
            </VanPickerson>

            <VanDatetimePicker
              ref="${nameGroup.datetime_procInstStartTime2Ref}"
              type="date"
              title="发起时间"
              startValue={$sync(${nameGroup.filterVar}.procInstStartTimeAfter)}
              endValue={$sync(${nameGroup.filterVar}.procInstStartTimeBefore)}
              range={true}
              converter="date"
              closeOnClickOverlay={true}
              onConfirm={
                function confirm(){
                  if (nasl.util.HasValue(${nameGroup.filterVar}.procInstStartTimeBefore)) {
                    ${nameGroup.filterVar}.procInstStartTimeBefore = nasl.util.Convert<nasl.core.DateTime>(nasl.util.FormatDateTime(${nameGroup.filterVar}.procInstStartTimeBefore, 'yyyy-MM-dd 23:59:59', 'global'))
                  } else {
                  }
                  $refs.${nameGroup.listView2}.reload()
                }
              }
              slot-picker-bottom={
                <>
                  <VanPickerActionSlot targetMethod="cancel">
                    <VanButton type="info_secondary" size="normal" text="取消" squareroud="round"></VanButton>
                  </VanPickerActionSlot>
                  <VanPickerActionSlot targetMethod="confirm">
                    <VanButton type="info" size="normal" text="确认" squareroud="round"></VanButton>
                  </VanPickerActionSlot>
                </>
              }
              slot-picker-top={
                <>
                  <VanPickerActionSlot targetMethod="cancel">
                    <VanIconv name="left-arrow" icotype="only"></VanIconv>
                  </VanPickerActionSlot>
                  <VanPickerActionSlot targetMethod="confirm"></VanPickerActionSlot>
                </>
              }
              slot-pannel-title={
                <VanText text="标题"></VanText>
              }
              slotTitle={
                <VanLinearLayout direction="horizontal" wrap={true}>
                  <VanText text="发起时间"></VanText>
                </VanLinearLayout>
              }>
            </VanDatetimePicker>
          </VanLinearLayout>
          <VanRow gutter="0" alignment="center" style="--custom-start: auto; height:11.73333vw;">
            <VanCol span={8}>
              <VanLinearLayout direction="horizontal" wrap={true} mode="flex" gap="normal" justify="center" alignment="center" style="width:100%;text-align:center;--van-space-base:0px;">
                <VanLinearLayout
                style="background-color:#f7f8fa;--custom-start: auto; padding: .53333vw 2.13333vw;border-radius: 3.2vw;gap: 1.06667vw;"
                direction="horizontal" wrap={true} mode="flex" justify="center" alignment="center" onClick={
                  function click(){
                    $refs.${nameGroup.pickerson_proc2Ref}.reload()
                    $refs.${nameGroup.pickerson_proc2Ref}.open()
                  }
                }>
                  <VanText text="流程"></VanText>
                  <VanIconv name="bottom-triangle" icotype="only" style="color:#999;font-size:12px;">
                    <VanText text="图标"></VanText>
                  </VanIconv>
                </VanLinearLayout>
              </VanLinearLayout>
            </VanCol>
            <VanCol span={8}>
              <VanLinearLayout direction="horizontal" wrap={true} mode="flex" gap="normal" justify="center" alignment="center" style="width:100%;text-align:center;--van-space-base:0px;">
                <VanLinearLayout
                style="background-color:#f7f8fa;--custom-start: auto; padding: .53333vw 2.13333vw;border-radius: 3.2vw;gap: 1.06667vw;"
                direction="horizontal" wrap={true} mode="flex" justify="center" alignment="center" onClick={
                  function click(){
                    $refs.${nameGroup.pickerson_procInstInitiators2Ref}.reload()
                    $refs.${nameGroup.pickerson_procInstInitiators2Ref}.open()
                  }
                }>
                  <VanText text="发起人"></VanText>
                  <VanIconv name="bottom-triangle" icotype="only" style="color:#999;font-size:12px;">
                    <VanText text="图标"></VanText>
                  </VanIconv>
                </VanLinearLayout>
              </VanLinearLayout>
            </VanCol>
            <VanCol span={8}>
              <VanLinearLayout direction="horizontal" wrap={true} mode="flex" gap="normal" justify="center" alignment="center" style="width:100%;text-align:center;--van-space-base:0px;">
                <VanLinearLayout
                style="background-color:#f7f8fa;--custom-start: auto; padding: .53333vw 2.13333vw;border-radius: 3.2vw;gap: 1.06667vw;"
                direction="horizontal" wrap={true} mode="flex" justify="center" alignment="center" onClick={
                  function click(){
                    $refs.${nameGroup.datetime_procInstStartTime2Ref}.open()
                  }
                }>
                  <VanText text="发起时间"></VanText>
                  <VanIconv name="bottom-triangle" icotype="only" style="color:#999;font-size:12px;">
                    <VanText text="图标"></VanText>
                  </VanIconv>
                </VanLinearLayout>
              </VanLinearLayout>
            </VanCol>
          </VanRow>

          <VanLinearLayout wrap={true}>
            <VanListView
              ref="${nameGroup.listView2}"
              pageable="auto-more"
              vusionDisabledAddslot={true}
              pageSize={5}
              dataSource={${nameGroup.getMyCompletedTasks}(elements.$ce.page, elements.$ce.size)}
              designerMode="success"
              hiddenempty={true}
              initialLoad={true}
              scrollTarget="parent"
              style="width:auto;height:auto;"
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
                (current) => <VanLinearLayout
                style="background-color:#fff;--van-space-base:0px;--custom-start: auto; margin: 4.26667vw;
padding: 3.2vw 4.26667vw;
border: .5px solid #E5E5E5;
box-shadow: 0 .53333vw 3.2vw rgba(0, 0, 0, .06);
border-radius: 1.06667vw;
font-size: 3.73333vw;"
                direction="horizontal" wrap={true} gap="normal" onClick={
                  function click(){
                    let url
                    url = ${logicNamespace}.getTaskDestinationUrl(current.item.taskId, undefined)
                    nasl.js.block(\`'use JSBlock' \n// 拼接全量url
url = window.location.origin + url;\`)
                    nasl.ui.gotoLink(url, '_self') // 这个地方的翻译没有按照nasl2ts，原始翻译是nasl.ui.gotoLink(url, undefined)
                  }
                }>
                  <VanLinearLayout
                  style="--van-space-base:0px;borderBottomColor:#E5E5E5;border-bottom-width:1px;border-style:solid;--custom-start: auto; height: 8.2vw;
font-size: 3.73333vw;
font-weight: 500;
line-height: 5.86667vw;
box-sizing: border-box;
"
                  direction="horizontal" gap="normal" mode="flex" alignment="start" justify="space-between">
                    <VanText
                    style="text-align:left;--custom-start: auto; font-size:100%;"
                    widthStretch="true" overflow="ellipsis" text={
                      (function match(_value) {
                        if (_value === true) {
                          return current.item.procInstTitle
                        } else if (_value === false) {
                          return '-'
                        } else {
                        }
                      })(nasl.util.HasValue(current.item.procInstTitle))
                    }></VanText>
                    <VanIconv name="right-arrow" icotype="only" style="font-size:12px;--custom-start: auto; flex-shrink: 0;">
                      <VanText text="图标"></VanText>
                    </VanIconv>
                  </VanLinearLayout>
                  <VanLinearLayout style="--custom-start: auto; margin-top: 2.13333vw;" direction="horizontal" wrap={true} gap="normal" mode="flex" alignment="start" justify="space-between">
                    <VanText text="流程类型："  style="text-align:left;color:#999;--custom-start: auto; flex-shrink: 0;
font-size: 100%;
margin-right: 2.13333vw;"></VanText>
                    <VanText
                    style="text-align:right;--custom-start: auto; flex-shrink: 0;
font-size: 100%;
vertical-align: baseline;"
                    widthStretch="true" text={
                      (function match(_value) {
                        if (_value === true) {
                          return current.item.procDefTitle
                        } else if (_value === false) {
                          return '-'
                        } else {
                        }
                      })(nasl.util.HasValue(current.item.procDefTitle))
                    }></VanText>
                  </VanLinearLayout>

                  <VanLinearLayout style="--custom-start: auto; margin-top: 2.13333vw;" direction="horizontal" wrap={true} gap="normal" mode="flex" alignment="start" justify="space-between">
                    <VanText text="处理节点："  style="text-align:left;color:#999;--custom-start: auto; flex-shrink: 0;
font-size: 100%;
margin-right: 2.13333vw;"></VanText>
                    <VanText
                    style="text-align:right;--custom-start: auto; flex-shrink: 0;
font-size: 100%;
vertical-align: baseline;"
                    widthStretch="true" 
                    text={(function match(_value) {
                      if (_value === true) {
                        return current.item.nodeTitle
                      } else if (_value === false) {
                        return '-'
                      } else {
                      }
                    })(nasl.util.HasValue(current.item.nodeTitle))}
                      ></VanText>
                  </VanLinearLayout>

                  <VanLinearLayout style="--custom-start: auto; margin-top: 2.13333vw;" direction="horizontal" wrap={true} gap="normal" mode="flex" alignment="start" justify="space-between">
                    <VanText text="发起人："  style="text-align:left;color:#999;--custom-start: auto; flex-shrink: 0;
font-size: 100%;
margin-right: 2.13333vw;"></VanText>
                    <VanText
                    style="text-align:right;--custom-start: auto; flex-shrink: 0;
font-size: 100%;
vertical-align: baseline;"
                    widthStretch="true" text={
                      (function match(_value) {
                      if (_value === true) {
                        return current.item.procInstInitiator.displayName
                      } else if (_value === false) {
                        return (function match(_value) {
                          if (_value === true) {
                            return current.item.procInstInitiator.userName
                          } else if (_value === false) {
                            return '-'
                          } else {
                          }
                        })(nasl.util.HasValue(current.item.procInstInitiator.userName))
                      } else {
                    }
                  })(nasl.util.HasValue(current.item.procInstInitiator.displayName))
                    }></VanText>
                  </VanLinearLayout>

                  <VanLinearLayout style="--custom-start: auto; margin-top: 2.13333vw;" direction="horizontal" wrap={true} gap="normal" mode="flex" alignment="start" justify="space-between">
                    <VanText text="发起时间："  style="text-align:left;color:#999;--custom-start: auto; flex-shrink: 0;
font-size: 100%;
margin-right: 2.13333vw;"></VanText>
                    <VanText
                    style="text-align:right;--custom-start: auto; flex-shrink: 0;
font-size: 100%;
vertical-align: baseline;"
                    widthStretch="true" text={
                      (function match(_value) {
                        if (_value === true) {
                          return nasl.util.FormatDateTime(current.item.procInstStartTime, 'yyyy-MM-dd HH:mm:ss', 'global')
                        } else if (_value === false) {
                          return '-'
                        } else {
                        }
                      })(nasl.util.HasValue(current.item.procInstStartTime))
                    }></VanText>
                  </VanLinearLayout>
                </VanLinearLayout>
              }></VanListView>
          </VanLinearLayout>
        </VanLinearLayout>
      </VanTab>

      <VanTab name="发起"
        slotTitle={
          <VanText text="我的发起" style="--custom-start: auto; font-weight: var(--van-font-weight-bold);font-size: 3.6vw;"></VanText>
        }>
        <VanLinearLayout direction="vertical" gap="none" style="width:auto;">
          <VanLinearLayout wrap={true} style="width:0px;height:0px;">
            <VanPickerson
              ref="${nameGroup.pickerson_proc3Ref}"
              title="流程"
              showToolbar={true}
              pageSize={20}
              value={$sync(${nameGroup.filterVar}.procDefKey)}
              placeholder=""
              dataSource={${nameGroup.getProcDefInfos}()}
              closeOnClickOverlay={true}
              type="picker"
              isNew={false}
              textField="procDefTitle"
              valueField="procDefKey"
              initialLoad={false}
              onConfirm={
                function confirm(){
                  $refs.${nameGroup.listView3}.reload()
                }
              }
              slot-picker-bottom={
                <>
                  <VanPickerActionSlot targetMethod="cancel">
                    <VanButton type="info_secondary" size="normal" text="取消" squareroud="round"></VanButton>
                  </VanPickerActionSlot>
                  <VanPickerActionSlot targetMethod="confirm">
                    <VanButton type="info" size="normal" text="确认" squareroud="round"></VanButton>
                  </VanPickerActionSlot>
                </>
              }
              slot-picker-top={
                <>
                  <VanPickerActionSlot targetMethod="cancel">
                    <VanIconv name="left-arrow" icotype="only"></VanIconv>
                  </VanPickerActionSlot>
                  <VanPickerActionSlot targetMethod="confirm"></VanPickerActionSlot>
                </>
              }
              slot-pannel-title={
                <VanText text="标题"></VanText>
              }
              slotTitle={
                <VanLinearLayout direction="horizontal" wrap={true}>
                  <VanText text="流程"></VanText>
                </VanLinearLayout>
              }
              slotOption={
                (current) => <VanLinearLayout direction="horizontal" wrap={false} mode="flex" justify="center" alignment="center" gap="normal" style="width:100%;--van-space-base:0px;">
                  <VanText text={current.item.procDefTitle} overflow="ellipsis" style="font-size:16px;"></VanText>
                  <VanText
                    _if={${nameGroup.filterVar}.procDefKey == current.item.procDefKey}
                    text="取消选中"
                    style="font-size:12px;text-align:right;width:auto;color:#999;position:absolute;height:auto;top:0px;background-color:#fff;padding-left:8px;padding-right:8px;padding-top:4px;padding-bottom:4px;z-index:10; --custom-start: auto; line:height: 1em;
cursor: pointer;
right: -1.6vw;"
                    overflow="normal"
                    heightStretch="false"
                    widthStretch="false"
                    onClick={
                      function click(){
                        ${nameGroup.filterVar}.procDefKey = null;
                        $refs.${nameGroup.pickerson_proc1Ref}.close();
                        $refs.${nameGroup.pickerson_proc1Ref}.reload();
                        $refs.${nameGroup.listView1}.reload();
                      }
                    }></VanText>
                </VanLinearLayout>
              }>
            </VanPickerson>

            <VanDatetimePicker
              ref="${nameGroup.datetime_procInstStartTime3Ref}"
              type="date"
              title="发起时间"
              startValue={$sync(${nameGroup.filterVar}.procInstStartTimeAfter)}
              endValue={$sync(${nameGroup.filterVar}.procInstStartTimeBefore)}
              range={true}
              converter="date"
              closeOnClickOverlay={true}
              onConfirm={
                function confirm(){
                  if (nasl.util.HasValue(${nameGroup.filterVar}.procInstStartTimeBefore)) {
                    ${nameGroup.filterVar}.procInstStartTimeBefore = nasl.util.Convert<nasl.core.DateTime>(nasl.util.FormatDateTime(${nameGroup.filterVar}.procInstStartTimeBefore, 'yyyy-MM-dd 23:59:59', 'global'))
                  } else {
                  }
                  $refs.${nameGroup.listView3}.reload()
                }
              }
              slot-picker-bottom={
                <>
                  <VanPickerActionSlot targetMethod="cancel">
                    <VanButton type="info_secondary" size="normal" text="取消" squareroud="round"></VanButton>
                  </VanPickerActionSlot>
                  <VanPickerActionSlot targetMethod="confirm">
                    <VanButton type="info" size="normal" text="确认" squareroud="round"></VanButton>
                  </VanPickerActionSlot>
                </>
              }
              slot-picker-top={
                <>
                  <VanPickerActionSlot targetMethod="cancel">
                    <VanIconv name="left-arrow" icotype="only"></VanIconv>
                  </VanPickerActionSlot>
                  <VanPickerActionSlot targetMethod="confirm"></VanPickerActionSlot>
                </>
              }
              slot-pannel-title={
                <VanText text="标题"></VanText>
              }
              slotTitle={
                <VanLinearLayout direction="horizontal" wrap={true}>
                  <VanText text="发起时间"></VanText>
                </VanLinearLayout>
              }>
            </VanDatetimePicker>
          </VanLinearLayout>
          <VanRow gutter="0" alignment="center" style="--custom-start: auto; height:11.73333vw;">
            <VanCol span={8}>
              <VanLinearLayout direction="horizontal" wrap={true} mode="flex" gap="normal" justify="center" alignment="center" style="width:100%;text-align:center;--van-space-base:0px;">
                <VanLinearLayout
                style="background-color:#f7f8fa;--custom-start: auto; padding: .53333vw 2.13333vw;border-radius: 3.2vw;gap: 1.06667vw;"
                direction="horizontal" wrap={true} mode="flex" justify="center" alignment="center" onClick={
                  function click(){
                    $refs.${nameGroup.pickerson_proc3Ref}.reload()
                    $refs.${nameGroup.pickerson_proc3Ref}.open()
                  }
                }>
                  <VanText text="流程"></VanText>
                  <VanIconv name="bottom-triangle" icotype="only" style="color:#999;font-size:12px;">
                    <VanText text="图标"></VanText>
                  </VanIconv>
                </VanLinearLayout>
              </VanLinearLayout>
            </VanCol>
            <VanCol span={8}>
              <VanLinearLayout direction="horizontal" wrap={true} mode="flex" gap="normal" justify="center" alignment="center" style="width:100%;text-align:center;--van-space-base:0px;">
                <VanLinearLayout
                style="background-color:#f7f8fa;--custom-start: auto; padding: .53333vw 2.13333vw;border-radius: 3.2vw;gap: 1.06667vw;"
                direction="horizontal" wrap={true} mode="flex" justify="center" alignment="center" onClick={
                  function click(){
                    $refs.${nameGroup.datetime_procInstStartTime3Ref}.open()
                  }
                }>
                  <VanText text="发起时间"></VanText>
                  <VanIconv name="bottom-triangle" icotype="only" style="color:#999;font-size:12px;">
                    <VanText text="图标"></VanText>
                  </VanIconv>
                </VanLinearLayout>
              </VanLinearLayout>
            </VanCol>
          </VanRow>

          <VanLinearLayout wrap={true}>
            <VanListView
              ref="${nameGroup.listView3}"
              pageable="auto-more"
              vusionDisabledAddslot={true}
              pageSize={5}
              dataSource={${nameGroup.getMyInitiatedTasks}(elements.$ce.page, elements.$ce.size)}
              designerMode="success"
              hiddenempty={true}
              initialLoad={true}
              scrollTarget="parent"
              style="width:auto;height:auto;"
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
                (current) => <VanLinearLayout
                style="background-color:#fff;--van-space-base:0px;--custom-start: auto; margin: 4.26667vw;
padding: 3.2vw 4.26667vw;
border: .5px solid #E5E5E5;
box-shadow: 0 .53333vw 3.2vw rgba(0, 0, 0, .06);
border-radius: 1.06667vw;
font-size: 3.73333vw;"
                direction="horizontal" wrap={true} gap="normal" onClick={
                  function click(){
                    let url
                    url = ${logicNamespace}.getTaskDestinationUrl(current.item.taskId, undefined)
                    nasl.js.block(\`'use JSBlock' \n// 拼接全量url
url = window.location.origin + url;\`)
                    nasl.ui.gotoLink(url, '_self') // 这个地方的翻译没有按照nasl2ts，原始翻译是nasl.ui.gotoLink(url, undefined)
                  }
                }>
                  <VanLinearLayout
                  style="--van-space-base:0px;borderBottomColor:#E5E5E5;border-bottom-width:1px;border-style:solid;--custom-start: auto; height: 8.2vw;
font-size: 3.73333vw;
font-weight: 500;
line-height: 5.86667vw;
box-sizing: border-box;
"
                  direction="horizontal" gap="normal" mode="flex" alignment="start" justify="space-between">
                    <VanText
                    style="text-align:left;--custom-start: auto; font-size:100%;"
                    widthStretch="true" overflow="ellipsis" text={
                      (function match(_value) {
                        if (_value === true) {
                          return current.item.procInstTitle
                        } else if (_value === false) {
                          return '-'
                        } else {
                        }
                      })(nasl.util.HasValue(current.item.procInstTitle))
                    }></VanText>
                    <VanIconv name="right-arrow" icotype="only" style="font-size:12px;--custom-start: auto; flex-shrink: 0;">
                      <VanText text="图标"></VanText>
                    </VanIconv>
                  </VanLinearLayout>
                  <VanLinearLayout style="--custom-start: auto; margin-top: 2.13333vw;" direction="horizontal" wrap={true} gap="normal" mode="flex" alignment="start" justify="space-between">
                    <VanText text="流程类型："  style="text-align:left;color:#999;--custom-start: auto; flex-shrink: 0;
font-size: 100%;
margin-right: 2.13333vw;"></VanText>
                    <VanText
                    style="text-align:right;--custom-start: auto; flex-shrink: 0;
font-size: 100%;
vertical-align: baseline;"
                    widthStretch="true" text={
                      (function match(_value) {
                        if (_value === true) {
                          return current.item.procDefTitle
                        } else if (_value === false) {
                          return '-'
                        } else {
                        }
                      })(nasl.util.HasValue(current.item.procDefTitle))
                    }></VanText>
                  </VanLinearLayout>

                  <VanLinearLayout style="--custom-start: auto; margin-top: 2.13333vw;" direction="horizontal" wrap={true} gap="normal" mode="flex" alignment="start" justify="space-between">
                    <VanText text="当前节点："  style="text-align:left;color:#999;--custom-start: auto; flex-shrink: 0;
font-size: 100%;
margin-right: 2.13333vw;"></VanText>
                    <VanText
                    style="text-align:right;--custom-start: auto; flex-shrink: 0;
font-size: 100%;
vertical-align: baseline;"
                    widthStretch="true" 
                    text={(function match(_value) {
                      if (_value === true) {
                        return nasl.util.Join(nasl.util.ListTransform(current.item.procInstCurrNodes, (item) => item.currNodeTitle), '，')
                      } else if (_value === false) {
                        return '-'
                      } else {
                      }
                    })(nasl.util.HasValue(current.item.procInstCurrNodes))}
                      ></VanText>
                  </VanLinearLayout>

                  <VanLinearLayout style="--custom-start: auto; margin-top: 2.13333vw;" direction="horizontal" wrap={true} gap="normal" mode="flex" alignment="start" justify="space-between">
                    <VanText text="当前处理人："  style="text-align:left;color:#999;--custom-start: auto; flex-shrink: 0;
font-size: 100%;
margin-right: 2.13333vw;"></VanText>
                    <VanText
                    style="text-align:right;--custom-start: auto; flex-shrink: 0;
font-size: 100%;
vertical-align: baseline;"
                    widthStretch="true" text={
                      (function match(_value) {
                        if (_value === true) {
                          return nasl.util.Join(nasl.util.ListDistinct(nasl.util.ListTransform(nasl.util.ListFlatten(nasl.util.ListTransform(nasl.util.ListFilter(current.item.procInstCurrNodes, (item) => nasl.util.HasValue(item.currNodeParticipants)), (item) => item.currNodeParticipants)), (item: ${structureNamespace}.ProcessUser) => (function match(_value) {
                            if (_value === true) {
                              return item.displayName
                            } else if (_value === false) {
                              return item.userName
                            } else {
                            }
                          })(nasl.util.HasValue(item.displayName)))), '，')
                        } else if (_value === false) {
                          return '-'
                        } else {
                        }
                      })(nasl.util.HasValue(current.item.procInstCurrNodes, nasl.util.ListFilter(current.item.procInstCurrNodes, (item) => nasl.util.HasValue(item.currNodeParticipants))))
                    }></VanText>
                  </VanLinearLayout>

                  <VanLinearLayout style="--custom-start: auto; margin-top: 2.13333vw;" direction="horizontal" wrap={true} gap="normal" mode="flex" alignment="start" justify="space-between">
                    <VanText text="发起人："  style="text-align:left;color:#999;--custom-start: auto; flex-shrink: 0;
font-size: 100%;
margin-right: 2.13333vw;"></VanText>
                    <VanText
                    style="text-align:right;--custom-start: auto; flex-shrink: 0;
font-size: 100%;
vertical-align: baseline;"
                    widthStretch="true" text={
                      (function match(_value) {
                      if (_value === true) {
                        return current.item.procInstInitiator.displayName
                      } else if (_value === false) {
                        return (function match(_value) {
                          if (_value === true) {
                            return current.item.procInstInitiator.userName
                          } else if (_value === false) {
                            return '-'
                          } else {
                          }
                        })(nasl.util.HasValue(current.item.procInstInitiator.userName))
                      } else {
                    }
                  })(nasl.util.HasValue(current.item.procInstInitiator.displayName))
                    }></VanText>
                  </VanLinearLayout>

                  <VanLinearLayout style="--custom-start: auto; margin-top: 2.13333vw;" direction="horizontal" wrap={true} gap="normal" mode="flex" alignment="start" justify="space-between">
                    <VanText text="发起时间："  style="text-align:left;color:#999;--custom-start: auto; flex-shrink: 0;
font-size: 100%;
margin-right: 2.13333vw;"></VanText>
                    <VanText
                    style="text-align:right;--custom-start: auto; flex-shrink: 0;
font-size: 100%;
vertical-align: baseline;"
                    widthStretch="true" text={
                      (function match(_value) {
                        if (_value === true) {
                          return nasl.util.FormatDateTime(current.item.procInstStartTime, 'yyyy-MM-dd HH:mm:ss', 'global')
                        } else if (_value === false) {
                          return '-'
                        } else {
                        }
                      })(nasl.util.HasValue(current.item.procInstStartTime))
                    }></VanText>
                  </VanLinearLayout>
                </VanLinearLayout>
              }></VanListView>
          </VanLinearLayout>
        </VanLinearLayout>
      </VanTab>

      <VanTab name="抄送"
        slotTitle={
          <VanText text="我的抄送" style="--custom-start: auto; font-weight: var(--van-font-weight-bold);font-size: 3.6vw;"></VanText>
        }>
        <VanLinearLayout direction="vertical" gap="none" style="width:auto;">
          <VanLinearLayout wrap={true} style="width:0px;height:0px;">
            <VanPickerson
              ref="${nameGroup.pickerson_proc4Ref}"
              title="流程"
              showToolbar={true}
              pageSize={20}
              value={$sync(${nameGroup.filterVar}.procDefKey)}
              placeholder=""
              dataSource={${nameGroup.getProcDefInfos}()}
              closeOnClickOverlay={true}
              type="picker"
              isNew={false}
              textField="procDefTitle"
              valueField="procDefKey"
              initialLoad={false}
              onConfirm={
                function confirm(){
                  $refs.${nameGroup.listView4}.reload()
                }
              }
              slot-picker-bottom={
                <>
                  <VanPickerActionSlot targetMethod="cancel">
                    <VanButton type="info_secondary" size="normal" text="取消" squareroud="round"></VanButton>
                  </VanPickerActionSlot>
                  <VanPickerActionSlot targetMethod="confirm">
                    <VanButton type="info" size="normal" text="确认" squareroud="round"></VanButton>
                  </VanPickerActionSlot>
                </>
              }
              slot-picker-top={
                <>
                  <VanPickerActionSlot targetMethod="cancel">
                    <VanIconv name="left-arrow" icotype="only"></VanIconv>
                  </VanPickerActionSlot>
                  <VanPickerActionSlot targetMethod="confirm"></VanPickerActionSlot>
                </>
              }
              slot-pannel-title={
                <VanText text="标题"></VanText>
              }
              slotTitle={
                <VanLinearLayout direction="horizontal" wrap={true}>
                  <VanText text="流程"></VanText>
                </VanLinearLayout>
              }
              slotOption={
                (current) => <VanLinearLayout direction="horizontal" wrap={false} mode="flex" justify="center" alignment="center" gap="normal" style="width:100%;--van-space-base:0px;">
                  <VanText text={current.item.procDefTitle} overflow="ellipsis" style="font-size:16px;"></VanText>
                  <VanText
                    _if={${nameGroup.filterVar}.procDefKey == current.item.procDefKey}
                    text="取消选中"
                    style="font-size:12px;text-align:right;width:auto;color:#999;position:absolute;height:auto;top:0px;background-color:#fff;padding-left:8px;padding-right:8px;padding-top:4px;padding-bottom:4px;z-index:10; --custom-start: auto; line:height: 1em;
cursor: pointer;
right: -1.6vw;"
                    overflow="normal"
                    heightStretch="false"
                    widthStretch="false"
                    onClick={
                      function click(){
                        ${nameGroup.filterVar}.procDefKey = null;
                        $refs.${nameGroup.pickerson_proc1Ref}.close();
                        $refs.${nameGroup.pickerson_proc1Ref}.reload();
                        $refs.${nameGroup.listView1}.reload();
                      }
                    }></VanText>
                </VanLinearLayout>
              }>
            </VanPickerson>

            <VanPickerson
              ref="${nameGroup.pickerson_procInstInitiators4Ref}"
              title="发起人"
              showToolbar={true}
              pageSize={20}
              pageable={true}
              value={$sync(${nameGroup.filterVar}.procInstInitiator)}
              placeholder=""
              dataSource={${nameGroup.getProcInstInitiators}(elements.$ce.page, elements.$ce.size, elements.$ce.filterText)}
              closeOnClickOverlay={true}
              type="picker"
              isNew={false}
              valueField="userName"
              initialLoad={false}
              filterable={true}
              onConfirm={
                function confirm(){
                  $refs.${nameGroup.listView4}.reload()
                }
              }
              slot-picker-bottom={
                <>
                  <VanPickerActionSlot targetMethod="cancel">
                    <VanButton type="info_secondary" size="normal" text="取消" squareroud="round"></VanButton>
                  </VanPickerActionSlot>
                  <VanPickerActionSlot targetMethod="confirm">
                    <VanButton type="info" size="normal" text="确认" squareroud="round"></VanButton>
                  </VanPickerActionSlot>
                </>
              }
              slot-picker-top={
                <>
                  <VanPickerActionSlot targetMethod="cancel">
                    <VanIconv name="left-arrow" icotype="only"></VanIconv>
                  </VanPickerActionSlot>
                  <VanPickerActionSlot targetMethod="confirm"></VanPickerActionSlot>
                </>
              }
              slot-pannel-title={
                <VanText text="标题"></VanText>
              }
              slotTitle={
                <VanLinearLayout direction="horizontal" wrap={true}>
                  <VanText text="发起人"></VanText>
                </VanLinearLayout>
              }
              slotOption={
                (current) => <VanLinearLayout direction="horizontal" wrap={false} mode="flex" justify="center" alignment="center" gap="normal" style="width:100%;--van-space-base:0px;">
                  <VanText
                    text={(function match(_value) {
                      if (_value === true) {
                        return current.item.displayName + '（' + current.item.userName + '）'
                      } else if (_value === false) {
                        return current.item.userName
                      } else {
                      }
                    })(nasl.util.HasValue(current.item.displayName))} overflow="ellipsis" widthStretch="true" style="font-size:16px;text-align:center;"></VanText>
                    <VanText
                      _if={${nameGroup.filterVar}.procInstInitiator == current.item.userName}
                      text="取消选中"
                      style="font-size:12px;text-align:right;width:auto;color:#999;position:absolute;height:auto;top:0px;background-color:#fff;padding-left:8px;padding-right:8px;padding-top:4px;padding-bottom:4px;z-index:10; --custom-start: auto; line:height: 1em;
cursor: pointer;
right: -1.6vw;"
                      overflow="normal"
                      heightStretch="false"
                      widthStretch="false"
                      onClick={
                        function click(){
                          ${nameGroup.filterVar}.procInstInitiator = null;
                          $refs.${nameGroup.pickerson_procInstInitiators4Ref}.close();
                          $refs.${nameGroup.pickerson_procInstInitiators4Ref}.reload();
                          $refs.${nameGroup.listView4}.reload();
                        }
                      }></VanText>
                </VanLinearLayout>
              }>
            </VanPickerson>

            <VanDatetimePicker
              ref="${nameGroup.datetime_procInstStartTime4Ref}"
              type="date"
              title="发起时间"
              startValue={$sync(${nameGroup.filterVar}.procInstStartTimeAfter)}
              endValue={$sync(${nameGroup.filterVar}.procInstStartTimeBefore)}
              range={true}
              converter="date"
              closeOnClickOverlay={true}
              onConfirm={
                function confirm(){
                  if (nasl.util.HasValue(${nameGroup.filterVar}.procInstStartTimeBefore)) {
                    ${nameGroup.filterVar}.procInstStartTimeBefore = nasl.util.Convert<nasl.core.DateTime>(nasl.util.FormatDateTime(${nameGroup.filterVar}.procInstStartTimeBefore, 'yyyy-MM-dd 23:59:59', 'global'))
                  } else {
                  }
                  $refs.${nameGroup.listView4}.reload()
                }
              }
              slot-picker-bottom={
                <>
                  <VanPickerActionSlot targetMethod="cancel">
                    <VanButton type="info_secondary" size="normal" text="取消" squareroud="round"></VanButton>
                  </VanPickerActionSlot>
                  <VanPickerActionSlot targetMethod="confirm">
                    <VanButton type="info" size="normal" text="确认" squareroud="round"></VanButton>
                  </VanPickerActionSlot>
                </>
              }
              slot-picker-top={
                <>
                  <VanPickerActionSlot targetMethod="cancel">
                    <VanIconv name="left-arrow" icotype="only"></VanIconv>
                  </VanPickerActionSlot>
                  <VanPickerActionSlot targetMethod="confirm"></VanPickerActionSlot>
                </>
              }
              slot-pannel-title={
                <VanText text="标题"></VanText>
              }
              slotTitle={
                <VanLinearLayout direction="horizontal" wrap={true}>
                  <VanText text="发起时间"></VanText>
                </VanLinearLayout>
              }>
            </VanDatetimePicker>
            <VanPickerson
              ref="${nameGroup.pickerson_viewed4Ref}"
              title="查看状态"
              showToolbar={true}
              pageSize={20}
              value={$sync(${nameGroup.filterVar}.viewed)}
              placeholder=""
              dataSource={${nameGroup.getViewed}()}
              closeOnClickOverlay={true}
              type="picker"
              isNew={false}
              textField="name"
              valueField="value"
              initialLoad={true}
              optionIsSlot={true}
              onConfirm={
                function confirm(){
                  $refs.${nameGroup.listView4}.reload()
                }
              }
              slot-picker-bottom={
                <>
                  <VanPickerActionSlot targetMethod="cancel">
                    <VanButton type="info_secondary" size="normal" text="取消" squareroud="round"></VanButton>
                  </VanPickerActionSlot>
                  <VanPickerActionSlot targetMethod="confirm">
                    <VanButton type="info" size="normal" text="确认" squareroud="round"></VanButton>
                  </VanPickerActionSlot>
                </>
              }
              slot-picker-top={
                <>
                  <VanPickerActionSlot targetMethod="cancel">
                    <VanIconv name="left-arrow" icotype="only"></VanIconv>
                  </VanPickerActionSlot>
                  <VanPickerActionSlot targetMethod="confirm"></VanPickerActionSlot>
                </>
              }
              slot-pannel-title={
                <VanText text="标题"></VanText>
              }
              slotTitle={
                <VanLinearLayout direction="horizontal" wrap={true}>
                  <VanText text="查看状态"></VanText>
                </VanLinearLayout>
              }
              slotOption={
                (current) => <VanLinearLayout direction="horizontal" wrap={false} mode="flex" justify="center" alignment="center" gap="normal" style="width:100%;--van-space-base:0px;">
                  <VanText
                    text={current.item.name} overflow="ellipsis" style="font-size:16px;"></VanText>
                    <VanText
                      _if={${nameGroup.filterVar}.viewed == current.item.value}
                      text="取消选中"
                      style="font-size:12px;text-align:right;width:auto;color:#999;position:absolute;height:auto;top:0px;background-color:#fff;padding-left:8px;padding-right:8px;padding-top:4px;padding-bottom:4px;z-index:10; --custom-start: auto; line:height: 1em;
cursor: pointer;
right: -1.6vw;"
                      overflow="normal"
                      heightStretch="false"
                      widthStretch="false"
                      onClick={
                        function click(){
                          ${nameGroup.filterVar}.viewed = null;
                          $refs.${nameGroup.pickerson_viewed4Ref}.close();
                          $refs.${nameGroup.pickerson_viewed4Ref}.reload();
                          $refs.${nameGroup.listView4}.reload();
                        }
                      }></VanText>
                </VanLinearLayout>
              }>
            </VanPickerson>
          </VanLinearLayout>
          <VanRow gutter="0" alignment="center" style="--custom-start: auto; height:11.73333vw;">
            <VanCol span={6}>
              <VanLinearLayout direction="horizontal" wrap={true} mode="flex" gap="normal" justify="center" alignment="center" style="width:100%;text-align:center;--van-space-base:0px;">
                <VanLinearLayout
                style="background-color:#f7f8fa;--custom-start: auto; padding: .53333vw 2.13333vw;border-radius: 3.2vw;gap: 1.06667vw;"
                direction="horizontal" wrap={true} mode="flex" justify="center" alignment="center" onClick={
                  function click(){
                    $refs.${nameGroup.pickerson_proc4Ref}.reload()
                    $refs.${nameGroup.pickerson_proc4Ref}.open()
                  }
                }>
                  <VanText text="流程"></VanText>
                  <VanIconv name="bottom-triangle" icotype="only" style="color:#999;font-size:12px;">
                    <VanText text="图标"></VanText>
                  </VanIconv>
                </VanLinearLayout>
              </VanLinearLayout>
            </VanCol>
            <VanCol span={6}>
              <VanLinearLayout direction="horizontal" wrap={true} mode="flex" gap="normal" justify="center" alignment="center" style="width:100%;text-align:center;--van-space-base:0px;">
                <VanLinearLayout
                style="background-color:#f7f8fa;--custom-start: auto; padding: .53333vw 2.13333vw;border-radius: 3.2vw;gap: 1.06667vw;"
                direction="horizontal" wrap={true} mode="flex" justify="center" alignment="center" onClick={
                  function click(){
                    $refs.${nameGroup.pickerson_procInstInitiators4Ref}.reload()
                    $refs.${nameGroup.pickerson_procInstInitiators4Ref}.open()
                  }
                }>
                  <VanText text="发起人"></VanText>
                  <VanIconv name="bottom-triangle" icotype="only" style="color:#999;font-size:12px;">
                    <VanText text="图标"></VanText>
                  </VanIconv>
                </VanLinearLayout>
              </VanLinearLayout>
            </VanCol>
            <VanCol span={6}>
              <VanLinearLayout direction="horizontal" wrap={true} mode="flex" gap="normal" justify="center" alignment="center" style="width:100%;text-align:center;--van-space-base:0px;">
                <VanLinearLayout
                style="background-color:#f7f8fa;--custom-start: auto; padding: .53333vw 2.13333vw;border-radius: 3.2vw;gap: 1.06667vw;"
                direction="horizontal" wrap={true} mode="flex" justify="center" alignment="center" onClick={
                  function click(){
                    $refs.${nameGroup.datetime_procInstStartTime4Ref}.open()
                  }
                }>
                  <VanText text="发起时间"></VanText>
                  <VanIconv name="bottom-triangle" icotype="only" style="color:#999;font-size:12px;">
                    <VanText text="图标"></VanText>
                  </VanIconv>
                </VanLinearLayout>
              </VanLinearLayout>
            </VanCol>
            <VanCol span={6}>
              <VanLinearLayout direction="horizontal" wrap={true} mode="flex" gap="normal" justify="center" alignment="center" style="width:100%;text-align:center;--van-space-base:0px;">
                <VanLinearLayout
                style="background-color:#f7f8fa;--custom-start: auto; padding: .53333vw 2.13333vw;border-radius: 3.2vw;gap: 1.06667vw;"
                direction="horizontal" wrap={true} mode="flex" justify="center" alignment="center" onClick={
                  function click(){
                    $refs.${nameGroup.pickerson_viewed4Ref}.open()
                  }
                }>
                  <VanText text="查看状态"></VanText>
                  <VanIconv name="bottom-triangle" icotype="only" style="color:#999;font-size:12px;">
                    <VanText text="图标"></VanText>
                  </VanIconv>
                </VanLinearLayout>
              </VanLinearLayout>
            </VanCol>
          </VanRow>

          <VanLinearLayout wrap={true}>
            <VanListView
              ref="${nameGroup.listView4}"
              pageable="auto-more"
              vusionDisabledAddslot={true}
              pageSize={5}
              dataSource={${nameGroup.getMyCCTasks}(elements.$ce.page, elements.$ce.size)}
              designerMode="success"
              hiddenempty={true}
              initialLoad={true}
              scrollTarget="parent"
              style="width:auto;height:auto;"
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
                (current) => <VanLinearLayout
                style="background-color:#fff;--van-space-base:0px;--custom-start: auto; margin: 4.26667vw;
padding: 3.2vw 4.26667vw;
border: .5px solid #E5E5E5;
box-shadow: 0 .53333vw 3.2vw rgba(0, 0, 0, .06);
border-radius: 1.06667vw;
font-size: 3.73333vw;"
                direction="horizontal" wrap={true} gap="normal" onClick={
                  function click(){
                    let url
                    url = ${logicNamespace}.getTaskDestinationUrl(current.item.taskId, undefined)
                    nasl.js.block(\`'use JSBlock' \n// 拼接全量url
url = window.location.origin + url;\`)
                    nasl.ui.gotoLink(url, '_self') // 这个地方的翻译没有按照nasl2ts，原始翻译是nasl.ui.gotoLink(url, undefined)
                  }
                }>
                  <VanLinearLayout
                  style="--van-space-base:0px;borderBottomColor:#E5E5E5;border-bottom-width:1px;border-style:solid;--custom-start: auto; height: 8.2vw;
font-size: 3.73333vw;
font-weight: 500;
line-height: 5.86667vw;
box-sizing: border-box;
"
                  direction="horizontal" gap="normal" mode="flex" alignment="start" justify="space-between">
                    <VanText
                    style="text-align:left;--custom-start: auto; font-size:100%;"
                    widthStretch="true" overflow="ellipsis" text={
                      (function match(_value) {
                        if (_value === true) {
                          return current.item.procInstTitle
                        } else if (_value === false) {
                          return '-'
                        } else {
                        }
                      })(nasl.util.HasValue(current.item.procInstTitle))
                    }></VanText>
                    <VanIconv name="right-arrow" icotype="only" style="font-size:12px;--custom-start: auto; flex-shrink: 0;">
                      <VanText text="图标"></VanText>
                    </VanIconv>
                  </VanLinearLayout>
                  <VanLinearLayout style="--custom-start: auto; margin-top: 2.13333vw;" direction="horizontal" wrap={true} gap="normal" mode="flex" alignment="start" justify="space-between">
                    <VanText text="流程类型："  style="text-align:left;color:#999;--custom-start: auto; flex-shrink: 0;
font-size: 100%;
margin-right: 2.13333vw;"></VanText>
                    <VanText
                    style="text-align:right;--custom-start: auto; flex-shrink: 0;
font-size: 100%;
vertical-align: baseline;"
                    widthStretch="true" text={
                      (function match(_value) {
                        if (_value === true) {
                          return current.item.procDefTitle
                        } else if (_value === false) {
                          return '-'
                        } else {
                        }
                      })(nasl.util.HasValue(current.item.procDefTitle))
                    }></VanText>
                  </VanLinearLayout>

                  <VanLinearLayout style="--custom-start: auto; margin-top: 2.13333vw;" direction="horizontal" wrap={true} gap="normal" mode="flex" alignment="start" justify="space-between">
                    <VanText text="当前节点："  style="text-align:left;color:#999;--custom-start: auto; flex-shrink: 0;
font-size: 100%;
margin-right: 2.13333vw;"></VanText>
                    <VanText
                    style="text-align:right;--custom-start: auto; flex-shrink: 0;
font-size: 100%;
vertical-align: baseline;"
                    widthStretch="true" 
                    text={(function match(_value) {
                      if (_value === true) {
                        return nasl.util.Join(nasl.util.ListTransform(current.item.procInstCurrNodes, (item) => item.currNodeTitle), '，')
                      } else if (_value === false) {
                        return '-'
                      } else {
                      }
                    })(nasl.util.HasValue(current.item.procInstCurrNodes))}
                      ></VanText>
                  </VanLinearLayout>

                  <VanLinearLayout style="--custom-start: auto; margin-top: 2.13333vw;" direction="horizontal" wrap={true} gap="normal" mode="flex" alignment="start" justify="space-between">
                    <VanText text="当前处理人："  style="text-align:left;color:#999;--custom-start: auto; flex-shrink: 0;
font-size: 100%;
margin-right: 2.13333vw;"></VanText>
                    <VanText
                    style="text-align:right;--custom-start: auto; flex-shrink: 0;
font-size: 100%;
vertical-align: baseline;"
                    widthStretch="true" text={
                      (function match(_value) {
                        if (_value === true) {
                          return nasl.util.Join(nasl.util.ListDistinct(nasl.util.ListTransform(nasl.util.ListFlatten(nasl.util.ListTransform(nasl.util.ListFilter(current.item.procInstCurrNodes, (item) => nasl.util.HasValue(item.currNodeParticipants)), (item) => item.currNodeParticipants)), (item: ${structureNamespace}.ProcessUser) => (function match(_value) {
                            if (_value === true) {
                              return item.displayName
                            } else if (_value === false) {
                              return item.userName
                            } else {
                            }
                          })(nasl.util.HasValue(item.displayName)))), '，')
                        } else if (_value === false) {
                          return '-'
                        } else {
                        }
                      })(nasl.util.HasValue(current.item.procInstCurrNodes, nasl.util.ListFilter(current.item.procInstCurrNodes, (item) => nasl.util.HasValue(item.currNodeParticipants))))
                    }></VanText>
                  </VanLinearLayout>

                  <VanLinearLayout style="--custom-start: auto; margin-top: 2.13333vw;" direction="horizontal" wrap={true} gap="normal" mode="flex" alignment="start" justify="space-between">
                    <VanText text="发起人："  style="text-align:left;color:#999;--custom-start: auto; flex-shrink: 0;
font-size: 100%;
margin-right: 2.13333vw;"></VanText>
                    <VanText
                    style="text-align:right;--custom-start: auto; flex-shrink: 0;
font-size: 100%;
vertical-align: baseline;"
                    widthStretch="true" text={
                      (function match(_value) {
                      if (_value === true) {
                        return current.item.procInstInitiator.displayName
                      } else if (_value === false) {
                        return (function match(_value) {
                          if (_value === true) {
                            return current.item.procInstInitiator.userName
                          } else if (_value === false) {
                            return '-'
                          } else {
                          }
                        })(nasl.util.HasValue(current.item.procInstInitiator.userName))
                      } else {
                    }
                  })(nasl.util.HasValue(current.item.procInstInitiator.displayName))
                    }></VanText>
                  </VanLinearLayout>

                  <VanLinearLayout style="--custom-start: auto; margin-top: 2.13333vw;" direction="horizontal" wrap={true} gap="normal" mode="flex" alignment="start" justify="space-between">
                    <VanText text="发起时间："  style="text-align:left;color:#999;--custom-start: auto; flex-shrink: 0;
font-size: 100%;
margin-right: 2.13333vw;"></VanText>
                    <VanText
                    style="text-align:right;--custom-start: auto; flex-shrink: 0;
font-size: 100%;
vertical-align: baseline;"
                    widthStretch="true" text={
                      (function match(_value) {
                        if (_value === true) {
                          return nasl.util.FormatDateTime(current.item.procInstStartTime, 'yyyy-MM-dd HH:mm:ss', 'global')
                        } else if (_value === false) {
                          return '-'
                        } else {
                        }
                      })(nasl.util.HasValue(current.item.procInstStartTime))
                    }></VanText>
                  </VanLinearLayout>
                </VanLinearLayout>
              }></VanListView>
          </VanLinearLayout>
        </VanLinearLayout>
      </VanTab>
    </VanTabs>
  }`;
}
