<template>
  <table cellspacing="0" cellpadding="0" :class="$style.root">
    <thead>
      <tr>
        <th :class="$style.th" :style="fstThStyle">{{ firstTitle }}</th>
        <th
          v-for="item in ths"
          :key="item.key"
          :class="{ [$style.th]: true, [$style.weekend]: item.weekend }"
          :style="thStyle"
        >
          <div>{{ item.date }}</div>
          <div>{{ item.day }}</div>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, i) in rows" :key="i" :class="$style.tr">
        <td :class="$style.td">{{ row.firstValue }}</td>
        <td v-for="cell in row.cells" :key="cell.__key__" :class="$style.td">
          <div :class="$style.column">
            <slot :item="cell"></slot>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import get from 'lodash-es/get';
import { computed } from 'vue';
import { messages } from '../messages';
import '../utils/initDayjs';
import { DefaultFormatType, getDay } from '../utils/index';

export interface DateTableProps {
  current: Dayjs;
  minDay: Dayjs | null;
  maxDay: Dayjs | null;
  data: Array<Record<string, unknown>>;
  startKey: string;
  endKey: string;
  year: number;
  month: number;
  width: string | number;
  firstTitle?: string;
  firstWidth: string | number;
}

const props = withDefaults(defineProps<DateTableProps>(), {
  firstTitle: '姓名',
});

const weekDayTexts = [
  messages.Monday,
  messages.Tuesday,
  messages.Wednesday,
  messages.Thursday,
  messages.Friday,
  messages.Saturday,
  messages.Sunday,
];

function getValidWidth(width: string | number) {
  return typeof width === 'string' && (width.includes('%') || width.includes('px') || width.includes('rem'))
    ? width
    : `${width}px`;
}

const fstThStyle = computed(() => ({ width: getValidWidth(props.firstWidth) }));
const thStyle = computed(() => ({ width: getValidWidth(props.width) }));

const ths = computed(() => {
  const { year, month, minDay, maxDay } = props;
  if (!minDay || !maxDay) {
    return [];
  }
  const firstDateOfMonth = dayjs().year(year).month(month).date(1);
  const firstDateOfNextMonth = firstDateOfMonth.add(1, 'month');
  const lastDateOfMonth = firstDateOfNextMonth.subtract(1, 'day');
  const list: Array<{
    Date: Dayjs;
    date: number;
    day: string;
    weekend: boolean;
    key: string;
  }> = [];
  for (let i = 0; i < lastDateOfMonth.date(); i++) {
    const currentMonthDate = firstDateOfMonth.add(i, 'day');
    if (currentMonthDate.isBefore(maxDay.add(1, 'day')) && currentMonthDate.isAfter(minDay)) {
      const d = currentMonthDate.day();
      const dayText = weekDayTexts[d === 0 ? 6 : d - 1];
      list.push({
        Date: currentMonthDate,
        date: currentMonthDate.date(),
        day: dayText,
        weekend: d === 0 || d === 6,
        key: currentMonthDate.format(DefaultFormatType),
      });
    }
  }
  return list;
});

const rows = computed(() =>
  props.data.map((item) => {
    const row = item as Record<string, unknown>;
    const children = Array.isArray(row.children) ? row.children : [];
    const parent = (row.parent as Record<string, unknown>) ?? {};
    return {
      ...row,
      cells: getCells(children, parent),
    };
  }),
);

function getCells(children: unknown[], parent: Record<string, unknown>) {
  const { startKey, endKey } = props;
  return ths.value.map((thItem) => {
    const currentDate = dayjs(thItem.key);
    const commonProps = {
      __key__: thItem.key,
      year: thItem.Date.year(),
      month: thItem.Date.month() + 1,
      timestamp: thItem.Date.valueOf(),
      dateString: thItem.key,
    };
    if (!children || !children.length) {
      return { ...parent, ...commonProps };
    }
    const validData = children.filter((item) => {
      const row = item as Record<string, unknown>;
      const startTime = get(row, startKey, null);
      const endTime = get(row, endKey, null);
      const startDate = getDay(startTime as string | Date | undefined, null);
      const endDate = getDay(endTime as string | Date | undefined, null);
      if (!startDate) {
        return false;
      }
      if (endDate) {
        return currentDate.isSameOrBefore(endDate) && currentDate.isSameOrAfter(startDate);
      }
      const isSame = currentDate.format(DefaultFormatType) === startDate.format(DefaultFormatType);
      return isSame;
    });
    if (!validData.length) {
      return { ...parent, ...commonProps };
    }
    const first = validData[0] as Record<string, unknown>;
    return { ...first, list: validData, ...commonProps };
  });
}
</script>

<style module>
.root {
  table-layout: fixed;
  width: 100%;
  min-width: 900px;
}

.th {
  padding: 12px 0;
  border-top: 1px solid var(--border-color-base, #e5e5e5);
  border-right: 1px solid var(--border-color-base, #e5e5e5);
  border-bottom: 1px solid var(--border-color-base, #e5e5e5);
  font-weight: var(--font-weight-normal, 400);
  background-color: var(--table-head-background, #fafafa);
}

.th:first-child {
  border-left: 1px solid var(--border-color-base, #e5e5e5);
}

.weekend {
  color: var(--brand-error, #f56c6c);
}

.tr .td:first-child {
  border-left: 1px solid var(--border-color-base, #e5e5e5);
  font-weight: var(--font-weight-bold, 600);
}

.td {
  font-weight: var(--font-weight-normal, 400);
  border-bottom: 1px solid var(--border-color-base, #e5e5e5);
  border-right: 1px solid var(--border-color-base, #e5e5e5);
  transition: background 0.3s;
  cursor: pointer;
  text-align: center;
}

.column {
  position: static;
  width: auto;
  overflow-y: auto;
  color: var(--color-base, #333);
  text-align: left;
}
</style>
