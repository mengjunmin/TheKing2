var RetrievePasswordModel = require("../mode/RetrievePasswordModel");
var userMode = require("../mode/userMode");

cc.Class({
    extends: cc.Component,

    properties: {

        editPhone:{
            default:null,
            type:cc.EditBox
        },

        editCheck:{
            default:null,
            type:cc.EditBox
        },

        editName:{
            default:null,
            type:cc.EditBox
        },

        editPassword:{
            default:null,
            type:cc.EditBox
        },

        editAnpassword:{
            default:null,
            type:cc.EditBox
        },

        checkBtn:{
            default:null,
            type:cc.Button
        },

        doneBtn:{
            default:null,
            type:cc.Button
        },

        loginBtn:{
            default:null,
            type:cc.Button
        },

        time:{
            default:null,
            type:cc.Label,
        }


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

    },
    //假设这个回调是给 editingReturn 事件的
    onPhoneEditingReturn: function(editbox,  customEventData) {

    },


    //Check验证码
    onCheckEditDidBegan: function(editbox, customEventData) {


    },

    onCheckEditDidEnded: function(editbox, customEventData) {

    },

    onCheckTextChanged: function(text, editbox, customEventData) {
        editbox.string=editbox.string.replace(/[^\w\/]/ig,'');//英文数字
        console.log('------>text.string: ', text.string);
        console.log('------>editbox.string: ', editbox.string);
    },
    
    onCheckEditingReturn: function(editbox,  customEventData) {


    },

        //nickname
    onNameEditDidBegan: function(editbox, customEventData) {


    },

    onNameEditDidEnded: function(editbox, customEventData) {

    },

    onNameTextChanged: function(text, editbox, customEventData) {


    },
    
    onNameEditingReturn: function(editbox,  customEventData) {


    },

    //password
    onPasswordEditDidBegan: function(editbox, customEventData) {


    },

    onPasswordEditDidEnded: function(editbox, customEventData) {

    },

    onPasswordTextChanged: function(text, editbox, customEventData) {
        editbox.string=editbox.string.replace(/[^\w\/]/ig,'');//英文数字

    },
    
    onPasswordEditingReturn: function(editbox,  customEventData) {


    },

    //重新输入密码
    onAnPasswordEditDidBegan: function(editbox, customEventData) {


    },

    onAnPasswordEditDidEnded: function(editbox, customEventData) {

    },

    onAnPasswordTextChanged: function(text, editbox, customEventData) {
        editbox.string=editbox.string.replace(/[^\w\/]/ig,'');//英文数字

    },
    
    onAnPasswordEditingReturn: function(editbox,  customEventData) {


    },



    onCheckBtton: function(btn) {
        var phone = this.editPhone.string;
        if(phone.length != 11){
            cc.log('手机号不够11位 ');
        }else{
            RetrievePasswordModel.repSMS(phone, this.requestGetSMS, this);
        }
    },

    requestGetSMS(data){
        cc.log('---->onGetSMS: ', data);
    },


    onDoneBtton(btn) {
        var phone = this.editPhone.string;
        var code = this.editCheck.string;
        var password = this.editPassword.string;
        var anpassword = this.editAnpassword.string;
        var nick = this.editName.string;

        // if(phone.length != 11){
        //     cc.log('手机号不够11位 ');
        //     return;
        // }
        // if(code.length != 4){
        //     cc.log('验证码不够4位 ');
        //     return;
        // }

        // if(password != anpassword){
        //     cc.log('密码不一致！ ');
        //     return;
        // }

        // if(nick == ''){
        //     cc.log('昵称不能为空！');
        //     return;
        // }

         var pp = {
            phone:phone,
            code: code,
            invite: 'invite',
            password:password,
            nick:nick,
         };

         RetrievePasswordModel.repRetrievePassword(pp, this.requestDone, this);
    
    },

    requestDone (data){
        cc.log('---->requestDone: ', data);

        // var token = data.t;
        // userMode.token = token;
        
        cc.director.loadScene('Login');

    },

    onGoLoginSenceBtton: function(btn) {
        cc.director.loadScene('Login');
    
    },

});
