var basePopup = require("./basePopup");
var shopModel = require("./mode/shopModel");
var userMode = require("./mode/userMode");
var popupManager = require("./unit/popupManager");
var Consume = require('./unit/consume');
var familyModel = require("./mode/familyModel");
var UserInfoModel = require('./mode/userInfoModel');
var MessageCenter = require('./Signal/MessageCenter');

cc.Class({
    extends: basePopup,

    properties: {
        closeBtn: {
            default: null,
            type: cc.Button
        },
        itemPrefab: {
            default: null,
            type: cc.Prefab,
        },

        _list: null,
        _listcontent: null,
        _data: null,
        _faceid: null,//暂时保存要买的头像id

    },

    ctor: function () {
        console.log('----->shop  ctor');
        var self = this;
        this._faceid = 0;
    },
    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.setBlackGroud();
        console.log('shop list  onLoad');
        this._list = this.node.getChildByName('scrollview');
        var view = this._list.getChildByName('view');
        this._listcontent = view.getChildByName('content');

    },

    start() {
        this.getShopList();
    },

    setData(data) {
        this._conf = data;
    },

    getShopList() {
        var uid = userMode.getInstance().user.uid;
        var token = userMode.getInstance().user.token;

        var params = {
            token: token,
        }
        shopModel.repProductList(params, this.repShopList, this);

    },

    repShopList(data) {
        console.log("======>repShopList");

        // this._data = [
        /*
create_time: 636753004453983400
deleted: false
icon: "http://"
jewels: 500
name: "加入家族"
status: 0
type: "join_family"
update_time: null
_id: "P0000000001"

create_time: 636753004455526300
deleted: false
icon: "http://"
jewels: 50
name: "购买头像"
status: 0
type: "buy_face"
update_time: null
_id: "P0000000002"

        */
        // ];
        var list = [];
        for (var i = 0; i < data.length; i++) {
            var one = data[i];
            var obj = null;

            if (one['type'] == "join_family") {
                obj = {
                    icon: one.icon,
                    jewels: one.jewels,
                    name: one.name,
                    type: one.type,
                    _id: one._id,
                    status: one.status,
                    own :false,
                };
                list.push(obj);
                console.log("======>join_family");
            } else if (one['type'] == "buy_face") {
                for (var k = 2; k <= 15; k++) {
                    var own = userMode.getInstance().ownAvatars(k);
                    obj = {
                        icon: one.icon,
                        jewels: one.jewels,
                        name: one.name,
                        type: one.type,
                        _id: one._id,
                        status: one.status,
                        face_id: k,
                        own:own,
                    };
                    list.push(obj);
                    console.log("======>buy_face: ", k);
                }
            }
        }

        this._data = list;
        console.log('\n');
        console.log("======>this._data: ", this._data);
        console.log('\n');
        this.updataList();
    },

    updataList() {
        this.cleanList();
        for (var i = 0; i < this._data.length; i++) {
            var item = cc.instantiate(this.itemPrefab);
            var itemJs = item.getComponent('shopitem');
            itemJs.setData(this._data[i]);
            itemJs.setCallBack(this.onItem, this);
            this._listcontent.addChild(item);
        }
    },

    onItem(data) {
        //购买请求
        console.log('  shop onItem:', data);
        var type = data.type;
        if (type == "join_family") {
            this.buyRole(data);
        } else if (type == "buy_face") {
            if(data.own){
                var conf = {
                    content: '您已经购买了此道具！',
                    type: 2,
                };
                popupManager.create('Toaster', conf);
                return;
            }
            this.buyFace(data);
        }


    },

    buyRole(data) {
        var self = this;
        var jewels = data.jewels;
        var onCancel = function () {

        }
        var onOk = function () {
            if (Consume.jewelsIsEnough(jewels)) {
                self.createRoleOrder(data);
            }
        }
        var CONF = {
            title: '角色激活',
            content: "花费钻石" + data.jewels + "，激活该角色，是否激活？",
            okLabel: '激活',
            cancelLabel: '取消',
            cancelCallback: onCancel, // 取消
            cancelCallbackObj: self, // 取消
            okCallback: onOk, // 确定
            okCallbackObj: self, // 确定
            showCloseBtn: false,
        };
        popupManager.create('note', CONF);
    },

    createRoleOrder(data) {
        var self = this;
        self._faceid = data.face_id;
        var token = userMode.getInstance().user.token;
        var invite = userMode.getInstance().user._id;
        var product_id = data._id;
        var params = {
            token: token,
            invite: invite,
            product_id: product_id,//钻石id
        }
        shopModel.repJewelCost(params, self.onRoleOrderDone, self);
    },

    onRoleOrderDone(data) {
        cc.log('------->onRoleOrderDone: ', data);
        this.joinFamily(data);
    },

    joinFamily(data) {
        var token = userMode.getInstance().user.token;
        var invite = userMode.getInstance().user.uid;
        var jewelcost_id = data.jewelcost_id;

        var params = {
            token: token,
            invite: invite,
            jewelcost_id: jewelcost_id,
        };
        familyModel.repFamilyJoin(params, this.onjoinFamilyDone, this);
    },
    // http://59.110.138.129:112/gapi/family/join?token=41eb9d16-4225-46f8-a184-197099de5bbe&invite=2T7XCA&jewelcost_id=32e5ecb2-1ce8-4ad8-8557-bad3cb0db03e


    onjoinFamilyDone(data) {
        cc.log('------->onjoinFamilyDone: ', data);
        MessageCenter.PAY_TIP.emit(false);
        //重新拉去一次角色数据
        this.updateUser();

    },

    updateUser(){
        var token = userMode.getInstance().user.token;
        var uid = userMode.getInstance().user.uid;
        var params = {
            token: token,
            invite: uid,
        }
        UserInfoModel.repFullUserInfo(params, this.repFullUserInfo, this);
    },

    repFullUserInfo(data) {
        userMode.getInstance().updataUser(data);
        MessageCenter.UPDATE_HUD.emit();
        
    },

    //购买头像
    buyFace(data) {
        //头像2--15
        var self = this;
        var jewels = data.jewels;

        var onCancel = function () {
        }
        var onOk = function () {
            if (Consume.jewelsIsEnough(jewels)) {
                self.createFaceOrder(data);
            }
        }
        var CONF = {
            title: '购买头像',
            content: "花费钻石" + data.jewels + "，购买该头像，是否购买？",
            okLabel: '激活',
            cancelLabel: '取消',
            cancelCallback: onCancel, // 取消
            cancelCallbackObj: self, // 取消
            okCallback: onOk, // 确定
            okCallbackObj: self, // 确定
            showCloseBtn: false,
        };
        popupManager.create('note', CONF);
    },

    createFaceOrder(data) {
        var self = this;
        self._faceid = data.face_id;
        var token = userMode.getInstance().user.token;
        var invite = userMode.getInstance().user._id;
        var product_id = data._id;
        var params = {
            token: token,
            invite: invite,
            product_id: product_id,//钻石id
        }
        shopModel.repJewelCost(params, self.onFaceOrderDone, self);
    },

    onFaceOrderDone(data) {
        this.exchangeFace(data);
    },

    exchangeFace(data) {
        console.log('  exchangeFace', data);
        var self = this;
        var face_id = self._faceid;
        var token = userMode.getInstance().user.token;
        var invite = userMode.getInstance().user._id;
        var jewelcost_id = data.jewelcost_id;

        var params = {
            token: token,
            invite: invite,
            jewelcost_id: jewelcost_id,//钻石消费单号
            face_id: face_id,//头像id
        }
        shopModel.repBuyface(params, self.onExchangeFaceDone, self);
    },

    onExchangeFaceDone(data) {
        // 拉去用户数据
        console.log('  onExchangeFaceDone', data);
        this.updateUser();
    },




    /////
    cleanList() {
        if (this._listcontent) {
            this._listcontent.removeAllChildren();
        }
    },

    onCloseBtn() {
        console.log('  shop onCloseBtn');
        if (this._conf.closeCallback) {
            this._conf.closeCallback.apply(this._conf.closeCallbackObj, [this.node]);
        }
        this.cleanList();
        this.node.destroy();
    }
    // update (dt) {},
});
