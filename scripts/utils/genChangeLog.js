const repoCommitURL = 'https://github.com/vusion/cloud-ui-materials/commit/';
const homepageURL = 'https://github.com/';
const taskURL =
    'https://ddmkhcgpt.netease-official.lcap.163yun.com/dashboard/addWorkOrder?workOrderId=';

module.exports.genChangeLog = ({ feat, fix, breakingChange }) => {
    let ans = '';
    Object.entries({
        '✨Features': feat,
        '🐛Bug Fixes': fix,
        '🚨BREAKING CHANGES': breakingChange,
    }).forEach(([title, entries]) => {
        if (!entries) return;
        ans += `### ${title}\n\n`;
        // ans += `Associated Task: [#${taskID.slice(0, 6)}](${taskURL}${taskID})\n\n`;

        entries.forEach(({ hash, shotHash, authorName, subject }) => {
            ans += `- [${shotHash}](${repoCommitURL}${hash}) Thanks [${authorName}](${homepageURL}${authorName}) ! - ${subject.trim()}\n`;
        });
        ans += '\n';
    });
    return ans;
};

module.exports.taskURL = taskURL;
