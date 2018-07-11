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
    repMailList(argu, callback, context) {

        var self = this;
        var params = {
            uid: argu.uid,
            t: argu.t,
        }
    
        var router = '/g1/mg/list';
        var requestResultMethod = {
            context: this,
            onSuccess: function(result) {
                console.log("----->repMailList  onSuccess: ", result);
                if (callback) callback.apply(context, [result]);
            },
            onFail: function(result, errorCode) {
                console.log("----->repMailList  onFail: ", result , errorCode);
    
            }
        };
    
        GeneralServerRequest.preq(router, params, requestResultMethod, null, false , false);
    },

//  家族列表
/*
{
    "result": 1,
    "msg": "成功删除邮件"
}
*/
    repDellMail(argu, callback, context) {
        var self = this;
        var params = {
            uid: argu.uid,
            t: argu.t,
            ids:argu.ids,
        }
    
        var router = '/g1/mg/list';
        var requestResultMethod = {
            context: this,
            onSuccess: function(result) {
                console.log("----->repDellMail  onSuccess: ", result);
                if (callback) callback.apply(context, [result]);
            },
            onFail: function(result, errorCode) {
                console.log("----->repDellMail  onFail: ", result , errorCode);
    
            }
        };
    
        GeneralServerRequest.preq(router, params, requestResultMethod, null, false , false);

    },




});



var MailModel = new mailModel();
module.exports = MailModel;

