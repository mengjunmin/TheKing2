var fileManager = require("./fileManager");



var userData = {
};

var userMode = cc.Class({
    // 成员变量
    userAcount: null,
    name: "userMode",

    user: null,
    allName: null,
    familyTreeName: null,
    showLayer: null,
    timespan: null,

    ctor() {
        console.log('[userMode]  ctor');
        this.user = userData;
        this.showLayer = '';
        this.userAcount = {};
        this.allName = {};
        this.familyTreeName = null;
        this.timespan = 0;
        console.log('[userMode]   this.user: ', this.user);
    },


    getServerTime: function () {//getServerDate
        var date = new Date();
        var time = date.getTime();
        return time + this.timespan;
    },

    getUserAccount() {
        var data = fileManager.getInstance.readUserAcount(this.phone);
        console.log('----->getUserAccount: ', data);
        return data;
    },

    //data从网上获取phone对应的账户名。
    setUserAccount(data) {
        /*
        data = {
            phone:123,
            list:[
                {name:'', invite:''}
            ],
        }
        */

        this.userAcount = data;

        var data = fileManager.getInstance.readUserAcount(this.phone);
    },

    updataUser(data) {
        var user = data;
        for (var key in user) {
            this.user[key] = user[key];
        }
        this.user['uid'] = user['_id'];
    },


    getIsSavePassWord() {
        var key = 'isSavePassWord';
        var value = fileManager.getInstance().readData(key);
        return value;
    },
    setIsSavePassWord(issave) {
        var key = 'isSavePassWord';
        var value = issave;
        fileManager.getInstance().saveData(key, value);
    },
    getLoginPassWord(phone) {
        var key = '' + phone;
        var value = fileManager.getInstance().readData(key);
        return value;
    },
    saveLoginPassWord(phone, password) {
        var key = '' + phone;
        var value = password;
        fileManager.getInstance().saveData(key, value);
    },
    getLastPhone() {
        var key = 'lastphone';
        var value = fileManager.getInstance().readData(key);
        return value;
    },
    saveLastPhone(phone) {
        var key = 'lastphone';
        var value = phone;
        fileManager.getInstance().saveData(key, value);
    },



});

userMode._instance = null;
userMode.getInstance = function () {
    if (!userMode._instance) {
        userMode._instance = new userMode();
    }
    return userMode._instance;
}

module.exports = userMode;