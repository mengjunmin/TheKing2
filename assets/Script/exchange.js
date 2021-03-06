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

    ctor:function () {
        console.log('----->exchange  ctor');
         var self = this;
        
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
        this.getList();
    },

    getList(){
        var pp = {
            uid: 11111,
            t: 'qeqeqweqeqwe',
        }
        // shopModel.repShopList(pp, this.repShopList, this);
        this.repList(null);
    },

    repList(data){
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
        this.cleanList();
        this.node.destroy();
    }
    // update (dt) {},
});
