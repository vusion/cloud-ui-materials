import _debounce from 'lodash/debounce';
import _cloneDeep from 'lodash/cloneDeep';
import List from "@lcap-ui/src/list";
import Iconv from "@lcap-ui/src/iconv";
import Checkbox from "@lcap-ui/src/checkbox";
import { EmptyCol } from "@lcap-ui/src/emptycol";

// Utils
import { createNamespace, _get } from "@lcap-ui/src/utils";
const [createComponent, bem, t] = createNamespace('picker-list');
export default createComponent({
  props: {
    data: Array,
    value: [String, Number, Array],
    // 值字段
    valueField: {
      type: String
    },
    // 文本字段
    textField: {
      type: String
    },
    optionIsSlot: {
      type: Boolean,
      default: true
    },
    multiple: {
      type: Boolean,
      default: false
    },
    enableSelectAll: Boolean,
    enableSelectedCount: Boolean,
    loading: Boolean
  },
  data() {
    return {
      currentValue: _cloneDeep(this.value)
    };
  },
  watch: {
    value(val) {
      this.currentValue = _cloneDeep(val);
    }
    // currentValue(val) {
    //   this.$emit('update:value', val)
    // }
  },
  methods: {
    selectAll(cancel) {
      if (cancel) {
        this.currentValue = [];
        return;
      }
      const list = [];
      for (let i = 0; i < (this.data?.length || 0); i++) {
        const item = this.data[i];
        list.push(_get(item, this.valueField));
      }
      this.currentValue = list;
    },
    onSelect(value, index, item) {
      // 单选
      if (!this.multiple) {
        // eslint-disable-next-line eqeqeq
        if (this.currentValue == value) {
          this.currentValue = undefined;
        } else {
          this.currentValue = value;
        }
      } else {
        const idx = this.currentValue.indexOf(value);
        if (idx !== -1) {
          this.currentValue.splice(idx, 1);
        } else {
          this.currentValue.push(value);
        }
      }
      this.$emit('change', item, value, index);
    },
    onLoad() {
      this.$emit('scrolltolower');
    },
    // 暴露给上层调用
    getValue() {
      return [this.currentValue];
    },
    // 暴露给上层调用
    setValue(value) {
      this.currentValue = _cloneDeep(value);
    }
  },
  render(h) {
    const isInDesigner = this.$env && this.$env.VUE_APP_DESIGNER;
    return <div>
        <List ref="list" class={bem()} loading={this.loading} onLoad={_debounce(this.onLoad, 300)} offset={10}>
          {(this.data || []).map((item, index) => {
          const value = _get(item, this.valueField);
          const text = _get(item, this.textField);

          // eslint-disable-next-line eqeqeq
          const checked = this.multiple ? this.currentValue.includes(value) :
          // eslint-disable-next-line eqeqeq
          this.currentValue == value;
          return <div key={value} class={[bem('item'), this.multiple ? 'multiple' : 'single', checked ? 'checked' : '']} onClick={() => this.onSelect(value, index, item)} vusion-slot-name="option">
                {this.multiple && <div class="icon">
                    <Checkbox value={checked} shape="square">
                      {this.optionIsSlot && this.slots('option', {
                  ...item,
                  item
                }) || <div class={{
                  text: true,
                  checked
                }}>{text}</div>}
                    </Checkbox>
                  </div>}

                {!this.multiple && (this.optionIsSlot && this.slots('option', {
              ...item,
              item
            }) || <div class={{
              text: true,
              checked
            }}>{text}</div>)}

                {/* 单选 */}
                {checked && !this.multiple && <div class="icon">
                    <Iconv name="sure"></Iconv>
                  </div>}
              </div>;
        })}
        </List>
        {this.multiple && (this.enableSelectedCount || this.enableSelectAll) && <div class={bem('count')}>
            {this.enableSelectedCount && <span class="desc">
                {t('selected')}{' '}
                <span class="number">{this.currentValue?.length}</span> 项
              </span>}
            {this.enableSelectAll && <span>
                {this.currentValue.length === this.data.length ? <span class="handler" onClick={() => this.selectAll(true)}>
                    {t('cancelSelectAll')}
                  </span> : <span class="handler" onClick={() => this.selectAll()}>
                    {t('selectAll')}
                  </span>}
              </span>}
          </div>}
      </div>;
  }
});