### 基本用法

```vue
<template>
    <div>
        <u-button @click="handleClick">click</u-button>
        <cw-ppt-preview :value="file"></cw-ppt-preview>
    </div>
</template>

<script>
export default {
    data() {
        return {
            file: undefined,
        };
    },
    methods: {
        async handleClick() {
            if (!this.file) {
                this.file =
                    'https://umi-template-1259308927.cos.ap-shanghai.myqcloud.com/Presentation1.pptx';
            } else {
                this.file = undefined;
            }
            // const [fileHandle] = await window.showOpenFilePicker({
            //     types: [
            //         {
            //             accept: {
            //                 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
            //                     ['.xlsx'],
            //             },
            //         },
            //     ],
            // });
            // const file = await fileHandle.getFile();
            // this.file = file;
        },
    },
};
</script>
```
