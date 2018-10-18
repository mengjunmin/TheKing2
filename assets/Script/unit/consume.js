
var userMode = require("../mode/userMode");
var popupManager = require("./popupManager");

var Consume = cc.Class({

    ctor() {
        console.log('--->consume ctor');

    },

    jewelsIsEnough(num){
        return this.isEnough('jewels', num);
    },

    isEnough(type, num){
        var user = userMode.getInstance().user;
        var value = user[type] || 0;
        if(value>= num){
            return true;
        }else{
            //充值页面
            this.rechargePopup();
        }

        return false;
    },


    rechargePopup(){
        var self = this;
        var onCancel = function(){
            
        }
        var onOk = function(){
            //去充值
            popupManager.create('jewelShop', {});
        }
        var CONF = {
            title: '',
            content: "您的钻石不足！是否去充值？",
            okLabel: '充值',
            cancelLabel: '取消',
            cancelCallback: onCancel, // 取消
            cancelCallbackObj: self, // 取消
            okCallback: onOk, // 确定
            okCallbackObj: self, // 确定
            showCloseBtn:false,
        };
        popupManager.create('note', CONF);
    },

});



var consume = new Consume();
module.exports = consume;