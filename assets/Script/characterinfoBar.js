var userMode = require("./mode/userMode");

cc.Class({
    extends: cc.Component,

    properties: {
        bg: {
            default: null,
            type: cc.Sprite
        },
        avatar: {
            default: null,
            type: cc.Sprite
        },
        nickname: {
            default: null,
            type: cc.Label,
        },

        rankvalue: { //军衔
            default: null,
            type: cc.Label,
        },
        activevalue: { //活跃
            default: null,
            type: cc.Label,
        },
        scorevalue: { //活跃
            default: null,
            type: cc.Label,
        },
        roleType: {
            default: null,
            type: cc.Label
        },

        _data: null,
        _callBack: null,
        _callBackTarget: null,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {

    },

    start() {

    },

    onEnable: function () {
        this.updateView();
    },

    onDisable: function () {

    },

    setData(data) {
        this._data = data;
    },

    setCallBack(fun, target) {
        this._callBack = fun;
        this._callBackTarget = target;
    },

    updateView() {

        this.nickname.string = this._data['nick'] || '';
        this.rankvalue.string = this._data['rankvalue'] || '0';
        this.activevalue.string = this._data['activevalue'] || '0';
        this.scorevalue.string = this._data['scorevalue'] || '0';
        cc.log('----->role item');
        this.select();
        this.setUserAvatar(this._data['face_id'] || 1);
    },

    select() {
        var uid = userMode.getInstance().user.uid;
        var same = this._data['_id'] == uid;

        var color;
        if (same) {
            color =  new cc.Color(126, 14, 14);
        } else {
            color =  new cc.Color(66, 54, 54);
        }

        this.bg.node.color = color;
    },

    setRoleType(status) {
        switch (status) {
            case -10:
                this.roleType.string = '已过期';
                break;
            case 0:
                this.roleType.string = '未使用';
                break;
            case 10:
                this.roleType.string = '未激活';
                break;
            case 100:
                this.roleType.string = '已激活';
                break;
        }
    },

    setUserAvatar: function (avatar) {
        var self = this;

        var idx = avatar < 10 ? ('00' + avatar) : ('0' + avatar);
        var newavatar = "monster" + idx + '_s'
        cc.loader.loadRes(newavatar, cc.SpriteFrame, function (err, spriteFrame) {
            // cc.log('----->spriteFrame:', spriteFrame);
            self.avatar.spriteFrame = spriteFrame;

        });
    },

    onButton() {
        if (this._callBack) {
            this._callBack.apply(this._callBackTarget, [this._data]);
        }
    },
    // update (dt) {},
});