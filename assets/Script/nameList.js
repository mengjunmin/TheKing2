var basePopup = require("./basePopup");


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
        _List:null,
        _listcontent:null,
        _data:null,
        _fun:null,
        _target:null,

    },

    // LIFE-CYCLE CALLBACKS:
    ctor:function () {
        console.log('----->nameList  ctor');
         var self = this;
        
    }, 
    onLoad () {
        this.setBlackGroud();
        this._List = this.node.getChildByName('scrollview');
        var view = this._List.getChildByName('view');
        this._listcontent = view.getChildByName('content');

    },

    setData(data){
        this._conf = data;
        this._data = this._conf.data;
        this._fun = data.fun;
        this._target = data.target;
        cc.log('namelist  setData: ', data);
    },

    start () {
        this.updataList();
    },

    updataList(){
        this.cleanList();
        if(!this._data){
            return;
        }
        for(var i=0;i<this._data.length;i++){
            var item = cc.instantiate(this.itemPrefab);
            var itemJs = item.getComponent('nameitem');
            itemJs.setData(this._data[i]);
            itemJs.registerEvent(this.onTouchNameItem, this);
            this._listcontent.addChild(item);
        }

    },

    onTouchNameItem(arg){
        cc.log('[namelist]  arguments: ', arg);
        this.onCallBack(arg);
        this.onCloseBtn();
    },

    cleanList(){
        if(this._listcontent){
            this._listcontent.removeAllChildren();
        }
    },

    onCallBack(data){
        if(this._fun)
            this._fun.call(this._target, data);
    },

    onCloseBtn(){
        if(this._conf.closeCallback){
            this._conf.closeCallback.apply(this._conf.closeCallbackObj, [this.node]);
        }

        this.cleanList();
        this.node.destroy();
    }
    // update (dt) {},
});
