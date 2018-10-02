var basePopup = require("./basePopup");
var mailModel = require("./mode/mailModel");
var userMode = require("./mode/userMode");
var MailPool = require('./pool/MailPool');

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

        _mailList:null,
        _listcontent:null,
        _data:null,


    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.setBlackGroud();
        console.log('mail list  onLoad');
        this._mailList = this.node.getChildByName('scrollview');
        var view = this._mailList.getChildByName('view');
        this._listcontent = view.getChildByName('content');

    },

    setData(data){
        this._conf = data;
    },

    start () {
        this.getMailList();
    },

    getMailList(){
        var uid = userMode.getInstance().user.uid;
        var t = userMode.getInstance().user.t;
        var pp = {
            uid: uid,
            t: t,
        }
        mailModel.repMailList(pp, this.repMailList, this);
        // this.repMailList(null);
    },

    repMailList(data){
        console.log("======>repMailList");
        this._data = data.list;
        // this._data = [
        //     {
        //         "id": 1,
        //         "title": "11111",
        //         "content": "121212",
        //         "action": "",
        //         "status": 0
        //     },
        //     {
        //         "id": 1,
        //         "title": "222222",
        //         "content": "212121212",
        //         "action": "",
        //         "status": 1
        //     },
        //     {
        //         "id": 1,
        //         "title": "3333333",
        //         "content": "212121212",
        //         "action": "",
        //         "status": 1
        //     },
        //     {
        //         "id": 1,
        //         "title": "4444444",
        //         "content": "212121212",
        //         "action": "",
        //         "status": 1
        //     }
        // ];

        this.updataList();
    },

    updataList(){
        this.cleanList();
        for(var i=0;i<this._data.length;i++){
            var item = cc.instantiate(this.itemPrefab);
            var itemJs = item.getComponent('mailitem');
            itemJs.setData(this._data[i]);
            this._listcontent.addChild(item);
        }
    },


    dellMail(id){
        var uid = userMode.getInstance().user.uid;
        var t = userMode.getInstance().user.t;
        var pp = {
            uid: uid,
            t: t,
            ids:id
        }

        mailModel.repDellMail(pp, this.repDellMail, this);
    },

    repDellMail(data){
        this._data = data.list;

        this.updataList();
    },


    cleanList(){
        if(this._listcontent){
            this._listcontent.removeAllChildren();
        }
    },

    onCloseBtn(){
        console.log('  mail onCloseBtn');
        if(this._conf.closeCallback){
            this._conf.closeCallback.apply(this._conf.closeCallbackObj, [this.node]);
        }

        this.cleanList();
        this.node.destroy();
    }
    // update (dt) {},
});
