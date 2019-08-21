let create = async params => {
    let sql = `insert into powers (superiorId,name,icon,iconFrom,type,addr,sort,remark,createTime) values(?)`
    let sqlParams = [
        [
            params.superiorId,
            params.name,
            params.icon,
            params.iconFrom,
            params.type,
            params.addr,
            params.sort,
            params.remark,
            Date.now()
        ]
    ]
    await db.create(sql, sqlParams);
    return "success"
}

let modify = async params => {
    let sql = `update powers set name = ?,icon = ?,iconFrom = ?,type = ?,addr = ? ,sort = ?,remark = ? where id = ?`;
    let sqlParams = [
        params.name,
        params.icon,
        params.iconFrom,
        params.type,
        params.addr,
        params.sort,
        params.remark,
        params.id
    ]
    await db.modify(sql, sqlParams);
    return "success"
}

let remove = async params => {
    let result;
    await db.beginTransaction();
    try {
        await db.run(`update powers set isDelete = 2 where id = ? or superiorId = ? `, [params.id, params.id])
        let powers2 = await db.find(`select * from powers where superiorId = ?`, [params.id]);
        if (powers2.length) {
            for (let p2 of powers2) {
                await db.run(`update powers set isDelete = 2 where superiorId = ?`, [p2.id])
            }
        }
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

let list = async() => {
    return await db.find(`select * from powers where isDelete = 1 order by type,sort`)
}

module.exports = {
    create,
    modify,
    remove,
    list
}