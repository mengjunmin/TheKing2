var userMode = require("./mode/userMode");
var userInfoModel = require("./mode/userInfoModel");
var Utils = require("./mode/Utils");
var popupManager = require("./unit/popupManager");


cc.Class({
    extends: cc.Component,

    properties: {
        gameidLable: {
            default: null,
            type: cc.Label,
        },
        nicknameLable: {
            default: null,
            type: cc.Label,
        },
        sexLable: {
            default: null,
            type: cc.Label,
        },
        familyLable: {
            default: null,
            type: cc.Label,
        },
        identityLable: {
            default: null,
            type: cc.Label,
        },
        levelLable: {
            default: null,
            type: cc.Label,
        },
        diamondsLable: {
            default: null,
            type: cc.Label,
        },
        scoreLable: {
            default: null,
            type: cc.Label,
        },
        activityLable: {
            default: null,
            type: cc.Label,
        },
        historyScoreBtn: {
            default: null,
            type: cc.Button,
        },
        invitationCardBtn: {
            default: null,
            type: cc.Button,
        },
        rewardBtn: {
            default: null,
            type: cc.Button,
        },
        backBtn: {
            default: null,
            type: cc.Button,
        },
        historyScorePrefab: {
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

        mainSence: null,
        data: null,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {

    },

    start() {
        
    },

    getFullUserIfo() {
        var uid = userMode.getInstance().user.uid;
        var t = userMode.getInstance().user.t;
        var pp = {
            uid: uid,
            t: t,
        }
        userInfoModel.repFullUserInfo(pp, this.repFullUserInfo, this);
    },

    repFullUserInfo(data) {
        this.data = data;
        this.updataView();
    },

    updataView() {
        this.gameidLable.string = '123456';
        this.nicknameLable.string = 'shit';
        this.sexLable.string = '男';
        this.familyLable.string = '天下第一帮';
        this.identityLable.string = '大长老';
        this.levelLable.string = 'LV.2';
        this.diamondsLable.string = '120';
        this.scoreLable.string = '234990';
        this.activityLable.string = '90%';
    },

    onHistoryScoreBtn: function(obj, data) {
        cc.log('----->onHistoryScoreBtn');

        var conf = {
            closeCallback: this.aaa, // 取消按钮的回调方法
            closeCallbackObj: this, // 取消按钮的回调this
        };
        popupManager.create('historyscore', conf);
    },

    onInvitationCardBtn: function(obj, data) {
        cc.log('----->onInvitationCardBtn');
        var conf = {
            closeCallback: this.aaa, // 取消按钮的回调方法
            closeCallbackObj: this, // 取消按钮的回调this
        };
        popupManager.create('mycard', conf);

    },

    onRewardBtn: function(obj, data) {
        cc.log('----->onRewardBtn');
        var conf = {
            closeCallback: this.aaa, // 取消按钮的回调方法
            closeCallbackObj: this, // 取消按钮的回调this
        };
        popupManager.create('myreward', conf);
    },

    onBack: function(obj, data) {
        cc.log('----->onShop');
        // cc.log('----->obj:', obj);
        // cc.log('----->data:', data);
        // Utils.goToLayer(this.mainSence, "menuNode");
        this.mainSence.goToLayer("mainMenu");
    },

    onIn: function() {
        cc.log('----->userInfo onIn');
        this.getFullUserIfo();
    },

    onOut: function() {
        cc.log('----->userInfo onOut');
    },

    // update (dt) {},
});