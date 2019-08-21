const Router = require('koa-router')

const resources = require('../controllers/resources')

const router = Router({
    prefix: '/resources'
})

router.post('/create', checkLogin, checkPower, resources.create)
router.post('/modify', checkLogin, checkPower, resources.modify)
router.post('/remove', checkLogin, checkPower, resources.remove)
router.get('/list', checkLogin, checkPower, resources.list)

module.exports = router;