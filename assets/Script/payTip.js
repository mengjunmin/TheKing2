var userMode = require("./mode/userMode");
var TimeUtil = require('./Tool/TimeUtil');
var popupManager = require("./unit/popupManager");
var Consume = require('./unit/consume');

cc.Class({
    extends: cc.Component,

    properties: {
        time: {
            default: null,
            type: cc.Label,
        },

        leftPayTime:null,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
    ctor: function () {
        var self = this;
        this.leftPayTime = 0;
    },

    start () {

    },

    init() {
        var user = userMode.getInstance().user;

        var invite_use = userMode.getInstance().user.invite_use;
        if (invite_use) {
            var times = TimeUtil.timeStamp(invite_use);
            var nowtime = userMode.getInstance().getServerTime();
            var maxtime = 48*60*60*1000;
            this.leftPayTime = maxtime-(nowtime-times);
        }

        this.startTimer();
    },

    startTimer() {
        this.schedule(this.onTimer, 1);
    },

    stopTime() {
        this.unschedule(this.onTimer);
    },

    onTimer(t) {
        this.leftPayTime -= 1000;
        cc.log('----->this.leftPayTime:', this.leftPayTime);
        if (this.leftPayTime <= 0) {
            this.leftPayTime = 0;
            this.unschedule(this.onTimer);
        }

        var lefttimes = TimeUtil.timeLeftToTimeFormat(this.leftPayTime);
        this.time.string = ''+lefttimes;

    },

    runTime() {
        this.init();
    },

    stopTime() {
        this.unschedule(this.onTimer);
    },

    onPay: function (obj, data) {
        cc.log('----->onPay');

        this.activeRoleNote();
    },

    activeRoleNote(){
        // this.mainSence.goToLayer("roleList");
        var self = this;
        var onCancel = function(){
            
        }
        var onOk = function(){
            //购买角色代码
            if(Consume.jewelsIsEnough(600)){

            }
        }
        var CONF = {
            title: '角色激活',
            content: "花费钻石600，激活该角色，是否激活？",
            okLabel: '激活',
            cancelLabel: '取消',
            cancelCallback: onCancel, // 取消
            cancelCallbackObj: self, // 取消
            okCallback: onOk, // 确定
            okCallbackObj: self, // 确定
            showCloseBtn:false,
        };
        popupManager.create('note', CONF);
    },



    // update (dt) {},
});
