### 基本用法

```vue
<template>
    <div>
        <u-button @click="handleClick">click</u-button>
        <cw-xlsx-preview :value="file"></cw-xlsx-preview>
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
                    'https://501351981.github.io/vue-office/examples/dist/static/test-files/test.xlsx';
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
