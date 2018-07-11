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

    onLoad() {
        var self = this;

    },

    start() {

    },

    setData(data) {
        this._data = data.list;
        cc.log('[tree2]  setData', this._data);

        for (var i = 0; i < this._data.length; i++) {
            var one = this._data[i];
            cc.log('[tree2]  setData  one', one);
            if (one.uid == "bb" /*userMode.getInstance().user.uid*/ ) {
                this._objectSelf = one;
                break;
            }
        }

        cc.log('this._objectSelf:', this._objectSelf);
        this.updataHead();
    },

    updataHead() {
        if (this._objectSelf) {
            var head1 = this.node.getChildByName("myself");
            var head1Js = head1.getComponent('head');
            head1Js.setData(this._objectSelf);
        }
        // return;
        var branch = this.getBranchForObj(this._objectSelf);
        var num = branch.length;
        cc.log('branch:', branch);
        if (num > 0) {
            var sun1 = this.node.getChildByName("sun1");
            var sun1Js = sun1.getComponent('head');
            sun1Js.setData(branch[0]);
        }

        if (num > 1) {
            var sun2 = this.node.getChildByName("sun2");
            var sun2Js = sun2.getComponent('head');
            sun2Js.setData(branch[1]);
        }

        if (num > 2) {
            var sun3 = this.node.getChildByName("sun3");
            var sun3Js = sun3.getComponent('head');
            sun3Js.setData(branch[2]);
        }

        var higherUp = this.getHigherUpForObj(this._objectSelf);
        cc.log('higherUp:', higherUp);
        if (higherUp) {
            var father = this.node.getChildByName("father");
            var fatherJs = father.getComponent('head');
            fatherJs.setData(higherUp);
        }


    },


    getBranchForUid(uid) {
        var array = [];

        for (var i = 0; i < this._data.length; i++) {
            var one = this._data[i];
            if (one.puid == uid) {
                array.push(one);
            }
        }

        return array;
    },

    getBranchForObj(obj) {
        var array = [];
        var uid = obj.uid;

        for (var i = 0; i < this._data.length; i++) {
            var one = this._data[i];
            if (one.puid == uid) {
                array.push(one);
            }
        }

        return array;
    },

    getHigherUpForUid(uid) {
        var puid = null;
        for (var i = 0; i < this._data.length; i++) {
            var one = this._data[i];
            if (one.uid == uid) {
                puid = one.puid;
                break;
            }
        }

        if (puid) {
            for (var i = 0; i < this._data.length; i++) {
                var one = this._data[i];
                if (one.uid == puid) {
                    return one;
                }
            }
        }
        return null;
    },

    getHigherUpForObj(obj) {
        var puid = obj.puid;
        if (puid) {
            for (var i = 0; i < this._data.length; i++) {
                var one = this._data[i];
                if (one.uid == puid) {
                    return one;
                }
            }
        }

        return null;
    },


    // update (dt) {},



});