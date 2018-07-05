var Request = require("../network/Request");
var allDefine = require("./AllDefine");
var GeneralServerRequest = require("../network/GeneralServerRequest");
var popupManager = require("../unit/popupManager");
var userMode = require("./userMode");
// var registerModel = cc.Class({
//     // 成员变量
//     callback: null,
//     target: null,



//     ctor() {
//         console.log('--->registerModel ctor');
//         this.callback = null;
//         this.target = null;
//     },


//     repRegister(argu, callback, context) {
//         var self = this;
//         var pp = {
//             phone: argu.phone,
//             code: argu.code,
//             invite: argu.invite
//         }
//         console.log("----->repRegister");
//         var url = serverAddress + 'onRegister';
//         Request.Post(url, callback, context, pp, false);

//     },

//     //  /g1/code/sms
//     repSMS(phone, callback, context) {
//         var self = this;
//         console.log("----->repSMS");
//         var url = serverAddress + '/g1/code/sms';
//         Request.Post(url, callback, context, { phone: phone }, false);

//     },

//     repFullInfo(argu, callback, context) {
//         var self = this;
//         var params = {
//             uid: argu.uid,
//             nick: argu.nick,
//             sex: argu.sex,
//             head: argu.head,
//             password: argu.password,
//             anpassword: argu.anpassword
//         }
//         console.log("----->repFullInfo");
//         var url = serverAddress + '/g1/user/update';
//         Request.Post(url, callback, context, params, false);

//     },


// });


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
            invite: argu.invite
        }
        console.log("----->repRegister");

        var router = '/g1/user/login1';
        var requestResultMethod = {
            context: this,
            onSuccess: function(result) {
                userMode.getInstance().uid = result.data._id;
                userMode.getInstance().uid = result.t;

                if (callback) callback.apply(context, [result]);
            },
            onFail: function(result, errorCode) {
                console.log("----->repRegister  onFail: ", result , errorCode);

            }
        };

        GeneralServerRequest.preq(router, params, requestResultMethod, null, false , false);

    },

    //  /g1/code/sms
    repSMS(phone, callback, context) {
        var self = this;

        var params = {
            phone: phone
        };
        var router = '/g1/code/sms';
        var requestResultMethod = {
            context: this,
            onSuccess: function(result) {
                console.log("----->repSMS  onSuccess: ", result);
                if (callback) callback.apply(context, [result]);
            },
            onFail: function(result, errorCode) {
                console.log("----->repSMS  onFail: ", result , errorCode);

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

        GeneralServerRequest.preq(router, params, requestResultMethod, null, false , false);
    },

    repFullInfo(argu, callback, context) {
        var self = this;
        var params = {
            uid: argu.uid,
            nick: argu.nick,
            sex: argu.sex,
            head: argu.head,
            password: argu.password,
            //anpassword: argu.anpassword
        }
        console.log("----->repFullInfo");
        // var url = allDefine.serverAddress + '/g1/user/update';
        // Request.Post(url, callback, context, params, false);

        var router = '/g1/user/update';
        var requestResultMethod = {
            context: this,
            onSuccess: function(result) {
                console.log("----->repFullInfo  onSuccess: ", result);
                if (callback) callback.apply(context, [result]);
            },
            onFail: function(result, errorCode) {
                console.log("----->repFullInfo  onFail: ", result , errorCode);

            }
        };

        GeneralServerRequest.preq(router, params, requestResultMethod, null, false , false);

    },


});



var registerModel = new registerModel();
module.exports = registerModel;