// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html


/*
*参数：
*{
    url：’‘，
}
*
*/
cc.Class({
    extends: cc.Component,

    properties: {
        noticePicture:{
            default:null,
            type:cc.Sprite
        },
        closeBtn:{
            default:null,
            type:cc.Button
        },

        _data:null,


    },

    // LIFE-CYCLE CALLBACKS:
    ctor:function () {
        console.log('----->noticePic  ctor');
         var self = this;
        
    },
    // onLoad () {},

    start () {
        this.updataView();
    },

    onEnable: function () {
        this.setPic();
    },

    onDisable: function () {
     
    },
    
    updataView(){

    },

    setData(data){
        this._conf = data;
    },

    setPic: function() {
        var self = this;
        var pic = this._conf.url;
        // cc.loader.loadRes(pic, cc.SpriteFrame, function(err, spriteFrame) {
        //     cc.log('----->spriteFrame:', spriteFrame);
        //     self.noticePicture.spriteFrame = spriteFrame;
        // });

        // cc.loader.load(pic, function (err, texture) {
        //     // Use texture to create sprite frame
        //     self.noticePicture.spriteFrame.setTexture(texture);
        // });
    },

    releasePic: function() {
        var self = this;
        // var oldavatar = "monster" + this._currFrame + '_s';
        // cc.loader.releaseRes(oldavatar, cc.SpriteFrame);

    },


    onCloseBtn(){
        console.log('   onCloseBtn');
        if(this._conf.closeCallback){
            this._conf.closeCallback.apply(this._conf.closeCallbackObj, [this.node]);
        }

        this.releasePic();
        this.node.destroy();
    }

    // update (dt) {},
});
