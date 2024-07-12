export function getWorkFlowList(dataList) {
  // 先组装最外层数据
  dataList.forEach((item, index) => {
    if (item.if_parallel == "Y" && dataList[index - 1]) {
      dataList[index - 1].children = item.childFlowList;
    }
  });
  dataList = dataList.filter((item) => item.if_parallel != "Y");
 
  // 再获取children
  let tempDataList = getChildrenList(dataList);
  return getStatusByNextItem(tempDataList);
}
 
// 再获取childrenList
export function getChildrenList(dataList) {
  dataList.forEach((dataListItem) => {
    if (dataListItem.children) {
      var tempList = dataListItem.children;
 
      tempList = tempList.map((chilrenItem) => {
        if (chilrenItem.childFlowList) {
          chilrenItem = getChildren(chilrenItem.childFlowList);
          return chilrenItem;
        } else {
          return getChilrenItem(chilrenItem);
        }
      });
 
      dataListItem.children = tempList;
    } else {
      dataListItem.children = [];
    }
  });
 
  return dataList;
}
 
// 获取多层children
export function getChildren(childFlowList) {
  let tagIndex = 0;
  // 先获取状态和step_no
  childFlowList.forEach((item, index) => {
    if (item.remark == "Y") {
      item.status = 2;
      item.step_no = index + 1;
      tagIndex = index;
    }
  });
  childFlowList.forEach((item, index) => {
    if (index < tagIndex) {
      item.status = 2;
      item.step_no = index + 1;
    } else if (index > tagIndex) {
      item.status = 0;
      item.step_no = index + 1;
    }
  });
 
  // 最后一个children为[]
  childFlowList[childFlowList.length - 1].children = [];
 
  for (var index = childFlowList.length - 1; index > 0; index--) {
    childFlowList[index - 1].children = [childFlowList[index]];
  }
  return childFlowList[0];
}
 
// 获取单个状态和step_no
export function getChilrenItem(chilrenItem) {
  chilrenItem.step_no = 1;
  chilrenItem.status = chilrenItem.remark == "Y" ? 2 : 0;
  chilrenItem.children = [];
  return chilrenItem;
}
 
// 获取分支节点前一个节点的status
export function getStatusByNextItem(dataList) {
  dataList.forEach((item) => {
    if (item.children.length == 2) {
      item.status = getStatusByChildrenList(item.children) ? 2 : 0;
    }
    if (item.remark == "Y") {
      item.status = 1;
    }
  });
  return dataList;
}
 
// 根据childrenList
export function getStatusByChildrenList(data) {
  let dataList = [];
  data.forEach((item) => {
    dataList.push(getStatusByChildrenItem(item));
  });
 
  return dataList.includes(true);
}
 
// 递归children
export function getStatusByChildrenItem(data) {
  let dataList = [];
 
  function circulate(elm) {
    dataList.push(elm.status >= 1 ? true : false);
    if (elm.children != []) {
      elm.children.forEach(circulate);
    }
  }
  circulate(data);
  return dataList.includes(true);
}