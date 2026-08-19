/** Excel 模式 Vue mixin：provide/inject、选区/编辑/overlay 状态、文档事件 */
import {
  parseExcelTSV, readExcelClipboardText,
  writeExcelClipboardFromEvent, buildExcelCopyPayloadFromSelection,
  getExcelInternalPastePayload,
} from '../clipboard.js';
import { createEmptyExcelSelection, getExcelSelectionBounds, getExcelSelectionStart, isExcelPasteableColumnVM } from '../selection.js';
import { applyExcelPaste, applyExcelSnapshot, clearExcelSelectionCells } from '../mutations.js';
import { computeExcelOverlayStyleFromBounds, resolveExcelSelectionOverlayTableWrap } from '../overlay.js';
import {
  canHandleExcelCopy, canHandleExcelDocumentKeys, checkExcelMutationGuard,
  isEditableTarget, resolveExcelKeydownAction, shouldPreventExcelSelectStart,
} from '../cell-value.js';

const EXCEL_PROVIDE_KEYS = [
  'excelSelection', 'onExcelCellMouseDown', 'onExcelCellMouseOver',
  'getExcelColIndex', 'excelColumnSelect', 'isExcelModeEnabled',
  'getExcelOverlayStyle', 'scheduleExcelOverlayUpdate',
  'isExcelTextSelectModifier', 'onExcelTextSelectMouseDown', 'isExcelCellTextSelectable',
];

export function getExcelInject() {
  const inject = {};
  EXCEL_PROVIDE_KEYS.forEach((key) => { inject[key] = { default: null }; });
  return inject;
}

export function getExcelProvide(vm, bindMethods = false) {
  if (bindMethods && !vm.excelMode) return {};
  const provide = {};
  EXCEL_PROVIDE_KEYS.forEach((key) => {
    const val = vm[key];
    provide[key] = bindMethods && typeof val === 'function' ? val.bind(vm) : val;
  });
  return provide;
}

export default {
  props: {
    excelMode: { type: Boolean, default: false },
    excelModeUndoMax: { type: Number, default: 20 },
    excelModeSelectionColor: { type: String, default: '#337eff' },
  },
  data() {
    return {
      excelSelection: createEmptyExcelSelection(),
      excelUndoStack: [],
      excelRedoStack: [],
      excelDragging: false,
      excelTextSelectCellKey: null,
      excelOverlayStyles: {},
      exportExcelBlocking: false,
    };
  },
  computed: {
    isExcelModeEnabled() { return this.excelMode; },
    isExcelModePagination() {
      return this.usePagination || this.pageable === 'load-more' || this.pageable === 'auto-more';
    },
    excelModeSelectionStyle() {
      if (!this.isExcelModeEnabled || !this.excelModeSelectionColor) return null;
      return { '--table-view-excel-mode-selection-border': this.excelModeSelectionColor };
    },
    excelPasteableColumnVMs() {
      if (!this.isExcelModeEnabled) return [];
      return (this.visibleColumnVMs || []).filter((vm) => isExcelPasteableColumnVM(vm) && !vm.currentHidden);
    },
  },
  watch: {
    excelMode(enabled) {
      if (enabled) this.$nextTick(() => this._bindExcelDocEvents());
      else { this._unbindExcelDocEvents(); this.clearExcelSelection(); }
    },
    'currentDataSource.paging.number'() { if (this.isExcelModeEnabled) this.clearExcelSelection(); },
    'currentDataSource.paging.size'() { if (this.isExcelModeEnabled) this.clearExcelSelection(); },
    currentSorting() { if (this.isExcelModeEnabled) this.clearExcelSelection(); },
  },
  mounted() { if (this.isExcelModeEnabled) this._bindExcelDocEvents(); },
  beforeDestroy() { this._unbindExcelDocEvents(); },
  methods: {
    // --- Context / State ---
    _getExcelCtx() {
      return {
        currentData: this.currentData,
        currentDataSource: this.currentDataSource,
        externalDataSource: this.dataSource || this.data,
        excelPasteableColumnVMs: this.excelPasteableColumnVMs,
        isExcelPastePaginationMode: this.isExcelModePagination,
        isExcelPasteLoadMoreMode: this.pageable === 'load-more' || this.pageable === 'auto-more',
        pageSize: this.pageSize,
        getRealSimpleItem: (wrap) => this.getRealSimpleItem(wrap),
        $setAt: (obj, path, val) => this.$setAt(obj, path, val),
        $at: (obj, path) => this.$at(obj, path),
        processData: (data) => this.processData(data),
        valueField: this.valueField,
      };
    },

    _getExcelInputState() {
      return {
        isExcelModeEnabled: this.isExcelModeEnabled,
        exportExcelBlocking: this.exportExcelBlocking,
        activeElement: typeof document !== 'undefined' ? document.activeElement : null,
        readonly: this.readonly,
        disabled: this.disabled,
        treeDisplay: this.treeDisplay,
        selectionActive: !!(this.excelSelection && this.excelSelection.active),
        undoStackLength: this.excelUndoStack.length,
        redoStackLength: this.excelRedoStack.length,
        excelDragging: this.excelDragging,
        textSelectCellKey: this.excelTextSelectCellKey,
      };
    },

    // --- Undo Stack ---
    _trimStack(stack) {
      const max = this.excelModeUndoMax > 0 ? this.excelModeUndoMax : 20;
      while (stack.length > max) stack.shift();
    },

    _pushUndo(snapshot) {
      this.excelUndoStack.push(snapshot);
      this._trimStack(this.excelUndoStack);
      this.excelRedoStack = [];
    },

    // --- Provide Methods ---
    getExcelColIndex(columnVM) {
      return columnVM ? this.excelPasteableColumnVMs.indexOf(columnVM) : -1;
    },

    isExcelTextSelectModifier(event) { return !!(event && event.altKey); },

    isExcelCellTextSelectable(rowIndex, colIndex) {
      return this.excelTextSelectCellKey === `${rowIndex}-${colIndex}`;
    },

    onExcelTextSelectMouseDown(rowIndex, colIndex) {
      this.excelTextSelectCellKey = `${rowIndex}-${colIndex}`;
    },

    _focusExcelRoot() {
      const root = this.$refs.root;
      if (root?.focus) root.focus({ preventScroll: true });
    },

    // --- Overlay ---
    getExcelOverlayStyle(position) {
      return (position && this.excelOverlayStyles && this.excelOverlayStyles[position]) || null;
    },

    scheduleExcelOverlayUpdate() {
      if (!this.isExcelModeEnabled) return;
      if (this._overlayRaf) cancelAnimationFrame(this._overlayRaf);
      this._overlayRaf = requestAnimationFrame(() => {
        this._overlayRaf = null;
        this._updateOverlay();
      });
    },

    _updateOverlay() {
      if (!this.isExcelModeEnabled || !this.excelSelection.active) {
        this._clearOverlay();
        return;
      }
      const rowCount = (this.currentData || []).length;
      const bounds = getExcelSelectionBounds(this.excelSelection, rowCount);
      if (!bounds) { this._clearOverlay(); return; }

      const resolved = resolveExcelSelectionOverlayTableWrap(this.$refs.tableRender, 'static');
      if (!resolved || !resolved.container) { this._clearOverlay(); return; }

      const style = computeExcelOverlayStyleFromBounds(resolved.container, bounds, this.excelSelection.mode);
      if (!style) { this._clearOverlay(); return; }

      const pos = resolved.position || 'static';
      const prev = this.excelOverlayStyles[pos];
      if (prev && prev.top === style.top && prev.left === style.left
        && prev.width === style.width && prev.height === style.height) return;

      this._clearOverlay();
      this.$set(this.excelOverlayStyles, pos, style);
      if (this.$refs.tableRender) this.$refs.tableRender.$forceUpdate();
    },

    _clearOverlay() {
      Object.keys(this.excelOverlayStyles).forEach((k) => this.$delete(this.excelOverlayStyles, k));
    },

    // --- Selection State ---
    _notify() {
      this.$forceUpdate();
      if (this.$refs.tableRender) this.$refs.tableRender.$forceUpdate();
      this.$nextTick(() => this.scheduleExcelOverlayUpdate());
    },

    clearExcelSelection() {
      this.excelDragging = false;
      this.excelTextSelectCellKey = null;
      Object.assign(this.excelSelection, createEmptyExcelSelection());
      this._clearOverlay();
      this._notify();
    },

    _setExcelCopyActive(active) {
      if (!this.excelSelection || this.excelSelection.copyActive === active) return;
      this.excelSelection.copyActive = active;
      this._notify();
    },

    _applySelectionState(sel) {
      if (!sel) return;
      this.excelSelection.active = !!sel.active;
      this.$set(this.excelSelection, 'anchor', { rowIndex: sel.anchor?.rowIndex ?? -1, colIndex: sel.anchor?.colIndex ?? -1 });
      this.$set(this.excelSelection, 'focus', { rowIndex: sel.focus?.rowIndex ?? -1, colIndex: sel.focus?.colIndex ?? -1 });
      this.excelSelection.mode = sel.mode || 'cell';
      this.excelSelection.copyActive = false;
      if (!this.excelSelection.active) this._clearOverlay();
      this._notify();
    },

    // --- Selection Interactions ---
    excelColumnSelect(colIndex) {
      if (!this.isExcelModeEnabled || colIndex < 0) return;
      this.excelTextSelectCellKey = null;
      const rowCount = (this.currentData || []).length;
      this.excelSelection.active = true;
      this.$set(this.excelSelection, 'anchor', { rowIndex: 0, colIndex });
      this.$set(this.excelSelection, 'focus', { rowIndex: Math.max(0, rowCount - 1), colIndex });
      this.excelSelection.mode = 'column';
      this._setExcelCopyActive(false);
      this._focusExcelRoot();
      this._notify();
    },

    onExcelCellMouseDown(rowIndex, colIndex, event) {
      if (!this.isExcelModeEnabled || (event && event.button !== 0)) return;
      if (this.isExcelTextSelectModifier(event)) {
        this.onExcelTextSelectMouseDown(rowIndex, colIndex);
        return;
      }
      this.excelTextSelectCellKey = null;
      const shiftExtend = event && event.shiftKey && !event.altKey
        && this.excelSelection.anchor.rowIndex >= 0
        && this.excelSelection.anchor.colIndex >= 0;

      if (!shiftExtend) this._setExcelCopyActive(false);
      this.excelSelection.active = true;

      if (shiftExtend) {
        this.$set(this.excelSelection, 'focus', { rowIndex, colIndex });
        this.excelSelection.mode = 'range';
      } else {
        this.$set(this.excelSelection, 'anchor', { rowIndex, colIndex });
        this.$set(this.excelSelection, 'focus', { rowIndex, colIndex });
        this.excelSelection.mode = 'cell';
      }
      this.excelDragging = true;
      this._focusExcelRoot();
      this._notify();
    },

    onExcelCellMouseOver(rowIndex, colIndex) {
      if (!this.isExcelModeEnabled || !this.excelDragging) return;
      if (this.excelSelection.anchor.rowIndex < 0 || this.excelSelection.anchor.colIndex < 0) return;
      this.$set(this.excelSelection, 'focus', { rowIndex, colIndex });
      this.excelSelection.mode = 'range';
      this._notify();
    },

    // --- Document Events ---
    _bindExcelDocEvents() {
      if (this._excelBound) return;
      this._excelBound = true;

      this._onPaste = (e) => this._handlePaste(e);
      this._onCopy = (e) => this._handleCopy(e);
      this._onKeydown = (e) => this._handleKeydown(e);
      this._onMouseup = () => { this.excelDragging = false; this.excelTextSelectCellKey = null; };
      this._onKeyup = (e) => {
        if (this.isExcelModeEnabled && e.key === 'Shift') {
          const sel = window.getSelection && window.getSelection();
          if (sel && !sel.isCollapsed) sel.removeAllRanges();
        }
      };
      this._onSelectStart = (e) => {
        if (shouldPreventExcelSelectStart(this._getExcelInputState(), e)) e.preventDefault();
      };
      this._onClick = (e) => {
        if (this._shouldClearForClick(e.target)) this.clearExcelSelection();
      };

      document.addEventListener('paste', this._onPaste);
      document.addEventListener('copy', this._onCopy, true);
      document.addEventListener('keydown', this._onKeydown);
      document.addEventListener('mouseup', this._onMouseup);
      document.addEventListener('keyup', this._onKeyup);
      document.addEventListener('click', this._onClick);
      document.addEventListener('selectstart', this._onSelectStart);
      this._onResize = () => this.scheduleExcelOverlayUpdate();
      window.addEventListener('resize', this._onResize);
    },

    _unbindExcelDocEvents() {
      if (!this._excelBound) return;
      this._excelBound = false;
      document.removeEventListener('paste', this._onPaste);
      document.removeEventListener('copy', this._onCopy, true);
      document.removeEventListener('keydown', this._onKeydown);
      document.removeEventListener('mouseup', this._onMouseup);
      document.removeEventListener('keyup', this._onKeyup);
      document.removeEventListener('click', this._onClick);
      document.removeEventListener('selectstart', this._onSelectStart);
      if (this._onResize) { window.removeEventListener('resize', this._onResize); this._onResize = null; }
      if (this._overlayRaf) { cancelAnimationFrame(this._overlayRaf); this._overlayRaf = null; }
    },

    _shouldClearForClick(target) {
      if (!target) return false;
      const root = this.$refs.root;
      if (!root || !root.contains(target)) return true;
      const tr = this.$refs.tableRender;
      if (!tr || !tr.$el) return false;
      if (!tr.$el.contains(target)) return true;
      // 点击 table 内 editable 元素（input/textarea/select）时也清除选区
      return isEditableTarget(target);
    },

    // --- Clipboard / Mutation Handlers ---
    _excelGuards(showToast = true) {
      const guard = checkExcelMutationGuard(this._getExcelInputState(), showToast);
      if (!guard.ok && showToast && guard.toast && this.$toast) this.$toast.show(guard.toast);
      return guard.ok;
    },

    async _handlePaste(event) {
      const state = this._getExcelInputState();
      if (!canHandleExcelDocumentKeys(state) || !this._excelGuards(true)) return;
      const text = await readExcelClipboardText(event);
      if (text == null || text === '') return;

      // 双路径：内部结构化载荷（同表复制类型保真）优先，否则文本解析降级
      const internal = getExcelInternalPastePayload(text);
      let snapshot;
      if (internal && this._excelInternalFieldsMatch(internal.sourceFields)) {
        snapshot = applyExcelPaste(this._getExcelCtx(), internal.values, this.excelSelection, true);
      } else {
        const pasteRows = parseExcelTSV(text);
        if (!pasteRows.length) return;
        snapshot = applyExcelPaste(this._getExcelCtx(), pasteRows, this.excelSelection, false);
      }
      if (!snapshot) return;

      event.preventDefault();
      event.stopPropagation();

      this._pushUndo(snapshot);
      this.$emit('excel-paste', {
        rows: snapshot.touchedWrapRows.map((w) => this.getRealSimpleItem(w)),
        newRows: snapshot.addedRows.map((w) => this.getRealSimpleItem(w)),
        pasteData: snapshot.pasteRows,
        selection: snapshot.selection,
      });
      this._setExcelCopyActive(false);
      if (snapshot.destinationSelection) this._applySelectionState(snapshot.destinationSelection);
      else this.$forceUpdate();
    },

    // 源字段须与目标从 startCol 起的列逐一相等，否则降级文本避免跨结构错位污染
    _excelInternalFieldsMatch(sourceFields) {
      if (!sourceFields || !sourceFields.length) return false;
      const start = getExcelSelectionStart(this.excelSelection);
      const startCol = start ? start.colIndex : 0;
      const cols = (this.excelPasteableColumnVMs || []).slice(startCol);
      const n = Math.min(sourceFields.length, cols.length);
      for (let i = 0; i < n; i++) {
        if (!cols[i] || sourceFields[i] !== cols[i].field) return false;
      }
      return true;
    },

    _handleCopy(event) {
      const state = this._getExcelInputState();
      if (!canHandleExcelCopy(state)) return;
      const payload = buildExcelCopyPayloadFromSelection(this._getExcelCtx(), this.excelSelection);
      if (!payload) return;
      event.preventDefault();
      event.stopPropagation();
      if (!writeExcelClipboardFromEvent(payload.tsv, event)) {
        if (this.$toast) this.$toast.show('复制失败，请检查浏览器剪贴板权限');
        return;
      }
      this._setExcelCopyActive(true);
      this.$emit('excel-copy', {
        copyData: payload.matrix,
        tsv: payload.tsv,
        selection: {
          active: this.excelSelection.active,
          anchor: { ...this.excelSelection.anchor },
          focus: { ...this.excelSelection.focus },
          mode: this.excelSelection.mode,
        },
      });
    },

    _tryClear(event) {
      const snapshot = clearExcelSelectionCells(this._getExcelCtx(), this.excelSelection);
      if (!snapshot) return false;
      event.preventDefault();
      this._pushUndo(snapshot);
      this.$emit('excel-delete', {
        rows: snapshot.touchedWrapRows.map((w) => this.getRealSimpleItem(w)),
        newRows: [], pasteData: snapshot.pasteRows, selection: snapshot.selection,
      });
      this.$forceUpdate();
      return true;
    },

    _excelUndo() {
      if (!this.excelUndoStack.length) return;
      const snapshot = this.excelUndoStack.pop();
      applyExcelSnapshot(this._getExcelCtx(), snapshot, 'undo');
      this.excelRedoStack.push(snapshot);
      this._trimStack(this.excelRedoStack);
      this.$emit('excel-undo', { snapshot });
      if (snapshot.selection) this._applySelectionState(snapshot.selection);
      else this.$forceUpdate();
    },

    _excelRedo() {
      if (!this.excelRedoStack.length) return;
      const snapshot = this.excelRedoStack.pop();
      applyExcelSnapshot(this._getExcelCtx(), snapshot, 'redo');
      this.excelUndoStack.push(snapshot);
      this._trimStack(this.excelUndoStack);
      this.$emit('excel-redo', { snapshot });
      const sel = snapshot.destinationSelection || snapshot.selection;
      if (sel) this._applySelectionState(sel);
      else this.$forceUpdate();
    },

    _handleKeydown(event) {
      const state = this._getExcelInputState();
      if (!canHandleExcelDocumentKeys(state)) return;
      const action = resolveExcelKeydownAction(event, state);
      if (action.preventDefault) event.preventDefault();

      switch (action.type) {
        case 'escape': if (action.clearSelection) this.clearExcelSelection(); break;
        case 'clear-blocked': if (action.toast && this.$toast) this.$toast.show(action.toast); break;
        case 'clear-selection': this._tryClear(event); break;
        case 'undo': this._excelUndo(); break;
        case 'redo': this._excelRedo(); break;
        default: break;
      }
    },
  },
};
