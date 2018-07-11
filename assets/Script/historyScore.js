var basePopup = require("./basePopup");
var historyScoreModel = require("./mode/historyScoreModel");
var userMode = require("./mode/userMode");

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
        console.log('historyScore list  onLoad');
        this._list = this.node.getChildByName('scrollview');
        var view = this._list.getChildByName('view');
        this._listcontent = view.getChildByName('content');

    },

    setData(data){
        this._conf = data;
    },

    start () {
        this.getList();
    },

    getList(){
        var uid = userMode.getInstance().user.uid;
        var t = userMode.getInstance().user.t;
        var pp = {
            uid: uid,
            t: t,
        }
        historyScoreModel.repList(pp, this.repList, this);
    },

    repList(data){
        console.log("======>repList");
        this._data = data.list;
        // this._data = [
        //     {
        //         "id": 1,
        //         "name": "11111",
        //         "price": "121212",
        //     },
        //     {
        //         "id": 2,
        //         "name": "11111",
        //         "price": "121212",
        //     },
        //     {
        //         "id": 3,
        //         "name": "11111",
        //         "price": "121212",
        //     },
        //     {
        //         "id": 4,
        //         "name": "11111",
        //         "price": "121212",
        //     }
        // ];

        this.updataList();
    },

    updataList(){
        this.cleanList();
        for(var i=0;i<this._data.length;i++){
            var item = cc.instantiate(this.itemPrefab);
            var itemJs = item.getComponent('historyScoreitem');
            itemJs.setData(this._data[i]);
            itemJs.setCallBack(this.onItem, this);
            this._listcontent.addChild(item);
        }
    },

    onItem(data){
        //购买请求
        console.log('  historyScoreitem:', data);
    },

    cleanList(){
        if(this._listcontent){
            this._listcontent.removeAllChildren();
        }
    },

    onCloseBtn(){
        console.log('  historyScore onCloseBtn');
        if(this._conf.closeCallback){
            this._conf.closeCallback.apply(this._conf.closeCallbackObj, [this.node]);
        }
        this.cleanList();
        this.node.destroy();
    }
    // update (dt) {},
});
