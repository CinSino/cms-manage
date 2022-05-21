const path = require('path')

module.exports = {
  publicPath: '/cms-manage/',
  outputDir: 'dist',
  lintOnSave: true,
  devServer: {
    host: '127.0.0.1',
    port: '3001',
    open: true,
    proxy: {
      '/api/atlas-cms': {
        target: 'http://127.0.0.1:3300',
        pathRewrite: {
          '^/api/atlas-cms': '/atlas-cms'
        }
      }
    }
  },
  chainWebpack: (config) => {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type => {
      addStyleResource(config.module.rule('less').oneOf(type))
    })
    // 设置src别名
    config.resolve.alias.set('@', path.resolve(__dirname, './src'))
  }
}

function addStyleResource (rule) {
  rule.use('style-resource').loader('style-resources-loader').options({
    patterns: [path.resolve(__dirname, './src/style/mixin.less')]
  })
}
