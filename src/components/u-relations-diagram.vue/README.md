<!-- 该 README.md 根据 api.yaml 和 docs/*.md 自动生成，为了方便在 GitHub 和 NPM 上查阅。如需修改，请查看源文件 -->

# URelationsDiagram 关系图

基于 Cytoscape.js，传入节点和边的数据来表达各种关系的 Canvas 图。

## 示例
### 基本用法

在`data`属性中传入`nodes`和`edges`的数据。

使用`layout`属性设置布局，布局方案详见 [Cytoscape.js Layouts](https://js.cytoscape.org/#layouts)。

对原始 Cytoscape.js 节点格式做了简化：

``` ts
interface node {
    id: string, // 节点 id 和名称
    parent: string, // 组合方式中的父节点
    color: string, // 配色
};
interface edge {
    id: string, // 节点 id 和名称
    source: string, // 起始节点
    target: string, // 目标节点
    color: string, // 配色
};
```

``` html
<u-relations-diagram :data="{
    nodes: [
        { id: 'n0', color: 'primary' },
        { id: 'n1' },
        { id: 'n2', color: 'warning' },
        { id: 'n3' },
        { id: 'n4' },
    ],
    edges: [
        { source: 'n0', target: 'n1' },
        { source: 'n1', target: 'n2' },
        { source: 'n0', target: 'n3' },
        { source: 'n1', target: 'n3' },
        { source: 'n1', target: 'n4' },
        { source: 'n2', target: 'n4' },
    ],
}" :layout="{
    name: 'circle',
}"></u-relations-diagram>
```

### 图例与配色

使用`legend`属性添加图例。

``` html
<u-relations-diagram :data="{
    nodes: [
        { id: 'default' },
        { id: 'primary', color: 'primary' },
        { id: 'success', color: 'success' },
        { id: 'normal', color: 'normal' },
        { id: 'problem', color: 'problem' },
        { id: 'warning', color: 'warning' },
        { id: 'error', color: 'error' },
        { id: 'danger', color: 'danger' },
        { id: 'disabled', color: 'disabled' },
    ],
    edges: [
        { source: 'default', target: 'primary' },
        { source: 'primary', target: 'success', color: 'primary' },
        { source: 'success', target: 'normal', color: 'success' },
        { source: 'normal', target: 'problem', color: 'normal' },
        { source: 'problem', target: 'warning', color: 'problem' },
        { source: 'warning', target: 'error', color: 'warning' },
        { source: 'error', target: 'danger', color: 'error' },
        { source: 'danger', target: 'disabled', color: 'danger' },
        { source: 'disabled', target: 'default', color: 'disabled' },
    ],
}" :layout="{
    name: 'circle',
}"></u-relations-diagram>
```

### 自定义样式

使用`element-style`属性自定义样式。样式设置详见 [Cytoscape.js Style](https://js.cytoscape.org/#style)。

``` html
<u-relations-diagram :data="{
    nodes: [
        { id: '建德私有云' },
        { id: '滨江私有云', color: 'success' },
        { id: '萧山私有云', color: 'success' },
    ],
    edges: [
        { source: '建德私有云', target: '滨江私有云', color: 'primary' },
        { source: '滨江私有云', target: '萧山私有云', color: 'primary' },
        { source: '萧山私有云', target: '建德私有云', color: 'primary' },
    ],
}" :legend="[
    { label: '评估完成', color: 'success' },
    { label: '评估中', color: 'default' },
]" :layout="{
    name: 'circle',
}" :element-style="[{
    selector: 'node',
    css: {
        padding: 20,
    },
}]"></u-relations-diagram>
```

### 复杂示例

下面是一个更复杂的示例，使用了[cose Layout](https://js.cytoscape.org/#layouts/cose)。

``` vue
<template>
<u-relations-diagram :data="data" :legend="[
    { label: '正常', color: 'normal' },
    { label: '风险', color: 'danger' },
]" :layout="{
    name: 'cose',
    animate: false,
    componentSpacing: 80,
}"></u-relations-diagram>
</template>
<script>
export default {
    data() {
        const data = {
            nodes: [
                { id: 'RDS' },
                { id: 'K8S' },
                { id: 'DNS' },
                { id: 'nova' },
                { id: 'CEPH' },
                { id: 'VPC' },
                { id: 'rds-on-k8s-with-floating-ip', parent: 'RDS', color: 'danger' },
                { id: 'k8s-node', parent: 'K8S', color: 'normal' },
                { id: 'k8s-volume', parent: 'K8S', color: 'danger' },
                { id: 'dns', parent: 'DNS', color: 'normal' },
                { id: 'nova-vm', parent: 'nova', color: 'normal' },
                { id: 'ceph-ssd-volume', parent: 'CEPH', color: 'danger' },
                { id: 'vpc-floating-ip', parent: 'VPC', color: 'normal' },
            ],
            edges: [
                { id: 'rds-k8s-node', source: 'rds-on-k8s-with-floating-ip', target: 'k8s-node' },
                { id: 'rds-k8s-volume', source: 'rds-on-k8s-with-floating-ip', target: 'k8s-volume' },
                { source: 'rds-on-k8s-with-floating-ip', target: 'vpc-floating-ip' },
                { source: 'k8s-node', target: 'dns' },
                { source: 'k8s-node', target: 'nova-vm' },
                { source: 'k8s-volume', target: 'ceph-ssd-volume' },
                { source: 'ceph-ssd-volume', target: 'nova-vm' },
                { source: 'dns', target: 'vpc-floating-ip' },
            ],
        };

        // layout 使用 cose 的话，最好初始把节点拉开，否则每次位置都是随机的。
        data.nodes.forEach((node, index) => {
            node.position = { x: index * 60, y: index * 60 };
        });
        return {
            data,
        };
    },
}
</script>
```


## API
### Props/Attrs

| Prop/Attr | Type | Options | Default | Description |
| --------- | ---- | ------- | ------- | ----------- |
| data | { nodes: Array\<node\>, edges: Array\<edge\> } |  |  | 图数据 |
| legend | Array\<{ label: string, color: string }\> |  |  | 图例。图例项中的样式与图节点的一致 |
| layout | string \| LayoutOptions |  | `'grid'` | 布局。字符串类型为 Cytoscape.js 的布局`name`。LayoutOptions 参数详见 [Cytoscape.js Layouts](https://js.cytoscape.org/#layouts)。 |
| element-style | Array\<StyleOptions\> |  | `'\[\]'` | 元素样式，包括 node 和 edge，根据 selector 区别。样式设置详见 [Cytoscape.js Style](https://js.cytoscape.org/#style)。 |
| config | ConfigOptions |  |  | Cytoscape.js 配置选项。详见 [Cytoscape.js Initialisation](https://js.cytoscape.org/#core/initialisation) |

### Slots

#### (default)

用于扩充其它内容。

### Events

#### @$listeners

所有 Cytoscape.js 事件。详见 [Cytoscape.js Events](https://js.cytoscape.org/#events)
