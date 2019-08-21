let logModel = require('../models/log');

let list = async ctx => {
    ctx.body = await logModel.list(ctx.request.query)
}

module.exports = {
    list
}