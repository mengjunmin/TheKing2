var registerModel = require("../mode/registerModel");
var userMode = require("../mode/userMode");
var popupManager = require("../unit/popupManager");
var fileManager = require("../mode/fileManager");

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
        sex: 0,
        faceid: 0,
        temp: null,

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {


    },

    start() {

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
        // this.label.string = text;
    },
    //假设这个回调是给 editingReturn 事件的
    onNameEditingReturn: function (editbox, customEventData) {
        cc.log('onEditingReturn: ', customEventData);
    },


    //邀请码
    onInviteEditDidBegan: function (editbox, customEventData) {

    },

    onInviteEditDidEnded: function (editbox, customEventData) {

    },

    onInviteTextChanged: function (text, editbox, customEventData) {

        editbox.string = editbox.string.replace(/[^\w\/]/ig, ''); //英文数字
    },

    onInviteEditingReturn: function (editbox, customEventData) {

    },


    onSysBtton: function (btn) {

        cc.log('btn: ', btn);

        // cc.director.loadScene('HelloWorld');
    },

    onBackBtton: function (btn) {
        cc.log('btn: ', btn);
        // this.mainSence.goToLayer("mainMenu");//roleList
        this.mainSence.goToLayer("roleList");
    },

    onAvatarBtton: function (btn) {
        //换出头像框列表，注册回调获取avatar。
        // this.head = 1;
        // var list = cc.instantiate(this.avatarlistPrefab);
        // this.popupNode.addChild(list);
        // var avatarJs = list.getComponent('avatarList');  //family
        // avatarJs.setData(0);
        // avatarJs.setCallBack(this.onAvatarList, this);

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

        var idx = avatar < 10 ? ('00' + avatar) : ('0' + avatar);
        var newavatar = "monster" + idx + '_s'
        cc.loader.loadRes(newavatar, cc.SpriteFrame, function (err, spriteFrame) {
            cc.log('----->spriteFrame:', spriteFrame);
            self.userAvatar.spriteFrame = spriteFrame;

        });
    },

    onSexBtton: function (btn, data) {
        cc.log('onSexBtton: ', data);
        this.sex = data;
    },

    onDoneBtton: function (btn) {
        //这里 editbox 是一个 cc.EditBox 对象
        //这里的 customEventData 参数就等于你之前设置的 "foobar"
        var uid = userMode.getInstance().user.uid;
        var t = userMode.getInstance().user.t;
        var nick = this.editName.string;
        var sex = this.sex;
        var faceid = this.faceid;
        var inviteCode = this.editInviteCode.string;

        if (nick == null || nick == '') {
            cc.log('name can not null');
            return;
        }
        if (inviteCode.length < 6) {
            cc.log('邀请码不对');
            return;
        }

        var params = {
            uid: uid,
            token: t,
            nick: nick,
            sex: sex,
            face_id: faceid,
            password: password
        };
        this.temp = params;

        registerModel.repUpdateUser(params, this.requestLogin, this);
    },

    requestLogin(data) {

        for (var key in this.temp) {
            userMode.getInstance().user[key] = this.temp[key];
        }

        fileManager.getInstance().saveStartApp();

        cc.director.loadScene('mainScene');
    },


    onIn: function () {
        cc.log('----->createRole onIn');

    },

    onOut: function () {
        cc.log('----->createRole onOut');
    },


});