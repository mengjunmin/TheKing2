
var Request = require("../network/Request");
var allDefine = require("./AllDefine");
var GeneralServerRequest = require("../network/GeneralServerRequest");
var popupManager = require("../unit/popupManager");
var userMode = require("./userMode");


var CharacterinfoModel = cc.Class({
    ctor () {
        console.log('--->loginModel ctor');
        this.callback = null;
        this.target = null;
    },
    
        
    repRoleList  (argu, callback, target) {
        var self = this;
        var params = {
            token: argu.token
        }

        var router = '/gapi/account/list';
        var requestResultMethod = {
            context: this,
            onSuccess: function(result) {
                console.log("----->repRoleList  onSuccess: ", result);
                if (callback) callback.apply(target, [result]);
            },
            onFail: function(result, errorCode) {
                console.log("----->repRoleList  onFail: ", result , errorCode);

            }
        };

        GeneralServerRequest.preq(router, params, requestResultMethod, null, false , false);
    
    },





});

var characterinfoModel = new CharacterinfoModel();

module.exports = characterinfoModel;