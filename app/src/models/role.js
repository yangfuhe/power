let create = async params => {
    let count = await db.count(`select count(*) from roles where roleName = ?`, [params.roleName])
    if (count) {
        return { errMsg: "该角色名已被使用，请换其他角色名" }
    }
    let sql = `insert into roles (roleName,remark,createTime) values(?)`;
    let sqlParams = [
        [params.roleName, params.remark, Date.now()]
    ]
    await db.create(sql, sqlParams);
    return "success"
}

let modify = async params => {
    let sql = `update roles set roleName = ? ,remark = ? where id = ?`
    let sqlParams = [params.roleName, params.remark, params.id];
    await db.modify(sql, sqlParams);
    return "success"
}

let remove = async params => {
    let sql = `select count(*) from users where roleId = ? and isDelete = 1`
    let count = await db.count(sql, [params.id]);
    if (count) return { errMsg: "请先删除所有属于该角色的用户" }
    await db.modify(`update roles set isDelete = 2 where id = ?`, [params.id])
    return "success"
}

let list = async() => {
    return await db.find(`select * from roles where isDelete = 1 order by createTime`)
}

let powers = async params => {
    return await db.find(`select p.id,p.superiorId from rolePower rp left join powers p on rp.powerId = p.id where rp.roleId = ? and p.isDelete = 1 order by type`, [params.id])
}

let modifyPowers = async params => {
    let result;
    await db.beginTransaction();
    try {
        await db.run(`delete from rolePower where roleId = ?`, [params.roleId]);
        let sql = `insert into rolePower(roleId,powerId) values `;
        let sqlParams = [];
        for (let i in params.powerIds) {
            sql += ` (?) `
            sqlParams.push([params.roleId, params.powerIds[i]]);
            if (+i + 1 < params.powerIds.length) {
                sql += `, `
            }
        }
        await db.run(sql, sqlParams);
        await db.commit();
        result = "success"
    } catch (err) {
        await db.rollback()
        throw err;
    } finally {
        db.release();
    }
    return result
}


module.exports = {
    create,
    modify,
    remove,
    list,
    powers,
    modifyPowers
}