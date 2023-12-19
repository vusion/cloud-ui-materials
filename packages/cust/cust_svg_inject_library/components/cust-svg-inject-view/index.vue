<template>
  <div ref="img-room">
  </div>
</template>

<script>
import inject from "svg-inject"
export default {
    name:"cust-svg-inject-view",
    props:{
      value:{
        type:String,
      }
    },
    cumputed:{
     inIDE(){
        return this.$env&& this.$env.VUE_APP_DESIGNER || false
      },
    },
    watch:{
      value(value){
        if(value && !this.inIDE){
           this.init()
        }
      }
    },
    methods:{
      init(){
        const room =  this.$refs["img-room"]
        const el = document.createElement("img")
        el.style.width = "100%"
        el.style.height = "100%"
        el.src = this.value
        el.onload=()=>{
          inject(el)
        }
        room.innerHTML = ""
        room.appendChild(el)
      }
    },
    async mounted(){
      console.log( this.$env&& this.$env.VUE_APP_DESIGNER );
      if(this.value && !this.inIDE){
        this.$nextTick(()=>{
          this.init()
        })
      }
   
    }
}
</script>

<style>
.cust-svg-inject-img{
  width: 100px;
  height: 100px;
}
</style>