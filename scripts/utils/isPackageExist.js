const fsp = require('fs').promises;
const path = require('path');

const isPackageExist = async (libraryName) => {
    const [prefix] = libraryName.split(/[\-\_]/);

    let targetPackagesDir = path.join('.', 'packages', prefix.length === libraryName.length ? '' : prefix, libraryName);
    try {
        await fsp.access(targetPackagesDir, fsp.constants.R_OK | fsp.constants.W_OK);
        return targetPackagesDir;
    } catch {
        try {
            targetPackagesDir = path.join('.', libraryName);
            await fsp.access(targetPackagesDir, fsp.constants.R_OK | fsp.constants.W_OK);
            return targetPackagesDir;
        } catch {
            return null;
        }
    }
};

module.exports.isPackageExist = isPackageExist;

// isPackageExist('noexist_library').then((v) => console.log(v));
