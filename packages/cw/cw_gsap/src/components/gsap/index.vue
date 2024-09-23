<template>
  <span :class="$style.root">
    <span :class="$style.count">
      <!-- 使用 v-html 插入格式化后的 HTML -->
      <span ref="count" v-html="formattedValue"></span>
    </span>
  </span>
</template>

<script>
import { CountUp } from 'countup.js';
import { Odometer } from 'odometer_countup';

export default {
  name: 'cx-countup',
  props: {
    end: {
      type: Number,
      default: 0,
    },
    duration: {
      type: Number,
      default: 2,
    },
  },
  data() {
    return {
      timeoutId: null,
      formattedValue: '', // 用于存储格式化后的值
      startVal: 0, // 初始值
    };
  },
  watch: {
    end(newValue) {
      this.startVal = this.getStartValue(newValue);
      if (this.autoStart) this.updateCounter(newValue);
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.startVal = this.getStartValue(this.end); // 初始化 startVal
      this.initCounter();
      if (!this.counter.error) {
        this.run();
      }
    });
  },
  destroyed() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  },
  methods: {
    getStartValue(end) {
      // 根据 end 的位数生成相同位数的数字
      const length = end.toString().length;
      return Math.pow(10, length - 1); // 生成形如 100, 1000, 10000 等的数
    },
    initCounter() {
      const end = this.end;
      this.counter = new CountUp(this.$refs.count, end, {
        startVal: this.startVal,
        decimalPlaces: 0,
        duration: this.duration,
        useEasing: true,
        useGrouping: true,
        separator: ',', // 添加千分位分隔符
        formattingFn: (value) => this.formatNumber(value), // 设置格式化函数
        plugin: new Odometer({
          el: this.$refs.count,
          value: this.startVal,
          format: '(,ddd)',
          theme: 'default',
        }),
      });
    },
    formatNumber(value) {
      // 使用 toLocaleString 来添加千分位分隔符，并将数字和逗号分离
      const formattedString = value.toLocaleString();
      this.formattedValue = formattedString
        .split('')
        .map(
          (char) =>
            char === ','
              ? `<span class="separator">${char}</span>` // 千分位符号样式
              : `<span class="digit">${char}</span>` // 数字样式
        )
        .join('');
      return this.formattedValue;
    },
    run() {
      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
        this.timeoutId = null;
      }
      this.counter.reset();
      this.counter.start(() => {
        this.updateCounter(this.end); // 更新计数值
      });
    },
    updateCounter(newValue) {
      this.counter.update(newValue);
    },
  },
};
</script>

<style module>
.root {
  display: inline-block;
}
.count {
  font-size: 36px;
  line-height: 1;
  color: var(--brand-primary);
}
</style>
<style>
.digit {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 48px !important;
  height: 60px !important;
  opacity: 0.99;
  background: linear-gradient(180deg, #ffffff 0%, #ffffffe6 100%);
  border-radius: 4px;
  width: 24px;
  height: 48px;
  font-family: DINAlternate-Bold;
  font-weight: 700;
  font-size: 48px;
  color: #367bff;
  line-height: 48px;
  margin-right: 8px;
}

.separator {
  width: 12px;
  height: 48px;
  font-family: DINAlternate-Bold;
  font-weight: 700;
  font-size: 48px;
  color: #ffffff;
  line-height: 48px;
  margin: 0 4px 0 -4px;
  vertical-align: middle;
}
</style>
