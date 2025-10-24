<template>
  <div>
    <cw-antd-select :value.sync="currentValue.type"  @change="handleTypeChange" :data-source="dataSourceList"></cw-antd-select>
    <a-textarea v-if="currentValue.type === '2'" v-model="currentValue.des" placeholder="请输入描述"></a-textarea>
    <cw-add-select-img-view v-else-if="currentValue.type === '3'" @change="handleChange" :value="currentValue.des" ></cw-add-select-img-view> 
    <cw-add-select-source-view v-else @change="handleChange" :value="currentValue.des" ></cw-add-select-source-view>
  </div>
</template>

<script>
import cwAddSelectSourceView from "@/widgets/cw-add-select-source-view/index.vue";
import cwAddSelectImgView from "@/widgets/cw-add-select-img-view/index.vue";
export default {
  name:"cw-add-data-source-view",
  props:{
    value:{
      type:Object,
    }
  },
  components:{
    cwAddSelectSourceView,
    cwAddSelectImgView
  },
  data() {
    return {
        dataSourceList: [
          { value: "1", label: "简单模式" },
          { value: "2", label: "自定义数据" },
          { value: "3", label: "图文模式" },
        ],
        currentValue: {
            type:"1",
           
        },
      }
  },
  watch: {
    value:{
      handler(val) {
        console.log(val,"val");
        if (val&&val.type) {
          this.currentValue = val
        } else {
          this.currentValue = {
            type:'1',
            des:'[{"label":"选项1","value":"选项1"},{"label":"选项2","value":"选项2"},{"label":"选项3","value":"选项3"}]'
          }
        }
      },
      immediate: true
    },
    currentValue: {
      handler(val, oldVal) {
        this.$emit('onChange', val)
        this.$emit('change', val)
        // this.$emit('update:value', val)
        // this.$emit("onInput",val)
      },
      deep: true,
      immediate: true
    },
  },

  methods: {
    handleChange(val){
      // console.log(val);
      this.currentValue = {
        ...this.currentValue,
        des:val
      }
    },
    handleTypeChange(val) {
      this.currentValue = {
        ...this.currentValue,
        type: val
      }
    },
    handleDesChange(e) {
      this.currentValue = {
        ...this.currentValue,
        des : e.target.value
      }
    }
  }
}
</script>

<style>

</style>