const prod = require('./prod.json')
const dev = require('./dev.json')

const isProd = process.env.VUE_APP_ENV === "prod"

module.exports = isProd ? prod : dev
export {}