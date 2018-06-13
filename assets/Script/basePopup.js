

cc.Class({
    extends: cc.Component,

    properties: {
        content:{
            default:null,
            type:cc.Node
        },
        back:{
            default:null,
            type:cc.Node
        },
    },


    ctor:function () {
        cc.log("Square");   // 再调用子构造函数
        var Size = cc.director.getVisibleSize();
        console.log('----->base popup');

        // this.back = new cc.Node();
        // this.back.setContentSize(Size);
        // this.back.color = cc.color(255,255,0,255);
        // // this.back.opacity = 100;
        // this.addChild(this.back);

        this.back = new cc.Node();
        this.back.setSize(Size);
        this.addChild(this.back);

        this.content = new cc.Node();
        this.content.setSize(Size);
        this.addChild(this.content);


        // var sister1 = this.getComponent(cc.Sprite);
        // cc.loader.loadRes("resources/monster001_b", cc.SpriteFrame, function (err, spriteFrame) {
        //     sister1.spriteFrame = spriteFrame;
        // });
    
        
    },
    // LIFE-CYCLE CALLBACKS:
    
    onLoad () {



    },


    start () {

    },

    goIn () {
        this.content.setScale(0);
        var act = cc.scaleTo(0.5, 1);
        var callback = cc.callFunc(this.onGoIn, this);
        this.content.runAction(cc.sequence(act, callback));

    },

    goOut () {
        this.content.setScale(1);
        var act = cc.scaleTo(0.5, 0);
        var callback = cc.callFunc(this.onGoOut, this);
        this.content.runAction(cc.sequence(act, callback));
    },

    onGoIn(){

    },

    onGoOut(){
        this.destroy();
    },


    // update (dt) {},
});
