### 基本用法

```vue
<template>
    <div>
        <u-button @click="flag = !flag">toggle</u-button>
        <cust-community-icon-image
            fit="fill"
            :src="
                flag
                    ? 'https://defaulttenant.lcap.codewave-test.163yun.com/public/img/appTemplateImg2.23e7b648.png'
                    : ''
            "
            style="border-radius: 16px; width: 280px"></cust-community-icon-image>

        <cust-community-icon-image
            fit="fill"
            style="border-radius: 16px; width: 500px"
            :targetStyle="targetStyle"></cust-community-icon-image>

        <div>
            <img src="https://defaulttenant.lcap.codewave-test.163yun.com/public/img/appTemplateImg2.23e7b648.png"></img>
            <input type="color"/>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            flag: true,
            targetStyle: {
                imgWithMask: {
                    width: '256px',
                },
            },
        };
    },
};
</script>
```
