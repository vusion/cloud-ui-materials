<template>
  <div class="schedule-table" tabindex="0" @copy="onCopy" @paste="onPaste" @keydown="onKeyDown">
    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th class="fixed name-header">姓名</th>
            <th v-for="(day, index) in days" :key="index" class="date-header" :style="getHolidayStyle(index)">
              {{ day }}日<br />
              （{{ getWeekday(index) }}）<br />
              <span v-if="getHolidayLabel(index)" class="holiday-label">{{ getHolidayLabel(index) }}</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(person, rowIndex) in names" :key="rowIndex">
            <td class="fixed name-cell">{{ person }}</td>
            <td
              v-for="(day, colIndex) in days"
              :key="colIndex"
              :class="getCellClass(rowIndex, colIndex)"
              @mousedown="startSelection(rowIndex, colIndex)"
              @mouseover="continueSelection(rowIndex, colIndex)"
              @mouseup="endSelection"
              @click="activateEditor(rowIndex, colIndex)"
            >
              <template v-if="editingCell && editingCell[0] === rowIndex && editingCell[1] === colIndex">
                <select
                  v-model="localValue[rowIndex][colIndex]"
                  @change="onEditorChange(rowIndex, colIndex, $event.target.value)"
                  class="select-editor"
                >
                  <option value="">空</option>
                  <option v-for="option in options" :key="option.value" :value="option.value">
                    {{ option.label }}
                  </option>
                </select>
              </template>
              <template v-else>
                <span :style="getCellStyle(localValue[rowIndex][colIndex])">
                  {{ localValue[rowIndex][colIndex] }}
                </span>
              </template>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: '排班表格',
  props: {
    year: {
      type: Number,
      default: new Date().getFullYear(),
    },
    month: {
      type: Number,
      default: new Date().getMonth() + 1, // 月份从 1 开始
    },
    names: {
      type: Array,
      default: () => [],
    },
    value: {
      type: Array,
      default: () => [],
    },
    options: {
      type: Array,
      default: () => [],
    },
    holidays: {
      type: Object,
      default: () => ({}),
    },
    holidayColor: {
      type: String,
      default: '', // 默认红色背景
    },
    nightShiftValue: { type: String, default: '夜班' },
    restAfterNightShiftValue: { type: String, default: '休息' },
  },
  data() {
    return {
      localValue: [],
      historyStack: [],
      redoStack: [],
      isSelecting: false,
      selectionStart: null,
      selectionEnd: null,
      copiedRange: null,
      editingCell: null,
      selectionChanged: false,
    };
  },
  mounted() {
    this.initLocalValue();
  },
  computed: {
    days() {
      const daysInMonth = new Date(this.year, this.month, 0).getDate();
      return Array.from({ length: daysInMonth }, (_, i) => i + 1);
    },
  },
  watch: {
    value: {
      handler() {
        this.initLocalValue();
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    getCellStyle(value) {
      const option = this.options.find((opt) => opt.value === value);
      if (!option) return {};
      return {
        color: option.color || '',
        backgroundColor: option.background || '',
        fontWeight: option.bold ? 'bold' : '',
        width: '100%',
        height: '100%',
        borderRadius: '0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      };
    },
    getDateKey(index) {
      const day = this.days[index];
      return `${this.year}-${String(this.month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    },
    getWeekday(index) {
      const date = new Date(this.year, this.month - 1, this.days[index]);
      return ['日', '一', '二', '三', '四', '五', '六'][date.getDay()];
    },
    getHolidayLabel(index) {
      const key = this.getDateKey(index);
      return this.holidays[key] || '';
    },
    getHolidayStyle(index) {
      const key = this.getDateKey(index);
      if (this.holidays[key]) {
        return {
          backgroundColor: this.holidayColor,
          color: '#fff',
        };
      }
      return {};
    },
    onEditorChange(row, col, newVal) {
      this.$set(this.localValue[row], col, newVal);

      // 不再判断是否为空，直接写入休息
      if (newVal === this.nightShiftValue && col + 1 < this.localValue[row].length) {
        this.$set(this.localValue[row], col + 1, this.restAfterNightShiftValue);
      }
      this.redoStack = [];
      this.emitValue();
    },
    initLocalValue() {
      const rows = this.names.length;
      const cols = this.days.length;
      const base = JSON.parse(JSON.stringify(this.value || []));
      for (let i = 0; i < rows; i++) {
        if (!base[i]) base[i] = [];
        for (let j = 0; j < cols; j++) {
          if (typeof base[i][j] === 'undefined') base[i][j] = '';
        }
      }
      this.localValue = base;
    },
    emitValue() {
      this.$emit('input', JSON.parse(JSON.stringify(this.localValue)));
    },
    startSelection(row, col) {
      this.selectionStart = [row, col];
      this.selectionEnd = [row, col];
      this.isSelecting = true;
      this.selectionChanged = false;
    },
    continueSelection(row, col) {
      if (this.isSelecting) {
        this.selectionEnd = [row, col];
        this.selectionChanged = true;
      }
    },
    endSelection() {
      this.isSelecting = false;
    },
    activateEditor(row, col) {
      if (!this.selectionChanged) {
        this.editingCell = [row, col];
      }
      this.selectionChanged = false;
    },
    getCellTextClass(value) {
      const option = this.options.find((opt) => opt.value === value);
      if (!option) return '';
      return '';
    },
    getCellClass(row, col) {
      const classes = [];
      const isSelected = this.selectionStart && this.selectionEnd && this.isInRange(row, col, this.selectionStart, this.selectionEnd);
      const isCopied = this.copiedRange && this.isInRange(row, col, this.copiedRange.start, this.copiedRange.end);
      if (isSelected) classes.push('selected', ...this.getSelectedBorderClass(row, col));
      if (isCopied) classes.push('copied-cell', ...this.getCopiedBorderClass(row, col));
      return classes;
    },
    isInRange(row, col, start, end) {
      const [sr, sc] = start;
      const [er, ec] = end;
      return row >= Math.min(sr, er) && row <= Math.max(sr, er) && col >= Math.min(sc, ec) && col <= Math.max(sc, ec);
    },
    getSelectedBorderClass(row, col) {
      const [sr, sc] = this.selectionStart;
      const [er, ec] = this.selectionEnd;
      const minRow = Math.min(sr, er);
      const maxRow = Math.max(sr, er);
      const minCol = Math.min(sc, ec);
      const maxCol = Math.max(sc, ec);
      const borders = [];
      if (row === minRow) borders.push('selected-border-top');
      if (row === maxRow) borders.push('selected-border-bottom');
      if (col === minCol) borders.push('selected-border-left');
      if (col === maxCol) borders.push('selected-border-right');
      return borders;
    },
    getCopiedBorderClass(row, col) {
      const [sr, sc] = this.copiedRange.start;
      const [er, ec] = this.copiedRange.end;
      const minRow = Math.min(sr, er);
      const maxRow = Math.max(sr, er);
      const minCol = Math.min(sc, ec);
      const maxCol = Math.max(sc, ec);
      const borders = [];
      if (row === minRow) borders.push('copied-border-top');
      if (row === maxRow) borders.push('copied-border-bottom');
      if (col === minCol) borders.push('copied-border-left');
      if (col === maxCol) borders.push('copied-border-right');
      return borders;
    },
    onCopy(e) {
      if (!this.selectionStart || !this.selectionEnd) return;
      this.copiedRange = { start: [...this.selectionStart], end: [...this.selectionEnd] };
      const [sr, sc] = this.copiedRange.start;
      const [er, ec] = this.copiedRange.end;
      const minRow = Math.min(sr, er);
      const maxRow = Math.max(sr, er);
      const minCol = Math.min(sc, ec);
      const maxCol = Math.max(sc, ec);
      const copiedText = this.localValue
        .slice(minRow, maxRow + 1)
        .map((row) => row.slice(minCol, maxCol + 1).join('\t'))
        .join('\n');
      e.clipboardData.setData('text/plain', copiedText);
      e.preventDefault();
      this.selectionStart = null;
      this.selectionEnd = null;
    },
    onPaste(e) {
      if (!this.selectionStart && !this.copiedRange) return;

      // 保存当前状态（深拷贝）
      this.historyStack.push(JSON.parse(JSON.stringify(this.localValue)));

      this.redoStack = [];

      const pasteData = e.clipboardData.getData('text/plain');
      const rows = pasteData.split('\n').map((row) => row.split('\t'));
      const [startRow, startCol] = this.selectionStart || this.copiedRange.start;

      rows.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
          const r = startRow + rowIndex;
          const c = startCol + colIndex;
          if (r < this.localValue.length && c < this.localValue[0].length) {
            this.$set(this.localValue[r], c, cell);
          }
        });
      });
      this.emitValue();
      e.preventDefault();
    },
    undoPaste() {
      if (this.historyStack.length > 0) {
        const previous = this.historyStack.pop();
        this.localValue = JSON.parse(JSON.stringify(previous));
        this.emitValue();
      } else {
        console.warn('没有历史记录可撤销');
      }
    },
    onKeyDown(e) {
      if (e.key === 'Escape') {
        this.selectionStart = null;
        this.selectionEnd = null;
        this.copiedRange = null;
        this.editingCell = null;
      }

      // Undo (Ctrl+Z / Cmd+Z)
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z' && !e.shiftKey) {
        if (this.historyStack.length > 0) {
          this.redoStack.push(JSON.parse(JSON.stringify(this.localValue))); // 保存当前到 redo
          const prev = this.historyStack.pop();
          this.localValue = JSON.parse(JSON.stringify(prev));
          this.emitValue();
          e.preventDefault();
        }
      }

      // Redo (Ctrl+Shift+Z / Cmd+Shift+Z)
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z' && e.shiftKey) {
        if (this.redoStack.length > 0) {
          this.historyStack.push(JSON.parse(JSON.stringify(this.localValue))); // 当前状态入栈
          const next = this.redoStack.pop();
          this.localValue = JSON.parse(JSON.stringify(next));
          this.emitValue();
          e.preventDefault();
        }
      }
    },
  },
};
</script>

<style scoped>
.schedule-table {
  box-sizing: border-box;
  overflow: auto;
  border: 1px solid #ccc;
  outline: none;
}

th {
  font-size: 12px;
}

td span,
.select-editor {
  display: inline-block;
  box-sizing: border-box;
  width: 100%;
  line-height: 1.4;
  border-radius: 4px;
  font-family: inherit;
  vertical-align: middle;
  padding: 0;
  font-size: 12px;
  height: 24px;
}

td span {
  border: 1px solid transparent;
  font-size: 12px;
}

.select-editor {
  border: 1px solid #ccc;
  background-color: #fff;
  outline: none;
  box-sizing: border-box;
}

.table-wrapper {
  overflow: auto;
  max-width: 100%;
}
table {
  border-collapse: collapse;
  width: max-content;
  min-width: 100%;
}
th,
td {
  border: 1px solid #ccc;
  min-width: 60px;
  height: 32px;
  text-align: center;
  user-select: none;
  box-sizing: border-box;
  font-size: 12px;
}
.date-header {
  background-color: rgb(85, 184, 184);
  color: white;
}
.fixed.index-header,
.fixed.name-header {
  background-color: rgb(85, 184, 184);
  color: white;
  position: sticky;
  left: 0;
  z-index: 2;
}
.fixed.index-cell,
.fixed.name-cell {
  background-color: rgb(239, 239, 239);
  color: black;
  position: sticky;
  left: 0;
  z-index: 1;
}
.selected {
  background-color: rgb(162, 225, 186);
}
.copied-cell {
  background: linear-gradient(rgb(162, 225, 186), rgb(162, 225, 186)) padding-box,
    repeating-linear-gradient(-45deg, #0078ee 0, #0078ee 25%, #fff 0, #fff 50%) 0/0.5em 0.5em border-box;
  animation: ants 4s linear infinite;
}
@keyframes ants {
  to {
    background-position: 100%;
  }
}
.copied-border-top {
  border-top: 2px dashed #0078ee;
}
.copied-border-bottom {
  border-bottom: 2px dashed #0078ee;
}
.copied-border-left {
  border-left: 2px dashed #0078ee;
}
.copied-border-right {
  border-right: 2px dashed #0078ee;
}
.selected-border-top {
  border-top: 2px solid #0078ee;
}
.selected-border-bottom {
  border-bottom: 2px solid #0078ee;
}
.selected-border-left {
  border-left: 2px solid #0078ee;
}
.selected-border-right {
  border-right: 2px solid #0078ee;
}
.select-editor {
  width: 100%;
  padding: 0;
  font-size: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  background-color: #fff;
  font-family: inherit;
}
</style>
