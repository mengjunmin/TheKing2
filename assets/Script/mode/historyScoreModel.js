var Request = require("../network/Request");
var allDefine = require("./AllDefine");
var GeneralServerRequest = require("../network/GeneralServerRequest");
var popupManager = require("../unit/popupManager");
var userMode = require("./userMode");


var historyScoreModel = cc.Class({
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
    
        var router = '/g1/user/points/list';
        var requestResultMethod = {
            context: this,
            onSuccess: function(result) {
                console.log("----->repHistoryScore  onSuccess: ", result);
                if (callback) callback.apply(context, [result]);
            },
            onFail: function(result, errorCode) {
                console.log("----->repHistoryScore  onFail: ", result , errorCode);
    
            }
        };
    
        GeneralServerRequest.preq(router, params, requestResultMethod, null, false , false);
    },





});



var HistoryScoreModel = new historyScoreModel();
module.exports = HistoryScoreModel;

