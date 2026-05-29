<template>
  <div
    ref="rootRef"
    data-cw-flow-chart
    :class="$style.root"
  >
    <div
      ref="stencilHostRef"
      :class="[$style.stencil, 'cw-flow-stencil-host']"
    />
    <div
      ref="graphHostRef"
      :class="[$style.graph, 'cw-flow-graph-host']"
    />
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, shallowRef, watch } from 'vue';
import { Graph, Shape } from '@antv/x6';
import { Stencil } from '@antv/x6-plugin-stencil';
import { Transform } from '@antv/x6-plugin-transform';
import { Selection } from '@antv/x6-plugin-selection';
import { Snapline } from '@antv/x6-plugin-snapline';
import { Keyboard } from '@antv/x6-plugin-keyboard';
import { Clipboard } from '@antv/x6-plugin-clipboard';
import { History } from '@antv/x6-plugin-history';
import { Export } from '@antv/x6-plugin-export';
import insertCss from 'insert-css';

defineOptions({ name: 'cw-flow-simble-view' });

const props = withDefaults(
  defineProps<{
    value?: string;
  }>(),
  {
    value: '',
  },
);

const rootRef = ref<HTMLElement | null>(null);
const stencilHostRef = ref<HTMLElement | null>(null);
const graphHostRef = ref<HTMLElement | null>(null);
const graphRef = shallowRef<Graph | null>(null);

let cssInjected = false;

function parseGraphData(raw: unknown) {
  if (raw === undefined || raw === null || raw === '') {
    return { cells: [] };
  }
  if (typeof raw === 'object') {
    return raw as Record<string, unknown>;
  }
  if (typeof raw === 'string') {
    const s = raw.trim();
    if (!s) {
      return { cells: [] };
    }
    try {
      const parsed = JSON.parse(s) as unknown;
      if (parsed && typeof parsed === 'object') {
        return parsed as Record<string, unknown>;
      }
    } catch {
      /* ignore */
    }
  }
  return { cells: [] };
}

function injectLayoutCss() {
  if (cssInjected) {
    return;
  }
  cssInjected = true;
  insertCss(`
    [data-cw-flow-chart] {
      display: flex;
      border: 1px solid #dfe3e8;
      width: 100%;
      min-height: 480px;
      height: 70vh;
      box-sizing: border-box;
    }
    [data-cw-flow-chart] .cw-flow-stencil-host {
      width: 180px;
      height: 100%;
      position: relative;
      border-right: 1px solid #dfe3e8;
      flex-shrink: 0;
    }
    [data-cw-flow-chart] .cw-flow-graph-host {
      flex: 1;
      height: 100%;
      min-width: 0;
    }
    [data-cw-flow-chart] .x6-widget-stencil {
      background-color: #fff;
    }
    [data-cw-flow-chart] .x6-widget-stencil-title {
      background-color: #fff;
    }
    [data-cw-flow-chart] .x6-widget-stencil-group-title {
      background-color: #fff !important;
    }
    [data-cw-flow-chart] .x6-widget-transform {
      margin: -1px 0 0 -1px;
      padding: 0px;
      border: 1px solid #239edd;
    }
    [data-cw-flow-chart] .x6-widget-transform > div {
      border: 1px solid #239edd;
    }
    [data-cw-flow-chart] .x6-widget-transform > div:hover {
      background-color: #3dafe4;
    }
    [data-cw-flow-chart] .x6-widget-transform-active-handle {
      background-color: #3dafe4;
    }
    [data-cw-flow-chart] .x6-widget-transform-resize {
      border-radius: 0;
    }
    [data-cw-flow-chart] .x6-widget-selection-inner {
      border: 1px solid #239edd;
    }
    [data-cw-flow-chart] .x6-widget-selection-box {
      opacity: 0;
    }
  `);
}

function applyValueToGraph() {
  const graph = graphRef.value;
  if (!graph) {
    return;
  }
  try {
    graph.fromJSON(parseGraphData(props.value) as any);
  } catch {
    graph.fromJSON({ cells: [] } as any);
  }
}

function initGraph() {
  const graphEl = graphHostRef.value;
  const stencilEl = stencilHostRef.value;
  if (!graphEl || !stencilEl) {
    return;
  }

  injectLayoutCss();

  const graph = new Graph({
    container: graphEl,
    grid: true,
    mousewheel: {
      enabled: true,
      zoomAtMousePosition: true,
      modifiers: 'ctrl',
      minScale: 0.5,
      maxScale: 3,
    },
    connecting: {
      connector: {
        name: 'rounded',
        args: {
          radius: 8,
        },
      },
      anchor: 'center',
      connectionPoint: 'anchor',
      allowBlank: false,
      snap: {
        radius: 20,
      },
      createEdge() {
        return new Shape.Edge({
          attrs: {
            line: {
              stroke: '#A2B1C3',
              strokeWidth: 2,
              targetMarker: {
                name: 'block',
                width: 12,
                height: 8,
              },
            },
          },
          zIndex: 0,
        });
      },
      validateConnection({ targetMagnet }) {
        return Boolean(targetMagnet);
      },
    },
    highlighting: {
      magnetAdsorbed: {
        name: 'stroke',
        args: {
          attrs: {
            fill: '#5F95FF',
            stroke: '#5F95FF',
          },
        },
      },
    },
  });

  graphRef.value = graph;
  applyValueToGraph();

  graph
    .use(
      new Transform({
        resizing: true,
        rotating: true,
      }),
    )
    .use(
      new Selection({
        rubberband: true,
        showNodeSelectionBox: true,
      }),
    )
    .use(new Export())
    .use(new Snapline())
    .use(new Keyboard())
    .use(new Clipboard())
    .use(new History());

  const stencil = new Stencil({
    title: '流程图',
    target: graph,
    stencilGraphWidth: 200,
    stencilGraphHeight: 180,
    groups: [
      {
        title: '基础流程图',
        name: 'group1',
      },
    ],
    layoutOptions: {
      columns: 2,
      columnWidth: 80,
      rowHeight: 55,
    },
  });
  stencilEl.appendChild(stencil.container);

  graph.bindKey(['meta+c', 'ctrl+c'], () => {
    const cells = graph.getSelectedCells();
    if (cells.length) {
      graph.copy(cells);
    }
    return false;
  });
  graph.bindKey(['meta+x', 'ctrl+x'], () => {
    const cells = graph.getSelectedCells();
    if (cells.length) {
      graph.cut(cells);
    }
    return false;
  });
  graph.bindKey(['meta+v', 'ctrl+v'], () => {
    if (!graph.isClipboardEmpty()) {
      const cells = graph.paste({ offset: 32 });
      graph.cleanSelection();
      graph.select(cells);
    }
    return false;
  });

  graph.bindKey(['meta+z', 'ctrl+z'], () => {
    if (graph.canUndo()) {
      graph.undo();
    }
    return false;
  });
  graph.bindKey(['meta+shift+z', 'ctrl+shift+z'], () => {
    if (graph.canRedo()) {
      graph.redo();
    }
    return false;
  });

  graph.bindKey(['meta+a', 'ctrl+a'], () => {
    const nodes = graph.getNodes();
    if (nodes.length) {
      graph.select(nodes);
    }
    return false;
  });

  graph.bindKey('backspace', () => {
    const cells = graph.getSelectedCells();
    if (cells.length) {
      graph.removeCells(cells);
    }
    return false;
  });

  graph.bindKey(['ctrl+1', 'meta+1'], () => {
    const zoom = graph.zoom();
    if (zoom < 1.5) {
      graph.zoom(0.1);
    }
    return false;
  });
  graph.bindKey(['ctrl+2', 'meta+2'], () => {
    const zoom = graph.zoom();
    if (zoom > 0.5) {
      graph.zoom(-0.1);
    }
    return false;
  });

  const ports = {
    groups: {
      top: {
        position: 'top',
        attrs: {
          circle: {
            r: 4,
            magnet: true,
            stroke: '#5F95FF',
            strokeWidth: 1,
            fill: '#fff',
            style: {
              visibility: 'hidden',
            },
          },
        },
      },
      right: {
        position: 'right',
        attrs: {
          circle: {
            r: 4,
            magnet: true,
            stroke: '#5F95FF',
            strokeWidth: 1,
            fill: '#fff',
            style: {
              visibility: 'hidden',
            },
          },
        },
      },
      bottom: {
        position: 'bottom',
        attrs: {
          circle: {
            r: 4,
            magnet: true,
            stroke: '#5F95FF',
            strokeWidth: 1,
            fill: '#fff',
            style: {
              visibility: 'hidden',
            },
          },
        },
      },
      left: {
        position: 'left',
        attrs: {
          circle: {
            r: 4,
            magnet: true,
            stroke: '#5F95FF',
            strokeWidth: 1,
            fill: '#fff',
            style: {
              visibility: 'hidden',
            },
          },
        },
      },
    },
    items: [{ group: 'top' }, { group: 'right' }, { group: 'bottom' }, { group: 'left' }],
  };

  const showPorts = (portEls: NodeListOf<Element>, show: boolean) => {
    portEls.forEach((el) => {
      (el as HTMLElement).style.visibility = show ? 'visible' : 'hidden';
    });
  };

  graph.on('node:mouseenter', () => {
    const container = graphEl;
    const portEls = container.querySelectorAll('.x6-port-body');
    showPorts(portEls, true);
  });
  graph.on('node:mouseleave', () => {
    const container = graphEl;
    const portEls = container.querySelectorAll('.x6-port-body');
    showPorts(portEls, false);
  });

  Graph.registerNode(
    'custom-rect',
    {
      inherit: 'rect',
      width: 66,
      height: 36,
      attrs: {
        body: {
          strokeWidth: 1,
          stroke: '#5F95FF',
          fill: '#EFF4FF',
        },
        text: {
          fontSize: 12,
          fill: '#262626',
        },
      },
      ports: { ...ports },
    },
    true,
  );

  const r1 = graph
    .createNode({
      shape: 'custom-rect',
      label: '文字',
      attrs: {
        body: {},
      },
    })
    .addTools({
      name: 'node-editor',
    });
  const r2 = graph
    .createNode({
      shape: 'custom-rect',
      label: '文字',
      attrs: {
        body: {
          stroke: 'transparent',
          fill: 'transparent',
        },
      },
      ports: {},
    })
    .addTools({
      name: 'node-editor',
    });
  stencil.load([r1, r2], 'group1');
}

onMounted(() => {
  initGraph();
});

watch(
  () => props.value,
  () => {
    applyValueToGraph();
  },
);

onBeforeUnmount(() => {
  const g = graphRef.value;
  if (g) {
    g.dispose();
    graphRef.value = null;
  }
});

function toJSON(): string {
  const graph = graphRef.value;
  if (!graph) {
    return '';
  }
  return JSON.stringify(graph.toJSON());
}

function toPNG(opts?: Record<string, unknown>): Promise<string | undefined> {
  return new Promise((resolve) => {
    const graph = graphRef.value;
    if (!graph) {
      resolve(undefined);
      return;
    }
    graph.toPNG(
      (dataUri: string) => {
        resolve(dataUri);
      },
      opts as any,
    );
  });
}

function exportPNG(opts?: Record<string, unknown>, filename?: string) {
  const graph = graphRef.value;
  if (!graph) {
    return;
  }
  graph.exportPNG((filename || 'chart') as string, opts as any);
}

defineExpose({
  toJSON,
  toPNG,
  exportPNG,
});
</script>

<style module>
.root {
  display: block;
}
.stencil,
.graph {
  display: block;
}
</style>
