<!-- 鼠标悬停状态为颜色变化 -->

<template>
  <div><u-link href="#" text="默认颜色" hoverType="color"></u-link>&nbsp;
<u-link href="#" hoverType="color" color="light"  text="浅色链接">
    <u-tooltip>
        <u-link href="#" color="light">浅色链接</u-link>一般用于深色背景
    </u-tooltip>
</u-link>&nbsp;
<u-link hoverType="color" color="success" text="成功链接"></u-link>&nbsp;
<u-link hoverType="color" color="warning" text="警告链接"></u-link>&nbsp;
<u-link hoverType="color" color="danger" text="危险链接"></u-link>&nbsp;</div>
</template>