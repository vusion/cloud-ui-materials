<template>
  <div class="formula-design-view"> 
    <div class="left">
      <textarea  @keydown="handleKeyPress" ref="myTextarea"   class="left-textarea" v-model="formulaString" name="" id="" cols="30" rows="10"></textarea>
      <!-- <div @click="handleLeftClick(item,index)" class="cell" v-for="(item,index) in formulaList" :key="index"> {{item.name}}</div> <div class="cursor"></div> -->
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
    name:"formula-design-view",
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
          console.log(val);
          if(val){
            val.split(",").map(item=>{
                console.log(item,this.codeMap);
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
      handleLeftClick(item,index){
        console.log(index)
        // document.querySelector('.cursor').remove()
        // const el = document.querySelector('.cursor').cloneNode(true)

      },
      handleKeyPress(e){
        e.preventDefault()
      },
      getTextIndex(targetIndex){
        let i = 0;
        let lastIndex = this.formulaList.length
        this.formulaList.forEach((item,index)=>{
          console.log(item.code.length);
           i =item.code.length +i
           if(i>targetIndex){
             lastIndex = index -1
           }
        })
        return lastIndex
      },
      handleClick(item){
         const myTextarea = this.$refs.myTextarea
         const index = myTextarea.selectionStart
         console.log(index);
         const listIndex = this.getTextIndex(index)
         console.log(listIndex);
         const codeLen = item.code.length
        if(item.code==='C'){
          this.formulaList = []
          return;
        }else if(item.code ==="←"){
           this.formulaList.splice(listIndex-1,1)
           console.log(this.formulaList);
            setTimeout(()=>{  
              myTextarea.focus();
              myTextarea.selectionStart = index-codeLen; // 设置光标起始位置
              myTextarea.selectionEnd = index-codeLen; // 设置光标结束位置
            },100)
          return;
        } else{
          this.formulaList.splice(listIndex,0,item)
           setTimeout(()=>{  
            myTextarea.focus();
            myTextarea.selectionStart = index+codeLen; // 设置光标起始位置
            myTextarea.selectionEnd = index+codeLen; // 设置光标结束位置
          },100)
        }
        this.$emit("update:value",this.formulaList.map(item=>item.code).join(','))
      }
    }
}
</script>

<style>
.formula-design-view{
  display: flex;
  border: 1px solid #ebebeb;
  border-radius:4px ;
  height: 266px;
}

.left-textarea{
  border: 0;
  outline: none;
  resize: none;
  background:#f5f5f5;
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

.code-cell:active{
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

.cell{
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  /* width: 20px; */
}

.cursor {
        width: 2px;
        height: 20px;
        background-color: black;
        opacity: 0;
        margin-top: 1px;
        animation: blink 1s infinite step-start;
    }

    @keyframes blink {
        50% {
            opacity: 1;
        }
    }
</style>