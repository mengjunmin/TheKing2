var Request = require("../network/Request");
var allDefine = require("./AllDefine");
var GeneralServerRequest = require("../network/GeneralServerRequest");
var popupManager = require("../unit/popupManager");
var userMode = require("./userMode");


var shopModel = cc.Class({
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
        var params = {
            uid: argu.uid,
            t: argu.t,
        }
        console.log("----->repShopList");

        var router = '/g1/goods/list';
        var requestResultMethod = {
            context: this,
            onSuccess: function(result) {
                console.log("----->repShopList  onSuccess: ", result);
                if (callback) callback.apply(context, [result]);
            },
            onFail: function(result, errorCode) {
                console.log("----->repShopList  onFail: ", result , errorCode);

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
    repPay(argu, callback, context) {
        var self = this;
        console.log("----->repDellMail");
        var pp = {
            uid: argu.uid,
            t: argu.t,
            ids:1
        }
        var url = allDefine.serverAddress + '/g1/msg/list';
        Request.Post(url, callback, context, pp, false);

    },




});



var ShopModel = new shopModel();
module.exports = ShopModel;

