let i = 0;
const postcss = require("postcss");
const path = require('path');
const pkgUrl = path.resolve(process.cwd(),"./package.json")
const pkg = require(pkgUrl)
const loaderUtils = require('loader-utils');
module.exports = function (source, map, data) {
  const options = loaderUtils.getOptions(this); // 读取配置

  // console.log(source);
    const AST = postcss.parse(source)
  AST.nodes.map(item => {
    // console.log(item);
    if (item.type === 'rule') {
        if (item.selector === ":root") {
          
        } else {
          const _selector = item.selector.split(',')
          const resultSelector =   _selector.map((selector, index) => { 
            // console.log(selector,selector.indexOf(options.excludesNameSpace[0])!==-1);
            if(selector,selector.indexOf(options.excludesNameSpace[0])!==-1){
              return `${selector}`
            }
            return  `.${pkg.name} ${selector}`
          })
          item.selector =resultSelector.toString()
        }
      }
      return item
    })
    // console.log(AST.nodes);
    // fs.writeFileSync(JSON.stringify(AST.nodes),"1.js",{encoding:"utf-8"})
    let newCss = ''
    postcss.stringify(AST, function (str) {
      newCss += str
    })
    // console.log(loaderUtils)
    // console.log(123)
    // console.log(source);
    i++;
    // console.log(i);
    // console.log(loaderUtils.getOptions());
    // console.log(source,data);
    // 获取 webpack 配置中传来的 option  
    // this.callback(null, addSign(source, options.sign))
    return newCss
  }