<template>
 <img id="barcode" ref="barcode" />
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
        console.log(this.$refs["barcode"].src)
        this.$emit('load', this.$refs["barcode"].src)
      }
    }
}
</script>

<style>

</style>