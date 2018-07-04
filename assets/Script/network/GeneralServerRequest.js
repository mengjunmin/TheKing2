
var Request = require("./Request");
var allDefine = require("./AllDefine");
var popupManager = require("../unit/popupManager");


 var   serverTime  =   0;  //服务器时间
 var   lasetServerTimeUpdateTime   =   0;  //上一次更新服务器时间的时间
 var   hackedServerTime = 0;  //通过admin修改过的服务器时间


 var ErrorCode = {
    INTERNAL_SERVER_ERROR:1,
    INVALID_REQUEST_PARAMS:2,
    ACTIVITY_NOT_OPEN:3, //活动尚未开启
    ACTIVITY_END:4, //活动结束
    IO_ERROR:7,
    JSON_PARSE_ERROR:8,
    TOKEN_ERROR:10,
    BAG_FULL:11,//up背包满了
    EXPLOIT_NOT_ENOUGH:12,//功勋值不够
    BLACKCARD:1001,//黑卡盗刷
};


var GeneralServerRequest = cc.Class({

    ctor() {

    },
        /*
        * 获取当前服务器时间
        * */
    getServerTime() {
        // 如果修改过服务器时间,返回修改过的时间
        if (hackedServerTime) {
            return hackedServerTime + egret.getTimer();
        }
        return serverTime + egret.getTimer() - lasetServerTimeUpdateTime;
    },

        /*
        * 处理接口请求,通用的逻辑可以走这个,不通用的单写去吧.
        * */
       preq(router, data, resultMethod, url, isHideLoading, isPost) {

        if (!url) {
            url = allDefine.serverAddress + router;
        } else {
            url = url + router;
        }

        var resultHandler = new RequestResultHandler(resultMethod);

        var resultFun = function (result) {
            if (result.error) {
                resultHandler.onFail(result, result.error);
            } else {
                // 修改过的服务器时间
                if (result.hackServerTime){
                    GeneralServerRequest.hackedServerTime = result.hackServerTime;
                }
                // 同步服务器时间
                if (result.serverTime) {
                    GeneralServerRequest.serverTime = result.serverTime;
                    GeneralServerRequest.lasetServerTimeUpdateTime = egret.getTimer();
                   
                }

                resultHandler.onSuccess(result);
            }

        };
        if(isPost){
            Request.Post(url, resultFun, this, data, isHideLoading);
        }else{
            url = url + '?';
            for(var key in data){
                url  += '&';
                url += (key + '=' + data[key]);
            }
            Request.Get(url, resultFun, this, isHideLoading);
        }
        
    },




});


var RequestResultMethod = cc.Class({
    context:null,
    ctor() {

    },
    onSuccess(result){

    },
    onFail (result, errorCode){

    },
});



var RequestResultHandler = cc.Class({
        method:null,//RequestResultMethod

        ctor(method) {
            this.method = method;
        },

        onSuccess(result) {
            this.method.onSuccess.apply(this.method.context, [result]);
            // 发送队列中的下一个请求
            Request.next();
        },

        onFail(result, errorCode) {
            var self = this;
            var notifyCb = function(hasAction) {
                self.method.onFail.apply(self.method.context, [result, errorCode]);
            };

            ErrorAction.notifyError(result.error, notifyCb);
        },
    });



    var ErrorActionMap = {};
    var ErrorAction =  {
        initActionMap() {
            var map = {};
            map[ErrorCode.INTERNAL_SERVER_ERROR] = {
                msg: ('內部伺服器錯誤'),
                onConfirm: null,
                onCancel: null
            };
            map[ErrorCode.INVALID_REQUEST_PARAMS] = {
                msg: ('非法參數'),
                onConfirm: null,
                onCancel: null
            };
            map[ErrorCode.IO_ERROR] = {
                msg: ('網路異常，請點擊確定按鈕重試'),
                onConfirm: ErrorAction.retry,
                onCancel: ErrorAction.clearQueue
            };
            map[ErrorCode.BLACKCARD] = {
                msg: ('使用者資訊異常，登錄失敗。'),
                onConfirm: ErrorAction.onCloseWindow,
                onCancel: ErrorAction.onCloseWindow
            };
            ErrorActionMap = map;
        },

        onCloseWindow(){
            // UpSDKModel.Ins.closeWindow();
            cc.log('<onCloseWindow>');
        },

        reload() {
            // PPGame.Ins.reload();
            cc.log('<reload>');
        },

        retry() {
            Request.retry();
            cc.log('<retry>');
        },

        clearQueue() {
            Request.clearQueue();
        },

        notifyError(code, cb) {
            var self = this;
            var actionHandler = ErrorActionMap[code];
            cc.log('[ErrorAction] notifyError  ErrorActionMap:', ErrorActionMap);
            cc.log('[ErrorAction] notifyError  code:', code);
            cc.log('[ErrorAction] notifyError  actionHandler:', actionHandler);
            if (actionHandler) {
                var confirmCallback = function () {
                    if (actionHandler.onConfirm) {
                        actionHandler.onConfirm();
                    }
                    return cb(true);
                };
                var cancelCallback = function () {
                    if (actionHandler.onCancel) {
                        actionHandler.onCancel();
                    }
                    return cb(true);
                };

                var CONF = {
                    title:'1234',
                    content:actionHandler.msg,
                    okLabel:null,
                    cancelLabel:null,
                    cancelCallback: cancelCallback,      // 取消
                    cancelCallbackObj: self,   // 取消
                    okCallback: confirmCallback,      // 确定
                    okCallbackObj: self,   // 确定
                };
                popupManager.create('note', CONF);

            } else {
                return cb(false);
            }
        },

        notifyProtoError(code, msg, cb) {
            var self = this;
            var closeCallback = function () {
                return cb(true);
            };


            var CONF = {
                title:'1234',
                content:code + ':' + msg,
                okLabel:null,
                cancelLabel:null,
                cancelCallback: closeCallback,      // 取消
                cancelCallbackObj: self,   // 取消
                okCallback: closeCallback,      // 确定
                okCallbackObj: self,   // 确定
            };
            popupManager.create('note', CONF);
        }
    };

    ErrorAction.initActionMap();

var GeneralServerRequest = new GeneralServerRequest();

module.exports = GeneralServerRequest;