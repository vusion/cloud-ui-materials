import _, { isFunction, get as lodashGet, isPlainObject } from 'lodash';
import { listToTree } from '@lcap/vue2-utils/utils';
import { $deletePropList, $ref, createUseUpdateSync } from '@lcap/vue2-utils';
import { computed, getCurrentInstance } from '@vue/composition-api';
import { NaslComponentPluginOptions, Slot } from '@lcap/vue2-utils/plugins/types';

export { useInitialLoaded } from '@lcap/vue2-utils';

export { useFormFieldClass } from './use-form-field-class';
export { usePopupTheme } from './use-popup-theme';

export const useUpdateSync = createUseUpdateSync();

type LoadDataFunc = (params: { [key: string]: any }) => Promise<{ list: any[]; total: number }>;

const LAZY_SYNC_STATE_KEYS = ['id', 'node'] as const;

const syncLazyLoadState = (
  instance: ReturnType<typeof getCurrentInstance>,
  params: Record<string, any> = {},
) => {
  LAZY_SYNC_STATE_KEYS.forEach((key) => {
    instance?.emit('sync:state', key, params[key] ?? null);
  });
};

/**
 * 在通用 dataSource 基础上，懒加载时同步 id / node 到组件属性，
 * 供 LCAP 数据源逻辑入参绑定（与表格 page/size 的 sync:state 一致）。
 */
export const useDataSource: NaslComponentPluginOptions = {
  props: ['dataSource', 'dataSchema', 'data', 'total', 'loading'],
  setup: (props) => {
    const loading = props.useRef('loading');
    const instance = getCurrentInstance();

    const data = props.useRef<any[]>('dataSource', (v) => {
      if (Array.isArray(v)) {
        return v;
      }

      if (typeof v === 'object' && Array.isArray(v.list)) {
        return v.list;
      }

      return [];
    });

    const total = props.useRef<number>('dataSource', (v) => {
      if (Array.isArray(v)) {
        return v.length;
      }

      if (typeof v === 'object' && Array.isArray(v.list) && v.total) {
        return v.total;
      }

      return 0;
    });

    const loadDataFn = props.useRef('dataSource', (v) => {
      if (typeof v !== 'function') {
        return null;
      }

      const loadData = async (params: Record<string, any>) => {
        loading.value = true;

        if (params && isPlainObject(params)) {
          ['size', 'page', 'sort', 'order', 'filterText'].forEach((key) => {
            instance?.emit('sync:state', key, params[key]);
          });
          syncLazyLoadState(instance, params);
        } else {
          syncLazyLoadState(instance, {});
        }

        const d = await Promise.resolve(v(params || {}));
        if (Array.isArray(d)) {
          data.value = d;
          total.value = d.length;
        } else if (typeof d === 'object' && Array.isArray(d.list)) {
          data.value = d.list;
          total.value = d.total || d.list.length;
        }

        loading.value = false;
        return data;
      };

      return loadData;
    });

    return {
      data,
      total,
      loading,
      onLoadData: loadDataFn,
      [$ref]: {
        reload(params = {}) {
          const loadData = props.getEnd<LoadDataFunc | null>('onLoadData');
          if (!loadData) {
            return;
          }

          // eslint-disable-next-line consistent-return
          return loadData(params);
        },
      },
      /* 删除多余的key 防止透传 */
      [$deletePropList]: ['onLoadData'],
    };
  },
  order: 1,
};

const resolveListResult = (result: any): any[] => {
  if (Array.isArray(result)) {
    return result;
  }
  if (result && typeof result === 'object' && Array.isArray(result.list)) {
    return result.list;
  }
  return [];
};

const normalizeLazyNodes = (
  nodes: any[],
  childrenField: string,
  hasChildrenField?: string,
): any[] => {
  if (!Array.isArray(nodes)) {
    return nodes;
  }

  return nodes.map((node) => {
    if (!node || typeof node !== 'object') {
      return node;
    }

    const nextNode = { ...node };
    const children = lodashGet(nextNode, childrenField);

    if (Array.isArray(children)) {
      nextNode[childrenField] = normalizeLazyNodes(children, childrenField, hasChildrenField);
    } else if (children === true) {
      nextNode[childrenField] = true;
    } else if (hasChildrenField && lodashGet(nextNode, hasChildrenField) === true) {
      nextNode[childrenField] = true;
    }

    return nextNode;
  });
};

export const useTreeSelect: NaslComponentPluginOptions = {
  props: ['valueField', 'labelField', 'parentField', 'data', 'optionIsSlot', 'childrenField', 'lazy'],
  setup(props) {
    const valueField = props.useComputed('valueField', (v) => v || 'value');
    const textField = props.useComputed('textField', (v) => v || 'label');

    const childrenField = props.useComputed(
      'childrenField',
      (v) => v || 'children',
    );
    const data = props.useComputed(
      ['data', 'lazy', 'valueField', 'parentField', 'childrenField'],
      (dataSource, isLazy, nextValueField, nextParentField, nextChildrenField) => {
        if (_.isEmpty(dataSource)) return undefined;
        // 懒加载按节点拉取子级，不使用 parentField 整表转树
        if (isLazy || _.isNil(nextParentField)) return dataSource;
        return listToTree(dataSource, {
          valueField: nextValueField || 'value',
          parentField: nextParentField,
          childrenField: nextChildrenField || 'children',
        });
      },
    );
    const keys = props.useComputed('keys', (v) => (_.isObject(v) ? v : {}));

    const renderLabel = (h, node) => {
      const [optionIsSlot, slotOption] = props.get<[boolean, Slot]>(['optionIsSlot', 'slotOption']);

      const defaultContent = [
        h('span', {}, [lodashGet(node.data, textField.value)]),
      ];
      if (!optionIsSlot || !isFunction(slotOption)) {
        return defaultContent;
      }

      return slotOption({
        item: node.data,
      }) || defaultContent;
    };

    const treeProps = computed(() => {
      return {
        label: renderLabel,
      };
    });

    return {
      data,
      keys: computed(() => ({
        value: valueField.value,
        label: textField.value,
        children: childrenField.value,
        ...keys.value,
      })),
      treeProps,
    };
  },
};

export const useTreeLazyLoad: NaslComponentPluginOptions = {
  order: 5,
  props: ['lazy', 'hasChildrenField', 'dataSource', 'childrenField', 'data', 'treeProps', 'valueField'],
  setup(props) {
    const instance = getCurrentInstance();

    const normalize = (nodes: any[]) => {
      const childrenField = props.get<string>('childrenField') || 'children';
      const hasChildrenField = props.get<string>('hasChildrenField');
      return normalizeLazyNodes(nodes, childrenField, hasChildrenField);
    };

    const data = props.useComputed(
      ['data', 'lazy', 'hasChildrenField', 'childrenField'],
      (dataSource, isLazy) => {
        if (!isLazy || _.isEmpty(dataSource)) {
          return dataSource;
        }
        return normalize(dataSource);
      },
    );

    const treeProps = props.useComputed(
      ['treeProps', 'lazy', 'dataSource', 'hasChildrenField', 'childrenField', 'valueField'],
      (prevTreeProps, isLazy) => {
        if (!isLazy) {
          return prevTreeProps;
        }

        const dataSource = props.get('dataSource');
        const nextTreeProps = {
          ...(prevTreeProps || {}),
          lazy: true,
        };

        if (isFunction(dataSource)) {
          nextTreeProps.load = async (nodeModel: any) => {
            const nodeData = nodeModel?.data ?? nodeModel;
            const valueField = props.get<string>('valueField') || 'value';
            const id = nodeData == null ? undefined : lodashGet(nodeData, valueField);
            const params = id == null ? {} : { node: nodeData, id };
            // 先同步到组件属性，供 LCAP 数据源逻辑入参绑定（生成代码读 state_id / state_node）
            syncLazyLoadState(instance, params);
            const result = await Promise.resolve(dataSource(params));
            return normalize(resolveListResult(result));
          };
        }

        return nextTreeProps;
      },
    );

    return {
      data,
      treeProps,
      [$deletePropList]: ['lazy', 'hasChildrenField'],
    };
  },
};

const isBranchNode = (node: Record<string, any>, childrenField: string) => {
  const children = lodashGet(node, childrenField);
  if (children === true) {
    return true;
  }
  return Array.isArray(children) && children.length > 0;
};

const markOnlySelectLeafData = (nodes: any[], childrenField: string): any[] => {
  if (!Array.isArray(nodes)) {
    return nodes;
  }

  return nodes.map((node) => {
    if (!node || typeof node !== 'object') {
      return node;
    }

    const children = lodashGet(node, childrenField);
    if (!isBranchNode(node, childrenField)) {
      return node;
    }

    const nextNode = {
      ...node,
      checkable: false,
      activable: false,
    };

    if (Array.isArray(children)) {
      nextNode[childrenField] = markOnlySelectLeafData(children, childrenField);
    }

    return nextNode;
  });
};

export const useOnlySelectLeaf: NaslComponentPluginOptions = {
  order: 6,
  props: ['onlySelectLeaf', 'expandOnClickNode', 'childrenField', 'data', 'treeProps'],
  setup(props) {
    const data = props.useComputed(
      ['data', 'onlySelectLeaf', 'childrenField'],
      (dataSource, onlySelectLeaf, childrenField) => {
        if (!onlySelectLeaf || _.isEmpty(dataSource)) {
          return dataSource;
        }
        return markOnlySelectLeafData(dataSource, childrenField || 'children');
      },
    );

    const treeProps = props.useComputed(
      ['treeProps', 'onlySelectLeaf', 'expandOnClickNode', 'childrenField'],
      (prevTreeProps, onlySelectLeaf, expandOnClickNode, childrenField) => {
        const resolvedChildrenField = childrenField || 'children';
        const nextTreeProps = {
          ...(prevTreeProps || {}),
          expandOnClickNode: !!expandOnClickNode,
        };

        if (!onlySelectLeaf) {
          return nextTreeProps;
        }

        const prevLoad = nextTreeProps.load;
        if (isFunction(prevLoad)) {
          nextTreeProps.load = async (nodeModel: any) => {
            const list = await prevLoad(nodeModel);
            return markOnlySelectLeafData(
              Array.isArray(list) ? list : [],
              resolvedChildrenField,
            );
          };
        }

        return nextTreeProps;
      },
    );

    return {
      data,
      treeProps,
      [$deletePropList]: ['onlySelectLeaf', 'expandOnClickNode'],
    };
  },
};
