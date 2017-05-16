const exec = require('child_process').exec;

const gitMsgRgx = /\[(major|minor|patch)\]/ig;
const defaultSemver = 'patch';

const parseRgx = (str, rgx, def) => {
  // console.log('parseRgx()', str, rgx, def);

  const res = rgx.exec(str);
  return (res && res[1].toLowerCase()) || def;
};

function getVersion(versionRgx, versionDef, cb) {
  // console.log('getVersion()', versionRgx, versionDef);

  /* eslint no-unused-vars: "off" */
  exec('git log -1 --pretty=format:%s', (error, stdout, stderr) => {
    cb(parseRgx(stdout, versionRgx, versionDef));
  });
}

/* eslint no-console: "off" */
function versionBump(version) {
  const cmd = `npm version ${version}`;
  console.log(cmd);

  exec(cmd, (error, stdout, stderr) => {
    stdout && console.log(stdout);
    error && console.error(error);
  });
}

function npmVersionBump(versionRgx, versionDef) {
  // console.log('npmVersionBump()', versionRgx, versionDef);

  getVersion(versionRgx || gitMsgRgx, versionDef || defaultSemver, versionBump);
}

module.exports = npmVersionBump;
