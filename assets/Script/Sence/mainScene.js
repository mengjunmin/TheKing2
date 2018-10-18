
var popupManager = require("../unit/popupManager");
var userMode = require("../mode/userMode");
var MessageCenter = require('../Signal/MessageCenter');
var loginModel = require("../mode/loginModel");
var LayerManager = require('../unit/layerManager');

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
        toasterPrefab: {
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
        jewelShopPrefab: {
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
        noticeBoardPrefab: {
            default: null,
            type: cc.Prefab
        },
        noticeBoardUrlPrefab: {
            default: null,
            type: cc.Prefab
        },
        noticePicPrefab: {
            default: null,
            type: cc.Prefab
        },
        lockPrefab: {
            default: null,
            type: cc.Prefab
        },
        lockNode: {
            default: null,
            type: cc.Node
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
        horseNode: {
            default: null,
            type: cc.Node
        },
        createRolePrefab: {
            default: null,
            type: cc.Prefab
        },
        characterInfoPrefab: {
            default: null,
            type: cc.Prefab
        },
        avatarlistPrefab: {
            default: null,
            type: cc.Prefab
        },
        horsePrefab: {
            default: null,
            type: cc.Prefab
        },

        _lockScreen: null,
    },
    allLayer: null,
    allJs: null,
    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        cc.log('----->mainScene  onLoad');
        this.allLayer = {};
        this.allJs = {};
        this._lockScreen = null;
        LayerManager.init(this);
        popupManager.init(this);

        if (userMode.getInstance().showLayer == '') {
            LayerManager.goToLayer("roleList");//mainMenu
        } else {
            LayerManager.goToLayer(userMode.getInstance().showLayer);
        }


        var hud = cc.instantiate(this.hudPrefab);
        this.hudNode.addChild(hud);

        var house = cc.instantiate(this.horsePrefab);
        this.horseNode.addChild(house);

    },


    start() {
        cc.log('----->mainScene  start');
        var self = this;
        

        // this.getPowerConfig();

    },

    getPowerConfig() {
        var date = new Date();
        var time = date.getTime();

        var params = {
            time: time,
        };
        loginModel.repPowerConfig(params, this.onPowerConfig, this, null, this);
    },

    onPowerConfig(data) {
        var timespan = data.timespan;
        userMode.getInstance().timespan = timespan;

        var splash = data['splash']; //image  url
        var notification_page = data['notification_page']; //html
        var notification = data['notification']; //next
        var notice = data['notice']; //UBB

        var calkback = function () {

        }

        if (splash) {
            cc.log('=====>splash: ', splash);
            var conf = {
                url: splash,
            };
            popupManager.create('noticePic', conf);
        }

        // if (notification_page) {
        //     cc.log('=====>notification_page: ', notification_page);
        //     var conf = {
        //         url: notification_page,
        //     };
        //     popupManager.create('noticeBoardUrl', conf);
        // }

        // if (notification) {
        //     cc.log('=====>notification: ', notification);
        //     var conf = {
        //         title: '8888888',
        //         content: notification,
        //     };
        //     popupManager.create('noticeBoard', conf);
        // }

        // if (notice) {
        //     cc.log('=====>notice: ', notice);
        //     var conf = {
        //         title: '8888888',
        //         content: notice,
        //     };
        //     popupManager.create('noticeBoard', conf);
        // }

        // cc.log('onCalibrationTime: ', data);
    },

    onEnable: function () {
        cc.log('----->mainScene  onEnable');
        MessageCenter.LOCKSCREEN.on(this.lockScreen, this);
    },

    onDisable: function () {
        cc.log('----->mainScene  onDisable');
        MessageCenter.LOCKSCREEN.off(this.lockScreen, this);
    },



    lockScreen(lock) {
        if (lock) {
            if (!this._lockScreen) {
                this._lockScreen = cc.instantiate(this.lockPrefab);
                this.lockNode.addChild(this._lockScreen);
            }
        } else {
            if (this._lockScreen) {
                this._lockScreen.destroy();
                this._lockScreen = null;
            }
        }

    },

    // update (dt) {},


});