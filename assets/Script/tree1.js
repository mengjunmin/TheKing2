var global = require('Global');
var head = require("./head");
var userMode = require("./mode/userMode");

cc.Class({
    extends: cc.Component,

    properties: {
        _data: null,
        _objectSelf: null,



    },


    // LIFE-CYCLE CALLBACKS:
    ctor:function () {
         var self = this;
        
    },

    onLoad() {
        var self = this;

    },

    start() {

    },

    setData: function(data) {
        this._data = data;

        for (var i = 0; i < this._data.length; i++) {
            var one = this._data[i];
            if (one._id == userMode.getInstance().user._id) {
                this._objectSelf = one;
                break;
            }
        }

        this.updataHead();
    },

    updataHead: function() {
        if (this._objectSelf) {
            var head1 = this.node.getChildByName("myself");
            var head1Js = head1.getComponent('head');
            head1Js.setData({ower:this._objectSelf, sun:[]});
        }

        var branch = this.getBranchForUid(this._objectSelf._id);
        var num = branch.length;
        cc.log('---> updataHead: ', num);

        var sun1 = this.node.getChildByName("sun1");
        var sun1Js = sun1.getComponent('head');
        if (num > 0) {
            var suns1 = this.getBranchForUid(branch[0]._id);
            sun1Js.setData({ower:branch[0], sun:suns1});
        }else{
            sun1Js.setData({ower:{}, sun:[]});
        }

        var sun2 = this.node.getChildByName("sun2");
        var sun2Js = sun2.getComponent('head');
        if (num > 1) {
            var suns2 = this.getBranchForUid(branch[1]._id);
            sun2Js.setData({ower:branch[1], sun:suns2});
        }else{
            sun2Js.setData({ower:{}, sun:[]});
        }

        var sun3 = this.node.getChildByName("sun3");
        var sun3Js = sun3.getComponent('head');
        if (num > 2) {
            var suns3 = this.getBranchForUid(branch[2]._id);
            sun3Js.setData({ower:branch[2], sun:suns3});
        }else{
            sun3Js.setData({ower:{}, sun:[]});
        }



    },


    getBranchForUid(uid) {
        var array = [];

        for (var i = 0; i < this._data.length; i++) {
            var one = this._data[i];
            if (one.parent_invite == uid) {
                array.push(one);
            }
        }

        return array;
    },

    getBranchForObj(obj) {
        var array = [];
        var uid = obj._id;

        for (var i = 0; i < this._data.length; i++) {
            var one = this._data[i];
            if (one.parent_invite == uid) {
                array.push(one);
            }
        }

        return array;
    },




    // update (dt) {},



});