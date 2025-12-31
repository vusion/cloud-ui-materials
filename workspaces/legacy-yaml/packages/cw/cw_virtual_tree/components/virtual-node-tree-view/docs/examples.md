### 基本用法

```vue
<template>
    <div>
        <virtual-node-tree-view
            ref="tree"
            :data-source="load1"
            title-field="department.title"
            value-field="department.id"
            :value.sync="value"
            sorted-field="department.id"
            @drop="handleDrop"
        ></virtual-node-tree-view>
        <u-button @click="flag = !flag">change</u-button>
        <u-button @click="handleCreate">create</u-button>
        <u-button @click="handleUpdate">update</u-button>
        <u-button @click="handleRemove">remove</u-button>
    </div>
</template>
<!-- 
			<img src="https://lcap-static-saas.nos-eastchina1.126.net/user/szcyy/1701855468291_1.svg"></img>
			<img src="https://lcap-static-saas.nos-eastchina1.126.net/user/szcyy/1701855701309_%E5%9B%BE%E7%89%871.png"></img> -->
<!-- <template #default="{item:node}">{{ node.title }}123123</template> -->
<script>
let globalId = 0;

function createNodes(size = 100, expand = false, isLeaf = false, disabled = true) {
    return Array.from({ length: size }, (_, i) =>
        Object.assign(
            {
                department: {
                    id: ++globalId,
                    title: `节点${globalId}`,
                    expand,
                    isLeaf: undefined,
                },
            },
            !isLeaf && {
                children: [],
            }
        )
    );
}

function initialLoad() {
    const firstLevels = createNodes(100, true);
    firstLevels.forEach((node) => {
        node.children = createNodes();
        node.expand = true;
    });
    console.log('%c [ firstLevels ]-22', 'font-size:13px; background:pink; color:#bf2c9f;', firstLevels);
    return firstLevels;
}

export default {
    data() {
        return {
            flag: true,
            value: undefined,
        };
    },
    methods: {
        load1(node) {
            console.log('%c [ load1 ]-43', 'font-size:13px; background:pink; color:#bf2c9f;', node);
            let tmp;
            if (node === null) {
                tmp = initialLoad();
            } else {
                tmp = createNodes(100, false, true, false);
                tmp = [];
            }
            console.log('%c [ tmp ]-67', 'font-size:13px; background:pink; color:#bf2c9f;', tmp);
            return tmp;
        },
        load2(node, resolve, reject) {
            console.log('%c [ load2 ]-52', 'font-size:13px; background:pink; color:#bf2c9f;');
            return createNodes(100, false, true, false);
        },
        handleCreate() {
            // if (!this.value) return null;
            const newNode = {
                department: {
                    // id: ++globalId,
                    id: -1,
                    title: `节点${globalId}`,
                    isLeaf: true,
                },
            };
            this.$refs.tree.insertNode(newNode, this.value || undefined);
        },
        handleUpdate() {
            const node = this.$refs.tree.getNode(this.value);
            node.department.title = 'jwalkjsdlfkj';
            this.$refs.tree.updateNode(node);
        },
        handleRemove() {
            // this.$refs.tree.removeNode(this.value);
            this.$refs.tree.getTreeData();
        },
        handleDrop(v) {
            console.log('%c [ v ]-90', 'font-size:13px; background:pink; color:#bf2c9f;', v);
        },
    },
};
</script>
```
