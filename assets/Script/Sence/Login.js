

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
            type:cc.Node
        },
        checkLable:{
            default:null,
            type:cc.Label
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
        loginCount:0,
        selectAcount:null,
        showImage:null,
        group:null,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.allPhone = {};
        this.loginCount = 0;
        this.selectAcount = {};
        this.showImage = false;
        this.showImgCode(this.showImage);
    },

    onTouchNameItem(arg){
        cc.log('[login]  onTouchNameItem: ',arg);

        this.editName.string = arg['nick'] || '-------';
        this.selectAcount = arg;
        this.autoInputPassword(this.editPhone.string, arg);
    },

    start () {
        cc.log('[Login]    start: ');
        popupManager.init(this);

        // var group = this.addComponent('R.group');
        // // group.scale = cc.v2(5, 5);
        // cc.loader.loadRes('svg/tiger', (err, txt) => {
        //     if (err) {
        //         cc.error(err.toString());
        //         return;
        //     }
        //     cc.log('svg/tiger    txt: ', txt);
        //     group.loadSvg(txt);
        // });
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


    //nickname
    onNameEditDidBegan: function(editbox, customEventData) {
    },

    onNameEditDidEnded: function(editbox, customEventData) {
    },

    onNameTextChanged: function(text, editbox, customEventData) {
    },

    onNameEditingReturn: function(editbox,  customEventData) {
        // var name = editbox.string;
        // //查找本地数据，不全密码
        // this.autoInputPassword(name, this.editPhone.string);
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

        // this.getImgCode();
    },

    onLoginBtton: function(btn) {
        var invite = this.selectAcount.invite;
        var phone = this.editPhone.string;
        var password = this.editPassword.string;
        var nick = this.editName.string;

        if(phone.length != 11){
            cc.log('手机号不够11位 ');
            return;
        }
        if(nick.length == 0){
            cc.log('输入昵称');
            return;
        }
        if(password.length == 0){
            cc.log('输入密码 ');
            return;
        }

        var params = {
            phone: phone,
            invite: invite,
            password: password,
        };

        if(this.showImage){
            if(this.editCheck.string==0){
                cc.log('输入验证码');
                return;
            }else{
                params['code'] = this.editCheck.string;
            }
        }

        loginModel.repLogin(params, this.requestLogin, this,  this.requestLoginFail, this);

    },

    requestLogin: function(data) {
        //登录成功，返回个人数据。
        userMode.getInstance().updataUser(data);
        cc.log('userMode.getInstance().user: ', userMode.getInstance().user);
        cc.director.loadScene('mainScene');
    },

    requestLoginFail: function(data) {
        //显示图片验证码
        var image = data.image;
        this.showImage = image;
        this.showImgCode(image);
        this.getImgCode();
    },

    onToggleBtton: function(btn) {
        cc.log('btn: ', btn);
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


    //图片验证码
    showImgCode(isshow){
        this.editCheck.node.active = isshow;
        this.checkImg.active = isshow;
        this.checkLable.node.active = isshow;

        if(isshow){
            this.checkImg.on(cc.Node.EventType.TOUCH_END, this.onImgCode, this);
        }else{
            this.checkImg.off(cc.Node.EventType.TOUCH_END, this.onImgCode, this);
        }
    },

    onImgCode(){
        this.getImgCode();
    },

    getImgCode(){
        if(this.editPhone.string.length != 11){
            cc.log('手机号不够11位 ');
        }else{
            
        }

        var params = {
            phone: this.editPhone.string,
        }
        loginModel.repImageCode(params, this.requestImgCode, this);
    },

    requestImgCode(data){
        var img = this.checkImg.getChildByName('img');
        if(img){
            var group = img.getComponent('R.group');
            group.node.destroy();
        }

        var img  = new cc.Node('img');
        this.checkImg.addChild(img);
        var group = img.addComponent('R.group');
        group.loadSvg(data.data);
        
        // cc.loader.loadRes('svg/tiger', (err, txt) => {
        //     if (err) {
        //         cc.error(err.toString());
        //         return;
        //     }
        //     cc.log('svg/tiger    txt: ', txt);
        //     group.loadSvg(txt);
        // });

  
    },






});
