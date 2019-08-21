let roles = async() => {
    return await db.find(`select id,roleName from roles where isDelete = 1`)
}
let create = async params => {

    let count = await db.count(`select count(*) from users where userName = ?`, [params.userName])
    if (count) {
        return { errMsg: "该用户名已被使用，请换其他用户名" }
    }
    let sql = `insert into users(roleId,userName,password,realName,tel,email,remark,createTime) values(?)`;
    let sqlParams = [
        [
            params.roleId,
            params.userName,
            params.password,
            params.realName || "",
            params.tel || "",
            params.email || "",
            params.remark || "",
            Date.now()
        ]
    ]
    await db.create(sql, sqlParams);
    return "success"

}

let modify = async params => {
    let sql = `update users set  roleId = ?,userName = ?,
        realName = ?,tel = ?,email = ?,forbidden = ?,remark = ? where id = ?`
    let sqlParams = [
        params.roleId,
        params.userName,
        params.realName,
        params.tel,
        params.email,
        params.forbidden,
        params.remark,
        params.id
    ]
    let res = await db.modify(sql, sqlParams)
    return "success"
}

let list = async() => {
    return await db.find(`select u.id,u.roleId,u.userName,u.realName,u.tel,u.email,u.forbidden,u.remark,u.createTime, 
    r.roleName from users u left join roles r on u.roleId = r.id where u.isDelete = 1`)
}

let remove = async params => {
    await db.modify(`update users set isDelete = 2 where id = ?`, [params.id])
    return "success"
}

let modifyPwd = async params => {
    await db.modify(`update users set password = ? where id = ?`, [params.password, params.id])
    return "success"
}

let login = async params => {
    return await db.findOne(`select id,roleId,userName,realName,forbidden from users 
    where userName = ? and password = ? and isDelete = 1 limit 1`, [params.userName, params.password])
}

let powers = async params => {
    let menu = await db.find(`select p.* from rolePower rp left join powers p on rp.powerId = p.id where rp.roleId = ? and p.isDelete = 1 and p.type!=3 order by type,sort`, [params.id])
    let power = await db.find(`select p.addr,p.name from rolePower rp left join powers p on rp.powerId = p.id where rp.roleId = ? and p.isDelete = 1 and p.type=3 order by sort`, [params.id])
    return { menu, power }
}

module.exports = {
    roles,
    create,
    modify,
    list,
    remove,
    modifyPwd,
    login,
    powers
}