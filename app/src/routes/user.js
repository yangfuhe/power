const Router = require('koa-router')

const user = require('../controllers/user')

const router = Router({
    prefix: '/user'
})
router.post('/create', checkLogin, checkPower, user.create)
router.post('/modify', checkLogin, checkPower, user.modify)
router.post('/modifyPwd', checkLogin, checkPower, user.modifyPwd)
router.post('/remove', checkLogin, checkPower, user.remove)
router.get('/list', checkLogin, checkPower, checkPower, user.list)
router.get('/roles', checkLogin, checkPower, user.roles)
router.post('/login', user.login)
router.post('/loginOut', user.loginOut)
router.post('/session', checkLogin, user.session)


module.exports = router;