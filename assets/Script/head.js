var global = require('Global');

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

        _data: null,
    },


    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        // this.userAvatar;
        var self = this;
        // cc.loader.loadRes("frame001", function (err, texture) {
        //     cc.log('----->texture:', texture);
        //     self.userHead.setTexture(texture);
        // });

    },

    start() {

    },

    setName(name) {
        this.nickName.string = name;
    },

    setLevel(level) {
        this.userLevel.string = level;
    },

    setUserFrame(frame) {
        var self = this;
        if (frame < 10) {
            frame = '00' + frame;
        } else {
            frame = '0' + frame;
        }

        if (this._currFrame != '') {
            var oldframe = "frame" + this._currFrame;
            cc.loader.releaseRes(oldframe, cc.SpriteFrame);
        }

        this._currFrame = frame;
        var newframe = "frame" + frame;
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

    setData(data) {
        this._data = data;
        cc.log('[head] setData:', data);
        var nick = this._data.nick;
        var faceid = this._data.face_id;
        var frame = this._data['frame'] || 1;

        this.setName(nick);
        this.setUserAvatar(faceid);
        this.setUserFrame(frame);
    },


    // update (dt) {},



});