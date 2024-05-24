<template>
    <a-transfer
        class="cw-antv-tree-transfer"
        :data-source="flattenNodes"
        :targetKeys="targetKeys"
        showSearch
        :render="(item) => item.title"
        @search="
            (direction, search) =>
                direction === 'left'
                    ? (leftSearch = search)
                    : (rightSearch = search)
        "
        @change="onChange">
        <template
            #children="{
                props: { direction, selectedKeys },
                on: { itemSelect },
            }">
            <a-tree
                v-if="direction === 'left' && (treeViewInFilter || !leftSearch)"
                blockNode
                checkable
                checkStrictly
                defaultExpandAll
                :replaceFields="treeReplaceFields"
                :checkedKeys="[...selectedKeys, ...targetKeys]"
                :treeData="letfTreeData"
                @check="
                    (_, { checked, selected, node }) => {
                        itemSelect(node.eventKey, selected || checked);
                    }
                "
                @select="
                    (_, { checked, selected, node }) => {
                        itemSelect(node.eventKey, selected || checked);
                    }
                "></a-tree>
            <a-tree
                v-else-if="
                    direction === 'right' && (treeViewInFilter || !rightSearch)
                "
                blockNode
                checkable
                checkStrictly
                autoExpandParent
                defaultExpandAll
                :replaceFields="treeReplaceFields"
                :defaultExpandedKeys="targetKeys"
                :checkedKeys="selectedKeys"
                :treeData="rightTreeData"
                @check="
                    (_, { checked, selected, node }) => {
                        itemSelect(node.eventKey, selected || checked);
                    }
                "
                @select="
                    (_, { checked, selected, node }) => {
                        itemSelect(node.eventKey, selected || checked);
                    }
                "></a-tree>
        </template>
    </a-transfer>
</template>
<script>
import ATransfer from 'ant-design-vue/es/transfer';
import ATree from 'ant-design-vue/es/tree';
import supportDatasource from './support.datasource';

// 组件依赖了这样的一个假设
// 1. 在传递parentField后, 数据源为flattend类型
// 2. 在不传递parentField后， 数据源为treeData类型
export default {
    mixins: [supportDatasource],
    components: { 'a-transfer': ATransfer, 'a-tree': ATree },
    props: {
        value: {
            type: Array,
            default: () => [],
        },
        treeViewInFilter: {
            type: Boolean,
            default: () => true,
        },
    },
    data() {
        return {
            targetKeys: this.value,
            leftSearch: '',
            rightSearch: '',
        };
    },
    watch: {
        value() {
            this.targetKeys = this.value;
        },
    },
    computed: {
        letfTreeData() {
            const nodes = this.flattenNodes;
            const reg =
                this.treeViewInFilter &&
                this.leftSearch &&
                new RegExp(this.leftSearch);
            const targetNodes = nodes.reduce((acc, n) => {
                if (reg && !reg.test(n.title)) {
                    return acc;
                }
                if (this.targetKeyMap[this.$at(n, this.valueField)]) {
                    acc.push({
                        ...n,
                        disabled: true,
                    });
                } else {
                    acc.push(n);
                }
                return acc;
            }, []);

            const temp = this.list2tree(
                targetNodes,
                this.valueField,
                this.parentField || 'parentId'
            );
            return temp;
        },
        targetKeyMap() {
            return Object.fromEntries(this.targetKeys.map((k) => [k, true]));
        },
        rightTreeData() {
            const nodes = this.flattenNodes;
            const reg =
                this.treeViewInFilter &&
                this.rightSearch &&
                new RegExp(this.rightSearch);
            const targetNodes = nodes.filter(
                (n) =>
                    this.targetKeyMap[this.$at(n, this.valueField)] &&
                    (!reg || reg.test(n.title))
            );

            const temp = this.list2tree(
                targetNodes,
                this.valueField,
                this.parentField || 'parentId'
            );
            return temp;
        },

        flattenNodes() {
            // 注意这里因为会去掉children节点，故使用deep clone来保证不影响数据源
            let data = [];
            if (
                this.currentDataSource &&
                Array.isArray(this.currentDataSource.data)
            )
                data = this.currentDataSource.data;
            let temp;
            if (this.parentField) {
                temp = JSON.parse(JSON.stringify(data)).map((node) => {
                    node.key = this.$at(node, this.valueField);
                    node.title = this.$at(node, this.titleField);
                });
            } else {
                temp = [];
                JSON.parse(JSON.stringify(data)).forEach((node) => {
                    this.flattenTree(node, (n) => {
                        n.key = this.$at(n, this.valueField);
                        n.title = this.$at(n, this.titleField);
                        temp.push(n);
                    });
                });
            }
            return temp;
        },

        treeReplaceFields() {
            return {
                children: this.childrenField,
                title: this.titleField,
                key: this.valueField,
            };
        },
    },
    methods: {
        createLeftTree(nodes) {
            nodes.forEach((n) => {
                if (this.targetKeyMap[this.$at(n, this.valueField)]) {
                    n.disabled = true;
                }
            });

            const temp = this.list2tree(
                nodes,
                this.valueField,
                this.parentField || 'parentId'
            );
            return temp;
        },

        createRightTreeData(nodes) {
            const temp = this.list2tree(
                nodes,
                this.valueField,
                this.parentField || 'parentId'
            );
            return temp;
        },
        processData(data) {
            let treeData = data;
            if (this.parentField) {
                treeData = this.list2tree(
                    data,
                    this.valueField,
                    this.parentField
                );
            }

            return treeData;
        },
        list2tree(list, idField, pField) {
            const [map, treeData] = [{}, []];
            for (let i = 0; i < list.length; i += 1) {
                map[this.$at(list[i], idField)] = i;
                list[i].children = [];
            }
            for (let i = 0; i < list.length; i += 1) {
                const node = list[i];
                if (
                    this.$at(node, pField) &&
                    list[map[this.$at(node, pField)]]
                ) {
                    this.$at(
                        list[map[this.$at(node, pField)]],
                        this.childrenField
                    ).push(node);
                } else {
                    treeData.push(node);
                }
            }
            return treeData;
        },
        onChange(targetKeys) {
            this.targetKeys = targetKeys;
            this.$emit('update:value', targetKeys);
        },
        flattenTree(root, addNodes) {
            addNodes(root);
            // delete root.children;
            const children = this.$at(root, this.childrenField);

            if (Array.isArray(children)) {
                this.$setAt(root, this.childrenField, undefined);
                const parentId = this.$at(root, this.valueField);
                children.forEach((node) => {
                    this.$setAt(node, 'parentId', parentId);
                    this.flattenTree(node, addNodes);
                });
            }
        },
    },
};
</script>
<style>
.cw-antv-tree-transfer {
    --primary-color: red;
    --line-highlight-color: blue;
}

/* .cw-antv-tree-transfer
    .ant-tree
    li
    .ant-tree-node-content-wrapper.ant-tree-node-selected,
.cw-antv-tree-transfer .ant-tree li .ant-tree-node-content-wrapper:hover {
    background-color: var(--line-highlight-color);
} */

/* .cw-antv-tree-transfer
    li.ant-tree-treenode-disabled
    > .ant-tree-node-content-wrapper:hover {
    background: transparent;
} */

.cw-antv-tree-transfer .ant-tree-checkbox-checked .ant-tree-checkbox-inner,
.cw-antv-tree-transfer .ant-btn-primary,
.cw-antv-tree-transfer .ant-btn-primary:hover,
.cw-antv-tree-transfer .ant-btn-primary:focus,
.cw-antv-tree-transfer .ant-checkbox-checked .ant-checkbox-inner {
    background-color: var(--primary-color);
    border-color: var(--primary-color);
}

.cw-antv-tree-transfer
    .ant-tree-checkbox-checked.ant-tree-checkbox-disabled
    .ant-tree-checkbox-inner {
    background-color: #f5f5f5;
    border-color: #d9d9d9 !important;
}
</style>
