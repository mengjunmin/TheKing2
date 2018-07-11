var Request = require("../network/Request");
var allDefine = require("./AllDefine");
var GeneralServerRequest = require("../network/GeneralServerRequest");
var popupManager = require("../unit/popupManager");
var userMode = require("./userMode");

var userInfoModel = cc.Class({
    // 成员变量
    callback: null,
    target: null,



    ctor() {
        console.log('--->repMailList ctor');
        this.callback = null;
        this.target = null;
    },

/*
{
    "list": [
        {
            "id": 1,
            "title": "",
            "content": "",
            "action": "",
            "status": 0
        },
        {
            "id": 1,
            "title": "",
            "content": "",
            "action": "",
            "status": 1
        }
    ] 
}
*/
    repFullUserInfo(argu, callback, context) {
        var self = this;
        var params = {
            uid: argu.uid,
            t: argu.t,
        }
    
        var router = '/g1/user/full';
        var requestResultMethod = {
            context: this,
            onSuccess: function(result) {
                console.log("----->repFullUserInfo  onSuccess: ", result);
                if (callback) callback.apply(context, [result]);
            },
            onFail: function(result, errorCode) {
                console.log("----->repFullUserInfo  onFail: ", result , errorCode);
    
            }
        };
    
        GeneralServerRequest.preq(router, params, requestResultMethod, null, false , false);
    },

    repHistoryScore:function(argu, callback, context){
        var self = this;
        var params = {
            uid: argu.uid,
            t: argu.t,
        }
    
        var router = '/g1/user/points/list';
        var requestResultMethod = {
            context: this,
            onSuccess: function(result) {
                console.log("----->repHistoryScore  onSuccess: ", result);
                if (callback) callback.apply(context, [result]);
            },
            onFail: function(result, errorCode) {
                console.log("----->repHistoryScore  onFail: ", result , errorCode);
    
            }
        };
    
        GeneralServerRequest.preq(router, params, requestResultMethod, null, false , false);

    },

    repInvitationCard:function(argu, callback, context){
        var self = this;
        var params = {
            uid: argu.uid,
            t: argu.t,
        }
    
        var router = '/g1/user/invite/list';
        var requestResultMethod = {
            context: this,
            onSuccess: function(result) {
                console.log("----->repInvitationCard  onSuccess: ", result);
                if (callback) callback.apply(context, [result]);
            },
            onFail: function(result, errorCode) {
                console.log("----->repInvitationCard  onFail: ", result , errorCode);
    
            }
        };
    
        GeneralServerRequest.preq(router, params, requestResultMethod, null, false , false);

    },

    repReward:function(argu, callback, context){
        var self = this;
        var params = {
            uid: argu.uid,
            t: argu.t,
        }
    
        var router = '/g1/user/award/list';
        var requestResultMethod = {
            context: this,
            onSuccess: function(result) {
                console.log("----->repReward  onSuccess: ", result);
                if (callback) callback.apply(context, [result]);
            },
            onFail: function(result, errorCode) {
                console.log("----->repReward  onFail: ", result , errorCode);
    
            }
        };
    
        GeneralServerRequest.preq(router, params, requestResultMethod, null, false , false);
    },


    repMySuns:function(argu, callback, context){
        var self = this;
        var params = {
            uid: argu.uid,
            t: argu.t,
        }
    
        var router = '/g1/user/child/list';
        var requestResultMethod = {
            context: this,
            onSuccess: function(result) {
                console.log("----->repMySuns  onSuccess: ", result);
                if (callback) callback.apply(context, [result]);
            },
            onFail: function(result, errorCode) {
                console.log("----->repMySuns  onFail: ", result , errorCode);
    
            }
        };
    
        GeneralServerRequest.preq(router, params, requestResultMethod, null, false , false);
    },





});




var UserInfoModel = new userInfoModel();
module.exports = UserInfoModel;

