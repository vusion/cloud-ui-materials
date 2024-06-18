<template>
  <div>{{value}}</div>
</template>

<script>
export default {
    name:"cw-nfc-view",
    methods:{
      init(){
        if ('NDEFReader' in window) { 
          const ndef = new NDEFReader();
          ndef
          .scan()
          .then(() => {
              ndef.onreadingerror = (event) => {
                  this.$emit('onreadingerror',event)
              };
              ndef.onreading = (event) => {
                  this.$emit('onreading',event)
              };
          })
          .catch((error) => {
              console.log(`Error! Scan failed to start: ${error}.`);
          });
        } else {  
            // 浏览器不支持Web NFC API  
            // alert('浏览器不支持Web NFC API');  
            console.error('浏览器不支持Web NFC API');  
        }
      }
    }
}
</script>

<style>

</style>