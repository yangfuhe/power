let userModel = require("../models/user")

let roles = async ctx => {
    ctx.body = await userModel.roles()
}

let create = async ctx => {
    ctx.body = await userModel.create(ctx.request.body)
}

let modify = async ctx => {
    ctx.body = await userModel.modify(ctx.request.body)
}

let list = async ctx => {
    ctx.body = await userModel.list()
}

let remove = async ctx => {
    ctx.body = await userModel.remove(ctx.request.body)
}

let modifyPwd = async ctx => {
    ctx.body = await userModel.modifyPwd(ctx.request.body)
}

let login = async ctx => {
    let user = await userModel.login(ctx.request.body);
    if (!user) {
        ctx.body = { errMsg: "用户名或密码输入有误" }
    } else if (user.forbidden == 2) {
        ctx.body = { errMsg: "该用户已被禁用" }
    } else {
        let powers = await userModel.powers(user);
        ctx.session.refresh();
        ctx.session.user = user;
        ctx.session.menu = powers.menu;
        ctx.session.power = powers.power;
        ctx.body = powers.menu;
    }
}

let loginOut = async ctx => {
    ctx.session.user = "";
    ctx.session.menu = "";
    ctx.session.power = "";
    ctx.body = "success";
}
let session = async ctx => {
    if (!ctx.session || !ctx.session.user) {
        ctx.body = { errMsg: "您还未登录或登录已超时" }
    } else {
        ctx.body = { user: ctx.session.user, menu: ctx.session.menu }
    }

}

module.exports = {
    roles,
    create,
    modify,
    list,
    remove,
    modifyPwd,
    login,
    loginOut,
    session
}