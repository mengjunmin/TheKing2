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
        cc.log('onEditDidBegan: ', customEventData);
    },
    //假设这个回调是给 editingDidEnded 事件的
    onPhoneEditDidEnded: function(editbox, customEventData) {

        cc.log('onEditDidEnded: ', customEventData);
    },
    //假设这个回调是给 textChanged 事件的
    onPhoneTextChanged: function(text, editbox, customEventData) {

        cc.log('onTextChanged: ', customEventData);
        // this.label.string = text;
    },
    //假设这个回调是给 editingReturn 事件的
    onPhoneEditingReturn: function(editbox,  customEventData) {


        cc.log('onEditingReturn: ', customEventData);
    },



    

        //邀请码
        onInvitationEditDidBegan: function(editbox, customEventData) {

            cc.log('onEditDidBegan: ', customEventData);
        },

        onInvitationEditDidEnded: function(editbox, customEventData) {

    
            cc.log('onEditDidEnded: ', customEventData);
        },

        onInvitationTextChanged: function(text, editbox, customEventData) {

    
            cc.log('onTextChanged: ', customEventData);
            // this.label.string = text;
        },

        onInvitationEditingReturn: function(editbox,  customEventData) {

    
            cc.log('onEditingReturn: ', customEventData);
        },




    //Check验证码
    onCheckEditDidBegan: function(editbox, customEventData) {

        cc.log('onEditDidBegan: ', customEventData);
    },

    onCheckEditDidEnded: function(editbox, customEventData) {


        cc.log('onEditDidEnded: ', customEventData);
    },

    onCheckTextChanged: function(text, editbox, customEventData) {


        cc.log('onTextChanged: ', customEventData);
        // this.label.string = text;
    },
    
    onCheckEditingReturn: function(editbox,  customEventData) {


        cc.log('onEditingReturn: ', customEventData);
    },



    onCheckBtton: function(btn) {
        cc.log('btn: ', btn);
        var phone = this.editPhone.string;
        if(phone.length != 11){
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

        if(phone.length != 11){
            cc.log('手机号不够11位 ');
            return;
        }
        if(code.length != 4){
            cc.log('手机号不够11位 ');
            return;
        }
        if(invitation.length != 6){
            cc.log('手机号不够11位 ');
            return;
        }

         var pp = {
            phone:argu.phone,
            code: argu.code,
            invite: argu.invite
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
