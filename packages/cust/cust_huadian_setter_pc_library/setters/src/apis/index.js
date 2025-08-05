import { get } from '@/utils/methods';
import { apiGetIconList, apiGetIconDetail, loadFilesPath } from '@/config';

/**
 * 通用API请求封装函数
 * @param {Function} api - API请求函数
 * @param {Object} params - 请求参数对象
 * @param {Function} success - 请求成功回调函数
 * @param {Function} fail - 请求失败回调函数
 * @param {Function} finallyFn - 请求完成回调函数
 */
function noop() {}

export function requestApi(api, params, success = noop, fail = noop, finallyFn = noop) {
  api(params)
    .then((res) => {
      success(res);
    })
    .catch((err) => {
      fail(err);
    })
    .finally(() => {
      finallyFn();
    });
}

// 查询图标列表
export function getIconList(params) {
  return get(apiGetIconList, { ...params });
}

// 查询图标详情
export function getIconDetail(params) {
  return get(apiGetIconDetail, { ...params });
}

// 加载文件
export function loadFiles(params) {
  return get(loadFilesPath, { ...params });
}
