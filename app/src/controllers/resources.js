let resourcesModel = require('../models/resources');

let create = async ctx => {
    let params = ctx.request.body;
    ctx.body = await resourcesModel.create(params)
}

let modify = async ctx => {
    let params = ctx.request.body;
    ctx.body = await resourcesModel.modify(params)
}

let remove = async ctx => {
    let params = ctx.request.body;
    ctx.body = await resourcesModel.remove(params)
}


let list = async ctx => {
    let result = await resourcesModel.list();
    ctx.body = result;
}

module.exports = {
    create,
    modify,
    remove,
    list
}