const exec = require('child_process').exec;

const gitMsgRgx = /\[(major|minor|patch)\]/ig;
const gitLogCmd = 'git log -1 --pretty=format:%s';
const defaultSemver = 'patch';

/* eslint no-unused-vars: "off" */
exec(gitLogCmd, (error, stdout, stderr) => {
  const regRes = gitMsgRgx.exec(stdout);
  const version = (regRes && regRes[1].toLowerCase()) || defaultSemver;

  /* eslint no-console: "off" */
  console.log(version);
});
