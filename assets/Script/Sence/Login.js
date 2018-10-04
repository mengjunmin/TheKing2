var loginModel = require("../mode/loginModel");
var fileManager = require("../mode/fileManager");
var userMode = require("../mode/userMode");
var popupManager = require("../unit/popupManager");
var MessageCenter = require('../Signal/MessageCenter');

cc.Class({
    extends: cc.Component,

    properties: {
        notePrefab: {
            default: null,
            type: cc.Prefab
        },
        toasterPrefab: {
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

        popupNode: {
            default: null,
            type: cc.Node
        },
        editPhone: {
            default: null,
            type: cc.EditBox
        },


        editPassword: {
            default: null,
            type: cc.EditBox
        },


        forgetPassBtn: {
            default: null,
            type: cc.Button
        },
        registerBtn: {
            default: null,
            type: cc.Button
        },
        loginBtn: {
            default: null,
            type: cc.Button
        },

        toggleBtn: {
            default: null,
            type: cc.Toggle
        },


        lastPhone: null,
        passWord: null,
        isSavePassWord: null,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.lastPhone = userMode.getInstance().getLastPhone();
        this.isSavePassWord = userMode.getInstance().getIsSavePassWord();
        if (this.isSavePassWord && this.lastPhone) {
            this.passWord = userMode.getInstance().getLoginPassWord(this.lastPhone);
        }

        cc.log('this.lastPhone: ',this.lastPhone);
        cc.log('this.isSavePassWord: ',this.isSavePassWord);
        cc.log('this.passWord: ',this.passWord);
    },


    start() {
        cc.log('[Login]    start: ');
        popupManager.init(this);

        if (this.lastPhone) {
            this.editPhone.string = this.lastPhone;
        }
        if (this.isSavePassWord && this.lastPhone && this.passWord) {
            this.editPassword.string = this.passWord;
        }
    },

    onEnable: function () {
        MessageCenter.LOCKSCREEN.on(this.lockScreen, this);
    },

    onDisable: function () {
        MessageCenter.LOCKSCREEN.off(this.lockScreen, this);
    },

    lockScreen(){

    },
    unlockScreen(){

    },
    
    // update (dt) {},
    //phone
    onPhoneEditDidBegan: function (editbox, customEventData) {},
    onPhoneEditDidEnded: function (editbox, customEventData) {},
    onPhoneTextChanged: function (text, editbox, customEventData) {
        var phone = editbox.string;
    },
    onPhoneEditingReturn: function (editbox, customEventData) {},



    //Password
    onPasswordEditDidBegan: function (editbox, customEventData) {},
    onPasswordEditDidEnded: function (editbox, customEventData) {},
    onPasswordTextChanged: function (text, editbox, customEventData) {
        editbox.string = editbox.string.replace(/[^\w\/]/ig, ''); //英文数字
    },
    onPasswordEditingReturn: function (editbox, customEventData) {},




    //Check
    onCheckEditDidBegan: function (editbox, customEventData) {},
    onCheckEditDidEnded: function (editbox, customEventData) {},
    onCheckTextChanged: function (text, editbox, customEventData) {
        editbox.string = editbox.string.replace(/[^\w\/]/ig, ''); //英文数字
    },
    onCheckEditingReturn: function (editbox, customEventData) {},


    onForgetBtton: function (btn) {
        cc.director.loadScene('RetrievePassword');
    },

    onRegisterBtton: function (btn) {
        cc.director.loadScene('Register');

    },

    onLoginBtton: function (btn) {
        var phone = this.editPhone.string;
        var password = this.editPassword.string;

        if (phone.length != 11) {
            cc.log('手机号不够11位 ');
            return;
        }

        if (password.length == 0) {
            cc.log('输入密码 ');
            return;
        }

        var params = {
            phone: phone,
            password: password,
        };

        this.lastPhone = this.editPhone.string;
        this.passWord = this.editPassword.string;
        this.isSavePassWord = this.toggleBtn.isChecked;
        cc.log(this.lastPhone, this.passWord, this.isSavePassWord);
        loginModel.repLogin(params, this.requestLogin, this,  this.requestLoginFail, this);

    },

    requestLogin: function (data) {
        cc.log('requestLogin: ', data);
        //保存登录密码。
        this.lastPhone = this.editPhone.string;
        this.passWord = this.editPassword.string;
        this.isSavePassWord = this.toggleBtn.isChecked;

        cc.log('lastPhone: ', this.lastPhone);
        cc.log('passWord: ', this.passWord);
        cc.log('isSavePassWord: ', this.isSavePassWord);

        userMode.getInstance().saveLastPhone(this.lastPhone);
        userMode.getInstance().setIsSavePassWord(this.isSavePassWord);
        userMode.getInstance().saveLoginPassWord(this.lastPhone, this.passWord);
        //登录成功，返回个人数据。
        userMode.getInstance().updataUser(data);
        cc.log('userMode.getInstance().user: ', userMode.getInstance().user);
        cc.director.loadScene('mainScene');
    },

    requestLoginFail: function (data) {
        cc.log('requestLoginFail: ', data);

    },

    onToggleBtton: function (btn) {
        cc.log('btn: ', btn);
    },








});