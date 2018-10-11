var Request = require("../network/Request");
var allDefine = require("./AllDefine");
var GeneralServerRequest = require("../network/GeneralServerRequest");
var popupManager = require("../unit/popupManager");
var userMode = require("./userMode");


var mailModel = cc.Class({
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
        [
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
    repMailList(argu, callback, context) {

        var self = this;
        var params = {
            invite: argu.invite,
            token: argu.token,
        };

        var router = '/gapi/msg/list';
        var requestResultMethod = {
            context: this,
            onSuccess: function (result) {
                console.log("----->repMailList  onSuccess: ", result);
                if (callback) callback.apply(context, [result]);
            },
            onFail: function (result, errorCode) {
                console.log("----->repMailList  onFail: ", result, errorCode);

            }
        };

        GeneralServerRequest.preq(router, params, requestResultMethod, null, false, false);
    },


    /*标记已读邮件
{
    [
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
    repMailMarkread(argu, callback, context) {

        var self = this;
        var params = {
            invite: argu.invite,
            token: argu.token,
            ids: argu.ids,
        };

        var router = '/gapi/msg/markread';
        var requestResultMethod = {
            context: this,
            onSuccess: function (result) {
                console.log("----->repMailMarkread  onSuccess: ", result);
                if (callback) callback.apply(context, [result]);
            },
            onFail: function (result, errorCode) {
                console.log("----->repMailMarkread  onFail: ", result, errorCode);

            }
        };

        GeneralServerRequest.preq(router, params, requestResultMethod, null, false, false);
    },



    /*
    {
        "result": 1,
        "msg": "成功删除邮件"
    }
    */
    repDellMail(argu, callback, context) {
        var self = this;
        var params = {
            invite: argu.invite,
            token: argu.token,
            ids: argu.ids,
        };

        var router = '/g1/msg/del';
        var requestResultMethod = {
            context: this,
            onSuccess: function (result) {
                console.log("----->repDellMail  onSuccess: ", result);
                if (callback) callback.apply(context, [result]);
            },
            onFail: function (result, errorCode) {
                console.log("----->repDellMail  onFail: ", result, errorCode);

            }
        };

        GeneralServerRequest.preq(router, params, requestResultMethod, null, false, false);

    },


    /*
    {
        "result": 1,
        "msg": "成功删除邮件"
    }
    */
   repCheckMail(argu, callback, context) {
    var self = this;
    var params = {
        invite: argu.invite,
        // token: argu.token,
    };

    var router = '/gapi/msg/list/check';
    var requestResultMethod = {
        context: this,
        onSuccess: function (result) {
            console.log("----->repCheckMail  onSuccess: ", result);
            if (callback) callback.apply(context, [result]);
        },
        onFail: function (result, errorCode) {
            console.log("----->repCheckMail  onFail: ", result, errorCode);

        }
    };

    GeneralServerRequest.preq(router, params, requestResultMethod, null, false, false);

},


});



var MailModel = new mailModel();
module.exports = MailModel;

