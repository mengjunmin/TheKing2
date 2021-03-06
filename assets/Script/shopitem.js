


var uiUtil = require('./unit/uiUtil');
// var userMode = require("./mode/userMode");


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
        own:{
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

    // onLoad () {},
    ctor:function () {
         var self = this;
        
    },

    start () {
        
    },

    onEnable: function () {

    },

    onDisable: function () {

    },

    setData(data){
        this._data = data;
        this.updateView();
    },

    updateView(){
        /*
create_time: 636749464213609300
deleted: false
display: "加入家族"
icon: "http://"
jewels: 500
name: "join_family"
status: 0
update_time: null
_id: "P0000000001"

create_time: 636749464213843700
deleted: false
display: "购买头像"
icon: "http://"
jewels: 500
name: "buy_face"
status: 0
update_time: null
_id: "P0000000002"

        */

       

        this.prodname.string = this._data.name;
        this.price.string = this._data.jewels;

        var type = this._data.type;
        if(type == "join_family"){
            // this.setIcon();
        }else if(type == "buy_face"){
            this.setIcon(this._data.face_id);
        }

        if(this._data.own){
            this.own.string = '已购买'
        }else{
            this.own.string = '';
        }
    },

    setIcon:function(avatar){
        var self = this;
        uiUtil.setAvatar(self.icon, avatar);
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
