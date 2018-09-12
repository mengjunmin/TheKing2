var global = require('../mode/Global');
var Utils = require("../mode/Utils");
var popupManager = require("../unit/popupManager");
var fileManager = require("../mode/fileManager");
var userMode = require("../mode/userMode");

cc.Class({
    extends: cc.Component,

    properties: {


    },


    onLoad() {


    },


    start() {
        var self = this;
        cc.log('----->start');

        userMode.getInstance();
        this.scheduleOnce(function () {
            // 这里的 this 指向 component
            this.readData();
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

    // update (dt) {},
});