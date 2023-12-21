### 相同的文件

``` vue
<template>
<large-file-split-uploader url="/api/upload" @before-send.prevent="onBeforeSend">
    <u-button>upload</u-button>
</large-file-split-uploader>
</template>

<script>
export default {
    methods: {
        onBeforeSend($event) {
            console.info($event);
        },
    },
};
</script>
```


设置`multiple-once`可以一次性上传多个文件。

``` vue
<template>
<u-uploader v-model="files" multiple multiple-once url="http://localhost:7000/api/library/upload">
    <u-button color="primary">Upload</u-button>
</u-uploader>
</template>
<script>
export default {
    data() {
        return {
            files: [{
                uid: '1',
                name: 'breakfast.png',
                status: 'success',
                url: 'https://static-vusion.163yun.com/assets/breakfast.png',
            }, {
                uid: '2',
                name: 'salad.png',
                status: 'success',
                url: 'https://static-vusion.163yun.com/assets/salad.png',
            }],
        };
    },
};
</script>
```