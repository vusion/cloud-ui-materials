<template>
  <div > 
    <button @click="handleClick">anniu{{isEdit}}</button>
    <div vusion-slot-name="default" class="drag-room drag-disabled-room" v-if="inIDE || !isEdit" >
        <slot></slot>
    </div>
    <draggable v-else  class="drag-room"  @update="handleUpdate"  >
        <slot></slot>
    </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
export default {
    name:"active-drag-view",
    props:{
      value:{
        type:String,
        default:"请在这里编写代码"
      }
    },
    mounted(){
      // this.init()
      // console.log(this.$slots.default)
      // if(!$env.VUE_APP_DESIGNER){
      
      // }
   
    // document.querySelector(".drag-room").style.gridTemplateColumns = "2fr 1fr 3fr"
      // document.addEventListener("mouseup",()=>{
      //   this.draggable = true;
      // })
    },
    watch:{
      isEdit:{
        handler(){
          this.init()
        },
        immediate:true
      }
    },
    computed:{
      componentList(){
        return this.$slots.default
      },
      inIDE(){
        return this.$env&& this.$env.VUE_APP_DESIGNER || false
      }
    },
    data(){
      return {
          draggable:true,
          componentDefaultList:[this.$slots.default],
          indexList:[],
          isEdit:false
      }
    },
     components: {
      draggable,
    },
    methods:{
      handleClick(){
        this.isEdit = !this.isEdit
      },
      handleUpdate(e){
        console.log(e);
        function  sort_after_drag(elements, oldIndex, newIndex){
             const  element = elements[oldIndex]
             elements.splice(oldIndex, 1);
             elements.splice(newIndex, 0, element);
            return elements
        }
        const resultList =  sort_after_drag(this.indexList,e.oldIndex,e.newIndex)
        console.log(resultList);
        localStorage.setItem("resultList",JSON.stringify(resultList))
      },
      handleStart(e){

      },
      handleDown(e){
        // this.draggable = false;
        console.log(e);
        console.log( e.target.parentNode.clientWidth);
      },
      async init(){
          await this.$nextTick()
          this.$slots.default.forEach((element,index) => {
              element.elm.classList.add("drag-room-cell"+index)
          });
          localStorage.getItem("resultList")?this.indexList = JSON.parse(localStorage.getItem("resultList")):this.indexList = new Array( this.$slots.default.length).fill(0).map((item,index)=>index)
          console.log(this.indexList);
          function reorderChildNodes(parentNode, order) {
            const childNodes = Array.from(parentNode.children);
            const reorderedChildNodes = order.map(index => childNodes[index]);
            // 移除所有子节点
            while (parentNode.firstChild) {
              parentNode.firstChild.remove();
            }
          console.log(parentNode);
          // 添加重新排列后的子节点
          reorderedChildNodes.forEach(node => {
            parentNode.appendChild(node);
          });
        }
        const parent = document.querySelector(".drag-room");
        // console.log(parent,this.indexList);
        reorderChildNodes(parent, this.indexList);
      }
    }
}
</script>

<style type="less">
.drag-room{
  display: flex;
  flex-wrap: wrap;
  min-height: 800px;
  /* display: grid; */
  /* grid-template-columns: repeat(3, 1fr); */
  /* gap: 10px; */
}
/* .drag-room-cell{
  border: 1px solid #ccc;
  height: 30px;
  position: relative;
  flex-basis: 33.33%; 
}
.drag-room-cell:first-child{
 flex-basis: 50%; 
}

.drag-room-cell:hover{
  cursor: move;
}
.drag-room-right-border{
  position:absolute;
  right:0;
  width: 1px;
  height: 100%;
  background: red;
  top:0;
  cursor: col-resize;
} */
</style>