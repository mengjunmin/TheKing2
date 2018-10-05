

cc.Class({
    extends: cc.Component,

    properties: {

        icon:{
            default:null,
            type:cc.Sprite
        },
        price:{
            default:null,
            type:cc.Label,
        },

        prodname:{
            default:null,
            type:cc.Label,
        },

        payBtn:{
            default:null,
            type:cc.Button,
        },

        _data:null,
        _fun:null,
        _target:null,
    },

    // LIFE-CYCLE CALLBACKS:
    ctor:function () {
         var self = this;
        
    },

    // onLoad () {},

    start () {
        
    },

    setData(data){
        this._data = data;
        this.updateView();
    },

    updateView(){
        this.prodname.string = this._data.name;
        this.price.string = this._data.price;
    },

    setIcon:function(icon){
        var self = this;

        var newavatar = "monster" + icon + '_s'
        cc.loader.loadRes(newavatar, cc.SpriteFrame, function (err, spriteFrame) {
            cc.log('----->spriteFrame:', spriteFrame);
            self.icon.spriteFrame = spriteFrame;

        });
    },

    setCallBack(fun, target){
        this._fun = fun;
        this._target = target;
    },

    onCallBack(data){
        if(this._fun)
            this._fun.call(this._target, data);
    },

    onButton(){
        this.onCallBack(this._data);
    }

    // update (dt) {},
});
