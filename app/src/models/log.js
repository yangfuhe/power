let list = async params => {
    let sqlCount = ` select count(*) from logs l left join users u on l.userId = u.id where 1=1 `
    let sqlList = ` select l.*,u.userName,u.realName from logs l left join users u on l.userId = u.id where 1=1 `
    let sqlParams = [];
    if (params.userName) {
        let user = await db.findOne(`select id from users where userName = ? limit 1`, [params.userName])
        sqlList += ` and l.userId = ? `
        sqlParams.push(user.id)
    }
    if (params.ip) {
        sqlList += ` and l.ip = ? `
        sqlParams.push(params.ip)
    }
    if (params.beginTime) {
        sqlList += ` and l.oTime >= ? `
        sqlParams.push(params.beginTime)
    }
    if (params.endTime) {
        sqlList += ` and l.oTime <= ? `
        sqlParams.push(params.endTime)
    }
    if (params.url) {
        sqlList += ` and l.url = ? `
        sqlParams.push(params.url)
    }
    if (params.des) {
        sqlList += ` and l.des = ? `
        sqlParams.push(params.des)
    }
    if (params.type) {
        sqlList += ` and l.type = ? `
        sqlParams.push(params.type)
    }
    if (params.status) {
        sqlList += ` and l.status = ? `
        sqlParams.push(params.status)
    }
    let count = await db.count(sqlCount, sqlParams);
    sqlList += ` order by l.oTime DESC limit ?,? `
    params.pageNo = params.pageNo || 1;
    params.pageSize = params.pageSize || 2000;
    sqlParams.push((+params.pageNo - 1) * params.pageSize, +params.pageSize)
    let list = await db.find(sqlList, sqlParams);
    return { count, list }
}

module.exports = {
    list
}