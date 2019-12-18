// next.config.js is not transformed by Babel. So you can only use javascript features supported by your version of Node.js.
const { resolve } = require('path')
const _ = require('lodash')

module.exports = {
  webpack: config => {
    // Perform customizations to webpack dev middleware config
    // Important: return the modified config
    const customConfig = {
      resolve: {
        alias: {
          '@/src': resolve(__dirname, './src'),
        }
      }
    }
    return _.merge(config, customConfig)
  }
}
