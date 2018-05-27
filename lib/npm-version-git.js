const proc = require('child_process');

const gitMsgRgx = /\[(major|minor|patch)\]/ig;
const defaultSemver = 'patch';

const parseRgx = (str, rgx, def) => {
  const res = rgx.exec(str);
  return (res && res[1].toLowerCase()) || def;
};

/* eslint no-console: "off" */
const log = (error, stdout, stderr) => {
  if (error) console.error(error);
  else if (stdout) console.log(stdout);
};

function getVersion(versionRgx, versionDef, cb) {
  /* eslint no-unused-vars: "off" */
  proc.exec('git log -1 --pretty=format:%s', (error, stdout, stderr) => {
    cb(parseRgx(stdout, versionRgx, versionDef));
  });
}

function versionBump(version) {
  const cmd = `npm version ${version} --force`;
  console.log(cmd);

  proc.exec(cmd, log);
}

function npmVersionBump(versionRgx, versionDef) {
  getVersion(versionRgx || gitMsgRgx, versionDef || defaultSemver, versionBump);
}

module.exports = npmVersionBump;
