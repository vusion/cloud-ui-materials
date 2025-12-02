import { get as _get, isNil } from 'lodash';
function forEachTreeData(data, {
  childrenField,
  parent,
  level = 0
}, callback) {
  data.forEach(item => {
    const children = _get(item, childrenField);
    if (Array.isArray(children) && children.length > 0) {
      forEachTreeData(children, {
        childrenField,
        parent: item,
        level: level + 1
      }, callback);
    }
    callback(item, parent, level);
  });
}
export function getDataMap(data, {
  childrenField,
  valueField
}) {
  const dataMap = [];
  forEachTreeData(data, {
    childrenField
  }, (item, parent, level) => {
    const id = _get(item, valueField);
    dataMap[id] = {
      item,
      parent,
      level
    };
  });
  return dataMap;
}
export default {
  methods: {
    $checkTreeData() {
      return this.treeDisplay && this.currentDataSource && this.currentDataSource.arrangedData && this.currentDataSource.arrangedData.length > 0;
    },
    setAllTreeNodeExpanded(expanded = false, maxLevel = 0) {
      if (!this.$checkTreeData()) {
        return;
      }
      forEachTreeData(this.currentDataSource.arrangedData, {
        childrenField: this.childrenField
      }, (item, p, level) => {
        if (maxLevel && level >= maxLevel) {
          return;
        }
        this.$set(item, 'treeExpanded', expanded);
      });
    },
    setTreeNodeExpanded(value, expanded = false) {
      if (!this.$checkTreeData()) {
        return;
      }
      const dataMap = getDataMap(this.currentDataSource.arrangedData, {
        childrenField: this.childrenField,
        valueField: this.valueField
      });
      const treeItem = dataMap[value];
      if (!treeItem) {
        return;
      }

      // 展开父级节点
      if (expanded) {
        let pos = treeItem;
        while (pos.parent) {
          this.$set(pos.parent, 'treeExpanded', expanded);
          pos = dataMap[_get(pos.parent, this.valueField)];
        }
      }
      this.toggleTreeExpanded(treeItem.item, expanded);
    },
    async addRow(item, parentValue) {
      const value = _get(item, this.valueField);
      if (isNil(value) || !this.currentDataSource || !this.currentDataSource.arrangedData) {
        return;
      }
      const dataMap = getDataMap(this.currentDataSource.arrangedData, {
        childrenField: this.childrenField,
        valueField: this.valueField
      });
      if (!isNil(parentValue)) {
        const dataItem = dataMap[parentValue];
        if (!dataItem) {
          return;
        }
        const children = _get(dataItem.item, this.childrenField);
        if (!children) {
          return;
        }
        children.push(item);
        this.$setAt(dataItem.item, this.childrenField, children);
        this.$set(dataItem.item, 'treeExpanded', true);
        this.$setAt(dataItem.item, this.hasChildrenField, true);
        this.setTreeNodeExpanded(parentValue, true);
      } else {
        const list = this.currentDataSource.arrangedData;
        list.push(item);
      }
      this.$forceUpdate();
    },
    removeRow(value) {
      if (isNil(value) || !this.currentDataSource || !this.currentDataSource.arrangedData) {
        return;
      }
      const dataMap = getDataMap(this.currentDataSource.arrangedData, {
        childrenField: this.childrenField,
        valueField: this.valueField
      });
      const dataItem = dataMap[value];
      if (!dataItem) {
        return;
      }
      const list = dataItem.parent ? _get(dataItem.parent, this.childrenField) : this.currentDataSource.arrangedData;
      const i = list.indexOf(dataItem.item);
      if (i === -1) {
        return;
      }
      list.splice(i, 1);
    },
    setRowData(item) {
      if (!item) {
        return;
      }
      const value = _get(item, this.valueField);
      if (isNil(value)) {
        return;
      }
      const dataMap = getDataMap(this.currentDataSource.arrangedData, {
        childrenField: this.childrenField,
        valueField: this.valueField
      });
      const dataItem = dataMap[value];
      if (!dataItem) {
        return;
      }
      Object.assign(dataItem.item, item);
    }
  }
};