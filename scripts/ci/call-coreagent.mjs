import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

/** 1. 签名核心算法 */
function generateSignature(ak, sk, timestamp) {
  const hmacKey = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqk+4DUsEqNCxSV7FksPKoXxcg2dcaAD8ujf5JS1jhoOBNcALU2DgyjcgWs2PIjK7jZOHYH/1uNOIRbxXA62BgdGy/cSqXvQstEeDy2PD9sCX8W9CVALRNazLtBuij4ZKK/zzkIoC4jLMBppWhF0dro5eRjWvEPy3xq8cvbxvR2PG2mfSlBajm7To85iSbELliXEcWGHLHHNqJztCaV2pGrcvY2olDxaZpWofMYPf0peGdMW5XTbQOWY/N9Pxv8vCQXDr5aTJJ4mXTfpu2JItpqtUiEUbx4UobvlykUAKEkyfeIoElOnAtyumiOcr0TCu0LLJD8gS5Bh4NELFi+XK5QIDAQAB";
  const dataToSign = ak + sk + timestamp;
  const signatureRaw = crypto.createHmac('sha256', hmacKey).update(dataToSign).digest('base64');
  return signatureRaw.replace(/=/g, '').replace(/\//g, '_').replace(/\+/g, '-');
}

/** 2. 调用 API */
async function callAgent(payload) {
  const ak = process.env.COREAGENT_AK;
  const sk = process.env.COREAGENT_SK;
  const timestamp = Date.now().toString();
  const signature = generateSignature(ak, sk, timestamp);

  const url = "https://coreagent.codewave.163.com/api/v1/agent/chat"; // 需根据实际 Endpoint 调整
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ak, timestamp, signature },
    body: JSON.stringify({ message: payload, stream: false })
  });
  return await res.json();
}

/** 3. 逻辑主入口 */
async function main() {
  const args = process.argv.slice(2);
  const pkgDir = args[args.indexOf('--dir') + 1];
  const aiContext = JSON.parse(args[args.indexOf('--context') + 1]);

  const diff = execSync(`git diff HEAD^ HEAD -- ${pkgDir}`).toString();
  const readmePath = path.join(pkgDir, 'README.md');

  const prompt = `
    任务类型: ${aiContext.isFirstTime ? '首次生成 README' : '更新 README 与生成变更说明'}
    组件路径: ${pkgDir}
    技术栈: ${aiContext.stack}
    特征文件内容: ${aiContext.apiContent}
    本次代码变更: ${diff}
    当前文档内容: ${aiContext.isFirstTime ? '空' : fs.readFileSync(readmePath, 'utf8')}
  `;

  console.log(`🤖 正在请求智能体处理 [${path.basename(pkgDir)}]...`);
  const result = await callAgent(prompt);

  if (result.code === 200 && result.data?.answer) {
    fs.writeFileSync(readmePath, result.data.answer);
    console.log(`✅ 文档已同步至: ${readmePath}`);
  } else {
    console.error(`❌ 智能体返回异常:`, result.message);
  }
}

main().catch(console.error);