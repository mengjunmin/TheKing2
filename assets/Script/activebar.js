cc.Class({
    extends: cc.Component,

    properties: {
        progress: {
            default: null,
            type: cc.ProgressBar,
        },
        activeValue: {
            default: null,
            type: cc.Label,
        },
        rewardValue: {
            default: null,
            type: cc.Label,
        },

        _data:null,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    ctor:function () {
         var self = this;
        
    },

    start() {

    },

    setData(data) {
        this._data = data;

        this.ProgressBar.progress = 0.6;
        this.activeValue.string = '222';
        this.rewardValue.string = '111';
    },

    // update (dt) {},
});