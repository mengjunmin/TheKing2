var global = require('Global');
var userMode = require("./mode/userMode");
var familyModel = require("./mode/familyModel");
var uiUtil = require('./unit/uiUtil');

cc.Class({
    extends: cc.Component,

    properties: {
        _currFrame: '',
        _currAvatar: '',

        nickName: {
            default: null,
            type: cc.Label,
        },
        userFrame: {
            default: null,
            type: cc.Sprite,
        },
        userAvatar: {
            default: null,
            type: cc.Sprite,
        },
        check:{
            type:cc.Node,
            default:null,
        },

        _data: null,
    },


    // LIFE-CYCLE CALLBACKS:
    ctor:function () {
         var self = this;
        
    },

    onLoad() {
        // this.userAvatar;
        var self = this;
        // cc.loader.loadRes("frame001", function (err, texture) {
        //     cc.log('----->texture:', texture);
        //     self.userHead.setTexture(texture);
        // });

    },

    start() {

    },

    setName(name) {
        this.nickName.string = name;
    },

    setLevel(level) {
        this.userLevel.string = level;
    },

    setUserFrame(frame) {
        if (frame == 0) {
            return;
        } 

        var self = this;
        if (frame < 10) {
            frame = '00' + frame;
        } else {
            frame = '0' + frame;
        }

        // if (this._currFrame != '') {
        //     var oldframe = "frame" + this._currFrame;
        //     cc.loader.releaseRes(oldframe, cc.SpriteFrame);
        // }

        this._currFrame = frame;
        var newframe = "frame" + frame;
        cc.loader.loadRes(newframe, cc.SpriteFrame, function(err, spriteFrame) {
            cc.log('----->spriteFrame:', spriteFrame);
            self.userFrame.spriteFrame = spriteFrame;
        });
    },

    setUserAvatar: function(avatar) {
        var self = this;
        this._currAvatar = avatar;
        uiUtil.setAvatar(self.userAvatar, avatar);
    },

    sun(num){
        var earn1 = this.check.getChildByName('earn1');
        var earn2 = this.check.getChildByName('earn2');
        var earn3 = this.check.getChildByName('earn3');

        var arry = [earn1, earn2, earn3];

        for(var i=0;i<arry.length; i++){
            if(i<num){
                arry[i].color = cc.Color.GREEN;
            }else{
                arry[i].color = cc.Color.GRAY;
            }
        }
    },

    setData(data) {
        this._data = data;
        var ower = data.ower;
        var sun = data.sun;
        cc.log('[====>head] setData:', data);

        var nick = ower['nick'] || '';
        var faceid = ower['face_id'] || 0;
        var frame = ower['frame'] || 1;
 

        this.setName(nick);
        this.setUserAvatar(faceid);
        this.setUserFrame(frame);
        this.sun(sun.length);
        
       
    },



    // update (dt) {},



});