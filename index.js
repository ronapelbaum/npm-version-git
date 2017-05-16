const exec = require('child_process').exec;

const gitMsgRgx = /\[(major|minor|patch)\]/ig;
const defaultSemver = 'patch';

const gitLogExec = cb => exec('git log -1 --pretty=format:%s', cb);

const parseRgx = (str, rgx, def) => (rgx.test(str) && rgx.exec(str)[1].toLowerCase()) || def;

/* eslint no-unused-vars: "off" */
gitLogExec((error, stdout, stderr) => {
  /* eslint no-console: "off" */
  console.log(parseRgx(stdout, gitMsgRgx, defaultSemver));
});
