let userInfo = async userId => {
    return await db.findOne(`select u.userName,u.realName,r.roleName 
    from users u left join roles r on u.roleId = r.id where u.id = ? limit 1`, [userId]);
    return user;
}

let loginInfo = async userId => {
    return await db.findOne(`select ip,oTime from logs 
    where des='登录' and type = 1 and userId = ? order by oTime DESC limit 1 `, [userId])

}

let powerInfo = async userId => {
    return await db.find(`select p.* from users u left join rolePower rp on u.roleId = rp.roleId left join powers p 
    on rp.powerId = p.id where p.isDelete = 1 and u.id = ? order by type`, [userId])
}

module.exports = {
    userInfo,
    loginInfo,
    powerInfo
}