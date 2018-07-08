
var Request = require("../network/Request");
var allDefine = require("./AllDefine");
var GeneralServerRequest = require("../network/GeneralServerRequest");
var popupManager = require("../unit/popupManager");
var userMode = require("./userMode");


var loginModel = cc.Class({
    ctor () {
        console.log('--->loginModel ctor');
        this.callback = null;
        this.target = null;
    },
    repLogin(argu, callback, target, failcallback, failtarget) {
        var self = this;
        var params = {
            phone: argu.phone,
            invite: argu.invite,
            password: argu.password,
            code: argu.code
        }

        var router = '/g1/user/login2';
        var requestResultMethod = {
            context: this,
            onSuccess: function(result) {
                console.log("----->repLogin  onSuccess: ", result);
                if (callback) callback.apply(target, [result]);
            },
            onFail: function(result, errorCode) {
                console.log("----->repLogin  onFail: ", result , errorCode);
                if (failcallback) failcallback.apply(failtarget, [result]);
            }
        };

        GeneralServerRequest.preq(router, params, requestResultMethod, null, false , false);
    
    },
    
        
    repLrole  (argu, callback, target) {
        var self = this;
        var params = {
            phone: argu.phone
        }

        var router = '/g1/user/lrole';
        var requestResultMethod = {
            context: this,
            onSuccess: function(result) {
                console.log("----->repLrole  onSuccess: ", result);
                if (callback) callback.apply(target, [result]);
            },
            onFail: function(result, errorCode) {
                console.log("----->repLrole  onFail: ", result , errorCode);

            }
        };

        GeneralServerRequest.preq(router, params, requestResultMethod, null, false , false);
    
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
        t: argu.t,
    }

    var router = '/g1/user/full';
    var requestResultMethod = {
        context: this,
        onSuccess: function(result) {
            console.log("----->repUserFull  onSuccess: ", result);
            if (callback) callback.apply(target, [result]);
        },
        onFail: function(result, errorCode) {
            console.log("----->repUserFull  onFail: ", result , errorCode);

        }
    };

    GeneralServerRequest.preq(router, params, requestResultMethod, null, false , false);

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
        t: argu.t,
    }


    var router = '/g1/user/simple';
    var requestResultMethod = {
        context: this,
        onSuccess: function(result) {
            console.log("----->repUserSimple  onSuccess: ", result);
            if (callback) callback.apply(target, [result]);
        },
        onFail: function(result, errorCode) {
            console.log("----->repUserSimple  onFail: ", result , errorCode);

        }
    };

    GeneralServerRequest.preq(router, params, requestResultMethod, null, false , false);

},


repImageCode  (argu, callback, target) {
    var self = this;
    var params = {
        phone: argu.phone,
    };

    var router = '/g1/code/image';
    var requestResultMethod = {
        context: this,
        onSuccess: function(result) {
            console.log("----->repUserSimple  onSuccess: ", result);
            if (callback) callback.apply(target, [result]);
        },
        onFail: function(result, errorCode) {
            console.log("----->repUserSimple  onFail: ", result , errorCode);

        }
    };

    GeneralServerRequest.preq(router, params, requestResultMethod, null, false , false);

},


});

var LoginModel = new loginModel();

module.exports = LoginModel;