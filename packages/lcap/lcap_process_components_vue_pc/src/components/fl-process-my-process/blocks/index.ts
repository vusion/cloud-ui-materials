import * as naslTypes from '@nasl/ast-mini';
import { logicNamespace, structureNamespace } from '../../utils';

// 生成流程信息
export function genFlProcessMyProcess(node: naslTypes.ViewElement | any) {
  const view = node.likeComponent;
  // 生成唯一name
  // 加到页面上的params、variables、logics等都需要唯一name
  // 页面上有ref引用的element也需要唯一name
  const nameGroup = {
    // 局部变量
    tabValue: view.getVariableUniqueName('myProcessTabValue'), // 我的流程tab值
    filterVar: view.getVariableUniqueName('myProcessFilter'), // 我的流程筛选项
    // 页面逻辑
    reloadFilter: view.getLogicUniqueName('reloadFilter'), // 筛选项初始化
    getMyPendingTasks: view.getLogicUniqueName('getMyPendingTasks'), // 获取我的待办数据
    getMyCompletedTasks: view.getLogicUniqueName('getMyCompletedTasks'), // 获取我的已办数据
    getMyInitiatedTasks: view.getLogicUniqueName('getMyInitiatedTasks'), // 获取我的发起数据
    getMyCCTasks: view.getLogicUniqueName('getMyCCTasks'), // 获取抄送我的数据
    getProcInstInitiators: view.getLogicUniqueName('getProcInstInitiators'), // 获取发起人
    goToPage: view.getLogicUniqueName('goToPage'), // 跳转页面
    // 页面逻辑的局部变量
    // goToPage
    url: view.getVariableUniqueName('url'), // 跳转页面url
    // ref
    tableView1: view.getViewElementUniqueName('table_view_1'), // 我的待办表格
    tableView2: view.getViewElementUniqueName('table_view_1'), // 我的已办表格
    tableView3: view.getViewElementUniqueName('table_view_1'), // 我的发起表格
    tableView4: view.getViewElementUniqueName('table_view_1'), // 抄送我的表格
  };

  return `export function view() {
    let ${nameGroup.tabValue}: string; //我的流程tab值
    let ${nameGroup.filterVar}: { procDefKey: string, procInstInitiator: string, procInstStartTimeAfter: DateTime, procInstStartTimeBefore: DateTime, viewed: Boolean }; //我的流程筛选项

    function ${nameGroup.reloadFilter}() {
      ${nameGroup.filterVar}.procDefKey = null;
      ${nameGroup.filterVar}.procInstInitiator = null;
      ${nameGroup.filterVar}.procInstStartTimeAfter = null;
      ${nameGroup.filterVar}.procInstStartTimeBefore = null;
      ${nameGroup.filterVar}.viewed = false;
    }//筛选项初始化

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

    function ${nameGroup.getProcInstInitiators}(page: Long, size: Long, filterText: string) {
      let result;
      result = ${logicNamespace}.getProcInstInitiators(page, size, filterText);
      return result;
    }//获取发起人

    function ${nameGroup.goToPage}(itemTaskId: string) {
      let ${nameGroup.url};
      ${nameGroup.url} = ${logicNamespace}.getTaskDestinationUrl(itemTaskId, undefined);
      nasl.js.block(\`'use JSBlock' \n// 拼接全量url
${nameGroup.url} = window.location.origin + ${nameGroup.url};\`);
      nasl.ui.gotoLink(${nameGroup.url}, '_self') // 这个地方的翻译没有按照nasl2ts，原始翻译是nasl.ui.gotoLink(url, undefined
    }//跳转页面

    return <UTabs
      value={$sync(${nameGroup.tabValue})}
      loadOnActive={true}
      appear="line"
      onSelect={
        function select(){
          ${nameGroup.reloadFilter}()
        }
      }>
      <UTab value="待办" slotTitle={
          <UText text="我的待办"></UText>
        }>
        <ULinearLayout direction="vertical" wrap={true}>
          <ULinearLayout wrap={true}>
            <ULinearLayout wrap={false} mode="flex" direction="horizontal" alignment="start" justify="space-between">
              <ULinearLayout gap="normal" mode="flex" justify="start" alignment="center" widthStretch="true" style="--space-base:0px;">
                <ULinearLayout direction="horizontal" wrap={true} mode="flex" alignment="center" justify="end" gap="normal" widthStretch="false" style="margin-bottom: 20px;margin-right: 16px;">
                  <UText text="流程" widthStretch="false" style="width:76px;text-align:right;padding-right:20px;"></UText>
                  <USelect
                    placeholder="请选择"
                    pagination={false}
                    pageSize={20}
                    emptyValueIsNull={true}
                    value={$sync(${nameGroup.filterVar}.procDefKey)}
                    dataSource={${logicNamespace}.getProcDefInfos(undefined)}
                    textField="procDefTitle"
                    valueField="procDefKey"
                    filterable={true}
                    clearable={true}
                    widthStretch="false"></USelect>
                </ULinearLayout>
                <ULinearLayout direction="horizontal" wrap={true} mode="flex" alignment="center" justify="end" gap="normal" widthStretch="false" style="margin-bottom: 20px;margin-right: 16px;">
                  <UText text="发起时间" widthStretch="false" style="width:76px;text-align:right;padding-right:20px;"></UText>
                  <UDatePicker
                    clearable={true}
                    emptyValueIsNull={true}
                    startDate={$sync(${nameGroup.filterVar}.procInstStartTimeAfter)}
                    endDate={$sync(${nameGroup.filterVar}.procInstStartTimeBefore)}
                    range={true}
                    placeholder="开始日期"
                    placeholderRight="结束日期"
                    converter="date"></UDatePicker>
                </ULinearLayout>
                <ULinearLayout direction="horizontal" wrap={true} mode="flex" alignment="center" justify="end" gap="normal" widthStretch="false" style="margin-bottom: 20px;margin-right: 16px;">
                  <UText text="发起人" widthStretch="false" style="width:76px;text-align:right;padding-right:20px;"></UText>
                  <USelect
                    placeholder="请选择"
                    pagination={true}
                    pageSize={20}
                    emptyValueIsNull={true}
                    value={$sync(${nameGroup.filterVar}.procInstInitiator)}
                    dataSource={${nameGroup.getProcInstInitiators}(elements.$ce.page, elements.$ce.size, elements.$ce.filterText)}
                    valueField="userName"
                    optionIsSlot={true}
                    clearable={true}
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
                    }></USelect>
                </ULinearLayout>
              </ULinearLayout>
              <ULinearLayout wrap={true}>
                <UButton color="primary" text="查 询" onClick={
                  function click(){
                    $refs.${nameGroup.tableView1}.reload()
                  }
                }></UButton>
              </ULinearLayout>
            </ULinearLayout>
          </ULinearLayout>
          <ULinearLayout wrap={true}>
            <UTableView
              ref="${nameGroup.tableView1}"
              pagination={true}
              pageSize={20}
              pageNumber={1}
              dataSource={${nameGroup.getMyPendingTasks}(elements.$ce.page, elements.$ce.size)}>
              <UTableViewColumn
                slotTitle={
                  <UText text="流程标题"></UText>
                }
                slotCell={
                  (current) => <UText
                    text={(function match(_value) {
                      if (_value === true) {
                        return current.item.procInstTitle
                      } else if (_value === false) {
                        return '-'
                      } else {
                    }
                  })(nasl.util.HasValue(current.item.procInstTitle))}
                  ></UText>
                }
                slotExpander={
                  (current) => <UTableViewExpander
                      item={current.item}>
                  </UTableViewExpander>
                }>
              </UTableViewColumn>
              <UTableViewColumn
                slotTitle={
                  <UText text="流程类型"></UText>
                }
                slotCell={
                  (current) => <UText
                    text={(function match(_value) {
                      if (_value === true) {
                        return current.item.procDefTitle
                      } else if (_value === false) {
                        return '-'
                      } else {
                    }
                  })(nasl.util.HasValue(current.item.procDefTitle))}
                  ></UText>
                }
                slotExpander={
                  (current) => <UTableViewExpander
                      item={current.item}>
                  </UTableViewExpander>
                }>
              </UTableViewColumn>
              <UTableViewColumn
                slotTitle={
                  <UText text="当前节点"></UText>
                }
                slotCell={
                  (current) => <UText
                    text={(function match(_value) {
                      if (_value === true) {
                        return nasl.util.Join(nasl.util.ListTransform(current.item.procInstCurrNodes, (item) => item.currNodeTitle), '，')
                      } else if (_value === false) {
                        return '-'
                      } else {
                      }
                    })(nasl.util.HasValue(current.item.procInstCurrNodes))}
                  ></UText>
                }
                slotExpander={
                  (current) => <UTableViewExpander
                      item={current.item}>
                  </UTableViewExpander>
                }>
              </UTableViewColumn>
              <UTableViewColumn
                slotTitle={
                  <UText text="发起人"></UText>
                }
                slotCell={
                  (current) => <UText
                    text={(function match(_value) {
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
                  })(nasl.util.HasValue(current.item.procInstInitiator.displayName))}
                  ></UText>
                }
                slotExpander={
                  (current) => <UTableViewExpander
                      item={current.item}>
                  </UTableViewExpander>
                }>
              </UTableViewColumn>
              <UTableViewColumn
                slotTitle={
                  <UText text="发起时间"></UText>
                }
                slotCell={
                  (current) => <UText
                    text={(function match(_value) {
                      if (_value === true) {
                        return nasl.util.FormatDateTime(current.item.procInstStartTime, 'yyyy-MM-dd HH:mm:ss', 'global')
                      } else if (_value === false) {
                        return '-'
                      } else {
                    }
                  })(nasl.util.HasValue(current.item.procInstStartTime))}
                  ></UText>
                }
                slotExpander={
                  (current) => <UTableViewExpander
                      item={current.item}>
                  </UTableViewExpander>
                }>
              </UTableViewColumn>
              <UTableViewColumn
                slotTitle={
                  <UText text="操作"></UText>
                }
                slotCell={
                  (current) => <ULink
                    text="审批"
                    onClick={
                      function click(){
                        ${nameGroup.goToPage}(current.item.taskId)
                      }
                    }></ULink>
                }
                slotExpander={
                  (current) => <UTableViewExpander
                      item={current.item}>
                  </UTableViewExpander>
                }>
              </UTableViewColumn>
            </UTableView>
          </ULinearLayout>
        </ULinearLayout>
      </UTab>
      <UTab value="已办" slotTitle={
        <UText text="我的已办"></UText>
      }>
      <ULinearLayout direction="vertical" wrap={true}>
        <ULinearLayout wrap={true}>
          <ULinearLayout wrap={false} mode="flex" direction="horizontal" alignment="start" justify="space-between">
            <ULinearLayout gap="normal" mode="flex" justify="start" alignment="center" widthStretch="true" style="--space-base:0px;">
              <ULinearLayout direction="horizontal" wrap={true} mode="flex" alignment="center" justify="end" gap="normal" widthStretch="false" style="margin-bottom: 20px;margin-right: 16px;">
                <UText text="流程" widthStretch="false" style="width:76px;text-align:right;padding-right:20px;"></UText>
                <USelect
                  placeholder="请选择"
                  pagination={false}
                  pageSize={20}
                  emptyValueIsNull={true}
                  value={$sync(${nameGroup.filterVar}.procDefKey)}
                  dataSource={${logicNamespace}.getProcDefInfos(undefined)}
                  textField="procDefTitle"
                  valueField="procDefKey"
                  filterable={true}
                  clearable={true}
                  widthStretch="false"></USelect>
              </ULinearLayout>
              <ULinearLayout direction="horizontal" wrap={true} mode="flex" alignment="center" justify="end" gap="normal" widthStretch="false" style="margin-bottom: 20px;margin-right: 16px;">
                <UText text="发起时间" widthStretch="false" style="width:76px;text-align:right;padding-right:20px;"></UText>
                <UDatePicker
                  clearable={true}
                  emptyValueIsNull={true}
                  startDate={$sync(${nameGroup.filterVar}.procInstStartTimeAfter)}
                  endDate={$sync(${nameGroup.filterVar}.procInstStartTimeBefore)}
                  range={true}
                  placeholder="开始日期"
                  placeholderRight="结束日期"
                  converter="date"></UDatePicker>
              </ULinearLayout>
              <ULinearLayout direction="horizontal" wrap={true} mode="flex" alignment="center" justify="end" gap="normal" widthStretch="false" style="margin-bottom: 20px;margin-right: 16px;">
                <UText text="发起人" widthStretch="false" style="width:76px;text-align:right;padding-right:20px;"></UText>
                <USelect
                  placeholder="请选择"
                  pagination={true}
                  pageSize={20}
                  emptyValueIsNull={true}
                  value={$sync(${nameGroup.filterVar}.procInstInitiator)}
                  dataSource={${nameGroup.getProcInstInitiators}(elements.$ce.page, elements.$ce.size, elements.$ce.filterText)}
                  valueField="userName"
                  optionIsSlot={true}
                  clearable={true}
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
                  }></USelect>
              </ULinearLayout>
            </ULinearLayout>
            <ULinearLayout wrap={true}>
              <UButton color="primary" text="查 询" onClick={
                function click(){
                  $refs.${nameGroup.tableView2}.reload()
                }
              }></UButton>
            </ULinearLayout>
          </ULinearLayout>
        </ULinearLayout>
        <ULinearLayout wrap={true}>
          <UTableView
            ref="${nameGroup.tableView2}"
            pagination={true}
            pageSize={20}
            pageNumber={1}
            dataSource={${nameGroup.getMyCompletedTasks}(elements.$ce.page, elements.$ce.size)}>
            <UTableViewColumn
              slotTitle={
                <UText text="流程标题"></UText>
              }
              slotCell={
                (current) => <UText
                  text={(function match(_value) {
                    if (_value === true) {
                      return current.item.procInstTitle
                    } else if (_value === false) {
                      return '-'
                    } else {
                  }
                })(nasl.util.HasValue(current.item.procInstTitle))}
                ></UText>
              }
              slotExpander={
                (current) => <UTableViewExpander
                    item={current.item}>
                </UTableViewExpander>
              }>
            </UTableViewColumn>
            <UTableViewColumn
              slotTitle={
                <UText text="流程类型"></UText>
              }
              slotCell={
                (current) => <UText
                  text={(function match(_value) {
                    if (_value === true) {
                      return current.item.procDefTitle
                    } else if (_value === false) {
                      return '-'
                    } else {
                  }
                })(nasl.util.HasValue(current.item.procDefTitle))}
                ></UText>
              }
              slotExpander={
                (current) => <UTableViewExpander
                    item={current.item}>
                </UTableViewExpander>
              }>
            </UTableViewColumn>
            <UTableViewColumn
              slotTitle={
                <UText text="处理节点"></UText>
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
                (current) => <UTableViewExpander
                    item={current.item}>
                </UTableViewExpander>
              }>
            </UTableViewColumn>
            <UTableViewColumn
              slotTitle={
                <UText text="发起人"></UText>
              }
              slotCell={
                (current) => <UText
                  text={(function match(_value) {
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
                  })(nasl.util.HasValue(current.item.procInstInitiator.displayName))}
                ></UText>
              }
              slotExpander={
                (current) => <UTableViewExpander
                    item={current.item}>
                </UTableViewExpander>
              }>
            </UTableViewColumn>
            <UTableViewColumn
              slotTitle={
                <UText text="发起时间"></UText>
              }
              slotCell={
                (current) => <UText
                  text={(function match(_value) {
                    if (_value === true) {
                      return nasl.util.FormatDateTime(current.item.procInstStartTime, 'yyyy-MM-dd HH:mm:ss', 'global')
                    } else if (_value === false) {
                      return '-'
                    } else {
                  }
                })(nasl.util.HasValue(current.item.procInstStartTime))}
                ></UText>
              }
              slotExpander={
                (current) => <UTableViewExpander
                    item={current.item}>
                </UTableViewExpander>
              }>
            </UTableViewColumn>
            <UTableViewColumn
              slotTitle={
                <UText text="操作"></UText>
              }
              slotCell={
                (current) => <ULink
                  text="查看"
                  onClick={
                    function click(){
                      ${nameGroup.goToPage}(current.item.taskId)
                    }
                  }></ULink>
              }
              slotExpander={
                (current) => <UTableViewExpander
                    item={current.item}>
                </UTableViewExpander>
              }>
            </UTableViewColumn>
          </UTableView>
        </ULinearLayout>
      </ULinearLayout>
    </UTab>
    <UTab value="发起" slotTitle={
      <UText text="我的发起"></UText>
    }>
    <ULinearLayout direction="vertical" wrap={true}>
      <ULinearLayout wrap={true}>
        <ULinearLayout wrap={false} mode="flex" direction="horizontal" alignment="start" justify="space-between">
          <ULinearLayout gap="normal" mode="flex" justify="start" alignment="center" widthStretch="true" style="--space-base:0px;">
            <ULinearLayout direction="horizontal" wrap={true} mode="flex" alignment="center" justify="end" gap="normal" widthStretch="false" style="margin-bottom: 20px;margin-right: 16px;">
              <UText text="流程" widthStretch="false" style="width:76px;text-align:right;padding-right:20px;"></UText>
              <USelect
                placeholder="请选择"
                pagination={false}
                pageSize={20}
                emptyValueIsNull={true}
                value={$sync(${nameGroup.filterVar}.procDefKey)}
                dataSource={${logicNamespace}.getProcDefInfos(undefined)}
                textField="procDefTitle"
                valueField="procDefKey"
                filterable={true}
                clearable={true}
                widthStretch="false"></USelect>
            </ULinearLayout>
            <ULinearLayout direction="horizontal" wrap={true} mode="flex" alignment="center" justify="end" gap="normal" widthStretch="false" style="margin-bottom: 20px;margin-right: 16px;">
              <UText text="发起时间" widthStretch="false" style="width:76px;text-align:right;padding-right:20px;"></UText>
              <UDatePicker
                clearable={true}
                emptyValueIsNull={true}
                startDate={$sync(${nameGroup.filterVar}.procInstStartTimeAfter)}
                endDate={$sync(${nameGroup.filterVar}.procInstStartTimeBefore)}
                range={true}
                placeholder="开始日期"
                placeholderRight="结束日期"
                converter="date"></UDatePicker>
            </ULinearLayout>
          </ULinearLayout>
          <ULinearLayout wrap={true}>
            <UButton color="primary" text="查 询" onClick={
              function click(){
                $refs.${nameGroup.tableView3}.reload()
              }
            }></UButton>
          </ULinearLayout>
        </ULinearLayout>
      </ULinearLayout>
      <ULinearLayout wrap={true}>
        <UTableView
          ref="${nameGroup.tableView3}"
          pagination={true}
          pageSize={20}
          pageNumber={1}
          dataSource={${nameGroup.getMyInitiatedTasks}(elements.$ce.page, elements.$ce.size)}>
          <UTableViewColumn
            slotTitle={
              <UText text="流程标题"></UText>
            }
            slotCell={
              (current) => <UText
                text={(function match(_value) {
                  if (_value === true) {
                    return current.item.procInstTitle
                  } else if (_value === false) {
                    return '-'
                  } else {
                }
              })(nasl.util.HasValue(current.item.procInstTitle))}
              ></UText>
            }
            slotExpander={
              (current) => <UTableViewExpander
                  item={current.item}>
              </UTableViewExpander>
            }>
          </UTableViewColumn>
          <UTableViewColumn
            slotTitle={
              <UText text="流程类型"></UText>
            }
            slotCell={
              (current) => <UText
                text={(function match(_value) {
                  if (_value === true) {
                    return current.item.procDefTitle
                  } else if (_value === false) {
                    return '-'
                  } else {
                }
              })(nasl.util.HasValue(current.item.procDefTitle))}
              ></UText>
            }
            slotExpander={
              (current) => <UTableViewExpander
                  item={current.item}>
              </UTableViewExpander>
            }>
          </UTableViewColumn>
          <UTableViewColumn
            slotTitle={
              <UText text="当前节点"></UText>
            }
            slotCell={
              (current) => <UText
                text={(function match(_value) {
                  if (_value === true) {
                    return nasl.util.Join(nasl.util.ListTransform(current.item.procInstCurrNodes, (item) => item.currNodeTitle), '，')
                  } else if (_value === false) {
                    return '-'
                  } else {
                  }
                })(nasl.util.HasValue(current.item.procInstCurrNodes))}
              ></UText>
            }
            slotExpander={
              (current) => <UTableViewExpander
                  item={current.item}>
              </UTableViewExpander>
            }>
          </UTableViewColumn>
          <UTableViewColumn
            slotTitle={
              <UText text="当前处理人"></UText>
            }
            slotCell={
              (current) => <UText
                text={
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
                }
              ></UText>
            }
            slotExpander={
              (current) => <UTableViewExpander
                  item={current.item}>
              </UTableViewExpander>
            }>
          </UTableViewColumn>
          <UTableViewColumn
            slotTitle={
              <UText text="发起人"></UText>
            }
            slotCell={
              (current) => <UText
                text={(function match(_value) {
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
              })(nasl.util.HasValue(current.item.procInstInitiator.displayName))}
              ></UText>
            }
            slotExpander={
              (current) => <UTableViewExpander
                  item={current.item}>
              </UTableViewExpander>
            }>
          </UTableViewColumn>
          <UTableViewColumn
            slotTitle={
              <UText text="发起时间"></UText>
            }
            slotCell={
              (current) => <UText
                text={(function match(_value) {
                  if (_value === true) {
                    return nasl.util.FormatDateTime(current.item.procInstStartTime, 'yyyy-MM-dd HH:mm:ss', 'global')
                  } else if (_value === false) {
                    return '-'
                  } else {
                }
              })(nasl.util.HasValue(current.item.procInstStartTime))}
              ></UText>
            }
            slotExpander={
              (current) => <UTableViewExpander
                  item={current.item}>
              </UTableViewExpander>
            }>
          </UTableViewColumn>
          <UTableViewColumn
            slotTitle={
              <UText text="操作"></UText>
            }
            slotCell={
              (current) => <ULink
                text="查看"
                onClick={
                  function click(){
                    ${nameGroup.goToPage}(current.item.taskId)
                  }
                }></ULink>
            }
            slotExpander={
              (current) => <UTableViewExpander
                  item={current.item}>
              </UTableViewExpander>
            }>
          </UTableViewColumn>
        </UTableView>
      </ULinearLayout>
    </ULinearLayout>
  </UTab>
  <UTab value="抄送" slotTitle={
    <UText text="抄送我的"></UText>
  }>
  <ULinearLayout direction="vertical" wrap={true}>
    <ULinearLayout wrap={true}>
      <ULinearLayout wrap={false} mode="flex" direction="horizontal" alignment="start" justify="space-between">
        <ULinearLayout gap="normal" mode="flex" justify="start" alignment="center" widthStretch="true" style="--space-base:0px;">
          <ULinearLayout direction="horizontal" wrap={true} mode="flex" alignment="center" justify="end" gap="normal" widthStretch="false" style="margin-bottom: 20px;margin-right: 16px;">
            <UText text="流程" widthStretch="false" style="width:76px;text-align:right;padding-right:20px;"></UText>
            <USelect
              placeholder="请选择"
              pagination={false}
              pageSize={20}
              emptyValueIsNull={true}
              value={$sync(${nameGroup.filterVar}.procDefKey)}
              dataSource={${logicNamespace}.getProcDefInfos(undefined)}
              textField="procDefTitle"
              valueField="procDefKey"
              filterable={true}
              clearable={true}
              widthStretch="false"></USelect>
          </ULinearLayout>
          <ULinearLayout direction="horizontal" wrap={true} mode="flex" alignment="center" justify="end" gap="normal" widthStretch="false" style="margin-bottom: 20px;margin-right: 16px;">
            <UText text="发起时间" widthStretch="false" style="width:76px;text-align:right;padding-right:20px;"></UText>
            <UDatePicker
              clearable={true}
              emptyValueIsNull={true}
              startDate={$sync(${nameGroup.filterVar}.procInstStartTimeAfter)}
              endDate={$sync(${nameGroup.filterVar}.procInstStartTimeBefore)}
              range={true}
              placeholder="开始日期"
              placeholderRight="结束日期"
              converter="date"></UDatePicker>
          </ULinearLayout>
          <ULinearLayout direction="horizontal" wrap={true} mode="flex" alignment="center" justify="end" gap="normal" widthStretch="false" style="margin-bottom: 20px;margin-right: 16px;">
            <UText text="发起人" widthStretch="false" style="width:76px;text-align:right;padding-right:20px;"></UText>
            <USelect
              placeholder="请选择"
              pagination={true}
              pageSize={20}
              emptyValueIsNull={true}
              value={$sync(${nameGroup.filterVar}.procInstInitiator)}
              dataSource={${nameGroup.getProcInstInitiators}(elements.$ce.page, elements.$ce.size, elements.$ce.filterText)}
              valueField="userName"
              optionIsSlot={true}
              clearable={true}
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
              }></USelect>
          </ULinearLayout>
          <ULinearLayout direction="horizontal" wrap={true} mode="flex" alignment="center" justify="end" gap="normal" widthStretch="false" style="margin-bottom: 20px;margin-right: 16px;">
          <UText text="查看状态" widthStretch="false" style="width:76px;text-align:right;padding-right:20px;"></UText>
          <USelect
            placeholder="请选择"
            pagination={false}
            pageSize={20}
            emptyValueIsNull={true}
            clearable={true}
            value={$sync(${nameGroup.filterVar}.viewed)}
            widthStretch="false">
            <USelectItem value={false} text="未查看"></USelectItem>
            <USelectItem value={true} text="已查看"></USelectItem>
            </USelect>
          </ULinearLayout>
        </ULinearLayout>
        <ULinearLayout wrap={true}>
          <UButton color="primary" text="查 询" onClick={
            function click(){
              $refs.${nameGroup.tableView4}.reload()
            }
          }></UButton>
        </ULinearLayout>
      </ULinearLayout>
    </ULinearLayout>
    <ULinearLayout wrap={true}>
      <UTableView
        ref="${nameGroup.tableView4}"
        pagination={true}
        pageSize={20}
        pageNumber={1}
        dataSource={${nameGroup.getMyCCTasks}(elements.$ce.page, elements.$ce.size)}>
        <UTableViewColumn
          slotTitle={
            <UText text="流程标题"></UText>
          }
          slotCell={
            (current) => <UText
              text={(function match(_value) {
                if (_value === true) {
                  return current.item.procInstTitle
                } else if (_value === false) {
                  return '-'
                } else {
              }
            })(nasl.util.HasValue(current.item.procInstTitle))}
            ></UText>
          }
          slotExpander={
            (current) => <UTableViewExpander
                item={current.item}>
            </UTableViewExpander>
          }>
        </UTableViewColumn>
        <UTableViewColumn
          slotTitle={
            <UText text="流程类型"></UText>
          }
          slotCell={
            (current) => <UText
              text={(function match(_value) {
                if (_value === true) {
                  return current.item.procDefTitle
                } else if (_value === false) {
                  return '-'
                } else {
              }
            })(nasl.util.HasValue(current.item.procDefTitle))}
            ></UText>
          }
          slotExpander={
            (current) => <UTableViewExpander
                item={current.item}>
            </UTableViewExpander>
          }>
        </UTableViewColumn>
        <UTableViewColumn
          slotTitle={
            <UText text="当前节点"></UText>
          }
          slotCell={
            (current) => <UText
              text={(function match(_value) {
                if (_value === true) {
                  return nasl.util.Join(nasl.util.ListTransform(current.item.procInstCurrNodes, (item) => item.currNodeTitle), '，')
                } else if (_value === false) {
                  return '-'
                } else {
                }
              })(nasl.util.HasValue(current.item.procInstCurrNodes))}
            ></UText>
          }
          slotExpander={
            (current) => <UTableViewExpander
                item={current.item}>
            </UTableViewExpander>
          }>
        </UTableViewColumn>
        <UTableViewColumn
          slotTitle={
            <UText text="当前处理人"></UText>
          }
          slotCell={
            (current) => <UText
              text={(function match(_value) {
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
              })(nasl.util.HasValue(current.item.procInstCurrNodes, nasl.util.ListFilter(current.item.procInstCurrNodes, (item) => nasl.util.HasValue(item.currNodeParticipants))))}
            ></UText>
          }
          slotExpander={
            (current) => <UTableViewExpander
                item={current.item}>
            </UTableViewExpander>
          }>
        </UTableViewColumn>
        <UTableViewColumn
          slotTitle={
            <UText text="发起人"></UText>
          }
          slotCell={
            (current) => <UText
              text={(function match(_value) {
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
            })(nasl.util.HasValue(current.item.procInstInitiator.displayName))}
            ></UText>
          }
          slotExpander={
            (current) => <UTableViewExpander
                item={current.item}>
            </UTableViewExpander>
          }>
        </UTableViewColumn>
        <UTableViewColumn
          slotTitle={
            <UText text="发起时间"></UText>
          }
          slotCell={
            (current) => <UText
              text={(function match(_value) {
                if (_value === true) {
                  return nasl.util.FormatDateTime(current.item.procInstStartTime, 'yyyy-MM-dd HH:mm:ss', 'global')
                } else if (_value === false) {
                  return '-'
                } else {
              }
            })(nasl.util.HasValue(current.item.procInstStartTime))}
            ></UText>
          }
          slotExpander={
            (current) => <UTableViewExpander
                item={current.item}>
            </UTableViewExpander>
          }>
        </UTableViewColumn>
        <UTableViewColumn
          slotTitle={
            <UText text="操作"></UText>
          }
          slotCell={
            (current) => <ULink
              text="查看"
              onClick={
                function click(){
                  ${nameGroup.goToPage}(current.item.taskId)
                }
              }></ULink>
          }
          slotExpander={
            (current) => <UTableViewExpander
                item={current.item}>
            </UTableViewExpander>
          }>
        </UTableViewColumn>
      </UTableView>
    </ULinearLayout>
  </ULinearLayout>
</UTab>
    </UTabs>
  }`;
}
