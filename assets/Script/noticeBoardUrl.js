var basePopup = require("./basePopup");

/*
*参数：
*{
    title：’‘，
    url：’‘，
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
        webview :{
            default:null,
            type:cc.WebView,
        },

        _data:null,


    },

    // LIFE-CYCLE CALLBACKS:
    ctor:function () {
        console.log('----->noticeBoardUrl  ctor');
         var self = this;
        
    },

    onLoad () {
        this.setBlackGroud();
    

    },

    setData(data){
        this._conf = data;
        
    },

    start () {
        this.updataView();
    },

    updataView(){
        this.title.string = this._conf['title'] || '';
        this.webview.url = this._conf['url'] || '';
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
