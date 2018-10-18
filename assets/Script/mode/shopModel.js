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
    repProductList(argu, callback, context) {
        var self = this;
        var params = {
            token: argu.token,
        }
        console.log("----->repProductList");

        var router = '/gapi/product/list';
        var requestResultMethod = {
            context: this,
            onSuccess: function (result) {
                console.log("----->repProductList  onSuccess: ", result);
                if (callback) callback.apply(context, [result]);
            },
            onFail: function (result, errorCode) {
                console.log("----->repProductList  onFail: ", result, errorCode);

            }
        };

        GeneralServerRequest.preq(router, params, requestResultMethod, null, false, false);
    },

    //  获取钻石列表
    repJewelList(argu, callback, context) {
        var self = this;
        var params = {
            token: argu.token,
        }
        console.log("----->repJewelList");

        var router = '/gapi/jewel/list';
        var requestResultMethod = {
            context: this,
            onSuccess: function (result) {
                console.log("----->repJewelList  onSuccess: ", result);
                if (callback) callback.apply(context, [result]);
            },
            onFail: function (result, errorCode) {
                console.log("----->repJewelList  onFail: ", result, errorCode);

            }
        };

        GeneralServerRequest.preq(router, params, requestResultMethod, null, false, false);
    },


    //  创建钻石购买订单
    repJewelPay(argu, callback, context) {
        var self = this;
        var params = {
            token: argu.token,
            invite: argu.invite,
            jewel_id: argu.jewel_id,//钻石id
        }
        console.log("----->repJewelPay");

        var router = '/gapi/jewel/jewelpay';
        var requestResultMethod = {
            context: this,
            onSuccess: function (result) {
                console.log("----->repJewelPay  onSuccess: ", result);
                if (callback) callback.apply(context, [result]);
            },
            onFail: function (result, errorCode) {
                console.log("----->repJewelPay  onFail: ", result, errorCode);

            }
        };

        GeneralServerRequest.preq(router, params, requestResultMethod, null, false, false);
    },

    //  钻石消耗
    repJewelCost(argu, callback, context) {
        var self = this;
        var params = {
            token: argu.token,
            invite: argu.invite,
            product_id: argu.product_id,//钻石id
        }
        console.log("----->repJewelCost");

        var router = '/gapi/jewel/jewelcost';
        var requestResultMethod = {
            context: this,
            onSuccess: function (result) {
                console.log("----->repJewelCost  onSuccess: ", result);
                if (callback) callback.apply(context, [result]);
            },
            onFail: function (result, errorCode) {
                console.log("----->repJewelCost  onFail: ", result, errorCode);

            }
        };

        GeneralServerRequest.preq(router, params, requestResultMethod, null, false, false);
    },


    //购买头像
    repBuyface(argu, callback, context) {
        var self = this;
        var params = {
            token: argu.token,
            invite: argu.invite,
            jewelcost_id: argu.jewelcost_id,//钻石消费单号
            face_id: argu.face_id,//头像id
        }
        console.log("----->repBuyface");

        var router = '/gapi/account/buyface';
        var requestResultMethod = {
            context: this,
            onSuccess: function (result) {
                console.log("----->repBuyface  onSuccess: ", result);
                if (callback) callback.apply(context, [result]);
            },
            onFail: function (result, errorCode) {
                console.log("----->repBuyface  onFail: ", result, errorCode);

            }
        };

        GeneralServerRequest.preq(router, params, requestResultMethod, null, false, false);
    },




});



var ShopModel = new shopModel();
module.exports = ShopModel;