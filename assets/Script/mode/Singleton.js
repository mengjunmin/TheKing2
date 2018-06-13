


var Singleton = cc.Class({
    // 成员变量
    name : "",
    age : 0,

    ctor () {
        this.name = "Leovany";
        this.age = 20;
    },


    printInfo(){
        cc.warn("name = " + this.name+",age = " + this.age);
    }
});

Singleton._instance = null;
Singleton.getInstance = function () {
    if(!Singleton._instance){
        Singleton._instance = new Singleton();
    }
    return Singleton._instance;
}

module.exports = Singleton;