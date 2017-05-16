const exec = require('child_process').exec;

const gitMsgRgx = /\[(major|minor|patch)\]/ig;
const gitLogCmd = "git log -1 --pretty=format:%s";
const defaultSemver = 'patch';
exec(gitLogCmd, function(error, stdout, stderr) {
  const regRes = gitMsgRgx.exec(stdout);
  const version = (regRes && regRes[1].toLowerCase()) || defaultSemver;

  console.log(version)
});
