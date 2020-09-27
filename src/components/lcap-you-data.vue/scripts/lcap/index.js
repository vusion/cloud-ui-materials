const path = require('path');
const fs = require('fs-extra');

const root = path.join(__dirname, '../../');
require('child_process').execSync('npx vusion lcap', {
    cwd: root,
});
const usagePath = path.join(__dirname, '../../usage.json');
const usage = require(usagePath);
const packageJSON = require('../../package.json');
const libInfo = `${packageJSON.name}@${packageJSON.version}`;
let screenShot = JSON.parse(usage.screenShot);
screenShot = screenShot.map((screen) => `https://static-vusion.163yun.com/packages/${libInfo}/screenshots/${screen}`);
usage.jsonSchema.screenShot = usage.screenShot = screenShot.join(',');
fs.writeFileSync(usagePath, JSON.stringify(usage, null, 4));
