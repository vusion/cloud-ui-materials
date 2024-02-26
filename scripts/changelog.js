const fsp = require('fs').promises;
const path = require('path');

const { updatePullRequest } = require('./utils/updatePR');
const { collectCommitInfo } = require('./utils/collectCommitInfo');
const { isPackageExist } = require('./utils/isPackageExist');
const { genChangeLog, taskURL } = require('./utils/genChangeLog');
const { getBranchInfo } = require('./utils/getBranchInfo');
const { tryAmendCommit } = require('./utils/tryAmendCommit');
const { execCommand } = require('./utils/execCommand');

const main = async () => {
    const isCI = process.argv[2] === 'from-ci';
    const isComment = process.argv[2] === 'from-comment';
    const noCommit = process.argv[2] === 'no-commit';
    const [branchName, taskID] = await getBranchInfo();
    const commitInfo = await collectCommitInfo(branchName);
    await writeChangeLog(commitInfo, taskID, isCI, isComment, noCommit);
};

const writeChangeLog = async (info, taskID, isCI = false, isComment = false, noCommit = false) => {
    const rawInfos = await Promise.all(
        Object.entries(info).map(async ([libraryName, libraryInfo]) => {
            const targetPackagesDir = await isPackageExist(libraryName);
            if (!targetPackagesDir) return null;
            const changelogFile = path.join(targetPackagesDir, 'CHANGELOG.md');
            const packageFile = path.join(targetPackagesDir, 'package.json');

            const packageVersionContent = await fsp.readFile(packageFile, {
                encoding: 'utf8',
            });
            const version = JSON.parse(packageVersionContent).version;
            let ans = '';
            ans += `## ${version}\n\n`;
            ans += `Associated Task: [#${taskID.slice(0, 6)}](${taskURL}${taskID})\n\n`;
            ans += genChangeLog(libraryInfo, taskID);
            const currentAdded = ans;
            console.log('🚀 ~ file: changelog.js:67 ~ Object.entries ~ isCI:', isCI);
            console.log('🚀 ~ file: changelog.js:67 ~ Object.entries ~ isComment:', isComment);
            if (isCI) return [libraryName, currentAdded];
            let content = '';
            try {
                content = await fsp.readFile(changelogFile, {
                    encoding: 'utf8',
                });
            } catch {
                // do nothing;
            }
            const trimConent = content.trimStart();

            if (trimConent.startsWith(`## ${version}`)) {
                const index = trimConent.slice(`## ${version}`.length).search(/(?<!\#)\#\#(?!#)/);
                if (~index) {
                    ans += trimConent.slice(`## ${version}`.length + index);
                }
            } else {
                ans += content;
            }
            console.log(ans);
            await fsp.writeFile(changelogFile, ans, 'utf-8');
            return [libraryName, currentAdded];
        })
    );
    const realInfos = rawInfos.filter(Boolean);

    let ans = '';
    realInfos.forEach(([libraryName, content]) => {
        ans += `## ${libraryName}\n\n`;
        ans += content;
        ans += '\n\n';
    });
    if (isCI) {
        console.log('is message:\n', ans);
        await updatePullRequest(ans);
    } else if (isComment) {
        await tryAmendCommit(true);
        await execCommand(`git pull && git push`);
    } else if (!noCommit) {
        await tryAmendCommit();
    }
};

// throw new Error('manualy error');
main().catch((e) => {
    // eslint-disable-next-line no-console
    console.error(e);
});
