

var Request = require("../network/Request");
var allDefine = require("../mode/AllDefine");

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



    create:function(name, context=null) {
        var self = this;
        var newpopup=null;
        if(!_sence&&!_layer){
            cc.log('---->_sence==null   _layer==null');
            return;
        }

        if(!context){
            context = {};
        }
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
            newpopup = cc.instantiate(_sence.notePrefab);//通用提示框
            var popupJs = newpopup.getComponent('note');  
        }else if(name == 'noticeBoard'){
            newpopup = cc.instantiate(_sence.noticeBoardPrefab);//纯文本弹框
            var popupJs = newpopup.getComponent('noticeBoard');  
        }else if(name == 'noticeBoardUrl'){
            newpopup = cc.instantiate(_sence.noticeBoardUrlPrefab);//网页弹框
            var popupJs = newpopup.getComponent('noticeBoardUrl');  
        }else if(name == 'avatarlist'){
            newpopup = cc.instantiate(_sence.avatarlistPrefab);
            var popupJs = newpopup.getComponent('avatarList');  
        }else if(name == 'namelist'){
            newpopup = cc.instantiate(_sence.nameListPrefab);
            var popupJs = newpopup.getComponent('nameList');  
        }else if(name == 'noticePic'){//图片弹框
            newpopup = cc.instantiate(_sence.noticePicPrefab);
            var popupJs = newpopup.getComponent('noticePic'); 
        }else if(name == 'Toaster'){
            newpopup = cc.instantiate(_sence.toasterPrefab);
            var popupJs = newpopup.getComponent('Toaster'); 
        }else if(name == 'jewelShop'){
            newpopup = cc.instantiate(_sence.jewelShopPrefab);
            var popupJs = newpopup.getComponent('jewelShop'); 
            cc.log('---->jewelShop  ', popupJs);
        }

        
        conf = context;
        if(newpopup){//注册默认的关闭回调
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