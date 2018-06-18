

var global = require('Global'); 
var tree1 = require("./head");


cc.Class({
    extends: cc.Component,

    properties: {
        _currFrame:'',
        _currAvatar:'',

        _allhead:{
            default:[],
            type:tree1,
        },

        _data:null,

    },

   
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        var self = this;
  
    },

    start () {

    },

    setData:function(data){
        this._data = data;

        this.updataHead();
    },

    updataHead:function(){
 
    },



    // update (dt) {},



});
