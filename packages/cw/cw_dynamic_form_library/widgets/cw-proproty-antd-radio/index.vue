<template>
  <div style="width:100%" class="cw-antd-radio">
    <template  v-if="sourceList.length">
    <template  v-if="viewType==='button'">
    <a-radio-group 
      style="width:100%"
      v-bind="[$attrs, $props]" v-on="$listeners"
      v-model="currentValue" @change="handleChange">
      
      <template >
        <a-radio-button v-for="(item,index) in sourceList" :key="index" :value="item.value"  > {{ item.label }}</a-radio-button>
      </template>
      </a-radio-group>
    </template>
  <template  v-else>
    <a-radio-group 
      style="width:100%"
      class="cw-radio-view-group"
      :class="direction==='horizontal'?'cw-group-horizontal':'cw-group-vertical'"
      v-bind="[$attrs, $props]" v-on="$listeners"
      v-model="currentValue" @change="handleChange">
      <template>
         <a-radio v-for="(item,index) in sourceList" :key="index" :value="item.value"  > {{ item.label }}</a-radio>
          <div class="othor-radio-room"  v-if="otherData">
            <a-radio  :value="otherContent"  > {{otherData }}</a-radio> 
            <a-input style="max-width:200px"  @input="handleInputChange"></a-input> 
         </div>
      </template>
    </a-radio-group>
    </template>
    </template>
    <a-radio v-else>在设计器中或没有数据源</a-radio>
  </div>
</template>

<script>
import supportDatasource from "@/mixins/support.datasource";
export default {
    name:"cw-antd-radio",
    props:{
      value:{
        type:String|Number,
      },
      viewType:{
        type: String,
      },
      otherData:{
        type:String,
      },
      direction:{
        type: String,
        default:"horizontal"
      },
      dataSource:{
         type: Array,
         default:()=>[]
      }
  },
  mixins: [supportDatasource],
  data() {
    return {
      sourceList: [],
      currentValue:null,
      otherContent:""
    };
  },
  methods: {
    handleInputChange(e){
      this.otherContent = e.target.value
      this.currentValue = e.target.value
    },
    handleChange(value){
      console.log(value,222);
    }
  },
  watch: {
    value:{
      handler(val){
        this.currentValue = val
      },
      immediate: true
    },
     currentValue:{
        handler(val){
          this.$emit('update:value', val)
          this.$emit('onChange',val)
          this.$emit('change',val)
        },
      },
      dataSource:{
         handler(val){
          this.sourceList = this.currentDataSource.data
         }
      }
  },
  async mounted() { 
    await this.load()
    // console.log(this.currentDataSource,"this.currentDataSource");
    this.sourceList = this.currentDataSource.data
  },
}
</script>

<style>
.othor-radio-room{
  display: flex;
  align-items: center;
  flex: 1;
  width: 100%;
}

.cw-antd-radio .ant-radio-wrapper{
  display: flex !important;  
  align-items: center !important;
  height: 40px;
}
.cw-radio-view-group{
  display: flex !important;
  flex-wrap: wrap;
}
.cw-group-vertical{
  flex-direction: column;
}

.cw-group-vertical input{
  width: 100%
}
</style>