const Router = require('koa-router')

const log = require('../controllers/log')

const router = Router({
    prefix: '/log'
})


router.get('/list', checkLogin, checkPower, log.list)


module.exports = router;