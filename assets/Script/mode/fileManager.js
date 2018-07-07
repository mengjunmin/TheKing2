
var AllDefine = require("./AllDefine");

var fileManager = cc.Class({
    // 成员变量
    name : "",
    age : 0,

    ctor () {
        this.name = "Leovany";
        this.age = 20;
    },
//基础代码
    readData(key){
        var data = cc.sys.localStorage.getItem(key);
        return data;
    },

    saveData(key, value){
        cc.sys.localStorage.setItem(key, value);
    },

    readDataJson(key){
        var data = JSON.parse(cc.sys.localStorage.getItem(key));
        return data;
    },

    saveDataJson(key, object){
        cc.sys.localStorage.setItem(key, JSON.stringify(object));
    },

    dellData(key){
        cc.sys.localStorage.removeItem(key);
    },

    /*
加密保存
var encrypt=require('encryptjs');
var secretkey= 'open_sesame'; // 加密密钥

var dataString = JSON.stringify(userData);
var encrypted = encrypt.encrypt(dataString,secretkey,256);

cc.sys.localStorage.setItem('userData', encrypted);

读取时：

var cipherText = cc.sys.localStorage.getItem('userData');
var userData=JSON.parse(encrypt.decrypt(cipherText,secretkey,256));

    */

    //项目代码

    /*
    {
        phone:{"name":123, "name":345}
    }
    */
    readUserAcount(phone){
        var key = ''+phone;
        var data = this.readDataJson(key);
        return data;
    },
//必须是object对象，{aa:12}
    saveUserAcount(phone, data){
        var key = ''+phone;
        this.saveDataJson(phone, data);
    },

    readStartApp(){
        var value = this.readData(AllDefine.startApp);
        return value;
    },
    saveStartApp(){
        this.saveData(AllDefine.startApp,1);
    },


});

fileManager._instance = null;
fileManager.getInstance = function () {
    if(!fileManager._instance){
        fileManager._instance = new fileManager();
    }
    return fileManager._instance;
}

module.exports = fileManager;



