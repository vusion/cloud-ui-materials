<template>
  <div>
     <a-checkbox-group style="width:100%" v-if="dataSource.length"
      v-model="currentValue"
      @change="handleChange"
      v-bind="[$attrs, $props]" 
      class="cw-checkbox-with-input-view-group"
    >
      <a-checkbox  v-for="(item,index) in dataSource" :key="index" :value="item.value"  > 
         <div class="cw-checkbox-with-input-cell"> <span>{{ item.label }}</span>  <a-input  :disabled="disabled"  v-if="!linkage ||currentValue.includes(item.value)" style="max-width:200px" @change="handleInputChange"  v-model="currentListValue[index].value" ></a-input> 
         </div>
      </a-checkbox>
       <!-- <div class="othor-radio-room"  v-if="otherData">
            <a-checkbox  :value="otherContent"  > <span style="white-space: nowrap;" >{{otherData }}</span> </a-checkbox> 
            <a-input style="max-width:200px"  @input="handleInputChange" :value="otherContent" ></a-input> 
         </div> -->
    </a-checkbox-group>
    <!-- <div @click="handleClick">222</div> -->
  </div>
</template>

<script>
export default {
    name:"cw-antd-checkbox-with-input",
    props:{
      value:{
        type:Array,
        default:()=>[]
      },
      dataSource:{
        type:Array,
        default:()=>[]
      },
      disabled:{
        type:Boolean,
        default:false
      },
      linkage:{
        type:Boolean,
        default:false
      }
    },
    data(){
      return {
        currentValue:[],
        currentListValue:[]
      }
    },
    // computed:{
    //   dataObj(){
    //     const {value,dataSource} = this
    //     return {value,dataSource}
    //   }
    // },
    watch:{
      // dataObj:{
      //   handler(newVal,oldVal){
      //     if(newVal.dataSource!= oldVal.dataSource){
      //         this.currentListValue = newVal.dataSource.map(item=>({title:item.value,value:''}))
      //     }
      //     if(newVal.value!= oldVal.value){
      //         const _currentListValue = JSON.parse(JSON.stringify(this.currentListValue))
      //         const {value} = newVal
      //         let arr = []
      //         value.forEach(item=>{
      //           const [title,value] =  item.split("-")
      //           arr.push(title)
      //           _currentListValue.find(item=>item.title===title).value = value
      //         })
      //         this.currentValue = arr
      //         this.currentListValue = _currentListValue
      //      }
      //   },
      //   deep:true
      // },
      value:{
        handler(value){
          console.log(value,111);
          if(value){
            let _currentValue = []
            const  _currentListValue = this.dataSource.map(item=>({title:item.value,value:''}))
            value.forEach(item=>{
              const [key,inputValue] = item.split("-")
              _currentValue.push(key)
              _currentListValue.find(item=>item.title===key).value = inputValue
            })
            this.currentValue  = _currentValue
            this.currentListValue = _currentListValue

          //     const _currentListValue = JSON.parse(JSON.stringify(this.currentListValue))
          //     // const {value} = newVal
          //     let arr = []
          //     value.forEach(item=>{
          //       const [title,value] =  item.split("-")
          //       arr.push(title)
          //       _currentListValue.find(item=>item.title===title).value = value
          //     })
          //     this.currentValue = arr
          //     this.currentListValue = _currentListValue
          }else{
            this.currentValue  = []
            this.currentListValue = []
          }
         
        },
        deep:true,
        immediate:true
      },
      // dataSource:{
      //   handler:(value)=>{
      //     console.log(value);
      //     if(value){
      //         this.currentListValue = value.map(item=>({title:item.value,value:''}))
      //     }else{
      //         this.currentListValue = []
      //     }
      //   },
      // },
      // currentListValue:{
      //   handler(value){
      //     const arrValue =  value.map(item=>item.title+"-"+(item.value||''))
      //     console.log(arrValue,222);
      //     this.$emit('update:value', arrValue)
      //     // this.$emit('change', arrValue)
      //   },
      //   deep:true
      // }
      dataSource:{
        handler(value){
            const _currentListValue = (value ||[]).map(item=>({title:item.value,value:''}))
            this.currentListValue = _currentListValue
        },
        deep:true
      }
    },
    mounted(){
      // const _currentListValue = this.dataSource.map(item=>({title:item.value,value:''}))
      // let arr = []
      // this.value.forEach(item=>{
      //   const [title,value] =  item.split("-")
      //   arr.push(title)
      //   _currentListValue.find(item=>item.title===title).value = value
      // })
      // this.currentValue = arr
      // this.currentListValue = _currentListValue
    },
    methods:{
      handleClick(){
        console.log(this.currentListValue);
      },
      handleChange(e){
        this.currentListValue.map(item=>{
          if(!e.includes(item.title)){
            item.value=undefined
          }
        })
        const arrValue = this.currentListValue.filter(item=>e.includes(item.title)).map(item=>(item.title+"-"+(item.value||'')))
        this.$emit('update:value', arrValue)
        this.$emit('change', arrValue)
        console.log(this.currentListValue);
      },
      handleInputChange(){
        const arrValue = this.currentListValue.filter(item=>this.currentValue.includes(item.title)).map(item=>(item.title+"-"+(item.value||'')))
        this.$emit('update:value', arrValue)
        this.$emit('change', arrValue)
      }
    }
}
</script>

<style scoped>
.cw-checkbox-with-input-cell{
  display: flex;
  align-items: center;
  justify-content: center;
}
.cw-checkbox-with-input-cell span{
  margin-right: 10px;
}

.cw-checkbox-with-input-cell input{
  width: 200px;
}

.cw-checkbox-with-input-view-group{
  display: flex;
  flex-direction: column;
}
</style>