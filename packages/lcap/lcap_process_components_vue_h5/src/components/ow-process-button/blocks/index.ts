import * as naslTypes from '@nasl/ast-mini';
import { logicNamespace, structureNamespace } from '../../utils';

// 生成流程信息
export function genOwProcessButton(node: naslTypes.ViewElement | any) {
  const view = node.likeComponent;
  // 生成唯一name
  // 加到页面上的params、variables、logics等都需要唯一name
  // 页面上有ref引用的element也需要唯一name
  const nameGroup = {
    // permissionButtonMapVar: view.getVariableUniqueName('permissionButtonMap'), // 流程按钮Map
    // 局部变量
    permissionButtonListVar: view.getVariableUniqueName('processButtonList'), // 流程按钮list
    buttonItemVar: view.getVariableUniqueName('processButtonItem'), // 选中的流程按钮
    approvalPolicy: view.getVariableUniqueName('processButtonApprovalPolicy'), // 加签方式
    buttonBodyVar: view.getVariableUniqueName('processButtonBody'), // 流程弹窗body，名称勿改！！！
    // 页面逻辑
    getTaskOperationPermissionsEvent: view.getLogicUniqueName('getTaskOperationPermissions'), // 获取任务操作权限
    getSignOptionsEvent: view.getLogicUniqueName('getSignOptions'), // 获取加签方式
    openButtonModalEvent: view.getLogicUniqueName('openButtonModal'), // 流程按钮触发弹窗
    getUserEvent: view.getLogicUniqueName('getUser'), // 获取转派人员或加签人员
    submitButtonEvent: view.getLogicUniqueName('submitButton'), // 流程按钮提交
    getBackNodesEvent: view.getLogicUniqueName('getBackNodes'), // 获取可回退节点
    createdEvent: view.getLogicUniqueName('created'), // 页面创建事件
    // 页面逻辑下的局部变量
    // 获取任务操作权限
    permissionDetailsVar: view.getVariableUniqueName('permissionDetails'),
    dataVar: view.getVariableUniqueName('data'),
    // 获取任务操作权限
    taskInstVar: view.getVariableUniqueName('taskInst'),
    // 流程按钮触发弹窗
    hasFormVar: view.getVariableUniqueName('hasForm'), // 流程表单是否存在
    validVar: view.getVariableUniqueName('valid'), // 表单校验是否通过
    // ref
    buttonDialogRef: view.getViewElementUniqueName('button_dialog'), // 流程按钮弹窗
    buttonPopupRef: view.getViewElementUniqueName('button_popup'), // 流程弹窗
    buttonBackDialogRef: view.getViewElementUniqueName('button_backDialog'), // 流程按钮触发弹窗_撤回
    formButtonDialogRef: view.getViewElementUniqueName('form_buttonDialog'), // 弹窗中的表单
    formButtonPopupRef: view.getViewElementUniqueName('form_buttonPopup'), // 抽屉中的表单
    addSignRadioRef: view.getViewElementUniqueName('radio_group_addSign'), // 加签单选组
    revertFlowRadioRef: view.getViewElementUniqueName('radio_group_revert_flow'), // 撤回流转到单选组
    revertReSubmitRadioRef: view.getViewElementUniqueName('radio_group_revert_resubmit'), // 撤回重新提交到单选组
    buttonToastRef: view.getViewElementUniqueName('button_toast'), // 回退提示
  };

  // 流程需要使用页面输入参数‘taskId’，且不带数字后缀，这里不做唯一性命名
  const hasTaskIdParam = view.params.some((param: any) => param.name === 'taskId');

  return `export function view(${hasTaskIdParam ? '' : `taskId: string`}) {
    let ${nameGroup.permissionButtonListVar}: List<${structureNamespace}.TaskOperationPermission>; //流程按钮list
    let ${nameGroup.buttonItemVar}: ${structureNamespace}.TaskOperationPermission; //选中的流程按钮
    let ${nameGroup.approvalPolicy}: string; //流程按钮加签方式
    let ${
      nameGroup.buttonBodyVar
    }: { task: String, comment: String, userForOperate: String, policyForAddSign: String, nodeId: String, afterComplete: String }; //流程按钮弹窗body，名称勿改！！！

    function ${nameGroup.getTaskOperationPermissionsEvent}() {
      let ${nameGroup.permissionDetailsVar}
      let ${nameGroup.dataVar}
      ${nameGroup.dataVar} = ${logicNamespace}.getTaskOperationPermissions(taskId)
      if (nasl.util.HasValue(${nameGroup.dataVar})) {
        ${nameGroup.permissionDetailsVar} = nasl.util.ListFilter(${
    nameGroup.dataVar
  }, (item: ${structureNamespace}.TaskOperationPermission) => item.operationEnabled)
        if (nasl.util.HasValue(${nameGroup.permissionDetailsVar})) {
          ${nameGroup.permissionButtonListVar} = ${nameGroup.permissionDetailsVar}
          if (nasl.util.HasValue(nasl.util.ListFind(${
            nameGroup.permissionButtonListVar
          },(item: ${structureNamespace}.TaskOperationPermission) => item.name == 'addSign'))) {
            ${nameGroup.approvalPolicy} = ${nameGroup.getSignOptionsEvent}()
          } else {
          }
        } else {
        }
      } else {
      }
    }//获取任务操作权限

    function ${nameGroup.getSignOptionsEvent}() {
      let ${nameGroup.taskInstVar}
      let result
      ${nameGroup.taskInstVar} = ${logicNamespace}.getTaskInfo(taskId)
      if (nasl.util.HasValue(${nameGroup.taskInstVar}, ${nameGroup.taskInstVar}.approvalPolicy)) {
          if (nasl.util.Contains(nasl.util.NewList<string>(['simple', 'parallel', 'sequence']), ${nameGroup.taskInstVar}.approvalPolicy)) {
              result = ${nameGroup.taskInstVar}.approvalPolicy
          } else {
          }
      } else {
      }
      return result
    }//获取加签方式

    function ${nameGroup.openButtonModalEvent}(index: Long) {
      let ${nameGroup.hasFormVar}: Boolean; //流程表单是否存在
      let ${nameGroup.validVar}: Boolean; //表单校验是否通过

      nasl.util.Clear(${nameGroup.buttonBodyVar}, 'deep');
      
      ${nameGroup.buttonItemVar} = nasl.util.Get(${nameGroup.permissionButtonListVar}, index);

      (function match(_value) {
        if (${nameGroup.buttonItemVar}.name === 'withdraw') {
          $refs.${nameGroup.buttonBackDialogRef}.openModal()
          return;
        } else {
          nasl.js.block(\`'use JSBlock' \n
//流程表单验证，通过脚本获取流程表单校验结果
if (window.__processDetailFromMixinFormVm__ && window.__processDetailFromMixinFormVm__.validate) {
    ${nameGroup.hasFormVar} = true;
    const validateResult = await window.__processDetailFromMixinFormVm__.validate();
    if (validateResult.valid) {
        ${nameGroup.validVar} = true;
    }
} else{
    ${nameGroup.hasFormVar} = false;
}\`)
          if (${nameGroup.hasFormVar}) {
            if (${nameGroup.validVar}) {
              /* 如果为submit按钮，直接走提交事件 */
              if (${nameGroup.buttonItemVar}.name == 'submit') {
                ${nameGroup.submitButtonEvent}('submit')
                return;
              } else {
              }
            } else {
              return;
            }
          } else {
            /* 无流程表单直接弹窗！ */
          }
          /* 加签单选组初始化 */
          if (${nameGroup.buttonItemVar}.name == 'addSign' || ${nameGroup.buttonItemVar}.name == 'revert') {
            if (${nameGroup.buttonItemVar}.name == 'addSign') {
              ${nameGroup.buttonBodyVar}.policyForAddSign = 'CurrentNode'
            } else {
            }
            if (${nameGroup.buttonItemVar}.name == 'revert' && ${nameGroup.buttonItemVar}.afterComplete == 'runtimeSpecify') {
              ${nameGroup.buttonBodyVar}.afterComplete = 'reExecute'
            } else {
            }
            $refs.${nameGroup.buttonPopupRef}.openModal();
            return;
          } else {
          }
          $refs.${nameGroup.buttonDialogRef}.openModal()
        }
      })(${nameGroup.buttonItemVar}.name)
    }//流程按钮触发弹窗

    function ${nameGroup.getUserEvent}(name: string, page: Long, size: Long, filterText: string) {
      let result
      (function match(_value) {
        if (name === 'reassign') {
          result = ${logicNamespace}.getUsersForReassign(taskId, page, size, filterText)
        } else if (name === 'addSign') {
          result = ${logicNamespace}.getUsersForAddSign(taskId, page, size, filterText)
        } else {
        }
      })(name)
      return result
    }//获取转派人员或加签人员

    function ${nameGroup.submitButtonEvent}(name: string) {
      (function match(_value) {
        if (name === 'revert') {
          ${logicNamespace}.revertTask(taskId, ${nameGroup.buttonBodyVar}.nodeId, ${nameGroup.buttonBodyVar}.afterComplete, ${nameGroup.buttonBodyVar}.comment)
        } else if (name === 'withdraw') {
          ${logicNamespace}.withdrawTask(taskId)
        } else if (name === 'addSign') {
          ${logicNamespace}.addSignTask(taskId, ${nameGroup.buttonBodyVar}.userForOperate, ${nameGroup.buttonBodyVar}.policyForAddSign)
        } else if (name === 'reassign') {
          ${logicNamespace}.reassignTask(taskId, ${nameGroup.buttonBodyVar}.userForOperate)
        } else {
          nasl.js.block(\`'use JSBlock' \n
const operate = name+'Task';
const body = {
    taskId: this.taskId,
};
//审批同意、提交表单等操作时获取流程表单数据，接口调用也可使用流程逻辑
if (window.__processDetailFromMixinFormData__) {
    body.data = window.__processDetailFromMixinFormData__;
}
if(name !== 'submit') {
    body.comment = this.${nameGroup.buttonBodyVar}.comment;
}
const res = await this.$processV2.setTaskInstance({
    path: {
        operate,
    },
    body,
});\`)
        }
      })(name)
      nasl.js.block(\`'use JSBlock' \n//刷新页面
window.location.reload();\`)
    }//流程按钮提交

    function ${nameGroup.getBackNodesEvent}() {
      let result;
      result = ${logicNamespace}.getBackNodes(taskId)
      if (nasl.util.HasValue(result)) {
          ${nameGroup.buttonBodyVar}.nodeId = nasl.util.ListHead(result).nodeId
      } else {
      }
      return result;
    }//获取可回退节点

    const $lifecycles = {
      onCreated: [
        function ${nameGroup.createdEvent}() {
          nasl.js.block(\`'use JSBlock' \nconst style = document.createElement('style');
// 设置 CSS 块的内容
style.innerHTML = '.__processV2_button_popup_radios{ width: 16px !important; height: 16px !important;}';
// 将 style 标签插入到 head 元素中
document.head.appendChild(style);
this.$on('hook:beforeDestroy', () => {
    document.head.removeChild(style);
});\`)
          ${nameGroup.getTaskOperationPermissionsEvent}()
        }
      ]
    }

    return ${genTemplate(nameGroup, logicNamespace)}
  }`;
}

function genTemplate(nameGroup: Record<string, string>, logicNamespace: string) {
  return `<VanLinearLayout wrap={false} mode="flex" justify="space-between" alignment="center" style="width:100%;height:auto;--custom-start: auto; padding: 2.13333vw 4.26667vw;">
    <VanLinearLayout
      _if={${nameGroup.permissionButtonListVar}.length >= 3}
      wrap={true}>
      <VanPopupCombination
        style="-height:auto;--popup-padding:0px;--popup-box-shadow:0 .53333vw 3.2vw rgba(50, 50, 51, .12);--popup-arrow-offset:27px;"
        placement="top"
        slotReference={
          <VanText text="更多" style="--custom-start: auto; font-size: 3.73333vw;"></VanText>
        }>
        <VanLinearLayout direction="horizontal" wrap={true} gap="normal" style="--van-space-base:0px;">
          <VanForComponents colnum={1} dataSource={${nameGroup.permissionButtonListVar}}
            slotItem={
              (current) => <VanRow gutter="0" vusionDisabledCopy={true} vusionDisabledAddslot={true} vusionDisabledCut={true}>
                <VanCol span={24} vusionDisabledCopy={true} vusionDisabledCut={true}>
                  <VanLinearLayout
                    style="--van-space-base:0px;--custom-start: auto; box-sizing: border-box;
height: 11.73333vw;"
                    _if={current.index >= 2}
                    direction="horizontal"
                    wrap={true}
                    mode="flex"
                    justify="center"
                    alignment="center"
                    gap="normal"
                    onClick={
                      function click(){
                        ${nameGroup.openButtonModalEvent}(current.index)
                      }
                    }
                  >
                    <VanText text={current.item.displayText} style="--custom-start: auto; font-size: 3.73333vw;"></VanText>
                  </VanLinearLayout>
                </VanCol>
              </VanRow>
            }>
            <VanRow gutter="0" vusionDisabledCopy={true} vusionDisabledAddslot={true} vusionDisabledCut={true}>
              <VanCol span={24} vusionDisabledCopy={true} vusionDisabledCut={true}></VanCol>
            </VanRow>
          </VanForComponents>

        </VanLinearLayout>
      </VanPopupCombination>
    </VanLinearLayout>
    <VanLinearLayout wrap={false} gap="normal" mode="flex" justify="end" alignment="center" widthStretch="true" style="--van-space-base:0px;--custom-start: auto; gap: 3.2vw;">
      <VanButton
        _if={${nameGroup.permissionButtonListVar}.length >= 2}
        type="default" size="middle" squareroud="round" widthStretch="false"
        text={nasl.util.Get(${nameGroup.permissionButtonListVar}, 1).displayText}
        style="width:100%; --custom-start: auto; height: 9.6vw;
padding: 0 13.06667vw;
font-size: 3.73333vw;
white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;
max-width: calc(calc(80vw - 20px) / 2);"
        onClick={
          function click(){
            ${nameGroup.openButtonModalEvent}(1)
          }
        }>
      </VanButton>
      <VanButton
        _if={${nameGroup.permissionButtonListVar}.length >= 1}
        type="info" size="middle" squareroud="round" widthStretch="false"
        text={nasl.util.Get(${nameGroup.permissionButtonListVar}, 0).displayText}
        style="width:100%;text-align:center; --custom-start: auto; height: 9.6vw;
padding: 0 13.06667vw;
font-size: 3.73333vw;
white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;
max-width: calc(calc(80vw - 20px) / 2);"
        onClick={
          function click(){
            ${nameGroup.openButtonModalEvent}(0)
          }
        }>
      </VanButton>
    </VanLinearLayout>
    <VanDialog
      ref="${nameGroup.buttonDialogRef}"
      safeAreaInsetBottom={true}
      closeOnClickOverlay={true}
      slotFooter={
        <VanLinearLayout type="flex" vusionDisabledCut={true} style="width:100%;">
          <VanButton
            size="large" nativeType="button"
            style="-webkit-box-flex: 1;flex: 1;margin: 0;border:0;--custom-start: auto; font-size: 4.26667vw;"
            text="取消" onClick={
            function click(){
              $refs.${nameGroup.buttonDialogRef}.closeModal()
            }
          }></VanButton>
          <VanButton
            size="large" nativeType="button"
            style="-webkit-box-flex: 1;flex: 1;margin: 0;border:0;
            color: var(--van-dialog-confirm-button-text-color);border-left: 1px solid var(--van-border-color);border-top-left-radius: 0;border-bottom-left-radius:0;--custom-start: auto; font-size: 4.26667vw;"
            text="确认" onClick={
            function click(){
              if ($refs.${nameGroup.formButtonDialogRef}.validate(undefined).valid) {
                ${nameGroup.submitButtonEvent}(${nameGroup.buttonItemVar}.name)
              } else {
              }
            }
          }></VanButton>
        </VanLinearLayout>
      }>
      <Div vusionSlotName="default" vusionDisabledCopy={true} vusionDisabledCut={true} env="alone" style="min-height:100px;padding: 24px;text-align:center;">
        <VanLinearLayout direction="vertical" gap="none">
          <VanLinearLayout wrap={true} style="--custom-start: auto; padding-top: 3.4666vw;">
            <VanText
              style="--custom-start: auto; font-size: 3.2vw;
font-weight: 500;
line-height: 6.4vw;
"
              text={${nameGroup.buttonItemVar}.displayText}></VanText>
          </VanLinearLayout>
          <VanLinearLayout wrap={true}>
            <VanForm ref="${nameGroup.formButtonDialogRef}">
              <VanField
                _if={${nameGroup.buttonItemVar}.name != 'reassign' && ${nameGroup.buttonItemVar}.name != 'addSign' && ${nameGroup.buttonItemVar}.commentRequired}
                style="padding-top:0px;padding-bottom:0px;padding-left:0px;"
                required={false}
                drole="other"
                labelLayout="block"
                rules={[nasl.validation.filled()]}
                slotInput={
                  <VanLinearLayout direction="horizontal" wrap={true} style="width:100%;--custom-start: auto; box-sizing: border-box;
padding: 0 2.13333vw;
border-radius: 1.06667vw;
border: 1px solid #DADEE8;
text-align: left;">
                    <VanFieldtextarea
                      style="text-align:left;"
                      placeholder="请输入审批意见" value={$sync(${nameGroup.buttonBodyVar}.comment)}>
                    </VanFieldtextarea>
                  </VanLinearLayout>
                }
                slotTitle={
                  <>
                    <VanText text="审批意见"></VanText>
                    <VanText text="*" style="color:red;"></VanText>
                  </>
                }>
              </VanField>
              <VanField
                _if={${nameGroup.buttonItemVar}.name != 'reassign' && ${nameGroup.buttonItemVar}.name != 'addSign' && !(${nameGroup.buttonItemVar}.commentRequired)}
                style="padding-top:0px;padding-bottom:0px;padding-left:0px;"
                required={false}
                drole="other"
                labelLayout="block"
                slotInput={
                  <VanLinearLayout direction="horizontal" wrap={true} style="width:100%;--custom-start: auto; box-sizing: border-box;
padding: 0 2.13333vw;
border-radius: 1.06667vw;
border: 1px solid #DADEE8;
text-align: left;">
                    <VanFieldtextarea
                      style="text-align:left;"
                      placeholder="请输入审批意见" value={$sync(${nameGroup.buttonBodyVar}.comment)}></VanFieldtextarea>
                  </VanLinearLayout>
                }
                slotTitle={
                  <VanText text="审批意见"></VanText>
                }>
              </VanField>

              <VanField
                _if={${nameGroup.buttonItemVar}.name == 'reassign'}
                style="padding-top:0px;padding-bottom:0px;padding-left:0px;"
                required={false}
                drole="other"
                labelLayout="block"
                rules={[nasl.validation.filled()]}
                slotInput={
                  <VanPickerson
                    style="border-color:#DADEE8;borderTopColor:#DADEE8;borderBottomColor:#DADEE8;borderLeftColor:#DADEE8;borderRightColor:#DADEE8;border-top-width:1px;border-left-width:1px;border-right-width:1px;border-bottom-width:1px;border-style:solid;--custom-start: auto; box-sizing: border-box;
padding: 0 2.13333vw;
margin: 2.66667vw 0;
border-radius: 1.06667vw;"
                    title="转交人"
                    showToolbar={true}
                    optionIsSlot={true}
                    pageable={true}
                    pageSize={20}
                    value={$sync(${nameGroup.buttonBodyVar}.userForOperate)}
                    closeOnClickOverlay={true}
                    inputAlign="left"
                    placeholder="请选择转交人"
                    dataSource={${nameGroup.getUserEvent}(${nameGroup.buttonItemVar}.name, elements.$ce.page, elements.$ce.size, elements.$ce.filterText)}
                    valueField="userName"
                    filterable={true}
                    slot-picker-bottom={
                      <>
                        <VanPickerActionSlot targetMethod="cancel">
                          <VanButton
                            type="info_secondary"
                            size="normal"
                            text="取消"
                            squareroud="round"
                          ></VanButton>
                        </VanPickerActionSlot>
                        <VanPickerActionSlot targetMethod="confirm">
                          <VanButton
                            type="info"
                            size="normal"
                            text="确认"
                            squareroud="round"
                          ></VanButton>
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
                    slotOption={
                      (current) => <VanText
                      overflow="ellipsis"
                      text={(function match(_value) {
                        if (_value === true) {
                          return current.item.displayName + '（' + current.item.userName + '）'
                        } else if (_value === false) {
                          return current.item.userName
                        } else {
                        }
                      })(nasl.util.HasValue(current.item.displayName))}
                      style="font-size:16px;"></VanText>
                    }>
                  </VanPickerson>
                }></VanField>
            </VanForm>
          </VanLinearLayout>
        </VanLinearLayout>
      </Div>
    </VanDialog>
    <VanDialog
      ref="${nameGroup.buttonBackDialogRef}"
      safeAreaInsetBottom={true}
      closeOnClickOverlay={true}
      slotFooter={
        <VanLinearLayout type="flex" vusionDisabledCut={true} style="width:100%;">
          <VanButton
            size="large" nativeType="button"
            style="-webkit-box-flex: 1;flex: 1;margin: 0;border:0;--custom-start: auto; font-size: 4.26667vw;"
            text="取消" onClick={
            function click(){
              $refs.${nameGroup.buttonBackDialogRef}.closeModal()
            }
          }></VanButton>
          <VanButton
            size="large" nativeType="button"
            style="-webkit-box-flex: 1;flex: 1;margin: 0;border:0;
            color: var(--van-dialog-confirm-button-text-color);border-left: 1px solid var(--van-border-color);border-top-left-radius: 0;border-bottom-left-radius:0;--custom-start: auto; font-size: 4.26667vw;"
            text="确认" onClick={
            function click(){
              ${nameGroup.submitButtonEvent}(${nameGroup.buttonItemVar}.name)
            }
          }></VanButton>
        </VanLinearLayout>
      }>
      <Div vusionSlotName="default" vusionDisabledCopy={true} vusionDisabledCut={true} env="alone" style="min-height:100px;padding: 24px;">
        <VanLinearLayout direction="vertical" gap="none">
          <VanLinearLayout wrap={true}>
            <VanText
              style="--custom-start: auto; font-size: 3.2vw;
font-weight: 500;
line-height: 6.4vw;
"
              text={${nameGroup.buttonItemVar}.displayText}></VanText>
          </VanLinearLayout>
          <VanLinearLayout wrap={true} gap="normal" mode="flex" justify="center" alignment="start" style="--van-space-base:0px;--custom-start: auto; padding-top: 3.46666vw;">
            <VanText text="请确认是否" style="--custom-start: auto; font-size: 3.73333vw;"></VanText>
            <VanText text={${nameGroup.buttonItemVar}.displayText} style="--custom-start: auto; font-size: 3.73333vw;"></VanText>
            <VanText text="流程？" style="--custom-start: auto; font-size: 3.73333vw;"></VanText>
          </VanLinearLayout>
        </VanLinearLayout>
      </Div>
    </VanDialog>
    <VanPopup
      ref="${nameGroup.buttonPopupRef}"
      style="--custom-start: auto; border-radius: 4.26667vw 4.26667vw 0 0;"
      position="bottom"
      safeAreaInsetBottom={true}
      evn="picker"
      closeOnClickOverlay={true}
      onOpen={
        function open(){
          nasl.js.block(\`'use JSBlock' \n
//延迟100ms加载
setTimeout(() => {
  const addClassToElements = (ref) => {
    const element = this.$refs[ref]?.$el;
    if (element) {
      const elements = element.querySelectorAll('[class^="van-iconv"]');
      elements.forEach(el => {
        el.classList.add('__processV2_button_popup_radios');
      });
    }
  };
  addClassToElements('${nameGroup.addSignRadioRef}');
  addClassToElements('${nameGroup.revertFlowRadioRef}');
  addClassToElements('${nameGroup.revertReSubmitRadioRef}');
}, 100);\`)
        }
      }>
      <Div vusionSlotName="default" vusionDisabledCut={true} style="min-width:200px;min-height:200px;width:100%;height:100%;">
        <VanLinearLayout direction="vertical" gap="none">
          <VanLinearLayout wrap={true} gap="normal" mode="flex" justify="space-between" alignment="center" style="border-color:#d9d9d9;borderTopColor:#d9d9d9;borderBottomColor:#d9d9d9;borderLeftColor:#d9d9d9;borderRightColor:#d9d9d9;border-top-width:0px;border-left-width:0px;border-right-width:0px;border-bottom-width:1px;border-style:solid;--custom-start: auto; font-size: 4.26667vw;
font-weight: 500;
padding: 3.2vw 4.26667vw;">
            <VanText text={${nameGroup.buttonItemVar}.displayText} style="--custom-start: auto; font-size: 100%;"></VanText>
            <VanIconv
              style="color:#CCCCCC;--custom-start: auto; font-size: 4.26667vw;
width: 1em;
height: 1em;
vertical-align: -.15em;
fill: currentColor;
line-height:1em"
              name="close" icotype="only" onClick={
              function click(){
                $refs.${nameGroup.buttonPopupRef}.closeModal()
              }
            }>
              <VanText text="图标"></VanText>
            </VanIconv>
          </VanLinearLayout>
          <VanLinearLayout wrap={true} style="overflow:auto;max-height:60vh;">
            <VanForm ref="${nameGroup.formButtonPopupRef}" style="--custom-start: auto; font-size: 4.26667vw;
padding-left: 2.26667vw;
padding-right: 1.26667vw;
margin-top: 4.46667vw;">
              <VanField
                _if={${nameGroup.buttonItemVar}.name === 'addSign'}
                style="padding-top:0px;padding-bottom:0px;padding-left:0px;--custom-start: auto; margin-bottom:4.26666vw;"
                required={false}
                drole="other"
                labelLayout="block"
                rules={[nasl.validation.filled()]}
                border={false}
                slotInput={
                  <VanRadioGroup
                  ref="${nameGroup.addSignRadioRef}"
                  style="width:100%;--custom-start: auto; margin-top: 1.66667vw;--van-radio-label-margin: 0px;"
                  direction="horizontal"
                  isNew={true}
                  icon="sure" column={1}
                  value={$sync(${nameGroup.buttonBodyVar}.policyForAddSign)}
                  slotItem={
                    (current) => <VanRadio vusionDisabledCut={true} vusionDisabledCopy={true}
                      style="background-color:#F7F8FA;border-top-left-radius:6px;border-top-right-radius:6px;border-bottom-right-radius:6px;border-bottom-left-radius:6px;width:100%;--custom-start: auto; padding: 2.1vw 4.26667vw;
flex-direction: row-reverse;
justify-content: space-between;
margin-bottom: 2.1vw;">
                    </VanRadio>
                  }>
                    <VanRadio
                      style="background-color:#F7F8FA;border-top-left-radius:6px;border-top-right-radius:6px;border-bottom-right-radius:6px;border-bottom-left-radius:6px;width:100%;--custom-start: auto; padding: 3.2vw 4.26667vw;
flex-direction: row-reverse;
justify-content: space-between;
margin-bottom: 2.1vw;"
                      icon="sure" name="CurrentNode">
                        <VanLinearLayout wrap={true} mode="flex" direction="vertical" justify="start" alignment="start" gap="normal" style="--van-space-base:0px;">
                          <VanText text="当前节点加签" style="font-weight:bold;--custom-start: auto; font-size: 3.7333vw;"></VanText>
                          <VanText text="和被加签人一起审批" style="color:#999999;--custom-start: auto; font-size: 3.7333vw;"></VanText>
                        </VanLinearLayout>
                      </VanRadio>
                      <VanRadio
                        _if={${nameGroup.approvalPolicy} == 'simple'}
                        style="background-color:#F7F8FA;border-top-left-radius:6px;border-top-right-radius:6px;border-bottom-right-radius:6px;border-bottom-left-radius:6px;width:100%;--custom-start: auto; padding: 3.2vw 4.26667vw;
flex-direction: row-reverse;
justify-content: space-between;
margin-bottom: 2.1vw;"
                        icon="sure" name="PreviousNode">
                        <VanLinearLayout wrap={true} mode="flex" direction="vertical" justify="start" alignment="start" gap="normal" style="--van-space-base:0px;">
                          <VanText text="前加签" style="font-weight:bold;--custom-start: auto; font-size: 3.7333vw;"></VanText>
                          <VanText text="被加签人先处理" style="color:#999999;--custom-start: auto; font-size: 3.7333vw;"></VanText>
                        </VanLinearLayout>
                      </VanRadio>
                      <VanRadio
                        _if={${nameGroup.approvalPolicy} == 'simple'}
                        style="background-color:#F7F8FA;border-top-left-radius:6px;border-top-right-radius:6px;border-bottom-right-radius:6px;border-bottom-left-radius:6px;width:100%;--custom-start: auto; padding: 3.2vw 4.26667vw;
flex-direction: row-reverse;
justify-content: space-between;
margin-bottom: 2.1vw;"
                        icon="sure" name="NextNode">
                        <VanLinearLayout wrap={true} mode="flex" direction="vertical" justify="start" alignment="start" gap="normal" style="--van-space-base:0px;">
                          <VanText text="后加签并通过" style="font-weight:bold;--custom-start: auto; font-size: 3.7333vw;"></VanText>
                          <VanText text="被加签人后处理" style="color:#999999;--custom-start: auto; font-size: 3.7333vw;"></VanText>
                        </VanLinearLayout>
                      </VanRadio>
                  </VanRadioGroup>
                }
                slotTitle={
                    <>
                      <VanText text="加签方式" style="--custom-start: auto; font-size: 3.7333vw;"></VanText>
                      <VanText text="*" style="color:red;--custom-start: auto; font-size: 3.7333vw;"></VanText>
                    </>
                  }>
              </VanField>

              <VanField
                _if={${nameGroup.buttonItemVar}.name === 'addSign'}
                style="padding-top:0px;padding-bottom:0px;padding-left:0px;--custom-start: auto; margin-bottom:4.26666vw;"
                required={false}
                drole="other"
                labelLayout="block"
                rules={[nasl.validation.filled()]}
                slotInput={
                  <VanPickerson
                    style="border-bottom-width:1px;border-style:solid;borderBottomColor:#d9d9d9;--custom-start: auto; font-size: 3.7333vw;
padding-bottom: 2.66667vw;"
                    title="加签人员"
                    showToolbar={true}
                    optionIsSlot={true}
                    pageSize={20}
                    value={$sync(${nameGroup.buttonBodyVar}.userForOperate)}
                    dataSource={${nameGroup.getUserEvent}(${nameGroup.buttonItemVar}.name, elements.$ce.page, elements.$ce.size, elements.$ce.filterText)}
                    valueField="userName"
                    filterable={true}
                    closeOnClickOverlay={true}
                    pageable={true}
                    slot-picker-bottom={
                      <>
                        <VanPickerActionSlot targetMethod="cancel">
                          <VanButton
                            type="info_secondary"
                            size="normal"
                            text="取消"
                            squareroud="round"
                          ></VanButton>
                        </VanPickerActionSlot>
                        <VanPickerActionSlot targetMethod="confirm">
                          <VanButton
                            type="info"
                            size="normal"
                            text="确认"
                            squareroud="round"
                          ></VanButton>
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
                      <>
                        <VanText text="加签人员" style="--custom-start: auto; font-size: 3.7333vw;"></VanText>
                        <VanText text="*" style="color:red;--custom-start: auto; font-size: 3.7333vw;"></VanText>
                      </>
                    }
                    slotOption={
                      (current) => <VanText
                      overflow="ellipsis"
                      text={(function match(_value) {
                        if (_value === true) {
                          return current.item.displayName + '（' + current.item.userName + '）'
                        } else if (_value === false) {
                          return current.item.userName
                        } else {
                        }
                      })(nasl.util.HasValue(current.item.displayName))}
                      style="font-size:16px;"></VanText>
                    }>
                  </VanPickerson>
                }>
              </VanField>
              <VanField
                style="padding-top:0px;padding-bottom:0px;padding-left:0px;--custom-start: auto; margin-bottom:4.26666vw;"
                _if={${nameGroup.buttonItemVar}.name === 'revert'}
                required={false}
                drole="other"
                labelLayout="block"
                rules={[nasl.validation.filled()]}
                border={false}
                slotInput={
                  <VanLinearLayout
                    style="border-top-left-radius:6px;border-top-right-radius:6px;border-bottom-right-radius:6px;border-bottom-left-radius:6px;overflow:hidden;width:100%;--custom-start: auto; margin-top: 1.66667vw;"
                    direction="horizontal" wrap={true}>
                    <VanRadioGroup
                      ref="${nameGroup.revertFlowRadioRef}"
                      style="width:100%;font-size:14px;border-top-left-radius:6px;border-top-right-radius:6px;border-bottom-right-radius:6px;border-bottom-left-radius:6px;--custom-start: auto;
--van-radio-label-margin: 0px;"
                      direction="horizontal"
                      isNew={true} icon="sure"
                      column={1}
                      value={$sync(${nameGroup.buttonBodyVar}.nodeId)}
                      dataSource={${logicNamespace}.getBackNodes(taskId)}
                      slotItem={
                        (current) => <VanRadio
                          style="width:100%;background-color:#F7F8FA;border-top-left-radius:0px;border-top-right-radius:0px;border-bottom-right-radius:0px;border-bottom-left-radius:0px;--custom-start: auto; padding: 2.5vw 4.26667vw;
flex-direction: row-reverse;
justify-content: space-between;"
                          vusionDisabledCut={true}
                          vusionDisabledCopy={true}
                          name={current.item.nodeId}>
                          <VanText style="font-weight:bold;--custom-start: auto; font-size: 3.7333vw;" text={current.item.nodeName}></VanText>
                        </VanRadio>
                      }></VanRadioGroup>
                  </VanLinearLayout>
                }
                slotTitle={
                  <>
                    <VanText style="--custom-start: auto; font-size: 3.7333vw;" text="流转到"></VanText>
                    <VanText text="*" style="color:red;--custom-start: auto; font-size: 3.7333vw;"></VanText>
                  </>
                }>
              </VanField>
              <VanField
                style="padding-top:0px;padding-bottom:0px;padding-left:0px;--custom-start: auto; margin-bottom:4.26666vw;"
                _if={${nameGroup.buttonItemVar}.afterComplete === 'runtimeSpecify'}
                required={false}
                drole="other"
                labelLayout="block"
                rules={[nasl.validation.filled()]}
                border={false}
                slotInput={
                  <VanLinearLayout
                    style="border-top-left-radius:6px;border-top-right-radius:6px;border-bottom-right-radius:6px;border-bottom-left-radius:6px;overflow:hidden;width:100%;--custom-start: auto; margin-top: 1.66667vw;"
                    direction="horizontal" wrap={true}>
                    <VanRadioGroup
                      ref="${nameGroup.revertReSubmitRadioRef}"
                      style="width:100%;font-size:14px;border-top-left-radius:6px;border-top-right-radius:6px;border-bottom-right-radius:6px;border-bottom-left-radius:6px;--custom-start: auto;
--van-radio-label-margin: 0px;"
                      direction="horizontal"
                      isNew={true} icon="sure"
                      column={1}
                      value={$sync(${nameGroup.buttonBodyVar}.afterComplete)}
                      >
                        <VanRadio
                          style="width:100%;background-color:#F7F8FA;border-top-left-radius:0px;border-top-right-radius:0px;border-bottom-right-radius:0px;border-bottom-left-radius:0px;--custom-start: auto; padding: 2.5vw 4.26667vw;
flex-direction: row-reverse;
justify-content: space-between;"
                          vusionDisabledCut={true}
                          vusionDisabledCopy={true}
                          name="reExecute">
                          <VanText style="font-weight:bold;--custom-start: auto; font-size: 3.7333vw;" text="按流程顺序审批"></VanText>
                        </VanRadio>
                        <VanRadio
                          style="width:100%;background-color:#F7F8FA;border-top-left-radius:0px;border-top-right-radius:0px;border-bottom-right-radius:0px;border-bottom-left-radius:0px;--custom-start: auto; padding: 2.5vw 4.26667vw;
flex-direction: row-reverse;
justify-content: space-between;"
                          vusionDisabledCut={true}
                          vusionDisabledCopy={true}
                          name="jumpToSource">
                          <VanText style="font-weight:bold;--custom-start: auto; font-size: 3.7333vw;" text="直接回到当前节点审批"></VanText>
                        </VanRadio>
                      </VanRadioGroup>
                  </VanLinearLayout>
                }
                slotTitle={
                  <>
                    <VanText style="--custom-start: auto; font-size: 3.7333vw;" text="重新提交后"></VanText>
                    <VanText text="*" style="color:red;--custom-start: auto; font-size: 3.7333vw;"></VanText>
                  </>
                }>
              </VanField>
              <VanField
                style="padding-top:0px;padding-bottom:0px;padding-left:0px;--custom-start: auto; margin-bottom:4.26666vw;"
                _if={${nameGroup.buttonItemVar}.name === 'revert' && ${nameGroup.buttonItemVar}.commentRequired}
                required={false}
                drole="other"
                labelLayout="block"
                rules={[nasl.validation.filled()]}
                border={false}
                slotInput={
                  <VanFieldtextarea
                    style="text-align:left;background-color:#F7F8FA;padding-top:8px;padding-left:8px;padding-bottom:8px;padding-right:8px;border-top-left-radius:6px;border-top-right-radius:6px;border-bottom-right-radius:6px;border-bottom-left-radius:6px;--custom-start: auto; min-height:25vw;"
                    placeholder="请输入" value={$sync(${nameGroup.buttonBodyVar}.comment)}>
                  </VanFieldtextarea>
                }
                slotTitle={
                  <>
                    <VanText style="--custom-start: auto; font-size: 3.7333vw;" text="审批意见"></VanText>
                    <VanText text="*" style="color:red;--custom-start: auto; font-size: 3.7333vw;"></VanText>
                  </>
                }>
              </VanField>
              <VanField
                style="padding-top:0px;padding-bottom:0px;padding-left:0px;--custom-start: auto; margin-bottom:4.26666vw;"
                _if={${nameGroup.buttonItemVar}.name === 'revert' && !(${nameGroup.buttonItemVar}.commentRequired)}
                required={false}
                drole="other"
                labelLayout="block"
                rules={[nasl.validation.filled()]}
                border={false}
                slotInput={
                  <VanFieldtextarea
                    style="text-align:left;background-color:#F7F8FA;padding-top:8px;padding-left:8px;padding-bottom:8px;padding-right:8px;border-top-left-radius:6px;border-top-right-radius:6px;border-bottom-right-radius:6px;border-bottom-left-radius:6px;--custom-start: auto; min-height:25vw;"
                    placeholder="请输入" value={$sync(${nameGroup.buttonBodyVar}.comment)}>
                  </VanFieldtextarea>
                }
                slotTitle={
                  <VanText style="--custom-start: auto; font-size: 3.7333vw;" text="审批意见"></VanText>
                }>
              </VanField>
            </VanForm>
          </VanLinearLayout>
          <VanLinearLayout wrap={true} style="text-align:center;padding-top:8px;padding-bottom:8px;">
            <VanButton
              style="width:auto;--custom-start: auto; height: 9.6vw;
padding: 0 13.06667vw;
font-size: 3.73333vw;"
              type="default" size="middle" text="取消" squareroud="round" onClick={
              function click(){
                $refs.${nameGroup.buttonPopupRef}.closeModal()
              }
            }></VanButton>
            <VanButton
              style="width:auto;--custom-start: auto; height: 9.6vw;
padding: 0 13.06667vw;
font-size: 3.73333vw;"
              type="info" size="middle" text="确定" squareroud="round" onClick={
              function click(){
                if ($refs.${nameGroup.formButtonPopupRef}.validate(undefined).valid) {
                  ${nameGroup.submitButtonEvent}(${nameGroup.buttonItemVar}.name)
                } else {
                  if (nasl.util.HasValue(${nameGroup.buttonBodyVar}.nodeId)) {
                  } else {
                    $refs.${nameGroup.buttonToastRef}.open();
                    nasl.js.block(\`'use JSBlock' \n
//提高弹出消息的显示层级
const elements = document.querySelectorAll('.van-toast-group');
elements.forEach(element => {
    element.style.zIndex = '9999';
});
\`);
                  }
                }
              }
            }></VanButton>
          </VanLinearLayout>
        </VanLinearLayout>
      </Div>
    </VanPopup>
    
    <VanToast
      ref="${nameGroup.buttonToastRef}"
      message="无可流转节点，请联系管理员"
      duration={2000}
      type="fail"
    ></VanToast>
  </VanLinearLayout>`;
}
