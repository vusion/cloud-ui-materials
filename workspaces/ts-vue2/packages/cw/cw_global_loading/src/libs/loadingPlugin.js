import Vue from 'vue';
import GlobalLoading from './Loading.vue';



const requestBlacklist = []

// 2. 工具函数：判断URL是否在黑名单中
function isInBlacklist(url) {
  if (!url) return false;
  return requestBlacklist.some(item => {
    if (typeof item === 'string') {
      return url === item; // 字符串精确匹配
    } else if (item instanceof RegExp) {
      return item.test(url); // 正则匹配
    }
    return false;
  });
}

// 1. 创建并挂载loading组件到body
const LoadingConstructor = Vue.extend(GlobalLoading);
const loadingInstance = new LoadingConstructor({
  el: document.createElement('div')
});
document.body.appendChild(loadingInstance.$el);

// 2. 拦截XHR请求：精准计数
function interceptXHR() {
  const originalXHROpen = XMLHttpRequest.prototype.open;
  const originalXHRSend = XMLHttpRequest.prototype.send;

  XMLHttpRequest.prototype.open = function (method, url) {
    this.__cw_requestUrl = url;
    return originalXHROpen.apply(this, arguments);
  };

  XMLHttpRequest.prototype.send = function () {
    const requestUrl = this.__cw_requestUrl;

    // 只有在黑名单内才进入全局loading计数
    if (!isInBlacklist(requestUrl)) {
      return originalXHRSend.apply(this, arguments);
    }

    // 每发起一个命中黑名单的XHR请求，计数+1
    loadingInstance.addRequest();

    // 监听请求完成（成功/失败/超时/中止）→ 计数-1
    const handleComplete = () => {
      loadingInstance.removeRequest();
    };
    this.addEventListener('load', handleComplete);
    this.addEventListener('error', handleComplete);
    this.addEventListener('abort', handleComplete);
    this.addEventListener('timeout', handleComplete);

    // 执行原请求
    return originalXHRSend.apply(this, arguments);
  };
}

// 3. 拦截Fetch请求：精准计数
function interceptFetch() {
  const originalFetch = window.fetch;

  window.fetch = async (...args) => {

    let requestUrl;
    if (typeof args[0] === 'string') {
      requestUrl = args[0];
    } else if (args[0] instanceof Request) {
      requestUrl = args[0].url;
    }

    // 只有在黑名单内才进入全局loading计数
    if (!isInBlacklist(requestUrl)) {
      return originalFetch.apply(window, args);
    }

    // 每发起一个命中黑名单的Fetch请求，计数+1
    loadingInstance.addRequest();

    try {
      const response = await originalFetch.apply(window, args);
      return response;
    } catch (error) {
      throw error; // 保留原错误
    } finally {
      // 无论成功/失败，计数-1
      loadingInstance.removeRequest();
    }
  };
}

// 4. 暴露Vue插件
export default {
  install(Vue,options={}) {
    if (Array.isArray(options.blacklist)) {
      requestBlacklist.push(...options.blacklist);
    }
    interceptXHR();
    interceptFetch();
    // 挂载到原型，方便手动控制
    Vue.prototype.$globalLoading = loadingInstance;
  }
};