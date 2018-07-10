
var basePopup = require("basePopup");
var userMode = require("./mode/userMode");
var familyModel = require("./mode/familyModel");
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

        

        backBtn :{
            default:null,
            type:cc.Button
        },

        joinBtn :{
            default:null,
            type:cc.Button
        },

        duihuanBtn :{
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
        
        treeNode:{
            default:null,
            type:cc.Node,
        }
    },
    mainSence:null,
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        


    },

    start () {
        //发起联网请求。获取加载那个tree。


    },

    getList(){
        var uid = userMode.getInstance().user.uid;
        var t = userMode.getInstance().user.t;
        var pp = {
            uid: uid,
            t: t,
        }
        familyModel.repFamilyList(pp, this.repFamilyList, this);
    },

    reqFamilyList(data){
        var istree = data.list&&data.list.length>0;

        if(istree){
            this.updataTree(data);
            
        }else{

        }

        this.joinBtn.active = !istree;
    },

    updataTree:function(data){
        
        var type = 1;
        var tree = null;
        if(type == 1){
            tree = cc.instantiate(this.tree1);
            var tree1js = tree.getComponent('tree1');
            tree1js,setData(data );
        }else if(type == 2){
            tree = cc.instantiate(this.tree2);
            var tree2js = tree.getComponent('tree2');
            tree2js,setData(data );
        }
        if(tree){

            this.treeNode.addChild(tree);
        }
        
    },

    onBack:function(obj,data){
        cc.log('----->onShop');
        // cc.log('----->obj:', obj);
        // cc.log('----->data:', data);
        // Utils.goToLayer(this.mainSence, "menuNode");
        this.mainSence.goToLayer("mainMenu");
    },

    onJoin:function(obj,data){
        cc.log('----->onJoin');
        var uid = userMode.getInstance().user.uid;
        var t = userMode.getInstance().user.t;
        var pp = {
            uid: uid,
            t: t,
        }
        familyModel.repFamilyJoin(pp, this.reqJoin, this);

    },

    reqJoin(data){
        cc.log('----->reqJoin:', data);
        this.updataTree(data);
    },

    onDuihuan:function(obj,data){
        cc.log('----->onDuihuan');


    },

    // update (dt) {},
});
