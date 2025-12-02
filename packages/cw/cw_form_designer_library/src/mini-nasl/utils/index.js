import { v4 as uuidv4 } from 'uuid';
import { View } from '../concepts/View';
import { eventBus } from '@/components/cw-form-designer/utils';
import { initViewEntity } from './entity';

export { v4 as uuidv4 } from 'uuid';
export * from './entity';

export function createUUID() {
  return uuidv4().replace(/-/g, '');
}

// 初始化页面，添加收集机制
export function initView(view) {
  if (view instanceof View) {
    // 收集与历史（最小实现）
    view._isCollectingCount = 0;
    view._collectingList = [];
    view._actionMsg = '';
    view._sourceType = undefined;
    view._action = '';
    view._extra = undefined;
    view._noTimer = undefined;
    view._timer = null;

    initViewEntity(view); // 初始化页面实体

    // 开启收集
    view.on('collect:start', function (event) {
      const instance = this;
      if (instance._timer) {
        clearTimeout(instance._timer);
      }
      if (!instance._noTimer) {
        instance._noTimer = event?.noTimer;
      }
      if (!instance._noTimer) {
        instance._timer = setTimeout(() => {
          const message = '收集超时，请及时排查原因';
          console.error(message, event);
          eventBus.emit('collect:timeout', {
            message,
            event,
            collectingList: instance._collectingList,
          });
          // 超时时强制重置收集状态，避免后续收集失败
          if (instance._isCollectingCount > 0) {
            instance._isCollectingCount = 0;
            instance._collectingList = [];
            instance._actionMsg = '';
            instance._sourceType = undefined;
            instance._action = '';
            instance._extra = undefined;
            instance._noTimer = undefined;
          }
        }, 2500);
      }

      if (!instance._isCollectingCount) {
        instance._actionMsg = event?.actionMsg;
        instance._sourceType = event?.sourceType;
        instance._action = event?.action;
        instance._extra = event?.extra;
      }
      instance._isCollectingCount++;
    });

    // 结束收集
    view.on('collect:end', function () {
      const instance = this;
      instance._isCollectingCount--;
      if (instance._isCollectingCount === 0) {
        if (instance._timer) {
          clearTimeout(instance._timer);
        }
        const collectingList = instance._collectingList;
        const actionMsg = instance._actionMsg;
        const sourceType = instance._sourceType || 'manual';
        const action = instance._action;
        const extra = instance._extra;
        // 重置状态
        instance._collectingList = [];
        instance._actionMsg = '';
        instance._sourceType = undefined;
        instance._action = '';
        instance._noTimer = undefined;
        // 汇总触发一次 change（最小实现：透传列表与简单信息）
        if (Array.isArray(collectingList) && collectingList.length) {
          instance.emit('change', { list: collectingList, actionMsg, sourceType, action, extra });
        }
      } else if (instance._isCollectingCount < 0) {
        instance._isCollectingCount = 0;
        throw Error('关闭收集有问题，请排查');
      }
    });

    // 有变更：根据是否在收集决定立即触发或归拢
    view.on('storage', function (event) {
      const instance = this;
      if (instance._isCollectingCount === 0) {
        // 非收集态，直接触发一次 change（最小实现）
        instance.emit('change', { list: [event] });
      } else {
        // 收集中，先归拢
        instance._collectingList.push(event);
      }
    });
  }
}

// 需要批量操作时，使用此函数
export async function batchOperate(view, actionMsg = '批量操作', cb) {
  if (!view || !(view instanceof View) || typeof cb !== 'function') return;
  let hasError = false;
  view.emit('collect:start', {
    actionMsg,
  });
  try {
    await cb();
  } catch (error) {
    console.error(`${actionMsg}失败`, error);
    hasError = true;
    // 失败时清空收集列表，避免触发变更事件
    if (view._collectingList) {
      view._collectingList = [];
    }
  } finally {
    // 确保 collect:end 一定会被调用，避免收集计数无法归零
    view.emit('collect:end');
  }
  return hasError;
}

// 生成新的节点名称
const TAG_NAME_PREFIX_REG = /^([lieu]|van)[-_]/;

export function genViewElementUniqueName(name, existingNames = new Set()) {
  let baseName = typeof name === 'string' && name.trim() ? name.trim() : 'viewElement';

  if (TAG_NAME_PREFIX_REG.test(baseName)) {
    baseName = baseName.replace(TAG_NAME_PREFIX_REG, '');
  }
  baseName = baseName.replace(/-/g, '_');

  if (!baseName.endsWith('_1') && !/_\d+$/.test(baseName)) {
    baseName = `${baseName}_1`;
  }

  const normalizedName = baseName;

  // 如果名称不存在，直接返回
  if (!existingNames.has(normalizedName)) {
    existingNames.add(normalizedName);
    return normalizedName;
  }

  // 如果名称已存在，尝试添加数字后缀
  const prefix = normalizedName.replace(/(_\d+)?$/, '');
  let counter = 1;
  let newName = `${prefix}_${counter}`;

  // 如果原名称没有下划线后缀，使用下划线格式
  if (prefix === normalizedName) {
    newName = `${normalizedName}_${counter}`;
  }

  while (existingNames.has(newName)) {
    counter++;
    newName = `${prefix}_${counter}`;
    if (prefix === normalizedName) {
      newName = `${normalizedName}_${counter}`;
    }
  }
  existingNames.add(newName);
  return newName;
}

// 生成唯一的名称,用于实体，变量等命名
export function genUniqueName(name, existingNames = new Set()) {
  if (!existingNames.has(name)) {
    existingNames.add(name);
    return name;
  }

  const prefix = name.replace(/\d+$/, '');
  let counter = 1;
  let newName = `${prefix}${counter}`;
  while (existingNames.has(newName)) {
    counter++;
    newName = `${prefix}${counter}`;
  }
  existingNames.add(newName);
  return newName;
}
