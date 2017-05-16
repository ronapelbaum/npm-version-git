const npmVersionBump = require('./lib/npm-version-bump');

const gitMsgRgx = /\[(major|minor|patch)\]/ig;
const defaultSemver = 'patch';

npmVersionBump(gitMsgRgx, defaultSemver);
