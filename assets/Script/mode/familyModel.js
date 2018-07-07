var Request = require("../network/Request");
var allDefine = require("./AllDefine");
var GeneralServerRequest = require("../network/GeneralServerRequest");
var popupManager = require("../unit/popupManager");
var userMode = require("./userMode");


var familyModel = {
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
        var pp = {
            uid: argu.uid,
            token: argu.token,
        }
        console.log("----->repFamilyJoin");
        var url = allDefine.serverAddress + '/g1/family/join';
        Request.Post(url, callback, context, pp, false);
        // url = 'https://www.baidu.com';
        // Request.Get(url, callback, context, false) 
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
        var pp = {
            uid: argu.uid,
            token: argu.token,
        }
        var url = allDefine.serverAddress + '/g1/family/list';
        Request.Post(url, callback, context, pp, false);

    },




};

module.exports = familyModel;

