### 基本用法

```vue
<template>
    <cw-antd-tree-transfer
        :dataSource="dataSource"
        :value.sync="value"
        titleField="title1"></cw-antd-tree-transfer>
</template>
<script>
const treeData = [
    { key: '0-0', title1: '0-0' },
    {
        key: '0-1',
        title1: '0-1',
        expanded: true,
        expand: true,
        children: [
            { key: '0-1-0', title1: '0-1-0' },
            { key: '0-1-1', title1: '0-1-1' },
        ],
    },
    { key: '0-2', title1: '0-3' },
];

const transferDataSource = [];
function flatten(list = []) {
    list.forEach((item) => {
        transferDataSource.push(item);
        flatten(item.children);
    });
}
flatten(JSON.parse(JSON.stringify(treeData)));

function isChecked(selectedKeys, eventKey) {
    return selectedKeys.indexOf(eventKey) !== -1;
}

function handleTreeData(data, targetKeys = []) {
    data.forEach((item) => {
        item['disabled'] = targetKeys.includes(item.key);
        if (item.children) {
            handleTreeData(item.children, targetKeys);
        }
    });
    return data;
}
export default {
    data() {
        return {
            dataSource: treeData,
            value: ['0-0'],
        };
    },
};
</script>
```
