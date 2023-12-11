### 基本用法

``` vue

<template>
    <cw-auto-complete valueField="name" :value="value" :data-source="load"></cw-auto-complete>
</template>
<script>
export default {
    data(){
        return {
            value:""
        }
    },
    methods:{
        load(){
           return new Promise(resolve =>setTimeout(()=>{
                // const arr = Array(30).fill(0).map((item,index)=>({name:(index+10).toString()}))
                const arr = [{
    "id": 2904,
    "code": "",
    "type": "",
    "source": null,
    "black": null,
    "prePay": null,
    "allowBusiness": "",
    "authenticationRegion": "河北省/秦皇岛市/北戴河区",
    "name": "网易杭州公司",
    "enterpriseAbbreviation": "",
    "registrationCode": "",
    "identificationType": "",
    "taxNumber": "",
    "legalRepresentative": "11",
    "registeredCountry": "中国大陆",
    "detailedAddress": "1",
    "registeredCapital": 111,
    "registeredCapitalCurrency": "CNY",
    "establishmentDate": "2023-09-13",
    "businessScope": "1",
    "dunsCode": "111",
    "organizationCode": "111",
    "startDate": "2023-09-26",
    "endDate": "2023-10-26",
    "taxpayerQualification": "非增值税纳税人",
    "socialCreditCode": "测试",
    "enterpriseType": "联营",
    "industry": "采矿业 / 煤炭开采和洗选业",
    "longTermValid": "三十年",
    "status": null,
    "registrationCertificate": "http://dev.purchase.mis.lcap.163yun.com/upload/app/R-C_20230911122740597.jpg",
    "createBy": null,
    "updateBy": null,
    "createTime": "2023-09-11T04:28:14.000Z",
    "updateTime": null,
    "deleted": 0,
    "enterpriseRegistrationCertificate": null
}]
                //  const arr = Array(30).fill(0).map((item,index)=>((index+10).toString()))
                resolve(arr)
           },1000))
        }
    }
}
</script>
```

### 基本用法

``` vue

<template>
    <cw-auto-complete valueField="" :value="value" :data-source="load"></cw-auto-complete>
</template>
<script>
export default {
    data(){
        return {
            value:""
        }
    },
    methods:{
        load(){
           return new Promise(resolve =>setTimeout(()=>{
                const arr = Array(30).fill(0).map((item,index)=>((index+10).toString()))
                //  const arr = Array(30).fill(0).map((item,index)=>((index+10).toString()))
                resolve(arr)
           },1000))
        }
    }
}
</script>
```
