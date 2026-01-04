### 基本用法

``` vue
<template>
    <kl-tree-view :value="treeData" :valueDeptList="valueDeptList" :valueUserList="valueUserList"></kl-tree-view>
</template>
<script>
export default {
    data(){
        return {
            valueDeptList:["100100100"],
            valueUserList:["1206f075b01f8383bf14e2d82f498da4"],
            treeData:[
            {
    "deptId": "100100",
    "deptType": "3",
    "parentId": "100",
    "ancestors": "0,,100",
    "deptName": "省国资委",
    "orderNum": 1,
    "leader": "",
    "phone": "",
    "email": "",
    "status": "0",
    "delFlag": "0",
    "createBy": "portal",
    "createTime": "2022-04-16T05:37:45.000Z",
    "updateBy": "portal",
    "updateTime": "2022-06-17T08:45:56.000Z",
    "deptUuid": "8fd2683f-eff7-4c3c-8280-d951c70f40f2",
    "deptGzwName": "省国资委"
}
            ]
        }
    }
}
</script>

<!-- ```

### 基本用法

``` html
<xu-tree-view></xu-tree-view>
``` -->
