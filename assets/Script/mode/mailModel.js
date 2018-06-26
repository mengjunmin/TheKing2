var Request = require("../network/Request");
var allDefine = require("./AllDefine");

var mailModel = {
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
        var pp = {
            uid: argu.uid,
            token: argu.token,
        }
        console.log("----->repMailList");
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
    repDellMail(argu, callback, context) {
        var self = this;
        console.log("----->repDellMail");
        var pp = {
            uid: argu.uid,
            token: argu.token,
            ids:1
        }
        var url = allDefine.serverAddress + '/g1/msg/list';
        Request.Post(url, callback, context, pp, false);

    },




};

module.exports = mailModel;
