<!-- 基本用法 -->

<template>
  <div><u-toc>
    <u-toc-item label="基础示例" to="examples">
        <u-toc-item label="锚点1" anchorLinked="#锚点1" :to="{ path: 'examples', hash: '#基本用法' }"></u-toc-item>
        <u-toc-item label="value" anchorLinked="#/components/u-toc/examples#基本用法" :to="{ path: 'examples', hash: '#value' }"></u-toc-item>
    </u-toc-item>
    <u-toc-item label="UToc API" :to="{ path: 'api', hash: '#api' }">
        <u-toc-item label="Props/Attrs" :to="{ path: 'api', hash: '#propsattrs' }"></u-toc-item>
        <u-toc-item label="Slots" :to="{ path: 'api', hash: '#slots' }"></u-toc-item>
        <u-toc-item label="Events" :to="{ path: 'api', hash: '#events' }"></u-toc-item>
    </u-toc-item>
    <u-toc-item label="UTocItem API" :to="{ path: 'api', hash: '#api' }">
        <u-toc-item label="Props/Attrs" :to="{ path: 'api', hash: '#propsattrs' }"></u-toc-item>
        <u-toc-item label="Slots" :to="{ path: 'api', hash: '#slots' }"></u-toc-item>
        <u-toc-item label="Events" :to="{ path: 'api', hash: '#events' }"></u-toc-item>
    </u-toc-item>
</u-toc></div>
</template>