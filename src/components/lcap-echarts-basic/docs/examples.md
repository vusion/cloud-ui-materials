### 基本用法

``` vue
<template>
<lcap-echarts-basic :options="data"></lcap-echarts-basic>
</template>

<script>
export default {
    data() {
        return {
            data: {
  "title": {
    "left": "left"
  },
  "color": [
    "#337EFF",
    "#26BD71"
  ],
  "legend": {
    "data": [
      "累计关闭的需求",
      "累计创建的需求",
      "新增的需求",
      "关闭的需求"
    ]
  },
  "dataZoom": [
    {
      "type": "inside",
      "minValueSpan": 6
    }
  ],
  "grid": {
    "top": "50px",
    "bottom": "5px",
    "left": "50px",
    "right": "50px",
    "containLabel": true
  },
  "xAxis": [
    {
      "type": "category",
      "boundaryGap": true,
      "axisLine": {
        "lineStyle": {
          "color": "#666666"
        },
        "show": false
      },
      "data": [
        "2021-08",
        "2021-09",
        "2021-10",
        "2021-11",
        "2021-12",
        "2022-01",
        "2022-02",
        "2022-03",
        "2022-04",
        "2022-05",
        "2022-06",
        "2022-07",
        "2022-08"
      ],
      "axisPointer": {
        "type": "shadow"
      }
    }
  ],
  "yAxis": [
    {
      "type": "value",
      "minInterval": 1,
      "axisLine": {
        "lineStyle": {
          "color": "#337EFF",
          "formatter": "{value}"
        },
        "show": false
      },
      "splitLine": {
        "lineStyle": {
          "type": "dashed",
          "color": "#EAEAEA"
        }
      }
    },
    {
      "type": "value",
      "minInterval": 1,
      "axisLine": {
        "show": false,
        "lineStyle": {
          "color": "#F24957"
        },
        "formatter": "{value}"
      },
      "splitLine": {
        "show": false,
        "lineStyle": {
          "type": "dashed",
          "color": "#EAEAEA"
        }
      }
    }
  ],
  "tooltip": {
    "trigger": "axis",
    "axisPointer": {
      "type": "shadow",
      "shadowStyle": {
        "color": "#1885F2",
        "opacity": 0.2
      }
    },
    "padding": 15,
    "backgroundColor": "#ffffff",
    "confine": true
  },
  "series": [
    {
      "name": "累计关闭的需求",
      "type": "line",
      "yAxisIndex": 1,
      "data": [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        3
      ],
      "symbol": "circle",
      "symbolSize": 5,
      "lineStyle": {
        "normal": {
          "width": 1,
          "type": "solid",
          "color": "#FFB21A"
        }
      },
      "itemStyle": {
        "normal": {
          "color": "#FFB21A",
          "borderColor": "#FFB21A",
          "borderWidth": 0
        },
        "emphasis": {
          "borderColor": "#ffffff",
          "borderWidth": 2,
          "color": "#FFB21A"
        }
      },
      "areaStyle": {
        "normal": {
          "color": {
            "colorStops": [
              {
                "offset": 0,
                "color": "rgba(255, 178, 26,0.2)"
              },
              {
                "offset": 1,
                "color": "rgba(255, 178, 26,0)"
              }
            ],
            "x": 0,
            "y": 0,
            "x2": 0,
            "y2": 1,
            "type": "linear",
            "global": false
          }
        }
      }
    },
    {
      "name": "累计创建的需求",
      "type": "line",
      "yAxisIndex": 1,
      "data": [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        4
      ],
      "symbol": "circle",
      "symbolSize": 5,
      "lineStyle": {
        "normal": {
          "width": 1,
          "type": "solid",
          "color": "#F24957"
        }
      },
      "itemStyle": {
        "normal": {
          "color": "#F24957",
          "borderColor": "#F24957",
          "borderWidth": 0
        },
        "emphasis": {
          "borderColor": "#ffffff",
          "borderWidth": 2,
          "color": "#F24957"
        }
      },
      "areaStyle": {
        "normal": {
          "color": {
            "colorStops": [
              {
                "offset": 0,
                "color": "rgba(1242, 73, 87,0.2)"
              },
              {
                "offset": 1,
                "color": "rgba(242, 73, 87,0)"
              }
            ],
            "x": 0,
            "y": 0,
            "x2": 0,
            "y2": 1,
            "type": "linear",
            "global": false
          }
        }
      }
    },
    {
      "name": "新增的需求",
      "type": "bar",
      "data": [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        3
      ],
      "barWidth": 8
    },
    {
      "name": "关闭的需求",
      "type": "bar",
      "data": [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        1,
        2
      ],
      "barWidth": 8
    }
  ]
}
        };
    },
};
</script>
```

``` vue
<template>
<lcap-echarts-basic :options="data"></lcap-echarts-basic>
</template>

<script>
export default {
    data() {
        return {
            data: {
  "xAxis": {
    "name": "时长（天）",
    "nameTextStyle": {
      "padding": [
        0,
        0,
        0,
        -10
      ]
    },
    "axisTick": {
      "show": false
    },
    "axisLine": {
      "lineStyle": {
        "color": "#666666"
      }
    },
    "splitLine": {
      "show": false,
      "lineStyle": {
        "type": "dashed"
      }
    }
  },
  "yAxis": {
    "type": "value",
    "minInterval": 1,
    "axisLine": {
      "lineStyle": {
        "color": "#666666"
      }
    },
    "splitLine": {
      "show": true,
      "lineStyle": {
        "type": "dashed",
        "color": "#EAEAEA"
      }
    },
    "name": "数量 (个)",
    "nameTextStyle": {
      "padding": [
        0,
        0,
        5,
        20
      ]
    }
  },
  "tooltip": {
    "trigger": "item",
    "padding": 16,
    "confine": true
  },
  "series": [
    {
      "name": null,
      "data": [
        [
          3.2,
          1
        ],
        [
          12.2,
          1
        ]
      ],
      "type": "scatter",
      "symbolSize": 10,
      "z": 10,
      "markLine": {
        "symbol": "none",
        "tooltip": {
          "formatter": "版本交付周期分布{b} : {c}天"
        },
        "label": {
          "normal": {
            "show": true,
            "position": "end",
            "formatter": "{b}"
          }
        },
        "lineStyle": {
          "normal": {
            "width": 1,
            "color": "#337EFF"
          }
        },
        "data": [
          {
            "name": "20%数",
            "xAxis": 3.2,
            "label": {
              "normal": {
                "color": "#333"
              }
            }
          },
          {
            "name": "中位数",
            "xAxis": 7.7,
            "label": {
              "normal": {
                "color": "#333",
                "position": "start",
                "formatter": "{b}"
              }
            }
          },
          {
            "name": "80%数",
            "xAxis": 7.7,
            "label": {
              "normal": {
                "show": true,
                "color": "#333"
              }
            }
          }
        ]
      },
      "itemStyle": {
        "normal": {
          "shadowBlur": 0,
          "borderColor": "#337EFF",
          "shadowColor": "transparent",
          "shadowOffsetY": 0,
          "color": "#EAEAEA"
        }
      }
    }
  ]
}
        };
    },
};
</script>
```

``` vue
<template>
<lcap-echarts-basic :options="data"></lcap-echarts-basic>
</template>

<script>
export default {
    data() {
        return {
            data: {
  "title": {
    "text": 4,
    "top": "30%",
    "left": "center",
    "subtext": "总数(个)",
    "subtextStyle": {
      "color": "#999999",
      "textAlign": "center",
      "fontFamily": "PingFangSC-Regular",
      "fontSize": 14
    },
    "textStyle": {
      "color": "#333333",
      "fontSize": 30,
      "fontWeight": "bold"
    }
  },
  "tooltip": {
    "trigger": "item",
    "position": "right"
  },
  "series": {
    "type": "sunburst",
    "renderLabelForZeroData": true,
    "data": [
      {
        "name": "未开始",
        "category": 2,
        "value": 1,
        "children": [
          {
            "name": "未开始",
            "category": 2,
            "value": 1
          }
        ]
      },
      {
        "name": "进行中",
        "category": 4,
        "value": 1,
        "children": [
          {
            "name": "解决中",
            "category": 4,
            "value": 0
          },
          {
            "name": "已解决",
            "category": 4,
            "value": 1
          }
        ]
      },
      {
        "name": "已完成",
        "category": 3,
        "value": 2,
        "children": [
          {
            "name": "已关闭",
            "category": 3,
            "value": 1
          },
          {
            "name": "已取消",
            "category": 3,
            "value": 1
          }
        ]
      }
    ],
    "emphasis": {
      "focus": "ancestor",
      "blurScope": "global",
      "itemStyle": {
        "opacity": 1
      }
    },
    "label": {
      "normal": {
        "show": false
      }
    },
    "levels": [
      {},
      {
        "r0": "70%",
        "r": "85%"
      },
      {
        "r0": "90%",
        "r": "95%"
      }
    ],
    "radius": [
      "0%",
      "100%"
    ],
    "color": [
      "#CCCCCC",
      "#26BD71",
      "#337EFF"
    ]
  }
}
        };
    },
};
</script>
```
