<template>
  <div>
     <div v-if="$env.VUE_APP_DESIGNER" style="width: 100%;height: 300px;display: flex;justify-content: center;align-items: center;">动态绚烂组件</div>
      <a-form :colon="false" :style="customStyle" :labelAlign="formInfo.labelAlign"  v-else :form="form"  @submit="handleSubmit" :class="formInfo.layout ==='horizontal'?'form-horizontal':'form-vertical'">
        <div style="display: flex; flex-wrap: wrap;">
        <a-col  class="cell-room" :class="[item.belong?item.belong+'-type-room':'']" :sm="23"   :lg="{span:item.span * cellSpan}" v-if="evalCondition(item.dependencyResult)"   v-for="(item,index) in componentResultList" :key="index" >
          <a-form-item :label="formInfo.serial? item.idx+item.label:item.label"  v-if="item.belong==='form'"  >
            <component  v-decorator="[
                  `${item.name}`,
                  {
                    rules: item.ruleResult,
                  },
                ]"
            :disabled="disabled"
            :is="item.tag" 
            :cwStyle="item.style"
            v-bind="[item.selfProps]"
            ></component>
          </a-form-item>
          <a-form-item  
            :wrapperCol="{span:24}" v-else-if="item.belong==='table'" :colon="false"   :label="null" >
            <component 
            :disabled="disabled"
            v-decorator="[
                  `${item.name}`,
                  {
                    rules: item.ruleResult,
                  },
                ]" 
              :is="item.tag" 
              v-bind="[item.selfProps]"
            ></component>
          </a-form-item>
            <a-form-item  
            :wrapperCol="{span:24}" v-else-if="item.belong==='view'" :colon="false"   :label="null" >
            <component 
              :is="item.tag"
              :cwStyle="item.style"
              v-bind="[item.selfProps]"
            ></component>
          </a-form-item>
        </a-col>
        </div>
        <!-- </a-row> -->
        <a-row v-if="formInfo.isBtn">
          <a-col :span="8">
            <a-form-item  :wrapper-col="{ span: 12,offset:8  }">
              <a-button type="primary" html-type="submit">
                提交
              </a-button>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
  </div>
</template>

<script>
import camelCase from "lodash/camelCase"
import ComponentInit from "@/mixins/component.init"
import ComponentData from "@/mixins/common.data"
import  "@/utils/index"
import axios from "axios"
export default {
    name:"cw-antd-custom-render-view",
    props:{
      value:{
        type:String,
      },
      mode: {
        type:String, 
      },
      initValue: {
        type:Object,
      },
      disabled: {
        type:Boolean,
        default:false
      },
    },
    data() {
      return {
        submitUrl:"",
        formInfo:{},
        customStyle:"",
        form: this.$form.createForm(this, { name: 'coordinated' }),
        pageComponentData: [],
      }
  },
  mixins:[ComponentData,ComponentInit],
  computed: {
    cellSpan(){
      return 24 / this.formInfo.span || 3
    },
    componentResultList() {
      // console.log(this.pageComponentData,22);
      let idx = 0
      const result =  this.pageComponentData.map(item => {
        let str = "";
        (item.dependency || []).forEach((dependencyItem, index) => {
          if (index) {
            str += dependencyItem.type==='2' ? ` || `: ` && `
            //  str += ` && `
          }
          str +=  `this.form.getFieldValue('${dependencyItem.name}') ${dependencyItem.calculation} '${dependencyItem.value}'`
        })
        if(item.belong==='form'){
            idx++
            item.idx = idx+ "."
        }
        // console.log(str,"str");
        item.dependencyResult = str
        item.dataSourceResult = this.getDataSourceResult(item.dataSource)
        item.ruleResult = this.getRuleResult(item)
        item.selfProps = {};
        (this.componentMapSelfProps[item.tag] || []).forEach(props => {
          if (props === "dataSource") {
              item.selfProps["data-source"] = item.dataSourceResult
          } else {
              item.selfProps[props] = item[props]
          }
        })
        return item
      })
      console.log(result.filter(item=>item.belong==="form"),'result',this.componentMapSelfProps);
      return result
    }
  },
  async mounted() {
    if (this.mode === "dev") {
      // this.pageComponentData = localStorage.getItem("formData") ? JSON.parse(localStorage.getItem("formData")) : []
      const custFormData = localStorage.getItem("custFormData")
      if (custFormData) {
         const {pageComponentList,structure,...formData} =  JSON.parse(custFormData)  
        // console.log(pageComponentList,formData);
        // const p = require("../../1.json")
        // const { pageComponentList,structure,...formData } =  p
        this.pageComponentData = JSON.parse(pageComponentList)
        this.formInfo = formData
        this.submitUrl = formData.url
      }
    }
    this.getComponentMapSelfProps()

    await this.$nextTick()  
    let i = 0
    let res = Object.values(this.form.getFieldsValue()).toString()
    const showFields = async ()=>{
      i++;
      this.form.setFieldsValue({...this.initValue})
      await this.$nextTick()
      if(res !==  Object.values(this.form.getFieldsValue()).toString()&& i<5){
        res =  Object.values(this.form.getFieldsValue()).toString()
       await showFields()
      }
    }
   await showFields()
  },
  watch: {
     'formInfo.customStyle':{
      handler(val){
        let arr = []
        if(val){
         arr = val.split(';')
        }
        const result =  arr.map(item=>{
          const [a,b] = item.split(":")
          return `'${camelCase(a)}':'${b}'`
        }).join(",")
        let customStyle = null
        try {
          customStyle =  this.json5Parse(`{${result}}`)
        } catch (error) {
          customStyle = {}
        }
        this.customStyle = customStyle
      },
      immediate:true,
     },
    value:{
      handler(val){
         if ((this.mode !== "dev" || !this.$env.VUE_APP_DESIGNER ) && val) {
            const {pageComponentList,structure,...formData} =   JSON.parse(val)
            // this.pageComponentData = JSON.parse(val)
            this.formInfo = formData
            this.pageComponentData = JSON.parse(pageComponentList)
          }
      },
      immediate:true
   
    },
    "formInfo.labelWidth":{
      handler(val) {
        document.documentElement.style.setProperty('--label-width', val+"px");
      },
      immediate:true,
     },

  },
  methods: {
    /* 验证规则 */
    getRuleResult(component) {
      if (component.belong!=="form") {
        return []
      }
      return (component.rules||[]).map(item => {
        let obj = {}
        if (item.rule === "required") {
          obj[`${item.rule}`] = true
          obj.message= item.message?item.message:`${component.label}不能为空`
        }else if (item.rule === "max")  {
          obj[`${item.rule}`] = isNaN(Number(item.value)) ? item.value : Number(item.value) 
          obj.message= item.message?item.message:`${component.label}字符长度不得大于${item.value}`
        }else if (item.rule === "min")  {
          obj[`${item.rule}`] = isNaN(Number(item.value)) ? item.value : Number(item.value) 
          obj.message= item.message?item.message:`${component.label}字符长度不得小于${item.value}`
        }
        else if (item.rule === "mobile"){
          obj[`pattern`] = /^1[3-9]\d{9}$/
          obj.message= item.message?item.message:`${component.label}验证规则不匹配`
        }
         else {
          obj[`${item.rule}`] =  new RegExp(item.value) 
          obj.message= item.message?item.message:`${component.label}验证规则不匹配`
        } 
        return obj
      })
    },
    async validatorResult (e){
     const result =  await this.form.validateFields()
     return result
    },
    handleSubmit(e) {
     e.preventDefault()
      this.form.validateFields( async(err, values) => {
         console.log('Received values of form: ', values);
        if (err) {
          return;
        }
        // http://dev.dad.defaulttenant.lcap.hatest.163yun.com/api/activity
        // http://dev.dad.defaulttenant.lcap.hatest.163yun.com/api/activity
        if (this.mode === 'dev') {
          return
        }
        const r = await axios.post(`${this.submitUrl}`, {
          ...values
        },{
          headers: {
            // 'lcap-calllogic-uuid': '58c3909486594355aecb3f7e918154b4',
            'LCAP-FRONTEND': 'pc'
          }
        })
       
      })
    },
    evalCondition(condition) {
      if (condition) {
       const conditionStr =  condition.replace(/(\S*)\s(\S*)\s(\S*)(\s(&&|\|\|)\s)?/g,(a,b,c,d,e)=>{
          if(c === '==='){
            return `isSame(${b},${d})${e?e:''}`
          } else if(c === '!='){
            return  `isUnSame(${b},${d})${e?e:''}`
          } else if(c === 'includesFun'){
            return  `includesFun (${b},${d})${e?e:''}`
          } else if(c === 'unIncludesFun'){
            return  `includesFun(${b},${d})${e?e:''}`
          }
          // console.log(a);
          return a
        })
        return eval(conditionStr);
      } else {
        return true
      }
      // 使用 eval() 方法动态执行条件
    }
  }
}
</script>

<style>
/* .form-horizontal .ant-form-item-label{
  width: var(--label-width);
} */
@media screen and (max-width: 768px) {
  /* 在宽度小于等于 768px 的屏幕上应用的样式 */
  .cell-room{
  flex-basis: 100%;
}
}

</style>