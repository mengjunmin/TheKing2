
var Request = require("../network/Request");


var loginModel = cc.Class({
    // 成员变量
    callback:null,
    target:null,

    ctor () {
        this.callback = null;
        this.target = null;
    },

    repLogin(argu, callback, target) {
        var self = this;
        var params = {
            phone: argu.phone,
            invite: argu.invite,
            password: argu.password,
            code: argu.code
        }
        var url = serverAddress+'/g1/user/login2';
        Request.Post(url, callback, target, params, false);
    
    },

    
    repLrole  (argu, callback, target) {
        var self = this;
        var params = {
            phone: argu.phone
        }
        var url = serverAddress+'/g1/user/lrole';
        Request.Post(url, callback, target, params, false);
    
    },

});

module.exports = loginModel;