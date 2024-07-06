const fs = require('node:fs')
const path = require('path')

// 获取本地文件树状结构
function readFileTree(options = {}) {
    let {
        name = 'name',
        children = 'children',
        depth = Infinity,
        path: pathStr = __dirname,
        excludes = []
    } = options
    const files = []

    const startReadFileTree = (pathStr, files, depth, level = 1) => {
        depth = depth < 1 ? 1 : depth
        if ((depth < level) && (depth !== Infinity)) return
        const result = fs.readdirSync(pathStr)
        result.forEach((item, index) => {
            const flag = excludes.some(rule => {
                if (new RegExp(`\\${rule}$`).test(item) || (rule === item)) {
                    return true
                }
                return false
            })
            if (flag) {
                return
            }
            const statResult = fs.statSync(path.resolve(pathStr, item))
            const fileStat = {
                [name]: item,
                path: path.resolve(pathStr, item),
                extname: path.extname(item),
                isFile: statResult.isFile(),
                isDirectory: statResult.isDirectory(),
                level: level,
                [children]: []
            }
            files[index] = fileStat
            if (fileStat.isDirectory) {
                startReadFileTree(fileStat.path, fileStat[children], depth, level + 1)
            }
        })
    }
    startReadFileTree(pathStr, files, depth)
    return files
}

module.exports = {
    readFileTree
}