
var allDefine = require("./AllDefine");
var GeneralServerRequest = require("../network/GeneralServerRequest");
var popupManager = require("../unit/popupManager");
var userMode = require("./userMode");


var myCardModel = cc.Class({
    // 成员变量
    callback: null,
    target: null,

    ctor() {
        console.log('--->myCardModel ctor');
        this.callback = null;
        this.target = null;
    },

    repList(argu, callback, context) {
        var self = this;
        var params = {
            uid: argu.uid,
            t: argu.t,
        }
    
        var router = '/g1/user/invite/list';
        var requestResultMethod = {
            context: this,
            onSuccess: function(result) {
                console.log("----->myCardModel  onSuccess: ", result);
                if (callback) callback.apply(context, [result]);
            },
            onFail: function(result, errorCode) {
                console.log("----->myCardModel  onFail: ", result , errorCode);
    
            }
        };
    
        GeneralServerRequest.preq(router, params, requestResultMethod, null, false , false);
    },






});



var MyCardModel = new myCardModel();
module.exports = MyCardModel;

