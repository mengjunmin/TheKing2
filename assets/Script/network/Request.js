
/*
 （1）0：请求没有发出，在调用open()函数之前为该状态
 （2）1：请求已经建立但还没有发出，在调用send()函数之前为该状态
 （3）2：请求已经发出正在处理中
 （4）3：请求已经处理，响应中通常有部分数据可用，但是服务器还没有完成响应
 （5）4：响应已经完成，可以访问服务器响应并使用它
 代码第8行中xhr.status==200判断HTTP状态码。常见的HTTP状态码如下：
 （1）401：表示所访问数据禁止访问
 （2）403：表示所访问数据收到保护
 （3）404：表示错误的URL请求，表示请求的服务器资源不存在
 （4）200：表示一切顺利
*/

//var testurl = "http://httpbin.org/post";
//var serverAddress = "http://192.168.0.14:3000/up";

var MessageCenter = require('../Signal/MessageCenter');

var HttpMethod_GET = "GET";
var HttpMethod_POST = "POST";

var responsetest = "";
var MAX_RETRY = 0;

var ErrorCode = {
    JSON_PARSE_ERROR    :   0,
    IO_ERROR            :   1,
};

var RequestData = cc.Class({
    //***********variables*************
     type:null,//string;
     url:null,//string;
     callback:null,//Function;
     context:null,//any;
     msg:null,//any;
     isHideLoading:null,//boolean;


    ctor(type, url, callback, context, msg, isHideLoading) {
        this.url = url ;
        this.type = type;
        this.callback = callback;
        this.context = context;
        this.msg = msg;
        this.isHideLoading = (isHideLoading || false);
    }
});



var RequestNet = cc.Class({
    queue:null,//RequestData[] = [];
    current:null,//RequestData;
    loader:null,//EgretRequestWrapper;
    lastReq:null,//RequestData;



    ctor() {
        this.queue = [];
        this.current = null;//RequestData;
        this.loader = null;//EgretRequestWrapper;
        this.lastReq = null;//RequestData;
    },

    Get(url, callback, context, isHideLoading) {
        cc.log('----->Get: ', HttpMethod_GET);
        this.addQueue(HttpMethod_GET, url, callback, context, null, isHideLoading);
    },

    Post(url, callback, context, message, isHideLoading) {
        this.addQueue(HttpMethod_POST, url, callback, context, message, isHideLoading);
    },

    addQueue(type, url, callback, context, message, isHideLoading) {
        var data = new RequestData(type, url, callback, context, message, isHideLoading);
        cc.log('----->addQueue   data: ', data);
        this.queue.push(data);
        this.next();
    },

    clearQueue() {
        this.queue = [];
        this.current = null;
    },

    retry() {
        if (!this.lastReq || !this.loader || this.loader.isSending()) return;
        this.queue.unshift(this.lastReq);
        this.next();
    },

    next() {
        if (this.loader && this.loader.isSending()) return;
        if (this.current) return;

        if (!this.loader) {
            this.loader = new RequestWrapper(this.onComplete, this);
        }
        if (this.queue && this.queue.length) {
            this.current = this.queue.shift();
        }
        if (this.current) {
            this.loader.setData(this.current);
        }
    },
    onComplete(data){
        var reqData = this.current;
        this.current = null;
        this.lastReq = reqData;
        if (!!data && !!reqData && reqData.callback) {
            reqData.callback.apply(reqData.context, [data]);
        }
    }


});



var RequestWrapper = cc.Class({

    _data:null,//RequestData;
    _req:null,//egret.HttpRequest;
    _timeoutId:null,//number = -1;
    _retry:null,//number = 0;

    _onComplete:null,//Function;
    _context:null,//any;


    ctor (nCompleteCallBack, context) {
        this._data=null;//RequestData;
        this._req = null;//egret.HttpRequest;
        this._timeoutId = -1;
        this._retry = 0;


        this._onComplete = nCompleteCallBack;
        this._context = context;
    },

    setData(data) {
        this._data = data;
        this._retry = 0;
        this.send();
    },

    getData() {
        return this._data;
    },

    isSending() {
        return (this._req != null);
    },

    send() {
        if (this.isSending()) return;

        this.lockScreen();
        this.genRequest();

        var data;
        if (typeof this._data.msg == "object") {
            data = JSON.stringify(this._data.msg);
            console.log(data);
        } else {
            data = this._data.msg;
        }

        cc.log(" <-- url :", this._data.url);
        cc.log(" <-- req :", data);

        this._req.send(data);

        // this.waitForTimeout();
    },

    genRequest() {
        var self = this;
        var xhr = cc.loader.getXMLHttpRequest();
        //xhr.responseType = cc.XMLHTTPREQUEST_RESPONSE_STRING
        //if (PPTacticsGame.isLocalhost) {
        //    xhr.withCredentials = true;
        //}

        xhr.open(this._data.type, this._data.url);
        xhr.setRequestHeader("Content-Type","text/json;charset=UTF-8"); // 目前固定
        // xhr.addEventListener(egret.Event.COMPLETE, this.onComplete, this);
        // xhr.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onError, this);
//
        xhr.timeout = 9000;

        xhr["onloadstart"] = function () {
            console.log("==onloadstart==");
        };
        xhr["onabort"] = function () {
            console.log("==onabort==");
        };
        xhr["onerror"] = function () {
            console.log("==onerror==");
            self.onError();
        };
        xhr["onload"] = function () {
            console.log("==onload==");
        };
        xhr["onloadend"] = function () {
            console.log("==onloadend==");
        };
        xhr["ontimeout"] = function () {
            console.log("==ontimeout==");
            self.retry();
        };
        xhr["onprogress"] = function () {
            console.log("==onprogress==");
        };
        // Special event
        responsetest = "";

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status <= 207)) {
                var httpStatus = xhr.statusText;
                var response = xhr.responseText.substring(0, 100) + "...";
                responsetest += response;
                console.log("responsetest:" + responsetest);
                console.log("httpStatus:" + httpStatus);
                console.log(self._data.type + " Response (100 chars):\n");
                self.onComplete(xhr);
            }
        };

        //
        this._req = xhr;
    },

    onComplete(Event) {
        var data = this._req.response;
        console.log(Event);
        // egret.log('[Request]', this._req.getAllResponseHeaders());
        try {
            data = JSON.parse(data);
        } catch (e) {
            data = {error:ErrorCode.JSON_PARSE_ERROR, data:data};
        }
        console.log(" --> res :", this._req.response);

        // this.releaseTimeout();
        this.releaseRequest();
        this.releaseLockScreen();

        if (this._onComplete) this._onComplete.apply(this._context, [data]);
    },

    onError(Event) {
        cc.log(" <-- err :", 'IOError');
        this.releaseLockScreen();
        this.retry();
    },

    waitForTimeout() {
        var self = this;
        this._timeoutId = setTimeout(function () {
           self.retry();
        }, 15000);

        //this.scheduleOnce(this.tick, 5.0);
    },

    tick(){
        this.retry();
        console.log(" time out 5s");

    },

    retry() {
        console.log(" this._retry:",this._retry);
        this._retry ++;

        // this.releaseTimeout();

        if (this._req) {
            this._req.abort();
            this.releaseRequest();
        }

        if (this._retry > MAX_RETRY) {
            this._retry = 0;
            // 网络出错重刷
            this.onRefresh();
        } else {
            this.send();
        }
    },


    onRefresh() {
        this.releaseLockScreen();
        if (this._onComplete) {
            this._onComplete.apply(this._context, [{error:ErrorCode.IO_ERROR}]);
        }
    },

    releaseTimeout() {
        if (this._timeoutId != -1) {
            clearTimeout(this._timeoutId);
            this._timeoutId = -1;
        }
    },

    releaseRequest() {
        if (this._req) {
            //this._req.removeEventListener(egret.Event.COMPLETE, this.onComplete, this);
            //this._req.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onError, this);
            this._req = null;
        }
    },

    lockScreen() {
        // 锁屏
        if (!this._data.isHideLoading) {
            //game.GameEvent.LOCK_SCREEN.dispatch(true);
            MessageCenter.LOCKSCREEN.emit(true);
        }
    },

    releaseLockScreen() {
        // 取消锁屏
        if (!this._data.isHideLoading) {
            //game.GameEvent.LOCK_SCREEN.dispatch(false);
            MessageCenter.LOCKSCREEN.emit(false);
        }
    }

});

var Request = new RequestNet();

module.exports = Request;



