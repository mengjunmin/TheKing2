

var loginModel = require("../mode/loginModel");
var userMode = require("../mode/userMode");
var popupManager = require("../popupManager");

cc.Class({
    extends: cc.Component,

    properties: {
        notePrefab:{
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

        editName:{
        	default:null,
        	type:cc.EditBox
        },

        editPassword:{
        	default:null,
        	type:cc.EditBox
        },

        editCheck:{
        	default:null,
        	type:cc.EditBox
        },

        checkImg:{
            default:null,
            type:cc.Sprite
        },

        forgetPassBtn:{
            default:null,
            type:cc.Button
        },
        registerBtn:{
            default:null,
            type:cc.Button
        },
        loginBtn:{
            default:null,
            type:cc.Button
        },

        toggleBtn:{
            default:null,
            type:cc.Toggle
        },

        downMenuBtn:{
            default:null,
            type:cc.Button
        },
        nameListPrefab:{
            default:null,
            type:cc.Prefab
        },

        allPhone:null,
        currName:null,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.allPhone = {};

    },

    updateNameList(){
        var list = this.nameList.getChildByName('scrollview');//scrollview
        var view = list.getChildByName('view');

        var content = view.getChildByName('content');
        content.removeAllChildren();

        var currPhone = this.editPhone.string;
        var currPhoneName = this.allPhone[currPhone];
        for(var i=0;i<10;i++){
            var name = cc.instantiate(this.namePrefab);
            var nameitem = name.getComponent('nameitem');
            // nameitem.setData("安其拉"+i);
            nameitem.setData(currPhoneName[i]);
            nameitem.registerEvent(this.onTouchNameItem, this);
            content.addChild(name);
          
        }
    },

    onTouchNameItem(arg){
        cc.log('onTouchNameItem: ',arg);

        this.editName.string = arg;
        this.autoInputPassword(this.editPhone.string, arg);
    },

    start () {
        cc.log('start: ');
        popupManager.init(this);
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
    onPhoneEditDidBegan: function(editbox, customEventData) {

    },

    onPhoneEditDidEnded: function(editbox, customEventData) {

    },
    //假设这个回调是给 textChanged 事件的
    onPhoneTextChanged: function(text, editbox, customEventData) {
        var phone = editbox.string;
        if(phone.length == 1){
            console.log('------>userMode.allName:', userMode.getInstance().allName);
            var one = userMode.getInstance().allName[''+phone];
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
        var phone = data.phone;
        userMode.allPhone[''+phone] = data.list;


    },
    //假设这个回调是给 editingReturn 事件的
    onPhoneEditingReturn: function(editbox,  customEventData) {
    },


    //nickname
    onNameEditDidBegan: function(editbox, customEventData) {
    },

    onNameEditDidEnded: function(editbox, customEventData) {
    },

    onNameTextChanged: function(text, editbox, customEventData) {
    },

    onNameEditingReturn: function(editbox,  customEventData) {
        var name = editbox.string;
        //查找本地数据，不全密码
        this.autoInputPassword(name, this.editPhone.string);
    },

    autoInputPassword(nane, phone){
        if(phone.length != 11){
            return;
        }


        this.editPassword.string = '';
    },
    //Password
    onPasswordEditDidBegan: function(editbox, customEventData) {
    },

    onPasswordEditDidEnded: function(editbox, customEventData) {
    },

    onPasswordTextChanged: function(text, editbox, customEventData) {
        editbox.string=editbox.string.replace(/[^\w\/]/ig,'');//英文数字
    },

    onPasswordEditingReturn: function(editbox,  customEventData) {
    },




    //Check
    onCheckEditDidBegan: function(editbox, customEventData) {
    },

    onCheckEditDidEnded: function(editbox, customEventData) {
    },

    onCheckTextChanged: function(text, editbox, customEventData) {
        editbox.string=editbox.string.replace(/[^\w\/]/ig,'');//英文数字
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


    onForgetBtton: function(btn) {
        cc.director.loadScene('RetrievePassword');
    },

    onRegisterBtton: function(btn) {
        cc.director.loadScene('Register');
    },

    onLoginBtton: function(btn) {
        if(this.editPhone.string.length != 11){
            cc.log('手机号不够11位 ');
        }else{
            
        }

        var params = {
            phone: this.editPhone.string,
            invite: this.editCheck.string,
            password: this.editPassword.string,
            code: 'code',
        }
        loginModel.repLogin(params, this.requestLogin, this );

    },

    requestLogin: function(btn) {
        cc.director.loadScene('mainScene');
    },

    onToggleBtton: function(btn) {
        cc.log('btn: ', btn);
    },

    onDownmenuBtton: function(btn) {
        if(this.editPhone.string.length != 11){
            cc.log('手机号不够11位 ');
            return;
        }

        var conf = {
            fun:this.onTouchNameItem,
            target:this,
            data:["1111111","222222","3333333","444444","5555555"],
        };
        popupManager.create('namelist', conf);

    },

});
