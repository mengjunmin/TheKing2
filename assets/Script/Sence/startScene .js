var global = require('../mode/Global');
var Utils = require("../mode/Utils");
var popupManager = require("../unit/popupManager");
var fileManager = require("../mode/fileManager");
var userMode = require("../mode/userMode");
var MessageCenter = require("../Signal/MessageCenter");


cc.Class({
    extends: cc.Component,

    name:'startSence',
    properties: {


    },


    onLoad() {


    },


    start() {
        var self = this;
        cc.log('----->start');
        MessageCenter.GAME.on(this.onEventBack, this);
        userMode.getInstance();
        this.scheduleOnce(function () {
            // 这里的 this 指向 component
            MessageCenter.GAME.emit({1:2});
            self.readData();
        }, 2);

    },

    readData() {
        cc.log('----->readData');
        var value = fileManager.getInstance().readStartApp();
        cc.log('----->value: ', value);
        if (value == 1) {
            cc.director.loadScene('Login');
        } else {
            cc.director.loadScene('Register');
        }
    },

    onEventBack(data){
        cc.log('----->onEventBack: ', data);
    },
    // update (dt) {},
});