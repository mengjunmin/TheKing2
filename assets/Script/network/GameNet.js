
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


/*
、、跨域访问图片
var self = this;
var url = "xxxxxx";
cc.loader.loadImg(url, {isCrossOrigin : true }, function(err,img){
    var logo  = new cc.Sprite(img);
     self.addChild(logo);
});

*/



var _GameNet = cc.Class({
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



    Req(pro, message, callback, context, isHideLoading) {

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





var GameNet = new _GameNet();
