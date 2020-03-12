let PATH = require("path")
let SEP = PATH.sep //根据对应系统生成不同的分隔符

const { version } = require('../package');
 //console.log(process.env);
// console.log(process.platform);
const currentPlatformKey = process.platform === 'win32' ? 'USERPROFILE' : 'HOME';
const downloadDirPath = `${process.env[currentPlatformKey]}${SEP}.nue-template`;

 //console.log(downloadDirPath);
module.exports = {
  version,
  downloadDirPath,
};
