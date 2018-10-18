var userMode = require("./mode/userMode");
var userInfoModel = require("./mode/userInfoModel");
var popupManager = require("./unit/popupManager");
var LayerManager = require('./unit/layerManager');
var uiUtil = require('./unit/uiUtil');

cc.Class({
    extends: cc.Component,

    properties: {
        avatar: {
            default: null,
            type: cc.Sprite,
        },
        nicknameLable: {
            default: null,
            type: cc.Label,
        },
        sexLable: {
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
        avatarBtn: {
            default: null,
            type: cc.Button,
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
        faceid:null,
    },

    // LIFE-CYCLE CALLBACKS:
    ctor:function () {
         var self = this;
    },

    onLoad() {

    },

    start() {
        
    },

    onEnable: function () {
        cc.log('onEnable: ');
        this.updataView();
    },

    onDisable: function () {
        cc.log('onDisable: ');
    },

    getFullUserIfo() {
        var uid = userMode.getInstance().user._id;
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
        var face_id = userMode.getInstance().user.face_id;
        this.nicknameLable.string = userMode.getInstance().user.nick || '';
        this.sexLable.string = userMode.getInstance().user.sex?'男':'女';
        this.levelLable.string = 'LV.' + userMode.getInstance().user.level;
        this.diamondsLable.string = '120';
        this.scoreLable.string = userMode.getInstance().user.score || 0;
        this.activityLable.string = '90%';
        this.setUserAvatar(face_id || 1);
    },

    onAvatarBtton: function (btn) {

        var conf = {
            idx: 1,
            fun: this.onAvatarList,
            target: this,
        };
        popupManager.create('avatarlist', conf);
    },

    onAvatarList(data) {
        this.faceid = data;
        this.setUserAvatar(data);
        cc.log('onAvatarList: this.faceid: ', this.faceid);
    },

    setUserAvatar: function (avatar) {
        var self = this;
        uiUtil.setAvatar(self.avatar, avatar);
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
        LayerManager.goToLayer("mainMenu");
    },

    onIn: function() {
        cc.log('----->userInfo onIn');
        // this.getFullUserIfo();
    },

    onOut: function() {
        cc.log('----->userInfo onOut');
    },

    setData(data) {
        
    },
    
    // update (dt) {},
});