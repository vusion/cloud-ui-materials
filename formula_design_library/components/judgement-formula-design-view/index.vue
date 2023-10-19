<template>
  <div class="formula-design-view"> 
    <div class="left">
      <textarea  @click="handleSelectionChange"  @keydown="handleKeyPress" ref="myTextarea"   class="left-textarea" v-model="formulaString" name="" id=""  rows="10"></textarea>
    </div>
    <div class="right">
        <div @click="handleClick(item)" class="code-cell" v-for="item in codeList" :key="item.code" >
          {{item.name}}
        </div>
    </div>
  </div>
</template>

<script>
import { codeList ,codeMap} from '@/utils'
export default {
    name:"judgement-formula-design-view",
    props:{
      value:{
        type:String,
      }
    },
    data(){
      return {
        codeList:codeList,
        codeMap:codeMap,
        formulaList:[],
        flag:false
      }
    },
    computed:{
      formulaString(){
        return this.formulaList.map(item=>item.name).join('');
      }
    },
    mounted(){
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
        console.log(index);
        const [listIndex,i] = this.getTextIndex(index)
        console.log(listIndex,i);
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
        console.log(this.formulaList);
        this.$emit("update:value",this.formulaList.map(item=>item.name).join(','))
      }
    }
}
</script>

<style >
.formula-design-view{
  display: flex;
  border: 1px solid #ebebeb;
  border-radius:4px ;
  height: 266px;
}

.formula-design-view .left-textarea{
  border: 0;
  outline: none;
  resize: none;
  background:#f5f5f5;
  width: 100%;
   word-break: keep-all;
  white-space: pre-wrap;
}
.formula-design-view .left{
  padding: 20px;
  /* flex:1; */
  background: #f5f5f5;
  font-size: 20px;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  user-select: none;
  flex-shrink: 0;
  flex-grow: 1;
  width: 100px;
  /* word-break: keep-all */
}
.formula-design-view .right{
  width: 264px;
  height: 264px;
  background: white;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  position: relative;
  padding: 16px;
  flex-shrink: 0;
}

.formula-design-view  .code-cell{
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

.formula-design-view .code-cell:active{
  opacity: .7;
}

.formula-design-view  .code-cell:nth-child(6) , .formula-design-view  .code-cell:nth-child(12) {
  margin-right:0px ;
}


.formula-design-view  .code-cell:nth-child(17){
  height: 72px;
  position: absolute;
  right: 8px;
  top: 96px;
}
.formula-design-view  .code-cell:nth-child(25),.formula-design-view  .code-cell:nth-child(28){
  width: 112px;
   margin-right: 0;
   margin-bottom: 0;
}
.formula-design-view  .code-cell:nth-child(26){
  width: 72px;
   margin-bottom: 0;
}
.formula-design-view  .code-cell:nth-child(27){
   margin-bottom: 0;
}
.formula-design-view  .code-cell:nth-child(16),.formula-design-view  .code-cell:nth-child(21){
  width: 72px;
  margin-right: 40px;
}

.formula-design-view .cell{
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
}

</style>