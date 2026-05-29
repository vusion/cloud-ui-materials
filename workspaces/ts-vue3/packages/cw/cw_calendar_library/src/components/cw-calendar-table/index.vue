<template>
  <div :class="$style.root" v-bind="attrs">
    <div :class="$style.toolbar">
      <select :class="$style.select" :value="year" @change="onYearChange">
        <option v-for="opt in years" :key="opt.value" :value="opt.value">{{ opt.text }}</option>
      </select>
      <select :class="[$style.select, $style.month]" :value="month" @change="onMonthChange">
        <option v-for="opt in months" :key="opt.value" :value="opt.value">{{ opt.text }}</option>
      </select>
    </div>
    <div :class="$style.body">
      <DateTable
        v-if="minDay && maxDay"
        :year="year"
        :month="month"
        :current="anchorDate"
        :min-day="minDay"
        :max-day="maxDay"
        :data="tableData"
        :start-key="startKey"
        :end-key="endKey"
        :width="width"
        :first-title="firstTitle"
        :first-width="firstWidth"
      >
        <template #default="{ item }">
          <slot :item="item" />
        </template>
      </DateTable>
    </div>
    <div v-if="total > 0" :class="$style.pagination">
      <button type="button" :disabled="page.number <= 1" :class="$style.pageBtn" @click="goPage(page.number - 1)">
        上一页
      </button>
      <span :class="$style.pageInfo">{{ page.number }} / {{ total }}</span>
      <button
        type="button"
        :disabled="page.number >= total"
        :class="$style.pageBtn"
        @click="goPage(page.number + 1)"
      >
        下一页
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import get from 'lodash-es/get';
import { computed, ref, useAttrs, watch } from 'vue';
import { messages } from './messages';
import './utils/initDayjs';
import { getDay } from './utils/index';
import DateTable from './widgets/date-table.vue';

defineOptions({ name: 'cw-calendar-table', inheritAttrs: false });

const attrs = useAttrs();

type DataSourceValue =
  | unknown[]
  | Promise<unknown>
  | (() => Promise<unknown> | unknown)
  | { content: unknown[]; totalPages: number }
  | Record<string, unknown>;

export interface CwCalendarTableProps {
  minDate?: string | Date | number | null;
  maxDate?: string | Date | number | null;
  data?: unknown[];
  dataSourceParent?: DataSourceValue;
  dataSource?: DataSourceValue;
  parentKey?: string;
  childKey?: string;
  startKey?: string;
  endKey?: string;
  width?: string | number;
  firstField?: string;
  firstTitle?: string;
  firstWidth?: string | number;
  pageSize?: string | number;
  dataSchema?: unknown;
}

const props = withDefaults(defineProps<CwCalendarTableProps>(), {
  startKey: 'startTime',
  endKey: 'endTime',
  width: 48,
  firstField: 'parent.name',
  firstTitle: '姓名',
  firstWidth: 64,
  parentKey: 'parent.name',
  childKey: 'child.name',
  pageSize: 20,
});

const emit = defineEmits<{
  change: [event: { value: string }];
}>();

const isDesigner =
  typeof process !== 'undefined' &&
  (process as NodeJS.Process & { env: { VUE_APP_DESIGNER?: boolean } }).env?.VUE_APP_DESIGNER === true;

const anchorDate = dayjs();
const year = ref(anchorDate.year());
const month = ref(anchorDate.month());
const minDay = ref<Dayjs | null>(null);
const minYear = ref(0);
const minMonth = ref(0);
const maxDay = ref<Dayjs | null>(null);
const maxYear = ref(0);
const maxMonth = ref(0);
const minMonths = ref<{ text: string; value: number }[]>([]);
const maxMonths = ref<{ text: string; value: number }[]>([]);
const years = ref<{ text: string; value: number }[]>([]);
const tempData = ref<
  Array<{
    firstValue: unknown;
    parent: Record<string, unknown>;
    children: unknown[];
  }>
>([]);
const total = ref(0);

const page = ref({ number: 1, size: Number(props.pageSize) || 20 });

watch(
  () => props.pageSize,
  (s) => {
    const n = Number(s) || 20;
    page.value.size = n;
  },
);

const monthTexts = [
  messages.January,
  messages.February,
  messages.March,
  messages.April,
  messages.May,
  messages.June,
  messages.July,
  messages.August,
  messages.September,
  messages.October,
  messages.November,
  messages.December,
];

const fullMonths = monthTexts.map((t, m) => ({
  text: `${t} ${messages.month}`,
  value: m,
}));

const months = computed(() => {
  if (!minDay.value || !maxDay.value) {
    return fullMonths;
  }
  if (minYear.value === maxYear.value || year.value === minYear.value) {
    return minMonths.value;
  }
  if (year.value === maxYear.value) {
    return maxMonths.value;
  }
  return fullMonths;
});

const tableData = computed(() => {
  if (props.data !== undefined && props.data !== null) {
    return props.data as Array<Record<string, unknown>>;
  }
  return tempData.value as Array<Record<string, unknown>>;
});

watch(
  () => props.minDate,
  (value) => {
    const d = getDay(
      value,
      dayjs().subtract(5, 'year').month(0).date(1).hour(0).minute(0).second(0).millisecond(0),
    )!;
    minDay.value = d;
    minYear.value = d.year();
    minMonth.value = d.month();
    getConfigs();
  },
  { immediate: true },
);

watch(
  () => props.maxDate,
  (value) => {
    const d = getDay(
      value,
      dayjs().add(4, 'year').month(11).date(31).hour(23).minute(59).second(59).millisecond(999),
    )!;
    maxDay.value = d;
    maxYear.value = d.year();
    maxMonth.value = d.month();
    getConfigs();
  },
  { immediate: true },
);

watch(
  () => props.dataSourceParent,
  async () => {
    await load();
  },
  { immediate: true },
);

watch(
  () => props.dataSource,
  async () => {
    await load();
  },
  { immediate: true },
);

function emitMonthChange() {
  const m = month.value + 1 > 9 ? `${month.value + 1}` : `0${month.value + 1}`;
  emit('change', { value: `${year.value}-${m}` });
}

function onYearChange(e: Event) {
  const el = e.target as HTMLSelectElement;
  year.value = Number(el.value);
  emitMonthChange();
}

function onMonthChange(e: Event) {
  const el = e.target as HTMLSelectElement;
  month.value = Number(el.value);
  emitMonthChange();
}

function getConfigs() {
  const dMin = minDay.value;
  const dMax = maxDay.value;
  if (!dMin || !dMax) {
    return;
  }

  if (!dMin.isSameOrBefore(dMax)) {
    throw new Error('minDate must before maxDate!');
  }

  if (dMax.isBefore(anchorDate) || dMin.isAfter(anchorDate)) {
    year.value = minYear.value;
    month.value = minMonth.value;
  }

  getYears();
  getMonths();
}

function getYears() {
  const list: { text: string; value: number }[] = [];
  for (let y = minYear.value; y <= maxYear.value; y++) {
    list.push({
      text: `${y} ${messages.year}`,
      value: y,
    });
  }
  years.value = list;
}

function getMonths() {
  const minList: { text: string; value: number }[] = [];
  const maxList: { text: string; value: number }[] = [];
  if (minYear.value === maxYear.value) {
    for (let m = minMonth.value; m <= maxMonth.value; m++) {
      minList.push({
        text: `${monthTexts[m]} ${messages.month}`,
        value: m,
      });
    }
  } else {
    for (let m = minMonth.value; m <= 11; m++) {
      minList.push({
        text: `${monthTexts[m]} ${messages.month}`,
        value: m,
      });
    }
    for (let m = 0; m <= maxMonth.value; m++) {
      maxList.push({
        text: `${monthTexts[m]} ${messages.month}`,
        value: m,
      });
    }
  }
  minMonths.value = minList;
  maxMonths.value = maxList;
}

function isPaginatedResult(data: unknown): data is { content: unknown[]; totalPages: number } {
  return (
    Object.prototype.toString.call(data) === '[object Object]' &&
    data !== null &&
    Array.isArray((data as { content?: unknown }).content)
  );
}

function getData(dataSource: unknown, isParent: boolean): unknown[] {
  if (Array.isArray(dataSource)) {
    return dataSource;
  }
  if (isPaginatedResult(dataSource)) {
    if (isParent) {
      total.value = Number((dataSource as { totalPages?: number }).totalPages) || 0;
    }
    return (dataSource as { content: unknown[] }).content;
  }
  return [];
}

async function handleDataSource(dataSource: DataSourceValue | undefined, isParent: boolean): Promise<unknown[]> {
  if (dataSource === undefined || dataSource === null) {
    return [];
  }
  if (typeof dataSource === 'function') {
    const result = await dataSource(page.value);
    return getData(result, isParent);
  }
  if (dataSource instanceof Promise) {
    const result = await dataSource;
    return getData(result, isParent);
  }
  return getData(dataSource, isParent);
}

async function load() {
  total.value = 0;
  const { dataSourceParent, dataSource, firstField, parentKey, childKey } = props;
  if (isDesigner) {
    tempData.value = [{ firstValue: firstField ?? '', children: [{}], parent: {} }];
    return;
  }
  if (!dataSourceParent || !dataSource) {
    return;
  }
  const parentData = await handleDataSource(dataSourceParent, true);
  const childData = await handleDataSource(dataSource, false);

  if (!Array.isArray(parentData) || !Array.isArray(childData)) {
    console.error(`[cw-calendar-table] Please confirm that the final result is an array in 'data-source' prop.`);
    tempData.value = [];
    return;
  }

  const field = firstField ?? '';
  tempData.value = parentData.map((parentItem) => {
    const p = parentItem as Record<string, unknown>;
    const children = childData.filter(
      (childItem) => get(childItem as object, childKey ?? '') === get(p, parentKey ?? ''),
    );
    let firstValue: unknown;
    if (field.includes('${')) {
      firstValue = field.replace(/\$\{(.*?)\}/g, (_match, key: string) =>
        String(get(p, key.trim(), '')),
      );
    } else {
      firstValue = get(p, field, '');
    }
    return {
      firstValue,
      parent: p,
      children: children.map((child) => ({ ...(child as object), ...p })),
    };
  });
}

async function reload() {
  await load();
}

function goPage(n: number) {
  page.value.number = n;
  load();
}

function getSelectMonth(): number {
  return month.value;
}

function getSelectYear(): number {
  return year.value;
}

defineExpose({
  load,
  reload,
  getSelectYear,
  getSelectMonth,
});
</script>

<style module>
.root {
  display: flex;
  flex-direction: column;
  gap: 8px;
  background: var(--field-background, #fff);
}

.toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}

.select {
  min-height: 28px;
  padding: 2px 8px;
  border: 1px solid var(--border-color-base, #dcdfe6);
  border-radius: 4px;
  font-size: 12px;
  background: #fff;
}

.month {
  width: 65px;
}

.body {
  padding: 12px 0;
  overflow: auto;
}

.pagination {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.pageBtn {
  padding: 4px 12px;
  font-size: 12px;
  border: 1px solid var(--border-color-base, #dcdfe6);
  border-radius: 4px;
  background: #fff;
  cursor: pointer;
}

.pageBtn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pageInfo {
  font-size: 12px;
}
</style>
