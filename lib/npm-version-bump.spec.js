const proc = require('child_process');
const npmVersionBump = require('./npm-version-bump');

describe('npm-version-bump spec', () => {
  let gitErr;
  let gitStdout;
  let gitStderr;
  let npmErr;
  let npmStdout;
  let npmStderr;

  function fakeExec(cmd, cb) {
    if (/git/.test(cmd)) {
      cb(gitErr, gitStdout, gitStderr);
    } else if (/npm/.test(cmd)) {
      cb(npmErr, npmStdout, npmStderr);
    }
  }

  beforeEach(() => {
    spyOn(proc, 'exec').and.callFake(fakeExec);
    spyOn(console, 'log');
  });

  it('should exec "npm version patch" by default', () => {
    npmVersionBump();
    expect(proc.exec).toHaveBeenCalledWith('npm version patch', jasmine.any(Function));
  });

  it('should exec "npm version minor" for commit "fix issue [minor]"', () => {
    gitStdout = 'fix issue [minor]';
    npmVersionBump();
    expect(proc.exec).toHaveBeenCalledWith('npm version minor', jasmine.any(Function));
  });

  it('should exec "npm version minor" by default when "-def minor"', () => {
    npmVersionBump(null, 'minor');
    expect(proc.exec).toHaveBeenCalledWith('npm version minor', jasmine.any(Function));
  });

  it('should exec "npm version major" for commit "fix issue v=major" when "-rgx v=(patch|minor|major)"', () => {
    gitStdout = 'fix issue v=major';
    npmVersionBump(/v=(patch|minor|major)/ig);
    expect(proc.exec).toHaveBeenCalledWith('npm version major', jasmine.any(Function));
  });
});
