const fs = require('fs')
const path = require('path')
const { v4: uuidv4 } = require('uuid')
const isNeedArr = require('./needArr.js').isNeedArr
const isHiddenArr = require('./needArr.js').isHiddenArr
/**
 * 判断是文件还是文件夹
 * @param {*} path
 * @returns
 */
function checkFileType(stats) {
  try {
    if (stats.isFile()) {
      return 'file'
    } else if (stats.isDirectory()) {
      return 'folder'
    } else {
      return 'unknown'
    }
  } catch (err) {
    console.error('无法获取文件或文件夹的状态信息:', err)
    return 'unknown'
  }
}
function getFileTree(dirPath, basePath = dirPath) {
  const stats = fs.statSync(dirPath)
  const label = path.basename(dirPath)
  const relativePath = path.relative(basePath, dirPath) || path.basename(dirPath)

  if (label && (isHiddenArr.includes(label) || (relativePath.includes('node_modules') || relativePath.includes('file-tree.json')))) {
    return {
      label: label,
      type: checkFileType(stats),
      location: relativePath,
      content: ''
    }
  }
  if (stats.isDirectory() && isNeedArr.includes(path.extname(dirPath).slice(1))) {
    const childrenNames = fs.readdirSync(dirPath);
    const folders = [];
    const files = [];
    childrenNames.forEach(child => {
      const childPath = path.join(dirPath, child);
      const stats = fs.statSync(childPath);
      if (stats.isDirectory()) {
        folders.push(child);
      } else {
        files.push(child);
      }
    });
    folders.sort();
    files.sort();
    const sortedChildren = [...folders, ...files];
    return {
      label: label,
      location: relativePath,
      type: checkFileType(stats),
      id: uuidv4(),
      children: sortedChildren
        .map(child => getFileTree(path.join(dirPath, child), basePath) || '')
        .filter(Boolean), // 过滤掉 undefined 或 null
      leaf: true
    }
  } else {
    // 判断是否为图片或视频文件
    const ext = path.extname(dirPath).toLowerCase()
    // const imageExts = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp', '.svg']
    // const videoExts = ['.mp4', '.avi', '.mov', '.mkv', '.webm', '.flv', '.wmv']
    const needToRead = ['.txt', '.md', '.json', '.js', '.vue', '.html', '.css', '.scss']
    if (needToRead.includes(ext)) {
      return {
        label: label,
        type: checkFileType(stats),
        location: relativePath,
        content: fs.readFileSync(dirPath, 'utf-8')
      }
    } else {
      return {
        label: label,
        type: checkFileType(stats),
        location: relativePath
      }
    }
  }
}

// 支持传入多个目录
function getMultiFileTree(dirPaths) {
  return dirPaths.map(dir =>
    getFileTree(path.resolve(__dirname, dir), path.resolve(__dirname, dir))
  )
}

// 示例：传入多个目录
const targetDirs = ['src', 'childrenApp'] // 这里写你要获取的目录
const trees = getMultiFileTree(targetDirs)

// 输出到文件
fs.writeFileSync(
  path.resolve(__dirname + '/src/components/ViewSource/data', 'file-tree.json'),
  JSON.stringify(trees, null, 2),
  'utf-8'
)

console.log('多目录文件树已生成：file-tree.json')
