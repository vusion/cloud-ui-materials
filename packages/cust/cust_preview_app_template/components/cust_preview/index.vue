<template>
  <div>
    <div v-if="isIDE" style="height:100%;width:100%;">
       请发布后预览
    </div>
    <div v-if="!isIDE">
      <iframe id="app" scrolling="no" src=""></iframe>
    </div>
  </div>
</template>

<script>
import  { loadScripts,  } from './loadEntry';
export default {
    name: 'cust-preview',
    data(){
        return {
        }
    },
    computed: {
        isIDE() {
            return this.$env&&this.$env.VUE_APP_DESIGNER;
        },
    },
    mounted() {
      if(!this.isIDE){
          setTimeout(()=>{
             this.getInfo()
          },1000)
      }
    },
    methods: {
        async getInfo(){
            window.LcapMicro ={
              ...(window.LcapMicro || {}),
              routePrefix:'preview',
            }
            window.preRequest =  ()=>{
              return {}
            }

            let query  =new URLSearchParams(location.search)
            let symbol = query.get('symbol')
            let version = query.get('version')
            let id =query.get('id') ||1
            console.log('当前id',id);
            let res = await fetch(`/rest/getTemplate?id=${id}`, {
              "headers": {
                "accept": "application/json, text/plain, */*",
                "accept-language": "zh-CN,zh;q=0.9",
                "cache-control": "no-cache",
                "domainname": "zcsctemplate1",
                "lcap-frontend": "pc",
                "pragma": "no-cache",
                "timezone": "Asia/Shanghai"
              },
              "body": null,
              "method": "GET",
              "mode": "cors",
              "credentials": "include"
            });
            let data= await res.json()

            let realResponse = JSON.parse(data.template.preview)
            let realData = realResponse.data
            let {mockRoles,mock,urls} = realData
             let clientJS  = urls.find(v=>v.includes('mockClient'))
            let allMockData = {
                roles: mockRoles ,
                mock: mock ,
            }
            console.log('allMockData',allMockData)
            window.assetsDomain = `${urls[urls.length-1]}/`
            window.allMockData = allMockData
            await loadScripts([clientJS]);
        },
    }
};
</script>
