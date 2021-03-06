var basePopup = require("./basePopup");
var myRewardModel = require("./mode/myRewardModel");
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
    ctor:function () {
        console.log('----->myReward  ctor');
         var self = this;
        
    },

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

    setData(data){
        this._conf = data;
    },

    getList(){
        var uid = userMode.getInstance().user.uid;
        var t = userMode.getInstance().user.t;
        var pp = {
            uid: uid,
            t: t,
        }
        myRewardModel.repList(pp, this.repList, this);

    },

    repList(data){
        console.log("======>repList");
        this._data = data.list;
        // this._data = [
        //     {
        //         "id": 1,
        //         "name": "11111",
        //         "time": "121212",
        //     },
        //     {
        //         "id": 2,
        //         "name": "11111",
        //         "time": "121212",
        //     },
        //     {
        //         "id": 3,
        //         "name": "11111",
        //         "time": "121212",
        //     },
        //     {
        //         "id": 4,
        //         "name": "11111",
        //         "time": "121212",
        //     }
        // ];

        this.updataList();
    },

    updataList(){
        this.cleanList();
        for(var i=0;i<this._data.length;i++){
            var item = cc.instantiate(this.itemPrefab);
            var itemJs = item.getComponent('myRewarditem');
            itemJs.setData(this._data[i]);
            itemJs.setCallBack(this.onItem, this);
            this._listcontent.addChild(item);
        }
    },

    onItem(data){
        //购买请求
        console.log('  myRewarditem:', data);
    },

    cleanList(){
        if(this._listcontent){
            this._listcontent.removeAllChildren();
        }
    },

    onCloseBtn(){
        console.log('  myReward onCloseBtn');
        if(this._conf.closeCallback){
            this._conf.closeCallback.apply(this._conf.closeCallbackObj, [this.node]);
        }
        this.cleanList();
        this.node.destroy();
    }
    // update (dt) {},
});
