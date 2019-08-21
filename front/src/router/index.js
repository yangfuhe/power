import Vue from 'vue'
import Router from 'vue-router'


let routes = [{
    path: '/login',
    component: resolve => require(['@/components/login'], resolve)
}]

Vue.use(Router)

export default new Router({ routes })