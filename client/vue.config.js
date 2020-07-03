// Vue additional configuration

module.exports = {
    configureWebpack: {
      module: {
        rules: [
          {
            test: /\.ya?ml$/,
            type: 'json', // Required by Webpack v4
            use: 'yaml-loader'
          }
        ]
      }
    },
    devServer: {
        overlay: {
          warnings: true,
          errors: true
        }
      }
  }