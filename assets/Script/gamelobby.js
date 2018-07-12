
var userMode = require("./mode/userMode");


cc.Class({
    extends: cc.Component,

    properties: {

        backBtn: {
            default: null,
            type: cc.Button
        },
        game1Btn: {
            default: null,
            type: cc.Button
        },

    },
    mainSence: null,
    // LIFE-CYCLE CALLBACKS:

    onLoad() {



    },

    start() {
        //发起联网请求。获取加载那个tree。


    },

 

    onBack: function(obj, data) {
        cc.log('----->onBack');
        this.mainSence.goToLayer("mainMenu");
    },

    onGame: function(obj, data) {
        cc.log('----->onGame ', obj, data);

    },

    onIn: function() {
        cc.log('----->gamelobby onIn');



    },

    onOut: function() {
        cc.log('----->gamelobby onOut');
    },

    // update (dt) {},
});