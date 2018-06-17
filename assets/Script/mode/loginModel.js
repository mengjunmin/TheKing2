
var Request = require("../network/Request");
var allDefine = require("./AllDefine");

var loginModel = cc.Class({

    statics:{
        repLogin(argu, callback, target) {
            var self = this;
            var params = {
                phone: argu.phone,
                invite: argu.invite,
                password: argu.password,
                code: argu.code
            }
            var url = allDefine.serverAddress+'/g1/user/login2';
            Request.Post(url, callback, target, params, false);
        
        },
    
        
        repLrole  (argu, callback, target) {
            var self = this;
            var params = {
                phone: argu.phone
            }
            var url = allDefine.serverAddress+'/g1/user/lrole';
            Request.Post(url, callback, target, params, false);
        
        },
    },

    ctor () {
        console.log('--->loginModel ctor');
        this.callback = null;
        this.target = null;
    },



});

module.exports = loginModel;