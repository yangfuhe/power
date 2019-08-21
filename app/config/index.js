// 本地开发
var dev = require('./dev');

// 正式环境
var pro = require('./pro');

var env = process.env.NODE_ENV || 'dev';

console.log('运行环境：' + env)
var configs = {
    dev,
    pro,
};

var defaultConfig = {
    env,

}

const config = Object.assign({}, defaultConfig, configs[env])

module.exports = config;