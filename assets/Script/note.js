var basePopup = require("./basePopup");


    // CONF:{
    //     title:null,
    //     content:null,
    //     okLabel:null,
    //     cancelLabel:null,
    //     cancelCallback: null,      // 取消
    //     cancelCallbackObj: null,   // 取消
    //     okCallback: null,      // 确定
    //     okCallbackObj: null,   // 确定
    //     closeCallback: null,       // 取消按钮的回调方法
    //     closeCallbackObj: null,     // 取消按钮的回调this
    // },

cc.Class({
    extends: basePopup,

    properties: {
        closeBtn:{
            default:null,
            type:cc.Button
        },
        cancelBtn:{
            default:null,
            type:cc.Button
        },
        okBtn:{
            default:null,
            type:cc.Button
        },

        textcontent:{
            default:null,
            type:cc.Label
        },
        title:{
            default:null,
            type:cc.Label
        }

    },



    onLoad () {
        this.setBlackGroud();
    },

    start () {

    },

    setData(data){
        this._conf = data;
        console.log('  note setData: ', this._conf);
        this.updataView();
    },
 

    updataView(){
        var vs = cc.director.getVisibleSize();	
        this.title.string = this._conf['title'] || '';
        this.textcontent.string = this._conf['content'] || '';


        this.okBtn.node.active = this._conf['okCallback']?this._conf['okCallback']:false;
        this.cancelBtn.node.active = this._conf['cancelCallback']?this._conf['cancelCallback']:false;

        // if(this._conf['cancelCallback']){
        //     this.cancelBtn.node.active = true;
        //     console.log('this.cancelBtn.node.active: ', this.cancelBtn.node.active);
        // }

        if(this._conf['cancelLabel']){
            var lable = this.cancelBtn.getChildByName('Label');
            lable.string = this._conf['cancelLabel'];
            //
        }

        if(this._conf['okLabel']){
            var lable = this.okBtn.getChildByName('Label');
            lable.string = this._conf['okLabel'];
        }
 

        if(this._conf['okCallback'] && this._conf['cancelCallback']){
            this.okBtn.node.x = vs.width/4 ;
            this.cancelBtn.node.x = -(vs.width/4);
            console.log('this.okBtn.x: ', this.okBtn.x);
            console.log('this.cancelBtn.x: ', this.cancelBtn.x);
        }else if(this._conf['okCallback']){
            this.okBtn.node.x = 0;
            console.log('this.okBtn.x: ', this.okBtn.node.x);
        }else if(this._conf['cancelCallback']){
            this.cancelBtn.node.x = 0;
            console.log('this.cancelBtn.x: ', this.cancelBtn.node.x);
        }

    },



    onOkBtn(){
        console.log('  mail onCloseBtn');
        if(this._conf.okCallback){
            this._conf.okCallback.apply(this._conf.okCallbackObj, []);
        }

        this.onCloseBtn();
    },

    onCancelBtn(){
        console.log('  mail onCloseBtn');
        if(this._conf.cancelCallback){
            this._conf.cancelCallback.apply(this._conf.cancelCallbackObj, []);
        }

        this.onCloseBtn();
    },

    onCloseBtn(){
        console.log('  mail onCloseBtn');
        if(this._conf.closeCallback){
            this._conf.closeCallback.apply(this._conf.closeCallbackObj, [this.node]);
        }

        this.node.destroy();
    }
    // update (dt) {},
});
