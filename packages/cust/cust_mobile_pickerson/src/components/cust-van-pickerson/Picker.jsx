// Utils
import { createNamespace, _get } from "@lcap-ui/src/utils";
import { preventDefault } from "@lcap-ui/src/utils/dom/event";
import { BORDER_UNSET_TOP_BOTTOM } from "@lcap-ui/src/utils/constant";
import { pickerProps, DEFAULT_ITEM_HEIGHT } from './shared';
import { unitToPx } from "@lcap-ui/src/utils/format/unit";

// Components
import PickerColumn from './PickerColumn';
const [createComponent, bem, t] = createNamespace('picker-pick');
export default createComponent({
  props: {
    ...pickerProps,
    value: [Number, String],
    columnsprop: [Array, String],
    toolbarPosition: {
      type: String,
      default: 'top'
    },
    // 值字段
    valueField: {
      type: String
    },
    // 文本字段
    textField: {
      type: String
    }
  },
  data() {
    return {
      children: [],
      formattedColumns: [],
      columns: [],
      defaultIndex: 0,
      currentValue: this.value
    };
  },
  computed: {
    itemPxHeight() {
      return this.itemHeight ? unitToPx(this.itemHeight) : DEFAULT_ITEM_HEIGHT;
    },
    dataType() {
      const {
        columns
      } = this;
      const firstColumn = columns[0] || {};
      if (typeof firstColumn === 'object' && firstColumn !== null) {
        return 'object';
      }
      return 'text';
    }
  },
  watch: {
    columnsprop: {
      handler: 'format',
      immediate: true
    },
    currentValue: {
      handler: 'setDefaultColumn'
    },
    // 监听props变化
    value(val) {
      this.currentValue = val;
    }
  },
  mounted() {
    this.setDefaultColumn();
  },
  methods: {
    setDefaultColumn() {
      let index;
      if (this.dataType === 'text') {
        index = (this.columnsprop || []).findIndex(x => x === this.currentValue);
      } else {
        index = (this.columnsprop || []).findIndex(x => _get(x, this.valueField) === this.currentValue);
      }
      this.defaultIndex = index > -1 ? index : 0;
    },
    format() {
      this.columns = this.columnsprop || [];
      this.setDefaultColumn();
    },
    emit(event) {
      this.$emit(event, this.getColumnValue(0), this.getColumnIndex(0), this.getColumnText(0));
    },
    // 暴露给上层调用
    getValue() {
      return [this.getColumnValue(0), this.getColumnIndex(0), this.getColumnText(0)];
    },
    onChange(idx) {
      const value = this.getColumnValue(0);
      this.currentValue = value;
      this.$emit('change', this, value, this.getColumnIndex(0));

      // 到底了
      if (idx === this.columns.length - 1) {
        this.$emit('scrolltolower');
      }
    },
    // get column instance by index
    getColumn(index) {
      return this.children[index];
    },
    // @exposed-api
    // get column value by index
    getColumnValue(index) {
      const column = this.getColumn(index);
      const value = column && column.getValue();
      return this.dataType === 'text' ? value : _get(value, this.valueField);
    },
    getColumnText(index) {
      const column = this.getColumn(index);
      const value = column && column.getValue();
      return this.dataType === 'text' ? value : _get(value, this.textField);
    },
    // @exposed-api
    // set column value by index
    setColumnValue(index, value) {
      const column = this.getColumn(index);
      if (column) {
        column.setValue(value);
      }
    },
    // @exposed-api
    // get column option index by column index
    getColumnIndex(columnIndex) {
      return (this.getColumn(columnIndex) || {}).currentIndex;
    },
    // @exposed-api
    // set column option index by column index
    setColumnIndex(columnIndex, optionIndex) {
      const column = this.getColumn(columnIndex);
      if (column) {
        column.setIndex(optionIndex);
      }
    },
    // @exposed-api
    // get options of column by index
    getColumnValues(index) {
      return (this.children[index] || {}).options;
    },
    // @exposed-api
    // set options of column by index
    setColumnValues(index, options) {
      const column = this.children[index];
      if (column) {
        column.setOptions(options);
      }
    },
    // @exposed-api
    // get values of all columns
    getValues() {
      return this.children.map(child => child.getValue());
    },
    // @exposed-api
    // set values of all columns
    setValues(values) {
      values.forEach((value, index) => {
        this.setColumnValue(index, value);
      });
    },
    // @exposed-api
    // get indexes of all columns
    getIndexes() {
      return this.children.map(child => child.currentIndex);
    },
    // @exposed-api
    // set indexes of all columns
    setIndexes(indexes) {
      indexes.forEach((optionIndex, columnIndex) => {
        this.setColumnIndex(columnIndex, optionIndex);
      });
    },
    stopMomentum() {
      this.children.forEach(child => child.stopMomentum());
    },
    // @exposed-api
    confirm() {
      this.stopMomentum();
      this.emit('confirm');
      try {
        this.$parent.closeModal();
      } catch (error) {
        // console.error(error);
      }
    },
    cancel() {
      this.emit('cancel');
      try {
        this.$parent.closeModal();
      } catch (error) {
        // console.error(error);
      }
    },
    genTitle() {
      const titleSlot = this.slots('title');
      if (titleSlot) {
        return titleSlot;
      }
      if (this.title) {
        return <div class={['van-ellipsis', bem('title')]}>{this.title}</div>;
      }
    },
    genCancel() {
      return <button type="button" class={bem('cancel')} onClick={this.cancel}>
          {this.slots('cancel') || this.cancelButtonText || t('cancel')}
        </button>;
    },
    genConfirm() {
      return <button type="button" class={bem('confirm')} onClick={this.confirm}>
          {this.slots('confirm') || this.confirmButtonText || t('confirm')}
        </button>;
    },
    genToolbar() {
      if (this.showToolbar) {
        return <div class={bem('toolbar')}>
            {this.slots() || [this.genCancel(), this.genTitle(), this.genConfirm()]}
          </div>;
      }
    },
    genColumns() {
      const {
        itemPxHeight
      } = this;
      const wrapHeight = itemPxHeight * this.visibleItemCount;
      const frameStyle = {
        height: `${itemPxHeight}px`
      };
      const columnsStyle = {
        height: `${wrapHeight}px`
      };
      const maskStyle = {
        backgroundSize: `100% ${(wrapHeight - itemPxHeight) / 2}px`
      };
      return <div class={bem('columns')} style={columnsStyle} onTouchmove={preventDefault}>
          {this.genColumnItems()}
          <div class={bem('mask')} style={maskStyle} />
          <div class={[BORDER_UNSET_TOP_BOTTOM, bem('frame')]} style={frameStyle} />
        </div>;
    },
    genColumnItems() {
      return <PickerColumn readonly={this.readonly} disabled={this.disabled} textField={this.textField} allowHtml={this.allowHtml}
      // className={item.className}
      itemHeight={this.itemPxHeight} defaultIndex={+this.defaultIndex} swipeDuration={this.swipeDuration} visibleItemCount={this.visibleItemCount} initialOptions={this.columns || []} scopedSlots={{
        option: this.$scopedSlots.option
      }} onChange={idx => {
        this.onChange(idx);
      }} />;
    }
  },
  render(h) {
    return <div class={bem()}>
        {/* {this.toolbarPosition === 'top' ? this.genToolbar() : h()} */}
        {this.slots('columns-top')}
        {this.genColumns()}
        {this.slots('columns-bottom')}
        {/* {this.toolbarPosition === 'bottom' ? this.genToolbar() : h()} */}
      </div>;
  }
});