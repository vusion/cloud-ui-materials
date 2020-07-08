<template>
<u-linear-layout :class="$style.root" type="flex" justify="center" alignment="center">
    <u-linear-layout direction="vertical" justify="center">
        <img src="https://static-vusion.163yun.com/assets/error-code.svg" width="240">
        <h1 :class="$style.title">404</h1>
        <h2 :class="$style.h2">抱歉，你访问的页面不存在</h2>
        <u-button color="primary" shape="round" href="/">返回首页</u-button>
    </u-linear-layout>
</u-linear-layout>
</template>

<script>
export default {};
</script>

<style module>
.root {
    height: 100vh;
}

.title {
    margin: 0;
    margin-top: -15px;
    padding-bottom: 20px;
    font-family: Geneva, 'Arial Black', Verdana, Tahoma, sans-serif;
    font-size: 64px;
}

.h2 {
    color: var(--color-light);
}
</style>
