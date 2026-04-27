<template>
  <div :class="$style.root">
    <div :class="$style.matrixPanel">
      <div :class="$style.matrixHeader">
        <span>矩阵列数</span>
        <input
          type="number"
          min="1"
          :disabled="!isEditable"
          v-model.number="localMatrixCols"
          @input="resizeMatrix"
          :class="$style.matrixNumberInput"
        />
        <span :class="$style.matrixHint">第1行输入标题，第2行输入变量，第3行输入表达式（如 sum(price)）</span>
      </div>
      <table :class="$style.table">
        <tbody>
          <tr>
            <td v-for="(cell, idx) in localMatrixHeaders" :key="'h'+idx">
              <input
                :disabled="!isEditable"
                :class="$style.cellInput"
                v-model="localMatrixHeaders[idx]"
                :placeholder="'标题' + (idx + 1)"
                @input="syncMatrixToTable"
              />
            </td>
          </tr>
          <tr>
            <td v-for="(cell, idx) in localMatrixVars" :key="'v'+idx">
              <input
                :disabled="!isEditable"
                :class="$style.cellInput"
                v-model="localMatrixVars[idx]"
                :placeholder="'name/title/price'"
                @input="syncMatrixToTable"
              />
            </td>
          </tr>
          <tr>
            <td v-for="(cell, idx) in localMatrixExprs" :key="'e'+idx">
              <input
                :disabled="!isEditable"
                :class="$style.cellInput"
                v-model="localMatrixExprs[idx]"
                :placeholder="'sum(price) / avg(price)'"
                @input="syncMatrixToTable"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>


  </div>
</template>

<script>
export default {
  name: 'custom-table-eidt-view',
  props: {
    columns: {
      type: Array,
      default: () => []
    },
    rows: {
      type: Array,
      default: () => []
    },
    footer: {
      type: Array,
      default: () => []
    },
    matrixCols: {
      type: Number,
      default: 3
    },
    matrixHeaders: {
      type: Array,
      default: () => []
    },
    matrixVars: {
      type: Array,
      default: () => []
    },
    matrixExprs: {
      type: Array,
      default: () => []
    },
    editable: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      localColumns: this.cloneColumns(this.columns),
      localRows: this.cloneRows(this.rows),
      localFooter: this.cloneFooter(this.footer),
      localMatrixCols: this.matrixCols,
      localMatrixHeaders: this.ensureLength(this.matrixHeaders, this.matrixCols),
      localMatrixVars: this.ensureLength(this.matrixVars, this.matrixCols),
      localMatrixExprs: this.ensureLength(this.matrixExprs, this.matrixCols)
    };
  },
  computed: {
    isEditable() {
      return this.editable;
    },
    renderFooter() {
      return this.localFooter;
    }
  },
  watch: {
    columns: {
      handler(val) {
        this.localColumns = this.cloneColumns(val);
      },
      deep: true
    },
    rows: {
      handler(val) {
        this.localRows = this.cloneRows(val);
      },
      deep: true
    },
    footer: {
      handler(val) {
        this.localFooter = this.cloneFooter(val);
      },
      deep: true
    },
    matrixCols(val) {
      this.localMatrixCols = val || 1;
      this.resizeMatrix();
    },
    matrixHeaders: {
      handler(val) {
        this.localMatrixHeaders = this.ensureLength(val, this.localMatrixCols);
      },
      deep: true
    },
    matrixVars: {
      handler(val) {
        this.localMatrixVars = this.ensureLength(val, this.localMatrixCols);
      },
      deep: true
    },
    matrixExprs: {
      handler(val) {
        this.localMatrixExprs = this.ensureLength(val, this.localMatrixCols);
      },
      deep: true
    }
  },
  methods: {
    ensureLength(list, len) {
      const arr = Array.isArray(list) ? [...list] : [];
      while (arr.length < len) arr.push('');
      if (arr.length > len) arr.length = len;
      return arr;
    },
    cloneColumns(list) {
      return (list || []).map(item => ({
        key: item.key,
        title: item.title,
        placeholder: item.placeholder
      }));
    },
    cloneFooter(list) {
      return (list || []).map(item => ({ ...item }));
    },
    cloneRows(list) {
      return (list || []).map(item => ({ ...item }));
    },
    emitColumns() {
      this.$emit('update:columns', this.cloneColumns(this.localColumns));
    },
    emitRows() {
      this.$emit('update:rows', this.cloneRows(this.localRows));
    },
    emitFooter() {
      this.$emit('update:footer', this.cloneFooter(this.localFooter));
    },
    emitMatrix() {
      this.$emit('update:matrixCols', this.localMatrixCols);
      this.$emit('update:matrixHeaders', [...this.localMatrixHeaders]);
      this.$emit('update:matrixVars', [...this.localMatrixVars]);
      this.$emit('update:matrixExprs', [...this.localMatrixExprs]);
    },
    resizeMatrix() {
      const len = Math.max(1, Number(this.localMatrixCols) || 1);
      this.localMatrixCols = len;
      this.localMatrixHeaders = this.ensureLength(this.localMatrixHeaders, len);
      this.localMatrixVars = this.ensureLength(this.localMatrixVars, len);
      this.localMatrixExprs = this.ensureLength(this.localMatrixExprs, len);
      this.syncMatrixToTable();
      this.emitMatrix();
    },
    syncMatrixToTable() {
      // 同步矩阵 -> columns & footer
      const cols = [];
      for (let i = 0; i < this.localMatrixCols; i += 1) {
        const key = this.localMatrixVars[i] || `col${i + 1}`;
        const title = this.localMatrixHeaders[i] || key;
        cols.push({
          key,
          title,
          placeholder: `$${key}`
        });
      }
      this.localColumns = cols;
      this.emitColumns();

      const footer = [];
      for (let i = 0; i < this.localMatrixCols; i += 1) {
        const expr = (this.localMatrixExprs[i] || '').trim();
        const parsed = this.parseExpr(expr, i);
        footer.push(parsed);
      }
      this.localFooter = footer;
      this.emitFooter();
      this.emitMatrix();
    },
    parseExpr(expr, idx) {
      if (!expr) {
        return { key: `foot-${idx}`, label: '' };
      }
      const m = expr.match(/^(sum|avg|max|min|count)\s*\(\s*([\w$]+)\s*\)$/i);
      if (m) {
        const type = m[1].toLowerCase();
        const field = m[2].replace(/^\$/, '');
        return {
          key: `foot-${idx}`,
          type,
          field
        };
      }
      return { key: `foot-${idx}`, label: expr };
    },
    sum(field) {
      if (!field) return '';
      return this.localRows.reduce((acc, cur) => acc + Number(cur[field] || 0), 0);
    },
    avg(field) {
      if (!field || !this.localRows.length) return '';
      const total = this.sum(field);
      return (total / this.localRows.length).toFixed(2);
    },
    max(field) {
      if (!field || !this.localRows.length) return '';
      return Math.max(...this.localRows.map(r => Number(r[field] || 0)));
    },
    min(field) {
      if (!field || !this.localRows.length) return '';
      return Math.min(...this.localRows.map(r => Number(r[field] || 0)));
    },
    count(field) {
      if (!this.localRows.length) return 0;
      if (!field) return this.localRows.length;
      return this.localRows.filter(r => r[field] !== undefined && r[field] !== null).length;
    }
  }
};
</script>

<style module>
.root {
  width: 100%;
  overflow-x: auto;
}

.table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
  color: #333;
}

.table th,
.table td {
  border: 1px solid #e5e6eb;
  padding: 8px 10px;
  text-align: left;
}

.headerInput,
.cellInput {
  width: 100%;
  box-sizing: border-box;
  padding: 6px 8px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
}

.headerInput:disabled,
.cellInput:disabled {
  background: #f5f7fa;
  color: #999;
}

.placeholderRow {
  background: #fafafa;
}

.placeholderText {
  color: #999;
  font-style: italic;
}

.empty {
  text-align: center;
  color: #999;
  padding: 16px 0;
}

.matrixPanel {
  margin-bottom: 16px;
}

.matrixHeader {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  font-size: 13px;
}

.matrixNumberInput {
  width: 80px;
  padding: 6px 8px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
}

.matrixHint {
  color: #666;
}

.matrixLabel {
  width: 90px;
  background: #fafafa;
  font-weight: 600;
}
</style>
