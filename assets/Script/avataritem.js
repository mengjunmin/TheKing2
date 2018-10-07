

var global = require('Global'); 

cc.Class({
    extends: cc.Component,

    properties: {
        _currFrame:'',
        _currAvatar:'',

        userFrame:{
            default:null,
            type:cc.Sprite,
        },
        userAvatar:{
            default:null,
            type:cc.Sprite,
        },
        lock:{
            default:null,
            type:cc.Sprite,
        },
        selectKuang:{
            default:null,
            type:cc.Sprite,
        },

        touchnode:{
            default:null,
            type:cc.Node,
        },

        _data:null,
        _fun:null,
        _target:null,
        _isLock:null,
        _isSelect:null,
    },

   
    // LIFE-CYCLE CALLBACKS:
    ctor:function () {
         var self = this;
        this._isLock = true;
        this._isSelect = false;
    },

    onLoad () {
        // this.userAvatar;
        var self = this;
        // cc.loader.loadRes("frame001", function (err, texture) {
        //     cc.log('----->texture:', texture);
        //     self.userHead.setTexture(texture);
        // });
  
    },

    start () {
        var self = this;
        self.touchnode.on(cc.Node.EventType.TOUCH_END, function (event) {
            console.log('----->base popup  TOUCH_END');
            self.onCallBack(self._data);
        }, self);
    },

    setName:function(name){
        this.nickName.string = name;
    },

    setLevel:function(level){
        this.userLevel.string = level;
    },
    
    setUserFrame:function(frame){
        var self = this;
        if(frame == '') return;

        // if(this._currFrame != ''){
        //     var frame = "frame" + this._currFrame;
        //     cc.loader.releaseRes(frame, cc.SpriteFrame);
        // }

        this._currFrame = frame;
        var newframe = "frame" + "001";
        cc.loader.loadRes(newframe, cc.SpriteFrame, function (err, spriteFrame) {
            cc.log('----->spriteFrame:', spriteFrame);
            self.userFrame.spriteFrame = spriteFrame;
        });
    },

    setUserAvatar:function(avatar){
        var self = this;


        this._currAvatar = avatar;
        var idx = avatar<10?('00'+avatar):('0'+avatar);
        var newavatar = "monster" + idx + '_s'
        cc.loader.loadRes(newavatar, cc.SpriteFrame, function (err, spriteFrame) {
            cc.log('----->spriteFrame:', spriteFrame);
            self.userAvatar.spriteFrame = spriteFrame;

        });
    },

    setData(data){
        this._data = data;

        this.setUserAvatar(data);
    },

    setLock(islock){
        this._isLock = islock;
        if(islock){
            this.lock.node.active = true;
        }else{
            this.lock.node.active = false;
        }
    },
    setSelect(isselect){
        this._isSelect = isselect;
        if(isselect){
            this.selectKuang.node.active = true;
        }else{
            this.selectKuang.node.active = false;
        }
    },

    setCallBack(fun, target){
        this._fun = fun;
        this._target = target;
    },

    onCallBack(data){
        if(this._isLock){
            return;
        }
        if(this._fun)
            this._fun.call(this._target, data);
    },

    // update (dt) {},



});
