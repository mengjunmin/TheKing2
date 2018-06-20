
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

        mailPrefab:{
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
        var familyJs = family.getComponent('family');  //family
        familyJs.mainSence = this;
        this.familyNode = family;
        family.x = -ws.width;

        var menu = cc.instantiate(this.menuPrefab);
        this.baselayerNode.addChild(menu);
        var menuJs = menu.getComponent('mainMenu');  //family
        menuJs.setCallBack(this.onMenuCallBack, this);
        menuJs.mainSence = this;
        this.menuNode = menu;

        var hud = cc.instantiate(this.hudPrefab);
        this.hudNode.addChild(hud);

        // var popup = new basePopup();
        // this.popupNode.addChild(popup);

    },

    onMenuCallBack(data){
        cc.log('----->onMenuCallBack:', data);
        if(data == 'onMail'){
            var mail = cc.instantiate(this.mailPrefab);
            this.popupNode.addChild(mail);

        }
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
