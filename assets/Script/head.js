

var global = require('Global'); 

cc.Class({
    extends: cc.Component,

    properties: {
        _currFrame:'',
        _currAvatar:'',

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

    },

   
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // this.userAvatar;
        var self = this;
        // cc.loader.loadRes("frame001", function (err, texture) {
        //     cc.log('----->texture:', texture);
        //     self.userHead.setTexture(texture);
        // });
  
    },

    start () {

    },

    setName:function(name){
        this.nickName.string = name;
    },

    setLevel:function(level){
        this.userLevel.string = level;
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
