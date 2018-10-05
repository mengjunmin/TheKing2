

cc.Class({
    extends: cc.Component,

    properties: {

        icon:{
            default:null,
            type:cc.Sprite
        },
        use:{
            default:null,
            type:cc.Label,
        },

        invite:{
            default:null,
            type:cc.Label,
        },


        _data:null,
        _fun:null,
        _target:null,
    },
//{"invite":"JHJ290S","obsolete":"2018/4/12","use":"2018/4/11","user":"JHJ290S@13468305254","status":1}
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
    ctor:function () {
         var self = this;
        
    },

    start () {
        
    },

    setData(data){
        this._data = data;
        this.updateView();
    },

    updateView(){
        cc.log('----->this._data:', this._data);
        this.invite.string = this._data.invite;
        this.use.string = this._data.use;
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
