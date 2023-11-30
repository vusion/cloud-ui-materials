<template>
  <div>
    <draggable   class="drag-room"  @update="handleUpdate" >
        <!-- <div class="drag-room-cell" v-for="element in myArray" :key="element.id">{{element.name}}</div> -->
        <slot></slot>
        <!-- <template v-for="item in componentList">
          {{item}}
        </template> -->

        <!-- {{componentList}} -->
         <!-- <active-drag-view-cell :key="1">1</active-drag-view-cell>
        <active-drag-view-cell :key="2">2</active-drag-view-cell>
        <active-drag-view-cell :key="3">3</active-drag-view-cell>
        <active-drag-view-cell :key="4">4</active-drag-view-cell> -->
         <!-- <div class="drag-room-cell">
          1
        <div class="drag-room-right-border" @mousedown="handleDown"></div>
        </div>
         <div class="drag-room-cell">
          2
          </div>
         <div class="drag-room-cell">
          3
          </div>
         <div class="drag-room-cell">
          4
          </div>
           <div class="drag-room-cell">
          4
          </div> -->
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
      console.log(this.$slots.default)
      this.$slots.default.forEach((element,index) => {
          element.elm.classList.add("drag-room-cell"+index)
      });
      this.indexList = new Array( this.$slots.default.length).fill(0).map((item,index)=>index)
      // document.querySelector(".drag-room").style.gridTemplateColumns = "2fr 1fr 3fr"
      // document.addEventListener("mouseup",()=>{
      //   this.draggable = true;
      // })
    },
    computed:{

      componentList(){
        return this.$slots.default
      }
          
    },
    data(){
      return {
          draggable:true,
          componentDefaultList:[this.$slots.default],
          myArray:[
            {name:1},
            {name:2},
            {name:3},
            {name:11},
            {name:12},
            {name:13},
          ],
          indexList:[]
      }
    },
     components: {
      draggable,
    },
    methods:{
      handleUpdate(e){
        console.log(e);
        function  sort_after_drag(elements, oldIndex, newIndex){
            element = elements[oldIndex]
            elements.pop(oldIndex)
            elements.insert(newIndex, element)
            return elements
        }
        const resultList =  sort_after_drag(this.indexList,e.oldIndex,e.newIndex)
        console.log(resultList);
      },
      handleStart(e){

      },
      handleDown(e){
        // this.draggable = false;
        console.log(e);
        console.log( e.target.parentNode.clientWidth);
       
      }
    }
}
</script>

<style type="less">
.drag-room{
  display: flex;
  flex-wrap: wrap;
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