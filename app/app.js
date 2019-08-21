const Koa = require('koa')
const views = require('koa-views')
const session = require('koa-session2');
const static = require('koa-static');
const koaBody = require('koa-body');
const path = require('path')
const fs = require('fs')
const { store, logs, koaLogger, trim } = require("./helpers")
const router = require('./src/routes')
const app = new Koa()


app.use(koaLogger())

app.use(views('view', {
    map: {
        html: 'lodash'
    }
}));

app.use(static(path.join(__dirname, './static')))

app.use(session({
    store,
    maxAge: 30 * 60 * 1000 //单位毫秒
}));


app.use(koaBody({
    multipart: true,
    formidable: {
        uploadDir: path.join(__dirname, './temp'),
        maxFileSize: 2 * 1024 * 1024, // 设置上传文件大小最大限制，默认2M
        onFileBegin: (name, file) => {
            const dir = path.join(__dirname, `temp`);
            file.path = `${dir}/${name}`;
        },
    }
}));
//此日志记录在数据中
app.use(logs)

//去除参数的前后空格
app.use(trim)


app.use(router.routes(), router.allowedMethods())

app.listen("6660", function() {
    console.log('监听6660端口')
})