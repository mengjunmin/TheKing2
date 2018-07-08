var FileManager = require("./fileManager");



var userData = {
    nick:'',
    age : 0,
    uid : 0,
    t : '',
    phone : 0,
    sex: 0,
    face_id:0,
    frame:0,
    password:0,
};

var userMode = cc.Class({
    // 成员变量
    userAcount:null,
    name : "userMode",
  
    user:null,
    allName:null,
    familyTreeName:null,

    ctor () {
        console.log('[userMode]  ctor');
        this.user = userData;

        this.userAcount = {};
        this.allName = {};
        this.familyTreeName = null;
        console.log('[userMode]   this.user: ',this.user);
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

    updataUser(data){
        for(var key in data){
            this.user[key] = data[key];
        }
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