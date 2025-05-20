<template>
  <div class="u-for-com" vusion-slot-name="default">
    <template v-if="options.length > 0">
      <!-- 使用 vue-smooth-dnd 的 Container 包裹整个列表 -->
      <container class="dnd-container" @drop="handleDrop" :drag-handle-selector="'.drag-handle'">
        <!-- 每个项目使用 Draggable 包裹 -->
        <draggable v-for="(item, index) in flatOptions" :key="getItemKey(item, index)">
          <div class="item-wrapper" :style="{ width: itemWidth }">
            <!-- 拖拽手柄 -->
            <span class="drag-handle">☰</span>
            <u-list-components-item :item="item" :colnum="currentColNum" :equal-width="equalWidth" :index="index">
              <template #default="item2">
                <slot :item="item2.item" :index="index"></slot>
                <s-empty
                  v-if="
                    $scopedSlots && !($scopedSlots.default && $scopedSlots.default(item2)) && $env.VUE_APP_DESIGNER && !!$attrs['vusion-node-path']
                  "
                ></s-empty>
              </template>
            </u-list-components-item>
          </div>
        </draggable>
      </container>
    </template>
    <template v-else-if="$env.VUE_APP_DESIGNER">
      <slot><s-empty v-if="!$slots.default && $env.VUE_APP_DESIGNER && !!$attrs['vusion-node-path']"></s-empty></slot>
    </template>
  </div>
</template>

<script>
import { Container, Draggable } from 'vue-smooth-dnd';
import { sync } from '@lcap/vue2-utils';
import UListComponentsItem from './item.vue';
import SEmpty from '@lcap-ui/src/components/s-empty.vue';
import { formatDSResult } from '@lcap-ui/src/utils/DataSource/format';

export default {
  name: 'u-list-components',
  components: {
    Container,
    Draggable,
    UListComponentsItem,
    SEmpty,
  },
  mixins: [
    sync({
      data: 'options',
    }),
  ],
  props: {
    dataSource: {
      type: [Array, Object, Function, String],
      default: () => [],
    },
    colnum: {
      type: Number,
      default: 1,
    },
    equalWidth: {
      type: Boolean,
      default: true,
    },
    idField: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      options: [],
      flatOptions: [], // 新增一维数组用于拖拽
    };
  },
  computed: {
    currentColNum() {
      return this.getColNum();
    },
    itemWidth() {
      return this.equalWidth ? `${100 / this.currentColNum}%` : 'auto';
    },
  },
  watch: {
    dataSource: {
      deep: true,
      handler: 'update',
      immediate: true,
    },
    options: {
      deep: true,
      handler: 'updateFlatOptions',
    },
  },
  methods: {
    // 将二维数组扁平化
    updateFlatOptions() {
      this.flatOptions = this.options.flat();
    },
    applyDrag(arr, dropResult) {
      const { removedIndex, addedIndex, payload } = dropResult;
      if (removedIndex === null && addedIndex === null) return arr;
      const result = [...arr];
      let itemToAdd = payload;
      if (removedIndex !== null) {
        itemToAdd = result.splice(removedIndex, 1)[0];
      }
      if (addedIndex !== null) {
        result.splice(addedIndex, 0, itemToAdd);
      }
      return result;
    },
    // 处理拖拽事件
    handleDrop(dropResult) {
      const { removedIndex, addedIndex } = dropResult;
      if (removedIndex === null && addedIndex === null) return;

      // 手动实现 applyDrag 逻辑
      const newItems = [...this.flatOptions];
      const [removedItem] = newItems.splice(removedIndex, 1);
      newItems.splice(addedIndex, 0, removedItem);

      // 更新 flatOptions
      this.flatOptions = newItems;

      // 将一维数组重新分组为二维
      this.options = this.chunkArray(this.flatOptions, this.currentColNum);
      this.$emit('drag', this.flatOptions);
    },
    // 数组分块方法（代替原来的divide）
    chunkArray(arr, chunkSize) {
      const res = [];
      for (let i = 0; i < arr.length; i += chunkSize) {
        res.push(arr.slice(i, i + chunkSize));
      }
      return res;
    },
    // 获取唯一key
    getItemKey(item, index) {
      return this.idField ? this.$at(item, this.idField) || index : index;
    },
    // 修改原来的divide方法为chunkArray
    async update() {
      if (typeof this.dataSource === 'function') {
        try {
          const res = await this.dataSource({ page: 1, size: 1000 });
          this.options = this.chunkArray(formatDSResult(res), this.currentColNum);
        } catch (error) {
          console.error(error);
        }
      } else {
        this.options = this.chunkArray(formatDSResult(this.dataSource), this.currentColNum);
      }
    },
    // 保持原有方法
    comIndex(index1, index2) {
      return index1 * this.currentColNum + index2;
    },
    divide(arr) {
      const result = [];
      const arre = [...arr];
      while (arre.length > 0) {
        const temp = arre.splice(0, this.currentColNum);
        result.push(temp);
      }
      return result;
    },
    async update() {
      if (typeof this.dataSource === 'function') {
        try {
          const res = await this.dataSource({
            page: 1,
            size: 1000,
          });
          this.options = this.divide(formatDSResult(res));
        } catch (error) {
          console.error(error);
        }
      } else {
        this.options = this.divide(formatDSResult(this.dataSource));
      }
    },
    async reload() {
      return await this.update();
    },
    comIndex(index1, index2) {
      return index1 * this.currentColNum + index2;
    },
    getColNum() {
      const defaultColnum = 5;
      const colnum = this.colnum < 0 ? defaultColnum : this.colnum || defaultColnum;
      return colnum;
    },
  },
};
</script>

<style>
/* 拖拽容器样式 */
.dnd-container {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  gap: 10px; /* 项目间距 */
}

/* 项目包裹容器 */
.item-wrapper {
  display: flex;
  align-items: center;
  flex: 1 1 calc(100% / var(--colnum) - 10px); /* 根据列数计算宽度 */
  min-width: 200px; /* 最小宽度 */
}

/* 拖拽手柄样式 */
.drag-handle {
  cursor: move;
  margin-right: 8px;
  opacity: 0.5;
  transition: opacity 0.2s;
}

.drag-handle:hover {
  opacity: 1;
}

/* 保持原有样式 */
.u-for-com-frag {
  display: flex;
  flex-basis: auto;
  flex-wrap: wrap;
}
</style>
