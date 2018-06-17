var Request = require("../network/Request");
var allDefine = require("./AllDefine");

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


var registerModel = {
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
        var pp = {
            phone: argu.phone,
            code: argu.code,
            invite: argu.invite
        }
        console.log("----->repRegister");
        var url = allDefine.serverAddress + 'onRegister';
        Request.Post(url, callback, context, pp, false);

    },

    //  /g1/code/sms
    repSMS(phone, callback, context) {
        var self = this;
        console.log("----->repSMS");
        var url = allDefine.serverAddress + '/g1/code/sms';
        Request.Post(url, callback, context, { phone: phone }, false);

    },

    repFullInfo(argu, callback, context) {
        var self = this;
        var params = {
            uid: argu.uid,
            nick: argu.nick,
            sex: argu.sex,
            head: argu.head,
            password: argu.password,
            anpassword: argu.anpassword
        }
        console.log("----->repFullInfo");
        var url = allDefine.serverAddress + '/g1/user/update';
        Request.Post(url, callback, context, params, false);

    },


};

module.exports = registerModel;