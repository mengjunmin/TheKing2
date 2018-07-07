var RetrievePasswordModel = require("../mode/RetrievePasswordModel");
var userMode = require("../mode/userMode");
var popupManager = require("../popupManager");
var loginModel = require("../mode/loginModel");

cc.Class({
    extends: cc.Component,

    properties: {
        notePrefab:{
        	default:null,
        	type:cc.Prefab
        },
        nameListPrefab:{
            default:null,
            type:cc.Prefab
        },
        popupNode:{
            default:null,
            type:cc.Node
        },
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
        },

        checkCount:null,
        allPhone:null,
        selectAcount:null,

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.allPhone = {};
        this.selectAcount = {};
    },

    start () {
        popupManager.init(this);
        this.checkCount = 0;
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
        var phone = editbox.string;
        if(phone.length == 11){
            console.log('------>this.allPhone:', this.allPhone);
            var one = this.allPhone[''+phone];
            if(!one){
                //联网获取数据
                var params = {
                    phone: phone
                }
                loginModel.repLrole(params, this.requestLrole, this );
            }
        }
    },

    requestLrole(data){
        var list = data.list;
        if(list.length>0){
            var one = list[0];
            var _id = one._id;
            var arr = _id.split("@");
            this.allPhone[arr[1]] = data.list;
            console.log('------>this.allPhone:', this.allPhone);
        }

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
            this.lockCheckBtn();
        }
    },

    checkBtnCount(d){
        var lable = this.checkBtn.node.getChildByName('title');
        var title = lable.getComponent(cc.Label);
        // cc.log('------->title: ', title);
        if(this.checkCount == 0){
            this.unschedule(this.checkBtnCount);
            this.checkBtn.enabled = true;
            title.string = '获取验证码';
            return;
        }
        this.checkCount--;
        title.string = ''+this.checkCount;
        // cc.log('------->lable.string: ', lable.string);

    },
    lockCheckBtn(){
        this.checkBtn.enabled = false;
        this.checkCount = 120;
        this.schedule(this.checkBtnCount, 1);
    },

    requestGetSMS(data){
        cc.log('---->requestGetSMS: ', data);
    },

    onDownmenuBtton: function(btn) {
        var phone = this.editPhone.string;
        if(phone.length != 11){
            cc.log('手机号不够11位 ');
            return;
        }

        var list = this.allPhone[phone];

        var conf = {
            fun:this.onTouchNameItem,
            target:this,
            data:list,
        };
        popupManager.create('namelist', conf);

    },

    onTouchNameItem(arg){
        cc.log('[RetrievePasswoed]  onTouchNameItem: ',arg);

        this.editName.string = arg['nick'] || '-------';
        this.selectAcount = arg;
        // this.autoInputPassword(this.editPhone.string, arg);
    },

    onDoneBtton(btn) {
        var phone = this.editPhone.string;
        var code = this.editCheck.string;
        var password = this.editPassword.string;
        var anpassword = this.editAnpassword.string;
        var invite = this.selectAcount.invite;

        if(phone.length != 11){//11
            cc.log('手机号不够11位 ');
            return;
        }
        if(password==anpassword ){
            if(password==null || password==''){
                cc.log('密码不一致');
                return;
            }
            if(password<6 || password>10){
                cc.log('密码长度6-10');
                return;
            }
        }else{
            cc.log('password and anpassword  is not same');
            return;
        }

         var pp = {
            phone:phone,
            code: code,
            invite: invite,
            password:password,
         };

         RetrievePasswordModel.repRetrievePassword(pp, this.requestDone, this);
    
    },

    requestDone (data){
        cc.log('---->requestDone: ', data);
        
        cc.director.loadScene('Login');

    },

    onGoLoginSenceBtton: function(btn) {
        cc.director.loadScene('Login');
    
    },

});
