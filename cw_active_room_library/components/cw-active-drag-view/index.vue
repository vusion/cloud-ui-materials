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
          //  this.$slots.default.forEach((element,index) => {
          //   console.log(element,"elm");
          //    console.log(element.elm.style.flexBasis,"data");
          //    const order =  element.elm.getAttribute("data-order")
          //    this.lenList[order] = element.elm.style.flexBasis
          //  })
          //  localStorage.setItem("resultList",JSON.stringify(this.indexList))
          //  localStorage.setItem("lenList",JSON.stringify(this.lenList))
        }
        
        console.log(this.lenList);
        // debugger
          this.isEdit = !this.isEdit
          // await this.$nextTick()
          // console.log(this.lenList);
        //   this.$slots.default.forEach((element,index) => {
        //   // console.log(this.lenList);
        //   const order =  element.elm.getAttribute("data-order")
        //   // console.log(element.elm.__vue__.selfBasis);
        //   console.log(element.elm);
        //   element.elm.style.flexBasis = this.lenList[order]
        //   // this.lenList[order] = element.elm.__vue__.selfBasis
        //  })
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
            hidden:this.value[index].hidden
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
          // localStorage.getItem("resultList")?this.indexList = JSON.parse(localStorage.getItem("resultList")):this.indexList = new Array( this.$slots.default.length).fill(0).map((item,index)=>index)
          // localStorage.getItem("lenList")?this.lenList = JSON.parse(localStorage.getItem("lenList")):this.indexList = new Array( this.$slots.default.length).fill(0).map((item,index)=>index)
          // console.log(this.indexList);
          // console.log(this.value);
       
          
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