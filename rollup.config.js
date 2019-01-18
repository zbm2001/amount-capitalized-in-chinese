// 项目下直接运行命令 rollup -c

const babel = require('rollup-plugin-babel')
const buble = require('rollup-plugin-buble')
const resolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')
const replace = require('rollup-plugin-replace')
const pkg = require('./package.json')
const banner = '/*\n' +
  'name,version,description,author,license'.split(',')
    .map((k) => ` * @${k}: ${pkg[k]}`).join('\n') +
  '\n */\n'
const external = Object.keys(pkg.dependencies || {}).concat(Object.keys(pkg.devDependencies))
// 清除 npm 私有模块前缀，如：@scope/module-name => module-name
const filename = pkg.name.replace(/^@\S+\//, '')
// 变量名做驼峰标记法转换，如：module-name => moduleName
const name = filename.replace(/-([a-z])/g, (m, $1) => $1.toUpperCase())

module.exports = {
  input: 'src/index.js',
  plugins: [
    resolve({
      jsnext: true,
      main: true,
      browser: true,
    }),
    commonjs({
      // namedExports: {
      //   // left-hand side can be an absolute path, a path
      //   // relative to the current directory, or the name
      //   // of a module in node_modules
      //   'node_modules/my-lib/index.js': [ 'named' ]
      // }
    }),
    // babel 遵循 es2015+ 标准，但执行较慢
    // babel({
    //   exclude: 'node_modules/**'
    // }),
    // 结合 buble 比 babel 更快
    buble({
      exclude: 'node_modules/**'
    }),
    replace({
      exclude: 'node_modules/**',
      ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
    })
  ],
  external: external,
  output: [
    {
      banner,
      name,
      file: 'index.js',
      format: 'cjs'
    }, {
      banner,
      name,
      file: filename + '.amd.js',
      format: 'amd'
    }, {
      banner,
      name,
      file: filename + '.es.js',
      format: 'es'
    }, {
      banner,
      name,
      file: filename + '.iife.js',
      format: 'iife'
    }, {
      banner,
      name,
      file: filename + '.umd.js',
      format: 'umd'
    }
  ]
}
