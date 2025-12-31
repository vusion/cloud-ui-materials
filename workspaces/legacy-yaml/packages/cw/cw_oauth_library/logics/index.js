const $libraryName = 'cw_oauth_library';

const UtilsLogics = {};
import getOauth2Url from './getOauth2Url';
import getOauthCodeAndState from './getOauthCodeAndState';
// LOGIC IMPORTS

UtilsLogics.install = function (Vue, option = {}) {
    Vue.prototype.$library = Vue.prototype.$library || {};
    Vue.prototype.$library[`${$libraryName}`] = {};
    Vue.prototype.$library[`${$libraryName}`].getOauth2Url = getOauth2Url;
    Vue.prototype.$library[`${$libraryName}`].getOauthCodeAndState =
        getOauthCodeAndState;
    // LOGIC USE
};

export default UtilsLogics;
