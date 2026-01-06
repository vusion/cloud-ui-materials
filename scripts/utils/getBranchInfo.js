const { execCommand } = require('./execCommand');

// 支持两种格式：
// 1. <前缀>/<任务ID>/<库名>-<简短描述> 例如: feature/12345/cw_countup-add-animation
// 2. <前缀>/<库名>-<简短描述> 例如: feature/cw_countup-add-animation
const branchReg =
    /^([a-z]+)\/(?:([a-zA-Z0-9_-]+)\/)?([a-zA-Z0-9_-]+)-(.+)$/i;

module.exports.getBranchInfo = async () => {
    const branchName = await execCommand('git branch --show-current');
    const matchResult = branchReg.exec(branchName);
    console.log('branch name:', branchName);
    if (!matchResult) throw new Error('invalid branch name. skip the rest!');
    
    const prefix = matchResult[1]; // 前缀 (feature, fix, etc.)
    const taskId = matchResult[2] || ''; // 任务ID (可选)
    const libraryName = matchResult[3]; // 库名 (必填)
    const description = matchResult[4]; // 描述 (必填)
    
    return [libraryName, taskId];
};
