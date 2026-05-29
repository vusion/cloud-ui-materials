<!-- 展示方式与布局方式 -->

<template>
  <div><u-linear-layout direction="vertical">
    <u-linear-layout>
        <u-linear-layout display="inline">
            <u-button>Button</u-button>
            <u-button>Button</u-button>
            <u-button>Button</u-button>
        </u-linear-layout>
        <span><code>&lt;u-linear-layout&gt;</code>本身为<code>&lt;block&gt;</code>类型，修改<code>display</code>可以拥有行内的特性。</span>
    </u-linear-layout>
    <u-linear-layout direction="vertical" layout="block">
        <u-button>Button</u-button>
        <u-button>Button</u-button>
        <u-button>Button</u-button>
        <span>这个<code>&lt;u-linear-layout&gt;</code>中的元素本来都是行内元素，添加<code>layout</code>属性后可全部变成块级元素。</span>
    </u-linear-layout>
</u-linear-layout></div>
</template>