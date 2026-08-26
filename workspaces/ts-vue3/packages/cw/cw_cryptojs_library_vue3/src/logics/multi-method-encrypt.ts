import '@nasl/types';
import forge from 'node-forge';
import { aesEncryptECB, desEncryptECB, generateNonce, md5Encrypt } from './multi-method-shared';

/**
 * @NaslLogic
 * @type both
 * @title 多方法加密时间戳
 * @description 支持多种加密方法加密时间戳
 * @param key 加密私钥
 * @param method 加密方法
 * @param body 请求体内容
 * @returns 加密结果 JSON 字符串
 */
export function multiMethodEncrypt(
  key: nasl.core.String,
  method: nasl.core.String = 'rsa',
  body: nasl.core.String = '',
): nasl.core.String {
  const timestamp = Date.now().toString();
  const nonce = generateNonce();
  const dataToEncrypt = timestamp + nonce + body;

  let result: { timestamp: string; nonce: string; sign: string };

  switch (method.toLowerCase()) {
    case 'rsa': {
      const privateKey = forge.pki.privateKeyFromPem(
        `-----BEGIN PRIVATE KEY-----\n${key}\n-----END PRIVATE KEY-----`,
      );
      const md = forge.md.sha256.create();
      md.update(dataToEncrypt, 'utf8');
      const signature = privateKey.sign(md);
      result = {
        timestamp,
        nonce,
        sign: forge.util.encode64(signature),
      };
      break;
    }

    case 'aes': {
      const aesResult = aesEncryptECB(key, dataToEncrypt);
      result = {
        timestamp,
        nonce,
        sign: aesResult,
      };
      break;
    }

    case 'des': {
      const desResult = desEncryptECB(key, dataToEncrypt);
      result = {
        timestamp,
        nonce,
        sign: desResult,
      };
      break;
    }

    case 'md5': {
      const md5Result = md5Encrypt(key, dataToEncrypt);
      result = {
        timestamp,
        nonce,
        sign: md5Result,
      };
      break;
    }

    default:
      throw new Error('Unsupported encryption method');
  }

  return JSON.stringify(result);
}
