import { Message } from 'element-ui'
import md5 from 'js-md5';
import moment from 'moment'
let strTrim = str => str.replace(/(^\s*)|(\s*$)/g, "")

let checkParams = (flag, msg) => {
    if (flag) {
        Message({
            type: 'info',
            message: msg
        });
    }
    return flag;
}

let info = (type, msg) => {
    Message({
        type,
        message: msg
    });
}

let isPhone = tel => /^1(3|4|5|6|7|8|9)\d{9}$/.test(tel)


let isEmail = email => /^[_a-z0-9-\.]+@([-a-z0-9]+\.)+[a-z]{2,}$/i.test(email)

let api = {
    install: function(Vue) {
        Vue.prototype.strTrim = strTrim;
        Vue.prototype.checkParams = checkParams;
        Vue.prototype.info = info;
        Vue.prototype.md5 = md5;
        Vue.prototype.isPhone = isPhone;
        Vue.prototype.isEmail = isEmail;
        Vue.prototype.moment = moment;
    }
}

export default api