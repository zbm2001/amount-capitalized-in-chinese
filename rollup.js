// 项目下直接命令$ node rollup.js

const fs = require('fs')
const rollup = require('rollup')
const uglifyjs = require('uglify-js')
const rollupConfig = require('./rollup.config.js')
const rc = {
  input: rollupConfig.input,
  plugins: rollupConfig.plugins
}

let output = rollupConfig.output ? Array.isArray(rollupConfig.output) ? rollupConfig.output : [rollupConfig.output] : []

// 只输出有指定的引用模式，未指定输出全部引用模式
let argv = process.argv.slice(2)
if (argv.length) {
  let filterOutput = output.filter(o => argv.indexOf(o.format) > -1)
  if (filterOutput.length) output = filterOutput
}


/**
 * JS压缩最小化
 * @param  {String} code JS代码源文本
 * @return {String} 返回压缩后的代码文本
 */
function minify(code) {
  let minifyOptions = {
    fromString: true
  }
  let result = uglifyjs.minify(code, minifyOptions)
  return result.code
}

rollup.rollup(rc).then(bundle => {

  output.forEach(target => {
    bundle.generate(target).then(result => {
      result.output.forEach(({code, fileName, map}) => {
        // file 生成的目标文件
        fs.writeFileSync(fileName, code)

        // 若指定压缩最小化文件
        if (target.minimize) {
          let minMain = fileName.replace(/(?=\.js$)/, '.min')
          minMain === fileName && (minMain += '.min')
          fs.writeFileSync(minMain, target.banner + minify(result.code))
        }
      })
    })
  })

  // bundle写入方式
  // output.forEach(bundle.write, bundle)

}).catch(e => {
  process.stderr.write(e.message + '\n')
  process.exit(1)
})
