import '@nasl/types';
import forge from 'node-forge';
import { aesEncryptECB, desEncryptECB, md5Encrypt } from './multi-method-shared';

/**
 * @NaslLogic
 * @type both
 * @title 多方法加密参数
 * @description 支持多种加密方法对参数进行加密
 * @param key 加密私钥
 * @param method 加密方法
 * @param params 请求参数
 * @returns 加密结果
 */
export function multiMethodParamsEncrypt(
  key: nasl.core.String,
  method: nasl.core.String = 'rsa',
  params: nasl.core.String = '',
): nasl.core.String {
  const dataToEncrypt = params;

  let result: string;

  switch (method.toLowerCase()) {
    case 'rsa': {
      const privateKey = forge.pki.privateKeyFromPem(
        `-----BEGIN PRIVATE KEY-----\n${key}\n-----END PRIVATE KEY-----`,
      );
      const md = forge.md.sha256.create();
      md.update(dataToEncrypt, 'utf8');
      const signature = privateKey.sign(md);
      result = forge.util.encode64(signature);
      break;
    }

    case 'aes': {
      result = aesEncryptECB(key, dataToEncrypt);
      break;
    }

    case 'des': {
      result = desEncryptECB(key, dataToEncrypt);
      break;
    }

    case 'md5': {
      result = md5Encrypt(key, dataToEncrypt);
      break;
    }

    default:
      throw new Error('Unsupported encryption method');
  }

  return result;
}
