/**
 * 创建或更新 GitHub Release
 * CommonJS 版本，用于 github-script action
 */
module.exports = async ({ github, context }) => {
  const fs = require("fs");
  const path = require("path");

  const repoRoot = path.resolve(__dirname, "../../");

  const buildResultsPath = path.join(repoRoot, "build_results.json");
  const buildResults = JSON.parse(fs.readFileSync(buildResultsPath, "utf8"));
  const successfulBuilds = buildResults.filter((r) => r.status === "success");

  if (successfulBuilds.length === 0) {
    console.log("没有成功构建的组件，跳过 Release 创建");
    return;
  }

  // 读取 diff 描述
  let releaseBody = "";
  try {
    releaseBody = fs.readFileSync(
      path.join(repoRoot, "diff_description.txt"),
      "utf8"
    );
  } catch (e) {
    releaseBody = "## 📦 组件发布\n\n";
  }

  releaseBody += "\n### 📦 发布组件列表\n\n";
  successfulBuilds.forEach((result) => {
    releaseBody += `- **${result.name}@v${result.version}**\n`;
  });

  releaseBody += `\n### 🔗 相关链接\n\n`;
  releaseBody += `- [查看本次提交](${context.serverUrl}/${context.repo.owner}/${context.repo.repo}/commit/${context.sha})\n`;

  // 创建或更新 Release
  const releaseTag = `release-${context.sha.substring(0, 7)}-${
    new Date().toISOString().split("T")[0]
  }`;
  let release;

  try {
    // 尝试查找现有 Release
    const { data: releases } = await github.rest.repos.listReleases({
      owner: context.repo.owner,
      repo: context.repo.repo,
      per_page: 10,
    });

    release = releases.find((r) => r.tag_name === releaseTag);

    if (!release) {
      // 创建新 Release
      const createResponse = await github.rest.repos.createRelease({
        owner: context.repo.owner,
        repo: context.repo.repo,
        tag_name: releaseTag,
        name: `组件发布（${successfulBuilds.length}个） - ${new Date().toISOString().split("T")[0]}`,
        body: releaseBody,
        draft: false,
        prerelease: false,
      });
      release = createResponse.data;
      console.log(`✅ 已创建 Release: ${releaseTag}`);
    } else {
      // 更新现有 Release
      const updateResponse = await github.rest.repos.updateRelease({
        owner: context.repo.owner,
        repo: context.repo.repo,
        release_id: release.id,
        body: releaseBody,
      });
      release = updateResponse.data || release;
      console.log(`✅ 已更新 Release: ${releaseTag}`);
    }
  } catch (error) {
    console.error(`❌ 创建/更新 Release 失败: ${error.message}`);
    return;
  }

  // 上传 zip 文件到 Release（每个文件单独上传，保持原始文件名）
  const artifactDir = path.join(repoRoot, "upload_artifacts");
  if (fs.existsSync(artifactDir)) {
    const files = fs.readdirSync(artifactDir).filter((f) => f.endsWith(".zip"));

    if (files.length === 0) {
      console.log("⚠️ 未找到 zip 文件，跳过上传");
      return;
    }

    console.log(`📦 找到 ${files.length} 个 zip 文件，将单独上传到 Release`);

    // 获取 release ID
    const releaseId = release.id;

    for (const file of files) {
      try {
        const filePath = path.join(artifactDir, file);
        const fileStats = fs.statSync(filePath);
        const fileName = path.basename(file);

        // 检查文件大小
        if (fileStats.size === 0) {
          console.warn(`⚠️ 跳过空文件: ${fileName}`);
          continue;
        }

        console.log(
          `📤 上传: ${fileName} (${(fileStats.size / 1024).toFixed(2)} KB)`
        );

        const fileContent = fs.readFileSync(filePath);

        // 检查是否已存在同名文件，如果存在则先删除
        try {
          const { data: assets } = await github.rest.repos.listReleaseAssets({
            owner: context.repo.owner,
            repo: context.repo.repo,
            release_id: releaseId,
          });

          const existingAsset = assets.find((a) => a.name === fileName);
          if (existingAsset) {
            console.log(`🔄 删除已存在的文件: ${fileName}`);
            await github.rest.repos.deleteReleaseAsset({
              owner: context.repo.owner,
              repo: context.repo.repo,
              asset_id: existingAsset.id,
            });
          }
        } catch (checkError) {
          // 忽略检查错误，继续上传
        }

        // 上传文件到 Release
        await github.rest.repos.uploadReleaseAsset({
          owner: context.repo.owner,
          repo: context.repo.repo,
          release_id: releaseId,
          name: fileName,
          data: fileContent,
        });

        console.log(`✅ 已上传 ${fileName} 到 Release`);
      } catch (error) {
        console.error(`❌ 上传 ${file} 失败: ${error.message}`);
        // 继续处理其他文件，不中断流程
      }
    }

    console.log(`✅ 所有文件上传完成，共 ${files.length} 个文件`);
  } else {
    console.log("⚠️ upload_artifacts 目录不存在，跳过上传");
  }
};
