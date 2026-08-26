import '@nasl/types';
import forge from 'node-forge';

const generateNonce = () => {
  const array = new Uint8Array(16);
  window.crypto.getRandomValues(array);

  return Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join('');
};

/**
 * @NaslLogic
 * @type both
 * @title RSA-SHA256签名
 * @description RSA-SHA256 加密私钥
 * @param rsa 加密私钥
 * @returns 签名结果 JSON 字符串
 */
export function encryptSha256(rsa: nasl.core.String): nasl.core.String {
  const privateKey = forge.pki.privateKeyFromPem(
    `-----BEGIN PRIVATE KEY-----\n${rsa}\n-----END PRIVATE KEY-----`,
  );

  const timestamp = Date.now().toString();
  const nonce = generateNonce();
  const dataToSign = timestamp + nonce;

  const md = forge.md.sha256.create();
  md.update(dataToSign, 'utf8');
  const signature = privateKey.sign(md);

  const result = {
    timestamp,
    nonce,
    sign: forge.util.encode64(signature),
  };
  return JSON.stringify(result);
}
