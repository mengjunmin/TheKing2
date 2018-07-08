
var global = require('../mode/Global'); 
var Utils = require("../mode/Utils");
var popupManager = require("../popupManager");
var fileManager = require("../mode/fileManager");
var userMode = require("../mode/userMode");

cc.Class({
    extends: cc.Component,

    properties: {
    

    },


    onLoad () {
        var ws = cc.director.getWinSize();
        var vs = cc.director.getVisibleSize();	
        var vo = cc.director.getVisibleOrigin();
        cc.log('----->ws', ws);
        cc.log('----->vs', vs);
        cc.log('----->vo', vo);

    },

    aaa(data){
        cc.log('----->aaa:', data);
    },



    start () {
        var self = this;
        cc.log('----->start');
        // setTimeout(function(){
        //     self.readData();
            
        // },2000);
        userMode.getInstance();
        this.scheduleOnce(function() {
            // 这里的 this 指向 component
            this.readData();
        }, 2);
        
    },

    readData(){
        cc.log('----->readData');
        var value = fileManager.getInstance().readStartApp();
        cc.log('----->value: ', value);
        if(value == 1){
            cc.director.loadScene('Login');
        }else{
            cc.director.loadScene('Register');
        }
    },
    
    // update (dt) {},
});
