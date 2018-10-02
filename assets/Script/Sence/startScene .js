var global = require('../mode/Global');
var Utils = require("../mode/Utils");
var popupManager = require("../unit/popupManager");
var fileManager = require("../mode/fileManager");
var userMode = require("../mode/userMode");
var MessageCenter = require("../Signal/MessageCenter");


cc.Class({
    extends: cc.Component,

    name:'startSence',
    properties: {


    },


    onLoad() {


    },


    start() {
        var self = this;
        cc.log('----->start');
        MessageCenter.GAME.on(this.onEventBack, this);
        userMode.getInstance();
        // this.scheduleOnce(function () {
        //     // 这里的 this 指向 component
        //     MessageCenter.GAME.emit({1:2});
        //     self.readData();
        // }, 2);

        this.loadRes();
    },

    loadRes(){
        var self = this;
        cc.director.preloadScene("mainScene", function () {
            cc.log("mainScene  preloaded");
            self.readData();
        });
    },

    readData() {
        cc.log('----->readData');
        var value = fileManager.getInstance().readStartApp();
        cc.log('----->value: ', value);
        if (value == 1) {
            cc.director.loadScene('Login');
        } else {
            cc.director.loadScene('Register');
        }
    },

    onEventBack(data){
        cc.log('----->onEventBack: ', data);
    },
    // update (dt) {},




    downFile2Local:function(url, fileName, callback){
        var fullPath = jsb.fileUtils.getWritablePath() + fileName
        showModelLoadingDialog();//显示加载中模态框
        var downloader = new jsb.Downloader();
        downloader.setOnFileTaskSuccess(function(){        
            removeModelLoadingDialog();//删除加载中模态框
            if(callback){
                callback(fullPath);
            }
        });
        downloader.setOnTaskError(function(){        
            removeModelLoadingDialog();
            showTips("文件下载失败！！！");
        });
        downloader.createDownloadFileTask(url, fullPath);//创建下载任务
    },

    loadNative : function(url, callback){
        var dirpath =  jsb.fileUtils.getWritablePath() + 'img/';
        var filepath = dirpath + MD5(url) + '.png';
    
        function loadEnd(){
            cc.loader.load(filepath, function(err, tex){
                if( err ){
                    cc.error(err);
                }else{
                    var spriteFrame = new cc.SpriteFrame(tex);
                    if( spriteFrame ){
                        spriteFrame.retain();
                        callback(spriteFrame);
                    }
                }
            });
    
        }
    
        if( jsb.fileUtils.isFileExist(filepath) ){
            cc.log('Remote is find' + filepath);
            loadEnd();
            return;
        }
    
        var saveFile = function(data){
            if( typeof data !== 'undefined' ){
                if( !jsb.fileUtils.isDirectoryExist(dirpath) ){
                    jsb.fileUtils.createDirectory(dirpath);
                }
    
                if( jsb.fileUtils.writeDataToFile(  new Uint8Array(data) , filepath) ){
                    cc.log('Remote write file succeed.');
                    loadEnd();
                }else{
                    cc.log('Remote write file failed.');
                }
            }else{
                cc.log('Remote download file failed.');
            }
        };
        
        var xhr = new XMLHttpRequest();
    
        xhr.onreadystatechange = function () {
            cc.log("xhr.readyState  " +xhr.readyState);
            cc.log("xhr.status  " +xhr.status);
            if (xhr.readyState === 4 ) {
                if(xhr.status === 200){
                    xhr.responseType = 'arraybuffer';
                    saveFile(xhr.response);
                }else{
                    saveFile(null);
                }
            }
        }.bind(this);
        xhr.open("GET", url, true);
        xhr.send();
    },
    


});