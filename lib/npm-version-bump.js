const exec = require('child_process').exec;

const gitMsgRgx = /\[(major|minor|patch)\]/ig;
const defaultSemver = 'patch';

const parseRgx = (str, rgx, def) => (rgx.test(str) && rgx.exec(str)[1].toLowerCase()) || def;

function getVersion(versionRgx, versionDef, cb){
  console.log('getVersion()', versionRgx, versionDef);

  /* eslint no-unused-vars: "off" */
  exec('git log -1 --pretty=format:%s', (error, stdout, stderr) => {
    cb(parseRgx(stdout, versionRgx, versionDef));
  });
}

function versionBump(version) {
  console.log('versionBump()', 'npm version ' + version);

  /* eslint no-console: "off" */
  exec('npm version ' + version, (error, stdout, stderr) => error && console.error(error));
}

function npmVersionBump(versionRgx, versionDef){
  console.log('npmVersionBump()', versionRgx, versionDef);

  getVersion(versionRgx || gitMsgRgx, versionDef || defaultSemver, versionBump);
}

module.exports = npmVersionBump;
