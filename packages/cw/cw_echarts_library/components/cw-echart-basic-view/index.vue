<template>
  <div class="number-counter" :style="counterStyle">
    <div class="label">{{ label }}</div>
    <div class="numbers">
      <div class="digit-box" v-for="(digit, index) in formattedNumber" :key="index">
        <span class="digit">{{ digit }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import Flip from '@popmotion/flip';

export default {
  props: {
    label: {
      type: String,
      default: "赛事数量"
    },
    number: {
      type: Number,
      default: 163079
    },
    backgroundImage: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      currentNumber: this.number,
      flipInstance: null
    };
  },
  computed: {
    formattedNumber() {
      return this.currentNumber
        .toLocaleString('en-US', { useGrouping: true })
        .split("");
    },
    counterStyle() {
      return {
        backgroundColor: this.backgroundImage ? 'transparent' : '#3399ff',
        backgroundImage: this.backgroundImage ? `url(${this.backgroundImage})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '32px',
        borderRadius: '10px',
        display: 'flex',
        alignItems: 'center',
        height: '128px'
      };
    }
  },
  watch: {
    number(newVal, oldVal) {
      this.animateNumberChange(newVal);
    }
  },
  methods: {
    animateNumberChange(newVal) {
      if (this.flipInstance) {
        this.flipInstance.read();
      }
      this.currentNumber = newVal;
      this.$nextTick(() => {
        if (this.flipInstance) {
          this.flipInstance.flip();
        }
      });
    }
  },
  mounted() {
    this.flipInstance = Flip(this.$el.querySelector('.numbers'));
  }
};
</script>

<style scoped>
.number-counter {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.label {
  font-size: 24px;
  color: white;
  margin-right: 24px;
}

.numbers {
  display: flex;
}

.digit-box {
  background-color: white;
  margin: 0 8px;
  width: 64px;
  height: 96px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
}

.digit {
  font-size: 64px;
  font-weight: bold;
  color: #3399ff;
}
</style>