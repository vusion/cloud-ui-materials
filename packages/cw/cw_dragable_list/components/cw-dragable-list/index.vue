<template>
  <div>
    <draggable
      class="list-group"
      :list="dataSource"
      group="people"
      @change="log"
     :style="direction==='horizontal'?'flex-direction: row;':'flex-direction:column ;'"
    >
      <template v-if="inIDE" >
        <div
          class="list-group-item item-in-ide"
          v-for="(current, index) in [{},{},{}]"
          :key="current.name"
          vusion-slot-name="default"
        >
          <slot :item="current" :index="index"></slot>
        </div>
      </template>
      <template v-else>
        <div 
          class="list-group-item"
          v-for="(current, index) in dataSource"
          :key="current.name"
        >
          <template>
            <slot :item="current" :index="index"></slot>
          </template>
          <!-- <div class="list-group-cell">
              <slot vusion-slot-name="default"  :item="current" name="default" ></slot>
            </div> -->
        </div>
      </template>
    </draggable>
  </div>
</template>

<script>
import draggable from "vuedraggable";
export default {
  components: {
    draggable,
  },
  name: "cw-dragable-list",
  props: {
    group: {
      type: "string",
    },
    dataSource: {
      type: Array,
      default: () => [
        // { name: "John", id: 1 },
        // { name: "Joao", id: 2 },
        // { name: "Jean", id: 3 },
        // { name: "Gerard", id: 4 },
      ],
    },
    direction:{
      type: String,
      default:"horizontal"
    }
  },
  methods: {
    log(e) {
      console.log(e);
    },
  },
  watch: {
    dataSource: {
      handler: (value) => {
        console.log(value, 222);
      },
      immediate: true,
    },
  },
  computed: {
    inIDE() {
      return (this.$env && this.$env.VUE_APP_DESIGNER) || false;
    },
  },
};
</script>

<style>
.list-group-cell {
  height: 200px;
  width: 100px;
  border: 1px dashed #ccc;
}
.list-group {
  display: flex;
}
.list-group-item{
  position: relative;
  min-height: 40px;
}
.item-in-ide:not(:first-child)::after{
  content: '';
  width: 100%;
  height: 100%;
  position: absolute;
  background: #ffffffd4;
  z-index: 1000;
  top: 0;
  left: 0;
}
.list-group-item-cell{
  padding: 10px;
  border: 1px dashed #ccc;
}
</style>
