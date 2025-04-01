import * as naslTypes from '@nasl/ast-mini';
import { logicNamespace, structureNamespace } from '../../utils';

// 生成任务箱
export function genFlProcessTaskBox(node: naslTypes.ViewElement | any) {
  const view = node.likeComponent;
  // 生成唯一name
  // 加到页面上的params、variables、logics等都需要唯一name
  // 页面上有ref引用的element也需要唯一name
  const nameGroup = {
    // 局部变量
    timeIntervalVar: view.getVariableUniqueName('taskBoxInterval'), //
    configVar: view.getVariableUniqueName('taskBoxConfig'), // 任务箱配置
    // 页面逻辑
    getMyPendingTasksEvent: view.getLogicUniqueName('getMyPendingTasks'), // 查询我的待办任务
    createdEvent: view.getLogicUniqueName('created'), // 页面创建事件
    destroyedEvent: view.getLogicUniqueName('destroyed'), // 页面销毁事件

    url: view.getVariableUniqueName('url'), // 跳转页面url
  };

  return `export function view() {
    let ${nameGroup.timeIntervalVar}: Long = 30; //事件间隔(秒)
    let ${nameGroup.configVar}: { data: List<${structureNamespace}.MyPendingTask>, page: Long, size: Long, total: Long}; //任务箱配置

    function ${nameGroup.getMyPendingTasksEvent}() {
      let result;
      if (nasl.util.HasValue(${nameGroup.configVar}.page)) {
      } else {
        ${nameGroup.configVar}.page = 1
      }
      if (nasl.util.HasValue(${nameGroup.configVar}.size)) {
      } else {
        ${nameGroup.configVar}.size = 5
      }
      result = ${logicNamespace}.getMyPendingTasks(undefined, undefined, undefined, undefined, ${nameGroup.configVar}.page, ${nameGroup.configVar}.size, undefined)
      if (nasl.util.HasValue(result.list)) {
          ${nameGroup.configVar}.data = result.list
      } else {
      }
      ${nameGroup.configVar}.total = result.total
      return result
    }//查询我的待办

    const $lifecycles = {
      onCreated: [
        function ${nameGroup.createdEvent}() {
          ${nameGroup.getMyPendingTasksEvent}()
          if (${nameGroup.timeIntervalVar} < 3) {
            ${nameGroup.timeIntervalVar} = 3
          } else {
          }
          nasl.js.block(\`'use JSBlock' \n//设置定时器，定时刷新任务箱
var _this = this;
window._processV2TaskBoxInterval = setInterval(function() {
    _this.${nameGroup.getMyPendingTasksEvent}();
}, _this.${nameGroup.timeIntervalVar} *1000);\`);
        },
      ],
      onDestroyed: [
        function ${nameGroup.destroyedEvent}() {
          nasl.js.block(\`'use JSBlock' \n//清除任务箱定时器
const intervalId = window._processV2TaskBoxInterval;
if (intervalId !== null && typeof intervalId === 'number') {
    window.clearInterval(intervalId);
}\`);
        },
      ],
    }

    return ${genTemplate(nameGroup, logicNamespace)}
  }`;
}

function genTemplate(nameGroup: Record<string, string>, logicNamespace: string) {
  return `<UPopupCombination placement="bottom" onBefore-open={
    function beforeopen() {
      ${nameGroup.getMyPendingTasksEvent}()
    }
  }
  slotReference={
    <ULinearLayout direction="horizontal" wrap={true} mode="flex" justify="center" alignment="center" style="width:58px;height:58px;cursor: pointer;">
      <UBadge value={${nameGroup.configVar}.total} corner={true} style="--custom-start: auto; --badge-box-shadow: 0 0 0 0 #fff;">
        <IIco name="notice" icotype="only" style="font-size:24px;"></IIco>
      </UBadge>
    </ULinearLayout>
  }>
    <ULinearLayout direction="horizontal" mode="inline" style="padding-top:16px;padding-left:16px;padding-bottom:16px;padding-right:16px;min-width:360px;--custom-start: auto; max-width:calc(100vw - 24px);">
      <ULinearLayout direction="horizontal" wrap={true} style="width:100%;padding-bottom:16px;color:#337eff;--custom-start: auto; font-size: 1.17em; font-weight: bold;">
        <UText text="待处理任务 (" style="margin-right:0px;"></UText>
        <UText text={${nameGroup.configVar}.total} style="margin-right:0px;"></UText>
        <UText text=")"></UText>
      </ULinearLayout>
      <ULinearLayout direction="horizontal" wrap={true} gap="normal" style="--space-base:0px;">
        <UListView
        _if={${nameGroup.configVar}.total > 0}
        pageNumber={1} pageSize={20} height="auto" width="auto" dataSource={${nameGroup.configVar}.data} border={true}
        rowStyle={
          (current) => nasl.util.NewAnonymousStructure({
            backgroundColor:(function match(_value) {
              if (_value === true) {
                return '#f4f6f9'
              } else if (_value === false) {
                return ''
              } else {
              }
            })(current.index == 0 || current.index % 2 == 0),
            color:'#333333'
          })
        }
        onSelect={
          function select(){
            let ${nameGroup.url};
            ${nameGroup.url} = ${logicNamespace}.getTaskDestinationUrl(event.item.taskId, undefined);
            nasl.js.block(\`'use JSBlock' \n// 拼接全量url
${nameGroup.url} = window.location.origin + ${nameGroup.url};\`)
            nasl.ui.gotoLink(${nameGroup.url}, '_self');
          }
        }
        slotItem={
          (current) => <ULinearLayout direction="horizontal" wrap={true} mode="flex" justify="space-between" alignment="center" style="width:100%;padding-top:15px;padding-bottom:15px;padding-left:8px;padding-right:8px;border-bottom-width:1px;border-style:solid;border-left-width:0px;border-top-width:0px;border-right-width:0px;borderBottomColor:#E5E5E5;">
            <ULink text={current.item.taskTitle} hoverType="color" style="--link-color:#333333;--custom-start: auto; display: inline-block;
white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;
max-width: calc(100vw - 200px);line-height:1em;"></ULink>
            <UText text={current.item.procInstStartTime} overflow="nowrap" widthStretch="false" style="width:120px;font-size:12px;color:#ccc;line-height:1em;"></UText>
          </ULinearLayout>
        }
        style="border-style:solid;border-top-width:0px;border-left-width:0px;border-right-width:0px;border-bottom-width:0px;--custom-start: auto; --list-view-item-background-selected:#f4f6f9;
--list-view-item-color-selected:#333333;
--list-view-item-background-hover:#f4f6f9;
--list-view-item-padding: 0px;">
        </UListView>
        <UPagination total={11} simple={true}
          page={$sync(${nameGroup.configVar}.page)}
          pageSize={$sync(${nameGroup.configVar}.size)}
          totalItems={${nameGroup.configVar}.total}
          onChange={
            function change(event){
              ${nameGroup.configVar}.page = event.page
              ${nameGroup.getMyPendingTasksEvent}()
            }
          }
          style="margin-top: 16px;">
        </UPagination>
      </ULinearLayout>
    </ULinearLayout>
  </UPopupCombination>`;
}
