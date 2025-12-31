const $libraryName = 'cw_desensitization';

const UtilsLogics = {};
import desensitizationFromLength from './desensitizationFromLength';
import desensitizationFromRegex from './desensitizationFromRegex'
// LOGIC IMPORTS

UtilsLogics.install = function (Vue, option = {}) {
    Vue.prototype.$library = Vue.prototype.$library || {};
    Vue.prototype.$library[`${$libraryName}`] = {};
    Vue.prototype.$library[`${$libraryName}`].desensitizationFromLength = desensitizationFromLength;
    Vue.prototype.$library[`${$libraryName}`].desensitizationFromRegex=desensitizationFromRegex
    // LOGIC USE
};

export default UtilsLogics;
