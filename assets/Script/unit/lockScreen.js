cc.Class({
    extends: cc.Component,

    properties: {
        loading: {
            default: null,
            type: cc.Sprite
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {

    },

    start() {

    },

    onEnable: function () {
        this.playAni();
    },

    onDisable: function () {
        this.stopAni();
    },
    playAni() {
        var rotateBy = cc.rotateBy(1,-360);
        var repeatForever = cc.repeatForever(rotateBy);
        this.loading.node.runAction(repeatForever);

    },
    stopAni() {
        this.loading.node.stopAllActions();
    },
    // update (dt) {},
});