// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

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
        icon: {
            default: null,
            type: cc.Sprite
        },
        content: {
            default: null,
            type: cc.Label,
        },
        dellBtn: {
            default: null,
            type: cc.Button,
        },
        itembtn: {
            default: null,
            type: cc.Button,
        },
        arrowbtn: {
            default: null,
            type: cc.Button,
        },
        title: {
            default: null,
            type: cc.Label,
        },

        _data: null,
        _callback: null,
        _objecttarget: null,
        _isDellIn:null,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {

    },

    ctor: function () {
        var self = this;
        this._isDellIn = false;
    },

    start() {
        cc.log('mailItem');
    },


    onEnable: function () {
        // this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        // this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        // this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        // this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
    },

    onDisable: function () {
        
    },

    onTouchStart(event){
        cc.log('onTouchStart');
        
    },
    onTouchMove(event){
        cc.log('onTouchMove');
    },
    onTouchEnd(event){
        cc.log('onTouchEnd');
    },
    onTouchCancel(event){
        cc.log('--->onTouchCancel');
    },

    setData(data) {
        this._data = data;
        this.updateView();
    },

    updateView() {
        this.title.string = this._data['title'] || '';
        this.content.string = this._data['content'] || '';

        var status = this._data['status'] || 0;
    },

    onDellBtn(obj, data) {
        cc.log('--->onDellBtn');
        this.onCallBack(this._data, 1);
    },
    onItemBtn(obj, data) {
        cc.log('--->onItemBtn');
        if(this._isDellIn){
            this.dellBtnOut();
            return;
        }
        //打开邮件
        this.onCallBack(this._data, 0);
    },

    onArrawBtn(obj, data) {
        cc.log('--->onArrawBtn');
        this.dellBtnIn();

        
        
    },

    setCallBack: function (fun, target) {
        this._callback = fun;
        this._objecttarget = target;

    },

    dellBtnIn() {

        this._isDellIn = true;
        this.arrowbtn.node.x = 187;
        var move = cc.moveTo(0.5, cc.v2(70, 0));
        this.dellBtn.node.runAction(move);
    },

    dellBtnOut() {
        this._isDellIn = false;
        this.dellBtn.node.x = 158;
        this.arrowbtn.node.x = 87;
    },

//0：代开邮件。1：删除邮件
    onCallBack: function (data, type) {
        if (this._callback) this._callback.apply(this._objecttarget, [data, type]);
    },

    // update (dt) {},
});
