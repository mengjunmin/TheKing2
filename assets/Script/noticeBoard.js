var basePopup = require("./basePopup");
/*
*参数：
*{
    title：’‘，
    content：’‘，
}
*
*/

cc.Class({
    extends: basePopup,

    properties: {
        closeBtn:{
            default:null,
            type:cc.Button
        },

        title :{
            default:null,
            type:cc.Label,
        },
        text :{
            default:null,
            type:cc.Label,
        },

        _list:null,
        _listcontent:null,
        _data:null,


    },

    // LIFE-CYCLE CALLBACKS:
    ctor:function () {
        console.log('----->noticeBoard  ctor');
         var self = this;
        
    },

    onLoad () {
        this.setBlackGroud();
        
        this._list = this.node.getChildByName('scrollview');
        var view = this._list.getChildByName('view');
        this._listcontent = view.getChildByName('content');

    },

    setData(data){
        this._conf = data;
        
    },

    start () {
        this.updataView();
    },

    updataView(){
        this.title.string = this._conf['title'] || '';
        this.text.string = this._conf['content'] || '';
    },

    onCloseBtn(){
        console.log('   onCloseBtn');
        if(this._conf.closeCallback){
            this._conf.closeCallback.apply(this._conf.closeCallbackObj, [this.node]);
        }

        this.node.destroy();
    }
    // update (dt) {},
});
