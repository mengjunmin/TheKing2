var registerModel = require("../mode/registerModel");
var userMode = require("../mode/userMode");

cc.Class({
    extends: cc.Component,

    properties: {

        editName: {
            default: null,
            type: cc.EditBox
        },

        editPassword: {
            default: null,
            type: cc.EditBox
        },

        editAnPassword: {
            default: null,
            type: cc.EditBox
        },


        sysBtn: {
            default: null,
            type: cc.Button
        },

        avatarBtn: {
            default: null,
            type: cc.Button
        },

        doneBtn: {
            default: null,
            type: cc.Button
        },

        sexBtn: {
            default: null,
            type: cc.ToggleContainer,
        },

        avatarlistPrefab:{
        	default:null,
        	type:cc.Prefab
        },

        popup:{
        	default:null,
        	type:cc.Node
        },

        userAvatar:{
        	default:null,
        	type:cc.Sprite
        },

        sex: 0,
        head: 0,


    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {


    },

    start() {

    },

    // update (dt) {},
    //phone
    onNameEditDidBegan: function(editbox, customEventData) {
        cc.log('onEditDidBegan: ', customEventData);
    },
    //假设这个回调是给 editingDidEnded 事件的
    onNameEditDidEnded: function(editbox, customEventData) {

        cc.log('onEditDidEnded: ', customEventData);
    },
    //假设这个回调是给 textChanged 事件的
    onNameTextChanged: function(text, editbox, customEventData) {

        cc.log('onTextChanged: ', customEventData);
        // this.label.string = text;
    },
    //假设这个回调是给 editingReturn 事件的
    onNameEditingReturn: function(editbox, customEventData) {


        cc.log('onEditingReturn: ', customEventData);
    },






    //邀请码
    onPasswordEditDidBegan: function(editbox, customEventData) {

        cc.log('onEditDidBegan: ', customEventData);
    },

    onPasswordEditDidEnded: function(editbox, customEventData) {


        cc.log('onEditDidEnded: ', customEventData);
    },

    onPasswordTextChanged: function(text, editbox, customEventData) {


        cc.log('onTextChanged: ', customEventData);
        // this.label.string = text;
    },

    onPasswordEditingReturn: function(editbox, customEventData) {


        cc.log('onEditingReturn: ', customEventData);
    },




    //Check验证码
    onAnPasswordEditDidBegan: function(editbox, customEventData) {

        cc.log('onEditDidBegan: ', customEventData);
    },

    onAnPasswordEditDidEnded: function(editbox, customEventData) {


        cc.log('onEditDidEnded: ', customEventData);
    },

    onAnPasswordTextChanged: function(text, editbox, customEventData) {


        cc.log('onTextChanged: ', customEventData);
        // this.label.string = text;
    },

    onAnPasswordEditingReturn: function(editbox, customEventData) {


        cc.log('onEditingReturn: ', customEventData);
    },



    onSysBtton: function(btn) {
        //这里 editbox 是一个 cc.EditBox 对象
        //这里的 customEventData 参数就等于你之前设置的 "foobar"

        cc.log('btn: ', btn);

        // cc.director.loadScene('HelloWorld');
    },

    onAvatarBtton: function(btn) {
        //换出头像框列表，注册回调获取avatar。
        this.head = 1;
        var list = cc.instantiate(this.avatarlistPrefab);
        this.popup.addChild(list);
        var avatarJs = list.getComponent('avatarList');  //family
        avatarJs.setData(0);
        avatarJs.setCallBack(this.onAvatarList, this);
    },

    onAvatarList(data){
        cc.log('onAvatarList: ', data);
        this.setUserAvatar(data);
    },

    setUserAvatar:function(avatar){
        var self = this;
        var idx = avatar<10?('00'+avatar):('0'+avatar);
        var newavatar = "monster" + idx + '_s'
        cc.loader.loadRes(newavatar, cc.SpriteFrame, function (err, spriteFrame) {
            cc.log('----->spriteFrame:', spriteFrame);
            self.userAvatar.spriteFrame = spriteFrame;

        });
    },

    onSexBtton: function(btn, data) {
        cc.log('btn: ', btn);
        cc.log('data: ', data);
        this.sex = data;
    },

    onDoneBtton: function(btn) {
        //这里 editbox 是一个 cc.EditBox 对象
        //这里的 customEventData 参数就等于你之前设置的 "foobar"
        var uid = userMode.getInstance().uid;
        var nick = this.editName.string;
        var sex = this.sex;
        var head = this.head;
        var password = this.editPassword.string;
        var anpassword = this.editAnPassword.string;

        var params = {
            uid: uid,
            nick: nick,
            sex: sex,
            head: head,
            password: password,
            anpassword: anpassword
        }

        registerModel.repFullInfo(params, this.requestLogin, this);
        cc.log('btn: ', btn); //PerfectInfo

        // cc.director.loadScene('HelloWorld');
    },

    requestLogin(data) {
        cc.director.loadScene('mainScene');
    },

});