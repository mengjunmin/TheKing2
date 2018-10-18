var basePopup = require("./basePopup");
var mailModel = require("./mode/mailModel");
var userMode = require("./mode/userMode");
// var MailPool = require('./pool/MailPool');


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

        _mailList: null,
        _listcontent: null,
        _data: null,


    },

    // LIFE-CYCLE CALLBACKS:
    ctor:function () {
        console.log('----->mail  ctor');
         var self = this;
        
    },

    onLoad() {
        this.setBlackGroud();
        console.log('mail list  onLoad');
        this._mailList = this.node.getChildByName('scrollview');
        var view = this._mailList.getChildByName('view');
        this._listcontent = view.getChildByName('content');

    },

    setData(data) {
        this._conf = data;
    },

    start() {
        this.getMailList();
    },

    getMailList() {
        var invite = userMode.getInstance().user.uid;
        var token = userMode.getInstance().user.token;
        var type = 'msg';

        var params = {
            token: token,
            invite: invite,
            type:type,
        }

        mailModel.repMailList(params, this.repMailList, this);
        // this.repMailList(null);
    },

    repMailList(data) {
        console.log("======>repMailList：", data);
        this._data = data;
        // this._data = [
        //     {
        //         "id": 1,
        //         "title": "11111",
        //         "content": "121212",
        //         "action": "",
        //         "status": 0
        //     },
        // ];

        this.updataList();
    },

    updataList() {
        this.cleanList();
        for (var i = 0; i < this._data.length; i++) {
            var item = cc.instantiate(this.itemPrefab);
            var itemJs = item.getComponent('mailitem');
            itemJs.setData(this._data[i]);
            itemJs.setCallBack(this.onClickItem, this);
            this._listcontent.addChild(item);
        }
    },

    onClickItem(...arge){
        console.log('  mail dell: ', arge[0], arge[1]);
        var maildata = arge[0];
        var type = arge[1];
        var ids = maildata._id;
// return;
        if(type == 0){
            this.readMail(ids);
        }else if(type == 1){
            this.dellMail(ids);
        }
        
    },

    dellMail(id) {
        var uid = userMode.getInstance().user.uid;
        var token = userMode.getInstance().user.token;
        var ids = id;

        var params = {
            invite: uid,
            token: token,
            ids: ids,
        };

        mailModel.repDellMail(params, this.repDellMail, this);
    },

    repDellMail(data) {
        cc.log('---->repDellMail: ', data);

        // this.updataList();
    },

    readMail(id) {
        var uid = userMode.getInstance().user.uid;
        var token = userMode.getInstance().user.token;
        var ids = id;

        var params = {
            invite: uid,
            token: token,
            ids: ids,
        };

        mailModel.repMailMarkread(params, this.repReadMail, this);
    },

    repReadMail(data) {
        cc.log('---->repReadMail: ', data);

        // this.updataList();
    },

    

    cleanList() {
        if (this._listcontent) {
            this._listcontent.removeAllChildren();
        }
    },

    onCloseBtn() {
        console.log('  mail onCloseBtn');
        if (this._conf.closeCallback) {
            this._conf.closeCallback.apply(this._conf.closeCallbackObj, [this.node]);
        }

        this.cleanList();
        this.node.destroy();
    }
    // update (dt) {},
});