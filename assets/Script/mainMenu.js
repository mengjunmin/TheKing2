var Utils = require("./mode/Utils");


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

        callback: null,
        objecttarget: null,

    },
    mainSence: null,


    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {

    },

    onUserInfo: function(obj, data) {
        cc.log('----->onUserInfo');
        this.mainSence.goToLayer("userinfo");
    },

    onMail: function(obj, data) {
        cc.log('----->onMail');
        this.onCallBack('onMail');
    },

    onGame: function(obj, data) {
        cc.log('----->onGame');
        this.mainSence.goToLayer("gamelobby");//
    },

    onShop: function(obj, data) {
        cc.log('----->onShop');
        this.onCallBack('onShop');

    },

    onFamily: function(obj, data) {
        // this.mainSence.goToLayer("family");
        // this.mainSence.goToLayer("createRole");//
        this.mainSence.goToLayer("roleList");//
    },

    setCallBack: function(fun, target) {
        this.callback = fun;
        this.objecttarget = target;

    },

    onCallBack: function(data) {
        if (this.callback) this.callback.apply(this.objecttarget, [data, 9]);
    },

    onIn: function() {
        cc.log('----->mainMenu onIn');
    },

    onOut: function() {
        cc.log('----->mainMenu onOut');
    },
    // update (dt) {}, family
});