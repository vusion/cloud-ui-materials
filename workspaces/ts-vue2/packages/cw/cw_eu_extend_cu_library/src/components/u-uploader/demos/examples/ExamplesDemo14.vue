<!-- 检查文件格式等 -->
<template>
<u-uploader v-model="files" multiple list-type="card"
    url="http://localhost:7000/api/library/upload"
    :check-file="checkFile">
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
    methods: {
        checkFile(file) {
            const fileName = file.name;
            if(fileName.includes('&')) {
                return `${fileName} 文件名不能包含&字符`;
            } else if (fileName.length > 20) {
                return `${fileName} 文件名长度不能大于20`;
            } else {
                return '';
            }
        }
    }
};
</script>