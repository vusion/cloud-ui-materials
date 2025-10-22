<template>
  <div class="custom-close-icon" :class="{ active: status }" @click="handleClick">
    <div class="custom-close-line custom-close-line1"></div>
    <div class="custom-close-line custom-close-line2"></div>
    <div class="custom-close-line custom-close-line3"></div>
  </div>
</template>
<script>
export default {
  name: 'custom-close',
  props: {
    status: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleClick() {
      this.$emit('click');
    },
  },
};
</script>
<style>
.custom-close-icon {
  width: 30px;
  height: 25px;
  position: relative;
  cursor: pointer;
  /* margin: 50px; */
}

.custom-close-line {
  width: 100%;
  height: 3px;
  background-color: #333;
  position: absolute;
  transition: all 0.5s ease;
}

.custom-close-line1 {
  top: 0;
}
.custom-close-line2 {
  top: 50%;
  transform: translateY(-50%);
}
.custom-close-line3 {
  bottom: 0;
}

.custom-close-icon.active .custom-close-line1 {
  transform: scale(0);
  transform-origin: right;
  opacity: 0;
}

.custom-close-icon.active .custom-close-line2 {
  transform: rotate(45deg);
}

.custom-close-icon.active .custom-close-line3 {
  transform: scale(0);
  transform-origin: left;
  opacity: 0;
}
.custom-close-icon.active::after {
  content: '';
  width: 100%;
  height: 3px;
  background-color: #333;
  position: absolute;
  top: 50%;
  transform: rotate(-45deg);
  transition: all 0.5s ease;
}
</style>
