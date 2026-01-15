<template>
    <transition name="loading-fade">
      <div class="global-loading-mask" v-show="visible">
        <div class="loading-content">
          <div class="loading-spinner"></div>
          <span>加载中...</span>
        </div>
      </div>
    </transition>
  </template>
  
  <script>
  export default {
    name: 'GlobalLoading',
    data() {
      return {
        visible: false,        // loading 显示状态
        requestCount: 0,       // 精准计数：未完成的请求数
        timeoutTimer: null,    // 10秒兜底定时器
        minShowTimer: null,    // 最小显示时长定时器（避免一闪而过）
        TIMEOUT_LIMIT: 10000,  // 兜底上限：10秒
        MIN_SHOW_DURATION: 200 // loading 至少显示200ms（仅优化体验）
      }
    },
    methods: {
      // 发起请求时调用：计数+1，显示loading
      addRequest() {
        this.requestCount++;
        this.showLoading();
      },
  
      // 完成请求时调用：计数-1，判断是否隐藏loading
      removeRequest() {
        this.requestCount = Math.max(0, this.requestCount - 1);
        this.hideLoading();
      },
  
      // 显示loading（核心逻辑）
      showLoading() {
        // 只要有未完成请求，且loading未显示 → 显示
        if (this.requestCount > 0 && !this.visible) {
          this.visible = true;
          // 仅在首次显示时设置10秒兜底
          if (!this.timeoutTimer) {
            this.timeoutTimer = setTimeout(() => {
              this.forceHide(); // 超时强制关闭
            }, this.TIMEOUT_LIMIT);
          }
        }
      },
  
      // 隐藏loading（核心逻辑）
      hideLoading() {
        // 清除之前的最小显示定时器
        clearTimeout(this.minShowTimer);
        // 确保loading至少显示200ms，避免一闪而过
        this.minShowTimer = setTimeout(() => {
          // 只有所有请求都完成，才隐藏
          if (this.requestCount === 0 && this.visible) {
            this.visible = false;
            clearTimeout(this.timeoutTimer); // 清理兜底定时器
            this.timeoutTimer = null;
          }
        }, this.MIN_SHOW_DURATION);
      },
  
      // 超时强制关闭（兜底逻辑）
      forceHide() {
        this.visible = false;
        this.requestCount = 0; // 重置计数
        clearTimeout(this.timeoutTimer);
        clearTimeout(this.minShowTimer);
        this.timeoutTimer = null;
        this.minShowTimer = null;
      }
    },
    beforeDestroy() {
      // 清理所有定时器，防止内存泄漏
      clearTimeout(this.timeoutTimer);
      clearTimeout(this.minShowTimer);
    }
  }
  </script>
  
  <style scoped>
  /* 过渡动画 */
  .loading-fade-enter-active,
  .loading-fade-leave-active {
    transition: all 0.3s ease;
  }
  .loading-fade-enter,
  .loading-fade-leave-to {
    opacity: 0;
    visibility: hidden;
  }
  
  /* 全局loading遮罩 */
  .global-loading-mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
  }
  
  .loading-content {
    background: #fff;
    padding: 20px 30px;
    border-radius: 8px;
    font-size: 16px;
    color: #333;
    display: flex;
    align-items: center;
    gap: 10px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  }
  
  .loading-spinner {
    width: 20px;
    height: 20px;
    border: 3px solid #eee;
    border-top-color: #409eff;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  </style>