// 处理数据为坐标轴信息
export function processEchartData(data) {
  const content = Array.isArray(data) ? data: data.content;
  const key = Object.keys(content[0])[0];
  const attrDict = {};
  // 删除自带的，不必要的属性, 根据数据类型分类x轴， y轴
  for (let item of content) {
    const tempAttr = item[key];
    for (let attr in tempAttr) {
      if (!attrDict[attr]) attrDict[attr] = [];
      tempAttr[attr] ? attrDict[attr].push(tempAttr[attr]) : attrDict[attr].push('');
    }
  }
  const attrList = Object.keys(attrDict);
  // x轴必须是非数字类型， y轴必须是数字类型
  const xAxisList = [], yAxisList = [];
  for (let attr of attrList) {
    typeof (attrDict[attr][0]) === 'string' ? xAxisList.push(attr) : yAxisList.push(attr);
  }
  return [attrDict, xAxisList, yAxisList];
}
