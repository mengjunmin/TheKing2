// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
var global = require('../mode/Global'); 
var hud = require('../hud'); 
var Singleton = require("../mode/Singleton");
var basePopup = require("../basePopup");

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
        menuPrefab:{
        	default:null,
        	type:cc.Prefab
        },

        familyPrefab:{
        	default:null,
        	type:cc.Prefab
        },

        hudPrefab:{
        	default:null,
        	type:cc.Prefab
        },

        gameNode:{
            default:null,
            type:cc.Node
        },
        baselayerNode:{
            default:null,
            type:cc.Node
        },
        shopNode:{
            default:null,
            type:cc.Node
        },
        popupNode:{
            default:null,
            type:cc.Node
        },
 
        hudNode:{
            default:null,
            type:cc.Node
        },


    },

    familyNode:null,
    menuNode:null,
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        var ws = cc.director.getWinSize();
        var vs = cc.director.getVisibleSize();	
        var vo = cc.director.getVisibleOrigin();
        cc.log('----->ws', ws);
        cc.log('----->vs', vs);
        cc.log('----->vo', vo);



        var family = cc.instantiate(this.familyPrefab);
        this.baselayerNode.addChild(family);
        family.mainSence = this;
        this.familyNode = family;
        family.x = -ws.width;

        var menu = cc.instantiate(this.menuPrefab);
        this.baselayerNode.addChild(menu);
        menu.mainSence = this;
        this.menuNode = menu;

        var hud = cc.instantiate(this.hudPrefab);
        this.hudNode.addChild(hud);

        // var popup = new basePopup();
        // this.popupNode.addChild(popup);

    },

    start () {
        var self = this;
        cc.log('----->start');
        setTimeout(function(){
            cc.log('----->2222start');
            // if(self.menuNode)
            {
                // self.menuNode.removeAllChildren();
            }
            
        },2000);

        // Singleton._instance.printInfo();
        
    },



    
    // update (dt) {},
});