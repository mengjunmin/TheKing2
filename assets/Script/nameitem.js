
cc.Class({
    extends: cc.Component,

    properties: {
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
        callBack:null,
        objectTarget:null,

        data:null,
        lable:{
            default:null,
            type:cc.Label,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
    },

    onTouchEnd(event){
        if (this.callBack) this.callBack.apply(this.objectTarget, [this.data]);
    },

    registerEvent(fun ,target){
        this.callBack = fun;
        this.objectTarget = target;
    },

    setData(data){
        this.data = data;
        this.refreshView();
    },

    refreshView(){
        this.lable.string = this.data['nick'] || '-------';
    },
    // update (dt) {},
});
