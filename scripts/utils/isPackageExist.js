const fsp = require('fs').promises;
const path = require('path');

module.exports.isPackageExist = async (libraryName) => {
    const [prefix] = libraryName.split(/[\-\_]/);

    const targetPackagesDir = path.join(
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
        return null;
    }
};
