
var userMode = require("./mode/userMode");
var popupManager = require("./unit/popupManager");
var createRoleModel = require("./mode/createRoleModel");
var userInfoModel = require("./mode/userInfoModel");
var Consume = require('./unit/consume');
var LayerManager = require('./unit/layerManager');
var uiUtil = require('./unit/uiUtil');

//http://59.110.138.129:112/gapi/account/invite/init?parent_uid=0000-00000000-0000&parent_invite=000000&token=
//HVGD6
//e378b167-3822-4f13-b8f6-c73ca1c6d629
cc.Class({
    extends: cc.Component,

    properties: {

        editName: {
            default: null,
            type: cc.EditBox
        },

        editInviteCode: {
            default: null,
            type: cc.EditBox
        },

        backBtn: {
            default: null,
            type: cc.Button
        },

        sysBtn: {
            default: null,
            type: cc.Button
        },

        avatarBtn: {
            default: null,
            type: cc.Button
        },

        doneBtn: {
            default: null,
            type: cc.Button
        },

        sexBtn: {
            default: null,
            type: cc.ToggleContainer,
        },

        notePrefab: {
            default: null,
            type: cc.Prefab
        },

        userAvatar: {
            default: null,
            type: cc.Sprite
        },


        mainSence: null,
        _sex: true,
        _faceid: 1,
        temp: null,

    },

    // LIFE-CYCLE CALLBACKS:
    ctor: function () {
        console.log('----->createRole  ctor');
        var self = this;

    },

    onLoad() {

    },

    start() {
        this._sex = true;
        this._faceid = 1;

        cc.log('this._sex: ', this._sex);
        cc.log('this.faceid: ', this._faceid);
        this.onAvatarList(this._faceid);//默认头像
    },

    // update (dt) {},
    //phone
    onNameEditDidBegan: function (editbox, customEventData) {
        cc.log('onEditDidBegan: ', customEventData);
    },
    //假设这个回调是给 editingDidEnded 事件的
    onNameEditDidEnded: function (editbox, customEventData) {
        cc.log('onEditDidEnded: ', customEventData);
    },
    //假设这个回调是给 textChanged 事件的
    onNameTextChanged: function (text, editbox, customEventData) {
        editbox.string = editbox.string.replace(/(^\s+)|(\s+$)/g, "");//去除空格
        cc.log('onNameTextChanged: ', editbox.string);
    },
    //假设这个回调是给 editingReturn 事件的
    onNameEditingReturn: function (editbox, customEventData) {
        cc.log('onEditingReturn: ', customEventData);
    },


    //邀请码
    onInviteEditDidBegan: function (editbox, customEventData) { },
    onInviteEditDidEnded: function (editbox, customEventData) { },
    onInviteTextChanged: function (text, editbox, customEventData) {
        editbox.string = editbox.string.replace(/[^\w\/]/ig, ''); //英文数字
    },
    onInviteEditingReturn: function (editbox, customEventData) { },


    onSysBtton: function (btn) {
        cc.log('btn: ', btn);

        // cc.director.loadScene('HelloWorld');
    },

    onBackBtton: function (btn) {
        LayerManager.goToLayer("roleList");//"mainMenu"
    },

    onAvatarBtton: function (btn) {
        return;

        var conf = {
            idx: 1,
            fun: this.onAvatarList,
            target: this,
        };
        popupManager.create('avatarlist', conf);
    },

    onAvatarList(data) {
        this._faceid = data;
        this.setUserAvatar(data);
        cc.log('onAvatarList: this._faceid: ', this._faceid);
    },

    setUserAvatar: function (avatar) {
        var self = this;
        uiUtil.setAvatar(self.userAvatar, avatar);
    },

    onSexBtton: function (btn, data) {
        this._sex = data == 0 ? true : false;
        cc.log('this.sex: ', this._sex);
    },

    onDoneBtton: function (btn) {
        // this.activeRoleNote();
        // return;

        var uid = userMode.getInstance().user.uid;
        var token = userMode.getInstance().user.token;
        var nick = this.editName.string;
        var inviteCode = this.editInviteCode.string;
        cc.log('----->onDoneBtton inviteCode: ', inviteCode);
        if (nick == null || nick == '') {
            cc.log('name can not null');
            return;
        }
        if (inviteCode.length == 0) {
            cc.log('邀请码不对');
            return;
        }

        var params = {
            token: token,
            invite: inviteCode,
        };

        createRoleModel.repCreateRole(params, this.repCreateRole, this.repCreateRoleFail, this);
    },

    repCreateRole(data) {
        cc.log('----->createRole success: ', data);
        this.completeInfo();
    },

    repCreateRoleFail(data) {
        cc.log('----->createRole fail: ', data);
        var self = this;
        var onOk = function () {

        };
        var CONF = {
            title: '',
            content: "创建新角色失败！",
            okLabel: null,
            cancelLabel: null,
            cancelCallback: null, // 取消
            cancelCallbackObj: self, // 取消
            okCallback: onOk, // 确定
            okCallbackObj: self, // 确定
        };
        popupManager.create('note', CONF);
    },

    completeInfo() {
        var uid = userMode.getInstance().user.uid;
        var token = userMode.getInstance().user.token;
        var nick = this.editName.string;
        var sex = this._sex;
        var face_id = this._faceid;
        var inviteCode = this.editInviteCode.string;

        if (nick == null || nick == '') {
            cc.log('name can not null');
            return;
        }
        if (inviteCode.length == 0) {
            cc.log('邀请码不对');
            return;
        }

        var params = {
            token: token,
            invite: inviteCode,
            nick: nick,
            sex: sex,
            face_id: face_id,
        };

        userInfoModel.repUpdateUserInfo(params, this.onCompleteInfo, this);
    },

    onCompleteInfo(data) {
        var self = this;
        this.activeRoleNote();
    },

    updateRole(){
        var token = userMode.getInstance().user.token;
        var uid = this.editInviteCode.string;
        var params = {
            token: token,
            invite: uid,
        }
        UserInfoModel.repFullUserInfo(params, this.repFullUserInfo, this);
    },

    repFullUserInfo(data) {
        userMode.getInstance().updataUser(data);
        MessageCenter.UPDATE_HUD.emit();
        this.onBackBtton(null);
        this.activeRoleNote();
    },

    activeRoleNote() {
        var self = this;
        var onCancel = function () {
            self.cancelRoleNote();
        }
        var onOk = function () {
            //购买角色代码
            if (Consume.jewelsIsEnough(600)) {
                popupManager.create('shop');
            }else{
           
            }
        }
        var CONF = {
            title: '角色激活',
            content: "花费钻石600，激活该角色，是否激活？",
            okLabel: '激活',
            cancelLabel: '取消',
            cancelCallback: onCancel, // 取消
            cancelCallbackObj: self, // 取消
            okCallback: onOk, // 确定
            okCallbackObj: self, // 确定
            showCloseBtn: false,
        };
        popupManager.create('note', CONF);
    },

    cancelRoleNote() {
        var self = this;
        var onCancel = function () {
            LayerManager.goToLayer("mainMenu");
        }
        var onOk = function () {
            self.activeRoleNote();
        }
        var CONF = {
            title: '激活提示',
            content: "激活失败，请在48小时内激活该角色，超时后角色将被回收",
            okLabel: '激活',
            cancelLabel: '取消',
            cancelCallback: onCancel, // 取消
            cancelCallbackObj: self, // 取消
            okCallback: onOk, // 确定
            okCallbackObj: self, // 确定
            showCloseBtn: false,
        };
        popupManager.create('note', CONF);
    },


    onIn: function () {
        cc.log('----->createRole onIn');

    },

    onOut: function () {
        cc.log('----->createRole onOut');
    },

    setData(data) {
        if (!!data) {
            var invite = data.invite;
            this.editInviteCode.string = invite;
        }
    },

});