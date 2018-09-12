var registerModel = require("../mode/registerModel");
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

        editPassWord: {
            default: null,
            type: cc.EditBox
        },

        editRePassWord: {
            default: null,
            type: cc.EditBox
        },

        editCheck: {
            default: null,
            type: cc.EditBox
        },


        checkBtn: {
            default: null,
            type: cc.Button
        },

        alreadyBtn: {
            default: null,
            type: cc.Button
        },

        loginBtn: {
            default: null,
            type: cc.Button
        },

        misstips:{
            default:null,
            type:cc.Label
        },
        checkCount: null,
        timerout:0,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.misstips.enabled = false;

    },

    start() {
        popupManager.init(this);
        this.checkCount = 0;
        this.timerout = -1;
        cc.log('------->this.checkBtn: ', this.checkBtn);
    },

    // update (dt) {},
    //phone
    onPhoneEditDidBegan: function (editbox, customEventData) {

    },
    //假设这个回调是给 editingDidEnded 事件的
    onPhoneEditDidEnded: function (editbox, customEventData) {

    },
    //假设这个回调是给 textChanged 事件的
    onPhoneTextChanged: function (text, editbox, customEventData) {

        // this.label.string = text;
    },
    //假设这个回调是给 editingReturn 事件的
    onPhoneEditingReturn: function (editbox, customEventData) {

    },

    //邀请码
    onInvitationEditDidBegan: function (editbox, customEventData) {},

    onInvitationEditDidEnded: function (editbox, customEventData) {

    },

    onInvitationTextChanged: function (text, editbox, customEventData) {

        editbox.string = editbox.string.replace(/[^\w\/]/ig, ''); //英文数字
    },

    onInvitationEditingReturn: function (editbox, customEventData) {

    },


    //Check验证码
    onCheckEditDidBegan: function (editbox, customEventData) {

    },

    onCheckEditDidEnded: function (editbox, customEventData) {

    },

    onCheckTextChanged: function (text, editbox, customEventData) {

        editbox.string = editbox.string.replace(/[^\w\/]/ig, ''); //英文数字
    },

    onCheckEditingReturn: function (editbox, customEventData) {

    },

    //密码
    onPassWordEditDidBegan: function (editbox, customEventData) {

    },

    onPassWordEditDidEnded: function (editbox, customEventData) {

    },

    onPassWordTextChanged: function (text, editbox, customEventData) {

        editbox.string = editbox.string.replace(/[^\w\/]/ig, ''); //英文数字
    },

    onPassWordEditingReturn: function (editbox, customEventData) {

    },

    //确认密码
    onRePassWordEditDidBegan: function (editbox, customEventData) {

    },

    onRePassWordEditDidEnded: function (editbox, customEventData) {

    },

    onRePassWordTextChanged: function (text, editbox, customEventData) {

        editbox.string = editbox.string.replace(/[^\w\/]/ig, ''); //英文数字
    },

    onRePassWordEditingReturn: function (editbox, customEventData) {

    },


    onCheckBtton: function (btn) {
        cc.log('btn: ', btn);
        var phone = this.editPhone.string;
        if (phone.length != 11) {
            cc.log('手机号不够11位 ');
        } else {
            registerModel.repSMS(phone, this.requestGetSMS, this);
            this.lockCheckBtn();
        }
    },

    checkBtnCount(d) {
        var lable = this.checkBtn.node.getChildByName('title');
        var title = lable.getComponent(cc.Label);
        // cc.log('------->title: ', title);
        if (this.checkCount == 0) {
            this.unschedule(this.checkBtnCount);
            this.checkBtn.enabled = true;
            title.string = '获取验证码';
            return;
        }
        this.checkCount--;
        title.string = '' + this.checkCount;
        // cc.log('------->lable.string: ', lable.string);

    },
    lockCheckBtn() {
        this.checkBtn.enabled = false;
        this.checkCount = 120;
        this.schedule(this.checkBtnCount, 1);
    },

    requestGetSMS(data) {
        cc.log('---->onGetSMS: ', data);
    },

    onAlreadyBtton: function (btn) {

        cc.director.loadScene('Login');

    },

    showTIPS(){
        var self = this;
        self.misstips.enabled = true;
        if(self.timerout != -1){
            clearTimeout(self.timerout);
            self.timerout = -1;
        }
        self.timerout = setTimeout(function() {
            self.misstips.enabled = false;

        }, 2000);

        
    },

    onLoginBtton: function (btn) {
        var phone = this.editPhone.string;
        var code = this.editCheck.string;
        var password = this.editPassWord.string;
        var repassword = this.editRePassWord.string;

        if (phone.length != 11) { //11
            cc.log('手机号不够11位 ');
            this.showTIPS();
            return;
        }
        if (code.length != 4) { //4
            cc.log('验证码错误');
            this.showTIPS();
            return;
        }
        if(password.length ==0){
            cc.log('密码不能为空');
            this.showTIPS();
            return;
        }
        if(password != repassword){
            cc.log('密码不一致');
            this.showTIPS();
            return;
        }

        var pp = {
            phone: phone,
            code: code,
            // invite: invitation
        }
        registerModel.repRegister(pp, this.requestLogin, this);

    },

    requestLogin(data) {
        cc.log('---->requestLogin: ', data);

        var token = data.t;
        var uid = data.data._id;
        userMode.getInstance().user.t = token;
        userMode.getInstance().user.uid = uid;

        cc.director.loadScene('PerfectInfo');

    },


});