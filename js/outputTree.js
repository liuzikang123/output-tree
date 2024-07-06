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

module.exports = {
    outputTree
}