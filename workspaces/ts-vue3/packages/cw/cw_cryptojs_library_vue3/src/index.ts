import { type Plugin } from 'vue';
import * as Components from './components';

export * from './components';
export * from './logics';
import {
  encryptSha256,
  sm2Encrypt,
  sm2Decrypt,
  multiMethodEncrypt,
} from './logics';

export const install: Plugin = (app, options) => {
  Object.keys(Components).forEach((name) => {
    app.component(name, Components[name]);
  });

  if (typeof window !== 'undefined') {
    (window as any).__$libraryEncryptSha256 = encryptSha256;
    (window as any).__$sm2Encrypt = sm2Encrypt;
    (window as any).__$sm2Decrypt = sm2Decrypt;
    (window as any).__$libraryMultiMethodEncrypt = multiMethodEncrypt;
  }
};

export default {
  install,
} as Plugin;
