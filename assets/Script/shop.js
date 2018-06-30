var basePopup = require("./basePopup");
var shopModel = require("./mode/shopModel");


cc.Class({
    extends: basePopup,

    properties: {
        closeBtn:{
            default:null,
            type:cc.Button
        },
        itemPrefab :{
            default:null,
            type:cc.Prefab,
        },

        _list:null,
        _listcontent:null,
        _data:null,


    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.setBlackGroud();
        console.log('shop list  onLoad');
        this._list = this.node.getChildByName('scrollview');
        var view = this._list.getChildByName('view');
        this._listcontent = view.getChildByName('content');

    },

    start () {
        this.getShopList();
    },

    setData(data){
        this._conf = data;
    },

    getShopList(){
        var pp = {
            uid: 11111,
            token: 'qeqeqweqeqwe',
        }
        // shopModel.repShopList(pp, this.repShopList, this);
        this.repShopList(null);
    },

    repShopList(data){
        console.log("======>repShopList");
        this._data = data;
        this._data = [
            {
                "id": 1,
                "name": "11111",
                "price": "121212",
            },
            {
                "id": 2,
                "name": "11111",
                "price": "121212",
            },
            {
                "id": 3,
                "name": "11111",
                "price": "121212",
            },
            {
                "id": 4,
                "name": "11111",
                "price": "121212",
            }
        ];

        this.updataList();
    },

    updataList(){
        this.cleanList();
        for(var i=0;i<this._data.length;i++){
            var item = cc.instantiate(this.itemPrefab);
            var itemJs = item.getComponent('shopitem');
            itemJs.setData(this._data[i]);
            itemJs.setCallBack(this.onItem, this);
            this._listcontent.addChild(item);
        }
    },

    onItem(data){
        //购买请求
        console.log('  shop onItem:', data);
    },

    cleanList(){
        if(this._listcontent){
            this._listcontent.removeAllChildren();
        }
    },

    onCloseBtn(){
        console.log('  shop onCloseBtn');
        if(this._conf.closeCallback){
            this._conf.closeCallback.apply(this._conf.closeCallbackObj, [this.node]);
        }
        this.cleanList();
        this.node.destroy();
    }
    // update (dt) {},
});
