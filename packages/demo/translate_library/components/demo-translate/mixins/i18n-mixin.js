import camelCase from "lodash/camelCase";
import template from "lodash/template";

import locale from "../locale";

export default function (name) {
  return {
    // 在注册props之前，往vm上挂载一个$tt方法
    beforeCreate() {
      this.$tt = function (key, data) {
        const scopeKey = `${camelCase(name)}_${key}`;
        const message = locale.getMessage(scopeKey, name);

        return template(message, {
          interpolate: /\{(.+?)\}/g,
        })(data);
      };
    },
  };
}
