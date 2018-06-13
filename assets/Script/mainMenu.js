

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
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    onUserInfo:function(obj,data){
        cc.log('----->onUserInfo');
        // cc.log('----->obj:', obj);
        // cc.log('----->data:', data);


    },

    onMail:function(obj,data){
        cc.log('----->onMail');
        // cc.log('----->obj:', obj);
        // cc.log('----->data:', data);


    },

    onGame:function(obj,data){
        cc.log('----->onGame');
        // cc.log('----->obj:', obj);
        // cc.log('----->data:', data);


    },

    onShop:function(obj,data){
        cc.log('----->onShop');
        // cc.log('----->obj:', obj);
        // cc.log('----->data:', data);


    },

    onFamily:function(obj,data){
        cc.log('----->onFamily');
        // cc.log('----->obj:', obj);
        // cc.log('----->data:', data);


    },
    // update (dt) {}, family
});
