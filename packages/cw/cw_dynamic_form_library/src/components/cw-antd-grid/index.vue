<template>
  <div class="grid-container">
    <a-row v-for="row in rows" :key="row">
      <a-col
        :class="['grid-item', { 'no-border-right': col === columns }, { 'no-border-bottom': row === rows }]"
        v-for="col in columns"
        :key="row + '-' + col"
        :span="getGridSpan(row, col)"
        style="position: relative"
      >
        <div class="grid-cell">
          <div
            style="padding: 2px; position: relative"
            v-for="child in getChildrenList(row, col)"
            :key="child.uid"
            v-if="evalCondition(child.dependencyResult)"
          >
            <form-item-render :item="child" :formInfo="formInfo" />
          </div>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import includes from 'lodash/includes';
import isEmpty from 'lodash/isEmpty';
import '@/utils/index';
import formItemRender from '@/components/cw-antd-custom-view/form-item-render.vue';

export default {
  name: 'cw-antd-grid',
  components: {
    formItemRender,
  },
  props: {
    rows: {
      type: Number,
      default: 3,
    },
    columns: {
      type: Number,
      default: 4,
    },
    children: {
      type: Array,
      default: () => [],
    },
    form: {
      type: Object,
      default: () => null,
    },
    formInfo: {
      type: Object,
      default: () => null,
    },
  },
  data() {
    return {
      inIDE: this.$env?.VUE_APP_DESIGNER ?? false,
      formValuesSnapshot: '',
      formWatchTimer: null,
    };
  },
  computed: {
    span() {
      return Math.floor(24 / this.columns);
    },
  },
  created() {
    // 首次渲染前准备依赖结果与 eval 所需全局函数
    this.computeAllDependencyResult();
  },
  mounted() {
    // 轮询监听表单值变化（Antd Form 不具备响应式依赖）
    this.$nextTick(() => {
      this.formValuesSnapshot = this.safeGetFormValuesString();
      this.formWatchTimer = setInterval(() => {
        const curr = this.safeGetFormValuesString();
        if (curr !== this.formValuesSnapshot) {
          this.formValuesSnapshot = curr;
          // 仅触发视图更新，dependencyResult 字符串无需重算
          this.$forceUpdate();
        }
      }, 200);
    });
  },
  beforeDestroy() {
    if (this.formWatchTimer) {
      clearInterval(this.formWatchTimer);
      this.formWatchTimer = null;
    }
  },
  watch: {
    // children: {
    //   handler() {
    //     this.computeAllDependencyResult();
    //   },
    //   deep: true,
    //   immediate: true,
    // },
  },
  methods: {
    // 安全获取表单值快照字符串
    safeGetFormValuesString() {
      try {
        const values = this.form && this.form.getFieldsValue ? this.form.getFieldsValue() : {};
        return JSON.stringify(values);
      } catch (e) {
        return '';
      }
    },
    // 参照 custom-render-view 生成 dependencyResult（字符串表达式）
    computeAllDependencyResult() {
      if (!this.children || !Array.isArray(this.children)) return;
      for (let r = 0; r < this.children.length; r++) {
        const rowArr = this.children[r] || [];
        for (let c = 0; c < rowArr.length; c++) {
          const cellArr = rowArr[c] || [];
          cellArr.forEach((child) => {
            let str = '';
            (child.dependency || []).forEach((dependencyItem, index) => {
              if (index) {
                str += dependencyItem.type === '2' ? ` || ` : ` && `;
              }
              str += `this.form.getFieldValue('${dependencyItem.name}') ${dependencyItem.calculation} '${dependencyItem.value}'`;
            });
            child.dependencyResult = str;
          });
        }
      }
    },

    // 与 custom-render-view 一致：基于 dependencyResult + eval 判断
    evalCondition(condition) {
      // 如果没有条件或条件为空，默认显示
      if (!condition || condition.trim() === '') {
        return true;
      }

      try {
        const conditionStr = condition.replace(/(\S*)\s(\S*)\s(\S*)(\s(&&|\|\|)\s)?/g, (a, b, c, d, e) => {
          if (c === '===') {
            return `isSame(${b},${d})${e ? e : ''}`;
          } else if (c === '!=') {
            return `isUnSame(${b},${d})${e ? e : ''}`;
          } else if (c === 'includesFun') {
            return `includesFun (${b},${d})${e ? e : ''}`;
          } else if (c === 'unIncludesFun') {
            return `includesFun(${b},${d})${e ? e : ''}`;
          }
          return a;
        });
        return eval(conditionStr);
      } catch (error) {
        console.warn('条件表达式执行失败:', error, 'condition:', condition);
        return true; // 出错时默认显示
      }
    },
    // 获取指定位置的子组件列表
    getChildrenList(row, col) {
      if (!this.children || !this.children[row - 1] || !this.children[row - 1][col - 1]) {
        return [];
      }
      return this.children[row - 1][col - 1] || [];
    },
    // 计算栅格跨度
    getGridSpan(row, col) {
      const span = Math.floor(24 / this.columns);
      return col < this.columns ? span : 24 - (this.columns - 1) * span;
    },
  },
};
</script>
<style scoped>
.grid-container {
  --grid-item-min-height: 150px; /* 栅格项高度 */
  border: 1px solid #d9d9d9;
  background-color: #fafafa;
}

.grid-row {
  min-height: var(--grid-item-min-height);
}

.grid-item {
  position: relative;
  box-sizing: border-box;
  padding: 12px;
  height: var(--grid-item-min-height);
  border-right: 1px solid #d9d9d9;
  border-bottom: 1px solid #d9d9d9;
  background-color: #fff;
  transition: background-color 0.2s;
  overflow: visible; /* 允许操作按钮显示在上方 */
  z-index: 1; /* 确保有堆叠上下文 */
}

.grid-item:hover {
  background-color: #f5f5f5;
}

/* 移除最后一列的右边框 */
.grid-item.no-border-right {
  border-right: none;
}

/* 移除最后一行的下边框 */
.grid-item.no-border-bottom {
  border-bottom: none;
}

/* 栅格单元格样式 */
.grid-cell {
  height: var(--grid-item-min-height);
  display: block;
  width: 100%;
  overflow-y: auto; /* 内容过多时可以滚动 */
  position: relative;
}
</style>
