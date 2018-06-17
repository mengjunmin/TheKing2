var Request = require("../network/Request");

var RetrievePasswordModel = cc.Class({
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
        var url = serverAddress + '/g1/code/sms';
        Request.Post(url, callback, context, { phone: phone }, false);

    },

    repRetrievePassword(argu, callback, context) {
        var self = this;

         var params = {
            phone:argu.phone,
            code: argu.code,
            invite: 'invite',
            password:argu.password,
            nick:argu.nick,
         }
        console.log("----->repFullInfo");
        var url = serverAddress + '/g1/user/fgt';
        Request.Post(url, callback, context, params, false);

    },


});

module.exports = RetrievePasswordModel;