var Request = require("../network/Request");
var allDefine = require("./AllDefine");
var GeneralServerRequest = require("../network/GeneralServerRequest");
var popupManager = require("../unit/popupManager");
var userMode = require("./userMode");

var userInfoModel = {
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
    repFullUserInfo(argu, callback, context) {
        var self = this;
        var pp = {
            uid: argu.uid,
            token: argu.token,
        }
        console.log("----->repMailList");
        var url = allDefine.serverAddress + '/g1/msg/list';
        Request.Post(url, callback, context, pp, false);
    },

    repHistoryScore:function(argu, callback, context){
        var self = this;
        var pp = {
            uid: argu.uid,
            token: argu.token,
        }
        console.log("----->repHistoryScore");
        var url = allDefine.serverAddress + '/g1/msg/list';
        Request.Post(url, callback, context, pp, false);

    },

    repInvitationCard:function(argu, callback, context){
        var self = this;
        var pp = {
            uid: argu.uid,
            token: argu.token,
        }
        console.log("----->repInvitationCard");
        var url = allDefine.serverAddress + '/g1/msg/list';
        Request.Post(url, callback, context, pp, false);

    },

    repReward:function(argu, callback, context){
        var self = this;
        var pp = {
            uid: argu.uid,
            token: argu.token,
        }
        console.log("----->repReward");
        var url = allDefine.serverAddress + '/g1/msg/list';
        Request.Post(url, callback, context, pp, false);
    },

//  家族列表
/*
{
    "result": 1,
    "msg": "成功删除邮件"
}
*/





};

module.exports = userInfoModel;

