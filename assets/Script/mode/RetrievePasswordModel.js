var Request = require("../network/Request");
var GeneralServerRequest = require("../network/GeneralServerRequest");
var popupManager = require("../unit/popupManager");
var userMode = require("./userMode");


var retrievePasswordModel = cc.Class({
    // 成员变量
    callback: null,
    target: null,



    ctor() {
        this.callback = null;
        this.target = null;
    },


    //  /g1/code/sms
    repSMS(phone, callback, context) {
        var self = this;
        console.log("----->repSMS");
        var params = {
            phone: phone
        };
        var router = '/gapi/code/sms';
        var requestResultMethod = {
            context: this,
            onSuccess: function(result) {
                console.log("----->repSMS  onSuccess: ", result);
                if (callback) callback.apply(context, [result]);
            },
            onFail: function(result, errorCode) {
                console.log("----->repSMS  onFail: ", result , errorCode);
            }
        };

        GeneralServerRequest.preq(router, params, requestResultMethod, null, false , false);

    },

    repRetrievePassword(argu, callback, context) {
        var self = this;

        var params = {
            phone: argu.phone,
            code: argu.code,
            password:argu.password,
        }
        console.log("----->repRetrievePassword");

        var router = '/gapi/user/fgt';
        var requestResultMethod = {
            context: this,
            onSuccess: function(result) {

                if (callback) callback.apply(context, [result]);
            },
            onFail: function(result, errorCode) {
                console.log("----->repRetrievePassword  onFail: ", result , errorCode);

            }
        };

        GeneralServerRequest.preq(router, params, requestResultMethod, null, false , false);

    },


});



var RetrievePasswordModel = new retrievePasswordModel();
module.exports = RetrievePasswordModel;