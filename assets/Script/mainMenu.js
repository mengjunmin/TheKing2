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

        callback:null,
        objecttarget:null,

    },
    mainSence:null,


    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
      
    },

    onUserInfo:function(obj,data){
        cc.log('----->onUserInfo');
        // cc.log('----->obj:', obj);
        // cc.log('----->data:', data);

        this.mainSence.goToLayer("userinfo");
    },

    onMail:function(obj,data){
        cc.log('----->onMail');
        // cc.log('----->obj:', obj);
        // cc.log('----->data:', data);

        this.onCallBack('onMail');
    },

    onGame:function(obj,data){
        cc.log('----->onGame');
        // cc.log('----->obj:', obj);
        // cc.log('----->data:', data);

        this.onCallBack('onGame');
    },

    onShop:function(obj,data){
        cc.log('----->onShop');
        // cc.log('----->obj:', obj);
        // cc.log('----->data:', data);

        this.onCallBack('onShop');

    },

    onFamily:function(obj,data){
        this.mainSence.goToLayer("family");
        // Utils.goToLayer(this.mainSence, currname);

    },

    setCallBack:function(fun,target){
        this.callback = fun;
        this.objecttarget = target;

    },

    onCallBack:function(data){
        if (this.callback) this.callback.apply(this.objecttarget, [data]);
    }
    // update (dt) {}, family
});
