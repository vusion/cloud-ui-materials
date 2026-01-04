<template>
   <div ref="verifyRoom"></div>
</template>

<script>
import  { GVerify } from "../../lib/verifyCode"
export default {
    name:"cw-verifycode-view",
    props:{
      value:{
        type:String,
      },
      type:{
        type:String
      }
    },
    data(){
      return {
        verifyCode:null,
      }
    },
    methods:{
      validate(){
        return  this.verifyCode.validate(this.value)
      }, 
      refresh(){
        this.verifyCode.refresh()
     }
    },
    mounted(){
      const width = this.$refs.verifyRoom.clientWidth || 80;
      const height = this.$refs.verifyRoom.clientHeight || 30;
      const id = new Date().valueOf().toString()
      this.$refs['verifyRoom'].id = id
      console.log(this.type)
      this.verifyCode = new GVerify({
        id,
        width,
        height,
        type:this.type
      })
    },
}
</script>

<style>

</style>