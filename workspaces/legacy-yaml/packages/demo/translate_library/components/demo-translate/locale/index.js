import Vue from "vue";
import get from "lodash/get";

import enUS from "./lang/en-US";
import zhCN from "./lang/zh-CN";
import ja from "./lang/ja";

const defaultMessages = {
  "zh-CN": zhCN,
  "en-US": enUS,
  ja,
};

const proto = Vue.prototype;
const { defineReactive } = Vue.util;

defineReactive(proto, "$CloudUILang", "en-US");
defineReactive(proto, "$CloudUIMessages", defaultMessages);

export default {
  getMessage(key, name) {
    return get(proto.$CloudUIMessages, `${proto.$CloudUILang}.${key}`, get(defaultMessages, `${proto.$CloudUILang}.${key}`, ''));
  },
};
