<template>
  <div class="active-room"> 
    <!-- <button @click="handleChangeActive">anniu{{isEdit}}</button> -->
     <!-- <button @click="handleSaveData">anniu123</button> -->
    <div vusion-slot-name="default" class="drag-room drag-disabled-room" v-if="inIDE || !isEdit" >
        <slot></slot>
    </div>
    <draggable v-else  class="drag-room"  @update="handleUpdate"  >
        <slot ></slot>
    </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
export default {
    name:"cw-active-drag-view",
    props:{
      value:{
        type:Array,
        default:()=>[]
      }
    },
    mounted(){
      
    },
    watch:{
      isEdit:{
        handler(){
          this.init()
        },
        // immediate:true
      },
      value:{
        handler(v){
          console.log(v)
           if(!this.inIDE){
            this.initData()
            this.init()
           }
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
          isEdit:false,
          lenList:[]
      }
    },
     components: {
      draggable,
    },
    methods:{
      handleChangeCell(e,idx){
        console.log(e,idx);
      },  
      async handleChangeActive(){
        if(this.isEdit){
          const parentEl = document.querySelector(".drag-room")
          parentEl.childNodes.forEach((element,index) => {
             const order =  element.getAttribute("data-order")
             this.lenList[order] = element.style.flexBasis
           })
        }
          this.isEdit = !this.isEdit
      },
      handleSaveData(){
        const parentEl = document.querySelector(".drag-room")
          parentEl.childNodes.forEach((element) => {
             const order =  element.getAttribute("data-order")
             this.lenList[order] = element.style.flexBasis
           })
        const result =  this.indexList.map((item,index)=>{
          return ({
            order:item,
            basis:this.lenList[index],
            hidden:this.value[index].hidden,
            name:this.value[index].name,
            desc:this.value[index].desc,
          })
        })
        
        this.$emit("onSaveData",result)
        return result
      },
      handleUpdate(e){
        function  sort_after_drag(elements, oldIndex, newIndex){
          const  element = elements[oldIndex]
          elements.splice(oldIndex, 1);
          elements.splice(newIndex, 0, element);
          return elements
        }
        this.indexList = sort_after_drag(this.indexList,e.oldIndex,e.newIndex)
        console.log(this.resultList,this.lenList);
      },
      async initData(){
          this.indexList = this.value.map(item=>item.order)
          this.lenList = this.value.map(item=>item.basis)
      },
      async init(){
          await this.$nextTick()
          this.$slots.default.filter(item=>item.data).forEach((element,index) => {
              element.elm.classList.add("drag-room-cell"+index)
          });
          const reorderChildNodes=(parentNode, orderList) => {
            const childNodes = Array.from(parentNode.children);
            childNodes.forEach((node, index) => {
              node.dataset.order = index
              if(this.lenList){
                 node.style.flexBasis = this.lenList[index]
                 node.style.display = this.value[index]&&this.value[index].hidden?"none":"flex"
              }
            });
            const reorderedChildNodes = orderList.map(index => childNodes[index]);
            // 移除所有子节点
            while (parentNode.firstChild) {
              parentNode.firstChild.remove();
            }
          // 添加重新排列后的子节点
          reorderedChildNodes.forEach(node => {
            parentNode.appendChild(node);
          });
        }
        const parent = document.querySelector(".drag-room");
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
  align-content: flex-start;
}
</style>