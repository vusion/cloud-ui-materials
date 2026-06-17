/**
 * Excel 模式 Vue mixin：provide/inject、选区/编辑/overlay 状态、文档事件编排。
 */
import {
  parseExcelTSV,
  readExcelClipboardText,
  writeExcelClipboardText,
  buildExcelCopyPayloadFromSelection,
} from '../clipboard.js';
import {
  createEmptyExcelSelection,
  getExcelSelectionBounds,
  isExcelPasteableColumnVM,
} from '../selection.js';
import {
  applyExcelPaste,
  applyExcelSnapshot,
  clearExcelSelectionCells,
} from '../mutations.js';
import {
  computeExcelOverlayStyleFromBounds,
  resolveExcelSelectionOverlayTableWrap,
} from '../overlay.js';
import {
  canHandleExcelDocumentKeys,
  checkExcelMutationGuard,
  getExcelCellEditDraft,
  resolveExcelKeydownAction,
  shouldPreventExcelSelectStart,
} from '../cell-value.js';

const EXCEL_PROVIDE_KEYS = [
  'excelSelection',
  'onExcelCellMouseDown',
  'onExcelCellMouseOver',
  'getExcelColIndex',
  'excelColumnSelect',
  'excelRowSelect',
  'isExcelModeEnabled',
  'startExcelCellEdit',
  'commitExcelCellEdit',
  'cancelExcelCellEdit',
  'updateExcelCellDraft',
  'isExcelCellEditing',
  'getExcelCellDraft',
  'getExcelOverlayStyle',
  'scheduleExcelOverlayUpdate',
  'isExcelTextSelectModifier',
  'onExcelTextSelectMouseDown',
  'isExcelCellTextSelectable',
];

export function getExcelInject() {
  const inject = {};
  EXCEL_PROVIDE_KEYS.forEach((key) => {
    inject[key] = { default: null };
  });
  return inject;
}

export function getExcelProvide(vm, bindMethods = false) {
  if (bindMethods && !vm.excelMode) {
    return {};
  }
  const provide = {};
  EXCEL_PROVIDE_KEYS.forEach((key) => {
    const val = vm[key];
    provide[key] = bindMethods && typeof val === 'function' ? val.bind(vm) : val;
  });
  return provide;
}

export default {
  props: {
    excelMode: {
      type: Boolean,
      default: false,
    },
    excelModeUndoMax: {
      type: Number,
      default: 20,
    },
    excelModeSelectionColor: {
      type: String,
      default: '#337eff',
    },
  },
  data() {
    return {
      excelSelection: createEmptyExcelSelection(),
      excelUndoStack: [],
      excelRedoStack: [],
      excelDragging: false,
      excelRangeDragging: false,
      excelTextSelectCellKey: null,
      excelOverlayStyles: {},
      exportExcelBlocking: false,
      excelEditingCell: null,
    };
  },
  computed: {
    isExcelModeEnabled() {
      return this.excelMode;
    },
    isExcelModePagination() {
      return (
        this.usePagination
        || this.pageable === 'load-more'
        || this.pageable === 'auto-more'
      );
    },
    excelModeSelectionStyle() {
      if (!this.isExcelModeEnabled || !this.excelModeSelectionColor) {
        return null;
      }
      return {
        '--table-view-excel-mode-selection-border': this.excelModeSelectionColor,
      };
    },
    excelPasteableColumnVMs() {
      if (!this.isExcelModeEnabled) {
        return [];
      }
      return (this.visibleColumnVMs || []).filter(
        (vm) => isExcelPasteableColumnVM(vm) && !vm.currentHidden,
      );
    },
  },
  watch: {
    excelMode(enabled) {
      if (enabled) {
        this.$nextTick(() => this._bindExcelDocumentEvents());
      } else {
        this._unbindExcelDocumentEvents();
        this.cancelExcelCellEdit();
        this.clearExcelSelection();
      }
    },
    'currentDataSource.paging.number'() {
      if (this.isExcelModeEnabled) {
        this.clearExcelSelection();
      }
    },
    currentSorting() {
      if (this.isExcelModeEnabled) {
        this.clearExcelSelection();
      }
    },
  },
  mounted() {
    if (this.isExcelModeEnabled) {
      this._bindExcelDocumentEvents();
    }
  },
  beforeDestroy() {
    this._unbindExcelDocumentEvents();
  },
  methods: {
    _getExcelCtx() {
      return {
        currentData: this.currentData,
        currentDataSource: this.currentDataSource,
        excelPasteableColumnVMs: this.excelPasteableColumnVMs,
        isExcelPastePaginationMode: this.isExcelModePagination,
        isExcelPasteLoadMoreMode:
          this.pageable === 'load-more' || this.pageable === 'auto-more',
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
        hasEditingCell: !!this.excelEditingCell,
        anchorRowIndex: this.excelSelection?.anchor?.rowIndex ?? -1,
        anchorColIndex: this.excelSelection?.anchor?.colIndex ?? -1,
        undoStackLength: this.excelUndoStack.length,
        redoStackLength: this.excelRedoStack.length,
        excelDragging: this.excelDragging,
        excelRangeDragging: this.excelRangeDragging,
        textSelectCellKey: this.excelTextSelectCellKey,
      };
    },

    _trimExcelStack(stack) {
      const max = this.excelModeUndoMax > 0 ? this.excelModeUndoMax : 20;
      while (stack.length > max) {
        stack.shift();
      }
    },

    _pushExcelUndo(snapshot) {
      this.excelUndoStack.push(snapshot);
      this._trimExcelStack(this.excelUndoStack);
      this.excelRedoStack = [];
    },

    getExcelColIndex(columnVM) {
      if (!columnVM) {
        return -1;
      }
      return this.excelPasteableColumnVMs.findIndex(
        (vm) => vm === columnVM || vm.field === columnVM.field,
      );
    },

    _canHandleExcelKeys() {
      return canHandleExcelDocumentKeys(this._getExcelInputState());
    },

    _excelGuards(showToast = true) {
      const guard = checkExcelMutationGuard(this._getExcelInputState(), showToast);
      if (!guard.ok && showToast && guard.toast && this.$toast) {
        this.$toast.show(guard.toast);
      }
      return guard.ok;
    },

    _clearExcelCopyMode() {
      if (this.excelSelection && this.excelSelection.copyActive) {
        this.excelSelection.copyActive = false;
        this._notifyExcelSelectionChange();
      }
    },

    _setExcelCopyActive(active) {
      if (!this.excelSelection || this.excelSelection.copyActive === active) {
        return;
      }
      this.excelSelection.copyActive = active;
      this._notifyExcelSelectionChange();
    },

    isExcelTextSelectModifier(event) {
      return !!(event && event.altKey);
    },

    isExcelCellTextSelectable(rowIndex, colIndex) {
      return this.excelTextSelectCellKey === `${rowIndex}-${colIndex}`;
    },

    onExcelTextSelectMouseDown(rowIndex, colIndex) {
      this.excelTextSelectCellKey = `${rowIndex}-${colIndex}`;
    },

    _endExcelRangeDrag() {
      this.excelDragging = false;
      this.excelRangeDragging = false;
      this.excelTextSelectCellKey = null;
    },

    _clearExcelOverlayStyles() {
      Object.keys(this.excelOverlayStyles).forEach((key) => {
        this.$delete(this.excelOverlayStyles, key);
      });
    },

    _setExcelOverlayStyle(position, style) {
      const pos = position || 'static';
      this._clearExcelOverlayStyles();
      if (style) {
        this.$set(this.excelOverlayStyles, pos, style);
      }
    },

    getExcelOverlayStyle(position) {
      if (!position || !this.excelOverlayStyles) {
        return null;
      }
      return this.excelOverlayStyles[position] || null;
    },

    scheduleExcelOverlayUpdate() {
      if (!this.isExcelModeEnabled) {
        return;
      }
      if (this._excelOverlayRaf) {
        cancelAnimationFrame(this._excelOverlayRaf);
      }
      this._excelOverlayRaf = requestAnimationFrame(() => {
        this._excelOverlayRaf = null;
        this.updateExcelSelectionOverlay();
      });
    },

    updateExcelSelectionOverlay() {
      if (!this.isExcelModeEnabled || !this.excelSelection.active) {
        this._clearExcelOverlayStyles();
        return;
      }
      const rowCount = (this.currentData || []).length;
      const colCount = this.excelPasteableColumnVMs.length;
      const bounds = getExcelSelectionBounds(this.excelSelection, rowCount, colCount);
      if (!bounds) {
        this._clearExcelOverlayStyles();
        return;
      }

      const tableRender = this.$refs.tableRender;
      const resolved = resolveExcelSelectionOverlayTableWrap(tableRender, 'static');
      if (!resolved || !resolved.container) {
        this._clearExcelOverlayStyles();
        return;
      }
      const style = computeExcelOverlayStyleFromBounds(
        resolved.container,
        bounds,
        this.excelSelection.mode,
      );
      if (!style) {
        this._clearExcelOverlayStyles();
        return;
      }
      this._setExcelOverlayStyle(resolved.position, style);
    },

    _notifyExcelSelectionChange() {
      this.$forceUpdate();
      if (this.$refs.tableRender) {
        this.$refs.tableRender.$forceUpdate();
      }
      this.$nextTick(() => this.scheduleExcelOverlayUpdate());
    },

    clearExcelSelection() {
      this.cancelExcelCellEdit();
      this._endExcelRangeDrag();
      Object.assign(this.excelSelection, createEmptyExcelSelection());
      this._clearExcelOverlayStyles();
      this._notifyExcelSelectionChange();
    },

    _applyExcelSelectionState(sel) {
      if (!sel) {
        return;
      }
      this.excelSelection.active = !!sel.active;
      this.$set(this.excelSelection, 'anchor', {
        rowIndex: sel.anchor?.rowIndex ?? -1,
        colIndex: sel.anchor?.colIndex ?? -1,
      });
      this.$set(this.excelSelection, 'focus', {
        rowIndex: sel.focus?.rowIndex ?? -1,
        colIndex: sel.focus?.colIndex ?? -1,
      });
      this.excelSelection.mode = sel.mode || 'cell';
      this.excelSelection.copyActive = false;
      if (!this.excelSelection.active) {
        this._clearExcelOverlayStyles();
      }
      this._notifyExcelSelectionChange();
    },

    excelColumnSelect(colIndex) {
      if (!this.isExcelModeEnabled || colIndex < 0) {
        return;
      }
      this.commitExcelCellEdit();
      this.excelTextSelectCellKey = null;
      const rowCount = (this.currentData || []).length;
      this.excelSelection.active = true;
      this.$set(this.excelSelection, 'anchor', { rowIndex: 0, colIndex });
      this.$set(this.excelSelection, 'focus', { rowIndex: Math.max(0, rowCount - 1), colIndex });
      this.excelSelection.mode = 'column';
      this._clearExcelCopyMode();
      this._notifyExcelSelectionChange();
    },

    excelRowSelect(rowIndex) {
      if (!this.isExcelModeEnabled || rowIndex < 0) {
        return;
      }
      this.commitExcelCellEdit();
      this.excelTextSelectCellKey = null;
      const colCount = this.excelPasteableColumnVMs.length;
      this.excelSelection.active = true;
      this.$set(this.excelSelection, 'anchor', { rowIndex, colIndex: 0 });
      this.$set(this.excelSelection, 'focus', { rowIndex, colIndex: Math.max(0, colCount - 1) });
      this.excelSelection.mode = 'row';
      this._clearExcelCopyMode();
      this._notifyExcelSelectionChange();
    },

    onExcelCellMouseDown(rowIndex, colIndex, event) {
      if (!this.isExcelModeEnabled || (event && event.button !== 0)) {
        return;
      }
      if (this.isExcelTextSelectModifier(event)) {
        this.onExcelTextSelectMouseDown(rowIndex, colIndex);
        return;
      }
      if (
        this.excelEditingCell
        && !this.isExcelCellEditing(rowIndex, colIndex)
      ) {
        this.commitExcelCellEdit();
      }
      this.excelTextSelectCellKey = null;
      const shiftExtend = event && event.shiftKey && !event.altKey
        && this.excelSelection.anchor.rowIndex >= 0
        && this.excelSelection.anchor.colIndex >= 0;
      if (!shiftExtend) {
        this._clearExcelCopyMode();
      }
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
      this.excelRangeDragging = true;
      this._notifyExcelSelectionChange();
    },

    onExcelCellMouseOver(rowIndex, colIndex) {
      if (!this.isExcelModeEnabled || !this.excelDragging) {
        return;
      }
      if (this.excelSelection.anchor.rowIndex < 0 || this.excelSelection.anchor.colIndex < 0) {
        return;
      }
      this.$set(this.excelSelection, 'focus', { rowIndex, colIndex });
      this.excelSelection.mode = 'range';
      this._notifyExcelSelectionChange();
    },

    isExcelCellEditing(rowIndex, colIndex) {
      const ed = this.excelEditingCell;
      return !!ed && ed.rowIndex === rowIndex && ed.colIndex === colIndex;
    },

    getExcelCellDraft(rowIndex, colIndex) {
      const ed = this.excelEditingCell;
      if (!ed || ed.rowIndex !== rowIndex || ed.colIndex !== colIndex) {
        return '';
      }
      return ed.draft;
    },

    startExcelCellEdit(rowIndex, colIndex, initialDraft) {
      if (!this.isExcelModeEnabled || this.readonly || this.disabled) {
        return;
      }
      if (colIndex < 0 || rowIndex < 0) {
        return;
      }
      const vm = this.excelPasteableColumnVMs[colIndex];
      if (!vm || !vm.field) {
        return;
      }
      const wrap = (this.currentData || [])[rowIndex];
      const item = wrap && this.getRealSimpleItem(wrap);
      let draft = initialDraft;
      if (draft === undefined || draft === null) {
        const val = item ? this.$at(item, vm.field) : '';
        draft = getExcelCellEditDraft(val, vm.currentFormatter);
      }
      this.excelEditingCell = {
        rowIndex,
        colIndex,
        draft: String(draft),
      };
      this.excelSelection.active = true;
      this.$set(this.excelSelection, 'anchor', { rowIndex, colIndex });
      this.$set(this.excelSelection, 'focus', { rowIndex, colIndex });
      this.excelSelection.mode = 'cell';
      this._clearExcelCopyMode();
      this._notifyExcelSelectionChange();
    },

    updateExcelCellDraft(draft) {
      if (this.excelEditingCell) {
        this.$set(this.excelEditingCell, 'draft', draft);
      }
    },

    commitExcelCellEdit() {
      const ed = this.excelEditingCell;
      if (!ed) {
        return;
      }
      const vm = this.excelPasteableColumnVMs[ed.colIndex];
      const wrap = (this.currentData || [])[ed.rowIndex];
      const item = wrap && this.getRealSimpleItem(wrap);
      if (vm && item && vm.field) {
        this.$setAt(item, vm.field, ed.draft);
      }
      this.excelEditingCell = null;
      this._notifyExcelSelectionChange();
    },

    cancelExcelCellEdit() {
      if (!this.excelEditingCell) {
        return;
      }
      this.excelEditingCell = null;
      this._notifyExcelSelectionChange();
    },

    _bindExcelDocumentEvents() {
      if (this._excelEventsBound) {
        return;
      }
      this._excelEventsBound = true;
      this._onDocumentPaste = (e) => this._handleDocumentPaste(e);
      this._onDocumentKeydown = (e) => this._handleDocumentKeydown(e);
      this._onDocumentMouseup = () => this._endExcelRangeDrag();
      this._onDocumentSelectStart = (e) => {
        if (shouldPreventExcelSelectStart(this._getExcelInputState(), e)) {
          e.preventDefault();
        }
      };
      this._onDocumentClick = (e) => {
        if (!this.$refs.root || !this.$refs.root.contains(e.target)) {
          this.clearExcelSelection();
        }
      };
      document.addEventListener('paste', this._onDocumentPaste);
      document.addEventListener('keydown', this._onDocumentKeydown);
      document.addEventListener('mouseup', this._onDocumentMouseup);
      document.addEventListener('click', this._onDocumentClick);
      document.addEventListener('selectstart', this._onDocumentSelectStart);
      this._onWindowResize = () => this.scheduleExcelOverlayUpdate();
      window.addEventListener('resize', this._onWindowResize);
    },

    _unbindExcelDocumentEvents() {
      if (!this._excelEventsBound) {
        return;
      }
      this._excelEventsBound = false;
      document.removeEventListener('paste', this._onDocumentPaste);
      document.removeEventListener('keydown', this._onDocumentKeydown);
      document.removeEventListener('mouseup', this._onDocumentMouseup);
      document.removeEventListener('click', this._onDocumentClick);
      document.removeEventListener('selectstart', this._onDocumentSelectStart);
      if (this._onWindowResize) {
        window.removeEventListener('resize', this._onWindowResize);
        this._onWindowResize = null;
      }
      if (this._excelOverlayRaf) {
        cancelAnimationFrame(this._excelOverlayRaf);
        this._excelOverlayRaf = null;
      }
    },

    async _handleDocumentPaste(event) {
      if (!this._canHandleExcelKeys() || !this._excelGuards(true)) {
        return;
      }
      const text = await readExcelClipboardText(event);
      const pasteRows = parseExcelTSV(text);
      if (!pasteRows.length) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      const snapshot = applyExcelPaste(this._getExcelCtx(), pasteRows, this.excelSelection);
      if (!snapshot) {
        return;
      }

      this._pushExcelUndo(snapshot);
      const rows = snapshot.touchedWrapRows.map((wrap) => this.getRealSimpleItem(wrap));
      const newRows = snapshot.addedRows.map((wrap) => this.getRealSimpleItem(wrap));
      this.$emit('excel-paste', {
        rows,
        newRows,
        pasteData: snapshot.pasteRows,
        selection: snapshot.selection,
      });
      this._clearExcelCopyMode();
      if (snapshot.destinationSelection) {
        this._applyExcelSelectionState(snapshot.destinationSelection);
      } else {
        this.$forceUpdate();
      }
    },

    async _tryCopyExcelSelection(event) {
      if (!this._excelGuards(false)) {
        return false;
      }
      const payload = buildExcelCopyPayloadFromSelection(this._getExcelCtx(), this.excelSelection);
      if (!payload || !payload.tsv) {
        return false;
      }
      event.preventDefault();
      const ok = await writeExcelClipboardText(payload.tsv);
      if (!ok) {
        if (this.$toast) {
          this.$toast.show('复制失败，请检查浏览器剪贴板权限');
        }
        return true;
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
      return true;
    },

    _excelUndo() {
      if (!this.excelUndoStack.length) {
        return;
      }
      const snapshot = this.excelUndoStack.pop();
      applyExcelSnapshot(this._getExcelCtx(), snapshot, 'undo');
      this.excelRedoStack.push(snapshot);
      this._trimExcelStack(this.excelRedoStack);
      this.$emit('excel-undo', { snapshot });
      if (snapshot.selection) {
        this._applyExcelSelectionState(snapshot.selection);
      } else {
        this.$forceUpdate();
      }
    },

    _excelRedo() {
      if (!this.excelRedoStack.length) {
        return;
      }
      const snapshot = this.excelRedoStack.pop();
      applyExcelSnapshot(this._getExcelCtx(), snapshot, 'redo');
      this.excelUndoStack.push(snapshot);
      this._trimExcelStack(this.excelUndoStack);
      this.$emit('excel-redo', { snapshot });
      const sel = snapshot.destinationSelection || snapshot.selection;
      if (sel) {
        this._applyExcelSelectionState(sel);
      } else {
        this.$forceUpdate();
      }
    },

    _tryClearExcelSelection(event) {
      const snapshot = clearExcelSelectionCells(this._getExcelCtx(), this.excelSelection);
      if (!snapshot) {
        return false;
      }
      event.preventDefault();
      this._pushExcelUndo(snapshot);
      const rows = snapshot.touchedWrapRows.map((wrap) => this.getRealSimpleItem(wrap));
      this.$emit('excel-delete', {
        rows,
        newRows: [],
        pasteData: snapshot.pasteRows,
        selection: snapshot.selection,
      });
      this.$forceUpdate();
      return true;
    },

    _handleDocumentKeydown(event) {
      if (!this._canHandleExcelKeys()) {
        return;
      }

      const action = resolveExcelKeydownAction(event, this._getExcelInputState());

      if (action.preventDefault) {
        event.preventDefault();
      }

      switch (action.type) {
        case 'escape':
          if (action.cancelEdit) {
            this.cancelExcelCellEdit();
          } else if (action.clearSelection) {
            this.clearExcelSelection();
          }
          break;
        case 'clear-blocked':
          if (action.toast && this.$toast) {
            this.$toast.show(action.toast);
          }
          break;
        case 'clear-selection':
          this._tryClearExcelSelection(event);
          break;
        case 'start-edit':
          this.startExcelCellEdit(action.rowIndex, action.colIndex, action.initialDraft);
          break;
        case 'copy':
          this._tryCopyExcelSelection(event);
          break;
        case 'undo':
          this._excelUndo();
          break;
        case 'redo':
          this._excelRedo();
          break;
        default:
          break;
      }
    },
  },
};
