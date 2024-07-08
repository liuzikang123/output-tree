## 安装

```js
$ npm install output-tree
```

## 方法
``` js
readFileTree() // 读取文件的方法，输出一个树级结构对象
outputTree() // 传入树级结构的对象，输出一个tree的字符串目录结构
```

## 使用
``` js
const { outputTree } = require('output-tree')

const tree = [
    {
        name: 'home',
        children: [
            {
                name: 'index.vue',
            }
        ]
    },
    {
        name: 'about',
        children: [
            {
                name: 'index.vue',
            },
            {
                name: 'about-1',
                children: [
                    {
                        name: 'about-1.html',
                        children: []
                    },
                    {
                        name: 'about-1.css',
                        children: []
                    },
                ]
            }
        ]
    }
]

const result = outputTree({
    data: tree
})
console.log(result)

/**
 * // 输出
 * 
 * ├─home
 * │   └─index.vue
 * └─about        
 * │   ├─index.vue
 * │   └─about-1
 * │   │   ├─about-1.html
 * │   │   └─about-1.css
 *
 */
```

## 使用自定义key值
``` js

const { outputTree } = require('output-tree')

const tree = [
    {
        file: 'home',
        list: [
            {
                file: 'index.vue',
            },
            {
                file: 'test.txt'
            }
        ]
    }
]

const result = outputTree({
    data: tree,
    name: 'file',
    children: 'list'
})
console.log(result)

/**
 * // 输出
 * 
 * └─home
 * │   ├─index.vue
 * │   └─test.txt
 */

```

## 使用自定义模板
``` js
const tree = [
    {
        name: 'home',
        size: 10,
        children: [
            {
                name: 'index.vue',
                size: 9
            },
            {
                name: 'test.txt',
                size: 300
            }
        ]
    }
]

const result = outputTree({
    data: tree,
    template: '文件名：{name}, 文件大小：{size}kb'
})
console.log(result)

/**
 * // 输出
 * 
 * └─文件名：home, 文件大小：10kb
 * │   ├─文件名：index.vue, 文件大小：9kb
 * │   └─文件名：test.txt, 文件大小：300kb
 */
```

## outputTree属性

| 属性     | 必填    | 类型    |  说明   | Default |
| ------- | ------- | ------- | ------  | ------- |
| data    | 否       | object，array | name     | 类型    |
| name    | 否       | string | name的key值     | 'name'    |
| children | 否      | string | children的key值     | 'children'    |
| template | 否      | string | 自定义模板     | '{name}'    |
| depth    | 否      | number | 输出的层级有多深，默认无限深     | Infinity    |
| excludes    | 否       | array | ['.js', '.css', 'node_modules'] 需要忽略的后缀名或者是文件夹名称     | []    |
| indent    | 否      | number | 缩进，符号与文字的间隔     | 2    |






## 浏览器环境无法使用该方法：readFileTree
```js
const { readFileTree } = require('output-tree')
// 读取本地文件目录
const tree = readFileTree({
    name: 'name', // 输出的name名
    children: 'children', // 输出的children名
    depth: 1, // 读取文件的层级
    path: __driname, // 读取文件的路径
})
/**
 * [
 *  {
 *    name: 'index.js', // 文件名
 *    path: 'C:\\Users\\Administrator\\Desktop\\output-tree\\index.js', // 文件路径
 *    extname: '.js', // 文件后缀名
 *    isFile: true, // 是否是文件类型
 *    isDirectory: false, // 是否是目录类型
 *    level: 1, // 层级
 *    children: [] // 子节点list
 *  },
 *  {
 *    name: 'package.json',
 *    path: 'C:\\Users\\Administrator\\Desktop\\output-tree\\package.json',
 *    extname: '.json',
 *    isFile: true,
 *    isDirectory: false,
 *    level: 1,
 *    children: []
 *  },
 *  {
 *    name: 'README.md',
 *    path: 'C:\\Users\\Administrator\\Desktop\\output-tree\\README.md',
 *    extname: '.md',
 *    isFile: true,
 *    isDirectory: false,
 *    level: 1,
 *    children: []
 *  }
 *]
 */
```


## readFileTree属性

| 属性     | 必填    | 类型    |  说明   | Default |
| ------- | ------- | ------- | ------  | ------- |
| name    | 否       | string | name的key值     | 'name'    |
| children | 否      | string | children的key值     | 'children'    |
| depth    | 否      | number | 读取的文件层级有多深，默认无限深     | Infinity    |
| path    | 否       | string | 读取文件的路径,需要绝对路径     | __dirname    |
| excludes    | 否       | array | ['.js', '.css', 'node_modules'] 需要忽略的后缀名或者是文件夹名称     | []    |


## 结合使用

```js
const tree = readFileTree({
    name: 'file',
    children: 'fileList',
    depth: 3,
    path: __dirname
})
const result = outputTree({
   data: tree,
   name: 'file',
   children: 'fileList',
   depth: Infinity,
   template: '{file}'
})

```
