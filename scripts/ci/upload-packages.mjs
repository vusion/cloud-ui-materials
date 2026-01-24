#!/usr/bin/env node
/**
 * 上传构建完成的 zip 文件
 * 读取 build_results.json，上传所有成功构建的包
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "../../");

/**
 * 上传文档文件（转成 base64）
 */
async function uploadDocumentFile(filePath, fileName) {
  const baseUrl = process.env.BASE_URL;
  if (!baseUrl || baseUrl.trim() === "") {
    console.log("ℹ️  未配置 BASE_URL，跳过文档上传");
    return { skipped: true };
  }

  if (!fs.existsSync(filePath)) {
    console.log(`ℹ️  文档文件不存在，跳过上传: ${filePath}`);
    return { skipped: true };
  }

  const uploadUrl = `${baseUrl}/expand/base64/file_upload`;
  const domainName = process.env.UPLOAD_DOMAIN_NAME || "material";
  const connectionGroup =
    process.env.UPLOAD_CONNECTION_GROUP || "lcap_default_connection";
  const uploadToken = process.env.UPLOAD_API_TOKEN;
  const uploadMethod = process.env.UPLOAD_METHOD || "POST";

  console.log(`📤 开始上传文档 ${fileName} 到 ${uploadUrl}...`);

  try {
    // 读取文件为 Buffer，然后转换为 base64
    const fileBuffer = fs.readFileSync(filePath);
    const base64String = fileBuffer.toString("base64");

    // 构建请求体：JSON 格式，包含 base64String 和 fileName
    const requestBody = {
      base64String: base64String,
      fileName: fileName,
    };

    // 构建 Headers
    const headers = {
      "Content-Type": "application/json",
      "domainname": domainName,
      "file-connection-group": connectionGroup,
      "accept": "*/*",
      "cache-control": "no-cache",
      "pragma": "no-cache",
    };

    // 处理 Token
    if (uploadToken && uploadToken !== "undefined") {
      if (uploadToken.startsWith("Token ")) {
        headers["Authorization"] = uploadToken;
      } else if (uploadToken.includes(":")) {
        const [username, password] = uploadToken.split(":");
        const basicAuth = Buffer.from(`${username}:${password}`).toString(
          "base64"
        );
        headers["Authorization"] = `Basic ${basicAuth}`;
      } else {
        headers["Authorization"] = `Bearer ${uploadToken}`;
      }
    }

    // 处理自定义 Header (如果有)
    if (process.env.UPLOAD_HEADERS) {
      try {
        const customHeaders = JSON.parse(process.env.UPLOAD_HEADERS);
        Object.assign(headers, customHeaders);
      } catch (e) {
        console.warn("⚠️  UPLOAD_HEADERS 格式错误，忽略自定义请求头");
      }
    }

    // 发送请求
    const response = await fetch(uploadUrl, {
      method: uploadMethod,
      headers: headers,
      body: JSON.stringify(requestBody),
    });

    const responseText = await response.text();
    let responseData;
    try {
      responseData = JSON.parse(responseText);
    } catch {
      responseData = { raw: responseText };
    }

    if (!response.ok) {
      throw new Error(
        `文档上传失败 (${response.status}): ${JSON.stringify(responseData)}`
      );
    }

    // 解析上传结果
    let uploadResultUrl = null;

    // 检查 Data 字段（新接口格式）
    if (responseData && responseData.Data) {
      const data = responseData.Data;
      if (data.result && typeof data.result === "string") {
        uploadResultUrl = data.result;
      } else if (data.filePath && typeof data.filePath === "string") {
        if (data.filePath.startsWith("http")) {
          uploadResultUrl = data.filePath;
        } else {
          const urlObj = new URL(uploadUrl);
          uploadResultUrl = `${urlObj.origin}${data.filePath}`;
        }
      }
    }

    // 兼容旧格式
    if (!uploadResultUrl && responseData && responseData.result) {
      if (Array.isArray(responseData.result)) {
        uploadResultUrl = responseData.result[0] || null;
      } else if (typeof responseData.result === "string") {
        uploadResultUrl = responseData.result;
      }
    }

    if (!uploadResultUrl && responseData && responseData.filePath) {
      if (Array.isArray(responseData.filePath)) {
        if (responseData.filePath.length > 0) {
          const filePath = responseData.filePath[0];
          const urlObj = new URL(uploadUrl);
          uploadResultUrl = filePath.startsWith("http")
            ? filePath
            : `${urlObj.origin}${filePath}`;
        }
      } else if (typeof responseData.filePath === "string") {
        const urlObj = new URL(uploadUrl);
        uploadResultUrl = responseData.filePath.startsWith("http")
          ? responseData.filePath
          : `${urlObj.origin}${responseData.filePath}`;
      }
    }

    if (!uploadResultUrl && responseData && responseData.url) {
      uploadResultUrl =
        typeof responseData.url === "string"
          ? responseData.url
          : String(responseData.url);
    }

    if (uploadResultUrl) {
      console.log(`✅ 文档上传成功: ${fileName}`);
      console.log(`🔗 文档链接: ${uploadResultUrl}`);
    } else {
      console.warn(`⚠️  文档上传成功但未获取到 URL: ${fileName}`);
      console.log(`📋 响应数据: ${JSON.stringify(responseData)}`);
    }

    return {
      success: true,
      url: uploadResultUrl,
      response: responseData,
    };
  } catch (error) {
    console.error(`❌ 文档上传失败 (${fileName}): ${error.message}`);
    if (process.env.UPLOAD_FAIL_CONTINUE === "true") {
      console.warn("⚠️  文档上传失败但继续执行（UPLOAD_FAIL_CONTINUE=true）");
      return {
        success: false,
        error: error.message,
      };
    }
    throw error;
  }
}

/**
 * 上传依赖信息到 /rest/uploadDependency 接口
 */
async function uploadDependency(packageInfo, fileUrl, changelogPath, readmePath) {
  const baseUrl = process.env.BASE_URL;
  if (!baseUrl || baseUrl.trim() === "") {
    console.log("ℹ️  未配置 BASE_URL，跳过依赖上传");
    return { skipped: true };
  }

  const dependencyUrl = `${baseUrl}/rest/uploadDependency`;

  const uploadToken = process.env.UPLOAD_API_TOKEN;
  const domainName = process.env.UPLOAD_DOMAIN_NAME;

  console.log(`📤 开始上传依赖信息到 ${dependencyUrl}...`);

  try {
    // 确保 fileUrl 是字符串类型
    let fileUrlString = "";
    if (fileUrl) {
      if (Array.isArray(fileUrl)) {
        // 如果是数组，取第一个元素
        fileUrlString = fileUrl[0] || "";
      } else if (typeof fileUrl === "string") {
        fileUrlString = fileUrl;
      } else {
        // 其他类型转换为字符串
        fileUrlString = String(fileUrl);
      }
    }

    const requestBody = {
      name: packageInfo.name || "",
      description: packageInfo.title || packageInfo.description || "",
      version: packageInfo.version || "",
      fileUrl: fileUrlString,
      category: "frontend",
    };

    // 添加文档链接（如果提供）
    if (changelogPath) {
      requestBody.changelogPath = changelogPath;
    }
    if (readmePath) {
      requestBody.readmePath = readmePath;
    }

    // 构建请求头
    const headers = {
      "Content-Type": "application/json",
    };

    if (domainName) {
      headers["DomainName"] = domainName;
    }

    if (uploadToken && uploadToken !== "undefined") {
      if (uploadToken.startsWith("Token ")) {
        headers["Authorization"] = uploadToken;
      } else if (uploadToken.includes(":")) {
        const [username, password] = uploadToken.split(":");
        const basicAuth = Buffer.from(`${username}:${password}`).toString(
          "base64"
        );
        headers["Authorization"] = `Basic ${basicAuth}`;
      } else {
        headers["Authorization"] = `Bearer ${uploadToken}`;
      }
    }

    if (process.env.UPLOAD_HEADERS) {
      try {
        const customHeaders = JSON.parse(process.env.UPLOAD_HEADERS);
        Object.assign(headers, customHeaders);
      } catch (e) {
        console.warn("⚠️  UPLOAD_HEADERS 格式错误，忽略自定义请求头");
      }
    }

    // 发送请求
    const response = await fetch(dependencyUrl, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(requestBody),
    });

    const responseText = await response.text();
    let responseData;
    try {
      responseData = JSON.parse(responseText);
    } catch {
      responseData = { raw: responseText };
    }

    if (!response.ok) {
      throw new Error(
        `依赖上传失败 (${response.status}): ${JSON.stringify(responseData)}`
      );
    }

    console.log(
      `✅ 依赖信息上传成功: ${packageInfo.name}@${packageInfo.version}`
    );
    console.log(`📋 响应数据: ${JSON.stringify(responseData)}`);

    return {
      success: true,
      url: dependencyUrl,
      response: responseData,
    };
  } catch (error) {
    console.error(`❌ 依赖上传失败: ${error.message}`);
    console.error(`   目标 URL: ${dependencyUrl}`);
    if (
      error.message.includes("fetch failed") ||
      error.message.includes("ECONNREFUSED") ||
      error.message.includes("ENOTFOUND")
    ) {
      console.error(`   💡 提示: 可能是网络连接问题，请检查：`);
      console.error(`      - BASE_URL 是否正确配置: ${baseUrl || "未配置"}`);
      console.error(`      - 服务器是否可访问`);
      console.error(`      - 网络连接是否正常`);
    }
    if (process.env.UPLOAD_FAIL_CONTINUE === "true") {
      console.warn("⚠️  依赖上传失败但继续执行（UPLOAD_FAIL_CONTINUE=true）");
      return {
        success: false,
        error: error.message,
      };
    }
    throw error;
  }
}

/**
 * 上传 zip 文件到指定接口
 */
async function uploadZipFile(zipFilePath, metadata) {
  const baseUrl = process.env.BASE_URL;
  if (!baseUrl || baseUrl.trim() === "") {
    console.log("ℹ️  未配置 BASE_URL，跳过文件上传");
    return { skipped: true };
  }

  // 1. 确保上传路径正确
  const uploadUrl = `${baseUrl}/expand/base64/file_upload`;

  // 2. 根据抓包成功的请求，修正默认值
  // 成功请求传的是字符串 "false"，而不是 "undefined"
  const lcapIsCompress = process.env.UPLOAD_LCAP_IS_COMPRESS || "false";
  const viaOriginURL = process.env.UPLOAD_VIA_ORIGIN_URL || "false";

  // 3. 补全关键 Header 的默认值
  const domainName = process.env.UPLOAD_DOMAIN_NAME || "material";
  const connectionGroup =
    process.env.UPLOAD_CONNECTION_GROUP || "lcap_default_connection";

  const uploadToken = process.env.UPLOAD_API_TOKEN;
  const uploadMethod = process.env.UPLOAD_METHOD || "POST";

  if (!fs.existsSync(zipFilePath)) {
    throw new Error(`zip 文件不存在: ${zipFilePath}`);
  }

  console.log(`📤 开始上传 ${path.basename(zipFilePath)} 到 ${uploadUrl}...`);

  try {
    const fileName = path.basename(zipFilePath);
    const fileStats = fs.statSync(zipFilePath);

    if (process.env.DEBUG_UPLOAD === "true") {
      console.log(
        `📦 文件信息: ${fileName}, 大小: ${(
          fileStats.size /
          1024 /
          1024
        ).toFixed(2)} MB`
      );
    }

    // ============================================================
    // 关键修复：将文件转换为 base64 格式传递
    // 服务器期望接收 JSON 格式：{"base64String":"","fileName":""}
    // ============================================================

    // 读取文件为 Buffer，然后转换为 base64
    const fileBuffer = fs.readFileSync(zipFilePath);
    const base64String = fileBuffer.toString("base64");

    if (process.env.DEBUG_UPLOAD === "true") {
      console.log(
        `📦 Base64 编码后大小: ${(base64String.length / 1024 / 1024).toFixed(
          2
        )} MB`
      );
    }

    // 构建请求体：JSON 格式，包含 base64String 和 fileName
    const requestBody = {
      base64String: base64String,
      fileName: fileName,
    };

    // ============================================================
    // 构建 Headers
    // ============================================================
    const headers = {};

    // 1. 设置 Content-Type 为 application/json
    headers["Content-Type"] = "application/json";

    // 2. 添加抓包中出现的关键 Header (强制小写 key 以防万一)
    headers["domainname"] = domainName;
    headers["file-connection-group"] = connectionGroup; // 之前缺失的关键 Header

    // 3. 模拟浏览器行为 Header
    headers["accept"] = "*/*";
    headers["cache-control"] = "no-cache";
    headers["pragma"] = "no-cache";

    // 4. 处理 Token
    if (uploadToken && uploadToken !== "undefined") {
      if (uploadToken.startsWith("Token ")) {
        headers["Authorization"] = uploadToken;
      } else if (uploadToken.includes(":")) {
        const [username, password] = uploadToken.split(":");
        const basicAuth = Buffer.from(`${username}:${password}`).toString(
          "base64"
        );
        headers["Authorization"] = `Basic ${basicAuth}`;
      } else {
        headers["Authorization"] = `Bearer ${uploadToken}`;
      }
    }

    // 5. 处理自定义 Header (如果有)
    if (process.env.UPLOAD_HEADERS) {
      try {
        const customHeaders = JSON.parse(process.env.UPLOAD_HEADERS);
        Object.assign(headers, customHeaders);
      } catch (e) {
        console.warn("⚠️  UPLOAD_HEADERS 格式错误，忽略自定义请求头");
      }
    }

    // 发送请求
    const response = await fetch(uploadUrl, {
      method: uploadMethod,
      headers: headers,
      body: JSON.stringify(requestBody), // JSON 格式：{"base64String":"","fileName":""}
    });

    const responseText = await response.text();
    let responseData;
    try {
      responseData = JSON.parse(responseText);
    } catch {
      responseData = { raw: responseText };
    }

    if (!response.ok) {
      throw new Error(
        `上传失败 (${response.status}): ${JSON.stringify(responseData)}`
      );
    }

    // 解析上传结果
    // 响应格式：{"Code":200,"Message":"success","Data":{"result":"...","filePath":"...","success":true}}
    let uploadResultUrl = null;

    // 1. 检查 Data 字段（新接口格式）
    if (responseData && responseData.Data) {
      const data = responseData.Data;
      if (data.result && typeof data.result === "string") {
        uploadResultUrl = data.result;
        console.log(`🔗 从 Data.result 获取 URL: ${uploadResultUrl}`);
      } else if (data.filePath && typeof data.filePath === "string") {
        // 如果 filePath 是相对路径，需要拼接完整 URL
        if (data.filePath.startsWith("http")) {
          uploadResultUrl = data.filePath;
        } else {
          const urlObj = new URL(uploadUrl);
          uploadResultUrl = `${urlObj.origin}${data.filePath}`;
        }
        console.log(`🔗 从 Data.filePath 获取 URL: ${uploadResultUrl}`);
      }
    }

    // 2. 兼容旧格式：直接检查 result 字段
    if (!uploadResultUrl && responseData && responseData.result) {
      if (Array.isArray(responseData.result)) {
        uploadResultUrl = responseData.result[0] || null;
      } else if (typeof responseData.result === "string") {
        uploadResultUrl = responseData.result;
      } else {
        uploadResultUrl = String(responseData.result);
      }
      if (uploadResultUrl) {
        console.log(`🔗 从 result 字段获取 URL: ${uploadResultUrl}`);
      }
    }

    // 3. 兼容旧格式：检查 filePath 字段
    if (!uploadResultUrl && responseData && responseData.filePath) {
      if (Array.isArray(responseData.filePath)) {
        if (responseData.filePath.length > 0) {
          const filePath = responseData.filePath[0];
          const urlObj = new URL(uploadUrl);
          uploadResultUrl = filePath.startsWith("http")
            ? filePath
            : `${urlObj.origin}${filePath}`;
        }
      } else if (typeof responseData.filePath === "string") {
        const urlObj = new URL(uploadUrl);
        uploadResultUrl = responseData.filePath.startsWith("http")
          ? responseData.filePath
          : `${urlObj.origin}${responseData.filePath}`;
      }
      if (uploadResultUrl) {
        console.log(`🔗 从 filePath 字段获取 URL: ${uploadResultUrl}`);
      }
    }

    // 4. 检查其他可能的字段
    if (!uploadResultUrl && responseData && responseData.url) {
      uploadResultUrl =
        typeof responseData.url === "string"
          ? responseData.url
          : String(responseData.url);
      if (uploadResultUrl) {
        console.log(`🔗 从 url 字段获取 URL: ${uploadResultUrl}`);
      }
    }

    console.log(`✅ 上传成功: ${fileName}`);
    if (uploadResultUrl) {
      console.log(
        `🔗 上传链接: ${uploadResultUrl} (类型: ${typeof uploadResultUrl})`
      );
    } else {
      console.log(`📋 响应数据: ${JSON.stringify(responseData)}`);
      console.log(`⚠️  未从响应中解析到文件 URL，请检查响应数据结构`);
    }

    return {
      success: true,
      url: uploadUrl,
      fileName: fileName,
      uploadResultUrl: uploadResultUrl,
      response: responseData,
    };
  } catch (error) {
    console.error(`❌ 上传失败: ${error.message}`);
    console.error(`   目标 URL: ${uploadUrl}`);

    // 错误检查逻辑
    if (
      error.message.includes("fetch failed") ||
      error.message.includes("ECONNREFUSED") ||
      error.message.includes("ENOTFOUND")
    ) {
      console.error(`   💡 提示: 请检查网络或 VPN 连接，以及 BASE_URL 配置。`);
    }
    if (process.env.UPLOAD_FAIL_CONTINUE === "true") {
      console.warn("⚠️  上传失败但继续执行（UPLOAD_FAIL_CONTINUE=true）");
      return {
        success: false,
        error: error.message,
      };
    }
    throw error;
  }
}

// 主函数
async function main() {
  const buildResultsPath = path.join(repoRoot, "build_results.json");
  const artifactDir = path.join(repoRoot, "upload_artifacts");

  if (!fs.existsSync(buildResultsPath)) {
    console.error("❌ 构建结果文件不存在: build_results.json");
    console.log("💡 请先运行构建脚本");
    process.exit(1);
  }

  const buildResults = JSON.parse(fs.readFileSync(buildResultsPath, "utf8"));
  const successResults = buildResults.filter((r) => r.status === "success");

  if (successResults.length === 0) {
    console.log("ℹ️  没有成功构建的包，跳过上传");
    process.exit(0);
  }

  console.log(`📦 开始上传 ${successResults.length} 个包的 zip 文件...\n`);

  const uploadResults = [];
  let successCount = 0;
  let failCount = 0;

  for (const result of successResults) {
    const zipPath = path.join(artifactDir, result.zipName);

    if (!fs.existsSync(zipPath)) {
      console.warn(`⚠️  ${result.name}: zip 文件不存在: ${zipPath}`);
      continue;
    }

    try {
      const uploadResult = await uploadZipFile(zipPath, {
        name: result.name,
        version: result.version,
        relDir: result.relDir,
        zipName: result.zipName,
        zipSize: result.zipSize,
      });

      if (uploadResult && uploadResult.success) {
        successCount++;
        // 更新构建结果
        result.uploadResult = uploadResult;
        result.uploadResultUrl = uploadResult.uploadResultUrl;

        // 如果上传成功且有返回的 URL，调用 uploadDependency 接口
        if (uploadResult.uploadResultUrl) {
          // 验证 uploadResultUrl 是有效的字符串
          let validFileUrl = null;
          if (
            typeof uploadResult.uploadResultUrl === "string" &&
            uploadResult.uploadResultUrl.trim() !== ""
          ) {
            validFileUrl = uploadResult.uploadResultUrl;
          } else if (
            Array.isArray(uploadResult.uploadResultUrl) &&
            uploadResult.uploadResultUrl.length > 0
          ) {
            // 如果是数组，取第一个元素
            validFileUrl = String(uploadResult.uploadResultUrl[0]);
            console.warn(
              `⚠️  ${result.name}: uploadResultUrl 是数组，使用第一个元素: ${validFileUrl}`
            );
          } else {
            console.warn(
              `⚠️  ${result.name}: uploadResultUrl 格式无效: ${JSON.stringify(
                uploadResult.uploadResultUrl
              )}`
            );
          }

          if (validFileUrl) {
            try {
              // 读取文档上传结果（如果 generate-diff-docs.mjs 已经上传了文档）
              let changelogPath = null;
              let readmePath = null;
              
              const docUploadResultsPath = path.join(repoRoot, "doc_upload_results.json");
              let docUploadResults = {};
              
              if (fs.existsSync(docUploadResultsPath)) {
                try {
                  docUploadResults = JSON.parse(fs.readFileSync(docUploadResultsPath, "utf8"));
                  console.log(`📄 读取到文档上传结果文件`);
                } catch (e) {
                  console.warn(`⚠️  读取文档上传结果失败: ${e.message}`);
                }
              }

              // 如果文档已经由 generate-diff-docs.mjs 上传，使用其上传结果
              if (docUploadResults[result.name]) {
                changelogPath = docUploadResults[result.name].changelogPath || null;
                readmePath = docUploadResults[result.name].readmePath || null;
                if (changelogPath || readmePath) {
                  console.log(`✅ ${result.name}: 使用已上传的文档链接`);
                  if (changelogPath) {
                    console.log(`   📄 changelogPath: ${changelogPath}`);
                  }
                  if (readmePath) {
                    console.log(`   📄 readmePath: ${readmePath}`);
                  }
                }
              } else {
                // 如果没有文档上传结果，尝试上传现有文档
                // 查找并上传 changelog.md (优先查找 docs/changelog.md，然后是 CHANGELOG.md)
                const docsChangelogPath = path.join(result.dir, "docs", "changelog.md");
                const rootChangelogPath = path.join(result.dir, "CHANGELOG.md");
                
                if (fs.existsSync(docsChangelogPath)) {
                  console.log(`📄 找到文档: docs/changelog.md`);
                  const changelogUploadResult = await uploadDocumentFile(
                    docsChangelogPath,
                    `${result.name}-changelog.md`
                  );
                  if (changelogUploadResult && changelogUploadResult.success && changelogUploadResult.url) {
                    changelogPath = changelogUploadResult.url;
                    console.log(`✅ ${result.name}: changelog.md 上传成功`);
                  }
                } else if (fs.existsSync(rootChangelogPath)) {
                  console.log(`📄 找到文档: CHANGELOG.md`);
                  const changelogUploadResult = await uploadDocumentFile(
                    rootChangelogPath,
                    `${result.name}-CHANGELOG.md`
                  );
                  if (changelogUploadResult && changelogUploadResult.success && changelogUploadResult.url) {
                    changelogPath = changelogUploadResult.url;
                    console.log(`✅ ${result.name}: CHANGELOG.md 上传成功`);
                  }
                } else {
                  console.log(`ℹ️  ${result.name}: 未找到 changelog 文档`);
                }

                // 查找并上传 README (优先查找 docs/usage.md，然后是 README.md)
                const docsUsagePath = path.join(result.dir, "docs", "usage.md");
                const readmePathFile = path.join(result.dir, "README.md");
                
                if (fs.existsSync(docsUsagePath)) {
                  console.log(`📄 找到文档: docs/usage.md`);
                  const readmeUploadResult = await uploadDocumentFile(
                    docsUsagePath,
                    `${result.name}-usage.md`
                  );
                  if (readmeUploadResult && readmeUploadResult.success && readmeUploadResult.url) {
                    readmePath = readmeUploadResult.url;
                    console.log(`✅ ${result.name}: usage.md 上传成功`);
                  }
                } else if (fs.existsSync(readmePathFile)) {
                  console.log(`📄 找到文档: README.md`);
                  const readmeUploadResult = await uploadDocumentFile(
                    readmePathFile,
                    `${result.name}-README.md`
                  );
                  if (readmeUploadResult && readmeUploadResult.success && readmeUploadResult.url) {
                    readmePath = readmeUploadResult.url;
                    console.log(`✅ ${result.name}: README.md 上传成功`);
                  }
                } else {
                  console.log(`ℹ️  ${result.name}: 未找到 README 文档`);
                }
              }

              // 读取 package.json 获取依赖信息，统一调用一次接口
              const pkgJsonPath = path.join(result.dir, "package.json");
              if (fs.existsSync(pkgJsonPath)) {
                const pkgJson = JSON.parse(
                  fs.readFileSync(pkgJsonPath, "utf8")
                );
                // 统一调用一次 uploadDependency 接口，包含所有链接
                const dependencyResult = await uploadDependency(
                  pkgJson,
                  validFileUrl,
                  changelogPath,
                  readmePath
                );
                if (dependencyResult && dependencyResult.success) {
                  result.dependencyUploadResult = dependencyResult;
                  result.changelogPath = changelogPath;
                  result.readmePath = readmePath;
                  console.log(`✅ ${result.name}: 依赖信息上传成功（包含所有链接）`);
                  if (changelogPath) {
                    console.log(`   📄 changelogPath: ${changelogPath}`);
                  }
                  if (readmePath) {
                    console.log(`   📄 readmePath: ${readmePath}`);
                  }
                } else if (dependencyResult && dependencyResult.skipped) {
                  console.log(
                    `ℹ️  ${result.name}: 跳过依赖上传（未配置 BASE_URL）`
                  );
                } else {
                  console.warn(
                    `⚠️  ${result.name}: 依赖上传失败，但不影响整体流程`
                  );
                }
              } else {
                console.warn(
                  `⚠️  ${result.name}: package.json 不存在，跳过依赖上传: ${pkgJsonPath}`
                );
              }
            } catch (depError) {
              console.warn(
                `⚠️  ${result.name}: 依赖上传出错，但不影响整体流程: ${depError.message}`
              );
              // 依赖上传失败不影响整体流程，继续处理
            }
          } else {
            console.warn(
              `⚠️  ${result.name}: 上传成功但 fileUrl 无效，跳过依赖上传`
            );
          }
        } else {
          console.warn(
            `⚠️  ${result.name}: 上传成功但未获取到文件 URL，跳过依赖上传`
          );
        }
      } else if (uploadResult && uploadResult.skipped) {
        console.log(`ℹ️  ${result.name}: 跳过上传（未配置 UPLOAD_API_URL）`);
      } else {
        failCount++;
      }
    } catch (error) {
      failCount++;
      console.error(`❌ ${result.name}: 上传失败 - ${error.message}`);
      result.uploadResult = {
        success: false,
        error: error.message,
      };

      // 如果配置了失败时继续，继续处理其他包
      if (process.env.UPLOAD_FAIL_CONTINUE !== "true") {
        // 默认情况下，上传失败不影响其他包的上传
        console.warn(`⚠️  继续上传其他包...`);
      }
    }

    console.log(""); // 空行分隔
  }

  // 保存更新后的构建结果（包含上传信息）
  fs.writeFileSync(buildResultsPath, JSON.stringify(buildResults, null, 2));

  // 输出汇总
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log(`📊 上传汇总:`);
  console.log(`   ✅ 成功: ${successCount}`);
  console.log(`   ❌ 失败: ${failCount}`);
  console.log(`   📦 总计: ${successResults.length}`);
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

  if (failCount > 0 && process.env.UPLOAD_FAIL_CONTINUE !== "true") {
    console.error(`❌ 有 ${failCount} 个包上传失败`);
    process.exit(1);
  } else {
    console.log("✅ 上传完成！");
    process.exit(0);
  }
}

main().catch((error) => {
  console.error("\n❌ 未捕获的错误:");
  console.error(error);
  process.exit(1);
});
