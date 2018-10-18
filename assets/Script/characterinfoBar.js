var userMode = require("./mode/userMode");
var uiUtil = require('./unit/uiUtil');
var allDefine = require("./mode/AllDefine");

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

        var status = this._data['status'] || 0;
        this.setRoleType(status);
    },

    select() {
        var uid = userMode.getInstance().user._id;
        var same = this._data['_id'] == uid;

        var color;
        if (same) {
            color = new cc.Color(126, 14, 14);
        } else {
            color = new cc.Color(66, 54, 54);
        }

        this.bg.node.color = color;
    },
  
    setRoleType(status) {
        switch (status) {
            case allDefine.RoleStatus.Expired:
                this.roleType.string = '已过期';
                break;
            case allDefine.RoleStatus.NotUsed:
                this.roleType.string = '未使用';
                break;
            case allDefine.RoleStatus.NotActive:
                this.roleType.string = '未激活';
                break;
            case allDefine.RoleStatus.AlreadyActivated:
                this.roleType.string = '已激活';
                break;

            case allDefine.RoleStatus.Applying:
                this.roleType.string = '申请中';
                break;
            case allDefine.RoleStatus.ApplySuccess:
                this.roleType.string = '申请成功';
                break;
            case allDefine.RoleStatus.ApplyFail:
                this.roleType.string = '申请失败';
                break;
        }
    },

    setUserAvatar: function (avatar) {
        var self = this;
        uiUtil.setAvatar(self.avatar, avatar);
    },

    onButton() {
        if (this._callBack) {
            this._callBack.apply(this._callBackTarget, [this._data]);
        }
    },
    // update (dt) {},
});