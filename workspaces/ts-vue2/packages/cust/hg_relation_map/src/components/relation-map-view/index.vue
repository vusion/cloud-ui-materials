<template>
  <div class="relation-container">
    <div class="header">
      <span class="col" v-for="item in header" :key="item">{{item}}</span>
      <!-- <span class="col">货物</span> -->
      <!-- <span class="col">资金</span> -->
      <!-- <span class="col">发票</span> -->
    </div>

    <div v-for="(section, sIdx) in (!inIDE ? computedSections : defaultSections)" :key="sIdx" class="section">
      <div class="section-title">{{ section.title }}</div>
      <div class="section-content">
        <div class="row">
          <div
            class="col cell-wrapper"
            v-for="(cell, colIdx) in section.rows"
            :key="colIdx"
          >
            <div
              class="cell-node"
              v-for="(item, cellIdx) in cell"
              :key="cellIdx"
              :data-cell-key="`${sIdx}-${colIdx}-${cellIdx}`"
              :class="{highlight: item.highlight}"
              @click="handleClick(item)"
            >
              <slot name="item" :item="item" :index="index"></slot>
              <!-- <div class="label">{{ item.label }}</div> -->
              <!-- <div class="value">{{ item.value }}</div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dataSourceMixin from './mixin';
export default {
  name: "relation-map-view",
  mixins: [dataSourceMixin],
  props:{
    header:{
      type:Array,
      default:()=>['合同','货物','资金','发票']
    },
    // sections:{
    //   type:Array,
    //   default:()=>[]
    // }
  },
  data() {
    return {
      sections:[],
      list:[],
      loading: false,
      defaultSections:[
        {
          title: "销售端",
          rows: [
            // 合同 
            [
              { label: "报价单", value: "xxxxxxxxxxxxxxxx", readonly:true },
            ],
            // 货物 
            [
              { label: "发货单", value: "HC23L07L059-1" }
            ],
            // 资金 
            [
              { label: "销售核销单", value: "HC23L07L059-1-21", highlight: true }
            ],
            // 发票 
            [
              { label: "销售发票申请单", value: "FFPHC23L07L059" }
            ]
          ]
        },
      ]
    };
  },
  watch:{
    list:{
      handler(newValue) {
          this.sections = newValue;
      },
      immediate:true,
      deep:true,
    }
  },
  computed: {
    computedSections() {
      // 自动为每个section生成arrows
      return this.sections.map((section) => {
        const rows = section.rows;
        const arrows = [];
    for(let colIdx = 0; colIdx < rows.length - 1; colIdx++){
      const fromCol = rows[colIdx] || [];
      const toCol = rows[colIdx + 1] || [];
      fromCol.forEach((fromCell, fromIdx) => {
        if (!fromCell || fromCell.readonly) return;
        // 新增：支持在单元格上通过 links 字段显式配置连线
        // links 可以是字符串或字符串数组，表示要匹配“下一列中哪些单元格的 value”
        const links = fromCell.links;
        if (links !== undefined && links !== null) {
          const linkArr = Array.isArray(links) ? links : [links];
          // 根据下一列的 value 匹配，而不是用索引
          toCol.forEach((toCell, toIdx) => {
            if (!toCell || toCell.readonly) return;
            if (linkArr.includes(toCell.value)) {
              arrows.push({ from: [colIdx, fromIdx], to: [colIdx + 1, toIdx] });
            }
          });
        } else {
          // 兼容旧逻辑：未配置 links 时，默认与下一列所有非 readonly 单元全连
          toCol.forEach((toCell, toIdx) => {
            if (!toCell || toCell.readonly) return;
            arrows.push({ from: [colIdx, fromIdx], to: [colIdx + 1, toIdx] });
          });
        }
      });
    }
        return {...section, arrows};
      });
    }
  },
  mounted() {
    this.$nextTick(this.renderArrows);
  },
  updated() {
    this.$nextTick(this.renderArrows);
  },
  methods: {
    handleClick(data){
      this.$emit("cell-click",data)
    },
    renderArrows() {

      // 每个section单独移除旧箭头层
      this.computedSections.forEach((section, sIdx) => {
        const svgId = `${sIdx}-dynamic-arrows-svg`;
        const exist = document.getElementById(svgId);
        if (exist) exist.remove();
        // 容器
        const container = this.$el;
        if (!container) return;
        const rect = container.getBoundingClientRect();

        if (!section.arrows) return;
        // 新建SVG
        const svg = document.createElementNS('http://www.w3.org/2000/svg','svg');
        svg.setAttribute('id', svgId);
        svg.style.position = 'absolute';
        svg.style.left = '0';
        svg.style.top = '0';
        svg.style.pointerEvents = 'none';
        svg.style.width = rect.width + 'px';
        svg.style.height = rect.height + 'px';
        svg.style.zIndex = '8888';

        // 箭头head marker
        const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        const marker = document.createElementNS('http://www.w3.org/2000/svg', 'marker');
        marker.setAttribute('id', `arrow-head-${sIdx}`);
        marker.setAttribute('markerWidth', '14');
        marker.setAttribute('markerHeight', '14');
        marker.setAttribute('refX', '12');
        marker.setAttribute('refY', '7');
        marker.setAttribute('orient', 'auto');
        marker.setAttribute('markerUnits', 'strokeWidth');
        // 灰色箭头icon：条状加箭头尖
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', 'M2,7 L12,7 M7,3 L12,7 L7,11'); // 横线与两侧箭头斜角
        path.setAttribute('fill', 'none');
        path.setAttribute('stroke', '#d8dbd9');
        path.setAttribute('stroke-width', '1');
        path.setAttribute('stroke-linecap', 'round');
        path.setAttribute('stroke-linejoin', 'round');
        marker.appendChild(path); defs.appendChild(marker); svg.appendChild(defs);

        // arrows数据结构渲染
        section.arrows.forEach(({from, to}) => {
          const fromKey = `${sIdx}-${from[0]}-${from[1]}`;
          const toKey = `${sIdx}-${to[0]}-${to[1]}`;
          const fromEl = container.querySelector(`[data-cell-key='${fromKey}']`);
          const toEl = container.querySelector(`[data-cell-key='${toKey}']`);
          if (!fromEl || !toEl) {
            console.warn('arrow: 未找到cell', fromKey, toKey, fromEl, toEl);
            return;
          }
          const fromRect = fromEl.getBoundingClientRect();
          const toRect = toEl.getBoundingClientRect();
          // 箭头起点终点相对container
          const startX = fromRect.right - rect.left;
          const startY = fromRect.top + fromRect.height/2 - rect.top;
          const endX = toRect.left - rect.left;
          const endY = toRect.top + toRect.height/2 - rect.top;
          // 画线（可优化贝塞尔）
          const line = document.createElementNS('http://www.w3.org/2000/svg','line');
          line.setAttribute('x1', startX);
          line.setAttribute('y1', startY);
          line.setAttribute('x2', endX);
          line.setAttribute('y2', endY);
          line.setAttribute('stroke', '#d8dbd9');
          line.setAttribute('stroke-width', '2');
          line.setAttribute('marker-end',`url(#arrow-head-${sIdx})`);
          svg.appendChild(line);
        });
        container.appendChild(svg);
      });
    }
  }
};
</script>

<style scoped>
.relation-container {
  width: fit-content;
  min-width: 800px;
  margin: 0 auto;
  padding: 22px 8px;
  position: relative;
  background: #fff;
  font-size: 13px;
  color: #333;
}

.header {
  display: flex;
  justify-content: space-around;
  font-weight: 600;
  border-bottom: 1px solid #eee;
  padding: 8px 0;
}

.section {
  margin-top: 20px;
}

.section-title {
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
}

.section-content {
  display: flex;
  flex-direction: column;
}

.row {
  display: flex;
  justify-content: space-around;
  margin-bottom: 10px;
}

.col {
  width: 180px;
  min-width: 120px;
  max-width: 210px;
  box-sizing: border-box;
  text-align: center;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.cell-wrapper {
  display: flex;
  justify-content: space-around;
}

.cell-node {
  background: #e9f5f3;
  border-radius: 6px;
  padding: 10px 12px;
  margin: 8px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  min-width: 120px;
  max-width: 190px;
  word-break: break-all;
}

.node {
  background: #e9f5f3;
  border-radius: 6px;
  padding: 6px 8px;
  margin: 4px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 120px;
  border: 1px solid transparent;
}

.cell-node.highlight {
  background: #5abc9f;
  border-color: #1890ff;
  color: #fff;
  font-weight: 600;
}

.node .label {
  font-size: 12px;
  color: #666;
}

.node .value {
  font-size: 13px;
  font-weight: 500;
}
</style>
