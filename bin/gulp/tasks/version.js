const FileUtils = require('../utils/file')

const versionTask = (versileFile, content = '{}') => {
    return (done) => {
        try {
            FileUtils.createFileSync(versileFile, content);
        } catch (error) {
        }
        done();
    }
}

module.exports = {
    versionTask
}