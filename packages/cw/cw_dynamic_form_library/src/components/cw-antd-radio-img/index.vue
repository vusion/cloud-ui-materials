<template>
   <div class="cw-antd-radio-img" :class="layoutClass">
    <a-radio-group 
     v-bind="[$attrs, $props]" v-on="$listeners"
      class="radio-group-container"
       v-model="currentValue" @change="handleChange"
    >
      <div 
        v-for="(item, index) in sourceList" 
        :key="index"
        class="radio-item"
      >
          <a-radio :value="item.value" class="option-radio">
            <p>{{ item.label }}</p>
            <img 
            v-if="item.img" 
            :src="item.img"
            class="option-img"
            :style="{ width: imgWidth + 'px' }"
          />
          </a-radio>
      </div>
    </a-radio-group>
  </div>
</template>

<script>
export default {
    name:"cw-antd-radio-img",
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
      },
       disabled:{
        type:Boolean,
        default:false
      },
      linkage:{
        type:Boolean,
        default:true
      },
      // left-img-right-text: 左图右文
      // left-text-right-img: 左文右图
      // top-img-bottom-text: 上图下文
      // top-text-bottom-img: 上文下图
      layout: {
        type: String,
        default: 'left-img-right-text', // 可选值：left-img-right-text/left-text-right-img/top-img-bottom-text/top-text-bottom-img
        validator: function(value) {
          return ['left-img-right-text', 'left-text-right-img', 'top-img-bottom-text', 'top-text-bottom-img'].indexOf(value) !== -1
        }
      },
      imgWidth: { 
        type: Number,
        default: 100
      }
  },
    data() {
    return {
      sourceList: [],
      currentValue:null,
      currentInputValue:'',
    };
  },
  methods: {
    handleInputChange(e){
      if(this.currentValue != this.otherData){
        this.currentValue = this.otherData
      }
      this.currentInputValue  = e.target.value
      console.log(this.otherData+(e.target.value?'->'+e.target.value:''));
      this.$emit('update:value', this.otherData+(e.target.value?'->'+e.target.value:''))
      this.$emit('onChange',this.otherData+(e.target.value?'->'+e.target.value:''))
      this.$emit('change',this.otherData+(e.target.value?'->'+e.target.value:''))
    },
    handleChange(value){
      console.log(value,222);
    }
  },
  computed:{
      dataObj(){
        return {
          currentValue:this.currentValue,
          currentInputValue:this.currentInputValue
        }
      },
      layoutClass() {
        return `layout-${this.layout}`
      }
  },
  watch: {
    value:{
      handler(val){
        if(val === undefined || val === null){
          return
        }
        if(typeof val === 'number'){
          this.currentValue = val
          return
        }
        if(typeof val ==='string'){
          this.currentValue = val
          if(val.indexOf("->") === -1){
              console.log(this.dataSource.map(item=>item.label),val);
            if(!this.dataSource.map(item=>item.label).includes(val)){
              this.currentValue = this.otherData
              this.currentInputValue = this.otherData!==val? val:''
            }
          }else{
            const [ currentValue,currentInputValue ] = val.split("->")
            this.currentValue = currentValue
            this.currentInputValue = currentInputValue
          }
        }
      
      },
      immediate: true
    },
    dataObj:{
      handler(val){
        const {currentValue,currentInputValue} = val
        if( currentValue === this.otherData ){
          this.$emit('update:value', currentValue+(currentInputValue?'->'+currentInputValue:''))
          this.$emit('onChange',currentValue+(currentInputValue?'->'+currentInputValue:''))
          this.$emit('change',currentValue+(currentInputValue?'->'+currentInputValue:''))
        }else{
          this.$emit('update:value', currentValue)
          this.$emit('onChange',currentValue)
          this.$emit('change',currentValue)
        }
      },
      deep:true,
      // immediate:true
    },
      dataSource:{
         handler(val){
          console.log(val,111);
          this.sourceList = this.currentDataSource.data.map(item=>{
            const [label,img] = item.value.split("%%")
            return {
              ...item,
              label:label,
              img:img
            }
            // return {
            //   img:item.fileUrl,
            //   label:item.label,
            //   value:item.value
            // }
          })
         },
      }
  },
  async mounted() { 
    await this.load()
    this.sourceList = this.currentDataSource.data.map(item=>{
      console.log(item,111);
      const [label,img] = item.value.split("%%")
      return {
        ...item,
        label:label,
        img:img
      }
    })
  },
}
</script>

<style scoped>



.cw-antd-radio-img .radio-item{
  display: flex;
  flex-direction: column;
}

.cw-antd-radio-img .ant-radio-wrapper{
  display: flex;
}

.cw-antd-radio-img .ant-radio-wrapper > span{
  display: flex;
  flex-direction: column;
}

.cw-antd-radio-img .ant-radio-wrapper > span p{
  word-break: break-all;
  white-space: wrap;
}

/* .cw-antd-radio-img .radio-item{
  display: flex;
  flex-direction: row;
} */

.cw-antd-radio-img .radio-item p{
  flex-shrink: 1;
  overflow: hidden;
  white-space: nowrap;
}


.cw-antd-radio-img .ant-radio-wrapper .option-img{
  width: 60px;  
  object-fit: contain;
}

.radio-item{
  margin-bottom: 10px;
}

.cw-antd-radio-img p{
  margin: 0;
}

/* 布局 左图右文   */

.cw-antd-radio-img.layout-left-img-right-text .ant-radio-wrapper .option-img{
  margin-right: 10px;
}

.cw-antd-radio-img.layout-left-img-right-text .ant-radio-wrapper > span{
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
}

.cw-antd-radio-img.layout-left-img-right-text .ant-radio{
  align-items: center
}


/* 布局 左文右图   */
.cw-antd-radio-img.layout-left-text-right-img .ant-radio-wrapper > span{
  display: flex;
  flex-direction: row;
  align-items: center;
}

.cw-antd-radio-img.layout-left-text-right-img .ant-radio-wrapper  .option-img{
  margin-left: 10px;
}

.cw-antd-radio-img.layout-left-text-right-img .ant-radio{
  align-items: center
}



/* 布局 上图下文   */
.cw-antd-radio-img.layout-top-img-bottom-text .ant-radio-wrapper > span{
  display: flex;
  flex-direction: column-reverse;
}

.cw-antd-radio-img.layout-top-img-bottom-text .ant-radio-wrapper  .option-img{
  margin-bottom: 6px;
}

.cw-antd-radio-img.layout-top-img-bottom-text .ant-radio{
  align-self: flex-start;
  margin-top: 5px;
}


/* 布局 上文下图   */
.cw-antd-radio-img.layout-top-text-bottom-img .ant-radio-wrapper > span{
  display: flex;
  flex-direction: column;
}

.cw-antd-radio-img.layout-top-text-bottom-img .ant-radio-wrapper  .option-img{
  margin-top: 6px;
}   

.cw-antd-radio-img.layout-top-text-bottom-img .ant-radio{
  align-self: flex-start;
  margin-top: 5px;
} 


</style>