var basePopup = require("./basePopup");
var mailModel = require("./mode/mailModel");


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
        _avatars:null,
        _selectIdx:null,

        _fun:null,
        _target:null,

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.setBlackGroud();
        console.log('mail list  onLoad');
        this._mailList = this.node.getChildByName('scrollview');
        var view = this._mailList.getChildByName('view');
        this._listcontent = view.getChildByName('content');


    },

    start () {
        this._avatars= [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
        this.updataList();
    },


    setData(data){
        console.log("======>avatarList");
        this._conf = data;
        this._selectIdx = data.idx;
        this._fun = data.fun;
        this._target = data.target;

    },

    updataList(){
        this.cleanList();
        for(var i=0;i<this._avatars.length;i++){
            var item = cc.instantiate(this.itemPrefab);
            var itemJs = item.getComponent('avataritem');
            itemJs.setData(this._avatars[i]);
            itemJs.setCallBack(this.onItem, this);
            this._listcontent.addChild(item);
        }
    },


    onItem(idx){
        console.log('  idx: ',idx);
        this._selectIdx = idx;
    },


    cleanList(){
        if(this._listcontent){
            var children = this._listcontent.children;
            var num = children.length;
            console.log('  avatarList num:', num);
            for(var i=num-1;i>=0;i--){
                children[i].destroy();
            }
            
        }
    },

    onCallBack(data){
        if(this._fun)
            this._fun.call(this._target, data);
    },

    onCloseBtn(){
        console.log('  mail onCloseBtn');
        if(this._selectIdx != this._conf.idx){
            this.onCallBack(this._selectIdx);
        }
        this.cleanList();

        if(this._conf.closeCallback){
            this._conf.closeCallback.apply(this._conf.closeCallbackObj, [this.node]);
        }

        this.node.destroy();
    }
    // update (dt) {},
});
