<template>
  <div :style="cwStyle" class="cw-antd-text">
   {{value}}
  </div>
</template>

<script>
export default {
    name:"cw-antd-text",
    props:{
      value:{
        type:String,
        default:"fdafd"
      },
      cwStyle:{
        type:String
      }
    },
    // watch:{
    //   value:{
    //     handler:(value)=>{
    //       console.log(value,"value");
    //     }
    //   }
    // }
}
</script>

<style>
.cw-antd-text{
  font-weight: 600;
  font-size: 16px;
  line-height: 1;
  color: black;
  width: 100%;
  white-space: pre-line;
  word-wrap: break-word;
}
</style>