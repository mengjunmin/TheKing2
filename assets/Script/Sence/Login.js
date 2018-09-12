var loginModel = require("../mode/loginModel");
var fileManager = require("../mode/fileManager");
var userMode = require("../mode/userMode");
var popupManager = require("../unit/popupManager");

cc.Class({
    extends: cc.Component,

    properties: {
        notePrefab: {
            default: null,
            type: cc.Prefab
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
    },


    start() {
        cc.log('[Login]    start: ');
        popupManager.init(this);

        if (this.lastPhone) {
            this.editPhone.string = this.lastPhone;
        }
        if (this.isSavePassWord && this.lastPhone) {
            this.editPassword.string = this.passWord;
        }
    },

    onEnable: function () {
        cc.log('onEnable: ');
        // this.node.on('foobar', this._sayHello, this);
    },

    onDisable: function () {
        cc.log('onDisable: ');
        // this.node.off('foobar', this._sayHello, this);
    },
    // update (dt) {},
    //phone
    onPhoneEditDidBegan: function (editbox, customEventData) {

    },

    onPhoneEditDidEnded: function (editbox, customEventData) {

    },
    //假设这个回调是给 textChanged 事件的
    onPhoneTextChanged: function (text, editbox, customEventData) {
        var phone = editbox.string;

    },


    //假设这个回调是给 editingReturn 事件的
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

    onCheckEditingReturn: function (editbox, customEventData) {

    },


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
        // loginModel.repLogin(params, this.requestLogin, this,  this.requestLoginFail, this);

    },

    requestLogin: function (data) {
        //保存登录密码。
        this.lastPhone = this.editPhone.string;
        this.passWord = this.editPassword.string;
        this.isSavePassWord = this.toggleBtn.isChecked;
        userMode.getInstance().setLastPhone(this.lastPhone);
        userMode.getInstance().setIsSavePassWord(this.isSavePassWord);
        userMode.getInstance().saveLoginPassWord(this.passWord);
        //登录成功，返回个人数据。
        userMode.getInstance().updataUser(data);
        cc.log('userMode.getInstance().user: ', userMode.getInstance().user);
        cc.director.loadScene('mainScene');
    },

    requestLoginFail: function (data) {


    },

    onToggleBtton: function (btn) {
        cc.log('btn: ', btn);
    },








});