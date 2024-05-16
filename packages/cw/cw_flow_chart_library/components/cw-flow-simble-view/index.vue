<template>
  <div id="container"></div>
</template>
<script>
import { Graph, Shape } from "@antv/x6";
import { Stencil } from "@antv/x6-plugin-stencil";
import { Transform } from "@antv/x6-plugin-transform";
import { Selection } from "@antv/x6-plugin-selection";
import { Snapline } from "@antv/x6-plugin-snapline";
import { Keyboard } from "@antv/x6-plugin-keyboard";
import { Clipboard } from "@antv/x6-plugin-clipboard";
import { History } from "@antv/x6-plugin-history";
import { Export } from "@antv/x6-plugin-export";
import insertCss from "insert-css";
export default {
  name: "x6-view",
  data() {
    return {
      graph: null,
    };
  },
  props: {
    value: {
      type: String,
    },
  },
  watch: {
    value: {
      handler(value) {
        if (this.graph) {
          this.graph.fromJSON(JSON.parse(value));
        }
      },
    },
  },
  mounted() {
    this.init();
    const graph = new Graph({
      container: document.getElementById("graph-container"),
      grid: true,
      mousewheel: {
        enabled: true,
        zoomAtMousePosition: true,
        modifiers: "ctrl",
        minScale: 0.5,
        maxScale: 3,
      },
      connecting: {
        connector: {
          name: "rounded",
          args: {
            radius: 8,
          },
        },
        anchor: "center",
        connectionPoint: "anchor",
        allowBlank: false,
        snap: {
          radius: 20,
        },
        createEdge() {
          return new Shape.Edge({
            attrs: {
              line: {
                stroke: "#A2B1C3",
                strokeWidth: 2,
                targetMarker: {
                  name: "block",
                  width: 12,
                  height: 8,
                },
              },
            },
            zIndex: 0,
          });
        },
        validateConnection({ targetMagnet }) {
          return !!targetMagnet;
        },
      },
      highlighting: {
        magnetAdsorbed: {
          name: "stroke",
          args: {
            attrs: {
              fill: "#5F95FF",
              stroke: "#5F95FF",
            },
          },
        },
      },
    });
    this.graph = graph;
    this.graph.fromJSON(this.value || {});
    graph
      .use(
        new Transform({
          resizing: true,
          rotating: true,
        })
      )
      .use(
        new Selection({
          rubberband: true,
          showNodeSelectionBox: true,
        })
      )
      .use(new Export())
      .use(new Snapline())
      .use(new Keyboard())
      .use(new Clipboard())
      .use(new History());
    const stencil = new Stencil({
      title: "流程图",
      target: graph,
      stencilGraphWidth: 200,
      stencilGraphHeight: 180,
      // collapsable: true,
      groups: [
        {
          title: "基础流程图",
          name: "group1",
        },
      ],
      layoutOptions: {
        columns: 2,
        columnWidth: 80,
        rowHeight: 55,
      },
    });
    document.getElementById("stencil").appendChild(stencil.container);
    graph.bindKey(["meta+c", "ctrl+c"], () => {
      const cells = graph.getSelectedCells();
      if (cells.length) {
        graph.copy(cells);
      }
      return false;
    });
    graph.bindKey(["meta+x", "ctrl+x"], () => {
      const cells = graph.getSelectedCells();
      if (cells.length) {
        graph.cut(cells);
      }
      return false;
    });
    graph.bindKey(["meta+v", "ctrl+v"], () => {
      if (!graph.isClipboardEmpty()) {
        const cells = graph.paste({ offset: 32 });
        graph.cleanSelection();
        graph.select(cells);
      }
      return false;
    });

    //undo redo
    graph.bindKey(["meta+z", "ctrl+z"], () => {
      if (graph.history.canUndo()) {
        graph.history.undo();
      }
      return false;
    });
    graph.bindKey(["meta+shift+z", "ctrl+shift+z"], () => {
      if (graph.history.canRedo()) {
        graph.history.redo();
      }
      return false;
    });

    // select all
    graph.bindKey(["meta+a", "ctrl+a"], () => {
      const nodes = graph.getNodes();
      if (nodes) {
        graph.select(nodes);
      }
    });

    //delete
    graph.bindKey("backspace", () => {
      const cells = graph.getSelectedCells();
      if (cells.length) {
        graph.removeCells(cells);
      }
    });

    // zoom
    graph.bindKey(["ctrl+1", "meta+1"], () => {
      const zoom = graph.zoom();
      if (zoom < 1.5) {
        graph.zoom(0.1);
      }
    });
    graph.bindKey(["ctrl+2", "meta+2"], () => {
      const zoom = graph.zoom();
      if (zoom > 0.5) {
        graph.zoom(-0.1);
      }
    });

    const ports = {
      groups: {
        top: {
          position: "top",
          attrs: {
            circle: {
              r: 4,
              magnet: true,
              stroke: "#5F95FF",
              strokeWidth: 1,
              fill: "#fff",
              style: {
                visibility: "hidden",
              },
            },
          },
        },
        right: {
          position: "right",
          attrs: {
            circle: {
              r: 4,
              magnet: true,
              stroke: "#5F95FF",
              strokeWidth: 1,
              fill: "#fff",
              style: {
                visibility: "hidden",
              },
            },
          },
        },
        bottom: {
          position: "bottom",
          attrs: {
            circle: {
              r: 4,
              magnet: true,
              stroke: "#5F95FF",
              strokeWidth: 1,
              fill: "#fff",
              style: {
                visibility: "hidden",
              },
            },
          },
        },
        left: {
          position: "left",
          attrs: {
            circle: {
              r: 4,
              magnet: true,
              stroke: "#5F95FF",
              strokeWidth: 1,
              fill: "#fff",
              style: {
                visibility: "hidden",
              },
            },
          },
        },
      },
      items: [
        {
          group: "top",
        },
        {
          group: "right",
        },
        {
          group: "bottom",
        },
        {
          group: "left",
        },
      ],
    };

    const showPorts = (ports, show) => {
      for (let i = 0, len = ports.length; i < len; i += 1) {
        ports[i].style.visibility = show ? "visible" : "hidden";
      }
    };
    graph.on("node:mouseenter", () => {
      const container = document.getElementById("graph-container");
      const ports = container.querySelectorAll(".x6-port-body");
      showPorts(ports, true);
    });
    graph.on("node:mouseleave", () => {
      const container = document.getElementById("graph-container");
      const ports = container.querySelectorAll(".x6-port-body");
      showPorts(ports, false);
    });

    Graph.registerNode(
      "custom-rect",
      {
        inherit: "rect",
        width: 66,
        height: 36,
        attrs: {
          body: {
            strokeWidth: 1,
            stroke: "#5F95FF",
            fill: "#EFF4FF",
          },
          text: {
            fontSize: 12,
            fill: "#262626",
          },
        },
        ports: { ...ports },
      },
      true
    );

    const r1 = graph
      .createNode({
        shape: "custom-rect",
        label: "文字",
        attrs: {
          body: {
          },
        },
      })
      .addTools({
        name: "node-editor",
      });
     const r2 = graph
      .createNode({
        shape: "custom-rect",
        label: "文字",
        attrs: {
          body: {
            stroke:"transparent",
            fill:"transparent"
          },
        },
        ports:{}
      })
      .addTools({
        name: "node-editor",
      });
    stencil.load([r1,r2], "group1");
  },
  methods: {
    init() {
      const container = document.getElementById("container");
      const stencilContainer = document.createElement("div");
      stencilContainer.id = "stencil";
      const graphContainer = document.createElement("div");
      graphContainer.id = "graph-container";
      container.appendChild(stencilContainer);
      container.appendChild(graphContainer);
      insertCss(`
                #container {
                display: flex;
                border: 1px solid #dfe3e8;
                }
                #stencil {
                width: 180px;
                height: 100%;
                position: relative;
                border-right: 1px solid #dfe3e8;
                }
                #graph-container {
                width: calc(100% - 180px);
                height: 100%;
                }
                .x6-widget-stencil  {
                background-color: #fff;
                }
                .x6-widget-stencil-title {
                background-color: #fff;
                }
                .x6-widget-stencil-group-title {
                background-color: #fff !important;
                }
                .x6-widget-transform {
                margin: -1px 0 0 -1px;
                padding: 0px;
                border: 1px solid #239edd;
                }
                .x6-widget-transform > div {
                border: 1px solid #239edd;
                }
                .x6-widget-transform > div:hover {
                background-color: #3dafe4;
                }
                .x6-widget-transform-active-handle {
                background-color: #3dafe4;
                }
                .x6-widget-transform-resize {
                border-radius: 0;
                }
                .x6-widget-selection-inner {
                border: 1px solid #239edd;
                }
                .x6-widget-selection-box {
                opacity: 0;
                }
            `);
    },
    toJSON() {
      // console.log(this.graph.toJSON());
      return JSON.stringify(this.graph.toJSON());
    },
    async toPNG(opts) {
     const res =  await new Promise((resolve)=>{
          this.graph.toPNG((e) => {
            resolve(e);
          })
      },opts)
      return res
    },
    exportPNG(){
       this.graph.exportPNG()
    }
  },
};
</script>

<style>
#container {
  width: 100vw;
  height: 100vh;
}
</style>
