<template>
  <div>{{value}}</div>
</template>

<script>
export default {
    name:"fdaf",
    props:{
      value:{
        type:String,
        default:"请在这里编写121代码"
      }
    },
     mounted(){
       fetch("/api/system/getCustomConfig/appid?group=extensions.configuration_library.custom",{
      }).then(r=>r.text()).then((r)=>{
          console.log(this.value=r);
      })
     
    },
    methods:{
      getCookie(cname) {
      const name = `${cname}=`;
      const ca = document.cookie.split(";");
      for (let i = 0; i < ca.length; i++) {
        const c = ca[i].trim();
        if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
      }
      return "";
    },
    }
}
</script>

<style>

</style>