<template>
  <div class="progress-step_container" :style="containerStyle">
    <progress-step ref="progressStep" :data="currentData" />
  </div>
</template>
<script>
import ProgressStep from './ProgressStep.vue';
import { updateStatus } from './tools';

export default {
  name: "cust-progress-step-advance",
  components: {
    ProgressStep
  },
  props: {
    data: {
      type: Array,
      default: () => [
        { id: '1', title: '员工常驻外派申请' },
        { id: '2', title: '派出国人力信息审核&成本预测' },
        { id: '3', title: 'mobility预审核' },
        { id: '4', title: '派驻国人力审核' },
        [
          [
            { id: '5', title: '派驻国小微主审核' },
          ],
          [{ id: '6', title: '派出国小微主审核' }, { id: '6', title: '派出国平台主审核' }],
        ],
        { id: '7', title: 'mobility论证' },
        { id: '8', title: '出国系统审核' },
        { id: '9', title: '外派必要文件会签' },
        { id: '10', title: '申请完成' },
      ]
    },
    currentStep: {
      type: String,
      default: ''
    }
  },
  watch: {
    currentStep: {
      handler(data) {
        if (this.data && data) {
          this.currentData = updateStatus(this.data, data);
        }

      },
      immediate: true
    },
    data() {
      this.currentData = updateStatus(this.data, this.currentStep);
    }
  },
  data() {
    return {
      containerStyle: {
        height: '250px'
      },
      currentData: []
    };
  },
};
</script>
<style scoped>
.progress-step_container {
  display: flex;
  align-items: center;
  overflow-x: auto;
}
</style>
