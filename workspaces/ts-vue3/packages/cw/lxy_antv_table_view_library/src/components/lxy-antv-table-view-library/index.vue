<template>
  <div :class="$style.root">
    <div v-if="errorMessage" :class="$style.error">{{ errorMessage }}</div>
    <div v-else-if="isEmptyFields" :class="$style.placeholder">
      请配置 fields.rows / fields.columns / fields.values 后显示表格
    </div>
    <div ref="containerRef" :class="$style.container"></div>
  </div>
</template>
<script setup lang="ts">
import { PivotSheet, type S2DataConfig, type S2Options } from '@antv/s2';
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import '@antv/s2/dist/s2.min.css';

defineOptions({ name: 'antv-table-view' });

type AnyRecord = Record<string, unknown>;

export interface AntvTableViewProps {
  dataSource?: AnyRecord | AnyRecord[];
  fields?: {
    rows?: string[];
    columns?: string[];
    values?: string[];
  };
  meta?: Array<{ field?: string; name?: string }>;
  hierarchyType?: 'gird' | 'tree';
  width?: number;
  height?: number;
  cellWidth?: number;
  cellHeight?: number;
}

const props = withDefaults(defineProps<AntvTableViewProps>(), {
  dataSource: () => [],
  fields: () => ({ rows: [], columns: [], values: [] }),
  meta: () => [],
  hierarchyType: 'gird',
  width: 800,
  height: 400,
  cellWidth: 120,
  cellHeight: 36,
});

const containerRef = ref<HTMLDivElement | null>(null);
const sheetRef = ref<PivotSheet | null>(null);
const errorMessage = ref('');

const normalizedData = computed<AnyRecord[]>(() => {
  if (Array.isArray(props.dataSource)) {
    return props.dataSource;
  }
  if (props.dataSource && typeof props.dataSource === 'object') {
    // 兼容对象结构，统一包成数组
    return [props.dataSource];
  }
  return [];
});

const normalizedFields = computed(() => ({
  rows: Array.isArray(props.fields?.rows) ? props.fields?.rows : [],
  columns: Array.isArray(props.fields?.columns) ? props.fields?.columns : [],
  values: Array.isArray(props.fields?.values) ? props.fields?.values : [],
}));

const normalizedMeta = computed<Record<string, { name?: string }>>(() => {
  const map: Record<string, { name?: string }> = {};
  (props.meta || []).forEach((item) => {
    if (item?.field) {
      map[item.field] = { name: item.name || item.field };
    }
  });
  return map;
});

const isEmptyFields = computed(
  () =>
    normalizedFields.value.rows.length === 0 &&
    normalizedFields.value.columns.length === 0 &&
    normalizedFields.value.values.length === 0,
);

function destroySheet() {
  if (sheetRef.value) {
    sheetRef.value.destroy();
    sheetRef.value = null;
  }
}

async function renderSheet() {
  await nextTick();
  const container = containerRef.value;
  if (!container || isEmptyFields.value) {
    destroySheet();
    return;
  }
  errorMessage.value = '';
  destroySheet();

  const dataCfg: S2DataConfig = {
    data: normalizedData.value,
    fields: {
      rows: normalizedFields.value.rows,
      columns: normalizedFields.value.columns,
      values: normalizedFields.value.values,
    },
    meta: normalizedMeta.value,
  };

  const options: S2Options = {
    width: props.width,
    height: props.height,
    style: {
      colCell: { width: props.cellWidth, height: props.cellHeight },
      rowCell: { width: props.cellWidth, height: props.cellHeight },
      dataCell: { width: props.cellWidth, height: props.cellHeight },
    },
    hierarchyType: props.hierarchyType === 'tree' ? 'tree' : 'grid',
  };

  try {
    const sheet = new PivotSheet(container, dataCfg, options);
    await sheet.render();
    sheetRef.value = sheet;
  } catch (e) {
    errorMessage.value = e instanceof Error ? e.message : '渲染失败';
  }
}

watch(
  () => [
    normalizedData.value,
    normalizedFields.value.rows,
    normalizedFields.value.columns,
    normalizedFields.value.values,
    normalizedMeta.value,
    props.hierarchyType,
    props.width,
    props.height,
    props.cellWidth,
    props.cellHeight,
  ],
  () => {
    renderSheet();
  },
  { deep: true },
);

onMounted(() => {
  renderSheet();
});

onBeforeUnmount(() => {
  destroySheet();
});
</script>
<style module>
.root {
  width: 100%;
  min-height: 240px;
  box-sizing: border-box;
  padding: 8px;
  border: 1px solid var(--border-color-base, #dcdfe6);
  border-radius: 6px;
  background: var(--table-head-background, #fff);
  color: var(--color-base, #333);
}

.container {
  width: 100%;
  min-height: 220px;
}

.placeholder {
  padding: 12px;
  font-size: 12px;
  color: #666;
}

.error {
  padding: 8px 12px;
  margin-bottom: 8px;
  font-size: 12px;
  color: #d93026;
  background: #fef2f2;
  border-radius: 4px;
}
</style>
