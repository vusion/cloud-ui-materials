<template>
  <div style="display:flex">
      <div ref="my-type" v-if="!inIDE" >
      </div>
      <div v-else>
        {{value}}
      </div>
  </div>
</template>

<script>
import Typed from 'typed.js';
export default {
    name:"cw-typed-view",
    props:{
      value:{
        type:String,
        default:"请在这里输入内容"
      },
      showCursor:{
        type:Boolean,
        default:false
      },
      typeSpeed:{
        type:Number,
        default:40
      },
      // backSpeed:{
      //   type:Number,
      //   default:40
      // }
    },
    computed:{
      inIDE(){
        return this.$env&& this.$env.VUE_APP_DESIGNER || false
      },
    },
    data(){
      return {
        typed:null
      }},
    
    mounted(){
      if(!this.inIDE){
        this.typed = new Typed(this.$refs['my-type'], {
                strings: [this.value],
                typeSpeed: this.typeSpeed,
                showCursor:this.showCursor,
                // backSpeed: this.backSpeed,
                // loop: true
        });     
      }
    },
    destroyed(){
     this.typed && this.typed.destroy();
    }
}
</script>

<style>

</style>