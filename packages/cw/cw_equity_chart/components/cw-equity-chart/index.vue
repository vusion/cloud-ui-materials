<template>
<div :class="$style.root"  ref="chartRef">
    <div v-if="isShowLegend" :class="$style.chartTop">
        <div>
            {{ legendText }}
        <span v-for="(item,index) in iconList" :key="index" :class="$style.legendStyle">
            <span :style="{ background: item.background, 'border-color': item.border}" :class="$style.legendCircle"></span> {{ item.name }}
        </span>
        </div>
        <button v-if="isExportAuth" @click="handleExport" :class="$style.exportBtn">{{ exportText }}</button>
    </div>
    <div ref="misContainer"></div>
    <div ref="tbContainer"></div>
</div>
</template>

<script>
import G6 from '@antv/g6';
import insertCss from 'insert-css';
import langMap from '../../locale/langMap'
insertCss(`
  .g6-component-toolbar {
    right: 40px !important;
    left: inherit!important;
    top: unset !important;
    padding: 0px!important;
    position: fixed !important;
    bottom: 30px;
  }
  .g6-component-toolbar li {
     float: none!important;
     margin-bottom: 8px!important;
     margin-top:10px!important;
     margin-left:10px!important
  }
`);
G6.registerEdge("x-flow-line", {
        draw(cfg, group) {
          const startPoint = cfg.startPoint;
          const endPoint = cfg.endPoint;
          const { style } = cfg;
          let path = [
                        ['M', startPoint.x, startPoint.y],
                        ["L", startPoint.x, (startPoint.y + endPoint.y) / 2],
                        ["L", endPoint.x, (startPoint.y + endPoint.y) / 2],
                        ["L", endPoint.x, endPoint.y]
        ]
        // if(cfg.isShareholder) {
        //             path =  [
        //                 ['M', startPoint.x, startPoint.y],
        //                 ["L", startPoint.x, (startPoint.y + endPoint.y)/2],
        //                 ["L", endPoint.x -80, (startPoint.y + endPoint.y) / 2],
        //                 ["L", endPoint.x -80, endPoint.y + 25],
        //                 ["L", endPoint.x -60, endPoint.y + 25]
        //             ]

        //  }
         // 跨层级
          if(endPoint.y - startPoint.y > 104) {
            path = [
                    ['M', startPoint.x, startPoint.y],
                    ["L", startPoint.x, (startPoint.y + endPoint.y -113) / 2],
                    ["L", endPoint.x, (startPoint.y + endPoint.y -113) / 2],
                    ["L", endPoint.x, endPoint.y]
            ]
          }
          if(endPoint.y - startPoint.y > 180) {
            path = [
                    ['M', startPoint.x, startPoint.y],
                    ["L", startPoint.x, (startPoint.y + endPoint.y -223) / 2],
                    ["L", endPoint.x, (startPoint.y + endPoint.y -223) / 2],
                    ["L", endPoint.x, endPoint.y]
            ]
          }
          
          const shape = group.addShape("path", {
            attrs: {
              stroke: style.stroke,
              endArrow: style.endArrow,
              lineDash: style.lineDash || 0,
              path
            },
          });
          if (cfg.label) {
            let xPoint = null
            if(startPoint.x < endPoint.x) {
                xPoint =  (cfg.isShareholder ? endPoint.x - 80: endPoint.x - 35)
            } else {
                xPoint = (cfg.isShareholder ? endPoint.x -80 : endPoint.x + 5)
            }
          let yPoint  = (startPoint.y + endPoint.y) / 2
          if(endPoint.y - startPoint.y > 104) {
            yPoint = (startPoint.y + endPoint.y -113) / 2
          } 
           if(endPoint.y - startPoint.y > 180) {
            yPoint = (startPoint.y + endPoint.y -223) / 2
          }

            group.addShape('text', {
                attrs: {
                    id: 'edgeText' + Math.random(),
                    x: cfg.label === 'VIE' ?startPoint.x < endPoint.x ? endPoint.x + 5 : endPoint.x - 20 :xPoint,
                    y: cfg.label === 'VIE' ? endPoint.y - 10 : yPoint,
                    text: cfg.label,
                    fill: '#595959'
                }
            })
           
          }
          return shape;
        },
        setState(name, value, item) {
            const shape = item.get('keyShape');
            if (name === 'running') {
                if (value) {
                let index = 0;
                shape.animate(
                    () => {
                    index++;
                    if (index > 9) {
                        index = 0;
                    }
                    const res = {
                        lineDash,
                        lineDashOffset: -index,
                        stroke: '#4a89e8',
                        lineWidth: 2
                    };
                    return res;
                    },
                    {
                        repeat: true,
                        duration: 3000,
                    },
                );
                } else {
                    shape.stopAnimate();
                    shape.attr('lineDash', item._cfg.originStyle.lineDash ? item._cfg.originStyle.lineDash : null);
                    shape.attr('stroke', item._cfg.originStyle.stroke)
                    shape.attr('lineWidth', item._cfg.originStyle.lineWidth)

                }
            }
       },
})

G6.registerNode('card-node', {
    afterDraw(cfg, group) {
    const w = cfg.size[0];
    const h = cfg.size[1];
    group.addShape('marker', {
        attrs: {
          x: 0,
          y: h /2,
          r: 6,
          cursor: 'pointer',
          symbol: cfg.collapsed ? G6.Marker.expand : G6.Marker.collapse,
          stroke: '#666',
          fill: '#fff',
        },
        name: 'collapse-icon',
      });
  },
  setState(name, value, item) {
    if (name === 'collapsed') {
      const marker = item.get('group').find((ele) => ele.get('name') === 'collapse-icon');
      const icon = value ? G6.Marker.expand : G6.Marker.collapse;
      marker.attr('symbol', icon);
    }
  },
}, 'rect');
const globalFontSize = 12;
const lineDash = [4, 2, 1, 2];
export default {
    name: 'cw-equity-chart',
    props: {
        isOnSearch: {
            type: Boolean,
            default: false
        },
        isShowLegend: {
            type: Boolean,
            default: true
        },
        nodeData: {
            type: Object,
            default: () => {
                return {}
            }
        },
        isExportAuth: {
            type: Boolean,
            default: true
        },
        lang: {
            type: String,
            default: 'zh-cn'
        }
    },
    data() {
        const iconList = this.updateLegend()
        return {
           iconList: iconList,
           graph: {},
           renderData: {},
           exportText: langMap[this.lang].export,
           legendText: langMap[this.lang].legend,
        //    nodeData: mockData.Data
        }
    },
    mounted() {
        this.initGraphObj()
        this.renderGraph()
        // console.log('mockData', mockData.Data)
    },
    watch: {
        lang: {
            handler: function (val) {
               this.$nextTick(()=> {
                    this.iconList = this.updateLegend()
                    this.exportText = langMap[this.lang].export
                    this.legendText = langMap[this.lang].legend
               })
            },
            deep: true,
            immediate: true
        },
        nodeData: {
            handler: function (val) {
               this.$nextTick(()=> {
                    this.renderGraph()
               })
            },
            deep: true,
            immediate: true
       }
    },
    methods: {
        handleNodeExpand (node, type ='hide') {
            const list = node.getOutEdges();
            list.forEach((_edg)=> {
                const target = _edg.getTarget()
                if(type === 'hide') {
                    this.graph.hideItem(target)
                } else {
                    this.graph.showItem(target)
                }
                if(target.getOutEdges().length) {
                    this.handleNodeExpand(target, type)
                }
            })
        },
        initGraphObj () {
            const lang = this.lang
            const container = this.$refs.misContainer
            const chartRef = this.$refs.chartRef
            const width = container.scrollWidth;
            const height = container.scrollHeight || 1000;
            const toolbar = new G6.ToolBar({
                position: [
                    [200, 1],
                    [200, 1],
                ],
                getContent: () => {
                    const langKV = langMap[lang]
                    return langKV && `
                        <ul class='g6-component-toolbar'>
                            <li code='fullscreen' style='display:block' title="${ langKV.fullScreen }" id="fullscreen">
                                <svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20">
                                    <path d="M674.414 394.644l253.292-252.418-0.868 143.044c-0.348 11.864 9.244 22.327 21.106 21.979h15.177c11.864-0.349 21.804-7.326 21.979-19.364l0.699-212.995c0-0.175 0.348-11.338 0.348-11.338 0.175-5.929-1.222-11.338-5.060-15.177-3.838-3.838-9.067-6.279-15.177-6.106l-10.816 0.175c-0.174 0-0.344 0-0.52 0.175l-211.252-0.875c-11.864 0.349-21.804 10.122-21.979 22.156v15.177c1.747 14.129 12.907 22.329 24.77 21.979l139.205 0.349-252.593 251.549c-11.514 11.514-11.514 30.177 0 41.689 11.514 11.688 30.18 11.688 41.693 0h-0.004zM355.18 632.585l-253.465 251.551 0.873-142.352c0.349-11.859-9.248-22.323-21.11-21.979h-16.046c-11.864 0.349-21.804 7.327-21.979 19.365l-0.699 213.17c0 0.175-0.348 11.338-0.348 11.338-0.175 5.936 1.222 11.338 5.055 15.177 3.838 3.838 9.073 6.279 15.177 6.106l10.815-0.175c0.175 0 0.349 0 0.525-0.175l212.125 0.874c11.859-0.349 21.804-10.117 21.979-22.156v-15.176c-1.746-14.129-12.91-22.329-24.775-21.979l-139.206-0.349 252.419-251.543c11.514-11.514 11.514-30.181 0-41.693-11.334-11.688-29.824-11.688-41.34 0.001v0zM985.799 952.339l-0.524-213.17c-0.349-11.865-10.122-19.016-21.98-19.365h-15.176c-11.865-0.344-21.283 10.122-21.111 21.979l0.874 143.049-253.466-252.247c-11.514-11.514-30.18-11.514-41.693 0-11.509 11.513-11.509 30.18 0 41.693l252.422 251.542-139.205 0.349c-11.864-0.349-22.852 8.024-24.774 21.979v15.177c0.348 11.864 10.122 21.804 21.979 22.156l211.253-0.874c0.174 0 0.348 0.175 0.524 0.175l10.816 0.175c5.928 0.174 11.338-2.093 15.176-6.106 3.838-3.838 5.232-9.243 5.056-15.177 0 0-0.175-11.164-0.175-11.338h0.005zM144.282 101.407l139.205-0.349c11.859 0.349 22.848-8.024 24.77-21.979v-15.179c-0.349-11.864-10.117-21.804-21.979-22.156l-212.296 0.874c-0.175 0-0.349-0.175-0.525-0.175l-10.814-0.175c-5.936-0.174-11.338 2.093-15.177 6.106-3.838 3.838-5.237 9.243-5.055 15.177 0 0 0.348 11.164 0.348 11.338l0.52 213.17c0.175 11.86 10.122 19.016 21.979 19.36h16.051c11.864 0.348 21.282-10.117 21.105-21.979l-0.698-142.346 253.296 251.725c11.508 11.514 30.176 11.514 41.688 0 11.514-11.514 11.514-30.18 0-41.693l-252.419-251.716zM144.282 101.407z" fill="#272636" p-id="4176"></path>
                                </svg>
                            </li>
                            <li code='unFullscreen' style='display:none' title="${ langKV.unFullScreen }" id="unFullscreen">
                                <svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20">
                                    <path d="M582.6 441.4v-320h50V356l274-274 35.4 35.4-274 274h234.6v50h-320zM117.4 942l274-274v234.6h50v-320h-320v50H356l-274 274 35.4 35.4zM132 132h302V82H82v352h50V132z m760 760H590v50h352V590h-50v302z" fill="" p-id="2092"></path></svg>
                            </li>
                            <li code='zoomOut' style='display:block' title="${ langKV.zoomIn }">
                                <svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20">
                                    <path d="M1009.152 923.328c19.776 19.328 19.648 50.816-0.256 70.272-19.712 19.52-51.84 19.52-71.616 0.128l-254.848-265.536c-162.944 137.856-408.32 131.776-561.92-19.072-161.216-157.952-160.512-414.784 1.536-573.568 161.856-158.912 423.744-159.616 584.896-1.536 150.144 147.2 159.744 380.224 29.312 539.84 3.584 2.24 7.168 4.992 11.136 8.768L1009.152 923.328 1009.152 923.328zM752 424.128c0-189.952-153.92-344-343.936-344S64 234.176 64 424.128c0 190.016 154.048 343.936 344.064 343.936S752 614.144 752 424.128L752 424.128zM621.376 450.944 434.624 450.944l0 186.432c0 19.264-15.616 34.88-34.816 34.88-19.264 0-34.944-15.616-34.944-34.88L364.864 450.944 179.008 450.944C159.68 450.944 144 435.392 144 416c0-19.264 15.68-34.944 35.008-34.944l185.856 0L364.864 195.072c0-19.328 15.68-34.944 34.944-34.944 19.2 0 34.816 15.616 34.816 34.944l0 185.984 186.752 0c19.264 0 34.88 15.68 34.88 34.944C656.256 435.392 640.64 450.944 621.376 450.944L621.376 450.944z" fill="#2c2c2c" p-id="6249"></path>
                                </svg>
                            </li>
                            <li code='zoomIn' style='display:block' title="${ langKV.zoomOut }">
                                <svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                                    <path d="M561.4 437.1H258.5c-15.5 0-28-12.5-28-28v0c0-15.5 12.5-28 28-28h302.9c15.5 0 28 12.5 28 28v0C589.4 424.6 576.9 437.1 561.4 437.1z" fill="#2c2c2c" p-id="7261"></path><path d="M943.4 901.4L673.6 632.3c22.6-26.7 41-56.4 54.6-88.7 18-42.6 27.2-87.8 27.2-134.5s-9.1-91.9-27.2-134.5c-17.4-41.1-42.3-78.1-74-109.8-31.7-31.7-68.7-56.6-109.8-74-42.6-18-87.8-27.2-134.5-27.2-46.6 0-91.9 9.1-134.5 27.2-41.1 17.4-78.1 42.3-109.8 74-31.7 31.7-56.6 68.7-74 109.8-18 42.6-27.2 87.9-27.2 134.5s9.1 91.9 27.2 134.5c17.4 41.1 42.3 78.1 74 109.8 31.7 31.7 68.7 56.6 109.8 74 42.6 18 87.9 27.2 134.5 27.2s91.9-9.1 134.5-27.2c32.7-13.8 62.8-32.4 89.7-55.4l269.8 269.1c10.9 10.9 28.7 10.9 39.6 0l0 0C954.3 930.1 954.3 912.3 943.4 901.4zM409.9 698.5c-77.3 0-150-30.1-204.7-84.8-54.7-54.7-84.8-127.4-84.8-204.7s30.1-150 84.8-204.7c54.7-54.7 127.4-84.8 204.7-84.8s150 30.1 204.7 84.8c54.7 54.7 84.8 127.4 84.8 204.7 0 77.3-30.1 150-84.8 204.7S487.3 698.5 409.9 698.5z" fill="#2c2c2c" p-id="7262"></path>
                                </svg>
                            </li> 
                        </ul>
                    `
                },
                handleClick: (code, graph) => {
                    if (code === 'fullscreen') {
                        this.launchIntoFullscreen(chartRef)
                        document.getElementById(code).style.display = 'none';
                        document.getElementById('unFullscreen').style.display = 'block';
                        
                    } else if (code === 'unFullscreen') {
                        this.exitFullscreen()
                        document.getElementById(code).style.display = 'none';
                        document.getElementById('fullscreen').style.display = 'block';
                        this.graph.changeSize(width,height)

                    } else {
                    // 其他操作保持默认不变
                    toolbar.handleDefaultOperator(code)
                    }
                }
            });
            this.graph = new G6.Graph({
                container,
                width,
                height,
                fitView: true,
                modes: {
                    default: [
                    'drag-canvas', 
                    {
                    type:  'scroll-canvas',
                    direction: 'x'
                    },
                    { type: 'zoom-canvas', sensitivity: 1, minZoom: 0, maxZoom: 1.5 },],
                },
                layout: {
                    type: 'dagre',
                    rankdir: 'TB',
                    // align: 'UL',
                    // controlPoints: true,
                    nodesep:  12,  // 节点间距
                    ranksep: 20, // 层级间距
                },
                defaultNode: {
                    size: [120, 52],
                    type: 'card-node',
                    labelCfg: {
                        style: {
                            fontSize: 12
                        }
                    },
                    style: {
                        lineWidth: 1,
                        radius: 4,
                    },
                    anchorPoints: [[0.5, 0], [0.5, 1]]
                },
                defaultEdge: {
                    type: "x-flow-line",
                    style: {
                            stroke: "#BFBFBF",
                            endArrow: true,
                    }
                },
                plugins: [toolbar], 
            });
            this.graph.on('node:click', (e, node) => {
                const nodeInfo = e.item._cfg.model
                if (e.target.get('name') === 'collapse-icon') {
                    e.item.getModel().collapsed = !e.item.getModel().collapsed;
                    this.graph.setItemState(e.item, 'collapsed', e.item.getModel().collapsed);
                    if(e.item.getModel().collapsed) {
                        this.handleNodeExpand(e.item) 
                    } else {
                        this.handleNodeExpand(e.item, 'show') 
                    }
                } else {
                    this.$emit('node-click', {
                    id: nodeInfo.id,
                    name: nodeInfo.label.replace('\n', '')
                })
                }
            })
            this.graph.on('node:mouseenter', (ev) => {
                const node = ev.item;
                const edges = node.getEdges();
                edges.forEach((edge) => this.graph.setItemState(edge, 'running', true));
            });
            this.graph.on('node:mouseleave', (ev) => {
                const node = ev.item;
                const edges = node.getEdges();
                edges.forEach((edge) => this.graph.setItemState(edge, 'running', false));
            });
        },
        renderGraph() {
            if(!this.nodeData || JSON.stringify(this.nodeData) === '{}') {
                return 
            }
            if(!this.nodeData.nodes || !this.nodeData.nodes.length) {
                return 
            }
            this.renderData = JSON.parse(JSON.stringify(this.nodeData))
            let heightNodes = []
            // 取出需要高亮的数据
            this.renderData.edges && this.renderData.edges.length && this.renderData.edges.forEach((edge)=> {
                edge.style = edge.style || {}
                if(edge.companyAttribute === 'VIE主体') {
                    edge.style.lineDash = [3,5]
                }   
                if(this.isOnSearch && edge.companyBrightness)  {
                    edge.style.stroke = '#F18C77'
                    edge.style.endArrow = true
                    heightNodes.push(edge.source)
                    heightNodes.push(edge.target)
                }
            });
            this.renderData.nodes && this.renderData.nodes.length && this.renderData.nodes.forEach((node)=> {
            node.label = this.fittingString(node.label, 110, globalFontSize);
            node.labelCfg = {}
            node.labelCfg.style = {}
            node.style = {}
            // 渲染节点样式
            if(node.companyCountry) {
                let index  = this.iconList.findIndex((item)=> item.label === node.companyCountry)
                // 查询状态
                if(this.isOnSearch) {
                    // 降低透明度
                    if(!heightNodes.includes(node.id)) {
                        if(index > -1) {
                            node.style = {
                                stroke:  this.iconList[index].border,
                                fill:  this.iconList[index].background,
                                opacity: 0.4,
                            }
                        }
                        node.labelCfg.style = {
                            fontWeight: 400,
                            fill: '#262626',
                            opacity: 0.4
                        }
                    } else {
                        if(index > -1) {
                        node.style = {
                                stroke:  this.iconList[index].border,
                                fill:  this.iconList[index].border,
                                opacity: 1,
                            }
                        }
                        node.labelCfg.style = {
                            fontWeight: 600,
                            fill: '#FFFFFF',
                            opacity: 1
                        }
                    } 
                } else {
                    // 非查询状态
                    if(index > -1) {
                        node.style = {
                            stroke:  this.iconList[index].border,
                            fill:  this.iconList[index].background,
                            opacity: 1,
                        }
                    }
                    node.labelCfg.style = {
                            fontWeight: 400,
                            fill: '#262626',
                            opacity: 1
                    }
                }
            }

            });
            this.graph.changeData(this.renderData);

            if (typeof window !== 'undefined')
                window.onresize = () => {
                    if (!this.graph || this.graph.get('destroyed')) return;
                    if (!this.$refs.misContainer || !this.$refs.misContainer.scrollWidth || !this.$refs.misContainer.scrollHeight) return;
                    this.graph.changeSize(this.$refs.misContainer.scrollWidth, this.$refs.misContainer.scrollHeight);
                };

        },
        fittingString (str, maxWidth, fontSize) {
            let currentWidth = 0;
            let res = str;
            // 区分汉字和字母
            const pattern = new RegExp("[\u4E00-\u9FA5]+");
            str.split("").forEach((letter, i) => {
                if (currentWidth > maxWidth) return;
                if (pattern.test(letter)) {
                    // 中文字符
                    currentWidth += fontSize;
                } else {
                    // 根据字体大小获取单个字母的宽度
                    currentWidth += G6.Util.getLetterWidth(letter, fontSize);
                }
                if (currentWidth > maxWidth) {
                    res = `${str.substr(0, i)}\n${this.fittingString(
                        str.substr(i),
                        maxWidth,
                        fontSize
                    )}`;
                }
            });
            return res;
        },
        handleExport () {
            window.oldRatio = window.devicePixelRatio;
            window.devicePixelRatio = 2;
            this.graph.downloadFullImage('股权关系图', 'image/png', {
                backgroundColor: '#fff',
                padding: [30, 15, 15, 15],
            });
            setTimeout(() => {
                window.devicePixelRatio = window.oldRatio;
            }, 100);
        },
        launchIntoFullscreen(element) {
            // 全屏
            if (element.requestFullscreen) {
            element.requestFullscreen()
            }
        },
        exitFullscreen() {
        // 退出全屏
            if (document.exitFullscreen) {
            document.exitFullscreen()
            }
        },
        updateLegend () {
            const langKV = langMap[this.lang]
            const langKVZhCn = langMap['zh-cn']
            const iconList = [
                {
                    name : langKV.China,
                    background: '#FFE3E3',
                    border: '#EE1C25',
                    label: langKVZhCn.China
                },
                {
                    name : langKV.Cayman,
                    background: '#FDF4E9',
                    border: '#EEA244',
                    label: langKVZhCn.Cayman
                },
                {
                    name: langKV.British,
                    background: '#EEF3FF',
                    border: '#7793D8',
                    label: langKVZhCn.British
                },
                {
                    name: langKV.American,
                    background: '#EBFEF7',
                    border: '#63CCA5',
                    label: langKVZhCn.American
                },
                {
                    name: langKV.UnitedKingdom,
                    background: '#E0FF99',
                    border: '#6E9D00',
                    label: langKVZhCn.UnitedKingdom
                },
                {
                    name: langKV.Canada,
                    background: '#DEFAFE',
                    border: '#12ABC4',
                    label: langKVZhCn.Canada
                },
                {
                    name: langKV.France,
                    background: '#EAE6FF',
                    border: '#6B54D6',
                    label: langKVZhCn.France
                },
                {
                    name: langKV.Spain,
                    background: '#EBFFC5',
                    border: '#22BE65',
                    label: langKVZhCn.Spain

                },
                {
                    name: langKV.Ireland,
                    background: '#FEFFA2',
                    border: '#A89F00',
                    label: langKVZhCn.Ireland
                },
                {
                    name: langKV.Singapore,
                    background: '#F5D2FF',
                    border: '#8200A6',
                    label: langKVZhCn.Singapore
                },
                {
                    name: langKV.Japan,
                    background: '#FFEACD',
                    border: '#B96B00',
                    label: langKVZhCn.Japan
                },
                {
                    name: langKV.HongKong,
                    background: '#A9E5FF',
                    border: '#0071A3',
                    label: langKVZhCn.HongKong
                },
                {
                    name: langKV.Macao,
                    background: '#FFCCEB',
                    border: '#930058',
                    label: langKVZhCn.Macao
                },
                {
                    name: langKV.Taiwan,
                    background: '#FFEEF2',
                    border: '#E97B91',
                    label: langKVZhCn.Taiwan
                },
                {
                    name: langKV.Sweden,
                    background: '#E8F6FF',
                    border: '#0C449F',
                    label: langKVZhCn.Sweden
                },
            ]

            return iconList
        }
    }
};
</script>

<style module>
.root {
    position: relative;
    background: #fff;
    /* backgroundColor: #fff */
}
.chartTop {
    display: flex;
    justify-content: space-between
}
.legendStyle {
    margin-right: 10px;
}
.legendCircle {
        box-sizing: border-box;
        width: 12px;
        height: 12px;
        border: 1px solid;
        border-radius: 6px;
        display: inline-block;
        flex: none;
        order: 0;
        flex-grow: 0;
}

/* .g6-component-toolbar {
    right: 10px;
    left: inherit;
    top:inherit;
    bottom: 400px
  }
  .g6-component-toolbar li {
     float: none;
     margin-bottom: 8px
  } */
.exportBtn {
    color: #fff;
    border-color: #337eff;
    background: #337eff;
    text-shadow: 0 -1px 0 rgb(0 0 0 / 12%);
    box-shadow: 0 2px #0000000b;
    outline: 0;
    line-height: 1;
    position: relative;
    display: inline-block;
    font-weight: 400;
    white-space: nowrap;
    text-align: center;
    user-select: none;
    touch-action: manipulation;
    height: 30px;
    padding: 4px 15px;
    font-size: 14px;
    border-radius: 4px;
    cursor: pointer;
    transition: all .3s cubic-bezier(.645,.045,.355,1);
    -webkit-user-select: none;
    border: 1px solid transparent;
}
</style>
