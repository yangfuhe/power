import db from './db'

//资源配置
db.create('resources', {
        create: {
            url: '/resources/create',
            method: 'post',
        },
        modify: {
            url: '/resources/modify',
            method: 'post',
        },
        remove: {
            url: '/resources/remove',
            method: 'post',
        },
        list: {
            url: '/resources/list',
            method: 'get',
        }
    })
    //角色管理
db.create('role', {
    create: {
        url: '/role/create',
        method: 'post',
    },
    modify: {
        url: '/role/modify',
        method: 'post',
    },
    remove: {
        url: '/role/remove',
        method: 'post',
    },
    list: {
        url: '/role/list',
        method: 'get',
    },
    powers: {
        url: '/role/powers',
        method: 'get',
    },
    modifyPowers: {
        url: '/role/modifyPowers',
        method: 'post',
    }
})

//用户管理
db.create('user', {
        create: {
            url: '/user/create',
            method: 'post',
        },
        modify: {
            url: '/user/modify',
            method: 'post',
        },
        modifyPwd: {
            url: '/user/modifyPwd',
            method: 'post',
        },
        remove: {
            url: '/user/remove',
            method: 'post',
        },
        list: {
            url: '/user/list',
            method: 'get',
        },
        roles: {
            url: '/user/roles',
            method: 'get',
        },
        login: {
            url: '/user/login',
            method: 'post',
        },
        loginOut: {
            url: '/user/loginOut',
            method: 'post',
        },
        session: {
            url: '/user/session',
            method: 'post',
        }
    })
    //用户管理
db.create('log', {
    list: {
        url: '/log/list',
        method: 'get',
    }
})

//个人中心
db.create('personal', {
    info: {
        url: '/personal/info',
        method: 'get',
    }
})


global.db = db;