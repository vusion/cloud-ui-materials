import * as naslTypes from '@nasl/ast-mini';
import { logicNamespace, structureNamespace } from '../../utils';

// 生成流程信息
export function genFlProcessButton(node: naslTypes.ViewElement | any) {
  const view = node.likeComponent;
  // 生成唯一name
  // 加到页面上的params、variables、logics等都需要唯一name
  // 页面上有ref引用的element也需要唯一name
  const nameGroup = {
    // 局部变量
    permissionButtonMapVar: view.getVariableUniqueName('processButtonMap'), // 流程按钮Map
    buttonItemVar: view.getVariableUniqueName('processButtonItem'), // 选中的流程按钮
    approvalPolicy: view.getVariableUniqueName('processButtonApprovalPolicy'), // 流程按钮加签方式
    buttonBody: view.getVariableUniqueName('processButtonBody'), // 流程按钮弹窗body，名称勿改！！！
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
    buttonModalRef: view.getViewElementUniqueName('button_modal'), // 流程按钮触发弹窗
    buttonBackModalRef: view.getViewElementUniqueName('button_backModal'), // 流程按钮触发弹窗_撤回
    radiosAddSignRef: view.getViewElementUniqueName('radios_addSign'), // 加签单选组
    formButtonModalRef: view.getViewElementUniqueName('form_buttonModal'), // 弹窗中的表单
    revertFlowRadioRef: view.getViewElementUniqueName('radios_revert_flow'), // 撤回流转到单选组
    revertReSubmitRadioRef: view.getViewElementUniqueName('radios_revert_resubmit'), // 撤回重新提交到单选组
    revertFormRef: view.getViewElementUniqueName('form_revert'), // 撤回表单
    buttonToastRef: view.getViewElementUniqueName('button_toast'), // 回退提示
  };

  // 流程需要使用页面输入参数‘taskId’，且不带数字后缀，这里不做唯一性命名
  const hasTaskIdParam = view.params.some((param: any) => param.name === 'taskId');

  return `export function view(${hasTaskIdParam ? '' : `taskId: string`}) {
    let ${nameGroup.permissionButtonMapVar}: Map<string, ${structureNamespace}.TaskOperationPermission>; //流程按钮Map
    let ${nameGroup.buttonItemVar}: ${structureNamespace}.TaskOperationPermission; //选中的流程按钮
    let ${nameGroup.approvalPolicy}: string; //流程按钮加签方式
    let ${
      nameGroup.buttonBody
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
            ${nameGroup.permissionButtonMapVar} = nasl.util.ListToMap(${
    nameGroup.permissionDetailsVar
  }, (item: ${structureNamespace}.TaskOperationPermission) => item.name, (item: ${structureNamespace}.TaskOperationPermission) => item)
            if (nasl.util.HasValue(nasl.util.MapGet(${nameGroup.permissionButtonMapVar}, 'addSign'))) {
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

    function ${nameGroup.openButtonModalEvent}(name: string) {
      let ${nameGroup.hasFormVar}: Boolean; //流程表单是否存在
      let ${nameGroup.validVar}: Boolean; //表单校验是否通过

      nasl.util.Clear(${nameGroup.buttonBody}, 'deep');
      ${nameGroup.buttonItemVar} = nasl.util.MapGet(${nameGroup.permissionButtonMapVar}, name);

      (function match(_value) {
        if (name === 'withdraw' || name === 'revert') {
          if (name == 'revert' && ${nameGroup.buttonItemVar}.afterComplete == 'runtimeSpecify') {
            ${nameGroup.buttonBody}.afterComplete = 'reExecute'
          } else {
          }
          $refs.${nameGroup.buttonBackModalRef}.open();
          return;
        } else {
          nasl.js.block(\`'use JSBlock' \n // 流程表单验证，通过脚本获取流程表单校验结果
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
              if (name == 'submit') {
                ${nameGroup.submitButtonEvent}(name)
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
          if (${nameGroup.buttonItemVar}.name == 'addSign') {
            ${nameGroup.buttonBody}.policyForAddSign = 'CurrentNode'
          } else {
          }
          $refs.${nameGroup.buttonModalRef}.open()
        }
      })(name)
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
    }//获取转派或加签人员

    function ${nameGroup.submitButtonEvent}(name: string) {
      (function match(_value) {
        if (name === 'revert') {
          ${logicNamespace}.revertTask(taskId, ${nameGroup.buttonBody}.nodeId, ${nameGroup.buttonBody}.afterComplete, ${nameGroup.buttonBody}.comment)
        } else if (name === 'withdraw') {
          ${logicNamespace}.withdrawTask(taskId)
        } else if (name === 'addSign') {
          ${logicNamespace}.addSignTask(taskId, ${nameGroup.buttonBody}.userForOperate, ${nameGroup.buttonBody}.policyForAddSign)
        } else if (name === 'reassign') {
          ${logicNamespace}.reassignTask(taskId, ${nameGroup.buttonBody}.userForOperate)
        } else {
          nasl.js.block(\`'use JSBlock' \nconst operate = name+'Task';
const body = {
    taskId: this.taskId,
};
//审批同意、提交表单等操作时获取流程表单数据，接口调用也可使用流程逻辑
if (window.__processDetailFromMixinFormData__) {
    body.data = window.__processDetailFromMixinFormData__;
}
if(name !== 'submit') {
    body.comment = this.${nameGroup.buttonBody}.comment;
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
          ${nameGroup.buttonBody}.nodeId = nasl.util.ListHead(result).nodeId
      } else {
      }
      return result;
    }//获取可回退节点

    const $lifecycles = {
      onCreated: [
        function ${nameGroup.createdEvent}() {
          nasl.js.block(\`'use JSBlock' \nconst style = document.createElement('style');
// 设置 CSS 块的内容
style.innerHTML = '.__processV2_button_modal_radios_signOptions:has([class^=u-radios_radio_radio__][selected]){ border-color: #37f !important; }';
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
  return `<ULinearLayout 
  _if={nasl.util.HasValue(${nameGroup.permissionButtonMapVar})}
  direction="horizontal" wrap={true} mode="flex"  alignment="center" justify="center" style="padding-top:24px;padding-bottom:24px;">
    <ULinearLayout direction="horizontal" wrap={true} mode="flex"  alignment="center" justify="center">
      <UButton
        _if={nasl.util.HasValue(${nameGroup.permissionButtonMapVar}, nasl.util.MapGet(${nameGroup.permissionButtonMapVar}, 'submit'))}
        color="primary"
        text={nasl.util.MapGet(${nameGroup.permissionButtonMapVar}, 'submit').displayText}
        widthStretch="false"
        onClick={
          function click() {
            ${nameGroup.openButtonModalEvent}('submit')
          }
        }>
      </UButton>

      <UButton
        _if={nasl.util.HasValue(${nameGroup.permissionButtonMapVar}, nasl.util.MapGet(${nameGroup.permissionButtonMapVar}, 'approve'))}
        color="primary"
        text={nasl.util.MapGet(${nameGroup.permissionButtonMapVar}, 'approve').displayText}
        widthStretch="false"
        onClick={
          function click() {
            ${nameGroup.openButtonModalEvent}('approve')
          }
        }>
      </UButton>

      <UButton
        _if={nasl.util.HasValue(${nameGroup.permissionButtonMapVar}, nasl.util.MapGet(${nameGroup.permissionButtonMapVar}, 'reject'))}
        text={nasl.util.MapGet(${nameGroup.permissionButtonMapVar}, 'reject').displayText}
        widthStretch="false"
        onClick={
          function click() {
            ${nameGroup.openButtonModalEvent}('reject')
          }
        }>
      </UButton>

      <UButton
        _if={nasl.util.HasValue(${nameGroup.permissionButtonMapVar}, nasl.util.MapGet(${nameGroup.permissionButtonMapVar}, 'reassign'))}
        text={nasl.util.MapGet(${nameGroup.permissionButtonMapVar}, 'reassign').displayText}
        widthStretch="false"
        onClick={
          function click() {
            ${nameGroup.openButtonModalEvent}('reassign')
          }
        }>
      </UButton>

      <UButton
        _if={nasl.util.HasValue(${nameGroup.permissionButtonMapVar}, nasl.util.MapGet(${nameGroup.permissionButtonMapVar}, 'addSign'))}
        text={nasl.util.MapGet(${nameGroup.permissionButtonMapVar}, 'addSign').displayText}
        widthStretch="false"
        onClick={
          function click() {
            ${nameGroup.openButtonModalEvent}('addSign')
          }
        }>
      </UButton>

      <UButton
        _if={nasl.util.HasValue(${nameGroup.permissionButtonMapVar}, nasl.util.MapGet(${nameGroup.permissionButtonMapVar}, 'withdraw'))}
        text={nasl.util.MapGet(${nameGroup.permissionButtonMapVar}, 'withdraw').displayText}
        widthStretch="false"
        onClick={
          function click() {
            ${nameGroup.openButtonModalEvent}('withdraw')
          }
        }>
      </UButton>

      <UButton
        _if={nasl.util.HasValue(${nameGroup.permissionButtonMapVar}, nasl.util.MapGet(${nameGroup.permissionButtonMapVar}, 'revert'))}
        text={nasl.util.MapGet(${nameGroup.permissionButtonMapVar}, 'revert').displayText}
        widthStretch="false"
        onClick={
          function click() {
            ${nameGroup.openButtonModalEvent}('revert')
          }
        }>
      </UButton>
    </ULinearLayout>

    <UModal
      ref="${nameGroup.buttonModalRef}"
      size="auto"
      onOpen={
        function open(){
          nasl.js.block(\`'use JSBlock' \n //延迟100ms加载
setTimeout(() => {
  const element = this.$refs['${nameGroup.radiosAddSignRef}']?.$el;
  if (element) {
    const elements = element.querySelectorAll('[class^="u-radios_radio___"]');
    elements.forEach(el => {
      el.classList.add('__processV2_button_modal_radios_signOptions');
    });
  }
}, 100);\`)
        }
      }
      slotFoot={
        <ULinearLayout direction="horizontal" wrap={true} gap="normal" justify="space-between">
          <ULinearLayout justify="center">
            <UButton text="取 消" onClick={
              function click(){
                $refs.${nameGroup.buttonModalRef}.close()
              }
            }></UButton>
            <UButton color="primary" text="提 交" onClick={
              function click(){
                if ($refs.${nameGroup.formButtonModalRef}.validate(undefined, undefined).valid) {
                  ${nameGroup.submitButtonEvent}(${nameGroup.buttonItemVar}.name)
                } else {
                }
              }
            }></UButton>
          </ULinearLayout>
        </ULinearLayout>
      }
      slotBody={
        <UForm ref="${nameGroup.formButtonModalRef}" labelLayout="block" gapHeight="none" style="--custom-start: auto; min-width:350px;">
          <UFormItem
            _if={${nameGroup.buttonItemVar}.name != 'reassign' && ${nameGroup.buttonItemVar}.name != 'addSign'}
            required={${nameGroup.buttonItemVar}.commentRequired}
            layout="center"
            rules={[nasl.validation.filled()]}
            ignoreValidation={!(${nameGroup.buttonItemVar}.commentRequired)}
            labelEllipsis={true}
            slotLabel={
              <UText text="审批意见"></UText>
            }>
            <UTextarea
              placeholder="请输入"
              limitPosition="outside"
              emptyValueIsNull={true}
              value={$sync(${nameGroup.buttonBody}.comment)}
              style="width:100%;">
            </UTextarea>
          </UFormItem>
          <UFormItem
            _if={${nameGroup.buttonItemVar}.name == 'addSign'}
            style="padding-bottom:20px;"
            required={true}
            rules={[nasl.validation.filled()]}
            ignoreValidation={false}
            labelEllipsis={true}
            slotLabel={
              <UText text="加签方式"></UText>
            }>
              <URadios
                ref="${nameGroup.radiosAddSignRef}"
                value={$sync(${nameGroup.buttonBody}.policyForAddSign)}
                style="padding-top:0px;padding-bottom:0px;padding-left:0px;padding-right:0px;--radio-space-x:6px;width:580px;"
                column={(function match(_value) {
                  if (_value === true) {
                    return 3
                  } else if (_value === false) {
                    return 1
                  } else {
                  }
                })(${nameGroup.approvalPolicy} == 'simple')}>
                <URadio label="CurrentNode"
                  style="padding-top:8px;padding-left:16px;padding-right:16px;padding-bottom:8px;border-top-left-radius:4px;border-top-right-radius:4px;border-bottom-right-radius:4px;border-bottom-left-radius:4px;border-top-width:2px;border-left-width:2px;border-right-width:2px;border-bottom-width:2px;border-style:solid;border-color:#DADEE8;borderTopColor:#DADEE8;borderBottomColor:#DADEE8;borderLeftColor:#DADEE8;borderRightColor:#DADEE8;"
                  slotItem={
                    <ULinearLayout mode="flex" direction="vertical" justify="start" alignment="start" gap="normal" style="--space-base:0px;--custom-start: auto; display: inline-flex;">
                      <UText text="当前节点加签" style="--custom-start: auto; font-weight: 500"></UText>
                      <UText text="和被加签人一起审批"></UText>
                    </ULinearLayout>
                  }>
                </URadio>
                <URadio label="PreviousNode"
                  _if={${nameGroup.approvalPolicy} == 'simple'}
                  style="padding-top:8px;padding-left:16px;padding-right:16px;padding-bottom:8px;border-top-left-radius:4px;border-top-right-radius:4px;border-bottom-right-radius:4px;border-bottom-left-radius:4px;border-top-width:2px;border-left-width:2px;border-right-width:2px;border-bottom-width:2px;border-style:solid;border-color:#DADEE8;borderTopColor:#DADEE8;borderBottomColor:#DADEE8;borderLeftColor:#DADEE8;borderRightColor:#DADEE8;"
                  slotItem={
                    <ULinearLayout mode="flex" direction="vertical" justify="start" alignment="start" gap="normal" style="--space-base:0px;--custom-start: auto; display: inline-flex;">
                      <UText text="前加签" style="--custom-start: auto; font-weight: 500"></UText>
                      <UText text="被加签人先处理"></UText>
                    </ULinearLayout>
                  }>
                </URadio>
                <URadio label="NextNode"
                  _if={${nameGroup.approvalPolicy} == 'simple'}
                  style="padding-top:8px;padding-left:16px;padding-right:16px;padding-bottom:8px;border-top-left-radius:4px;border-top-right-radius:4px;border-bottom-right-radius:4px;border-bottom-left-radius:4px;border-top-width:2px;border-left-width:2px;border-right-width:2px;border-bottom-width:2px;border-style:solid;border-color:#DADEE8;borderTopColor:#DADEE8;borderBottomColor:#DADEE8;borderLeftColor:#DADEE8;borderRightColor:#DADEE8;"
                  slotItem={
                    <ULinearLayout mode="flex" direction="vertical" justify="start" alignment="start" gap="normal" style="--space-base:0px;--custom-start: auto; display: inline-flex;">
                      <UText text="后加签并通过" style="--custom-start: auto; font-weight: 500"></UText>
                      <UText text="被加签人后处理"></UText>
                    </ULinearLayout>
                  }>
                </URadio>
              </URadios>
            </UFormItem>
            <UFormItem
              _if={${nameGroup.buttonItemVar}.name == 'reassign' || ${nameGroup.buttonItemVar}.name == 'addSign'}
              required={true}
              rules={[nasl.validation.filled()]}
              ignoreValidation={false}
              labelEllipsis={true}
              slotLabel={
                <>
                  <UText _if={${nameGroup.buttonItemVar}.name == 'reassign'} text="请选择人员"></UText>
                  <UText _if={${nameGroup.buttonItemVar}.name == 'addSign'} text="加签人员"></UText>
                </>
              }>
                <USelect
                  style="width:100%;"
                  placeholder="请选择"
                  pagination={true}
                  pageSize={20}
                  emptyValueIsNull={true}
                  optionIsSlot={true}
                  value={$sync(${nameGroup.buttonBody}.userForOperate)}
                  dataSource={${nameGroup.getUserEvent}(${nameGroup.buttonItemVar}.name, elements.$ce.page, elements.$ce.size, elements.$ce.filterText)}
                  valueField="userName"
                  initialLoad={true}
                  filterable={true}
                  slotOption={
                    (current) => <UText text={(function match(_value) {
                      if (_value === true) {
                        return current.item.displayName + '（' + current.item.userName + '）'
                      } else if (_value === false) {
                        return current.item.userName
                      } else {
                      }
                    })(nasl.util.HasValue(current.item.displayName))} overflow="ellipsis"></UText>
                  }>
                </USelect>
              </UFormItem>
        </UForm>
      }
      slotTitle={
        <UText text={${nameGroup.buttonItemVar}.displayText}></UText>
      }>
    </UModal>
    <UModal
      ref="${nameGroup.buttonBackModalRef}"
      style="width:auto;min-width:400px;"
      size="auto"
      slotFoot={
        <ULinearLayout direction="horizontal" wrap={true} gap="normal" justify="space-between" style="text-align:right;">
          <ULinearLayout justify="center">
            <UButton text="取 消" onClick={
              function click(){
                $refs.${nameGroup.buttonBackModalRef}.close()
              }
            }></UButton>
            <UButton color="primary" text="确 定" onClick={
              function click(){
                if (${nameGroup.buttonItemVar}.name == 'revert') {
                  if ($refs.${nameGroup.revertFormRef}.validate(undefined, undefined).valid) {
                  } else {
                    if (nasl.util.HasValue(${nameGroup.buttonBody}.nodeId)) {
                    } else {
                      $refs.${nameGroup.buttonToastRef}.open();
                    }
                    return;
                  }
                }
                ${nameGroup.submitButtonEvent}(${nameGroup.buttonItemVar}.name)
              }
            }></UButton>
          </ULinearLayout>
        </ULinearLayout>
      }
      slotBody={
        <>
          <ULinearLayout
            style="--space-base:0px;width:350px;"
            _if={${nameGroup.buttonItemVar}.name == 'withdraw'}
            direction="horizontal" wrap={true} gap="normal" mode="flex" justify="start" alignment="center">
            <UText text="请确认是否"></UText>
            <UText text={${nameGroup.buttonItemVar}.displayText}></UText>
            <UText text="流程？"></UText>
          </ULinearLayout>
          <ULinearLayout
            _if={${nameGroup.buttonItemVar}.name == 'revert'}
            direction="horizontal" wrap={true}>
            <UForm
              ref="${nameGroup.revertFormRef}"
              labelLayout="block" gapHeight="none" style="--custom-start: auto; min-width:350px;">
              <UFormItem
                style="padding-bottom:24px;"
                required={true}
                rules={[nasl.validation.filled()]}
                ignoreValidation={false}
                labelEllipsis={true}
                slotLabel={
                  <UText text="流转到"></UText>
                }>
                <URadios
                  ref="${nameGroup.revertFlowRadioRef}"
                  style="width:546px;--radio-space-y:8px;--radio-space-x:40px;margin-top:4px;"
                  value={$sync(${nameGroup.buttonBody}.nodeId)}
                  dataSource={${nameGroup.getBackNodesEvent}()}
                  valueField="nodeId"
                  slotItem={
                    (current) => <UText text={current.item.nodeName}></UText>
                  }>
                </URadios>
              </UFormItem>
              <UFormItem
                style="padding-bottom:24px;"
                _if={${nameGroup.buttonItemVar}.afterComplete == 'runtimeSpecify'}
                required={true}
                rules={[nasl.validation.filled()]}
                ignoreValidation={false}
                labelEllipsis={true}
                slotLabel={
                  <UText text="重新提交后"></UText>
                }>
                <URadios
                  ref="${nameGroup.revertReSubmitRadioRef}"
                  style="-width:546px;--radio-space-x:40px;--radio-space-y:8px;margin-top:4px;"
                  value={$sync(${nameGroup.buttonBody}.afterComplete)}
                  valueField=""
                  slotItem={
                    (current) => <UText text={current.item}></UText>
                  }>
                  <URadio
                    label="reExecute"
                    slotItem={
                      <UText text="按流程顺序审批"></UText>
                    }>
                  </URadio>
                  <URadio
                    label="jumpToSource"
                    slotItem={
                      <UText text="直接回到当前节点审批"></UText>
                    }>
                  </URadio>
                </URadios>
              </UFormItem>
              <UFormItem
                style="width:100%;margin-top:4px;"
                required={${nameGroup.buttonItemVar}.commentRequired}
                layout="center"
                rules={[nasl.validation.filled()]}
                ignoreValidation={!(${nameGroup.buttonItemVar}.commentRequired)}
                labelEllipsis={true}
                slotLabel={
                  <UText text="审批意见"></UText>
                }>
                <UTextarea
                  style="width:100%;margin-top:4px;"
                  placeholder="请输入"
                  limitPosition="outside"
                  emptyValueIsNull={true}
                  value={$sync(${nameGroup.buttonBody}.comment)}>
                </UTextarea>
              </UFormItem>
            </UForm>
          </ULinearLayout>
        </>
      }
      slotTitle={
        <UText text={${nameGroup.buttonItemVar}.displayText}></UText>
      }>
    </UModal>
    
    <UToastSingle
      ref="${nameGroup.buttonToastRef}"
      text="无可流转节点，请联系管理员"
      duration={2000}
      color="error"
    ></UToastSingle>
  </ULinearLayout>`;
}
