

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
    mainSence:null,

    alllayer:null,
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.alllayer = ['familyNode', 'menuNode'];
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
        var ws = cc.director.getWinSize();
        cc.log('----->onFamily: ', this.alllayer);
        // cc.log('----->obj:', obj);
        // cc.log('----->data:', data);
        var currname = 'familyNode';
        this.showLayer(currname);

    },

    showLayer:function(name){
        var ws = cc.director.getWinSize();;
        var currname = name;
        for(var i=0; i<this.alllayer.length;i++){
            var layername = this.alllayer[i];
            if(layername == currname){
                this.node.mainSence[layername].x = 0;
            }else{
                this.node.mainSence[layername].x = -ws.width;
            }
        }

    },
    // update (dt) {}, family
});
