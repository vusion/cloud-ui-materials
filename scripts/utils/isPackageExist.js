const fs = require('fs');
const fsp = fs.promises;
const path = require('path');

const LIBRARY_INFO = {
    ...getAllSubdirectories('./packages/cw'),
    ...getAllSubdirectories('./packages/lcap'),
};

const isPackageExist = async (libraryName) => {
    if (LIBRARY_INFO[libraryName]) return LIBRARY_INFO[libraryName];

    console.warn('leagacy mode, should not be here');
    const [prefix] = libraryName.split(/[\-\_]/);

    let targetPackagesDir = path.join(
        '.',
        'packages',
        prefix.length === libraryName.length ? '' : prefix,
        libraryName
    );
    try {
        await fsp.access(
            targetPackagesDir,
            fsp.constants.R_OK | fsp.constants.W_OK
        );
        return targetPackagesDir;
    } catch {
        try {
            targetPackagesDir = path.join('.', libraryName);
            await fsp.access(
                targetPackagesDir,
                fsp.constants.R_OK | fsp.constants.W_OK
            );
            return targetPackagesDir;
        } catch {
            return null;
        }
    }
};

function getAllSubdirectories(directoryPath) {
    const files = fs.readdirSync(directoryPath);
    return Object.fromEntries(
        files.map((file) => [file, path.resolve(directoryPath, file)])
    );
}

module.exports.isPackageExist = isPackageExist;

// console.log('🚀 ~ file: isPackageExist.js:6 ~ LIBRARY_INFO:', LIBRARY_INFO);
