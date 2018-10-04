var registerModel = require("../mode/registerModel");
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

    onPhoneEditDidBegan: function (editbox, customEventData) {},
    onPhoneEditDidEnded: function (editbox, customEventData) {},
    onPhoneTextChanged: function (text, editbox, customEventData) {
        var phone = editbox.string;
        if(phone.length == 11){
            registerModel.repUserExist(phone, this.repUserExist, this);
        }
    },
    onPhoneEditingReturn: function (editbox, customEventData) {},
    repUserExist(result){
        cc.log('------->repUserExist: ', result);
        var exists = result.exists;
        if(exists){//用户已经存在
            var conf = {
                content: '用户已经存在',
                type: 2,
            };
            popupManager.create('Toaster', conf);
        }else{

        }
    },

    //邀请码
    onInvitationEditDidBegan: function (editbox, customEventData) {},
    onInvitationEditDidEnded: function (editbox, customEventData) {},
    onInvitationTextChanged: function (text, editbox, customEventData) {
        editbox.string = editbox.string.replace(/[^\w\/]/ig, ''); //英文数字
    },
    onInvitationEditingReturn: function (editbox, customEventData) {},


    //Check验证码
    onCheckEditDidBegan: function (editbox, customEventData) {},
    onCheckEditDidEnded: function (editbox, customEventData) {},
    onCheckTextChanged: function (text, editbox, customEventData) {
        editbox.string = editbox.string.replace(/[^\w\/]/ig, ''); //英文数字
    },
    onCheckEditingReturn: function (editbox, customEventData) {},

    //密码
    onPassWordEditDidBegan: function (editbox, customEventData) {},
    onPassWordEditDidEnded: function (editbox, customEventData) {},
    onPassWordTextChanged: function (text, editbox, customEventData) {
        editbox.string = editbox.string.replace(/[^\w\/]/ig, ''); //英文数字
    },
    onPassWordEditingReturn: function (editbox, customEventData) {},

    //确认密码
    onRePassWordEditDidBegan: function (editbox, customEventData) {},
    onRePassWordEditDidEnded: function (editbox, customEventData) {},
    onRePassWordTextChanged: function (text, editbox, customEventData) {
        editbox.string = editbox.string.replace(/[^\w\/]/ig, ''); //英文数字
    },
    onRePassWordEditingReturn: function (editbox, customEventData) {},


    onCheckBtton: function (btn) {
        cc.log('btn: ', btn);
        var phone = this.editPhone.string;
        if (phone.length != 11) {
            cc.log('手机号不够11位 ');
            var conf = {
                content: '手机号不够11位',
                type: 2,
            };
            popupManager.create('Toaster', conf);
        } else {
            registerModel.repSMS(phone, this.requestGetSMS, this);
            this.lockCheckBtn();
        }
    },
    requestGetSMS(data) {
        cc.log('---->onGetSMS: ', data);
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

    },
    lockCheckBtn() {
        this.checkBtn.enabled = false;
        this.checkCount = 120;
        this.schedule(this.checkBtnCount, 1);
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
            password: password
        }
        registerModel.repRegister(pp, this.requestLogin, this);

    },

    requestLogin(data) {
        cc.log('---->requestLogin: ', data);

        userMode.getInstance().updataUser(data);
        // cc.director.loadScene('PerfectInfo');

        userMode.getInstance().showLayer = 'roleList';
        cc.director.loadScene('mainScene');
    },


});