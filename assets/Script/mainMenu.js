
var popupManager = require("./unit/popupManager");
var userMode = require("./mode/userMode");
// var TimeUtil = require('./Tool/TimeUtil');
var allDefine = require("./mode/AllDefine");
var MessageCenter = require('./Signal/MessageCenter');
var LayerManager = require('./unit/layerManager');

cc.Class({
    extends: cc.Component,

    properties: {
        paytip: {
            default: null,
            type: cc.Node,
        },
        callback: null,
        objecttarget: null,
        isShowPayTip: null,

    },
    mainSence: null,

    ctor: function () {
        var self = this;
        this.isShowPayTip = false;
    },

    onLoad() {

    },

    start() {

    },

    onEnable: function () {
        MessageCenter.PAY_TIP.on(this.updatePayTip, this);
    },

    onDisable: function () {
        MessageCenter.PAY_TIP.off(this.updatePayTip, this);
    },

    updatePayTip(isshow) {
        // MessageCenter.GAME.emit({1:2});
        this.isShowPayTip = isshow;
        if(isshow == false){
            this.stopPayTip();
        }

    },

    onUserInfo: function (obj, data) {
        LayerManager.goToLayer("userinfo");
    },

    onMail: function (obj, data) {
        var mailCallback = function () {

        }
        var conf = {
            closeCallback: mailCallback, // 取消按钮的回调方法
            closeCallbackObj: this, // 取消按钮的回调this
        };
        popupManager.create('mail', conf);
    },

    onGame: function (obj, data) {
        LayerManager.goToLayer("gamelobby");
    },

    onShop: function (obj, data) {
        popupManager.create('shop', {});

    },

    onPay: function (obj, data) {
        cc.log('----->onPay');


    },

    onRoleList: function (obj, data) {
        LayerManager.goToLayer("roleList");
    },

    onFamily: function (obj, data) {
        LayerManager.goToLayer("family");

        // var CONF = {
        //     title: '8888888',
        //     content: "仅仅能访问节点自己的组件通常是不够的，脚本通常还需要进行多个节点之间的交互。例如，一门自动瞄准玩家的大炮，就需要不断获取玩家的最新位置。Cocos Creator 提供了一些不同的方法来获得其它节点或组件"
        // };
        // popupManager.create('noticeBoard', CONF);
    },

    setCallBack: function (fun, target) {
        this.callback = fun;
        this.objecttarget = target;

    },

    onCallBack: function (data) {
        if (this.callback) this.callback.apply(this.objecttarget, [data, 9]);
    },

    initPayTip() {
        cc.log('----->mainMenu initPayTip');
        var user = userMode.getInstance().user;
        cc.log('----->user: ', user);


        var status = userMode.getInstance().user.status;
        if (status == allDefine.RoleStatus.NotActive) {
            this.runPayTip();
        } else {
            this.stopPayTip();
        }
    },

    runPayTip() {
        this.paytip.active = true;
        var payjs = this.paytip.getComponent('payTip');
        payjs.runTime();
    }, 
    stopPayTip() {
        this.paytip.active = false;
        var payjs = this.paytip.getComponent('payTip');
        payjs.stopTime();
    },


    onIn: function () {
        cc.log('----->mainMenu onIn');
        this.initPayTip();


    },

    onOut: function () {
        this.stopPayTip();
        cc.log('----->mainMenu onOut');
    },

    setData(data) {

    },

    // update (dt) {}, 
});