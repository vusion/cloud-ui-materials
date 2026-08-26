import CryptoJS from 'crypto-js';

export const generateNonce = () => {
  const array = new Uint8Array(16);
  window.crypto.getRandomValues(array);
  return Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join('');
};

export const aesEncryptECB = (base64Key: string, data: string) => {
  const parsedKey = CryptoJS.enc.Base64.parse(base64Key);
  const encrypted = CryptoJS.AES.encrypt(data, parsedKey, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.toString();
};

export const desEncryptECB = (base64Key: string, data: string) => {
  const parsedKey = CryptoJS.enc.Base64.parse(base64Key);
  const encrypted = CryptoJS.DES.encrypt(data, parsedKey, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.toString();
};

export const md5Encrypt = (key: string, dataToEncrypt: string) => {
  return CryptoJS.MD5(key + dataToEncrypt).toString(CryptoJS.enc.Hex);
};
