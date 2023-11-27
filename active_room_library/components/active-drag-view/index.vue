<template>
  <div>
    <draggable v-model="myArray" class="drag-room">
        <div v-for="element in myArray" :key="element.id">{{element.name}}</div>
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
    data(){
      return {
          myArray:[{name:1},{name:2},{name:3}]
      }
    },
     components: {
      draggable,
    },
    methods:{
      handleStart(e){

      }
    }
}
</script>

<style type="less">
.drag-room{
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
</style>