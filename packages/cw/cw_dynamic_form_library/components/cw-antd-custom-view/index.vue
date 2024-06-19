<template>
  <div id="custom-view-box">
    <a-layout>
      <a-layout-header v-if="mode==='dev'"  class="custom-layout-header" style="z-index:100;display: flex;flex-direction: row;align-items: center;">
        <div class="icon-room" @click="goBack()">
          <a-icon type="arrow-left"  /> &nbsp;   返回
        </div>
        <div> 
           <a-input @mouseenter="handleTitleEnter" @mouseout="handleTitleOut" v-model="formInfo.name"></a-input>
        </div> 
        <a-button type="primary" style="margin-left:auto;" @click="handleFormSubmit" > <a-icon type="save" theme="filled" /> 保存</a-button>
        <a-button style="margin-left:10px" v-if="mode==='dev'" @click="handleFormReset" ><a-icon type="close-circle" /> 清空</a-button>
        <a-button style="margin-left:10px" @click="selectItem={}">表单设置</a-button>
      </a-layout-header>   
      <a-layout >
        <a-layout-sider   style="overflow-x: inherit;padding:16px" :width="leftWidth" class="main-sider component-sider">
          <h3 >基础组件</h3>
          <draggable  style="padding:1px" class="component-list-body" :list="componentDefaultList" :sort="false" @start="handleStart"   :group="{ name: 'people', pull: 'clone', put: false }"  >
              <div class="component-item"
              v-for="(element,index) in componentDefaultList"
              :key="element.name"
              @click="handleCellClick($event,index)"
            >
             <a-icon style="margin-right:6px;color:#1890ff;font-size:14px" :component="element.icon" /> 
              {{ element.title }} 
            </div>
          </draggable>
          <h3 style="margin-top:10px" v-if="customComponentList.length>0">扩展组件</h3>
          <draggable  style="padding:1px" class="custom-component-list-body" :list="customComponentList" :sort="false" @start="handleStart"   :group="{ name: 'people', pull: 'clone', put: false }"  >
              <div class="component-item"
              v-for="(element,index) in customComponentList"
              :key="element.name"
              @click="handleCellClick($event,index)"
            >
             <!-- <a-icon  type="home" />  -->
             <img v-if="element.icon"  style="width:20px;height:20px;margin-right:6px" :src="element.icon" alt="">
              {{ element.title }} 
            </div>
          </draggable>
        </a-layout-sider>
        <a-layout-content class="layout-content-body" style="padding: 20px 20px;height:calc(100vh - 60px); overflow-x: inherit;overflow-y:auto;overflow-x:hidden;" >
          <div class="main-room" :style="customStyle" >
          <!-- <a-form :form="form" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" > -->
          <a-form  :colon="false"  :labelAlign="formInfo.labelAlign" :form="form" :class="formInfo.layout ==='horizontal'?'form-horizontal':'form-vertical'"  >
          <draggable  style="width:100%;min-height:400px;"  group="people" @add="handleAdd" @remove="handleRemove" @update="handleUpdate" @choose="handleChoose" @start="handleContentStart($event)" @end="handleContentEnd($event);drag=false">
            <transition-group  style="display: flex;flex-wrap: wrap;align-content: flex-start;min-height:400px ">
               <a-col :class="[item.uid === selectItem.uid?'active-cell':'', item.belong?item.belong+'-type-room':'']" :data-id="item.uid"  class="cell-room" :offset="item.offset *cellSpan" :span="item.span * cellSpan"  v-for="(item,index) in pageResultComponentList" :key="item.uid" >
               <a-form-item  v-if="item.belong==='form'" :label="formInfo.serial? item.idx+item.label:item.label" >
                  <component   v-bind="[item.selfProps]"  :placeholder="item.placeholder" style="pointer-events: none;" :readOnly="true" v-decorator="[
                        `${item.name}`,
                        {
                          rules: item.rules,
                        },
                      ]"
                  :is="item.tag" 
                  > 
                  </component>
                </a-form-item>
                <a-form-item :wrapperCol="{span:24}" v-else-if="item.belong==='table'" :colon="false"   :label="null" >
                 <component style="pointer-events: none;" :readOnly="true" 
                  :is="item.tag" 
                   v-bind="[item.selfProps]"
                  ></component>
                </a-form-item>
                <a-form-item class="form-view" :wrapperCol="{span:24}"   v-else :colon="false"   :label="null" >
                    <component    :readOnly="true" style="pointer-events: none;"
                      :is="item.tag" 
                      v-bind="[item.selfProps]"
                      >
                      <draggable group="people" :list="item.children">
                        <a-col class="cell-room" :span="8"  v-for="it in item.children" :key="it.uid" >
                          <component style="pointer-events: none;" :readOnly="true" 
                            :is="it.tag" 
                            v-bind="[it.selfProps]"
                            ></component>
                         </a-col >
                      </draggable>
                    </component>
                </a-form-item>
                <div class="action-room" :class="item.uid === selectItem.uid&&!active ?'action-active':''" > 
                  <div class="rect-view-remove" @click="handleItemRomeve"><a-icon type="delete" /></div>
                  <div class="rect-view-clone" @click="handleItemClone"><a-icon type="copy" /></div>
                </div>
              </a-col>
            </transition-group>
          </draggable>
          <!-- <nested-draggable :tasks="pageComponentList" /> -->
           </a-form>
           </div>
        </a-layout-content>
        <a-layout-sider width="250" class="main-sider attribute-sider">
          <div  v-if="!selectItem.uid">
            <div class="attribute-label" >
               表单设置
            </div>
             <div style="padding:0 16px">
               <!-- <h4 style="margin-top:24px;font-weight: 600;">表单属性</h4> -->
                <a-form :form="form" >
                    <!-- <a-form-item label="名称" style="display:flex" >
                      <a-input v-model="formInfo.name" />
                    </a-form-item> -->
                    <!-- <a-form-item label="地址" style="display:flex" >
                      <a-input v-model="formInfo.url" />
                    </a-form-item> -->
                    <a-form-item label="列数" style="display:flex" >
                      <a-input-number v-model="formInfo.span"  :min="1" :max="4" />
                    </a-form-item>
                    <a-form-item label="布局" style="display:flex" >
                       <cw-proproty-antd-radio size="small" viewType="button" defaultValue="vertical" v-model="formInfo.layout" :dataSource="[{label:'纵向',value:'vertical'},{label:'横向',value:'horizontal'}]"></cw-proproty-antd-radio>
                    </a-form-item>
                    <a-form-item label="标签宽度" style="display:flex" >
                      <a-input-number v-model="formInfo.labelWidth"  :min="60" :max="200" />
                    </a-form-item>
                    <a-form-item label="对齐方式" style="display:flex" >
                      <cw-proproty-antd-radio size="small" viewType="button" defaultValue="left" v-model="formInfo.labelAlign" :dataSource="[{label:'居左',value:'left'},{label:'居右',value:'right'}]"></cw-proproty-antd-radio>
                    </a-form-item>
                    <a-form-item label="开启序号" style="display:flex" >
                      <a-switch v-model="formInfo.serial"> </a-switch>
                    </a-form-item>
                    <a-form-item v-if="mode==='dev'" label="提交展示" style="display:flex" >
                      <a-switch v-model="formInfo.isBtn"> </a-switch>
                    </a-form-item>
                     <a-form-item label="表单自定义样式">
                      <a-textarea v-model="formInfo.customStyle"></a-textarea>
                    </a-form-item>
                </a-form>
             </div>
          </div>
          <div v-show="!isShowForm" v-if="selectItem.uid">
            <div class="attribute-label" >
                {{selectItem.title}}
            </div>
            <div style="padding:0 16px">
              <!-- <h4 style="margin-top:24px;font-weight: 600;">基础属性</h4> -->
              <a-form :form="form" >
                <div class="attr-cell" v-for="(attr) in selectItemAttributeList" :key="attr[2]">
                  <a-divider v-if="['校验规则','展示规则','数据源'].includes(attr[2])" style="margin:24px 0 12px 0;" />
                  <a-form-item :label="attr[2]" :style="['校验规则','展示规则','数据源','为数据源添加填空选项'].includes(attr[2])?'':'display:flex'" >
                      <component :placeholder="attr[2]==='为数据源添加填空选项'?'请输入文案':''"  v-bind="getTagData(attr).props"  :is="getTagData(attr).tag" :value.sync="attr[1]"  @change="hangleAttrChange(attr[0],$event)"></component>
                  </a-form-item>
                </div>
              </a-form>
            </div>
          </div>
        </a-layout-sider>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
// import nestedDraggable from "../cw-antd-test";
import draggable from 'vuedraggable'
import ComponentInit from "@/mixins/component.init"
import ComponentData from "@/mixins/common.data"
import CwAddDataSourceView from "@/widgets/cw-add-data-source-view"
import CwAddDependencyView from "@/widgets/cw-add-dependency-view"
import CwAddRuleView from "@/widgets/cw-add-rule-view"
import CwStyleEditView from "@/widgets/cw-style-edit-view"
import cwProprotyAntdRadio from "@/widgets/cw-proproty-antd-radio"
import cwFileUploadView from "@/widgets/cw-file-upload-view"

import {titleMap} from "@/utils/setting"
import camelCase from "lodash/camelCase"

export default {
    name:"cw-antd-custom-view",
    props:{
      value:{
        type:String,
      },
      mode: {
        type: String,
      },
      formData: {
        type:Object
      },
      customComponentList: {
        type:Array,
        default:()=>[]
      }
  },
  provide() {
    return {
      getNameList:this.getNameList
    }
   },
  mixins:[ComponentInit,ComponentData],
  data() {
    return {
      daData:[],
      img:null,
      active: false,
      leftWidth: 226,
      fieldType: {
        label: 'input',
        name: 'input',
        title: "input",
        tag: 'input',
        value:'textArea',
        placeholder: "input",
        dependency: "dependencyView",
        dataSource: "dataSourceView",
        rules: 'ruleView',
        span: "spanRadioView",
        offset:"offsetRadioView",
        text: "input",
        type: "input",
        titleMap: "input",
        format:"input",
        viewType:"RadioTypeView",
        showTime:"switch",
        style:"styleEditView",
        direction:"RadioTypeView",
        uploadTemplate:'fileUploadView',
        linkage:"switch",
      },
      fieldTypeComponent: {
        select: {
          tag: 'cw-antd-select',
          dataSource:[{value:'button',label:"按钮"},{value:'radio',label:"单选框"}]
        },
        input: {
          tag: 'cw-antd-input',
          props: {}
        },
        switch : {
          tag: 'cw-antd-switch',
          props: {}
        },
        inputNumber: {
          tag: 'cw-antd-input-number',
          props: {
            min: 1,
            max: 3
          }
        },
        textArea:{
            tag: 'cw-antd-textarea',
             props: {}
        },
        RadioTypeView:{
            tag: 'cw-proproty-antd-radio',
            props: {
              viewType:"button",
              buttonStyle:"solid",
              size:"small",
              defaultValue:"button",
              dataSource: [{value:'horizontal',label:"横向"},{value:'vertical',label:"纵向"}]
            }
        },
        spanRadioView:{
            tag: 'cw-proproty-antd-radio',
            props: {
              viewType:"button",
              buttonStyle:"solid",
              size:"small",
              defaultValue:1,
              dataSource: [{value:1,label:"1"},{value:2,label:"2"},{value:3,label:"3"}]
            }
        },
        offsetRadioView:{
            tag: 'cw-proproty-antd-radio',
            props: {
              viewType:"button",
              buttonStyle:"solid",
              size:"small",
              defaultValue:0,
              dataSource:[{value:0,label:"0"},{value:1,label:"1"},{value:2,label:"2"}]
            }
        },
        dataSourceSimpleView: {
          tag: 'cw-add-select-source-view',
          props: {}
        },
        dependencyView: {
          tag: "cw-add-dependency-view",
          props: {}
        },
        dataSourceView: {
          tag:  "cw-add-data-source-view",
          props: {}
        },
        ruleView: {
          tag:   "cw-add-rule-view",
          props: {}
        },
        styleEditView:{
           tag:  "cw-style-edit-view",
           props: {}
        },
        fileUploadView:{
           tag:  "cw-file-upload-view",
           props: {}
        },
      },
      formInfo: {
        name: "未命名表单",
        url:"",
        span:3,
        layout:"vertical",
        labelWidth:100,
        customStyle:"",
        serial:true,
        labelAlign:'left'
      },
      form: this.$form.createForm(this, { name: 'coordinated' }),
      selectItem:{},
      pageComponentList: [
       
      ],
      isShowForm:false,
      isFirst:true
    }
  },
  components: {
    draggable,
    CwAddDataSourceView,
    CwAddDependencyView,
    CwAddRuleView,
    CwStyleEditView,
    cwProprotyAntdRadio,
    cwFileUploadView
    // nestedDraggable
  },
  mounted() {
    if (this.mode === "dev") {
      const custFormData = localStorage.getItem("custFormData")
      if (custFormData) {
        this.formatValue(custFormData)
      }
    }
    this.getComponentMapSelfProps()
//       document.addEventListener("click",(e)=>{
//  var ancestor = e.srcElement
//       while (ancestor !== document.body) {
//         console.log(ancestor.classList);
//         if (ancestor.classList.contains('main-room')) {
//           console.log("祖先元素具有目标 class");
//           break;
//         }
//         ancestor = ancestor.parentNode; // 继续获取上一级父元素
//       }

//       if (ancestor === document.body) {
//         console.log("祖先元素不具有目标 class");
//         this.selectItem={}
//       }else{

//       }
//       })
  },
  methods: {
    handleUnChoose(){
      console.log(222);
    },
    handleShowFormSetting(){
      this.selectItem={}
    },
    handleRoomClick(e){
      var ancestor = e.srcElement
      while (ancestor !== document.body) {
        console.log(ancestor.classList);
        if (ancestor.classList.contains('main-room')) {
          console.log("祖先元素具有目标 class");
          break;
        }
        ancestor = ancestor.parentNode; // 继续获取上一级父元素
      }

      if (ancestor === document.body) {
        console.log("祖先元素不具有目标 class");
        this.selectItem={}
      }else{

      }
      // console.log(222);
    },
    getNameList(){
      return this.currentNameObj ||[]
    },
    handleTitleEnter(e){
      // e.target.style.borderWidth = "1px";
    },
    handleTitleOut(e){
      //  e.target.style.borderWidth = "0px";
    },
    handleCellClick(e,index){
      const idx =  this.selectItem.uid?  this.pageComponentList.indexOf(this.selectItem)+1 : this.pageComponentList.length
      let targetComponentList = JSON.parse(JSON.stringify(this.componentDefaultList))
      if(e.target.parentNode.className ==='custom-component-list-body'){
        targetComponentList  =  this.customComponentList
      }
      const targetComponent = { 
        tag: targetComponentList[index].tag,
        belong:  targetComponentList[index].belong,
        title: targetComponentList[index].title,
        type: targetComponentList[index].type,
      }
      targetComponentList[index].property.forEach(item => {
        targetComponent[item.name] = item.defaultValue 
      })
      targetComponent.name = targetComponent.name + this.generateRandomNumber(5)
      delete targetComponent.property
      targetComponent.uid = this.generateRandomNumber(10)
    
      this.pageComponentList.splice(idx, 0, targetComponent)
      this.selectItem = targetComponent
      // console.log(this.pageComponentList,'this.pageComponentList');
    },
    handleAdd(e) {
      let targetComponentList =  JSON.parse(JSON.stringify(this.componentDefaultList))
      if(e.from.className ==='custom-component-list-body'){
        targetComponentList  =  this.customComponentList
      }
      const index = e.oldIndex
      const targetComponent = { 
        tag: targetComponentList[index].tag,
        belong:  targetComponentList[index].belong,
        title: targetComponentList[index].title,
        type:targetComponentList[index].type
      }
      //  console.log(targetComponentList,'targetComponent1');
      targetComponentList[index].property.forEach(item => {
        targetComponent[item.name] = item.defaultValue
      })
      // console.log(targetComponent,'targetComponent');
      delete targetComponent.property
      targetComponent.name = targetComponent.name + this.generateRandomNumber(5)
      targetComponent.uid = this.generateRandomNumber(10)
      const newIndex = e.newIndex
      this.pageComponentList.splice(newIndex, 0, targetComponent)
      this.selectItem = targetComponent
    },

    formatValue(value){
        this.isFirst = false
        const {pageComponentList,structure,...formData} =  JSON.parse(value)  
        this.pageComponentList =  JSON.parse(pageComponentList) 
        this.formInfo = formData
    },
    goBack(){
      history.go(-1)
    },
    handleFormInfo() {
      this.isShowForm = true
    },
    handleSiderToggle() {
      const el = document.querySelector(".component-sider")
      el.classList.toggle("close")
      if(el.classList.contains("close")) {
        this.leftWidth = 242
      } else {
        this.leftWidth = 0
      }
    },
    handleStart(event) {
      var img = document.createElement('img');
      // event.originalEvent.DataTransfer.setDragImage(img,10,10)
    },
    getTagData(attr) {
      // console.log(attr,'attr1')
      const key =  this.fieldType[attr[0]] || 'input'
      // console.log(this.fieldTypeComponent,this.fieldTypeComponent[this.fieldType[attr[0]]],'attr');
      return this.fieldTypeComponent[key]
    },
    getTitleData(name){
      return titleMap[name]
    },
    handleMoveover(e,event) {
      // event.currentTarget.style.border = "1px solid #ccc";
    },
    handleMoveout(e,event) {
      // event.currentTarget.style.border =  "0px"
    },
    handleChoose(e) {
      const index = e.oldIndex
      this.selectItem = this.pageComponentList[index]
      this.isShowForm =false
    },
    handleRemove(e) {
      console.log(e)
    },
    
    /* 提交 */
    handleFormSubmit() {
      const  selectItem = this.pageComponentList.find(item => item.belong === "form" && !item.name)
      if (selectItem) {
        this.selectItem = selectItem
        this.$toast.error("请填写完整")
      } else {
        const structure = {}
        let checkErrorIndex = null
        console.log(this.pageComponentList);
        this.pageComponentList.find((item,index)=>{
          if(item.belong!=="form"){
            return
          }
          if(!item.name){
            checkErrorIndex = index
            return true
          }
          if(structure[item.name]){
            checkErrorIndex = index
            return true
          }
          structure[item.name] = {
            type:item.type || "string",
            comment:item.label
          }
          if(item.dataSource){
             structure[item.name]["options"] = item.dataSource.des
          }
          return false
        })
        if(checkErrorIndex){
          this.$toast.error("字段名称有重复")
          this.selectItem = this.pageComponentList[checkErrorIndex]
        }
        const result = {
          ...this.formInfo,
          pageComponentList: JSON.stringify(this.pageComponentList), 
          structure:JSON.stringify(structure)
        }
        console.log(result) ;
        this.$emit("submit", result)
        localStorage.setItem("custFormData",JSON.stringify(result))
        
        // localStorage.setItem("formData",JSON.stringify(this.pageComponentList))
      }
    },
    handleUpdate(e) {
      const index = e.oldIndex
      const newIndex = e.newIndex
      const _pageComponentList = [...this.pageComponentList]
      const item = _pageComponentList.splice(index, 1)[0]
      _pageComponentList.splice(newIndex, 0, item)
      this.pageComponentList = _pageComponentList
    },
    hangleAttrChange(attr, e) {
      if (e && e.target) {
        this.selectItem[attr] = e.target.value
      } else {
        this.selectItem[attr] = e
      }
      if(['cw-antd-radio','cw-antd-checkbox'].includes(this.selectItem.tag)){
        this.pageComponentList = this.pageComponentList
      }
    },
    handleFormReset() {
      localStorage.removeItem("custFormData")
    },
    handleItemRomeve() {
      this.pageComponentList =   this.pageComponentList.filter(item => item.uid !== this.selectItem.uid)
      this.selectItem = {}
    },
    handleItemClone() {
     
      const item = JSON.parse(JSON.stringify(this.selectItem))
      item.uid = this.generateRandomNumber(10)
      item.name = item.name.slice("-3") + this.generateRandomNumber(3)
      this.pageComponentList.splice(this.pageComponentList.indexOf(this.selectItem)+1, 0, item)
      //  console.log(this.selectItem,item,"ttt");
      this.selectItem = item
    },
    handleContentStart(e) {
      this.active = true
    },
    handleContentEnd() {
      this.active = false
    },
    generateRandomNumber(n) {
      var min = Math.pow(10, n - 1);
      var max = Math.pow(10, n) - 1;
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  },
  computed: {
    currentNameObj(){
      // console.log(this.pageComponentList);
        const value =  this.pageComponentList.map((item)=>({
           value:item.name,label:item.label
        }))
        // console.log(value,'value');
        return value
    },
    cellSpan(){
      return 24 / this.formInfo.span || 3
    },
    pageResultComponentList() {
      let index = 0
      const arr =  this.pageComponentList.map(item => {
        item.span = Number(item.span)
        item.selfProps = {};
        // console.log(item,"item");
        (this.componentMapSelfProps[item.tag] || []).forEach(props => {
          if (props === "titleMap") {
            item.selfProps[props]  =this.getJsonResultObj(item[props]) 
          } else if (props === "dataSource") {
            item.selfProps["data-source"] = this.getDataSourceResult(item.dataSource);
          } else {
            item.selfProps[props] = item[props]
            }
        })
        if(item.belong==='form'){
            index++
            item.idx = index+ "."
        }
      
        // console.log(item,"props");
        // console.log(item.selfProps,'selfProps');
        return item
      }) 
      return arr
    },
    selectItemAttributeList(){
      let result = []
      let blackList = ["belong","tag","uid","selfProps",'children','title','idx','type']
      for (let it in this.selectItem) {
        const obj = this.selectItem[it]
        const title = titleMap[it] || it
        if (blackList.includes(it)) {
          continue
        }
        if (it === "label") {
          result.unshift([it,obj,title])
        } else {
          result.push([it,obj,title])
        }
      }
      // console.log(result);
      return result
    }
  
  },
  watch: {
    'form.style':{
      handler(value){
        // console.log(value,999);
      },
    },
    pageComponentList:{
        handler(value){ 
            const result = {
              ...this.formInfo,
              pageComponentList: JSON.stringify(this.pageComponentList),
              structure:JSON.stringify({}) 
            }
            this.$emit("onChange",result)
        },
        deep:true
    },
    formInfo:{
        handler(value){
           const result = {
              ...this.formInfo,
              pageComponentList: JSON.stringify(this.pageComponentList), 
              structure:JSON.stringify({}) 
            }
            this.$emit("onChange",result)
        },
        deep:true
    },
    active(val) {
      if (val) {
        const arrEl = document.querySelectorAll(".cell-room") 
        // arrEl.forEach(item=>item.style.border = "1px dashed #ccc")
        arrEl.forEach(item=>item.classList.add("padding-dashed"))
      } else {
        const arrEl = document.querySelectorAll(".cell-room")
         arrEl.forEach(item=>item.classList.remove("padding-dashed"))
        // arrEl.forEach(item=>item.style.border = "0px dashed #ccc")
      }
    },
    value(val) {
      if (this.mode !== "dev") {
        this.formatValue(val)
      }
    },
    // formData: {
    //   handler(val) {
    //     console.log(val,"formInfo");
    //     if (val) {
    //       this.formInfo = val
    //     }
    //   },
    //   immediate:true,
    //   deep:true
    // },
    "formInfo.span":{
      handler(val) {
        if(val){
          this.fieldTypeComponent["spanRadioView"].props.dataSource = Array(val).fill(0).map((item,index)=>({label:index+1,value:index+1}))
          this.fieldTypeComponent["offsetRadioView"].props.dataSource = Array(val).fill(0).map((item,index)=>({label:index,value:index}))
        }else{
          this.formInfo.span = 3
        }
       
      },
      immediate:true,
      deep:true
    },
     "formInfo.labelWidth":{
      handler(val) {
        if(val){
          document.documentElement.style.setProperty('--label-width', val+"px");
        }else{
          this.formInfo.labelWidth = 100
        }
      },
      immediate:true,
     },
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
    //  "formInfo.layout":{
    //     handler(val) {

    //     },
    //   immediate:true,
    //   deep:true
    // },
    selectItem(val) {
      // const el = 
      // console.log(el.__vue__);
      // let elNode = new Vue.extend({
      //   name:"el-node-custom",
      //   template: `<div id="rect-view"> <div class="rect-view-remove" @click="handleItemRomeve">删除</div><div class="rect-view-clone" @click="handleItemClone">复制</div></div>`,

      // })
      // console.log(elNode);
      // el.__vue__.$slots.default.push(elNode)
      // const rect = el.getBoundingClientRect();
      // this.getRectView(rect, el)
      // console.log(el);
      // el.classList.add("active")
    }
  },
}
</script>

<style>

.main-sider{
  background: #fff !important;
  overflow: auto;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  height: 100vh;
}
.attribute-sider{
  /* padding: 10px; */
}
.component-list-body{
  /* display: flex;
  flex-wrap: wrap; */
  /* justify-content:flex-start;
  flex-wrap: wrap; */
  display: grid;
  grid-gap:4px;
  gap: 4px;
  grid-template-columns: 92px 92px;
}
.component-item{
  color: #314666;
  /* background-color: rgba(0, 102, 255, .08); */
  background-color:rgba(55, 94, 250, 0.08);
  width:92px;
  height: 36px;
  border-radius: 4px;
  align-items: center;
  display: flex;
  padding: 8px;
  /* justify-content: center; */
  user-select: none;
  cursor: pointer;
  text-align: center;
  font-size: 12px;
  margin-top: 8px;
}

.component-item:hover{
  background:rgba(0,45,113,.125) ;
  /* color: #375efa; */
}

/* .component-item:nth-child(3n+3){
  border-right: 0px solid #eee;
} */
.cell-room{
  cursor: pointer;
  /* height: 50px; */
  padding-right: 10px;
  padding-top: 5px;
  /* overflow: hidden; */
  box-sizing: border-box;
  position: relative;;
}
.ant_design_vue_library .ant-form-item {
  margin-bottom: 0px;
}

#rect-view{
  position : absolute;
  border :1px dashed #ccc;
  box-sizing : border-box;
}

 .rect-view-remove , .rect-view-clone{
  position: absolute;
  top: -20px;
  background: #1890ff;
  color: white;
  width: 30px;
  text-align: center;
  cursor: pointer;
  z-index: 800;
 
}
.rect-view-remove{
   border-radius: 0px 4px 4px 0px;
    right: 0px;

}

.rect-view-clone{
   border-radius: 4px 0px 0px 4px;
  right: 30px;
}


.component-sider{
  transition: all 0.3s;
}
.component-sider.close{
  transition: all 0.3s;
  flex: 1 1 0px;
}

.active-cell{
  box-shadow: inset 0px 0px 0px 2px #1890ff;
  border-radius: 4px;
}

.action-room{
  display: none;
  opacity: 0;
  transition: all 4s;

}

.action-active{
   /* box-shadow:inset 0 0 10px rgba(0, 0, 0, 0.5); */
  display: block;
  opacity: 1;
  transition: all 2s;
}


.layout-content-body{
  background: rgb(248, 249, 253);
 
}

.custom-layout-header{
  box-shadow: 0px 0px 4px rgba(49,70,102,.2);
  background: white !important;
  padding: 20px;
}

.icon-room{
  /* width: 3px; */
  height: 32px;
    display: flex;
  justify-content: center;
  margin-right: 10px;
  align-items: center;
  border-radius: 8px;
  margin-left: -32px;
  cursor:pointer;
  padding: 8px;
}
.icon-room:hover{
  color: #1890ff;
  background: rgba(0,102,255,.08);
}

.attribute-label{
  font-size: 16px;
  font-weight: 600;
  height: 50px;
  line-height: 50px;
  margin-bottom: 10px;
  color: #314666;
  padding: 0 16px;
  border-bottom:1px solid #cccccc51 ;
}

.attribute-sider .ant-form-item{
  margin-bottom: 4px !important;
}

.attr-cell{
  /* min-height: 80px; */
}

.form-horizontal .ant-form-item {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
   padding: 2px;
   
}

.form-vertical .ant-form-item{
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items:  stretch;
  padding: 4px;
}

.form-horizontal .ant-form-item-label{
  width: var(--label-width);
  /* text-align: var(--label-align) */
}
.form-vertical .ant-form-item-label{
  text-align:left;
  background-color: var(--primary-color);
}
/* .form-vertical .ant-form-item-label {
  width: 150px;
  text-align: left !important;
} */

.form-horizontal .ant-form-item-control-wrapper,.form-vertical .ant-form-item-control-wrapper{
   flex:1 !important;
}

.main-room{
  background:white;padding:20px;height:100%;overflow-y: auto;
}

.custom-component-list-body{
  display: grid;
  grid-gap:4px;
  gap: 4px;
  grid-template-columns: 92px 92px;
}

.padding-dashed::before {
  content: '';
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  border: 1px dashed #1890ff;
  /* box-shadow: 0 0 0 1px ; */
}




</style>