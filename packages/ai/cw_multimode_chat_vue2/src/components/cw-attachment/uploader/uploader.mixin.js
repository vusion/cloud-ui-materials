const getCookie = (cname) => {
  const name = `${cname}=`;
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    const c = ca[i].trim();
    if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
  }
  return '';
};

import { at, isFunction, isObject, isPlainObject } from 'lodash';

export default {
  computed: {
    actionUrl() {
      const url = this.url || this.action || '/upload';
      return this.$formatMicroFrontUrl ? this.$formatMicroFrontUrl(url) : url;
    },
    headerData() {
      const { access, ttl, ttlValue, headers: propHeaders } = this;
      const lcapUploadHeaders = {
        Authorization: getCookie('Authorization'),
      };
      const { appInfo } = window;

      if (access) {
        lcapUploadHeaders['lcap-access'] = access;
      }

      if (appInfo && appInfo.domainName) {
        lcapUploadHeaders.DomainName = appInfo.domainName;
      }

      if (ttlValue !== null && ttlValue !== undefined) {
        if (ttl !== null && ttl !== undefined) {
          lcapUploadHeaders['lcap-ttl'] = ttl ? ttlValue : -1;
        } else {
          lcapUploadHeaders['lcap-ttl'] = ttlValue;
        }
      }
      return { ...(isPlainObject(propHeaders) ? propHeaders : {}), ...lcapUploadHeaders };
    },
    reqData() {
      const formData = {
        viaOriginURL: this.viaOriginURL,
      };
  
      return { ...(isObject(this.data) ? this.data : {}), ...formData };
    }
  },
  methods: {
    formatResponse(res, file) {
      if(!res) {
        return {};
      }
      const urlField = this.urlField || 'result';
      let url;
      // 新接口适配
      if (res.Code === 200 && Array.isArray(res.Data)) {
        url = at(res.Data[0], urlField)[0];
      } else {
        url = at(res, urlField)[0];
      }
      if (!url) {
        let errorMsg = '上传接口调用失败';
        if(typeof res === 'string') {
          if (res.includes('Too Large')) {
            errorMsg = '文件大小超过接口限制';
          } else if (res.includes('<head>')) {
            const reg = new RegExp(`<head.*?><title.*?>([\\s\\S]+)<\\/title><\\/head>`);
            const match = res.match(reg);
            if (match && match.length > 1) {
              errorMsg = match[1].replace(/^\n+/, '');
            }
          }
        }
        return {
          status: 'error',
          error: errorMsg,
        };
      }
      return {
        url,
        status: 'success',
      };
    },
  },
};
