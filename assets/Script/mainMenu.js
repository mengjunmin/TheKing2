var Utils = require("./mode/Utils");
var popupManager = require("./unit/popupManager");

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        paytip:{
            default:null,
            type:cc.Node,
        },
        callback: null,
        objecttarget: null,

    },
    mainSence: null,


    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {

    },

    onUserInfo: function (obj, data) {
        cc.log('----->onUserInfo');
        this.mainSence.goToLayer("userinfo");
    },

    onMail: function (obj, data) {
        cc.log('----->onMail');
        this.onCallBack('onMail');
    },

    onGame: function (obj, data) {
        cc.log('----->onGame');
        this.mainSence.goToLayer("gamelobby"); //
    },

    onShop: function (obj, data) {
        cc.log('----->onShop');
        this.onCallBack('onShop');

    },

    onPay: function (obj, data) {
        cc.log('----->onPay');
  

    },

    onFamily: function (obj, data) {
        // this.mainSence.goToLayer("family");
        // this.mainSence.goToLayer("createRole");//
        // this.mainSence.goToLayer("roleList");//

        var CONF = {
            title: '1234',
            content: "仅仅能访问节点自己的组件通常是不够的，脚本通常还需要进行多个节点之间的交互。例如，一门自动瞄准玩家的大炮，就需要不断获取玩家的最新位置。Cocos Creator 提供了一些不同的方法来获得其它节点或组件"
        };
        popupManager.create('noticeBoard', CONF);
    },

    setCallBack: function (fun, target) {
        this.callback = fun;
        this.objecttarget = target;

    },

    onCallBack: function (data) {
        if (this.callback) this.callback.apply(this.objecttarget, [data, 9]);
    },

    onIn: function () {
        cc.log('----->mainMenu onIn');
    },

    onOut: function () {
        cc.log('----->mainMenu onOut');
    },
    // update (dt) {}, family
});