const { outputTree } = require('./js/outputTree')

let readFileTree = null
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    readFileTree = require('./js/readFileTree').readFileTree
}

module.exports = {
    readFileTree,
    outputTree
}