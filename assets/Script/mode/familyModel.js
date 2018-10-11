var Request = require("../network/Request");
var allDefine = require("./AllDefine");
var GeneralServerRequest = require("../network/GeneralServerRequest");
var popupManager = require("../unit/popupManager");
var userMode = require("./userMode");


var familyModel = cc.Class({
    // 成员变量

    ctor() {
        console.log('--->familyModel ctor');

    },

    repFamilyTree(argu, callback, context) {
        var self = this;
        console.log("----->repFamilyTree");
        var params = {
            invite: argu.invite,
            token: argu.token,
            deep: argu.deep,//-1，1
        };

        var router = '/gapi/family/tree';
        var requestResultMethod = {
            context: this,
            onSuccess: function (result) {
                console.log("----->repFamilyTree  onSuccess: ", result);
                if (callback) callback.apply(context, [result]);
            },
            onFail: function (result, errorCode) {
                console.log("----->repFamilyTree  onFail: ", result, errorCode);

            }
        };

        GeneralServerRequest.preq(router, params, requestResultMethod, null, false, false);

    },



    /*
    *邀请码列表
    */
    repInviteList(argu, callback, context) {
        var self = this;
        var params = {
            invite: argu.invite,
            token: argu.token,
        };

        var router = '/gapi/invite/list';
        var requestResultMethod = {
            context: this,
            onSuccess: function (result) {
                console.log("----->repInviteList  onSuccess: ", result);
                if (callback) callback.apply(context, [result]);
            },
            onFail: function (result, errorCode) {
                console.log("----->repInviteList  onFail: ", result, errorCode);

            }
        };

        GeneralServerRequest.preq(router, params, requestResultMethod, null, false, false);

    },


    /*
    *活跃度
    *用于游戏上传积分所用
    */
    repFamilyLiveness(argu, callback, context) {
        var self = this;
        console.log("----->repFamilyLiveness");
        var params = {
            invite: argu.invite,
            token: argu.token,
            count: argu.count,//只能是1-5
        };

        var router = '/gapi/family/liveness';
        var requestResultMethod = {
            context: this,
            onSuccess: function (result) {
                console.log("----->repFamilyLiveness  onSuccess: ", result);
                if (callback) callback.apply(context, [result]);
            },
            onFail: function (result, errorCode) {
                console.log("----->repFamilyLiveness  onFail: ", result, errorCode);

            }
        };

        GeneralServerRequest.preq(router, params, requestResultMethod, null, false, false);

    },


    /*
    *积分列表
    */
    repFamilyPointsList(argu, callback, context) {
        var self = this;
        console.log("----->repFamilyPointsList");
        var params = {
            invite: argu.invite,
            token: argu.token,
        };

        var router = '/gapi/family/points/list';
        var requestResultMethod = {
            context: this,
            onSuccess: function (result) {
                console.log("----->repFamilyPointsList  onSuccess: ", result);
                if (callback) callback.apply(context, [result]);
            },
            onFail: function (result, errorCode) {
                console.log("----->repFamilyPointsList  onFail: ", result, errorCode);

            }
        };

        GeneralServerRequest.preq(router, params, requestResultMethod, null, false, false);

    },

    /*
    *奖励列表
    */
   repFamilyAwardList(argu, callback, context) {
    var self = this;
    console.log("----->repFamilyAwardList");
    var params = {
        invite: argu.invite,
        token: argu.token,
    };

    var router = '/gapi/family/award/list';
    var requestResultMethod = {
        context: this,
        onSuccess: function (result) {
            console.log("----->repFamilyAwardList  onSuccess: ", result);
            if (callback) callback.apply(context, [result]);
        },
        onFail: function (result, errorCode) {
            console.log("----->repFamilyAwardList  onFail: ", result, errorCode);

        }
    };

    GeneralServerRequest.preq(router, params, requestResultMethod, null, false, false);

},


    /*
    *钻石购买加入家族
    */
   repFamilyJoin(argu, callback, context) {
    var self = this;
    console.log("----->repFamilyJoin");
    var params = {
        // invite: argu.invite,
        token: argu.token,
    };

    var router = '/gapi/family/join';
    var requestResultMethod = {
        context: this,
        onSuccess: function (result) {
            console.log("----->repFamilyJoin  onSuccess: ", result);
            if (callback) callback.apply(context, [result]);
        },
        onFail: function (result, errorCode) {
            console.log("----->repFamilyJoin  onFail: ", result, errorCode);

        }
    };

    GeneralServerRequest.preq(router, params, requestResultMethod, null, false, false);

},




});


var FamilyModel = new familyModel();
module.exports = FamilyModel;

