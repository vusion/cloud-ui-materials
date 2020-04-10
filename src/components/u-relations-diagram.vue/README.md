<!-- 该 README.md 根据 api.yaml 和 docs/*.md 自动生成，为了方便在 GitHub 和 NPM 上查阅。如需修改，请查看源文件 -->

# URelationsDiagram 关系图

基于 [Cytoscape.js](https://js.cytoscape.org)，传入节点和边的数据来表达各种关系的 Canvas 图。

## 示例
### 基本用法

在`data`属性中传入`nodes`和`edges`的数据。

使用`layout`属性设置布局，可选项有：
- null
- random
- preset
- grid
- circle
- concentric
- breadthfirst
- cose

但一般需要设置布局参数，详见 [Cytoscape.js - Layouts](https://js.cytoscape.org/#layouts)。

对原始 Cytoscape.js 节点做了简化：

``` ts
interface node {
    id: string, // 节点 id
    label: string, // 节点标签，如果不填按 id 显示
    parent: string, // 组合方式中的父节点
    color: string, // 配色
    position: { x: number, y: number }, // 初始化位置
};
interface edge {
    id: string, // 节点 id 和名称
    source: string, // 起始节点
    target: string, // 目标节点
    color: string, // 配色
    label: string, // 边的标签
    'source-label': string, // 边的起始标签
    'target-label': string, // 边的结束标签
    curve: string, // 曲线类型
    'source-arrow': string, // 边的起始箭头类型
    'target-arrow': string, // 边的结束箭头类型
    'mid-source-arrow': string, // 边的中间起始箭头类型
    'mid-target-arrow': string, // 边的中间结束箭头类型
};
```

``` html
<u-relations-diagram :data="{
    nodes: [
        { id: 'n0' },
        { id: 'n1' },
        { id: 'n2' },
        { id: 'n3' },
        { id: 'n4' },
    ],
    edges: [
        { source: 'n0', target: 'n2' },
        { source: 'n2', target: 'n4' },
        { source: 'n4', target: 'n1' },
        { source: 'n1', target: 'n3' },
        { source: 'n3', target: 'n0' },
    ],
}" :layout="{
    name: 'circle',
}"></u-relations-diagram>
```

### 图例与配色

使用`legend`属性添加图例，使用`color`属性设置节点或边的颜色。

本组件根据 Cloud UI 主题适配了一套配色方案。

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
}" :legend="[
    { label: 'default' },
    { label: 'primary', color: 'primary' },
    { label: 'success', color: 'success' },
    { label: 'normal', color: 'normal' },
    { label: 'problem', color: 'problem' },
    { label: 'warning', color: 'warning' },
    { label: 'error', color: 'error' },
    { label: 'danger', color: 'danger' },
    { label: 'disabled', color: 'disabled' },
]"></u-relations-diagram>
```

### 节点形状

在 node 对象中，使用`shape`参数指定节点类型。默认为`rectangle`。

shape 的各种类型请直接看下面的示例，其它说明详见 [Cytoscape.js - Node shape](https://js.cytoscape.org/#style/node-body)。

``` html
<u-relations-diagram :data="{
    nodes: [
        { id: 'ellipse', shape: 'ellipse' },
        { id: 'triangle', shape: 'triangle' },
        { id: 'round-triangle', shape: 'round-triangle' },
        { id: 'rectangle', shape: 'rectangle' },
        { id: 'round-rectangle', shape: 'round-rectangle' },
        { id: 'bottom-round-rectangle', shape: 'bottom-round-rectangle' },
        { id: 'cut-rectangle', shape: 'cut-rectangle' },
        { id: 'barrel', shape: 'barrel' },
        { id: 'rhomboid', shape: 'rhomboid' },
        { id: 'diamond', shape: 'diamond' },
        { id: 'round-diamond', shape: 'round-diamond' },
        { id: 'pentagon', shape: 'pentagon' },
        { id: 'round-pentagon', shape: 'round-pentagon' },
        { id: 'hexagon', shape: 'hexagon' },
        { id: 'round-hexagon', shape: 'round-hexagon' },
        { id: 'concave-hexagon', shape: 'concave-hexagon' },
        { id: 'heptagon', shape: 'heptagon' },
        { id: 'round-heptagon', shape: 'round-heptagon' },
        { id: 'octagon', shape: 'octagon' },
        { id: 'round-octagon', shape: 'round-octagon' },
        { id: 'star', shape: 'star' },
        { id: 'tag', shape: 'tag' },
        { id: 'round-tag', shape: 'round-tag' },
        { id: 'vee', shape: 'vee' },
    ],
}" :layout="{
    name: 'grid',
    padding: 10,
}"></u-relations-diagram>
```

### 曲线类型

在 edge 对象中，使用`curve`参数指定曲线类型。默认为`bezier`曲线。

curve 可选类型：
- bezier：集束贝塞尔曲线，对于相同节点之间平行的贝塞尔曲线，会通过调整曲率使它们分型。
- unbundled-bezier：非集束贝塞尔曲线，用于手动控制点。
- haystack：草堆线，一般用于快速绘制两个节点之间的直线。不支持组合父节点，不能使用起始和结束箭头。
- straight：普通直线。
- segments：分段折线
- taxi：直角线

具体说明详见 [Cytoscape.js - Edge line](https://js.cytoscape.org/#style/edge-line)。

本组件的 edge 类型的参数是对 curve 的使用方式做了简化，如果需要对曲线的参数进一步设置，请使用`element-style`自定义样式。

``` html
<u-relations-diagram :data="{
    nodes: [
        { id: 'n0' },
        { id: 'n1' },
        { id: 'n2' },
        { id: 'n3' },
        { id: 'n4' },
    ],
    edges: [
        { source: 'n2', target: 'n0' },
        { source: 'n0', target: 'n2', 'source-label': 'bezier' },
        { source: 'n2', target: 'n0' },
        { source: 'n4', target: 'n2', curve: 'unbundled-bezier' },
        { source: 'n2', target: 'n4', curve: 'unbundled-bezier', 'source-label': 'unbundled-bezier' },
        { source: 'n4', target: 'n2', curve: 'unbundled-bezier' },
        { source: 'n4', target: 'n1', curve: 'haystack' },
        { source: 'n4', target: 'n1', curve: 'haystack', 'source-label': 'haystack' },
        { source: 'n4', target: 'n1', curve: 'haystack' },
        { source: 'n1', target: 'n3', curve: 'segments', 'source-label': 'segments' },
        { source: 'n3', target: 'n0', curve: 'taxi', 'source-label': 'taxi' },
    ],
}" :layout="{
    name: 'circle',
}"></u-relations-diagram>
```

### 箭头类型

在 edge 对象中，使用`source-arrow`参数指定边起始箭头类型，使用`source-arrow`参数指定边结束箭头类型。

默认`source-arrow`为空，`target-arrow`为`triangle`。

箭头的各种类型请直接看下面的示例，其它说明详见 [Cytoscape.js - Edge arrow](https://js.cytoscape.org/#style/edge-arrow)。

``` html
<u-relations-diagram :data="{
    nodes: [
        { id: 'n0' },
        { id: 'n1' },
        { id: 'n2' },
        { id: 'n3' },
        { id: 'n4' },
        { id: 'n5' },
        { id: 'n6' },
        { id: 'n7' },
        { id: 'n8' },
        { id: 'n9' },
        { id: 'n10' },
    ],
    edges: [
        { color: 'primary', source: 'n0', target: 'n1', 'source-arrow': 'triangle', 'target-arrow': 'triangle', label: 'triangle' },
        { color: 'primary', source: 'n1', target: 'n2', 'mid-source-arrow': 'triangle-tee', 'source-arrow': 'triangle-tee', 'target-arrow': 'none', label: 'triangle-tee' },
        { color: 'primary', source: 'n2', target: 'n3', 'mid-target-arrow': 'triangle-cross', 'target-arrow': 'triangle-cross', label: 'triangle-cross' },
        { color: 'primary', source: 'n3', target: 'n4', 'target-arrow': 'triangle-backcurve', label: 'triangle-backcurve' },
        { color: 'primary', source: 'n4', target: 'n5', 'target-arrow': 'vee', label: 'vee' },
        { color: 'primary', source: 'n5', target: 'n6', 'target-arrow': 'tee', label: 'tee' },
        { color: 'primary', source: 'n6', target: 'n7', 'target-arrow': 'square', label: 'square' },
        { color: 'primary', source: 'n7', target: 'n8', 'target-arrow': 'circle', label: 'circle' },
        { color: 'primary', source: 'n8', target: 'n9', 'target-arrow': 'diamond', label: 'diamond' },
        { color: 'primary', source: 'n9', target: 'n10', 'target-arrow': 'chevron', label: 'chevron' },
        { color: 'primary', source: 'n10', target: 'n0', 'target-arrow': 'none', label: 'none' },
    ],
}" :layout="{
    name: 'circle',
}" :element-style="[{
    selector: 'edge',
    css: {
        width: 1,
        'arrow-scale': 1
    },
}]"></u-relations-diagram>
```

### 自定义样式

使用`element-style`属性对本组件的默认样式进行覆盖和扩展。样式设置详见 [Cytoscape.js - Style](https://js.cytoscape.org/#style)。

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
        'border-width': 4,
        padding: 20,
    },
}]"></u-relations-diagram>
```

### 事件

透传所有 Cytoscape.js 事件，一般通过`e.target`获取到 Cytoscape 元素进行处理。事件对象详见 [Cytoscape.js - Events](https://js.cytoscape.org/#events)。

下面是一个给节点绑定 click 事件的例子：

``` vue
<template>
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
}]" @click="onClick"></u-relations-diagram>
</template>
<script>
export default {
    methods: {
        onClick(e) {
            const target = e.target;
            this.$toast.show('点击了 ' + target.id());
        },
    },
};
</script>
```

### 配置

配置 Cytoscape.js 选项。

本组件按照常用习惯，配置了一些默认参数。

``` js
{
    userZoomingEnabled: false, // 禁止用户放大缩小，因为该功能经常与滚动冲突。如果需要，开发者可以将这个配置打开。
    minZoom: 0.5, // 缩放的最小倍数
    maxZoom: 2, // 缩放的最大倍数
}
```

其它参数详见 [Cytoscape.js - Initialisation](https://js.cytoscape.org/#core/initialisation)。

比如下面的配置禁用了移动位置、开启了方框选择。

``` vue
<template>
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
}" :config="{
    userPanningEnabled: false,
    boxSelectionEnabled: true,
}"></u-relations-diagram>
```

### 复杂示例

下面是一个较复杂的示例，使用了[cose Layout](https://js.cytoscape.org/#layouts/cose)。

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
| config | ConfigOptions |  |  | Cytoscape.js 配置选项。详见 [Cytoscape.js - Initialisation](https://js.cytoscape.org/#core/initialisation) |

### Slots

#### (default)

用于扩充其它内容。

### Events

#### @$listeners

透传所有 Cytoscape.js 事件。详见 [Cytoscape.js - Events](https://js.cytoscape.org/#events)
