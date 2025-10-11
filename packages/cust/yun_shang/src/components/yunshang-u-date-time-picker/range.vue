<template>
<div v-if="!isPreview" :class="$style.root" :width="width" :height="height">
    <u-range-input
        :class="$style.input"
        ref="input"
        :autofocus="autofocus"
        :readonly="readonly"
        :disabled="disabled"
        left-width="full"
        :left-value="genDisplayFormatText(finalStartDateTime)"
        :right-value="genDisplayFormatText(finalEndDateTime)"
        :clearable="clearable" :placeholder="placeholder"
        :placeholder-right="placeholderRight"
        @left-click="togglePopper(true)"
        @right-click="togglePopper(true)"
        @update:value="onInput($event)" @focus="onFocus" @blur="onBlur"
        @blur:value="onBlurInputValue($event)"
        @clear="clearValue"
        :pre-icon="preIcon"
        :suffix-icon="suffixIcon"
        :clear-icon="clearIcon ? clearIcon : undefined"
        :color="formItemVM && formItemVM.color">
    </u-range-input>
    <m-popper :class="$style.popper" ref="popper" :append-to="appendTo" :disabled="disabled || readonly" :placement="placement"
        @update:opened="currentOpened = $event"
        @toggle="onToggle($event)"
        @close="onPopperClose"
        @open="onPopperOpen">
        <div :class="$style.popperContent" @click.stop>
            <div :class="$style.threeColumnLayout">
                <div :class="$style.shortCuts" v-if="showShortCuts">
                    <slot name="extra"></slot>
                </div>
                <div :class="$style.calendarContainer">
                    <div :class="$style.timeSelectionRow">
                        <div :class="$style.timeSection">
                            <div :class="$style.timeSectionTitle">开始时间</div>
                            <div :class="$style.timeInputs">
                                <u-input :placeholder="popperplaceholder" :class="$style.pickerinput" 
                                    :value="startShowDate" clearable
                                    ref="startDateInput"
                                    @clear="startShowDate=undefined"
                                    @blur:value="onRangeDateChange($event, 'start')">
                                </u-input>
                                <u-time-picker :class="$style.pickerinput" :readonly="readonly" 
                                    :time="startShowTime"
                                    width="50" :min-time="startMinTime" :max-time="startMaxTime"
                                    :simple-foot="true" pre-icon=""
                                    :min-unit="minUnit"
                                    :disabled="!startShowDate"
                                    @change="outRangeDateTime(startShowDate, $event.time, 'start')"
                                    popper-width="134px">
                                </u-time-picker>
                            </div>
                        </div>
                        <div :class="$style.timeSection">
                            <div :class="$style.timeSectionTitle">结束时间</div>
                            <div :class="$style.timeInputs">
                                <u-input :placeholder="popperplaceholder" :class="$style.pickerinput" 
                                    :value="endShowDate" clearable
                                    ref="endDateInput"
                                    @clear="endShowDate=undefined"
                                    @blur:value="onRangeDateChange($event, 'end')">
                                </u-input>
                                <u-time-picker :class="$style.pickerinput" :readonly="readonly" 
                                    :time="endShowTime"
                                    width="50" :min-time="endMinTime" :max-time="endMaxTime"
                                    :simple-foot="true" pre-icon=""
                                    :min-unit="minUnit"
                                    :disabled="!endShowDate"
                                    @change="outRangeDateTime(endShowDate, $event.time, 'end')"
                                    popper-width="134px">
                                </u-time-picker>
                            </div>
                        </div>
                    </div>
                    <div :class="$style.calendarPanel">
                        <u-calendar-range
                            :readonly="readonly" 
                            :year-diff="yearDiff" 
                            :year-add="yearAdd"
                            :min-date="minDate" 
                            :max-date="maxDate" 
                            :start-date="startCalendarDate"
                            :end-date="endCalendarDate"
                            @select="handleCalendarRangeSelect($event)">
                        </u-calendar-range>
                    </div>
                </div>
            </div>
            <div :class="$style.footer" v-if="showFooterButton || showRightNowButton">
                <u-linear-layout justify="space-between">
                    <u-linear-layout :class="$style.ctimewrap">
                        <u-link :class="$style.ctime" @click="setDateNow()" v-if="showRightNowButton" :readonly="readonly" :disabled="disabled || disabledNow">{{ rightNowTitle || $tt('now') }}</u-link>
                    </u-linear-layout>
                    <u-linear-layout :class="$style.btnwrap" v-if="showFooterButton">
                        <u-button @click="onCancel">{{ cancelTitle || $tt('cancel') }}</u-button>
                        <u-button @click="onConfirm" color="primary" :readonly="readonly" :disabled="disabled || isConfirmDisabled">{{ okTitle || $tt('submit') }}</u-button>
                    </u-linear-layout>
                </u-linear-layout>
            </div>
        </div>
    </m-popper>
    <slot></slot>
</div>
<u-preview v-else :text="previewText"></u-preview>
</template>

<script>
import { sync } from '@lcap/vue2-utils';
import dayjs from "@lcap-ui/src/utils/dayjs";
import DateFormatMixin from "@lcap-ui/src/mixins/date.format";
// import { formatterOptions as dateFormatterOptions } from '../u-date-picker.vue/wrap';
import { formatterOptions as timeFormatterOptions } from "@lcap-ui/src/components/u-time-picker.vue/wrap";
import { format, transformDate } from "@lcap-ui/src/utils/date";
import MField from "@lcap-ui/src/components/m-field.vue";
import URangeInput from "@lcap-ui/src/components/u-date-picker.vue/range-input.vue";
import i18n from "@lcap-ui/src/components/u-date-time-picker.vue/i18n";
import i18nMixin from "@lcap-ui/src/mixins/i18n";
import UPreview from "@lcap-ui/src/components/u-text.vue";
import MPreview from "@lcap-ui/src/components/u-text.vue/preview";
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
  name: 'u-date-time-range-picker',
  // i18n,
  components: {
    URangeInput,
    UPreview
  },
  mixins: [MField, MPreview, DateFormatMixin, i18nMixin('u-date-time-picker'), sync({
    startDate() {
      return this.finalStartDateTime ? this.toValue(new Date(this.finalStartDateTime.replace(/-/g, '/'))) : undefined;
    },
    endDate() {
      return this.finalEndDateTime ? this.toValue(new Date(this.finalEndDateTime.replace(/-/g, '/'))) : undefined;
    },
    readonly: 'readonly',
    preview: 'isPreview',
    opened: 'currentOpened',
    disabled: 'disabled',
    range: 'range',
  })],
  props: {
    preIcon: {
      type: String,
      default: 'calendar'
    },
    suffixIcon: {
      type: String
    },
    clearIcon: {
      type: String
    },
    disabled: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default() {
        return this.$tt('selectTimeText');
      }
    },
    placeholderRight: {
      type: String
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
    startDate: {
      type: [String, Number, Date]
    },
    endDate: {
      type: [String, Number, Date]
    },
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
    preview: {
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
      startDateTime: this.format(this.startDate, 'YYYY-MM-DD HH:mm:ss'),
      // popper选择以后的值
      endDateTime: this.format(this.endDate, 'YYYY-MM-DD HH:mm:ss'),
      // popper选择以后的值
      open: false,
      startMinTime: undefined,
      startMaxTime: undefined,
      endMinTime: undefined,
      endMaxTime: undefined,
      currentMaxDate: this.getMaxDate(),
      // 可能会存在最大值小于最小值情况，组件需要内部处理让最大值和最小值一样
      popperplaceholder: this.$tt('selectPopperDateText'),
      finalStartDateTime: this.format(this.startDate, 'YYYY-MM-DD HH:mm:ss'),
      // 最外面的输入框
      finalEndDateTime: this.format(this.endDate, 'YYYY-MM-DD HH:mm:ss'),
      // 最外面的输入框
      
      // 双面板数据
      startShowDate: undefined, // 开始面板的日期输入框
      startShowTime: undefined, // 开始面板的时间输入框
      endShowDate: undefined,   // 结束面板的日期输入框
      endShowTime: undefined,   // 结束面板的时间输入框
      
      // 保留原有数据以兼容现有逻辑
      showDate: undefined,
      // popper里的日期输入框
      showTime: undefined,
      // popper里的时间输入框
      editTarget: '' // 编辑的是起始/结束值
    };
  },
  computed: {
    // 基于编辑目标状态计算出来的最小值
    finalMinDate() {
      return this.editTarget === 'end' ? this.startDateTime || this.minDate : this.minDate;
    },
    // 基于编辑目标状态计算出来的最大值
    finalMaxDate() {
      return this.editTarget === 'start' ? this.endDateTime || this.currentMaxDate : this.currentMaxDate;
    },
    minCalendarDate() {
      return this.format(this.finalMinDate, 'YYYY-MM-DD');
    },
    maxCalendarDate() {
      return this.format(this.finalMaxDate, 'YYYY-MM-DD');
    },
    startCalendarDate() {
      return this.startShowDate ? new Date(this.startShowDate) : undefined;
    },
    endCalendarDate() {
      return this.endShowDate ? new Date(this.endShowDate) : undefined;
    },
    isConfirmDisabled() {
      return !(this.startDateTime && this.endDateTime && this.isValidValue());
    },
    spMinTime() {
      return this.format(this.finalMinDate, 'HH:mm:ss');
    },
    spMaxTime() {
      return this.format(this.finalMaxDate, 'HH:mm:ss');
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
    dateTime: {
      get() {
        return this.editTarget === 'end' ? this.endDateTime : this.startDateTime;
      },
      set(value) {
        // 基于当前编辑目标，设置对应的值
        if (this.editTarget === 'end') {
          this.endDateTime = value;
        } else {
          this.startDateTime = value;
        }
        if (value === 'Invalid Date' || value === 'NaN')
          // 如果不为空并且超出日期范围，则设置为范围边界的日期
          throw new TypeError('Invalid Date');
        if (value) {
          const isOutOfRange = this.isOutOfRange(value);
          if (isOutOfRange) value = this.format(isOutOfRange, 'YYYY-MM-DD HH:mm:ss');
        }
        const newDateTime = value ? this.toValue(new Date(value.replace(/-/g, '/'))) : undefined;
        // 日期时间变化时，同步到输入框
        this.showDate = this.format(newDateTime, 'YYYY-MM-DD');
        this.showTime = this.format(newDateTime, this.minUnit === 'minute' ? 'HH:mm' : 'HH:mm:ss');
      }
    },
    minTime: {
      get() {
        return this.editTarget === 'end' ? this.endMinTime : this.startMinTime;
      },
      set(value) {
        // 基于当前编辑目标，设置对应的值
        if (this.editTarget === 'end') {
          this.endMinTime = value;
        } else {
          this.startMinTime = value;
        }
      }
    },
    maxTime: {
      get() {
        return this.editTarget === 'end' ? this.endMaxTime : this.startMaxTime;
      },
      set(value) {
        // 基于当前编辑目标，设置对应的值
        if (this.editTarget === 'end') {
          this.endMaxTime = value;
        } else {
          this.startMaxTime = value;
        }
      }
    },
    finalDateTime: {
      get() {
        return this.editTarget === 'end' ? this.finalEndDateTime : this.finalStartDateTime;
      },
      set(value) {
        // 基于当前编辑目标，设置对应的值
        if (this.editTarget === 'end') {
          this.finalEndDateTime = value;
        } else {
          this.finalStartDateTime = value;
        }
      }
    },
    // 基于编辑目标状态计算出来的 key
    dateKey() {
      return this.editTarget === 'end' ? 'endDate' : 'startDate';
    },
    validShowTimeFormatters() {
      return timeFormatterOptions[this.minUnit];
    },
    previewText() {
      const start = this.genDisplayFormatText(this.finalStartDateTime);
      const end = this.genDisplayFormatText(this.finalEndDateTime);
      if (!start && !end) {
        return '--';
      }
      return [start, end].join(' ~ ');
    }
  },
  watch: {
    opened(val) {
      if (val !== this.currentOpened) {
        this.currentOpened = val;
      }
    },
    startDate(newValue) {
      this.startDateTime = this.format(newValue, 'YYYY-MM-DD HH:mm:ss');
      this.finalStartDateTime = this.startDateTime;
      this.noticeValidator();
      // this.$emit(
      //     'update:startDate',
      //     this.startDateTime,
      // );
    },
    endDate(newValue) {
      this.endDateTime = this.format(newValue, 'YYYY-MM-DD HH:mm:ss');
      this.finalEndDateTime = this.endDateTime;
      this.noticeValidator();
      // this.$emit(
      //     'update:endDate',
      //     this.endDateTime,
      // );
    },
    maxDate(value) {
      this.currentMaxDate = this.getMaxDate(value);
    },
    minDate(value) {
      this.currentMaxDate = this.getMaxDate();
    }
  },
  created() {
    this.noticeValidator(true);
  },
  mounted() {
    this.autofocus && this.$refs.input.focus();
    // 在编辑器里不要打开
    if (!this.$env.VUE_APP_DESIGNER) this.toggle(this.currentOpened);
  },
  methods: {
    isValidValue() {
      if (!this.startDateTime || !this.endDateTime) return false;
      const startDate = new Date(this.startDateTime);
      const endDate = new Date(this.endDateTime);

      return !isNaN(startDate.getTime()) && !isNaN(endDate.getTime()) && startDate.getTime() <= endDate.getTime();
    },
    noticeValidator(created = false) {
      const startDateTime = this.toValue(this.startDateTime ? new Date(this.startDateTime.replace(/-/g, '/')) : '');
      const endDateTime = this.toValue(this.endDateTime ? new Date(this.endDateTime.replace(/-/g, '/')) : '');
      this.$emit('update', this.startDateTime && this.endDateTime ? [startDateTime, endDateTime] : '');
      if (created) {
        this.$emit('update:startDate', startDateTime === '' ? undefined : startDateTime);
        this.$emit('update:endDate', endDateTime === '' ? undefined : endDateTime);
      }
    },
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
      this.finalStartDateTime = undefined;
      this.finalEndDateTime = undefined;
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
    outRangeDateTime(date, time, target) {
      if (!time) {
        time = '00:00:00';
      }
      if (date) {
        date = new Date(date);
      } else {
        // 处理清空操作
        if (target === 'start') {
          this.startDateTime = undefined;
          this.finalStartDateTime = undefined;
          this.emitValue();
        } else if (target === 'end') {
          this.endDateTime = undefined;
          this.finalEndDateTime = undefined;
          this.emitValue();
        } else {
          // 兼容原有逻辑
          this.$emit('select', {
            sender: this,
            [this.dateKey]: ''
          });
        }
        return;
      }
      time = time.split(':');
      date.setHours(time[0] || 0);
      date.setMinutes(time[1] || 0);
      date.setSeconds(time[2] || 0);
      const datetime = this.format(date, 'YYYY-MM-DD HH:mm:ss');
      
      // 根据target更新对应的数据
      if (target === 'start') {
        this.startDateTime = datetime;
        this.startShowDate = this.format(date, 'YYYY-MM-DD');
        this.startShowTime = this.format(date, this.minUnit === 'minute' ? 'HH:mm' : 'HH:mm:ss');
        // 隐藏底部确认取消按钮时，直接更新最终值
        if (!this.showFooterButton) {
          this.finalStartDateTime = datetime;
          this.emitValue();
        }
        return;
      } else if (target === 'end') {
        this.endDateTime = datetime;
        this.endShowDate = this.format(date, 'YYYY-MM-DD');
        this.endShowTime = this.format(date, this.minUnit === 'minute' ? 'HH:mm' : 'HH:mm:ss');
        // 隐藏底部确认取消按钮时，直接更新最终值
        if (!this.showFooterButton) {
          this.finalEndDateTime = datetime;
          this.emitValue();
        }
        return;
      }
      
      // 兼容原有逻辑
      const datetimeStr = this.format(date, 'YYYY-MM-DD');
      const dtime = this.format(date, 'HH:mm:ss');
      if (datetimeStr === this.minCalendarDate && datetimeStr === this.maxCalendarDate) {
        this.minTime = this.spMinTime;
        this.maxTime = this.spMaxTime;
      } else if (datetimeStr === this.minCalendarDate) this.minTime = this.spMinTime;else if (datetimeStr === this.maxCalendarDate) this.maxTime = this.spMaxTime;else if (datetimeStr === this.minCalendarDate && dtime < this.spMinTime) {
        const spMinTime = this.spMinTime.split(':');
        date.setHours(spMinTime[0]);
        date.setMinutes(spMinTime[1]);
        date.setSeconds(spMinTime[2]);
      } else if (datetimeStr === this.maxCalendarDate && dtime > this.spMaxTime) {
        const spMaxTime = this.spMaxTime.split(':');
        date.setHours(spMaxTime[0]);
        date.setMinutes(spMaxTime[1]);
        date.setSeconds(spMaxTime[2]);
      } else {
        this.minTime = undefined;
        this.maxTime = undefined;
      } // if (datetime === this.minCalendarDate || datetime === this.maxCalendarDate)
      this.dateTime = this.format(date, 'YYYY-MM-DD HH:mm:ss');
      this.$emit('select', {
        sender: this,
        [this.dateKey]: new Date(date).getTime()
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
        [this.dateKey]: new Date(date).getTime()
      });
    },
    /**
     * @method onInput($event) 输入日期
     * @private
     * @param  {object} $event
     * @return {void}
     */
    onInput($event) {
      const {
        leftValue,
        rightValue
      } = $event;
      const value = this.editTarget === 'start' ? leftValue : rightValue;
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
        this.updateCurrentInputValue(this.genDisplayFormatText(this.finalDateTime));
        this.emitValue();
      }
    },
    onBlurInputValue(value) {
      if (!this.checkValid(value)) {
        this.updateCurrentInputValue(this.genDisplayFormatText(this.finalDateTime));
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
    // 根据当前编辑目标更新输入框的值（起始/结束）
    updateCurrentInputValue(value) {
      const updateKey = this.editTarget === 'start' ? 'leftValue' : 'rightValue';
      this.$refs.input.updateCurrentValue({
        [updateKey]: value
      });
    },
    setDateNow() {
      const now = new Date();
      const nowStr = this.format(now, 'YYYY-MM-DD HH:mm:ss');
      
      // 同时设置开始和结束时间为当前时间
      this.startDateTime = nowStr;
      this.endDateTime = nowStr;
      
      // 更新显示值
      this.startShowDate = this.format(now, 'YYYY-MM-DD');
      this.startShowTime = this.format(now, 'HH:mm:ss');
      this.endShowDate = this.format(now, 'YYYY-MM-DD');
      this.endShowTime = this.format(now, 'HH:mm:ss');
    },
    /**
     * @method isOutOfRange(date) 是否超出规定的日期时间范围
     * @public
     * @param {Date} date 待测的日期时间
     * @return {boolean|Date} date 如果没有超出日期时间范围，则返回false；如果超出日期时间范围，则返回范围边界的日期时间
     */
    isOutOfRange(date) {
      date = this.transformDate(date);
      const minDate = this.transformDate(this.finalMinDate);
      const maxDate = this.transformDate(this.finalMaxDate);
      if (maxDate && minDate && maxDate < minDate) {
        console.warn('error: maxDate < minDate');
        return false;
      }

      // minDate && date < minDate && minDate，先判断是否为空，再判断是否超出范围，如果超出则返回范围边界的日期时间。
      return minDate && date < minDate && minDate || maxDate && date > maxDate && maxDate;
    },
    beforeToggle(open = true) {
      if (open) {
        // 这里需要在打开选择框之前重新计算一下，不然时间范围可能不对
        const datetime = this.format(this.dateTime, 'YYYY-MM-DD');
        if (datetime === this.minCalendarDate && datetime === this.maxCalendarDate) {
          this.minTime = this.spMinTime;
          this.maxTime = this.spMaxTime;
        } else if (datetime === this.minCalendarDate) this.minTime = this.spMinTime;else if (datetime === this.maxCalendarDate) this.maxTime = this.spMaxTime;else {
          this.minTime = undefined;
          this.maxTime = undefined;
        }
      }
    },
    toggle(open) {
      if (this.editTarget === 'end') {
        this.toggleRight(open);
      } else {
        this.toggleLeft(open);
      }
    },
    toggleLeft(open) {
      const {
        popper
      } = this.$refs;
      if (popper) {
        // 如果已经打开了右侧的，则关闭右侧的面板
        if (this.editTarget === 'end' && open) popper.toggle(!open);
        if (open) {
          this.editTarget = 'start';
          this.beforeToggle();
        }
        // 下一个时序触发，等待事件完成
        this.$nextTick(() => {
          popper.toggle(open);
        });
      }
    },
    toggleRight(open) {
      const {
        popper
      } = this.$refs;
      if (popper) {
        // 如果已经打开了左侧的，则关闭左侧的面板
        if (this.editTarget === 'start' && open) popper.toggle(!open);
        if (open) {
          this.editTarget = 'end';
          this.beforeToggle();
        }
        // 下一个时序触发，等待事件完成
        this.$nextTick(() => {
          popper.toggle(open);
        });
      }
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
      this.showDate = undefined;
      this.showTime = undefined;
    },
    onCancel() {
      // 恢复到之前的状态
      this.initDualPanelData();
      this.toggle(false);
    },
    onConfirm() {
      // 使用isValidValue验证日期时间有效性
      if (this.isValidValue()) {
        // 确认时更新最终的开始和结束日期时间
        if (this.startDateTime) {
          this.finalStartDateTime = this.startDateTime;
        }
        if (this.endDateTime) {
          this.finalEndDateTime = this.endDateTime;
        }

        // 关闭弹窗并触发值更新
        this.toggle(false);
        this.emitValue();
      }
    },
    emitValue() {
      const newStartDateTime = this.finalStartDateTime ? this.toValue(new Date(this.finalStartDateTime.replace(/-/g, '/'))) : undefined;
      const newEndDateTime = this.finalEndDateTime ? this.toValue(new Date(this.finalEndDateTime.replace(/-/g, '/'))) : undefined;
      this.$emit('update:startDate', newStartDateTime);
      this.$emit('update:endDate', newEndDateTime);
      /**
       * @event change 日期时间改变时触发
       * @property {object} sender 事件发送对象
       * @property {object} date 改变后的日期时间
       */
      this.$emit('change', {
        sender: this,
        startDate: this.finalStartDateTime ? new Date(this.finalStartDateTime.replace(/-/g, '/')).getTime() : undefined,
        endDate: this.finalEndDateTime ? new Date(this.finalEndDateTime.replace(/-/g, '/')).getTime() : undefined
      }); // 方便u-field组件捕获到其值
      this.$emit('input', newStartDateTime && newEndDateTime ? [newStartDateTime, newEndDateTime] : '');
    },
    onPopperOpen() {
      // if (!this.finalDateTime) return;
      // this.dateTime = this.format(new Date(this.finalDateTime.replace(/-/g, '/')), 'YYYY-MM-DD HH:mm:ss');
      // this.showDate = this.format(this.dateTime, 'YYYY-MM-DD');
      // this.showTime = this.format(this.dateTime, 'HH:mm:ss');
      this.initDualPanelData();
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
        const date = new Date(this.transformDate(value + ' ' + minTimeStr));
        const isOutOfRange = this.isOutOfRange(date); // 超出范围还原成上一次值
        if (!isOutOfRange) {
          showDate = this.format(date, 'YYYY-MM-DD');
        }
      }
      this.showDate = showDate;
      // this.updateCurrentInputValue(this.showDate);
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
    
    /**
     * 日期输入框变化事件（统一处理开始和结束日期）
     * @param {string} value - 输入的日期值
     * @param {string} type - 'start' 或 'end'
     */
    onRangeDateChange(value, type) {
      if (!value) {
        // 清空对应的日期数据
        if (type === 'start') {
          this.startShowDate = undefined;
          this.startDateTime = undefined;
          this.finalStartDateTime = undefined;
        } else {
          this.endShowDate = undefined;
          this.endDateTime = undefined;
          this.finalEndDateTime = undefined;
        }
        this.emitValue();
        return;
      }
      
      // 验证日期格式
      if (this.checkDate(value)) {
        const minTimeStr = '00:00:00';
        const date = new Date(this.transformDate(value + ' ' + minTimeStr));
        const isOutOfRange = this.isOutOfRange(date);
        
        if (!isOutOfRange) {
          // 更新对应的显示数据
          if (type === 'start') {
            this.startShowDate = value;
            this.outRangeDateTime(this.startShowDate, this.startShowTime || '00:00:00', 'start');
          } else {
            this.endShowDate = value;
            this.outRangeDateTime(this.endShowDate, this.endShowTime || '00:00:00', 'end');
          }
        }
      }
    },
    
    // 新的统一弹窗控制方法
    togglePopper(open) {
      const { popper } = this.$refs;
      if (popper) {
        if (open) {
          // 初始化双面板数据
          this.initDualPanelData();
        }
        this.$nextTick(() => {
          popper.toggle(!this.currentOpened);
        });
      }
    },
    
    // 初始化双面板数据
    initDualPanelData() {
      const timeFormat = this.minUnit === 'minute' ? 'HH:mm' : 'HH:mm:ss';
      
      // 初始化面板数据
      this.initPanelData('start', this.finalStartDateTime, timeFormat);
      this.initPanelData('end', this.finalEndDateTime, timeFormat);
    },
    
    // 初始化单个面板数据
    initPanelData(type, dateTime, timeFormat) {
      if (dateTime) {
        this[`${type}ShowDate`] = this.format(dateTime, 'YYYY-MM-DD');
        this[`${type}ShowTime`] = this.format(dateTime, timeFormat);
        this[`${type}DateTime`] = dateTime;
      }
    },
    
    // 处理日历范围选择
    handleCalendarRangeSelect(event) {
      const { startDate, endDate } = event;
      const timeFormat = this.minUnit === 'minute' ? 'HH:mm' : 'HH:mm:ss';
      
      if (startDate && endDate) {
        // 范围选择完成
        this.updateDateTimeData(startDate, endDate, timeFormat);
      } else if (startDate) {
        // 开始选择
        this.updateDateTimeData(startDate, null, timeFormat);
      }
    },
    // 统一更新日期时间数据
    updateDateTimeData(startDate, endDate, timeFormat) {
      // 更新开始时间
      this.startDateTime = this.format(startDate, 'YYYY-MM-DD HH:mm:ss');
      this.startShowDate = this.format(startDate, 'YYYY-MM-DD');
      this.startShowTime = this.format(startDate, timeFormat);
      
      // 更新结束时间
      if (endDate) {
        this.endDateTime = this.format(endDate, 'YYYY-MM-DD HH:mm:ss');
        this.endShowDate = this.format(endDate, 'YYYY-MM-DD');
        this.endShowTime = this.format(endDate, timeFormat);
      } else {
        this.endDateTime = null;
        this.endShowDate = undefined;
        this.endShowTime = undefined;
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
    width: var(--datetime-range-input-width);
}

.input {
    border: var(--datetime-input-border-width) solid var(--datetime-input-border-color);
    color: var(--datetime-input-color);
    background: var(--datetime-input-background);
    border-radius: var(--datetime-input-border-radius);
    height: var(--datetime-input-height);
}
.input [class^="u-input_placeholder__"] {
    color: var(--datetime-input-placeholder-color);
}

.root[width="mini"] {
    width: var(--datetime-input-width-mini);
}

.root[height="mini"] .input {
    height: var(--datetime-input-height-mini);
    line-height: calc(var(--datetime-input-height-mini) - var(--datetime-input-border-width) * 2);
}

.root[width="small"] {
    width: var(--datetime-input-width-small);
}

.root[height="small"] .input {
    height: var(--datetime-input-height-small);
    line-height: calc(var(--datetime-input-height-small) - var(--datetime-input-border-width) * 2);
}

.root[width="normal"] {
    width: var(--datetime-input-width);
}

.root[height="normal"] .input {
    height: var(--datetime-input-height);
    line-height: calc(var(--datetime-input-height) - var(--datetime-input-border-width) * 2);
}

.root[width="medium"] {
    width: var(--datetime-input-width-medium);
}

.root[height="medium"] .input {
    height: var(--datetime-input-height-medium);
    line-height: calc(var(--datetime-input-height-medium) - var(--datetime-input-border-width) * 2);
}

.root[width="large"] {
    width: var(--datetime-input-width-large);
}

.root[height="large"] .input {
    height: var(--datetime-input-height-large);
    line-height: calc(var(--datetime-input-height-large) - var(--datetime-input-border-width) * 2);
}

.root[width="huge"] {
    width: var(--datetime-input-width-huge);
}

.root[height="huge"] .input {
    height: var(--datetime-input-height-huge);
    line-height: calc(var(--datetime-input-height-huge) - var(--datetime-input-border-width) * 2);
}

.root[width="full"] {
    width: 100%;
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
.threeColumnLayout {
  display: flex;
  width: 100%;
}

.shortCuts {
  border-right: 1px solid var(--calendar-border-color);
}

.calendarContainer {
  flex: 1;
  display: flex;
  flex-direction: column;
}

/* 时间选择区域 */
.timeSelectionRow {
  display: flex;
  border-bottom: 1px solid var(--calendar-border-color);
}

.timeSection {
  width: 50%;
  max-width: 300px;
  display: flex;
  flex-direction: column;
  padding: 6px 10px;
}

.timeSection:first-child {
  border-right: 1px solid var(--calendar-border-color);
}

.timeSectionTitle {
  margin-bottom: 8px;
  text-align: center;
}

.timeInputs {
  display: flex;
  gap: 6px;
}

.calendarPanel [class^='u-calendar_range'] {
  border: unset;
  border-radius: unset;
}
</style>