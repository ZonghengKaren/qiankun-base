'use strict'
const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}

const port = 8036 // 端口配置
const { name } = require('./package')

module.exports = {
  // hash 模式下可使用36
  publicPath: process.env.NODE_ENV === 'development' ? '/' : '/qiankun-base/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    port: port,
    open: false, // 启动项目以后自动打开浏览器
    hot: true, // 模块热替换(HMR - hot module replacement)功能会在应用程序运行过程中，替换、添加或删除 模块，而无需重新加载整个页面。主要是通过以下几种方式，来显著加快开发速度
    hotOnly: false, // hot 和 hotOnly 的区别是在某些模块不支持热更新的情况下，前者会自动刷新页面，后者不会刷新页面，而是在控制台输出热更新失败
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      '/auth': {
        target: 'http://192.168.13.157:8199',
        changeOrigin: true,
        pathRewrite: {
          '^/auth': 'auth'
        }
      }
    },
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },

  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
    output: {
      // 把子应用打包成 umd 库格式
      library: `${name}-[name]`,
      libraryTarget: 'umd',
      jsonpFunction: `webpackJsonp_${name}`
    },
  }
}
