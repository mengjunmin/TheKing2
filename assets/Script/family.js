
var basePopup = require("basePopup");
cc.Class({
    extends: basePopup,

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

        backBtn :{
            default:null,
            type:cc.Button
        },

        tree1:{
            default:null,
            type:cc.Prefab,
        },

        tree2:{
            default:null,
            type:cc.Prefab,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        


    },

    start () {
        //发起联网请求。获取加载那个tree。

        this.addTree();
    },

    addTree:function(){
        var type = 1;
        var tree = null;
        if(type == 1){
            tree = cc.instantiate(this.tree1);
        }else if(type == 2){
            vtree = cc.instantiate(this.tree2);
        }
        if(tree){
            this.node.addChild(tree);
        }
        
    },

    onBack:function(obj,data){
        cc.log('----->onShop');
        // cc.log('----->obj:', obj);
        // cc.log('----->data:', data);


    },

    // update (dt) {},
});
