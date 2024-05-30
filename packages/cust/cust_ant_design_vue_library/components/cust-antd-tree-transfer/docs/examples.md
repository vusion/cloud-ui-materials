### 基本用法

```vue
<template>
    <cust-antd-tree-transfer
        :dataSource="dataSource"
        :value.sync="value"
        titleField="entity1.name"
        valueField="entity1.id"
        parentField="entity1.parentid"
        style="--primary-color: red"
        titleText="fdadf"
        >

        <template #leftHeader>
            <div style="display:flex;">
                <div> dafa123</div>
                <div> 按钮</div>
            </div>
         </template>
         <template #rightHeader>
             <div style="display:flex; justify-content: space-between;">
                <div> dafa多大123</div>
                <div> 按钮</div>
            </div>
         </template>
        </cust-antd-tree-transfer>
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

const treeData1 = [
    {
        entity1: {
            id: 2875322149381888,
            createdTime: '2024-05-22T06:26:09.000Z',
            updatedTime: '2024-05-22T06:26:09.000Z',
            name: '水果',
        },
    },
    {
        entity1: {
            id: 2875322626672384,
            createdTime: '2024-05-22T06:27:08.000Z',
            updatedTime: '2024-05-22T06:27:08.000Z',
            parentid: 2875322149381888,
            name: '苹果',
        },
    },
    {
        entity1: {
            id: 2875322712164096,
            createdTime: '2024-05-22T06:27:18.000Z',
            updatedTime: '2024-05-22T06:27:18.000Z',
            parentid: 2875322149381888,
            name: '香蕉',
        },
    },
    {
        entity1: {
            id: 2875322878011136,
            createdTime: '2024-05-22T06:27:38.000Z',
            updatedTime: '2024-05-22T06:27:38.000Z',
            name: '海鲜',
        },
    },
    {
        entity1: {
            id: 2875322972186368,
            createdTime: '2024-05-22T06:27:50.000Z',
            updatedTime: '2024-05-22T06:27:50.000Z',
            parentid: 2875322878011136,
            name: '鱼类',
        },
    },
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
            dataSource: treeData1,
            value: [],
        };
    },
};
</script>
```
