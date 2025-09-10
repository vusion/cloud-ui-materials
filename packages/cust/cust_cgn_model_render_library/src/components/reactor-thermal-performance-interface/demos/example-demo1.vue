<template>
  <div>
    <reactor-thermal-performance-interface :economicData="economicData"></reactor-thermal-performance-interface>
  </div>
</template>

<script>
export default {
  data() {
    return {
      economicData: [],
    };
  },
  // 设置个定时器，定时mock更新economicData数据
  mounted() {
    this.mockEconomicData();
    this.timer = setInterval(() => {
      this.mockEconomicData();
    }, 2000);
  },
  methods: {
    mockEconomicData() {
      // 随机生成100个数字，范围在0-100之间，小数点保留3位
      const economicData = [];
      for (let i = 0; i < 100; i++) {
        economicData.push(Math.floor(Math.random() * 100).toFixed(3));
      }
      this.economicData = economicData;
    },
  },
  unmounted() {
    clearInterval(this.timer);
  },
};
</script>
