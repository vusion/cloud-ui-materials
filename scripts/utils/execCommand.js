const { exec } = require('child_process');

module.exports.execCommand = async (commandStr) => {
    return new Promise((res, rej) => {
        exec(commandStr, (err, stdout, stderr) => {
            if (err) {
                rej(new Error(err.message));
                return;
            }
            if (stderr) {
                rej(new Error(stderr));
                return;
            }
            res(stdout);
        });
    });
};
