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
        icon:{
            default:null,
            type:cc.Sprite
        },
        content:{
            default:null,
            type:cc.Label,
        },

        title:{
            default:null,
            type:cc.Label,
        },

        _data:null,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

    },
    
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
        this.title.string = this._data.title;
        this.content.string = this._data.content;
    },

    // update (dt) {},
});
