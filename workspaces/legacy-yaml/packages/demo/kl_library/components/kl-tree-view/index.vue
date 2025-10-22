<template>
  <div class="room">
  <div class="body">
   <a-tabs default-active-key="1">
    <a-tab-pane key="1" tab="机构">
      <div style="height:300px;overflow:auto"> 
       <a-tree :replaceFields="{children:'children', title:'deptName', key:'deptId'}" checkStrictly :checkedKeys="leftValue" @check="handleDeptTreeCheck" :load-data="onLoadData" :tree-data="treeData" checkable />
      </div>
    </a-tab-pane>
    <a-tab-pane key="2" tab="人员">
      <div class="tree-room"   style="height:300px;overflow:auto"> 
         <div class="tree-left-room">
            <a-tree :replaceFields="{children:'children', title:'deptName', key:'deptId'}" :load-data="onLoadData" :tree-data="treeData" @select="handleSelect"  />
         </div>
        <div class="tree-right-room" >
            <a-row>
              <a-col :span="24" v-for="(item,index) in rightList" :key="index">
                 <a-checkbox :checked="rightValue.includes(item.value)"  @change="handleUserCheckBoxChange" :value="item.value"> {{item.title}}</a-checkbox>
               </a-col>
            </a-row>
        </div>
      </div>
    </a-tab-pane>
     <a-tab-pane key="3">
      <span slot="tab">
        <a-input  @change="handleInputChange"></a-input>
      </span>
      <div class="tree-room">
        <div class="tree-room-cell">
          <h3> 机构</h3>
            <a-row>
              <a-col :span="24" v-for="(item,index) in deptList" :key="index">
                  <a-checkbox  :checked="leftValue.includes(item.deptId)"  @change="handleSearchDeptCheckBoxChange"  :value="item.deptId"> {{item.title}}</a-checkbox>
              </a-col>
            </a-row>
        </div>
        <div class="tree-room-cell">
          <h3> 人员</h3>
            <a-row>
              <a-col :span="24" v-for="(item,index) in userList" :key="index">
                  <a-checkbox  :checked="rightValue.includes(item.value)"  @change="handleSearchUserCheckBoxChange" :value="item.value"> {{item.title}}</a-checkbox>
              </a-col>
            </a-row>
        </div>
      </div>
    </a-tab-pane>
  </a-tabs>
  </div>
  <div class="footer">
    <a-tag :visible="leftValueData.includes(item)" v-for="item in leftValueData" color="#108ee9" :key="item.deptId" closable @close="handleDeptClose(item)"> {{item.deptName}}  </a-tag>
    <a-tag :visible="rightValueData.includes(item)" v-for="item in rightValueData" color="#108ee9" :key="item.value" closable @close="handleClose(item)"> {{item.title}}  </a-tag>
  </div>
  </div>
</template>

<script>
import { Tabs,Tree,Row,Col,Checkbox,Input,Tag } from 'ant-design-vue';
import axios from "axios"
export default {  

    name:"kl-tree-view",
    components:{
      "a-tabs":Tabs,
      "a-tab-pane":Tabs.TabPane,
      "a-tree":Tree,
      "a-row":Row,
      "a-col":Col,
      "a-checkbox":Checkbox,
      "a-input":Input,
      "a-tag":Tag
    },
    props:{
      value:{
        type:Array,
      },
      valueUserList:{
         type:Array,
      },
      valueDeptList:{
        type:Array
      }
    },
    data(){
      return {
        rightValue:[], // 选中人员id
        leftValue:[],    // 选中机构id
        leftValueData:[], //选中机构的数据结构
        rightValueData:[], //选中人员的数据结构
        treeData: [
          { title: 'Expand to load', key: '0' },
          { title: 'Expand to load', key: '1' },
          { title: 'Tree Node', key: '2', isLeaf: true },
        ],
        rightList:[], // 机构查询人员李彪
        deptList:[], // 模糊匹配的机构
        userList:[], // 模糊匹配的人员
        fatherDeptList:[] // 顶级机构列表id
      }
    },
    watch:{
      value:{
        handler(val){
          this.treeData = (val||[]).map(item=> {item.value=item.ancestors;return item })
          this.fatherDeptList = (val||[]).map(item=>item.deptId)
        },
        deep:true,
        immediate:true
      },
      leftValue(val){
        this.$emit("update:valueDeptList",val)
      },
      rightValue(val){
        this.$emit("update:valueUserList",val)
      },
      leftValueData(val){
        this.leftValue = val.map(item=>item).map(item=>item.deptId)
      },
      rightValueData(val){
        this.rightValue = val.map(item=>item).map(item=>item.userId)
      },
    },
    async mounted(){
      console.log(this.valueUserList);
        const result =  await this.getUserByList({idList:this.valueUserList})
        this.rightValueData = result.map(item=>{
            item.title = item.displayName
            item.key = item.userId
            item.value = item.userId
            return item
        })
        this.leftValueData = await this.getDepartmentByList({idList:this.valueDeptList})
    },
    methods:{
        async getDepartmentByList(data){
         const result = await axios.post("/api/lcplogics/getDepartmentByList",{
          ...data
        })
        if(result.data.Code===200){
          return result.data.Data
        }else{
          throw new Error(result.data.Message)
        }
      },
      async getUserByList(data){
         const result = await axios.post("/api/lcplogics/getUserByList",{
          ...data
        })
        if(result.data.Code===200){
          return result.data.Data
        }else{
          throw new Error(result.data.Message)
        }
      },
      /* 
       * departId
       * name
       */
      async getUserList(data){
        const result = await axios.post("/api/lcplogics/getUserListByDepartmentId",{
          ...data
        })
        if(result.data.Code===200){
          return result.data.Data
        }else{
          throw new Error(result.data.Message)
        }
      },
      /* 
       * {departName:departName}
       */
      async getDepartList(data){
        const result = await axios.post("/api/lcplogics/getDepartListByDepartName",{
          ...data
        })
        if(result.data.Code===200){
          return result.data.Data
        }else{
          throw new Error(result.data.Message)
        }
      },
      /* 
       *  id=100100
       */
      async getChildDepartmentById(data){
        const result = await axios.post("/api/lcplogics/getChildDepartmentById",{
          ...data
        })
        if(result.data.Code===200){
          return result.data.Data
        }else{
          throw new Error(result.data.Message)
        }
      },
      /*
      * 输入框选择 
       */
     async handleInputChange (e){
        if(e.target.value){
          const resultDepart = await this.getDepartList({departName:e.target.value})
          const resultUser =  await this.getUserList({name:e.target.value})
          this.deptList = resultDepart.map(item=>{
            item.title = item.deptName
            item.key = item.deptId
            item.value = item.ancestors
            return item
          })
          this.userList = resultUser.map(item=>{
            item.title = item.displayName
            item.key = item.userId
            item.value = item.userId
            return item
          })
        }else{
            this.userList = []
            this.deptList = []
        }
   
      },
     async handleSelect(e){
        const result = await this.getUserList({departId:e[0]})
        this.rightList = result.map(item=>{
          item.title = item.displayName
          item.key = item.userId
          item.value = item.userId
          return item
        })
      },
      handleClose(e){
        this.rightValueData = this.rightValueData.filter(item=>item.userId!=e.userId)
        // this.rightValue = this.rightValue.map(item=>item.deptId)
      },
      handleDeptClose(e){
        this.leftValueData = this.leftValueData.filter(item=>item.deptId!=e.deptId)
        // this.leftValue = this.leftValueData.map(item=>item.deptId)
      },
      handleCheckBoxChange(e){
        console.log(e);
      },
      /* 机构选择 */
      handleDeptTreeCheck(e,a,b){
        this.leftValueData = this.leftValueData.filter(item=>{
          console.log(item.ancestors,a.node.value,a.node.eventKey,item.ancestors.indexOf(a.node.value+","+a.node.eventKey));
          return item.ancestors.indexOf(a.node.value+","+a.node.eventKey) !== 0 
        })
        if(a.checked){
          (a.node.dataRef.children||[]).map(item=>{item.disabled = true;return item})
          this.leftValueData.push({deptId:a.node.eventKey,deptName:a.node.title,ancestors:a.node.value})
        }else{
           (a.node.dataRef.children||[]).map(item=>{item.disabled = false;return item})
          this.leftValueData =  this.leftValueData.filter(item=>item.deptId!==a.node.eventKey)
        }
      },
      handleUserCheckBoxChange(e){
        // console.log(e);
        if(e.target.checked){
          const targ =  this.rightList.find(item=>item.value===e.target.value)
          this.rightValueData.push( targ)
        }else{
         this.rightValueData =  this.rightValueData.filter(item=>item.value!== e.target.value)
        }
         this.rightValue = this.rightValueData.map(item=>item.value)
      },
      handleSearchUserCheckBoxChange(e){
        if(e.target.checked){
          const targ =  this.userList.find(item=>item.value===e.target.value)
          this.rightValueData.push( targ)
        }else{
         this.rightValueData =  this.rightValueData.filter(item=>item.value!== e.target.value)
        }
         this.rightValue = this.rightValueData.map(item=>item.value)
      },
      /* 搜索机构选择 */
      handleSearchDeptCheckBoxChange(e){
        // console.log(this.deptList,e.target.value);
      if(e.target.checked){
          const targ =  this.deptList.find(item=>item.deptId===e.target.value)
          this.leftValueData.filter( item=>item.ancestors.indexOf(targ.ancestors))
          this.leftValueData.push( targ)
        }else{
         this.leftValueData =  this.leftValueData.filter(item=>item.deptId!== e.target.value)
        }
         this.leftValue = this.leftValueData.map(item=>item.value)
      },
      async onLoadData(treeNode){
        if (treeNode.dataRef.children) {
            return;
        }
        const result = await this.getChildDepartmentById({
          id:treeNode.eventKey
        })
        result.map(item=>{
          item.disabled = treeNode.checked
          item.checked = treeNode.checked
          item.value =item.ancestors;
          return item
        })
        return new Promise(resolve => {
            treeNode.dataRef.children = result
            this.treeData = [...this.treeData];
            resolve();
        });
      }
    }
}
</script>

<style>
.room{
  height: 400px;
}
.tree-room{
  display: flex;
  flex-direction: row;
}
.tree-left-room{
  width: 300px;
  flex:1
}
.tree-right-room{
  width: 300px;
  padding: 10px 0;
  height: 200px;
  overflow: auto;
}
.footer{
  height: 200px;
}
.tree-room-cell{
  flex:1;
}
</style>