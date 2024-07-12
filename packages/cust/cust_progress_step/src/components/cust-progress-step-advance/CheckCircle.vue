<template>
  <div class="check-circle">
    <div class="circle" :class="{ 'checked': checked === 'complete' }">
      <div v-if="checked === 'complete'" class="checkmark"></div>
      <div v-if="checked === 'pending'" class="inner-circle"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CheckCircle',
  props: {
    checked: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style scoped>
.check-circle {
  display: flex;
  align-items: center;
  justify-content: center;
  
}

.circle {
  border-radius: 50%;
  width: 16px; /* 圆圈的大小 */
  height: 16px;
  border: 2px solid #3a84fb; /* 圆环的颜色 */
  background-color: #fff;
  position: relative;
}

.circle.checked {
  
  background-color: #3a84fb; /* 圆圈的背景颜色 */
}

.checkmark {
  width: 4px;
  height: 8px;
  border: solid white; /* 对勾的颜色 */
  border-width: 0 2px 2px 0;
  display: inline-block;
  position: absolute;
  top: 1px;
  left: 5px;
  transform: rotate(45deg); /* 对勾的旋转角度 */
}
.inner-circle {
  position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 10px;
    height: 10px;
    border-radius: 100%;
    background-color: #3a84fb
}
</style>
