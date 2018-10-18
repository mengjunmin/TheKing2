var basePopup = require("./basePopup");
var shopModel = require("./mode/shopModel");
var userMode = require("./mode/userMode");
var popupManager = require("./unit/popupManager");

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


    },

    ctor: function () {
        console.log('----->shop  ctor');
        var self = this;

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
        this.getJewelList();
    },

    setData(data) {
        this._conf = data;
    },

    getJewelList() {
        var uid = userMode.getInstance().user.uid;
        var token = userMode.getInstance().user.token;

        var params = {
            token: token,
        }
        shopModel.repJewelList(params, this.repJewelList, this);

    },

    repJewelList(data) {
        console.log("======>repJewelList");
        this._data = data;
        // this._data = [
        //     {
        //          create_time: 636749464214078100
        //          currency: "￥"
        //          deleted: false
        //          icon: "http://"
        //          jewels: 20
        //          money: 20
        //          name: "20个钻石"
        //          status: 0
        //          update_time: null
        //          _id: "J0000000001"
        //     }
        // ];

        this.updataList();
    },

    updataList() {
        this.cleanList();
        for (var i = 0; i < this._data.length; i++) {
            var item = cc.instantiate(this.itemPrefab);
            var itemJs = item.getComponent('jewelShopitem');
            itemJs.setData(this._data[i]);
            itemJs.setCallBack(this.onItem, this);
            this._listcontent.addChild(item);
        }
    },

    onItem(data) {
        //购买请求
        console.log('  shop onItem:', data);
        var token = userMode.getInstance().user.token;
        var invite = userMode.getInstance().user._id;
        var jewel_id = data._id;

        var params = {
            token: token,
            invite: invite,
            jewel_id: jewel_id,//钻石id
        }

        shopModel.repJewelPay(params, this.repJewelPay, this);

    },

    repJewelPay(data){
        //通知服务器购买钻石成功了，
        //http://59.110.138.129:112/gapi/jewel/jewelpay/testfinish?jewelpay_id=72dc7425-dd37-4ebc-84d2-07616ab9db63&pay_platform=weixin&transaction_id=qwqw

        console.log('  repJewelPay： ',data);
        var self = this;
        var onCancel = function(){
            
        }
        var onOk = function(){

        }
        var CONF = {
            title: '',
            content: "购买成功！",
            okLabel: '确定',
            okCallback: onOk, // 确定
            okCallbackObj: self, // 确定
            showCloseBtn:false,
        };
        popupManager.create('note', CONF);
    },

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
