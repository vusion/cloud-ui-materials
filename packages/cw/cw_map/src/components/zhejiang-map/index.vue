<template>
  <div>
    <!-- 面包屑导航 -->
    <div class="breadcrumb">
      <span v-for="(level, index) in mapStack" :key="index" @click="goToLevel(index)">
        {{ level.mapName }}
        <span v-if="index !== mapStack.length - 1"> > </span>
      </span>
    </div>

    <!-- 地图容器 -->
    <div ref="zhejiangMap" style="width: 100%; min-width: 600px; height: 600px"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import { markPoints, areaData } from './markPoints';
import zhejiangJson from './geo/330000_full.json';
import hangzhouJson from './geo/330100_full.json';
import ningboJson from './geo/330200_full.json';
import wenzhouJson from './geo/330300_full.json';
import jiaxingJson from './geo/330400_full.json';
import huzhouJson from './geo/330500_full.json';
import shaoxingJson from './geo/330600_full.json';
import jinhuaJson from './geo/330700_full.json';
import quzhouJson from './geo/330800_full.json';
import zhoushanJson from './geo/330900_full.json';
import taizhouJson from './geo/331000_full.json';
import lishuiJson from './geo/331100_full.json';
const mapJsonMap = {
  '330000_full.json': zhejiangJson,
  '330100_full.json': hangzhouJson,
  '330200_full.json': ningboJson,
  '330300_full.json': wenzhouJson,
  '330400_full.json': jiaxingJson,
  '330500_full.json': huzhouJson,
  '330600_full.json': shaoxingJson,
  '330700_full.json': jinhuaJson,
  '330800_full.json': quzhouJson,
  '330900_full.json': zhoushanJson,
  '331000_full.json': taizhouJson,
  '331100_full.json': lishuiJson,
};
const mapUrls = {
  杭州市: '330100_full.json',
  宁波市: '330200_full.json',
  温州市: '330300_full.json',
  嘉兴市: '330400_full.json',
  湖州市: '330500_full.json',
  绍兴市: '330600_full.json',
  金华市: '330700_full.json',
  衢州市: '330800_full.json',
  舟山市: '330900_full.json',
  台州市: '331000_full.json',
  丽水市: '331100_full.json',
};
export default {
  name: 'ZhejiangMap',
  props: {
    // 新的 areaData 结构，包含市和区的独立数据，使用 parentCode 字段表示层级关系
    areaData: {
      type: Array,
      default: () => areaData,
    },
    // 市一级的标准
    cityThresholds: {
      type: Object,
      default: () => ({
        low: 0,
        medium: 300,
        high: 600,
      }),
    },
    // 区一级的标准
    districtThresholds: {
      type: Object,
      default: () => ({
        low: 0,
        medium: 30,
        high: 60,
      }),
    },
    zoom: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      chart: null,
      currentMapName: '浙江省',
      currtentMap: '330000_full.json',
      mapStack: [], // 用于存储地图导航历史
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.initMap();
    });
  },
  watch: {
    areaData: {
      deep: true,
      async handler() {
        await this.loadMap('浙江省', '330000_full.json');
      },
    },
    cityThresholds: {
      deep: true,
      async handler(value, pre) {
        await this.loadMap(this.currentMapName, mapUrls[this.currentMapName], '执行了');
      },
    },
    districtThresholds: {
      deep: true,
      async handler() {
        await this.loadMap(this.currentMapName, mapUrls[this.currentMapName]);
      },
    },
  },
  methods: {
    // 获取适当的 thresholds，依据层级来决定
    getThresholds() {
      if (this.currentMapName === '浙江省') {
        return this.cityThresholds;
      } else {
        return this.districtThresholds;
      }
    },

    // 动态生成 visualMap 的 pieces
    getPiecesFromThresholds() {
      const { low, medium, high } = this.getThresholds();
      return [
        { min: high, label: '高', color: '#76A4FF' }, // 高值区间
        { min: medium, max: high, label: '中', color: '#A9C6FF' }, // 中值区间
        { min: low, max: medium, label: '低', color: '#DEE9FF' }, // 低值区间
      ];
    },

    // 初始化浙江省地图
    async initMap() {
      await this.loadMap('浙江省', '330000_full.json');
    },

    // 获取指定父区域的子区域数据
    getSubAreaData(parentCode) {
      return this.areaData.filter((item) => item.parentCode === parentCode);
    },

    // 加载地图数据并渲染
    async loadMap(mapName, url, test) {
      const mapGeoJson = mapJsonMap[url];

      // 注册地图
      try {
        echarts.registerMap(mapName, mapGeoJson);
      } catch {}
      this.chart?.dispose();
      this.chart = echarts.init(this.$refs.zhejiangMap);

      this.chart.on('mouseover', (params) => {
        if (params.componentType === 'markPoint') {
          // 手动触发地图块的 emphasis 效果
          this.chart.dispatchAction({
            type: 'highlight',
            seriesIndex: 0,
            name: params.name, // 根据 markPoint 对应的地图区域名称触发高亮
          });
        }
      });

      this.chart.on('mouseout', (params) => {
        if (params.componentType === 'markPoint') {
          // 当鼠标移出 markPoint 时，手动取消地图块的 emphasis 效果
          this.chart.dispatchAction({
            type: 'downplay',
            seriesIndex: 0,
            name: params.name, // 取消高亮状态
          });
        }
      });

      // 根据层级决定加载市或区数据
      let currentAreaData = [];

      if (mapName === '浙江省') {
        // 加载市一级数据
        currentAreaData = this.getSubAreaData('330000000000').map((city) => ({
          name: city.name,
          value: city.matchNum, // 或其他你想展示的字段
        }));
      } else {
        // 加载区一级数据
        const currentCity = this.areaData.find((item) => item.name === mapName);
        if (currentCity) {
          currentAreaData = this.getSubAreaData(currentCity.areaCode).map((region) => ({
            name: region.name,
            value: region.matchNum, // 或其他你想展示的字段
          }));
        }
      }
      markPoints[mapName].forEach((item) => {
        item.value = this.areaData.find((area) => area.name === item.name)?.matchNum;
      });
      // 配置地图选项
      const option = {
        tooltip: {
          trigger: 'item',
          formatter: function (params) {
            return `${params.name}: ${params.value}个`; // 显示名称和数值
          },
          backgroundColor: '#fff',
          borderColor: '#ccc',
          borderWidth: 1,
          textStyle: {
            color: '#333',
            fontSize: 14,
          },
          padding: [10, 15],
          extraCssText: 'box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); border-radius: 4px;',
        },
        visualMap: {
          show: true,
          type: 'piecewise', // 分段视觉映射
          orient: 'vertical', // 垂直方向排列
          left: 'left', // 图例靠左侧
          bottom: '5%', // 图例位于左下角
          itemWidth: 14, // 图例块的宽度
          itemHeight: 14, // 图例块的高度
          itemSymbol: 'rect', // 使用矩形图例块
          align: 'right', // 图例块在左，文字在右
          pieces: this.getPiecesFromThresholds(), // 动态生成pieces
          textStyle: {
            color: '#333',
            fontSize: 12,
          },
          itemGap: 10, // 图例项之间的间距
          textGap: -40, // 图例块和文字之间的间距
          inRange: {
            color: ['#DEE9FF', '#A9C6FF', '#76A4FF'], // 低到高的颜色
          },
          outOfRange: {
            color: ['#D8D8D8'], // 超出范围的颜色
          },
        },
        geo: {
          map: mapName,
          roam: false, // 允许缩放和平移
          zoom: this.zoom, // 设置初始缩放比例为 1.2
          itemStyle: {
            normal: {
              shadowColor: 'rgba(221, 228, 241)',
              shadowBlur: 2,
              shadowOffsetX: 10,
              shadowOffsetY: 10,
            },
          },
        },
        series: [
          {
            name: mapName,
            zoom: this.zoom, // 设置初始缩放比例为 1.2
            type: 'map',
            map: mapName, // 使用当前地图
            label: {
              show: false, // 关闭 label 显示
              emphasis: {
                show: false, // 鼠标 hover 时也不显示地名标注
              },
            },
            roam: false, // 不允许缩放和平移
            data: currentAreaData, // 根据当前层级加载对应数据
            // 添加政治中心标记
            markPoint: {
              symbol: 'circle',
              symbolSize: [8, 8], // 外部圆的大小
              symbolOffset: [0, 0], // 确保位置不偏移
              label: {
                show: true,
                position: 'bottom', // 文字在标记下方
                formatter: '{b}', // 使用名称作为文字内容
                color: '#367BFF',
                fontSize: 14,
              },
              itemStyle: {
                color: '#367BFF', // 浅蓝色外部圆
                borderColor: 'rgba(54, 123, 255, 0.3)', // 边界颜色为深蓝色
                borderWidth: 8, // 边界宽度，形成外环效果
              },
              emphasis: {
                itemStyle: {
                  areaColor: 'rgba(50, 150, 255, 0.6)', // 和地图块的悬停效果一致
                  color: '#367BFF', // 浅蓝色外部圆
                  borderColor: 'rgba(54, 123, 255, 0.3)', // 边界颜色为深蓝色
                  borderWidth: 8, // 边界宽度，形成外环效果
                  shadowColor: 'rgba(0, 0, 0, 0.3)', // 一致的阴影效果
                  shadowBlur: 30,
                  shadowOffsetX: 10,
                  shadowOffsetY: 10,
                },
              },
              data: markPoints[mapName], // 使用 markPoints 数据来显示文字标注
            },
            select: {
              label: {
                show: false, // 选中时不显示地名标注
              },
              itemStyle: {
                areaColor: 'rgba(60, 150, 255, 0.7)', // 选中块的亮蓝色，增强视觉对比
                borderColor: '#007BFF', // 边界颜色使用亮蓝色，突出边界
                borderWidth: 3, // 边界加粗，让选中块更加明显
                shadowColor: 'rgba(0, 102, 255, 0.5)', // 添加轻微阴影，增加立体感
                shadowBlur: 20, // 阴影的模糊效果
                shadowOffsetX: 0, // 阴影的水平偏移
                shadowOffsetY: 5, // 阴影的垂直偏移
              },
            },
            itemStyle: {
              normal: {
                areaColor: '#DEE9FF', // 区域的默认颜色
                borderColor: '#367BFF', // 默认边界颜色
                borderWidth: 1.25, // 默认边界宽度
              },
              emphasis: {
                areaColor: 'rgba(50, 150, 255, 0.6)', // 半透明的深蓝色，增强科技感
                borderColor: '#367BFF', // 深蓝色边界，保持简洁
                borderWidth: 2, // 适度加粗边界，增强区域突出感
                shadowColor: 'rgba(0, 0, 0, 0.3)', // 深色阴影，突出漂浮感
                shadowBlur: 30, // 较大的阴影模糊，增加漂浮效果
                shadowOffsetX: 10, // 阴影X轴偏移量，让漂浮感更明显
                shadowOffsetY: 10, // 阴影Y轴偏移量，让漂浮感更明显
              },
              blur: {
                borderColor: '#367BFF', // 鼠标移出后的边界颜色
                borderWidth: 1.25, // 鼠标移出后的边界回缩
                shadowColor: 'rgba(0, 0, 0, 0)', // 移出时阴影消失
                shadowBlur: 0, // 阴影模糊消失
                transitionDuration: 300, // 动画过渡时间
                animationEasing: 'elasticOut', // 弹性回缩动画曲线
              },
            },
          },
        ],
      };

      // 设置图表配置项
      this.chart.setOption(option);

      // 清除之前的点击事件监听，避免重复绑定
      this.chart.off('click');

      // 捕获点击事件，并通过 emit 抛出点击区域的信息
      this.chart.on('click', (params) => {
        if (params.name) {
          this.$emit('region-click', params.name);
          this.handleMapClick(params.name);
          this.currentMapName = params.name;
        }
      });

      // 记录面包屑导航栈
      if (this.mapStack.length === 0 || this.mapStack[this.mapStack.length - 1].mapName !== mapName) {
        this.mapStack.push({ mapName, url });
      }

      window.addEventListener('resize', () => {
        this.chart?.resize();
        setTimeout(() => {
          this.adjustZoomAndCenter();
        }, 100);
      });
    },

    // 动态调整缩放和中心
    adjustZoomAndCenter() {
      const geo = this.chart.getModel().getComponent('geo');
      const boundingRect = geo.getBoundingRect();
      const chartWidth = this.chart.getWidth();
      const chartHeight = this.chart.getHeight();
      const zoom = Math.min(chartWidth / boundingRect.width, chartHeight / boundingRect.height) * 0.8;
      const centerX = boundingRect.x + boundingRect.width / 2;
      const centerY = boundingRect.y + boundingRect.height / 2;
      this.chart.dispatchAction({
        type: 'geoRoam',
        zoom: zoom,
        center: [centerX, centerY],
      });
    },

    // 点击省/市/区进入下一层
    async handleMapClick(regionName) {
      const mapUrls = {
        杭州市: '330100_full.json',
        宁波市: '330200_full.json',
        温州市: '330300_full.json',
        嘉兴市: '330400_full.json',
        湖州市: '330500_full.json',
        绍兴市: '330600_full.json',
        金华市: '330700_full.json',
        衢州市: '330800_full.json',
        舟山市: '330900_full.json',
        台州市: '331000_full.json',
        丽水市: '331100_full.json',
      };

      // 检查是否是市级点击
      const mapUrl = mapUrls[regionName];
      if (mapUrl) {
        // 市级点击进入区级
        this.loadMap(regionName, mapUrl);
      } else {
        // 点击的是区级，确保面包屑进入区级
        if (!this.mapStack.some((level) => level.mapName === regionName)) {
          if (this.mapStack.length === 3) {
            this.mapStack.pop();
          }
          this.mapStack.push({ mapName: regionName, url: null }); // 加入区级到面包屑
        }
      }
    },

    // 面包屑导航点击，返回指定层级
    goToLevel(index) {
      this.mapStack = this.mapStack.slice(0, index + 1);
      this.$emit('go-to-level', index);
      const previousMap = this.mapStack[index];
      if (previousMap.url) {
        this.loadMap(previousMap.mapName, previousMap.url);
        this.currentMapName = previousMap.mapName;
      }
    },
  },
};
</script>

<style scoped>
.breadcrumb {
  font-size: 14px;
  margin-bottom: 10px;
}
.breadcrumb span {
  cursor: pointer;
  color: #666;
}
.breadcrumb span:hover {
  color: #333;
}
#zhejiangMap {
  width: 100%;
  min-width: 600px;
  height: 600px;
}
</style>
