let roleModel = require('../models/role');

let create = async ctx => {
    ctx.body = await roleModel.create(ctx.request.body)
}

let modify = async ctx => {
    ctx.body = await roleModel.modify(ctx.request.body)
}

let remove = async ctx => {
    ctx.body = await roleModel.remove(ctx.request.body)
}

let list = async ctx => {
    ctx.body = await roleModel.list();
}

let powers = async ctx => {
    ctx.body = await roleModel.powers(ctx.request.query);
}

let modifyPowers = async ctx => {
    ctx.body = await roleModel.modifyPowers(ctx.request.body);
}

module.exports = {
    create,
    modify,
    remove,
    list,
    powers,
    modifyPowers
}