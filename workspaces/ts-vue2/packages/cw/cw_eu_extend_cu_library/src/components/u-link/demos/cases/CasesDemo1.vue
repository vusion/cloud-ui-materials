<!-- 按钮自动加载 -->
<template>
<u-link href="" target="_self" color="primary" @click="onClick" text="按钮"></u-link>
</template>
<script>
export default {
    methods: {
        onClick(e) {
            console.log('click');
            return new Promise((res, rej) => {
                setTimeout(() => res(), 300);
            })
        },
    }
};
</script>