var Request = require("../network/Request");
var allDefine = require("./AllDefine");
var GeneralServerRequest = require("../network/GeneralServerRequest");
var popupManager = require("../unit/popupManager");
var userMode = require("./userMode");


var familyModel = cc.Class({
    // 成员变量
    callback: null,
    target: null,



    ctor() {
        console.log('--->familyModel ctor');
        this.callback = null;
        this.target = null;
    },
//加入家族
/*
{
    "result": 1
}
*/
    repFamilyJoin(argu, callback, context) {
        var self = this;
        var params = {
            uid: argu.uid,
            t: argu.t,
        };

        var router = '/g1/family/join';
        var requestResultMethod = {
            context: this,
            onSuccess: function(result) {
                console.log("----->repFamilyJoin  onSuccess: ", result);
                if (callback) callback.apply(context, [result]);
            },
            onFail: function(result, errorCode) {
                console.log("----->repFamilyJoin  onFail: ", result , errorCode);

            }
        };

        GeneralServerRequest.preq(router, params, requestResultMethod, null, false , false);

    },

//  家族列表
/*
{
    "list": [
        {
            "puid": "",
            "uid": "",
            "nick": "",
            "head": ""
        },
        {
            "puid": "",
            "uid": "",
            "nick": "",
            "head": ""
        },
        {
            "puid": "",
            "uid": "",
            "nick":"",
            "head": ""
        },
        {
            "puid": "",
            "uid": "",
            "nick":"",
            "head": ""
        },
        {
            "puid": "",
            "uid": "",
            "nick":"",
            "head": ""
        },
    ]
}
*/
    repFamilyList(argu, callback, context) {
        var self = this;
        console.log("----->repFamilyList");
        var params = {
            uid: argu.uid,
            t: argu.t,
        };

        var router = '/g1/family/list';
        var requestResultMethod = {
            context: this,
            onSuccess: function(result) {
                console.log("----->repFamilyList  onSuccess: ", result);
                if (callback) callback.apply(context, [result]);
            },
            onFail: function(result, errorCode) {
                console.log("----->repFamilyList  onFail: ", result , errorCode);

            }
        };

        GeneralServerRequest.preq(router, params, requestResultMethod, null, false , false);

    },




});


var FamilyModel = new familyModel();
module.exports = FamilyModel;

