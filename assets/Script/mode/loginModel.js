
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
            password: argu.password,
        }

        var router = '/gapi/user/login';
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
    
     //http://59.110.138.129:112/gapi/power/config?localdatetime=  
    repPowerConfig(argu, callback, target, failcallback, failtarget) {
        var self = this;
        var params = {
            localdatetime: argu.time,
        }

        var router = '/gapi/power/config';
        var requestResultMethod = {
            context: this,
            onSuccess: function(result) {
                console.log("----->repPowerConfig  onSuccess: ", result);
                if (callback) callback.apply(target, [result]);
            },
            onFail: function(result, errorCode) {
                console.log("----->repPowerConfig  onFail: ", result , errorCode);
                if (failcallback) failcallback.apply(failtarget, [result]);
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
            console.log("----->repImageCode  onSuccess: ", result);
            if (callback) callback.apply(target, [result]);
        },
        onFail: function(result, errorCode) {
            console.log("----->repImageCode  onFail: ", result , errorCode);

        }
    };

    GeneralServerRequest.preq(router, params, requestResultMethod, null, false , false);

},


});

var LoginModel = new loginModel();

module.exports = LoginModel;