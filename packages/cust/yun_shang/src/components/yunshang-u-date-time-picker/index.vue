<template>
<div v-if="!isPreview" :class="$style.root" :width="width" :height="height">
    <u-input :class="$style.input" width="full" height="full" :value="genDisplayFormatText(finalDateTime)" ref="input" :autofocus="autofocus" :readonly="readonly" :disabled="disabled"
        :clearable="clearable" :placeholder="placeholder"
        @click.stop="toggle(true)"
        @update:value="onInput($event)" @focus="onFocus" @blur="onBlur"
        @blur:value="onBlurInputValue($event)"
        @clear="clearValue"
        :prefix="preIcon?preIcon:undefined"
        :suffix="suffixIcon?suffixIcon:undefined"
        :clear-icon="clearIcon?clearIcon:undefined"
        :color="formItemVM && formItemVM.color">
        <template #prefix><i-ico v-if="preIcon" :name="preIcon" :class="[$style.preIcon]" notext slot="prefix"></i-ico></template>
        <template #suffix><i-ico v-if="suffixIcon" :name="suffixIcon" :class="[$style.suffixIcon]" notext></i-ico></template>
    </u-input>
    <m-popper :class="$style.popper" ref="popper" :append-to="appendTo" :disabled="disabled || readonly" :placement="placement"
        @update:opened="currentOpened = $event"
        @toggle="onToggle($event)"
        @close="onPopperClose"
        @open="onPopperOpen">
        <div :class="$style.popperContent"  @click.stop>
            <div :class="$style.shortCuts" v-if="showShortCuts">
              <slot name="extra"></slot>
            </div>
            <div :class="$style.popperRight">
              <div :class="$style.popperhead">
                <u-input :placeholder="popperplaceholder" :class="$style.pickerinput" :value="showDate" clearable
                    ref="dateInput"
                    @clear="showDate=undefined"
                    @blur:value="onDateChange($event)">
                </u-input>
                <u-time-picker :class="$style.pickerinput" :readonly="readonly" :time="showTime"
                    width="50" :min-time="minTime" :max-time="maxTime"
                    :min-unit="minUnit"
                    :simple-foot="true" pre-icon=""
                    :disabled="!showDate"
                    @change="outRangeDateTime(showDate, $event.time)"
                    popper-width="134px">
                </u-time-picker>
            </div>
            <u-calendar :readonly="readonly" :year-diff="yearDiff" :year-add="yearAdd"
                :min-date="minCalendarDate" :max-date="maxCalendarDate" :date="showDate"
                :border="false"
                @select="outRangeDateTime($event.date, showTime)">
            </u-calendar>
            <div :class="$style.footer" v-if="showFooterButton || showRightNowButton">
                <u-linear-layout justify="space-between">
                    <u-linear-layout :class="$style.ctimewrap">
                        <u-link @click="setDateNow()" v-if="showRightNowButton" :readonly="readonly" :disabled="disabled || disabledNow">{{ rightNowTitle || $tt('now') }}</u-link>
                    </u-linear-layout>
                    <u-linear-layout :class="$style.btnwrap" v-if="showFooterButton">
                        <u-button @click="onCancel">{{ cancelTitle || $tt('cancel') }}</u-button>
                        <u-button @click="onConfirm" color="primary" :readonly="readonly" :disabled="disabled">{{ okTitle || $tt('submit') }}</u-button>
                    </u-linear-layout>
                </u-linear-layout>
            </div>
            </div>
        </div>
    </m-popper>
    <slot></slot>
</div>
<u-preview v-else :text="genDisplayFormatText(finalDateTime)"></u-preview>
</template>

<script>
import { sync } from '@lcap/vue2-utils';
import dayjs from "@lcap-ui/src/utils/dayjs";
import DateFormatMixin from "@lcap-ui/src/mixins/date.format";
// import { formatterOptions as dateFormatterOptions } from '../u-date-picker.vue/wrap';
import { formatterOptions as timeFormatterOptions } from "@lcap-ui/src/components/u-time-picker.vue/wrap";
import { format, transformDate } from "@lcap-ui/src/utils/date";
import MField from "@lcap-ui/src/components/m-field.vue";
import i18n from "@lcap-ui/src/components/u-date-time-picker.vue/i18n";
import UPreview from "@lcap-ui/src/components/u-text.vue";
import MPreview from "@lcap-ui/src/components/u-text.vue/preview";
import i18nMixin from "@lcap-ui/src/mixins/i18n";
/**
 * @class DateTimePicker
 * @extend Dropdown
 * @param {object}                  options                     =  绑定属性
 * @param {object=null}             options.date               <=> 当前选择的日期时间
 * @param {string='请输入'}         options.placeholder         => 文本框的占位文字
 * @param {Date|string=null}        options.minDate             => 最小日期时间，如果为空则不限制
 * @param {Date|string=null}        options.maxDate             => 最大日期时间，如果为空则不限制
 * @param {boolean=false}           options.autofocus           => 是否自动获得焦点
 * @param {boolean=false}           options.readonly            => 是否只读
 * @param {boolean=false}           options.disabled            => 是否禁用
 * @param {width|string|number}     options.width               => 输入框长度
 */

export default {
  name: 'u-date-time-picker',
  // i18n,
  mixins: [MField, DateFormatMixin, i18nMixin('u-date-time-picker'), MPreview, sync({
    value() {
      return this.finalDateTime ? this.toValue(new Date(this.finalDateTime.replace(/-/g, '/'))) : undefined;
    },
    readonly: 'readonly',
    preview: 'isPreview',
    opened: 'currentOpened',
    disabled: 'disabled',
    range: 'range',
  })],
  component: {
    UPreview
  },
  props: {
    preIcon: {
      type: String,
      default: 'calendar'
    },
    suffixIcon: {
      type: String,
      default: ''
    },
    clearIcon: {
      type: String
    },
    disabled: {
      type: Boolean,
      default: false
    },
    preview: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default() {
        return this.$tt('selectTimeText');
      }
    },
    readonly: {
      type: Boolean,
      default: false
    },
    autofocus: {
      type: Boolean,
      default: false
    },
    minDate: [String, Number, Date],
    maxDate: [String, Number, Date],
    date: [String, Number, Date],
    value: [String, Number, Date],
    // 优先使用
    yearDiff: {
      type: [String, Number],
      default: 20
    },
    yearAdd: {
      type: [String, Number],
      default: 20
    },
    converter: {
      type: String,
      default: 'json'
    },
    clearable: {
      type: Boolean,
      default: false
    },
    emptyValueIsNull: {
      type: Boolean,
      default: false
    },
    appendTo: {
      type: String,
      default: 'body',
      validator: value => ['body', 'reference'].includes(value)
    },
    opened: {
      type: Boolean,
      default: false
    },
    alignment: {
      type: String,
      default: 'left',
      validator(value) {
        return ['left', 'right'].includes(value);
      }
    },
    width: String,
    height: String,
    showRightNowButton: {
      type: Boolean,
      default: true
    },
    showFooterButton: {
      type: Boolean,
      default: true
    },
    rightNowTitle: {
      type: String,
      default: ''
    },
    cancelTitle: {
      type: String,
      default: ''
    },
    okTitle: {
      type: String,
      default: ''
    },
    showDateFormatter: {
      type: String,
      default: 'YYYY-MM-DD'
    },
    showTimeFormatter: {
      type: String,
      default: 'HH:mm:ss'
    },
    minUnit: {
      type: String,
      default: 'second'
    },
    showShortCuts: {
      type: Boolean,
      default: true,
    }
  },
  data() {
    return {
      currentOpened: this.opened,
      dateTime: this.format(this.value !== null && this.value !== undefined ? this.value : this.date, 'YYYY-MM-DD HH:mm:ss'),
      // popper选择以后的值
      open: false,
      minTime: undefined,
      maxTime: undefined,
      currentMaxDate: this.getMaxDate(),
      // 可能会存在最大值小于最小值情况，组件需要内部处理让最大值和最小值一样
      popperplaceholder: this.$tt('selectPopperDateText'),
      finalDateTime: this.format(this.value !== null && this.value !== undefined ? this.value : this.date, 'YYYY-MM-DD HH:mm:ss'),
      // 最外面的输入框
      showDate: undefined,
      // popper里的日期输入框
      showTime: undefined // popper里的时间输入框
    };
  },
  computed: {
    minCalendarDate() {
      return this.format(this.minDate, 'YYYY-MM-DD');
    },
    maxCalendarDate() {
      return this.format(this.currentMaxDate, 'YYYY-MM-DD');
    },
    spMinTime() {
      return this.format(this.minDate, 'HH:mm:ss');
    },
    spMaxTime() {
      return this.format(this.currentMaxDate, 'HH:mm:ss');
    },
    disabledNow() {
      const date = new Date();
      const {
        minDate,
        currentMaxDate
      } = this;
      let disabled = false;
      if (minDate) {
        disabled = date < this.transformDate(minDate);
      }
      if (!disabled && currentMaxDate) {
        disabled = date > this.transformDate(currentMaxDate);
      }
      return disabled;
    },
    placement() {
      if (this.alignment === 'left') return 'bottom-start';else if (this.alignment === 'right') return 'bottom-end';
      return '';
    },
    validShowTimeFormatters() {
      return timeFormatterOptions[this.minUnit];
    }
  },
  watch: {
    opened(val) {
      if (val !== this.currentOpened) {
        this.currentOpened = val;
      }
    },
    date(newValue) {
      this.dateTime = this.format(newValue, 'YYYY-MM-DD HH:mm:ss');
      this.finalDateTime = this.dateTime;
      this.$emit('update', this.handleEmptyValue(this.dateTime));
    },
    value(newValue) {
      this.dateTime = this.format(newValue, 'YYYY-MM-DD HH:mm:ss');
      this.finalDateTime = this.dateTime;
      this.$emit('update', this.handleEmptyValue(this.dateTime));
    },
    dateTime(newValue) {
      // 字符类型自动转为日期类型
      if (newValue === 'Invalid Date' || newValue === 'NaN') throw new TypeError('Invalid Date'); // 如果不为空并且超出日期范围，则设置为范围边界的日期
      if (newValue) {
        const isOutOfRange = this.isOutOfRange(newValue);
        if (isOutOfRange) newValue = this.format(isOutOfRange, 'YYYY-MM-DD HH:mm:ss');
      }
      const newDateTime = newValue ? this.toValue(new Date(newValue.replace(/-/g, '/'))) : undefined;
      this.showDate = this.format(newDateTime, 'YYYY-MM-DD');
      this.showTime = this.format(newDateTime, this.minUnit === 'minute' ? 'HH:mm' : 'HH:mm:ss');

      // 点击确定后才抛出事件，所以这里注释掉
      // this.$emit('update:date', newDateTime);
      // /**
      //  * @event change 日期时间改变时触发
      //  * @property {object} sender 事件发送对象
      //  * @property {object} date 改变后的日期时间
      //  */ this.$emit('change', {
      //     sender: this,
      //     date: newValue ? new Date(newValue.replace(/-/g, '/')).getTime() : undefined,
      // }); // 方便u-field组件捕获到其值
      // this.$emit('input', newDateTime);
    },
    maxDate(value) {
      this.currentMaxDate = this.getMaxDate(value);
    },
    minDate(value) {
      this.currentMaxDate = this.getMaxDate();
    }
  },
  created() {
    // vue中的watch的immediate的执行时间是比created生命周期函数执行时间还早 所以导致u-field无法捕获
    // this.$emit(
    //     'input',
    //     this.toValue(this.dateTime ? new Date(this.dateTime.replace(/-/g, '/')) : ''),
    // );
    this.$emit('update', this.handleEmptyValue(this.dateTime));
    this.lastChangedValue = this.finalDateTime ? new Date(this.finalDateTime.replace(/-/g, '/')).getTime() : undefined;
  },
  mounted() {
    this.autofocus && this.$refs.input.focus();
    // 在编辑器里不要打开
    if (!this.$env.VUE_APP_DESIGNER) this.toggle(this.opened);
  },
  methods: {
    getFormatString() {
      return 'YYYY-MM-DD HH:mm:ss';
    },
    getDisplayFormatString() {
      let formatter;
      if (this.advancedFormatEnable && this.advancedFormatValue) {
        // 高级格式化开启
        formatter = this.advancedFormatValue;
      } else if (this.showDateFormatter || this.showTimeFormatter) {
        // 配置的展示格式满足
        formatter = `${this.showDateFormatter} `;
        if (this.validShowTimeFormatters.includes(this.showTimeFormatter)) {
          formatter += this.showTimeFormatter;
        } else {
          formatter += this.validShowTimeFormatters[0];
        }
      }
      if (formatter) {
        return formatter;
      }
      return this.getFormatString();
    },
    genDisplayFormatText(value) {
      if (!value) return value;
      let text = value;
      try {
        const showFormatter = this.getDisplayFormatString();
        const valueFormatter = this.getFormatString();
        if (showFormatter && showFormatter !== valueFormatter) {
          text = dayjs(value, valueFormatter).format(showFormatter);
        }
      } catch (error) {
        console.log(error);
      }
      return text;
    },
    clearValue() {
      this.finalDateTime = undefined;
      this.emitValue();
    },
    toValue(date) {
      if (!date) return date;
      if (this.converter === 'format') return this.format(date, 'YYYY-MM-DD HH:mm:ss'); // value 的真实格式
      else if (this.converter === 'json') return date.toJSON();else if (this.converter === 'timestamp') return date.getTime();else return date;
    },
    /**
     * @method outRangeDateTime(date, time) 修改日期为最大日期或最小日期
     * @private
     * @return {void}
     */
    outRangeDateTime(date, time) {
      if (!time) {
        time = '00:00:00';
      }
      if (date) {
        date = new Date(date);
      } else {
        this.$emit('select', {
          sender: this,
          date: ''
        });
        return;
      }
      time = time.split(':');
      date.setHours(time[0] || 0);
      date.setMinutes(time[1] || 0);
      date.setSeconds(time[2] || 0);
      const datetime = this.format(date, 'YYYY-MM-DD');
      const dtime = this.format(date, 'HH:mm:ss');
      if (datetime === this.minCalendarDate && datetime === this.maxCalendarDate) {
        this.minTime = this.spMinTime;
        this.maxTime = this.spMaxTime;
      } else if (datetime === this.minCalendarDate && dtime < this.spMinTime) {
        const spMinTime = this.spMinTime.split(':');
        this.minTime = this.spMinTime;
        date.setHours(spMinTime[0]);
        date.setMinutes(spMinTime[1]);
        date.setSeconds(spMinTime[2]);
      } else if (datetime === this.maxCalendarDate && dtime > this.spMaxTime) {
        const spMaxTime = this.spMaxTime.split(':');
        this.maxTime = this.spMaxTime;
        date.setHours(spMaxTime[0]);
        date.setMinutes(spMaxTime[1]);
        date.setSeconds(spMaxTime[2]);
      } else if (datetime === this.minCalendarDate) {
        this.minTime = this.spMinTime;
        this.maxTime = undefined;
      } else if (datetime === this.maxCalendarDate) {
        this.minTime = undefined;
        this.maxTime = this.spMaxTime;
      } else {
        this.minTime = undefined;
        this.maxTime = undefined;
      } // if (datetime === this.minCalendarDate || datetime === this.maxCalendarDate)
      this.dateTime = this.format(date, 'YYYY-MM-DD HH:mm:ss');
      this.$emit('select', {
        sender: this,
        date: new Date(date).getTime()
      });
      this.preventBlur = true;
      // 隐藏底部确认取消按钮时，更新日期相当于直接确认操作
      if (!this.showFooterButton) {
        this.finalDateTime = this.dateTime;
        this.emitValue();
      }
    },
    /**
     * @method onDateTimeChange(date, time) 日期或时间改变后更新日期时间
     * @private
     * @return {void}
     */
    onDateTimeChange(date, time) {
      if (!time) time = '00:00:00';
      date = new Date(date);
      time = time.split(':');
      date.setHours(time[0]);
      date.setMinutes(time[1]);
      date.setSeconds(time[2]);
      this.dateTime = this.format(date, 'YYYY-MM-DD HH:mm:ss');
      this.$emit('select', {
        sender: this,
        date: new Date(date).getTime()
      });
    },
    /**
     * @method onInput($event) 输入日期
     * @private
     * @param  {object} $event
     * @return {void}
     */
    onInput($event) {
      const value = $event;
      if (value === '') {
        // 可以输空值
        this.finalDateTime = undefined;
        this.emitValue();
        return;
      }
      if (this.checkValid(value)) {
        let date = dayjs(value, this.getDisplayFormatString()).toDate();
        const isOutOfRange = this.isOutOfRange(date); // 超出范围还原成上一次值
        date = isOutOfRange ? this.finalDateTime : date;
        this.finalDateTime = this.format(date, 'YYYY-MM-DD HH:mm:ss');
        this.$refs.input.updateCurrentValue(this.genDisplayFormatText(this.finalDateTime));
        this.emitValue();
      }
    },
    onBlurInputValue(value) {
      if (!this.checkValid(value)) {
        this.$refs.input.updateCurrentValue(this.genDisplayFormatText(this.finalDateTime));
      }
    },
    updateDate(value) {
      let date = value ? new Date(value) : null;
      if (date !== null && date.toString() !== 'Invalid Date') {
        date = this.isOutOfRange(date) || date;
        this.dateTime = this.format(date, 'YYYY-MM-DD HH:mm:ss');
      } else {
        this.dateTime = '';
      }
      if (!this.showFooterButton) {
        this.finalDateTime = this.dateTime;
        this.emitValue();
      }
    },
    setDateNow() {
      this.updateDate(new Date());
    },
    /**
     * @method isOutOfRange(date) 是否超出规定的日期时间范围
     * @public
     * @param {Date} date 待测的日期时间
     * @return {boolean|Date} date 如果没有超出日期时间范围，则返回false；如果超出日期时间范围，则返回范围边界的日期时间
     */
    isOutOfRange(date) {
      date = this.transformDate(date);
      const minDate = this.transformDate(this.minDate);
      const maxDate = this.transformDate(this.currentMaxDate); // minDate && date < minDate && minDate，先判断是否为空，再判断是否超出范围，如果超出则返回范围边界的日期时间。

      if (maxDate && minDate && maxDate < minDate) {
        console.warn('error: maxDate < minDate');
        return false;
      }
      return minDate && date < minDate && minDate || maxDate && date > maxDate && maxDate;
    },
    toggle(value) {
      this.$refs.popper && this.$refs.popper.toggle(value);
    },
    format,
    transformDate,
    getMaxDate(value) {
      value = value || this.maxDate;
      const minTime = new Date(this.minDate).getTime();
      const maxTime = new Date(value).getTime();
      if (maxTime < minTime) return this.minDate;else return this.maxDate;
    },
    /**
     * @method toggle(flag) 是否显示日历组件
     * @public
     * @param {flag} true 显示 false 隐藏
     */
    onToggle($event) {
      this.$emit('toggle', $event);
      if ($event && $event.opened) {
        this.preventBlur = true;
      }
    },
    onBlur(e) {
      // 只有autofocus的input的blur
      if (this.preventBlur) return this.preventBlur = false;
      this.$emit('blur', e, this);
    },
    onFocus(e) {
      this.$emit('focus', e, this);
    },
    onPopperClose(e) {
      this.$emit('blur', e, this);
      setTimeout(() => {
        // 为了不触发input的blur，否则会有两次blur
        this.preventBlur = false;
      }, 0);
    },
    onCancel() {
      this.toggle(false);
    },
    onConfirm() {
      this.toggle(false);
      this.finalDateTime = this.dateTime;
      this.emitValue();
    },
    emitChange(value) {
      if (this.lastChangedValue === value) return;
      this.$emit('change', {
        sender: this,
        date: this.handleEmptyValue(value)
      });
      this.lastChangedValue = value;
    },
    emitValue() {
      const newDateTime = this.finalDateTime ? this.toValue(new Date(this.finalDateTime.replace(/-/g, '/'))) : undefined;
      this.$emit('update:value', this.handleEmptyValue(newDateTime));
      this.$emit('update:date', this.handleEmptyValue(newDateTime));
      /**
       * @event change 日期时间改变时触发
       * @property {object} sender 事件发送对象
       * @property {object} date 改变后的日期时间
       */
      this.emitChange(this.finalDateTime ? new Date(this.finalDateTime.replace(/-/g, '/')).getTime() : undefined); // 方便u-field组件捕获到其值
      this.$emit('input', this.handleEmptyValue(newDateTime));
    },
    onPopperOpen() {
      if (!this.finalDateTime) {
        this.dateTime = undefined;
        this.showDate = undefined;
        this.showTime = undefined;
        return;
      }
      this.dateTime = this.format(new Date(this.finalDateTime.replace(/-/g, '/')), 'YYYY-MM-DD HH:mm:ss');
      this.showDate = this.format(this.dateTime, 'YYYY-MM-DD');
      this.showTime = this.format(this.dateTime, 'HH:mm:ss');
    },
    /**
     * 时间输入框输入的时候
     */
    onDateChange(value) {
      if (!value) {
        this.showDate = undefined;
        return;
      }
      let showDate = this.format(this.finalDateTime, 'YYYY-MM-DD');
      if (this.checkDate(value)) {
        const minTimeStr = !this.spMinTime || this.spMinTime === 'undefined' ? '00:00:00' : this.spMinTime;
        const date = new Date(this.transformDate(`${value} ${minTimeStr}`));
        const isOutOfRange = this.isOutOfRange(date); // 超出范围还原成上一次值
        if (!isOutOfRange) {
          showDate = this.format(date, 'YYYY-MM-DD');
        }
      }
      this.showDate = showDate;
      this.$refs.dateInput.updateCurrentValue(this.showDate);
      this.outRangeDateTime(this.showDate, this.showTime);
    },
    checkValid(value) {
      return dayjs(value, this.getDisplayFormatString(), true).isValid();

      // const reg = /^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])\s+(20|21|22|23|[0-1]\d):[0-5]\d:[0-5]\d$/;
      // return reg.test(value);
    },
    checkDate(value) {
      const reg = /^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
      return reg.test(value);
    },
    handleEmptyValue(value) {
      if (!this.emptyValueIsNull) {
        return value;
      } else {
        return value ? value : null;
      }
    },
    close() {
      this.$refs.popper && this.$refs.popper.close();
    }
  }
};
</script>
<style module>
.root {
    display: inline-block;
    position: relative;
    max-width: 100%; /* 防止表格等小的地方超出区域 */
    width: var(--datetime-input-width);
}

.input {
    padding: 0 var(--datetime-input-padding-x);
    border: var(--datetime-input-border-width) solid var(--datetime-input-border-color);
    color: var(--datetime-input-color);
    background: var(--datetime-input-background);
    border-radius: var(--datetime-input-border-radius);
    width: var(--datetime-input-width);
    height: var(--datetime-input-height);
}
.input [class^="u-input_placeholder__"] {
    color: var(--datetime-input-placeholder-color);
}

.root[width="mini"] {
    width: var(--datetime-input-width-mini);
}
.root[width="mini"] .input {
    padding-left: var(--datetime-input-padding-x-mini);
    padding-right: var(--datetime-input-padding-x-mini);
}

.root[height="mini"] .input {
    height: var(--datetime-input-height-mini);
    line-height: calc(var(--datetime-input-height-mini) - var(--datetime-input-border-width) * 2);
}

.root[width="small"] {
    width: var(--datetime-input-width-small);
}

.root[width="small"] .input{
    padding-left: var(--datetime-input-padding-x-small);
    padding-right: var(--datetime-input-padding-x-small);
}

.root[height="small"] .input {
    height: var(--datetime-input-height-small);
    line-height: calc(var(--datetime-input-height-small) - var(--datetime-input-border-width) * 2);
}

.root[width="normal"] {
    width: var(--datetime-input-width);
}

.root[width="normal"] .input {
    padding-left: var(--datetime-input-padding-x);
    padding-right: var(--datetime-input-padding-x);
}

.root[height="normal"] .input {
    height: var(--datetime-input-height);
    line-height: calc(var(--datetime-input-height) - var(--datetime-input-border-width) * 2);
}

.root[width="medium"] {
    width: var(--datetime-input-width-medium);
}

.root[width="medium"] .input {
    padding-left: var(--datetime-input-padding-x-medium);
    padding-right: var(--datetime-input-padding-x-medium);
}

.root[height="medium"] .input {
    height: var(--datetime-input-height-medium);
    line-height: calc(var(--datetime-input-height-medium) - var(--datetime-input-border-width) * 2);
}

.root[width="large"] {
    width: var(--datetime-input-width-large);
}

.root[width="large"] .input {
    padding-left: var(--datetime-input-padding-x-large);
    padding-right: var(--datetime-input-padding-x-large);
}

.root[height="large"] .input {
    height: var(--datetime-input-height-large);
    line-height: calc(var(--datetime-input-height-large) - var(--datetime-input-border-width) * 2);
}

.root[width="huge"] {
    width: var(--datetime-input-width-huge);
}

.root[width="huge"] .input {
    padding-left: var(--datetime-input-padding-x-huge);
    padding-right: var(--datetime-input-padding-x-huge);
}

.root[height="huge"] .input {
    height: var(--datetime-input-height-huge);
    line-height: calc(var(--datetime-input-height-huge) - var(--datetime-input-border-width) * 2);
}

.root[width="full"] {
    width: 100%;
    padding-right: var(--datetime-input-padding-x-full);
}

.root[width="full"] .input {
    padding-left: var(--datetime-input-padding-x-full);
    padding-right: var(--datetime-input-padding-x-full);
}

.root[height="full"] .input {
    height: 100%;
}

.preIcon {
    left: 12px;
    color: var(--datetime-input-pre-icon-color);
}

.suffixIcon {
    right: 12px;
    color: var(--datetime-input-after-icon-color);
}

.timePicker {
    width: 100%;
    box-sizing: border-box;
    padding-left: 32px;
}

.footer {
    padding: 10px 8px;
    border-top: 1px solid var(--datetime-popper-border-color);
}

.pickerinput[class] {
    width: 134px;
    height: 32px;
}

.pickerinput + .pickerinput {
    margin-left: 8px;
}

.popperhead {
    padding: 12px;
    border-bottom: 1px solid var(--datetime-popper-border-color);
}

.popper {
    background: white;
    border: 1px solid var(--datetime-popper-border-color);
    border-radius: var(--datetime-popper-border-radius);
}
.footbtn {
    width: 80px;
    height: 32px;
    padding: 0;
    line-height: 30px;
}
.ctimewrap {
    padding: 3px 0 0 7px;
}
.btnwrap[direction="horizontal"] > *:not(:last-child){
    margin-right: 10px;
}

.popperContent {
  display: flex;
}

.shortCuts {
  border-right: 1px solid var(--calendar-border-color);
}
</style>