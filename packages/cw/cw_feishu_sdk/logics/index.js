const $libraryName = 'cw_feishu_sdk';

const UtilsLogics = {};
import config from './config';
import chooseContact from './chooseContact';
import { getSdk } from './getSdk';
import requestAuthCode from './requestAuthCode';
// LOGIC IMPORTS

UtilsLogics.install = function(Vue, option = {}) {
    Vue.prototype.$library = Vue.prototype.$library || {};
    Vue.prototype.$library[`${$libraryName}`] = {};
    Vue.prototype.$library[`${$libraryName}`].config = config;
    Vue.prototype.$library[`${$libraryName}`].chooseContact = chooseContact;
    Vue.prototype.$library[`${$libraryName}`].requestAuthCode = requestAuthCode;
    // LOGIC USE

    const raw = Vue.prototype.$library[`${$libraryName}`];
    Object.entries(raw).forEach(([key, fn]) => {
        raw[key] = async (...args) => {
            const rest = await getSdk(3).then(
                () => new Promise((res, rej) => fn(res, rej, ...args))
            );
            console.log('🚀 ~ file: index.js:26 ~ raw[key]= ~ rest:', rest);
            return rest;
        };
    });
};

export default UtilsLogics;
