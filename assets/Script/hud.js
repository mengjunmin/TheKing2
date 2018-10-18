// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html


var userMode = require("./mode/userMode");
var MessageCenter = require('./Signal/MessageCenter');
var uiUtil = require('./unit/uiUtil');
var popupManager = require("./unit/popupManager");


cc.Class({
    extends: cc.Component,

    properties: {
        _currFrame: '',
        _currAvatar: '',

        nickName: {
            default: null,
            type: cc.Label,
        },
        userLevel: {
            default: null,
            type: cc.Label,
        },
        userFrame: {
            default: null,
            type: cc.Sprite,
        },
        userAvatar: {
            default: null,
            type: cc.Sprite,
        },
        userGold: {
            default: null,
            type: cc.Label,
        },
        temp: {
            default: null,
            type: cc.Label,
        },
    },


    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        var self = this;

        self.updateView(null);

    },

    start() {

    },

    onEnable: function () {
        MessageCenter.UPDATE_HUD.on(this.updateView, this);
    },

    onDisable: function () {
        MessageCenter.UPDATE_HUD.off(this.updateView, this);
    },

    updateView(args){
        cc.log('----->hud updateView: ', args);
        var user = userMode.getInstance().user;
        cc.log('----->hud updateView: ', user);
        var faceid = userMode.getInstance().user['face_id'] || 0;
        var nick = userMode.getInstance().user['nick'] || '';
        var level = userMode.getInstance().user['level'] || -1;
        var frame = userMode.getInstance().user['frame'] || 1;
        var jewels = userMode.getInstance().user['jewels'] || 0;

        this.setUserAvatar(faceid);
        this.setUserFrame(frame);
        this.setName(nick);
        this.setGold(jewels);
        this.setLevel(level);
        this.temp.enabled = false;
    },

    onPay: function(obj, data) {
        cc.log('----->onPay');
        popupManager.create('jewelShop', {});

    },

    setName: function(name) {
        this.nickName.string = name;
    },

    setLevel: function(level) {
        level = level==-1?'':('LV.' +level);
        this.userLevel.string = level;
    },

    setGold: function(gold) {
        this.userGold.string = gold;
    },

    setUserFrame: function(frame) {
        var self = this;
        this._currFrame = frame;

        uiUtil.setFrame(self.userFrame, frame);
    },

    setUserAvatar: function(avatar) {
        var self = this;
        this._currAvatar = avatar;
        uiUtil.setAvatar(self.userAvatar, avatar);
    },



    // update (dt) {},



});