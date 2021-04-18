const childProcess = jest.createMockFromModule("child_process");
childProcess.execSync = jest.fn();

module.exports = childProcess;
