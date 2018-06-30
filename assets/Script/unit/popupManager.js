

var Request = require("../network/Request");
var allDefine = require("./AllDefine");

var _sence = null;
var _layer = null;
var _allPopup = [];

var popupManager = {
    // 成员变量


    init(sence) {
        _sence = sence;
         _layer = sence.popupNode;
         _allPopup = [];
    },



    create:function(name, context) {
        var self = this;
        var newpopup=null;

        var closeBack = function(...args){
            // cc.log('---->closeBack:', this);
            // cc.log('---->args:', args);
            // if(context.closeCallback){
            //     context.closeCallback.apply(context.closeCallbackObj, [9]);
            // }
            this.remove(args[0]);
        };

        var mastconf = {
            closeCallback: closeBack,       // 取消按钮的回调方法
            closeCallbackObj: popupManager,     // 取消按钮的回调this
        };

        var conf = {};
        if(name == 'mail'){
            newpopup = cc.instantiate(_sence.mailPrefab);
            var popupJs = newpopup.getComponent('mail');

        }else if(name == 'shop'){
            newpopup = cc.instantiate(_sence.shopPrefab);
            var popupJs = newpopup.getComponent('shop');

        }else if(name == 'historyscore'){
            newpopup = cc.instantiate(_sence.historyScorePrefab);
            var popupJs = newpopup.getComponent('historyScore');

        }else if(name == 'myreward'){
            newpopup = cc.instantiate(_sence.myRewardPrefab);
            var popupJs = newpopup.getComponent('myReward');

        }else if(name == 'mycard'){
            newpopup = cc.instantiate(_sence.myCardPrefab);
            var popupJs = newpopup.getComponent('myCard');
            
        }else if(name == 'note'){
            newpopup = cc.instantiate(_sence.notePrefab);
            var popupJs = newpopup.getComponent('note');
            conf = {
                title:'null',
                content:'12345678890',
                cancelCallback: function(){
                    cc.log('---->note  cancelCallback: ');
                },      // 取消
                cancelCallbackObj: null,   // 取消
                okCallback: null,      // 确定
                okCallbackObj: null,   // 确定
            };
            
        }



        if(newpopup){
            for(var key in mastconf){
                conf[key] = mastconf[key];
            }
            popupJs.setData(conf);

            _layer.addChild(newpopup);
            _allPopup.push(newpopup);
        }

        return newpopup;
    },

    remove:function(popup){
        var self = this;
        for(var i=0;i<_allPopup.length;i++){
            if(_allPopup[i] == popup){
                _allPopup.splice(i,1);
                cc.log('---->popupManager  remove: ', i);
                cc.log('---->popupManager  _allPopup: ', _allPopup);
                break;
            }
        }

    },

    clearAll:function(){
        var self = this;
        for(var i=0;i<_allPopup.length;i++){
            _allPopup[i].destroy();
        }
        _allPopup = [];
    },

};


module.exports = popupManager;