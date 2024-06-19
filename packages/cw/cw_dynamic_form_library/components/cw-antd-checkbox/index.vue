<template>
  <div style="width:100%">
   <a-checkbox-group style="width:100%" v-if="sourceList.length"
      v-model="currentValue"
      v-bind="[$attrs, $props]" 
      class="cw-checkbox-view-group"
      :class="direction==='horizontal'?'cw-group-horizontal':'cw-group-vertical'"
    >
      <a-checkbox  v-for="(item,index) in sourceList" :key="index" :value="item.value"  > {{ item.label }}</a-checkbox>
       <div class="othor-radio-room"  v-if="otherData">
            <a-checkbox  :value="otherData"  > <span style="white-space: nowrap;" >{{otherData }}</span> </a-checkbox> 
            <a-input  v-if="!linkage||(currentValue||[]).includes(otherData)" style="max-width:200px" :disabled="disabled"  v-model="currentInputValue" ></a-input> 
         </div>
    </a-checkbox-group>
    <a-checkbox v-else>在设计器中或没有数据源</a-checkbox>
  </div>
</template>

<script>
import supportDatasource from "@/mixins/support.datasource";
export default {
    name:"cw-antd-checkbox",
    props:{
      value:{
        type:Array,
      },
      otherData:{
        type:String
      },
       direction:{
        type: String,
        default:"horizontal"
      },
      disabled:{
        type:Boolean,
        default:false
      },
      linkage:{
        type:Boolean,
        default:true
      }
    },
  mixins: [supportDatasource],
  data() {
    return {
      sourceList: [],
      currentValue:null,
      currentInputValue:'',
    };
  },
  computed:{
    currentData(){
      return {
        currentValue:this.currentValue,
        currentInputValue:this.currentInputValue
      }
    }
  },
  watch: {
    value:{
      handler(val,oldValue){
          this.init(val)
      },
      deep:true,
      immediate: true
    },
    currentData:{
        handler(val,oldValue){
          const {currentValue,  currentInputValue} = val
          const {currentValue:c1,  currentInputValue:c2} = oldValue
          if(currentValue&& currentValue.length !== c1.length ){
            const res =  (currentValue||[]).map(item=>{
              if(item === this.otherData){
                return item+"->" + currentInputValue
              }
              return item 
            })
           this.$emit("change",res)
          }
          if(currentInputValue !== c2){
            const res =  (currentValue||[]).map(item=>{
              if(item === this.otherData){
                return item+"->" + currentInputValue
              }
              return item 
            })
           this.$emit("change",res)
          }
        },
        deep:true
      },
      dataSource:{
         handler(val){
          this.sourceList = this.currentDataSource.data
         }
      }
  },
  methods:{
    init(value){
      this.currentValue = (value||[]).map(item=>{
        const [v,currentInputValue]=item.split('->')
        if(v===this.otherData){
          this.currentInputValue = currentInputValue
        }
        return v
      })
    },
  },
  async mounted() { 
    await this.load()
    console.log(this.value);
    this.sourceList = this.currentDataSource.data
    // this.init(this.value)
  },
    
}
</script>

<style>
.othor-radio-room{
  display: flex;
  align-items: center
}

.ant-checkbox-wrapper{
  display: flex !important;  
  align-items: center !important;
  height: 40px;
}
.ant-checkbox-wrapper + .ant-checkbox-wrapper {
margin-left: 0 !important;

}
.cw-checkbox-view-group{
   display: flex !important;
  flex-wrap: wrap;
}

.cw-group-horizontal .ant-input{
 /* width: 180px*/
}
</style>