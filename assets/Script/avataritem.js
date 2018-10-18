

var global = require('Global'); 
var uiUtil = require('./unit/uiUtil');

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
        var self = this;

  
    },

    start () {
        var self = this;
        self.touchnode.on(cc.Node.EventType.TOUCH_END, function (event) {
            console.log('----->base popup  TOUCH_END');
            self.onCallBack(self._data.id);
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
        this._currFrame = frame;
        uiUtil.setFrame(self.userFrame, frame);

        // var newframe = "frame" + "001";
        // cc.loader.loadRes(newframe, cc.SpriteFrame, function (err, spriteFrame) {
        //     cc.log('----->spriteFrame:', spriteFrame);
        //     self.userFrame.spriteFrame = spriteFrame;
        // });
    },

    setUserAvatar:function(avatar){
        var self = this;
        this._currAvatar = avatar;
        uiUtil.setAvatar(self.userAvatar, avatar);
    },

    setData(data){
        this._data = data;
        this.setUserAvatar(data.id);
        this.setLock(data.own!=1);
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
