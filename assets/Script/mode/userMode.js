var FileManager = require("./fileManager");

var userMode = cc.Class({
    // 成员变量
    userAcount:null,
    name : "",
    age : 0,
    uid : 0,
    token : '',
    phone : 0,

    allName:null,


    ctor () {
        this.name = "Leovany";
        this.age = 20;
        this.userAcount = {};
        this.phone = 0;
        this.allName = {};
    },



    getUserAccount(){
        var data = FileManager.getInstance.readUserAcount(this.phone);
        console.log('----->getUserAccount: ', data);
        return data;
    },

    //data从网上获取phone对应的账户名。
    setUserAccount(data){
        /*
        data = {
            phone:123,
            list:[
                {name:'', invite:''}
            ],
        }
        */

        this.userAcount = data;

        var data = FileManager.getInstance.readUserAcount(this.phone);
    },




});

userMode._instance = null;
userMode.getInstance = function () {
    if(!userMode._instance){
        userMode._instance = new userMode();
    }
    return userMode._instance;
}

module.exports = userMode;