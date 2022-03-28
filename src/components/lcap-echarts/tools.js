// 初始化表格参数设置，设置自动调整尺寸
export function initChart(chart, config) {
  if (chart) {
    const thisChart = this.$echarts.init(chart);
    thisChart.setOption(config);
    window.addEventListener("resize", function() {
      thisChart.resize();
    });
  }
}
