import tooltip from './tooltip';

export default {
  install(app) {
    // 注册tooltip指令
    app.directive('tooltip', tooltip);
  }
};