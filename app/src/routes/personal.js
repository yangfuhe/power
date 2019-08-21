const Router = require('koa-router')

const personal = require('../controllers/personal')

const router = Router({
    prefix: '/personal'
})


router.get('/info', checkLogin, personal.info)


module.exports = router;