const Router = require('koa-router')

const role = require('../controllers/role')

const router = Router({
    prefix: '/role'
})

router.post('/create', checkLogin, checkPower, role.create)
router.post('/modify', checkLogin, checkPower, role.modify)
router.post('/remove', checkLogin, checkPower, role.remove)
router.get('/list', checkLogin, checkPower, role.list)
router.get('/powers', checkLogin, checkPower, role.powers)
router.post('/modifyPowers', checkLogin, checkPower, role.modifyPowers)

module.exports = router;