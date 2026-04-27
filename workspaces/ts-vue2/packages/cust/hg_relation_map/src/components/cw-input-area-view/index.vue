<template>
    <div 
      :class="['cw-input-area', { 'is-disabled': disabled }]"
      ref="myDiv"
      :contentEditable="!disabled"
      :aria-disabled="disabled"
      @focus="handleFocus"
      @input="handleInput"
      @blur="hanldeBlur"
      @mousedown="handleMouseDown"
      :data-placeholder="placeholder"
    >
    </div>
</template>

<script>
let node = null
import { changeStrByMap } from '../../logics'
export default {
    name:"cw-input-area-view",
    props:{
      value:{
        type: String,
        default:''
      },
      titleMap:{
        type: Object,
        default:()=>({})
      },
      placeholder:{
        type:String,
        default:'请输入内容'
      },
      disabled:{
        type:Boolean,
        default:false
      }
    },
    data(){
      return{
        range:0,
        targetNode:null,
        previousFocus:null,
        isFocus:false,
        isUpdatingFromProp: false // 标记是否正在从 prop 更新，避免循环更新
      }
    },
    mounted(){
        document.addEventListener('selectionchange', this.selecthandler);
        this.targetNode = this.$refs['myDiv']
        this.targetNode.innerHTML =  this.value
    },   
    watch:{
      disabled:{
        immediate:true,
        handler(value){
          if(value){
            this.clearSelection(true);
          }
        }
      },
      value: {
        handler(newValue) {
          // 避免循环更新：如果当前正在从 prop 更新，或者内容相同，则不更新
          if (this.isUpdatingFromProp || !this.targetNode) {
            return;
          }
          // 如果新值与当前内容不同，则更新
          if (this.targetNode.innerHTML !== newValue) {
            this.isUpdatingFromProp = true;
            // 保存当前光标位置
            const sel = window.getSelection();
            let savedRange = null;
            if (sel && sel.rangeCount > 0) {
              const currentRange = sel.getRangeAt(0);
              if (this.isRangeInsideTarget(currentRange)) {
                savedRange = currentRange.cloneRange();
              }
            }
            // 更新内容
            this.targetNode.innerHTML = newValue || '';
            // 恢复光标位置（如果可能）
            if (savedRange && this.targetNode.contains(savedRange.startContainer)) {
              try {
                sel.removeAllRanges();
                sel.addRange(savedRange);
                this.range = savedRange.cloneRange();
              } catch (e) {
                // 如果恢复失败，将光标移到末尾
                this.keepCursorEnd();
              }
            }
            this.isUpdatingFromProp = false;
          }
        },
        immediate: false
      }
    },
    beforeDestroy(){
      document.removeEventListener('selectionchange', this.selecthandler);
    },
    methods:{
      renderValue(){
        this.targetNode.innerHTML = this.value
      },
      isRangeInsideTarget(range){
        if(!range || !this.targetNode) return false;
        const startNode = range.startContainer;
        const endNode = range.endContainer;
        return this.targetNode.contains(startNode) && this.targetNode.contains(endNode);
      },
      handleClick222(){
         this.targetNode.focus(); // 确保DIV获得焦点
 
          // 获取selection对象
          var selection = window.getSelection();
        
          // 清除已有的选区
          selection.removeAllRanges();
        
          // 创建一个新的range对象
          var range = document.createRange();
        
          // 设置光标位置，这里设置在DIV的开头
          // console.log(this.targetNode.lastChild);
          range.setStart(this.targetNode.lastChild, this.targetNode.lastChild.length);
          range.setEnd(this.targetNode.lastChild, this.targetNode.lastChild.length);
        
          // 添加range到selection
          selection.addRange(range);
      },
      handleChangeValue(value){
        const changeValue = changeStrByMap(this.targetNode.innerHTML,value)
      },
      hanldeBlur(e){
          if(this.disabled) return;
          this.isFocus =false
          const sel = window.getSelection();
          if(sel && sel.rangeCount > 0){
            const currentRange = sel.getRangeAt(0);
            if(this.isRangeInsideTarget(currentRange)){
              this.previousFocus = currentRange.cloneRange();
            }
          } else if(this.range && this.isRangeInsideTarget(this.range)){
            this.previousFocus = this.range.cloneRange();
          }
          this.range = null
      },
      handleFocus(e){
        if(this.disabled) return;
        this.isFocus =true
        const sel = window.getSelection();
        if(sel && sel.rangeCount > 0){
          const currentRange = sel.getRangeAt(0);
          if(this.isRangeInsideTarget(currentRange)){
            this.range = currentRange.cloneRange();
          }
        }
      },
      setCursorPos(element, pos) {
        var range = document.createRange();
        var sel = window.getSelection();
        range.setStart(element.childNodes[0], pos);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
      },
      handleInput(e){
        if(this.disabled){
          this.targetNode.innerHTML = this.value || '';
          return;
        }
        // 如果正在从 prop 更新，不触发事件
        if (this.isUpdatingFromProp) {
          return;
        }
        const text = this.targetNode.innerText || '';
        const hasContent = text.trim().length > 0 || this.targetNode.querySelector('wise');
        if(!hasContent){
          this.targetNode.innerHTML = '';
        }
        this.$emit('update:value', this.targetNode.innerHTML)
        this.$emit('input',this.targetNode.innerHTML)
        this.$emit('change',this.targetNode.innerHTML)
      },
      handleClick(v="f",type="wise"){ 
          if(this.disabled) return;
          // 如果正在从 prop 更新，不处理
          if (this.isUpdatingFromProp) {
            return;
          }
          node = document.createElement(type);
          node.id = v 
          // node.contentEditable = true
          node.innerText =  this.titleMap[v]? this.titleMap[v].comment?this.titleMap[v].comment:v : v

          let activeRange = null;
          const selection = window.getSelection();
          if(this.isFocus && selection && selection.rangeCount > 0){
            const currentRange = selection.getRangeAt(0);
            if(this.isRangeInsideTarget(currentRange)){
              activeRange = currentRange.cloneRange();
            }
          }
          if(!activeRange && this.range && this.isRangeInsideTarget(this.range)){
            activeRange = this.range.cloneRange();
          }
          if(!activeRange && this.previousFocus && this.isRangeInsideTarget(this.previousFocus)){
            activeRange = this.previousFocus.cloneRange();
          }
          if(!activeRange){
            const sel = this.keepCursorEnd(true);
            if(sel && sel.rangeCount > 0){
              activeRange = sel.getRangeAt(0).cloneRange();
            }
          }
          if(!activeRange){
            return;
          }

          this.targetNode.focus();
          const selObj = window.getSelection();
          if(selObj){
            selObj.removeAllRanges();
            selObj.addRange(activeRange);
          }
          this.range = activeRange.cloneRange();

          this.insertNode(node);
          this.$emit('update:value', this.targetNode.innerHTML)
          this.$emit('input',this.targetNode.innerHTML)
          this.$emit('change',this.targetNode.innerHTML)
      },
      handleMouseUp(){
            if(this.disabled) return;
            // 如果正在从 prop 更新，不处理
            if (this.isUpdatingFromProp) {
              return;
            }
            const range = document.createRange();
            // 设置Range的起始和结束位置为元素的末尾
            range.setStartAfter(node);
            range.collapse(false); // 将光标设置在元素的末尾
            const selection = window.getSelection();

            // 清除现有的选区
            selection.removeAllRanges();
            // 添加新的Range到Selection对象中
            selection.addRange(range);

            this.targetNode.focus()
            this.$emit('update:value', this.targetNode.innerHTML)
            this.$emit('update', this.targetNode.innerHTML)
            this.$emit('input',this.targetNode.innerHTML)
      },
      insertNode(node){
        if(this.disabled) return;
        if(!this.range){
          return;
        }
        this.range.deleteContents();
        this.range.insertNode(node);
        const selection = window.getSelection();
        if(selection && this.isRangeInsideTarget(this.range)){
          selection.removeAllRanges();
          const newRange = document.createRange();
          newRange.setStartAfter(node);
          newRange.collapse(true);
          selection.addRange(newRange);
          this.range = newRange.cloneRange();
        }
        this.targetNode.focus()
      },
      handleLogValue(){
        // changeStrByMap(this.targetNode.innerHTML,{f:{comment:"123"}})
        // console.log(changeStrByMap(this.targetNode.innerHTML,{f:{comment:"fafdafdsa"}}));
        // console.log(this.targetNode.innerHTML);
      },
      selecthandler()  {
          // 监听选定文本的移动
          const sel = window.getSelection();
          if(sel && sel.rangeCount > 0){
            const currentRange = sel.getRangeAt(0);
            if(this.isRangeInsideTarget(currentRange)){
              this.range = currentRange.cloneRange();
            }
          }
        },
        /** 将光标重新定位到内容最后 */
      keepCursorEnd(isReturn) {
        // 创建range
        const sel = window.getSelection() 
        // range 选择obj下所有子内容
        sel.selectAllChildren(this.targetNode);
        // 光标移至最后
        sel.collapseToEnd();
        //  this.targetNode.focus();
        if (isReturn) return sel;
      },
      keepCursorStart(){
        this.targetNode.focus();
        // 创建range
        const sel = window.getSelection() 
        // range 选择obj下所有子内容
        sel.selectAllChildren(this.targetNode);
        // 光标移至最后
        sel.collapseToStart();
        return sel;
      },
      handleMouseDown(e){
        if(!this.disabled) return;
        e.preventDefault();
        e.stopPropagation();
        this.clearSelection(true);
      },
      clearSelection(forceBlur = false){
        const sel = window.getSelection();
        if(sel && sel.rangeCount > 0){
          sel.removeAllRanges();
        }
        this.range = null;
        this.isFocus = false;
        if(forceBlur && this.targetNode){
          this.targetNode.blur();
        }
      }
    }
}
</script>

<style>
.cw-input-area{
    outline: none;
    -webkit-user-modify: read-write-plaintext-only !important;
    overflow: hidden;
    box-sizing: border-box;
    word-break: break-word;
    min-height: 50px;
    width: 100%;
    position: relative;
}
.cw-input-area.is-disabled{
    /* background-color: #f5f5f5; */
    color: #b3b3b3;
    cursor: not-allowed;
}

wise{
    /* color: #f0f6fe; */
    /* background-color: #375efa; */
    /* padding: 0 4px; */
    /* border-radius: 2px; */
    cursor: default;
    -webkit-user-modify: read-only !important;
    /* margin: 0  4px; */
}


/* operator {
    color: #fff;
    background-color: pink;
    padding: 0 4px;
    border-radius: 2px;
    cursor: default;
    -webkit-user-modify: read-only !important;
    margin: 0  4px;
} */

/* wise~wise,wise~operator,operator~operator,operator~wise{
  margin-left: 0;
} */

.cw-input-area:empty:before{
    content: attr(data-placeholder);
    color: #999;
    pointer-events: none;
}

</style>