### 基本用法

``` vue
<template>
<div>
<cx-countup :end="end" :loop="flag" style="color:red" :duration="1"></cx-countup>
<button @click="handleClick1">{{end}}</button>
<button @click="handleClick2">{{flag}}</button>
</div>
</template>

<script>
export default {
    data(){
        return {
            flag: false,
            end: 0,
        };
    },
    methods:{
        handleClick1(){
            this.end = 999;
        },
        handleClick2(){
            this.flag = !this.flag;
        }
    }
}
</script>
```
