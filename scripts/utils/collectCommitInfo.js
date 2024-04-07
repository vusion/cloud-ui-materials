const { execCommand } = require('./execCommand');
const mergewith = require('lodash.mergewith');

const titleReg = /^(\S+?)(?:\((\S+)\))?\s*[\:\：](.*)/g;
const breakchangeReg = /^BREAKING CHANGE\s*[\:\：]\s*(\S.*)/g;

module.exports.collectCommitInfo = async (defaultLibraryName) => {
    const commitsRaw = await execCommand(
        `git log --format===='%n%H;%h;%an;%ae%n%B' origin/main..HEAD`
    );
    const tmpResult = {};
    const revertCommitMap = {};
    commitsRaw.split('===').forEach((commitStr) => {
        if (!commitStr) return;
        const lines = commitStr.split('\n');
        const [hash, shotHash, authorName, authorEmail] = lines[1].split(';');
        if (revertCommitMap[hash]) {
            // current commit has been reverted
            return;
        }
        lines.slice(2).forEach((_line) => {
            const line = _line.trim();
            const titleResult = titleReg.exec(line);
            const breakChangeResult = breakchangeReg.exec(line);
            let libraryName = defaultLibraryName;
            if (titleResult) {
                const type = getRealType(titleResult[1]);
                if (titleResult[2]) libraryName = titleResult[2];
                const subject = titleResult[3];
                if (type === 'revert') {
                    revertCommitMap[libraryName] = true;
                    return;
                }
                if (type && libraryName) {
                    merge(tmpResult, {
                        [libraryName]: {
                            [type]: [
                                {
                                    subject,
                                    hash,
                                    shotHash,
                                    authorName,
                                    authorEmail,
                                },
                            ],
                        },
                    });
                }
            }
            if (breakChangeResult) {
                const breakingChange = breakChangeResult[1];
                if (breakingChange || libraryName) {
                    merge(tmpResult, {
                        [libraryName]: {
                            breakingChange: [
                                {
                                    subject: breakingChange,
                                    authorName,
                                    authorEmail,
                                    hash,
                                    shotHash,
                                },
                            ],
                        },
                    });
                }
            }
        });
    });
    return tmpResult;
};

const getRealType = (type) => {
    if (/^fix$/i.test(type)) return 'fix';
    if (/^feat$/i.test(type)) return 'feat';
    if (/^revert$/i.test(type)) return 'revert';
};

const merge = (a, b) =>
    mergewith(a, b, (source, target) => {
        if (Array.isArray(source)) return source.concat(target);
    });
