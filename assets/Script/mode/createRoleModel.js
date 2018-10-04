
var Request = require("../network/Request");
var allDefine = require("./AllDefine");
var GeneralServerRequest = require("../network/GeneralServerRequest");
var popupManager = require("../unit/popupManager");
var userMode = require("./userMode");


var CreateRoleModel = cc.Class({
    ctor () {
        console.log('--->loginModel ctor');
        this.callback = null;
        this.target = null;
    },
    
        
    repCreateRole  (argu, callback,  failCallback, target) {
        var self = this;
        var params = {
            token: argu.token,
            invite:argu.invite,
        }

        var router = '/gapi/account/create';
        var requestResultMethod = {
            context: this,
            onSuccess: function(result) {
                console.log("----->repCreateRole  onSuccess: ", result);
                if (callback) callback.apply(target, [result]);
            },
            onFail: function(result, errorCode) {
                console.log("----->repCreateRole  onFail: ", result , errorCode);
                if (failCallback) failCallback.apply(target, [result]);
            }
        };

        GeneralServerRequest.preq(router, params, requestResultMethod, null, false , false);
    
    },

    //测试用，获取测试邀请码。
    repInvite  (argu, callback, target) {
        var self = this;
        var params = {
            token: argu.token,
            parent_uid:'0000-00000000-0000',
            parent_invite:'000000',
        }

        var router = '/gapi/account/invite/init';
        var requestResultMethod = {
            context: this,
            onSuccess: function(result) {
                console.log("----->repInvite  onSuccess: ", result);
                if (callback) callback.apply(target, [result]);
            },
            onFail: function(result, errorCode) {
                console.log("----->repInvite  onFail: ", result , errorCode);

            }
        };

        GeneralServerRequest.preq(router, params, requestResultMethod, null, false , false);
    
    },


});

var createRoleModel = new CreateRoleModel();

module.exports = createRoleModel;