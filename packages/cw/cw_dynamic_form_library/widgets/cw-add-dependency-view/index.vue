<template>
  <div>
    <a-modal
        width="550px"
        title="展示规则设置"
        :visible="visible"
        :getContainer="getPopupContainer"
        @cancel="handleCancel"
        :footer="null"
      >
      <div v-if="currentList.length==0">
        暂无数据，请添加展示规则
      </div>
      <div v-else>
          <div style="color:red;margin-top:-10px;margin-bottom:4px;font-size:12px"> 满足以下条件时，本组件将会展示</div>
        <div class="dependency-cell-room" style="font-size:14px">
          <div class="dependency-cell"></div>
          <div class="dependency-cell">字段名称</div>
          <div class="dependency-cell">联动关系</div>
          <div class="dependency-cell">匹配的值</div>
          <div class="dependency-cell"></div>
        </div>
      <div
        class="dependency-cell-room"
        v-for="(item, index) in currentList"
        :key="index"
      >
         <div class="dependency-cell">
            <!-- <div v-if="index===0">条件</div>  -->
            <a-select v-if="index!==0" v-model="item.type" style="width:50px"  :getPopupContainer="getPopupContainer" defaultValue="1" >
              <a-select-option value="1">
                且
              </a-select-option>
              <a-select-option value="2">
                或
              </a-select-option>
            </a-select>
         </div>
         <div class="dependency-cell">
            <a-select  style="width:100%" v-model="item.name" placeholder="请选择" :getPopupContainer="getPopupContainer" >
             <a-select-option :key="item.value" :value="item.value" v-for="item in getNameList()">
                {{item.label}}
              </a-select-option>
            </a-select>
         </div>
         <div class="dependency-cell">
            <cw-antd-select  style="width:100%" :dataSource="dependencyList"  :value.sync="item.calculation"> </cw-antd-select>
         </div>
          <div class="dependency-cell">
              <a-input placeholder="请输入匹配的值" v-model = "item.value"></a-input>
          </div>
        <a-icon
          style="font-size:16px"
          type="delete"
          @click="handleRemove(index)"
        />
      </div>
      </div>
      <a-button style="margin-left:-16px" type="link" @click="handleAdd">+添加规则</a-button>
        
        <!-- <div class="dependency-cell"  v-for="(item,index) in currentList" :key="index">
            <a-input placeholder="请输入名称" style="width: 100%;" v-model = "item.name"></a-input>
            <cw-antd-select :dataSource="dependencyList" @change="handleChange" :value.sync="item.dependency"> </cw-antd-select>
            <a-input placeholder="请输入描述" v-model = "item.value"></a-input>
            <a-button  @click="handleRemove(index)" type="danger"><a-icon type="close" /></a-button>
        </div> --> 
      </a-modal>
      <div class="input-cell" v-for="(it,idx) in currentDependencyValue " :key="idx">
      <a-input :value="it" readOnly></a-input>
        <a-icon
            style="font-size:16px;margin-left:8px"
            type="delete"
            @click="handleRemove(idx)"
          />
      </div>
       <a-button type="dashed" style="width:100%" @click="handleShow">点击添加展示规则</a-button>
  </div>
</template>

<script>
import commonSelectMix from "@/mixins/common.select";
export default {
    name:"cw-add-dependency-view",
    props:{
      value:{
        type:Array,
        default:()=>[]
      }
    },
    mixins:[commonSelectMix],
    data() {
      return {
        visible:false,
        currentList: [],
        dependencyList: [{
          value: "===",
          label: "等于"
        },
        {
          value:">",
          label: "大于"
          },
          {
          value:"<",
          label: "小于"
          }, {
          value:"!=",
          label: "不等于"
        },{
          value:"includesFun",
          label: "包含"
        },{
          value:"unIncludesFun",
          label: "不包含"
        }]
      }
  },
  inject: ["getNameList"],
  watch: {
    value:{
      handler(val) {
        this.currentList = val
      },
      immediate: true
    },
    currentList: {
      handler(val, oldVal) {
        const arr = val.filter(item => item.value);
        console.log(arr);
        this.$emit('onChange', arr)
        this.$emit('update:value', arr)
      },
      deep: true
    }  
  },
  computed:{
    // getNameListArr(){
    //     return this.getNameList()
    // },
    currentDependencyValue(){
      return this.currentList.map(item=>{
        let str = ''
        const label =  this.dependencyList.find(it=>item.calculation===it.value) 
        const name = this.getNameList().find(it=>item.name===it.value)
        if(label){
          str += '字段'+(name.label||'${}') + label.label + (item.value||"空") + '时展示'
        }  
        return str
      })
    }
  },
  methods: {
    handleShow(){
      this.visible=true
    },
    handleCancel(){
       const emptyItem =  this.currentList.find(item=>(!item.name||!item.calculation))
       if(emptyItem){
        this.$message1.error('内容不完整')
       }else{
          this.visible = false
       }
    },
    handleAdd() {
      this.currentList.push({
          type:"1",
          name:undefined,
          value: undefined,
          calculation: undefined,
        })
    },
    handleRemove(index) {
      this.currentList.splice(index, 1)
    },
    onClose() {
      this.visible = false;
    },
  }
    
}
</script>

<style scoped>
.dependency-cell-room {
  font-size: 14px;
  display: flex;
  align-items: center;
  /* justify-content: center; */
}

.dependency-cell-room>div:first-child {
  width: 60px;
}

.dependency-cell-room>div:nth-child(2) {
  width: 184px;
}

.dependency-cell-room>div:nth-child(3) {
  width: 100px;
}

.dependency-cell-room>div:nth-child(4) {
  width: 190px;
}

.dependency-cell {
  margin-right: 8px;
  margin-top: 6px;
  margin-bottom: 6px;
}
.input-cell{
  display:flex;
  align-items:center;
  margin-top:6px;
  margin-bottom:6px;
}
</style>