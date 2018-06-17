var registerModel = require("../mode/registerModel");
var userMode = require("../mode/userMode");

cc.Class({
    extends: cc.Component,

    properties: {

        editPhone:{
            default:null,
            type:cc.EditBox
        },


        editInvitation:{
            default:null,
            type:cc.EditBox
        },

        editCheck:{
            default:null,
            type:cc.EditBox
        },


        checkBtn:{
            default:null,
            type:cc.Button
        },

        alreadyBtn:{
            default:null,
            type:cc.Button
        },

        loginBtn:{
            default:null,
            type:cc.Button
        },


    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {


    },

    start () {

    },

    // update (dt) {},
//phone
    onPhoneEditDidBegan: function(editbox, customEventData) {

    },
    //假设这个回调是给 editingDidEnded 事件的
    onPhoneEditDidEnded: function(editbox, customEventData) {

    },
    //假设这个回调是给 textChanged 事件的
    onPhoneTextChanged: function(text, editbox, customEventData) {

        // this.label.string = text;
    },
    //假设这个回调是给 editingReturn 事件的
    onPhoneEditingReturn: function(editbox,  customEventData) {

    },

    //邀请码
     onInvitationEditDidBegan: function(editbox, customEventData) {
    },

    onInvitationEditDidEnded: function(editbox, customEventData) {

    },

    onInvitationTextChanged: function(text, editbox, customEventData) {

      editbox.string=editbox.string.replace(/[^\w\/]/ig,'');//英文数字
    },

    onInvitationEditingReturn: function(editbox,  customEventData) {

    },


    //Check验证码
    onCheckEditDidBegan: function(editbox, customEventData) {

    },

    onCheckEditDidEnded: function(editbox, customEventData) {

    },

    onCheckTextChanged: function(text, editbox, customEventData) {

        editbox.string=editbox.string.replace(/[^\w\/]/ig,'');//英文数字
    },
    
    onCheckEditingReturn: function(editbox,  customEventData) {

    },

    onCheckBtton: function(btn) {
        cc.log('btn: ', btn);
        var phone = this.editPhone.string;
        if(phone.length != 1){
            cc.log('手机号不够11位 ');
        }else{
            registerModel.repSMS(phone, this.requestGetSMS, this);
        }
    },

    requestGetSMS (data){
        cc.log('---->onGetSMS: ', data);
    },

    onAlreadyBtton: function(btn) {

        cc.director.loadScene('Login');

    },

    onLoginBtton: function(btn) {
        var phone = this.editPhone.string;
        var code = this.editCheck.string;
        var invitation = this.editInvitation.string;

        if(phone.length != 11){//11
            cc.log('手机号不够11位 ');
            return;
        }
        if(code.length != 4){//4
            cc.log('手机号不够11位 ');
            return;
        }
        if(invitation.length != 6){//6
            cc.log('手机号不够11位 ');
            return;
        }

         var pp = {
            phone:phone,
            code: code,
            invite: invitation
         }
        registerModel.repRegister(pp, this.requestLogin, this);
    
    },

    requestLogin (data){
        cc.log('---->requestLogin: ', data);

        var token = data.t;
        userMode.token = token;
        
        cc.director.loadScene('PerfectInfo');

    },


});
