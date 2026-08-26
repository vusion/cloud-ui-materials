<template>
  <div>
    <VueDraggable
      class="list-group"
      :model-value="dataSource"
      group="people"
      :style="direction === 'horizontal' ? 'flex-direction: row;' : 'flex-direction:column ;'"
      @update:model-value="onListUpdate"
      @sort="log"
      @add="log"
      @remove="log"
    >
      <template v-if="inIDE">
        <div
          v-for="(current, index) in [{}, {}, {}]"
          :key="index"
          class="list-group-item item-in-ide"
          vusion-slot-name="default"
        >
          <slot :item="current" :index="index"></slot>
        </div>
      </template>
      <template v-else>
        <div
          v-for="(current, index) in dataSource"
          :key="current?.name ?? index"
          class="list-group-item"
        >
          <slot :item="current" :index="index"></slot>
        </div>
      </template>
    </VueDraggable>
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
import { VueDraggable } from 'vue-draggable-plus';

export interface CwDragableListProps {
  dataSource?: any[];
  dataSchema?: any;
  group?: string;
  direction?: string;
}

const props = withDefaults(defineProps<CwDragableListProps>(), {
  dataSource: () => [],
  direction: 'horizontal',
});

const inIDE = computed(
  () => (window as any).$uilibenv?.IDE_DESIGNER === true,
);

function log(e: unknown) {
  console.log(e);
}

function onListUpdate(val: any[]) {
  props.dataSource.splice(0, props.dataSource.length, ...val);
}

watch(
  () => props.dataSource,
  (value) => {
    console.log(value, 222);
  },
  { immediate: true },
);
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
.list-group-item {
  position: relative;
  min-height: 40px;
}
.item-in-ide:not(:first-child)::after {
  content: '';
  width: 100%;
  height: 100%;
  position: absolute;
  background: #ffffffd4;
  z-index: 1000;
  top: 0;
  left: 0;
}
.list-group-item-cell {
  padding: 10px;
  border: 1px dashed #ccc;
}
</style>
