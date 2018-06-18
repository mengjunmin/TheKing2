
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
//完整用户信息

/*
{
    "uid": "SF2DS98VCPA@13468305254",
    "nick": "安琪拉",
    "sex": 1,
    "head": "",
    "family": {
        "name": "天天向上",
        "fid": "SKDLKE89VB",
        "position": 1
    },
    "level": "1",
    "jewels": 300,
    "points": 2910,
    "g_vitality": 0.87
}
*/
        repUserFull  (argu, callback, target) {
            var self = this;
            var params = {
                uid: argu.uid,
                token: argu.token,
            }
            var url = allDefine.serverAddress+'/g1/user/full';
            Request.Post(url, callback, target, params, false);
        
        },

//用户小信息

/*
{
    "uid": "SF2DS98VCPA@13468305254",
    "nick": "安琪拉",
    "sex": 1,
    "head": ""
}
*/
        repUserSimple  (argu, callback, target) {
            var self = this;
            var params = {
                uid: argu.uid,
                token: argu.token,
            }
            var url = allDefine.serverAddress+'/g1/user/simple';
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