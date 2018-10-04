// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

var global = require('Global');
var userMode = require("./mode/userMode");
var MessageCenter = require('./Signal/MessageCenter');

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

        self.updateView();

    },

    start() {

    },

    onEnable: function () {
        MessageCenter.UPDATE_HUD.on(this.updateView, this);
    },

    onDisable: function () {
        MessageCenter.UPDATE_HUD.off(this.updateView, this);
    },

    updateView(){
        var faceid = userMode.getInstance().user.face_id || 1;
        var nick = userMode.getInstance().user.nick || '无名先生';
        var level = userMode.getInstance().user.level || 1;

        this.setUserAvatar(faceid);
        this.setUserFrame(global.user['frame'] || '001');
        this.setName(nick);
        this.setGold(global.user['userGold']);
        this.setLevel(global.user['userLevel']);
        this.temp.enabled = false;
    },

    onPay: function(obj, data) {
        cc.log('----->onPay');
        // cc.log('----->obj:', obj);
        // cc.log('----->data:', data);


    },

    setName: function(name) {
        this.nickName.string = name;
        // cc.log('----> this.nickName: ', this.nickName);
    },

    setLevel: function(level) {
        this.userLevel.string = 'LV.' +level;
    },

    setGold: function(gold) {
        this.userGold.string = gold;
    },

    setUserFrame: function(frame) {
        var self = this;
        if (frame == '') return;

        if (this._currFrame != '') {
            var frame = "frame" + this._currFrame;
            cc.loader.releaseRes(frame, cc.SpriteFrame);
        }

        this._currFrame = frame;
        var newframe = "frame" + "001";
        cc.loader.loadRes(newframe, cc.SpriteFrame, function(err, spriteFrame) {
            cc.log('----->spriteFrame:', spriteFrame);
            self.userFrame.spriteFrame = spriteFrame;
        });
    },

    setUserAvatar: function(avatar) {
        var self = this;
        if (avatar < 10) {
            avatar = '00' + avatar;
        } else {
            avatar = '0' + avatar;
        }

        if (this._currAvatar != '') {
            var oldavatar = "monster" + this._currFrame + '_s';
            cc.loader.releaseRes(oldavatar, cc.SpriteFrame);
        }

        this._currAvatar = avatar;
        var newavatar = "monster" + avatar + '_s';
        cc.loader.loadRes(newavatar, cc.SpriteFrame, function(err, spriteFrame) {
            cc.log('----->spriteFrame:', spriteFrame);
            self.userAvatar.spriteFrame = spriteFrame;
        });
    },



    // update (dt) {},



});