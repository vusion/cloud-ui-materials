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
 * 上传依赖信息到 /rest/uploadDependency 接口
 */
async function uploadDependency(packageInfo, fileUrl) {
  const uploadUrl = process.env.UPLOAD_API_URL;
  if (!uploadUrl) {
    console.log("ℹ️  未配置 UPLOAD_API_URL，跳过依赖上传");
    return { skipped: true };
  }

  // 构建 uploadDependency 接口 URL
  const urlObj = new URL(uploadUrl);
  const dependencyUrl = `${urlObj.origin}/rest/uploadDependency`;

  const uploadToken = process.env.UPLOAD_API_TOKEN;
  const domainName = process.env.UPLOAD_DOMAIN_NAME;

  console.log(`📤 开始上传依赖信息到 ${dependencyUrl}...`);

  try {
    const requestBody = {
      name: packageInfo.name || "",
      description: packageInfo.title || packageInfo.description || "",
      version: packageInfo.version || "",
      fileUrl: fileUrl,
      category: "frontend",
    };

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
  const uploadUrl = process.env.UPLOAD_API_URL;
  const uploadToken = process.env.UPLOAD_API_TOKEN;
  const uploadMethod = process.env.UPLOAD_METHOD || "POST";
  const domainName = process.env.UPLOAD_DOMAIN_NAME;
  const lcapIsCompress = process.env.UPLOAD_LCAP_IS_COMPRESS || "undefined";
  const viaOriginURL = process.env.UPLOAD_VIA_ORIGIN_URL || "undefined";

  // 如果未配置上传接口，跳过上传
  if (!uploadUrl) {
    console.log("ℹ️  未配置 UPLOAD_API_URL，跳过文件上传");
    return { skipped: true };
  }

  if (!fs.existsSync(zipFilePath)) {
    throw new Error(`zip 文件不存在: ${zipFilePath}`);
  }

  console.log(`📤 开始上传 ${path.basename(zipFilePath)} 到 ${uploadUrl}...`);

  try {
    // 动态导入 form-data
    let FormData;
    try {
      const formDataModule = await import("form-data");
      FormData =
        formDataModule.default || formDataModule.FormData || formDataModule;
    } catch (e) {
      if (typeof globalThis.FormData !== "undefined") {
        FormData = globalThis.FormData;
      } else {
        throw new Error(
          "FormData 不可用，请安装 form-data 包: pnpm add -D form-data"
        );
      }
    }

    const formData = new FormData();
    const fileStream = fs.createReadStream(zipFilePath);
    const fileName = path.basename(zipFilePath);

    // 添加文件
    formData.append("file", fileStream, fileName);

    // 添加 LCAP 特定字段
    formData.append("lcapIsCompress", lcapIsCompress);
    formData.append("viaOriginURL", viaOriginURL);

    // 添加元数据
    if (metadata) {
      formData.append("packageName", metadata.name || "");
      formData.append("version", metadata.version || "");
      formData.append("relDir", metadata.relDir || "");
    }

    // 构建请求头
    const headers = {};

    if (typeof formData.getHeaders === "function") {
      Object.assign(headers, formData.getHeaders());
    }

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
    const response = await fetch(uploadUrl, {
      method: uploadMethod,
      headers: headers,
      body: formData,
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

    // 解析上传后的链接
    let uploadResultUrl = null;
    if (responseData && responseData.result) {
      uploadResultUrl = responseData.result;
    } else if (responseData && responseData.filePath) {
      const urlObj = new URL(uploadUrl);
      uploadResultUrl = `${urlObj.origin}${responseData.filePath}`;
    }

    console.log(`✅ 上传成功: ${fileName}`);
    if (uploadResultUrl) {
      console.log(`🔗 上传链接: ${uploadResultUrl}`);
    } else {
      console.log(`📋 响应数据: ${JSON.stringify(responseData)}`);
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
          try {
            // 读取 package.json 获取依赖信息
            const pkgJsonPath = path.join(result.dir, "package.json");
            if (fs.existsSync(pkgJsonPath)) {
              const pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath, "utf8"));
              const dependencyResult = await uploadDependency(
                pkgJson,
                uploadResult.uploadResultUrl
              );
              if (dependencyResult && dependencyResult.success) {
                result.dependencyUploadResult = dependencyResult;
                console.log(`✅ ${result.name}: 依赖信息上传成功`);
              } else if (dependencyResult && dependencyResult.skipped) {
                console.log(
                  `ℹ️  ${result.name}: 跳过依赖上传（未配置 UPLOAD_API_URL）`
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
