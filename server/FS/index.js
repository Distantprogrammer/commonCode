const readFileList = require('./readFileList/index.js')
const editFile = require('./editFile/index.js')
const editFolder = require('./editFolder/index.js')

module.exports = {
  ...readFileList,
  ...editFile,
  ...editFolder
}