var global = require('../mode/Global');
var hud = require('../hud');
var Singleton = require("../mode/Singleton");
var basePopup = require("../basePopup");
var Utils = require("../mode/Utils");
var popupManager = require("../unit/popupManager");

cc.Class({
    extends: cc.Component,

    properties: {
        menuPrefab: {
            default: null,
            type: cc.Prefab
        },
        familyPrefab: {
            default: null,
            type: cc.Prefab
        },
        userinfoPrefab: {
            default: null,
            type: cc.Prefab
        },
        gameLobbyPrefab: {
            default: null,
            type: cc.Prefab
        },

        hudPrefab: {
            default: null,
            type: cc.Prefab
        },
        mailPrefab: {
            default: null,
            type: cc.Prefab
        },
        historyScorePrefab: {
            default: null,
            type: cc.Prefab
        },
        shopPrefab: {
            default: null,
            type: cc.Prefab
        },
        myRewardPrefab: {
            default: null,
            type: cc.Prefab
        },
        myCardPrefab: {
            default: null,
            type: cc.Prefab
        },
        notePrefab: {
            default: null,
            type: cc.Prefab
        },

        baselayerNode: {
            default: null,
            type: cc.Node
        },
        popupNode: {
            default: null,
            type: cc.Node
        },
        hudNode: {
            default: null,
            type: cc.Node
        },



    },
    allLayer: null,
    allJs: null,
    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        var ws = cc.director.getWinSize();
        var vs = cc.director.getVisibleSize();
        var vo = cc.director.getVisibleOrigin();
        cc.log('----->ws', ws);
        cc.log('----->vs', vs);
        cc.log('----->vo', vo);

        this.allLayer = {};
        this.allJs = {};

        this.createLayer("mainMenu");

        var hud = cc.instantiate(this.hudPrefab);
        this.hudNode.addChild(hud);

        // var popup = new basePopup();
        // this.popupNode.addChild(popup);

    },

    aaa(data) {
        cc.log('----->aaa:', data);
    },

    onMenuCallBack(data) {
        cc.log('----->onMenuCallBack:', data);
        if (data == 'onMail') {
            // var mail = cc.instantiate(this.mailPrefab);
            // this.popupNode.addChild(mail);

            var conf = {
                closeCallback: this.aaa, // 取消按钮的回调方法
                closeCallbackObj: this, // 取消按钮的回调this
            };
            popupManager.create('mail', conf);


        } else if (data == 'onShop') {
            // var shop = cc.instantiate(this.shopPrefab);
            // this.popupNode.addChild(shop);

            popupManager.create('shop', {});
        } else if (data == 'onGame') {
            cc.director.loadScene('Game');
           
        }

    },

    start() {
        popupManager.init(this);

        var self = this;
        cc.log('----->start');
        setTimeout(function() {
            cc.log('----->2222start');

        }, 2000);


    },

    // var alllayer = ['familyNode', 'menuNode'];

    goToLayer(layername) {
        var ws = cc.director.getWinSize();;
        var currname = layername;
        for (var i = 0; i < Utils.alllayer.length; i++) {
            var layername = Utils.alllayer[i];
            if (layername == currname) {

                if (!this.allLayer[layername]) {
                    this.createLayer(layername);
                } else {
                    this.allLayer[layername].com.x = 0;
                    this.allLayer[layername].js.onIn();
                }

            } else {
                if (this.allLayer[layername]) {
                    this.allLayer[layername].com.x = -ws.width;
                    this.allLayer[layername].js.onOut();
                }
            }
        }

    },

    createLayer(layer) {
        if (layer == "mainMenu") {
            var menu = cc.instantiate(this.menuPrefab);
            this.baselayerNode.addChild(menu);
            var menuJs = menu.getComponent('mainMenu'); //family
            menuJs.setCallBack(this.onMenuCallBack, this);
            menuJs.mainSence = this;
            var obj = {
                com: menu,
                js: menuJs
            }
            this.allLayer['mainMenu'] = obj;
            menuJs.onIn();
        } else if (layer == "family") {
            var family = cc.instantiate(this.familyPrefab);
            this.baselayerNode.addChild(family);
            var familyJs = family.getComponent('family'); //family
            familyJs.mainSence = this;
            var obj = {
                com: family,
                js: familyJs
            }
            this.allLayer['family'] = obj;
            familyJs.onIn();
        } else if (layer == "userinfo") {
            var userinfo = cc.instantiate(this.userinfoPrefab);
            this.baselayerNode.addChild(userinfo);
            var userinfoJs = userinfo.getComponent('userInfo'); //family
            userinfoJs.mainSence = this;
            var obj = {
                com: userinfo,
                js: userinfoJs
            }
            this.allLayer['userinfo'] = obj;
            userinfoJs.onIn();
        }else if (layer == "gamelobby") {
            var gameLobby = cc.instantiate(this.gameLobbyPrefab);
            this.baselayerNode.addChild(gameLobby);
            var gameLobbyJs = gameLobby.getComponent('gamelobby'); //family
            gameLobbyJs.mainSence = this;
            var obj = {
                com: gameLobby,
                js: gameLobbyJs
            }
            this.allLayer['gamelobby'] = obj;
            gameLobbyJs.onIn();
        }




    },

    // update (dt) {},
});