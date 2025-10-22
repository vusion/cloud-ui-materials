/**
 * @param {string} key <true> 加密私钥
 * @param {string} method <true> 加密方法
 * @param {string} params <true> 请求参数
 * @returns {string} result
 */
import forge from "node-forge";
import CryptoJS from "crypto-js";


const aesEncryptECB = (base64Key, data) => {
  // 将 Base64 编码的密钥进行解码
  const parsedKey = CryptoJS.enc.Base64.parse(base64Key);

  // 加密
  const encrypted = CryptoJS.AES.encrypt(data, parsedKey, {
    mode: CryptoJS.mode.ECB, // 使用 ECB 模式
    padding: CryptoJS.pad.Pkcs7, // 使用 PKCS7 填充
  });

  // 返回加密后的 Base64 编码数据
  return encrypted.toString(); // 返回 Base64 编码的加密结果
};

// DES-ECB 加密函数（带 PKCS5Padding）
const desEncryptECB = (base64Key, data) => {
  // 将密钥转换为 WordArray
  const parsedKey = CryptoJS.enc.Base64.parse(base64Key);

  // 加密
  const encrypted = CryptoJS.DES.encrypt(data, parsedKey, {
    mode: CryptoJS.mode.ECB, // 使用 ECB 模式
    padding: CryptoJS.pad.Pkcs7, // 使用 PKCS5/PKCS7 填充（CryptoJS 将 PKCS5 和 PKCS7 视为同一类型）
  });

  // 返回加密后的 Base64 编码数据
  return encrypted.toString(); // CryptoJS 默认返回 Base64 编码后的字符串
};

const md5Encrypt = (key, dataToEncrypt) => {
  return CryptoJS.md5Encrypt(key + dataToEncrypt).toString(CryptoJS.enc.Hex);
}

// 主方法，根据不同的 method 实现不同加密逻辑
export default (key, method = "rsa", params = "") => {
  const dataToEncrypt = params;

  let result;

  switch (method.toLowerCase()) {
    case "rsa":
      // 使用 RSA 签名
      const privateKey = forge.pki.privateKeyFromPem(
        `-----BEGIN PRIVATE KEY-----\n${key}\n-----END PRIVATE KEY-----`
      );
      const md = forge.md.sha256.create();
      md.update(dataToEncrypt, "utf8");
      const signature = privateKey.sign(md);
      result = forge.util.encode64(signature);
      break;

    case "aes":
      // 使用 AES 加密
      const aesResult = aesEncryptECB(key, dataToEncrypt);
      result = aesResult;
      break;

    case "des":
      // 使用 DES 加密
      const desResult = desEncryptECB(key, dataToEncrypt);
      result = desResult;
      break;

      case 'md5':
        const md5Result = md5Encrypt(key, dataToEncrypt)
        result = md5Result;
      break;

    default:
      throw new Error("Unsupported encryption method");
  }

  return result;
};
