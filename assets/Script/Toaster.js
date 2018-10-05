/*
 *参数：content
 *type:1,原地消失。2，飘走消失
 */
cc.Class({
    extends: cc.Component,

    properties: {
        _conf: null,

        text: {
            default: null,
            type: cc.Label
        }

    },

    // LIFE-CYCLE CALLBACKS:
    ctor:function () {
         var self = this;
        
    },

    onLoad() {
        // this._conf = {};
        cc.log('------->Toaster  onLoad: ', this._conf);
    },

    start() {
        cc.log('------->Toaster start', this._conf);
        var content = this._conf['content'] || '';
        var type = this._conf['type'] || 1;

        this.text.string = content;
        if (type == 1) {
            this.AFadeOut();
        } else {
            this.AFadeOutMove();
        }
    },

    AFadeOutMove() {
        cc.log('------->Toaster  AFadeOutMove ');
        var delayTime = cc.delayTime(1);
        var spawn = cc.spawn(cc.moveBy(1, cc.v2(0, 500)), cc.fadeOut(1));
        var callFunc = cc.callFunc(this.onCloseBtn, this);
        this.text.node.runAction(cc.sequence(delayTime, spawn, callFunc));
    },

    AFadeOut() {
        cc.log('------->Toaster  AFadeOut ');
        var delayTime = cc.delayTime(1);
        var fadeOut = cc.fadeOut(1);
        var callFunc = cc.callFunc(this.onCloseBtn, this);
        this.text.node.runAction(cc.sequence(delayTime, fadeOut, callFunc));
    },

    setData(data) {
        this._conf = data;
        cc.log('------->Toaster setData ', data);
    },

    onCloseBtn() {
        console.log('  Toaster Close');
        if (this._conf.closeCallback) {
            this._conf.closeCallback.apply(this._conf.closeCallbackObj, [this.node]);
        }

        this.node.destroy();
    }

    // update (dt) {},
});