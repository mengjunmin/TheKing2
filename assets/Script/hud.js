// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

var global = require('Global'); 

cc.Class({
    extends: cc.Component,

    properties: {
        _currFrame:'',
        _currAvatar:'',
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        nickName:{
            default:null,
            type:cc.Label,
        },
        userLevel:{
            default:null,
            type:cc.Label,
        },
        userFrame:{
            default:null,
            type:cc.Sprite,
        },
        userAvatar:{
            default:null,
            type:cc.Sprite,
        },
        userGold:{
            default:null,
            type:cc.Label,
        },
    },

   
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // this.userAvatar;
        var self = this;
        // cc.loader.loadRes("frame001", function (err, texture) {
        //     cc.log('----->texture:', texture);
        //     self.userHead.setTexture(texture);
        // });
  
        this.setUserAvatar(global.user['avatar']|| '001');
        this.setUserFrame(global.user['frame'] || '001');
        this.setName(global.user['nickName']);
        this.setGold(global.user['userGold']);
        this.setLevel(global.user['userLevel']);
    },

    start () {

    },

    onPay:function(obj,data){
        cc.log('----->onPay');
        // cc.log('----->obj:', obj);
        // cc.log('----->data:', data);


    },

    setName:function(name){
        this.nickName.string = name;
    },

    setLevel:function(level){
        this.userLevel.string = level;
    },

    setGold:function(gold){
        this.userGold.string = gold;
    },
    
    setUserFrame:function(frame){
        var self = this;
        if(frame == '') return;

        if(this._currFrame != ''){
            var frame = "frame" + this._currFrame;
            cc.loader.releaseRes(frame, cc.SpriteFrame);
        }

        this._currFrame = frame;
        var newframe = "frame" + "001";
        cc.loader.loadRes(newframe, cc.SpriteFrame, function (err, spriteFrame) {
            cc.log('----->spriteFrame:', spriteFrame);
            self.userFrame.spriteFrame = spriteFrame;
        });
    },

    setUserAvatar:function(avatar){
        var self = this;
        if(avatar == '') return;

        if(this._currAvatar != ''){
            var avatar = "monster" + this._currFrame + '_s';
            cc.loader.releaseRes(avatar, cc.SpriteFrame);
        }

        this._currAvatar = avatar;
        var newavatar = "monster" + '001' + '_s';
        cc.loader.loadRes(newavatar, cc.SpriteFrame, function (err, spriteFrame) {
            cc.log('----->spriteFrame:', spriteFrame);
            self.userAvatar.spriteFrame = spriteFrame;
        });
    },



    // update (dt) {},



});