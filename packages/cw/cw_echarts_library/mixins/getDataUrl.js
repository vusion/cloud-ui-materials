export default {
  methods: {
    getDataUrl() {
      try {
        return this.$refs.echart.chartInstance.getDataURL()
      } catch(e) {
        console.log(e)
        return ''
      }
    },
  },
};
