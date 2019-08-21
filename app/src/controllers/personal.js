let personalModel = require("../models/personal");

let info = async ctx => {
    let userId = ctx.session.user.id;
    let userInfo = await personalModel.userInfo(userId)
    let loginInfo = await personalModel.loginInfo(userId)
    let powerInfo = await personalModel.powerInfo(userId)
    ctx.body = {
        userInfo,
        loginInfo,
        powerInfo
    }
}

module.exports = {
    info
}