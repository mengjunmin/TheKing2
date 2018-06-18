

cc.Class({
    extends: cc.Component,

    properties: {
        content:{
            default:null,
            type:cc.Node
        },

        bgPrefab:{
            default:null,
            type:cc.Prefab,
        },
    },


    ctor:function () {
        cc.log("Square");   // 再调用子构造函数
        var Size = cc.director.getVisibleSize();
        console.log('----->base popup');
         var self = this;

        var ws = cc.director.getWinSize();


        // cc.loader.loadRes("bg", function (err, texture) {
        //     var node = new cc.Node();
        //     var sprite = node.addComponent(cc.Sprite);
        //     sprite.spriteFrame.setTexture(texture);
        //     self.back.addChild(node);
        // });
    
        
    },
    // LIFE-CYCLE CALLBACKS:
    
    onLoad () {
        var bg = cc.instantiate(this.bgPrefab);
        bg.opacity = 100;
        this.node.addChild(bg,-1);

        bg.on(cc.Node.EventType.TOUCH_START, function (event) {
            console.log('----->base popup  TOUCH_START');

        }, this);

        bg.on(cc.Node.EventType.TOUCH_END, function (event) {

            console.log('----->base popup  TOUCH_END');
        }, this)

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
