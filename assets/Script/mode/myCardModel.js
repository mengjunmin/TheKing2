var Request = require("../network/Request");
var allDefine = require("./AllDefine");
var GeneralServerRequest = require("../network/GeneralServerRequest");
var popupManager = require("../unit/popupManager");
var userMode = require("./userMode");


var myCardModel = {
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
    repList(argu, callback, context) {
        var self = this;
        var pp = {
            uid: argu.uid,
            t: argu.t,
        }
        console.log("----->repMailList");
        var url = allDefine.serverAddress + '/g1/msg/list';
        Request.Post(url, callback, context, pp, false);
    },






};

module.exports = myCardModel;

