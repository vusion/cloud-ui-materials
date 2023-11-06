<template>
 <canvas id="barcode" ref="barcode"></canvas>
</template>

<script>
import JsBarcode from 'jsbarcode'
export default {
    name:"cw-barcode-view",
    props:{
      value:{
        type:String,
        default:"123456"
      },
      lineColor:{
        type:String,
        default:"#000"
      },
      height:{
        type:Number,
        default:40
      },
      displayValue:{
        type:Boolean,
        default:true
      },
      format:{
        type:String,
        default:"code128"
      }
    },
    data(){
      return {
        barCode:""
      }
    },
    watch: {
      value(val) {
        if (val.length > 0) {
         this.init()
        }
      },
      format(val) {
        if(val.length > 0){
          this.init()
        }
      },
      forlineColormat(val) {
         if(val.length > 0){
          this.init()
         }
      },
      height(val) {
         this.init()
      },
      displayValue(val) {
         this.init()
      },
    },
    mounted(){
      this.init()
    },
    methods:{
      init(){
        JsBarcode("#barcode", this.value, {
          format: this.format,
          lineColor: this.lineColor,
          height:this.height,
          displayValue: this.displayValue
        });
          var base64Data = this.$refs["barcode"].toDataURL("image/jpeg", 1)
          console.log(base64Data)
          this.$emit('load', base64Data)
      }
    }
}
</script>

<style>

</style>