<template>
  <div class="calculation-formula-design-view"> 
    <div class="left">
      <textarea  @click="handleSelectionChange"  @keydown="handleKeyPress" ref="myTextarea"   class="left-textarea" v-model="formulaString" name="" id=""  rows="5"></textarea>
    </div>
    <div class="right">
        <div @click="handleClick(item)" class="code-cell" v-for="item in codeList" :key="item.code" >
          {{item.name}}
        </div>
    </div>
  </div>
</template>

<script>
import { calculationCodeList ,calculationCodeMap} from '@/utils'
export default {
    name:"judgement-calculation-formula-design-view",
    props:{
      value:{
        type:String,
      },
      customMapList:{
        type:Array,
      }
    },
    data(){
      return {
        codeList:calculationCodeList,
        codeMap:calculationCodeMap,
        formulaList:[],
      }
    },
    computed:{
      formulaString(){
        return this.formulaList.map(item=>item.name).join('');
      }
    },
    mounted(){
      // if(this.customMapList){
      //   console.log(this.customMapList);
      //   const codeList = [...calculationCodeList,...this.customMapList]
      //   this.codeMap = codeList.reduce((obj,item)=>{
      //     obj[item.name] = item
      //     return obj
      //   },{})
      // }
    },
    watch:{
      value:{
        handler(val){
          if(val){
            this.formulaList = []
            val.split(",").map(item=>{
                if(this.codeMap[item]){
                  this.formulaList.push(this.codeMap[item])
                }
            })
          }
        },
        immediate:true
      },
      codeMap:{
        handler(val){
          if(val){
            this.formulaList = []
            if(this.value){
              this.value.split(",").map(item=>{
                  if(val[item]){
                    this.formulaList.push(val[item])
                  }
              })
            }
          }
        },
      },
      customMapList:{
        handler(val){
          if(val){
            const codeList = [...calculationCodeList,...val]
            this.codeMap = codeList.reduce((obj,item)=>{
              obj[item.name] = item
              return obj
            },{})
          }
        },
        immediate:true,
        deep:true
       
      }
    },
    methods:{

      handleKeyPress(e){
        e.preventDefault()
        if(e.code==="Backspace"){
          this.handleClick({name:"←"})
        }
      },

      getTextIndex(targetIndex){
        if(targetIndex===0){
          return [0,0]
        }
        let i = 0;
        let lastIndex = this.formulaList.length
        this.formulaList.find((item,index)=>{
           i =item.name.length +i
           if(i>=targetIndex ){
            lastIndex = index
            return true
           }
        })
        return  [lastIndex,i] 
      },
      handleSelectionChange(){
        const myTextarea = this.$refs.myTextarea
        let index = myTextarea.selectionStart
        const [listIndex,i] = this.getTextIndex(index)
        index= i 
        setTimeout(()=>{  
          myTextarea.focus();
          myTextarea.selectionStart = index; // 设置光标起始位置
          myTextarea.selectionEnd = index; // 设置光标结束位置
        },100)
      },
      handleClick(item){
         const myTextarea = this.$refs.myTextarea
         let index = myTextarea.selectionStart
         const [listIndex,i] = this.getTextIndex(index)
         const nameLen = item.name.length
        if(item.name==='C'){
          this.formulaList = []
        }else if(item.name ==="←"){
           this.formulaList.splice(listIndex,1)
            setTimeout(()=>{  
              myTextarea.focus();
              myTextarea.selectionStart = index-nameLen; // 设置光标起始位置
              myTextarea.selectionEnd = index-nameLen; // 设置光标结束位置
            },100)
        } else{
          this.formulaList.splice(listIndex+1,0,item)
           setTimeout(()=>{  
            myTextarea.focus();
            myTextarea.selectionStart = index+nameLen; // 设置光标起始位置
            myTextarea.selectionEnd = index+nameLen; // 设置光标结束位置
          },100)
        }
        this.$emit("update:value",this.formulaList.map(item=>item.name).join(','))
      }
    }
}
</script>

<style >
.calculation-formula-design-view{
  display: flex;
  border: 1px solid #ebebeb;
  border-radius:4px ;
  height: 186px;
}

.calculation-formula-design-view .left-textarea{
  border: 0;
  outline: none;
  resize: none;
  background:#f5f5f5;
  width: 100%;
   word-break: keep-all;
  white-space: pre-wrap;
}
.calculation-formula-design-view .left{
  padding: 20px;
  background: #f5f5f5;
  font-size: 20px;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  user-select: none;
  flex-shrink: 0;
  flex-grow: 1;
  width: 100px;
}
.calculation-formula-design-view .right{
  width: 264px;
  height: 178px;
  background: white;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  position: relative;
  padding: 16px;
  flex-shrink: 0;
}

.calculation-formula-design-view  .code-cell{
  cursor: pointer;
  margin-right: 8px;
  margin-bottom: 8px;
  width:32px;
  height: 32px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
  user-select: none;
}

.calculation-formula-design-view .code-cell:active{
  opacity: .7;
}

.calculation-formula-design-view  .code-cell:nth-child(5) , .calculation-formula-design-view  .code-cell:nth-child(11) {
 margin-right: 40px;
}

.calculation-formula-design-view  .code-cell:nth-child(6) {
   height: 72px;
    position: absolute;
    right: 8px;
    top: 16px;
}


.calculation-formula-design-view  .code-cell:nth-child(17){
  height: 72px;
  position: absolute;
  right: 8px;
  top: 96px;
}
.calculation-formula-design-view  .code-cell:nth-child(18),.calculation-formula-design-view  .code-cell:nth-child(20){
  width: 72px;
   margin-bottom: 0;
}

.calculation-formula-design-view .cell{
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
}

</style>