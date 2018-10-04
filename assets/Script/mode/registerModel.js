var Request = require("../network/Request");
var allDefine = require("./AllDefine");
var GeneralServerRequest = require("../network/GeneralServerRequest");
var popupManager = require("../unit/popupManager");
var userMode = require("./userMode");



var registerModel = cc.Class({
    // 成员变量
    callback: null,
    target: null,



    ctor() {
        console.log('--->registerModel ctor');
        this.callback = null;
        this.target = null;
    },


    repRegister(argu, callback, context) {
        var self = this;
        var params = {
            phone: argu.phone,
            code: argu.code,
            password: argu.password
        }
        console.log("----->repRegister");

        var router = '/gapi/user/reg';
        var requestResultMethod = {
            context: this,
            onSuccess: function (result) {
                userMode.getInstance().user.uid = result._id;
                userMode.getInstance().user.phone = result.phone;
                userMode.getInstance().user.token = result.token;

                if (callback) callback.apply(context, [result]);
            },
            onFail: function (result, errorCode) {
                console.log("----->repRegister  onFail: ", result, errorCode);

            }
        };

        GeneralServerRequest.preq(router, params, requestResultMethod, null, false, false);

    },

    /*
       *功能：检查用户是否已经存在。
       *参数：phone：11位手机号。
       *数据：{
           "exists": true,
           "phone": "13468305254",
           "status": 0//用户状态
       }
       */
    repSMS(phone, callback, context) {
        var self = this;

        var params = {
            phone: phone
        };
        var router = '/gapi/code/sms';
        var requestResultMethod = {
            context: this,
            onSuccess: function (result) {
                console.log("----->repSMS  onSuccess: ", result);
                if (callback) callback.apply(context, [result]);
            },
            onFail: function (result, errorCode) {
                console.log("----->repSMS  onFail: ", result, errorCode);

                // var CONF = {
                //     title:'1234',
                //     content:"actionHandler.msg",
                //     okLabel:null,
                //     cancelLabel:null,
                //     cancelCallback: null,      // 取消
                //     cancelCallbackObj: self,   // 取消
                //     okCallback: null,      // 确定
                //     okCallbackObj: self,   // 确定
                // };
                // popupManager.create('note', CONF);
            }
        };

        GeneralServerRequest.preq(router, params, requestResultMethod, null, false, false);
    },

    /*
    *功能：检查用户是否已经存在。
    *参数：phone：11位手机号。
    *数据：{
        "exists": true,
        "phone": "13468305254",
        "status": 0//用户状态
    }
    */
    repUserExist(phone, callback, context) {
        var self = this;

        var params = {
            phone: phone
        };
        var router = '/gapi/user/reg/check';
        var requestResultMethod = {
            context: this,
            onSuccess: function (result) {
                console.log("----->repUserExist  onSuccess: ", result);
                if (callback) callback.apply(context, [result]);
            },
            onFail: function (result, errorCode) {
                console.log("----->repUserExist  onFail: ", result, errorCode);
            }
        };

        GeneralServerRequest.preq(router, params, requestResultMethod, null, false, false);
    },





});



var RegisterModel = new registerModel();
module.exports = RegisterModel;