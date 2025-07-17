import { sync } from '@lcap/vue2-utils';
import { createNamespace, isFunction, _get } from "@lcap-ui/src/utils";
import { formatResult } from "@lcap-ui/src/utils/format/data-source";
import Tab from "@lcap-ui/src/tab";
import Tabs from "@lcap-ui/src/tabs";
import Icon from "@lcap-ui/src/icon";
import Popup from "@lcap-ui/src/popup";
import Field from "@lcap-ui/src/field";
import Search from "@lcap-ui/src/search";

// Mixins
import { FieldMixin } from "@lcap-ui/src/mixins/field";
import DataSourceMixin from "@lcap-ui/src/mixins/DataSource";
import CssRuleClassName from "@lcap-ui/src/mixins/css-rule-classname";
import { EmptyCol } from "@lcap-ui/src/emptycol";
const [createComponent, bem, t] = createNamespace('cascader');
export default createComponent({
  mixins: [FieldMixin, DataSourceMixin, sync({
    value: 'currentValue',
    filterText: 'filterText',
    data: 'currentData',
    disabled: 'disabled',
    readonly: 'readonly'
  }), CssRuleClassName],
  props: {
    readonly: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    title: String,
    value: [Number, String],
    fieldNamesp: [Object, String],
    placeholder: {
      type: String,
      default: '请选择'
    },
    tabPlaceholder: {
      type: String,
      default: '请选择'
    },
    activeColor: String,
    converter: {
      type: String,
      default: 'json'
    },
    labelField: {
      type: String
    },
    closeOnPopstate: {
      type: Boolean,
      default: true
    },
    closeOnClickOverlay: {
      type: Boolean,
      default: false
    },
    novalue: {
      type: Boolean,
      default: false
    },
    notitleblock: {
      type: Boolean,
      default: false
    },
    inputAlign: String,
    // 筛选
    filterable: {
      type: Boolean,
      default: false
    },
    treeDisplay: {
      type: Boolean,
      default: false
    },
    // 组件内部默认不开启树，兼容老版本
    isNew: {
      type: Boolean,
      default: false
    },
    popupOpened: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      tabs: [],
      activeTab: 0,
      options: [],
      valuepopup: this.popupOpened,
      currentValue: this.value || '',
      filterData: []
    };
  },
  computed: {
    fieldNames() {
      if (this.fieldNamesp === null || this.fieldNamesp === undefined) return {};
      if (typeof this.fieldNamesp === 'string') return JSON.parse(this.fieldNamesp || '{}');
      if (typeof this.fieldNamesp === 'object') return this.fieldNamesp;
    },
    textKey() {
      return this.textField || this.fieldNames?.text || 'text';
    },
    valueKey() {
      return this.valueField || this.fieldNames?.value || 'value';
    },
    parentKey() {
      return this.parentField || this.fieldNames?.parentId || 'parentId';
    },
    childrenKey() {
      return this.childrenField || this.fieldNames?.children || 'children';
    },
    flattenData() {
      return this.flattenTree(this.currentData);
    },
    isDesignerNew() {
      return this.$env && this.$env.VUE_APP_DESIGNER_NEW;
    }
  },
  watch: {
    popupOpened(val) {
      this.valuepopup = val;
    },
    currentData: {
      deep: true,
      handler: 'updateTabs'
    },
    value(val) {
      this.currentValue = val;
    },
    currentValue(value) {
      if (value || value === 0) {
        const values = this.tabs.map(tab => {
          if (tab.selectedOption) {
            // return tab.selectedOption?.[this.valueKey];
            return _get(tab.selectedOption, this.valueKey);
          }
          return tab.selectedOption;
        });
        if (values.indexOf(value) !== -1) {
          return;
        }
      }
      this.updateTabs();
    }
  },
  methods: {
    designerOpen(e) {
      console.log('%c [ e ]-130', 'font-size:13px; background:pink; color:#bf2c9f;', e);
      let currentElement = e.target;
      let nodePath = false;
      while (currentElement) {
        const np = currentElement.getAttribute('vusion-node-path');
        if (np) {
          nodePath = np;
          break;
        }
        currentElement = currentElement.parentElement;
      }
      if (this?.$attrs?.['vusion-node-path'] === nodePath) {
        this.$refs.popforcas.togglePModal();
      }
    },
    designerClose() {
      // readme:ide会记录通过designerDbControl打开的浮窗，需要通过该命令清除，在触发方式双击变单击后，暂无作用
      if (window.parent && this?.$attrs?.['vusion-node-path']) {
        window.parent?.postMessage({
          protocol: 'vusion',
          sender: 'helper',
          type: 'send',
          command: 'setPopupStatusInfo',
          args: [{
            nodePath: this?.$attrs?.['vusion-node-path'],
            visible: false
          }]
        }, '*');
      }
      this.$refs.popforcas.togglePModal();
    },
    getTitle() {
      const ifDesigner = this.$env && this.$env.VUE_APP_DESIGNER;
      if (ifDesigner) {
        return this.value;
      }
      const selectedOptions = this.getSelectedOptionsByValue(this.options, this.currentValue) || [];
      const result = selectedOptions.map(option => _get(option, this.textKey)).join('/');
      return result;
    },
    getSelectedOptionsByValue(options, value) {
      for (let i = 0; i < options.length; i++) {
        const option = options[i];
        if (_get(option, this.valueKey) === value) {
          return [option];
        }
        if (option[this.childrenKey]) {
          const selectedOptions = this.getSelectedOptionsByValue(option[this.childrenKey], value);
          if (selectedOptions) {
            return [option, ...selectedOptions];
          }
        }
      }
    },
    async updateTabs() {
      this.options = formatResult(this.currentData);
      if (this.currentValue || this.currentValue === 0) {
        const selectedOptions = this.getSelectedOptionsByValue(this.options, this.currentValue);
        if (selectedOptions) {
          let optionsCursor = this.options;
          this.tabs = selectedOptions.map(option => {
            const tab = {
              options: optionsCursor,
              selectedOption: option
            };
            const next = optionsCursor.filter(item => _get(item, this.valueKey) === _get(option, this.valueKey));
            if (next.length) {
              optionsCursor = next[0][this.childrenKey];
            }
            return tab;
          });
          if (optionsCursor) {
            this.tabs.push({
              options: optionsCursor,
              selectedOption: null
            });
          }
          this.$nextTick(() => {
            this.activeTab = this.tabs.length - 1;
          });
          return;
        }
      }
      this.tabs = [{
        options: this.options,
        selectedOption: null
      }];
    },
    onSelect(option, tabIndex) {
      this.tabs[tabIndex].selectedOption = option;
      if (this.tabs.length > tabIndex + 1) {
        this.tabs = this.tabs.slice(0, tabIndex + 1);
      }
      if (option[this.childrenKey]) {
        const nextTab = {
          options: option[this.childrenKey],
          selectedOption: null
        };
        if (this.tabs[tabIndex + 1]) {
          this.$set(this.tabs, tabIndex + 1, nextTab);
        } else {
          this.tabs.push(nextTab);
        }
        this.$nextTick(() => {
          this.activeTab++;
        });
      }
      const selectedOptions = this.tabs.map(tab => tab.selectedOption).filter(item => !!item);
      const eventParams = {
        option,
        value: _get(option, this.valueKey),
        tabIndex,
        selectedOptions
      };
      this.currentValue = _get(option, this.valueKey);
      this.$emit('input', _get(option, this.valueKey));
      this.$emit('update:value', _get(option, this.valueKey));
      this.$emit('change', eventParams); // expose

      if (!option[this.childrenKey]) {
        this.$emit('finish', eventParams); // expose
        // if (this.$parent) {
        //   this.$parent.realValue = false;
        // }
        this.togglePopup();
      }
    },
    onSelectFilterItem(option) {
      const eventParams = {
        option,
        value: _get(option, this.valueKey),
        tabIndex: option.parents.length,
        selectedOptions: [...option.parents, option]
      };
      this.currentValue = _get(option, this.valueKey);
      this.$emit('update:value', _get(option, this.valueKey));
      this.$emit('change', eventParams); // expose
      this.$emit('finish', eventParams); // expose

      this.togglePopup();
      this.filterText = '';
    },
    onClose() {
      this.$emit('close');
    },
    onClear(e) {
      if (e) e.stopPropagation();
      this.currentValue = undefined;
      this.$emit('input', undefined);
      this.$emit('update:value', undefined);
      this.$emit('change', { value: undefined, tabIndex: undefined, selectedOptions: [] }); // expose
    },
    togglePopup() {
      this.valuepopup = !this.valuepopup;
      this.$refs.popforcas.togglePModal();
    },
    onClickField() {
      if (this.readonly || this.disabled) {
        return;
      }
      this.filterText = '';
      this.togglePopup();
    },
    // 覆盖mixin
    filter() {},
    onInput(value) {
      this.filterText = value;

      // 设置filterData
      this.filterData = this.flattenData.filter(item => {
        const text = _get(item, this.textField);
        if (!text) {
          return false;
        }
        if (text.indexOf(value) !== -1) {
          return true;
        }
        let isMatch = false;
        for (let i = 0; i < item.parents.length; i++) {
          const parent = item.parents[i];
          if (_get(parent, this.textKey).indexOf(value) !== -1) {
            isMatch = true;
            break;
          }
        }
        return isMatch;
      });
    },
    flattenTree(tree) {
      const result = [];
      const _this = this;
      function traverse(node, parents = []) {
        const children = _get(node, _this.childrenKey);
        if (children?.length) {
          for (let i = 0; i < children.length; i++) {
            traverse(children[i], [...parents, node]);
          }
        } else {
          result.push({
            ...node,
            parents
          });
        }
      }
      for (let i = 0; i < tree.length; i++) {
        traverse(tree[i]);
      }
      return result;
    },
    renderHeader() {
      if (this.isNew) {
        let topSlot = this.slots('picker-top');
        if (this.inDesigner() && !this.isDesignerNew) {
          if (!topSlot) {
            topSlot = <EmptyCol></EmptyCol>;
          }
        }
        if (topSlot) {
          return <div vusion-slot-name="picker-top">{topSlot}</div>;
        }
        return null;
      }
      return <div class={bem('header')}>
          <h2 class={bem('title')} vusion-slot-name="title">
            {this.slots('title') || (this.inDesigner() && !this.isDesignerNew ? <EmptyCol></EmptyCol> : this.title)}
          </h2>
          {this.closeable ? <Icon name="cross" class={bem('close-icon')} onClick={this.onClose} /> : null}
        </div>;
    },
    renderBottom() {
      if (!this.isNew) return null;
      let bottomSlot = this.slots('picker-bottom');
      if (this.inDesigner() && !this.isDesignerNew) {
        if (!bottomSlot) {
          bottomSlot = <EmptyCol></EmptyCol>;
        }
      }
      if (!bottomSlot) return null;
      return <div vusion-slot-name="picker-bottom">{bottomSlot}</div>;
    },
    renderOptions(options, selectedOption, tabIndex) {
      const isInDesigner = this.$env && this.$env.VUE_APP_DESIGNER;
      const renderOption = option => {
        const isSelected = selectedOption && _get(option, this.valueKey) === _get(selectedOption, this.valueKey);
        // option[this.valueKey] === selectedOption[this.valueKey];
        // console.log(option);

        const Text = this.slots('option', {
          option,
          selected: isSelected,
          ...option
        }) || (isInDesigner ? <EmptyCol></EmptyCol> : <span>{_get(option, this.textKey)}</span>);
        return <li class={bem('option', {
          selected: isSelected
        })} style={{
          color: isSelected ? this.activeColor : null
        }} onClick={() => {
          this.onSelect(option, tabIndex);
        }} vusion-slot-name="option">
            {Text}
            {isSelected ? <Icon name="success" class={bem('selected-icon')} /> : null}
          </li>;
      };
      return <ul class={bem('options')}>{options.map(renderOption)}</ul>;
    },
    renderTab(item, tabIndex) {
      const {
        options,
        selectedOption
      } = item;
      const title = selectedOption ? _get(selectedOption, this.textKey) : this.tabPlaceholder || t('select');
      return <Tab title={title} titleClass={bem('tab', {
        unselected: !selectedOption
      })}>
          {this.renderOptions(options, selectedOption, tabIndex)}
        </Tab>;
    },
    renderTabs() {
      if (this.filterText) {
        return <div class={bem('filter')}>
            {this.filterData?.map(item => <li class={bem('filter-option')} onClick={() => this.onSelectFilterItem(item)}>
                {item.parents.map(p => <span>{_get(p, this.textKey)}</span>)}
                <span>{_get(item, this.textKey)}</span>

                <div class="icon">
                  <van-icon name="arrow" color="#999" />
                </div>
              </li>)}
          </div>;
      }
      return <Tabs vModel={this.activeTab} animated swipeable swipeThreshold={0} class={bem('tabs')} color={this.activeColor}>
          {this.tabs.map(this.renderTab)}
        </Tabs>;
    },
    renderSearch() {
      if (!this.filterable) return null;
      return <Search shape="round" value={this.filterText} onInput={this.onInput} />;
    }
  },
  render() {
    const tempSlot = {
      title: () => this.slots('title')
    };
    return <div class={bem('wrapppcascader')} vusion-click-enabled="true">
        <Field label={this.labelField} value={this.getTitle()} placeholder={this.placeholder} scopedSlots={tempSlot} readonly disabled={this.disabled} isLink={false} input-align={this.inputAlign || 'right'} onClick={this.inDesigner() ? this.designerOpen : this.onClickField}
      // eslint-disable-next-line no-prototype-builtins
      notitle={!this.$slots.hasOwnProperty('title')} notitleblock={this.notitleblock} novalue={this.novalue} insel={true} nofi={true} clearable={this.clearable} clearTrigger="always"  {...{
        on: {
          clear: this.onClear
        }
      }}/>
        <Popup vModel={this.valuepopup} safe-area-inset-bottom round ref="popforcas" class={[bem('popup'), this.cssRuleClassName]} position={'bottom'} closeOnClickOverlay={this.closeOnClickOverlay}
      // onClickOverlay={this.togglePopup}
      get-container="body" // 放body下不易出现异常情况
      vusion-scope-id={this?.$vnode?.context?.$options?._scopeId} {...{
        attrs: {
          ...this.$attrs,
          'vusion-empty-background': undefined
        }
      }}>
          <div class={bem(this.isNew && 'content-wrapper')}>
            {this.inDesigner() && !this.isDesignerNew && <div class={bem('designer-close-button')} vusion-click-enabled="true" onClick={this.designerClose}>
                点击关闭
              </div>}
            {this.renderHeader()}
            {this.renderSearch()}
            {this.renderTabs()}
            {this.renderBottom()}
          </div>
        </Popup>
      </div>;
  }
});