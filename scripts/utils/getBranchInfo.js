const { execCommand } = require('./execCommand');

const branchReg =
    /^task(?:\(([a-zA-Z\-\_\d]+)\))?\-([a-zA-Z\_\d]+)\-([a-zA-Z\_\d]+)\-/i;

module.exports.getBranchInfo = async () => {
    const branchName = await execCommand('git branch --show-current');
    const matchResult = branchReg.exec(branchName);
    console.log('branch name:', branchName);
    if (!matchResult) throw new Error('invalid barnch name. skip the rest!');
    let libraryName = matchResult[1];
    const taskId = matchResult[2];
    if (!libraryName) {
        libraryName = matchResult[3];
    }
    return [libraryName, taskId];
};
