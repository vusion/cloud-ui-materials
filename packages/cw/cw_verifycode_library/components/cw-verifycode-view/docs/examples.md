### 基本用法

``` vue
<template>
    <div>
        <cw-verifycode-view  type="blend"  style="width:200px" :value="str" ref="a88" ></cw-verifycode-view>
        <input v-model ="str"/>
        <button @click="handleClick">123</button>
        <button @click="handleClick1">123</button>
    </div>
</template>
<script>
export default {
    data(){
        return {
            str:""
        }
    },
    methods:{
        handleClick(){
            console.log(this.str)
            const a = this.$refs['a88'].validate(this.str)
            console.log(a)
        },
         handleClick1(){
            this.$refs['a88'].refresh()
        }
    }
}
</script>
```
