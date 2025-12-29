<template>
  <div>
    <h3 style="font-size: 16px;font-weight:600;height:55px;margin-bottom:0">{{title[index]}}</h3> 
      <div style="display: flex; align-items: center;">
        <a-input style="margin:0 5px 0 0 " v-model="currentValue" @change="handleChange" placeholder="请输入内容" />
        <span>{{ unit[index] }}</span>
      </div>
    </div>
</template>

<script>
export default {
    name:"cw-gx-input-view",
    props:{
      custom:{
        type:String,
        default:"请在这里编写代码"
      },
      value:{
        type:String,
        default:""
      }
    },
    watch:{
      custom:{
        handler(val){
          this.index = val
        },
        immediate:true
      },
      value:{
        handler(val){
          this.currentValue = val
        },
        immediate:true
      }
    },
    data(){
      return {
        title: ['来访量','认购套书','权益认购金额'],
        unit: ["人","套","元"],
        index:0,
        currentValue:""
      }
    },
    methods:{
      handleChange(e){
        this.currentValue = e.target.value
        this.$emit('update:value', e.target.value)
        this.$emit('onChange', e.target.value)
      }
    },
    mounted(){
      console.log(this.value)
    }
}
</script>

<style scoped>

</style>