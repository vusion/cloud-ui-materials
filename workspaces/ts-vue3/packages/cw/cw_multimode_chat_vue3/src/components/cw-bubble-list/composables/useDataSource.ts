import { ref, watch, nextTick, type Ref } from 'vue';
import lodashGet from 'lodash/get';

export type DataSourceProp = unknown[] | Record<string, unknown> | ((arg: Record<string, unknown>) => unknown) | undefined;

export function useDataSource(props: { dataSource?: DataSourceProp }) {
  const list = ref<unknown[]>([]);
  const loading = ref(false);

  function normalizeData(data: unknown): unknown[] {
    if (Array.isArray(data)) {
      return data;
    }
    if (typeof data === 'object' && data !== null && Array.isArray((data as { list?: unknown[] }).list)) {
      return (data as { list: unknown[] }).list;
    }
    return [];
  }

  async function loadDataSource() {
    const ds = props.dataSource;
    if (typeof ds === 'function') {
      loading.value = true;
      const data = await ds({});
      list.value = normalizeData(data);
      loading.value = false;
    } else {
      list.value = normalizeData(ds);
    }
  }

  async function reload() {
    return loadDataSource();
  }

  watch(
    () => props.dataSource,
    () => {
      nextTick(() => {
        loadDataSource();
      });
    },
    { immediate: true, deep: true }
  );

  return { list, loading, loadDataSource, reload, lodashGet };
}

export type UseDataSourceReturn = {
  list: Ref<unknown[]>;
  loading: Ref<boolean>;
  loadDataSource: () => Promise<void>;
  reload: () => Promise<void>;
  lodashGet: typeof lodashGet;
};
