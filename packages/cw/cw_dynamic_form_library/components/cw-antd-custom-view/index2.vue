<template>
  <div id="custom-view-box">
    <a-layout>
      <a-layout-header >
        <a-button @click="handleFormSubmit" > 保存</a-button>
        <a-button @click="handleFormReset" > 清空</a-button>
        <a-button @click="handleInfo" > 打印当前组件信息</a-button>
      </a-layout-header>   
      <a-layout >
        <a-layout-sider  style="overflow-x: inherit;" :width="leftWidth" class="main-sider component-sider">
          <h3>组件列表</h3>
          <draggable  style="padding:1px" class="component-list-body" :list="componentList" :sort="false" @start="handleStart"   :group="{ name: 'people', pull: 'clone', put: false }"  >
              <div class="component-item"
              v-for="(element, index) in componentList"
              :key="element.name"
            >
              {{ element.title }} 
            </div>
          </draggable>
        </a-layout-sider>
        <a-layout-content style="padding:10px;background: white;overflow-x: inherit;" >
          <div>
             <div  v-if="leftWidth" @click="handleSiderToggle"><a-icon type="left" /></div>
             <div  v-else @click="handleSiderToggle"><a-icon type="right" /></div>
          </div>
          <a-form :form="form" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
          <draggable  group="people" @add="handleAdd" @remove="handleRemove" @update="handleUpdate" @choose="handleChoose" @start="handleContentStart($event)" @end="handleContentEnd($event);drag=false">
            <transition-group style="display: flex;flex-wrap: wrap;">
               <a-col :class="item.uid === selectItem.uid?'active-cell':''" :data-id="item.uid"  class="cell-room" :span="item.span * 8"  v-for="(item,index) in pageResultComponentList" :key="item.uid"  @mouseover="handleMoveover(item,$event)" @mouseout="handleMoveout(item,$event)">
               <a-form-item  v-if="item.belong==='form'" :label="item.label"   >
                  <component :placeholder="item.placeholder" style="pointer-events: none;" :readOnly="true" v-decorator="[
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
                <a-form-item   v-else :colon="false"   :label="null" >
                    <component    :readOnly="true" 
                      :is="item.tag" 
                      v-bind="[item.selfProps]"
                      >
                      <div style="height: 80px;">
                      <draggable group="people">
                        <a-col class="cell-room" :span="8" > <div>132</div> </a-col >
                        <a-col class="cell-room" :span="8" > <div>135</div></a-col >
                      </draggable>
                    </div>
                    </component>
                </a-form-item>
                <div class="action-room" :class="item.uid === selectItem.uid&&!active ?'action-active':''" > 
                  <div class="rect-view-remove" @click="handleItemRomeve">删除</div>
                  <div class="rect-view-clone" @click="handleItemClone">复制</div>
                </div>
              </a-col>
            </transition-group>
          </draggable>
      
      </a-form>
        </a-layout-content>
        <a-layout-sider width="200" class="main-sider attribute-sider">
          <h4>属性</h4>
          <a-form :form="form">
            <div class="" v-for="(attr,index) in selectItemAttributeList" :key="index">
              <a-form-item :label="attr[0]" >
                  <component :defaultValue="attr[1]"  :is="getTagName(attr[0])" :value.sync="attr[1]"  @input="hangleAttrChange(attr[0],$event)"></component>
                  <!-- <component :is="getTagName(attr[0])" v-model="attr[1]" ></component> -->
                  <!-- <a-input :value="attr[1]"  /> -->
              </a-form-item>
            </div>
          </a-form>
        </a-layout-sider>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import nestedDraggable from "../cw-antd-test";
import draggable from 'vuedraggable'
import html2canvas from 'html2canvas'
import ComponentInit from "@/mixins/component.init"
import ComponentData from "@/mixins/common.data"
export default {
    name:"cw-antd-custom-view",
    props:{
      value:{
        type:String,
      },
      mode: {
        type: String,
      },
  },
  components: {
    nestedDraggable
  },
  mixins:[ComponentInit,ComponentData],
  data() {
    return {
      daData:[],
      img:null,
      active: false,
      leftWidth: 242,
      fieldType: {
        label: 'input',
        name: 'input',
        title: "input",
        tag: 'input',
        placeholder: "input",
        dependency: "dependencyView",
        dataSource: "dataSourceView",
        rules: 'ruleView',
        span: "inputNumber",
        text: "input",
        type: "input",
        titleMap:"input",
      },
      fieldTypeComponent: {
        select: 'cw-antd-input',
        input: 'cw-antd-input',
        inputNumber: "cw-antd-input-number",
        dependencyView: "cw-add-dependency-view",
        dataSourceView: "cw-add-data-source-view",
        ruleView: "cw-add-rule-view",
      },
      formLayout: 'horizontal', // horizontal vertical inline
      form: this.$form.createForm(this, { name: 'coordinated' }),
      selectItem:{},
      pageComponentList: [
        {
          uid:"75924698101",
          label: "年龄",
          tag: 'cw-antd-input-number',
          belong: "form",
          name:"age",
          rules: [
            {
              required: true,
              message: 'Input something!',
            },
          ],
          span:"1"
        },
        {
          uid:"75924698102",
          label: '地址2',
          tag: 'cw-antd-input',
          belong: "form",
          name: "address",
          span:"1",
          rules: [
            {
              rule:"required",
              message: 'Input something!',
            },
            {
              rule:"pattern",
              value:"/^123/",
              message: 'Input111 something!',
            },
          ],
         
        },
      ]
    }
  },
  components: {
      draggable,
  },
  
  mounted() {
    if (this.mode === "dev") {
      const formData = localStorage.getItem("formData")
      if (formData) {
        this.pageComponentList = JSON.parse(formData)
        console.log(this.pageComponentList)
      }
    }
    this.getComponentMapSelfProps()
  },
 
  methods: {
    handleSiderToggle() {
      const el = document.querySelector(".component-sider")
      el.classList.toggle("close")
      if(el.classList.contains("close")) {
        this.leftWidth = 242
      } else {
        this.leftWidth = 0
      }
    },

    getRectView(rect,el) {
      let createEl = document.getElementById("rect-view")
      if (!createEl) {
        createEl = document.createElement("div")
        // createEl.innerHTML = `<div class="rect-view-remove" >删除</div><div class="rect-view-clone" >复制</div>`
        //   createEl.innerHTML = ""
        //   createEl.id = "rect-view";
        createEl.style.position = "absolute"
        //   createEl.style.border = "1px dashed #ccc";
        //   createEl.style.zIndex = "999";
        //   createEl.style.pointerEvents = "none";
        //   createEl.style.boxSizing = "border-box";
        //   document.body.appendChild(createEl)
      }
     
      createEl.style.top = `${rect.top-64}px`;
      createEl.style.left = `${rect.left-240}px`;
      createEl.style.width = `${rect.width}px`;
      createEl.style.height = `${rect.height}px`;
      el.appendChild(createEl)
    },
    handleStart(event) {
      console.log(event);
    },
    getTagName(name) {
      return this.fieldTypeComponent[this.fieldType[name]]
    },
    log(e) {
      console.log(e) 
    },
    handleSubmit() {
      this.form.validateFields((err, values) => {
        if (err) {
          return;
        }
        this.$emit("submit",values)
        console.log('Received values of form: ', values);
      })
    },
    handleMoveover(e,event) {
      // console.log(event.currentTarget) 
      // event.currentTarget.style.border = "1px solid #ccc";
    },
    handleMoveout(e,event) {
      // event.currentTarget.style.border =  "0px"
    },
    handleChoose(e) {
      const index = e.oldIndex
      this.selectItem = this.pageComponentList[index]
    },
    handleRemove(e) {
      console.log(e)
    },
    handleAdd(e) {
      const index = e.oldIndex
      const targetComponent = { 
        tag: this.componentList[index].tag,
        belong:  this.componentList[index].belong
      }
      this.componentList[index].property.forEach(item => {
        targetComponent[item.name] = item.defaultValue
      })
      delete targetComponent.property
      targetComponent.uid = (Math.random()*100000000000).toFixed(0)
      const newIndex = e.newIndex
      this.pageComponentList.splice(newIndex, 0, targetComponent)
    },
    handleFormSubmit() {
     const  selectItem = this.pageComponentList.find(item => item.belong === "form" && !item.name)
      if (selectItem) {
        this.selectItem = selectItem
        this.$toast.error("请填写完整")
      } else {
        this.$emit("submit",JSON.stringify(this.pageComponentList))
        localStorage.setItem("formData",JSON.stringify(this.pageComponentList))
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
      this.selectItem[attr] = e.target.value
    },
    handleFormReset() {
      localStorage.removeItem("formData")
    },
    handleInfo() {
      console.log(this.selectItem);
    },
    handleItemRomeve() {
      this.pageComponentList =   this.pageComponentList.filter(item => item.uid !== this.selectItem.uid)
    },
    handleItemClone() {
      const item = JSON.parse(JSON.stringify(this.selectItem))
      item.uid = (Math.random() * 100000000000).toFixed(0)
      item.name =item.name + 1
      this.pageComponentList.splice(this.pageComponentList.indexOf(this.selectItem)+1, 0, item)
      this.selectItem = item
    },
    handleContentStart(e) {
      // console.log( e.originalEvent.dataTransfer);
      // e.originalEvent.dataTransfer.setDragImage(this.img,0,0)
      this.active = true
      console.log("active",this.active);
    },
    handleContentEnd() {
      this.active = false
    }
  },
  computed: {
    pageResultComponentList() {
      const arr =  this.pageComponentList.map(item => {
        item.span = Number(item.span)
        item.selfProps = {};
        (this.componentMapSelfProps[item.tag] || []).forEach(props => {
          console.log(props,item,"item");
          // if (props === "dataSource") { 
          //   item.selfProps["data-source"] = this.getDataSourceResult(item.dataSource)
          // } else {
          if (props === "titleMap") {
            item.selfProps[props]  =this.getJsonResultObj(item[props]) 
          } else if (props === "data-source") {
              
          } else {
            item.selfProps[props] = item[props]
            }

          // }
        })
        console.log(item.selfProps);
        return item
      }) 
      console.log(arr);
      return arr
    },
    selectItemAttributeList(){
      let result = []
      let blackList = ["belong","tag","uid","selfProps"]
      for (let it in this.selectItem) {
        const obj = this.selectItem[it]
        if (blackList.includes(it)) {
          continue
        }
        if (it === "label") {
          result.unshift([it,obj])
        } else {
          result.push([it,obj])
        }
      }
      return result
    }
  
  },
  watch: {
    active(val) {
      console.log(val)
      if (val) {
        const arrEl = document.querySelectorAll(".cell-room")
        arrEl.forEach(item=>item.style.border = "1px dashed #ccc")
        console.log(arrEl,"arrEl");
      } else {
        const arrEl = document.querySelectorAll(".cell-room")
        arrEl.forEach(item=>item.style.border = "0px dashed #ccc")
      }
    },
    value(val) {
      console.log(val);
      if (this.mode !== "dev") {
        this.pageComponentList = JSON.parse(val)
      }
    },
    selectItem(val) {
      console.log(val);
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

<style scoped>
.main-sider{
  /* max-width: 242px !important; */
  background: #fff;
  overflow: auto;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  height: 100vh;
}
.attribute-sider{
  padding: 10px;
}
.component-list-body{
  display: flex;
  flex-wrap: wrap;
}
.component-item{
  width:80px;
  height: 40px;
  border:  1px dashed #ccc;
  align-items: center;
  display: flex;
  justify-content: center;
  user-select: none;
  cursor: pointer;
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
  z-index: 5000;
}
.rect-view-remove{
  right: 0px;
}

.rect-view-clone{
  right: 30px;
}


.component-sider{
  transition: all 0.3s;
  flex: 1 1 300px !important;
}
.component-sider.close{
  transition: all 0.3s;
  flex: 1 1 0px;
}

.active-cell{
  box-shadow: 0px 0px 1px 1px #ccc;
}

.action-room{
  display: none;
  opacity: 0;
  transition: all 4s;
}

.action-active{
  display: block;
  opacity: 1;
  transition: all 2s;
}

</style>