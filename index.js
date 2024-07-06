let fs = null
let path = null
if (typeof process !== 'undefined') {
    fs = require('node:fs')
    path = require('path')
}

// 获取本地文件树状结构
function readFileTree(options = {}) {
    let {
        name = 'name',
        children = 'children',
        depth = Infinity,
        path: pathStr = __dirname
    } = options
    const files = []

    const startReadFileTree = (pathStr, files, depth, level = 1) => {
        depth = depth < 1 ? 1 : depth
        if ((depth < level) && (depth !== Infinity)) return
        const result = fs.readdirSync(pathStr)
        result.forEach((item, index) => {
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


// 将树状结构数据输出为tree字符串
function outputTree(options = {}) {
    let {
        data,
        name = 'name',
        children = 'children',
        depth = Infinity,
        template = `{${name}}`
    } = options

    if (typeof data !== 'object' && data !== null) {
        data = []
    } else if (!Array.isArray(data)) {
        data = [data]
    }
    let str = ''
    let reg = /\{(\w+)\}/g
    let reg2 = /(\{\w+\})/g
    const attrs = []
    template.replace(reg, (...content) => {
        const [_, $1] = content
        attrs.push($1)
    })
    function startOutputTree(data, depth, level = 1) {
        depth = depth < 1 ? 1 : depth
        if ((depth < level) && (depth !== Infinity)) return
        data.forEach((item, index) => {
            let len = item[children]?.length
            let defaultSymobl = '│   '.repeat(level - 1)
            let symbol = index !== (data.length - 1) ? '├─' : '└─'
            let count = 0
            let result = template.replace(reg2, () => {
                const data = item[attrs[count++]]
                if (data === undefined || data === null) {
                    return ''
                }
                return data
            })
            str += `${defaultSymobl}${symbol}${result}\n`
            if (len) {
                startOutputTree(item[children], depth, level + 1)
            }
        })
    }
    startOutputTree(data, depth)
    return str
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = {
        readFileTree,
        outputTree
    }
} else {
    module.exports = {
        outputTree
    }
}