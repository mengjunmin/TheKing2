//存放常量数据


module.exports = {
    startApp    :   "startapp",
    AccountKey : "useraccount",
    serverAddress : "http://59.110.138.129:112",

    RoleStatus:{
        Expired:-10,//已过期
        NotUsed:0,//未使用
        NotActive:10,//未激活
        AlreadyActivated:100,//已激活

        Applying:1,//申请中
        ApplySuccess:2,//申请成功
        ApplyFail:3,//申请失败
    },

};