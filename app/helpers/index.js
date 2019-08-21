let DB = require("./DB")
let RedisStore = require("./RedisStore");
let koaLogger = require("./koa-logger")
global.moment = require("moment");
global.config = require('../config');
global.db = new DB(config.mysql)
let store = new RedisStore(config.redis);
global.checkLogin = async(ctx, next) => {
    if (!ctx.session.user) {
        ctx.body = { errMsg: "您还未登录或登录已超时,请重新登录", notLogged: true }
    } else {
        ctx.session.refresh();
        await next();
    }
}
global.strTrim = str => (str || "").replace(/(^\s*)|(\s*$)/g, "")
global.checkPower = async(ctx, next) => {
    let url = ctx.request.url.split('?')[0]
    let index = url.indexOf("/", 2)
    url = url.substr(index + 1)
    let flag = true;
    for (let p of ctx.session.power) {
        if (p.addr == url) {
            flag = false;
            break;
        }
    }
    if (flag) {
        ctx.body = { errMsg: "您暂无权限执行此操作" }
    } else {
        await next();
    }
}



let logs = async(ctx, next) => {
    let noCheckPowerUrl = {
        "user/session": "获取session信息",
        "user/login": "登录",
        "user/loginOut": "退出登录",
        "personal/info": "获取个人主页信息"
    }
    let ip = ctx.req.headers['x-forwarded-for'] ||
        ctx.req.connection.remoteAddress ||
        ctx.req.socket.remoteAddress ||
        ctx.req.connection.socket.remoteAddress;
    let userIdPre = ctx.session.user ? ctx.session.user.id : 0;
    let oTime = Date.now();
    let method = ctx.request.method;
    let url = ctx.request.url.split('?')[0];
    let des = '';
    let path = url.split('?')[0]
    let index = path.indexOf("/", 2)
    path = path.substr(index + 1)
    des = noCheckPowerUrl[path] || ''
    if (!des && ctx.session.power) {
        for (let p of ctx.session.power) {
            if (p.addr == path) {
                des = p.name
                break;
            }
        }
    }
    try {
        await next();
        let userIdFix = ctx.session.user ? ctx.session.user.id : 0;
        let userId = userIdPre || userIdFix;
        let err = ctx.body ? ctx.body.errMsg || ctx.body.errBox || '' : '';
        db.create(`insert into logs (ip,userId,oTime,method,url,des,err,type,status) values (?)`, [
            [ip, userId, oTime, method, url, des, err, err ? 2 : 1, ctx.response.status]
        ])
    } catch (e) {
        console.log(e);
        let userIdFix = ctx.session.user ? ctx.session.user.id : 0;
        let userId = userIdPre || userIdFix;
        db.create(`insert into logs (ip,userId,oTime,method,url,des,err,type,status,errDetail) values (?)`, [
            [ip, userId, oTime, method, url, des, e.message, 3, ctx.response.status, JSON.stringify(e.stack)]
        ])
        ctx.body = { errMsg: "系统异常" }
    }
}

let trim = async(ctx, next) => {
    let params = ctx.request.method == "GET" ? ctx.request.query : ctx.request.query;
    let run = param => {
        for (let p in param) {
            if (typeof param[p] == "string") {
                param[p] = strTrim(param[p])
            } else if (typeof param[p] == "object") {
                run(param[p])
            }
        }
    }
    run(params);
    await next();
}

module.exports = {
    store,
    logs,
    koaLogger,
    trim
}