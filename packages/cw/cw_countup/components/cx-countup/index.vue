<template>
  <span :class="$style.root">
      <span :class="$style.count">
          <span ref="count">{{ start }}</span>
          <span>{{ unitText }}</span>
      </span>
      <slot></slot>
  </span>
  </template>
  
  <script>
  import { CountUp } from 'countup.js';
  import { Odometer } from 'odometer_countup';
  
  export default {
      name: 'cx-countup',
      props: {
          start: { type: Number, default: 0 },
          end: { type: Number, required: true },
          simplify: { type: Boolean, default: false },
          duration: { type: Number, default: 2 },
          isEasing: { type: Boolean, default: false },
          isGroup: { type: Boolean, default: false },
          separator: { type: String, default: ',' },
          decimals: { type: Number, default: 0 },
          unit: {
              type: Array,
              default: () => [
                  [3, 'K+'],
                  [6, 'M+'],
                  [9, 'G+'],
              ],
          },
          prefix: { type: String, default: '' },
          suffix: { type: String, default: '' },
          easingFn: {
              type: Function,
              default(t, b, c, d) {
                  return (
                      (c * (-Math.pow(2, (-10 * t) / d) + 1) * 1024) / 1023 + b
                  );
              },
          },
          endCallback: { type: Function },
          loop: { type: Boolean, default: false},
          delay: { type: Number, default: 1 },
          autoStart: { type: Boolean, default: true },
      },
      data() {
          return { unitText: '', timeoutId: null, };
      },
      watch: {
          end(newValue) {
              let endVal = 0;
              if (this.simplify) {
                  const res = this.transformValue(newValue);
                  endVal = res.val;
                  this.unitText = res.unit;
              } else {
                  endVal = newValue;
              }
              if (this.autoStart)
                  this.counter.update(endVal);
          },
          autoStart(newValue) {
              if (newValue) {
                  this.counter.start(this.endCallback); // 暂不支持change方法 需要重构下
                  // this.$emit('change', this.counter.frameVal);
              }
          },
          loop(){
            this.run();
          }
      },
      mounted() {
          this.$nextTick(() => {
              let end = 0;
              let res = {};
              if (this.simplify) {
                  res = this.transformValue(this.end);
                  end = res.val;
                  this.unitText = res.unit;
              } else {
                  end = this.end;
              }
              this.counter = new CountUp(
                  this.$refs.count,
                  end,
                  {
                      startVal: this.start,
                      decimalPlaces: this.decimals,
                      duration: this.duration, 
                      useEasing: this.isEasing,
                      useGrouping: this.isGroup,
                      separator: this.separator,
                      decimals: this.decimals,
                      suffix: this.suffix,
                      prefix: this.prefix,
                      plugin: new Odometer({ duration: 0.1, lastDigitDelay: 0 }),
                      formattingFn: v=>`${(v || 0).toLocaleString()}`.padStart(`${( this.end || 0).toLocaleString()}`.length, '0,000'),
                  },
              );
              if (!this.counter.error && this.autoStart) {
                this.run();
              }
          });
      },
      destroyed(){
        if (this.timeoutId) {
          clearTimeout(this.timeoutId);
          this.timeoutId = null;
        }
      },
      methods: {
          run(){
            const fn = () => {
              if (this.timeoutId) {
                clearTimeout(this.timeoutId);
                this.timeoutId = null;
              }
              this.counter.reset();
              this.counter.start(()=>{
                if(typeof this.endCallback === 'function') this.endCallback();
                if(this.loop){
                  this.timeoutId = setTimeout(()=>{
                    fn();
                  },(this.delay) * 1000 + 100);
                }
              }); 
              this.counter.update(this.end);
            }; 
            fn();
          },
          transformValue(val) {
              let endVal = 0;
              let unit = '';
              const len = this.unit.length;
              if (val < Math.pow(10, this.unit[0][0])) {
                  endVal = val;
              } else {
                  for (let i = 1; i < len; i++) {
                      if (
                          val >= Math.pow(10, this.unit[i - 1][0])
                          && val < Math.pow(10, this.unit[i][0])
                      ) {
                          endVal = parseInt(
                              val / Math.pow(10, this.unit[i - 1][0]),
                          );
                          unit = this.unit[i - 1][1];
                      }
                  }
              }
              if (val > Math.pow(10, this.unit[len - 1][0])) {
                  endVal = parseInt(val / Math.pow(10, this.unit[len - 1][0]));
                  unit = this.unit[len - 1][1];
              }
              return { val: endVal, unit };
          },
          reset() {
              this.counter.reset();
              this.$emit('reset', this.start);
          },
          pauseResume() {
              this.counter.pauseResume();
              this.$emit('pauseResume', this.counter.frameVal);
          },
          update(value) {
              this.counter.update(value || this.end);
              this.$emit('update', value || this.end);
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
      width: 0.7em;
      height: 1em;
      color: var(--brand-primary);
  }
  </style>
  