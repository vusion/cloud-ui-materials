import { uniqueId, debounce } from 'lodash';

import * as echarts from 'echarts/core';
import { TitleComponent, TooltipComponent, LegendComponent, GridComponent } from 'echarts/components';
import { LineChart, BarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';

// 注册必要的组件
echarts.use([
  TitleComponent, // 确保包含标题组件
  TooltipComponent,
  LegendComponent,
  GridComponent,
  LineChart,
  BarChart,
  CanvasRenderer,
]);

// 创建一个防抖渲染函数Map
const debouncedRenderMap = new Map();

// 替换原来的setTimeout
const getOrCreateDebounceRender = (id) => {
  const chartInstances = new Map();
  if (!debouncedRenderMap.has(id)) {
    debouncedRenderMap.set(
      id,
      debounce((chartId, chartOption) => {
        const container = document.getElementById(chartId);
        if (container) {
          let myChart = chartInstances.get(chartId);
          if (!myChart) {
            myChart = echarts.init(container);
            chartInstances.set(chartId, myChart);
          }
          myChart.setOption(chartOption);
        }
      }, 500)
    );
  }
  return debouncedRenderMap.get(id);
};

export const markdownItEcharts = (md) => {
  const defaultFenceRenderer = md.renderer.rules.fence;
  md.renderer.rules.fence = (tokens, idx, options, env, self) => {
    const token = tokens[idx];
    const chartInstances = new Map();
    const parsedOptions = new Map();
    const lang = token.info.trim();
    if ('echarts' === lang)
      try {
        let option = parsedOptions.get(token.content);
        if (!option) {
          option = JSON.parse(token.content);
          parsedOptions.set(token.content, option);
        }
        const containerId = `${uniqueId('echarts-')}`;
        const width = (document.querySelector('[class^="cw-bubble-list"]')?.clientWidth || 0) * 0.8 || 400;
        const html = `<div id="${containerId}" style="width: 100%; min-width: ${width}px; min-height: 400px; overflow-y: auto;"></div>`;

        // 使用防抖函数替代setTimeout
        getOrCreateDebounceRender(containerId)(containerId, option);
        return html;
      } catch (error) {
        return `<div class="echarts-error" style="padding: 10px; background: #f8f8f8; border-left: 4px solid #f66; color: #666;">
                <p>📊 图表数据正在加载中，请稍后.....</p>
              </div>`;
      }
    return defaultFenceRenderer(tokens, idx, options, env, self);
  };
};
