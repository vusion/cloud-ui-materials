import '@nasl/types';

import Vue from "vue"
import LoadingPlugin from "../libs/loadingPlugin"
export {};

/**
 * @NaslLogic
 * @type both
 * @title 加载插件
 * @desc 加载插件
 * @param options { whitelist: string[] } 参数描述
 * @returns 返回结果描述
 */
export function loadingPlugin(options: { whitelist: string[] }) {
    console.log(options)
    Vue.use(LoadingPlugin,{
        whitelist: options.whitelist || []
    });
}
