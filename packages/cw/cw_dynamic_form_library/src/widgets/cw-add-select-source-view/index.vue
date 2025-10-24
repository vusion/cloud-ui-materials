<template>
    <div class="select-source-view-room">
        <div class="source-view-cell" v-for="(item,idx) in currentList" :key="item.uid">
          <a-input @blur="handleBlur(item,$event)" :value="item.value" ></a-input>
          <a-icon
              style="font-size:16px;margin-left:8px"
              type="delete"
              @click="handleRemove(idx)"
          />
        </div>
        <a-button @click="handleAdd">添加</a-button>
    </div>
</template>
<script>
import { generateRandomNumber } from "@/utils";
import conmmonData from "@/mixins/common.data";
export default {
    name:"cw-add-select-source-view",
    mixins:[conmmonData],
    props:{
      value:{
        type:String|Array,
      }
    },
    data() {
        return {
            currentList:[1,2,3].map(item=>  ({
              uid:generateRandomNumber(10),
              label:'选项'+item,
            })),
            selectList:[]
        }
    },
    watch:{
      value:{
        handler(val){
          console.log(val,"valll");
          if(val){
            const arr = this.getJsonResultArr(val)
            this.currentList = arr.map(item=> ({
              uid:generateRandomNumber(10),
              label:item.label,
              value:item.value
            }))
          }else{
            this.currentList = [1,2,3].map(item=>  ({
              uid:generateRandomNumber(10),
              label:'选项'+item,
            }))
          }
        },
        immediate:true
      },
      currentList: {
        handler(val, oldVal) {
          const arr = val.map(item => {
            const _item = {...item}
            delete _item.uid
            _item.label = _item.value
            return _item
          });
          this.$emit('change', JSON.stringify(arr) )
          this.$emit('onInput', JSON.stringify(arr) )
          this.$emit('update:value', JSON.stringify(arr))
        },
        deep: true,
        immediate:true
      }  
    },
    mounted(){
    },
    methods:{
        handleBlur(item,event){
          // console.log(item,event);
          item.value = event.target.value
          // console.log(e);
        },
        handleRemove(idx){
            this.currentList.splice(idx,1)
        },
        onChange(checkedValues){
          console.log(checkedValues);
        },
        handleAdd(){
          this.currentList = [...this.currentList,{
             value:'选项'+(this.currentList.length+1),
             uid:generateRandomNumber(10),
          }]
        }
    }
}
</script>
<style>
.select-source-view-room{
  display: flex;
  flex-direction: column
}
.source-view-cell{
  display: flex;
  align-items: center;
  margin-bottom: 4px;
  /* padding: 4px; */
}
.source-view-cell:hover{
  /* background: #cccccc63; */

}
</style>