var mailModel = require("./mode/mailModel");
var userMode = require("./mode/userMode");
var RolePool = require('./pool/RolePool');
var characterinfoModel = require("./mode/characterinfoModel");
var popupManager = require("./unit/popupManager");
var MessageCenter = require('./Signal/MessageCenter');
var UserInfoModel = require('./mode/userInfoModel');
var LayerManager = require('./unit/layerManager');
var allDefine = require('./mode/AllDefine');



cc.Class({
    extends: cc.Component,

    properties: {
        backBtn: {
            default: null,
            type: cc.Button
        },
        createBtn: {
            default: null,
            type: cc.Button
        },
        skipBtn: {
            default: null,
            type: cc.Button
        },
        itemPrefab: {
            default: null,
            type: cc.Prefab,
        },

        mainSence: null,

        _list: null,
        _listcontent: null,
        _data: null,

        _canCreateRole: null,

    },

    // LIFE-CYCLE CALLBACKS:
    ctor: function () {
        console.log('----->characterinfo  ctor');
        var self = this;

    },

    onLoad() {
        this._canCreateRole = true;

        cc.log('onLoad: ');
        console.log('mail list  onLoad');
        RolePool.init(this.itemPrefab);
        this._list = this.node.getChildByName('scrollview');
        var view = this._list.getChildByName('view');
        this._listcontent = view.getChildByName('content');

        this.skipBtn.node.active = false;
    },


    start() {
        cc.log('start: ');

    },

    onEnable: function () {
        cc.log('onEnable: ');
        this.getRoleList();
    },

    onDisable: function () {
        cc.log('onDisable: ');
        this.cleanList();
    },

    getRoleList() {
        var token = userMode.getInstance().user.token;

        var params = {
            token: token
        }
        characterinfoModel.repRoleList(params, this.repRoleList, this);
        // this.repMailList(null);
    },
    /*
    public enum AccountStatus
        {
            已过期 = -10,
            未使用 = 0,
            未激活 = 10,
            已激活 = 100
        }
    */
    repRoleList(data) {
        console.log("======>repRoleList: ", data);
        this._data = data;
        this.updataList();
        this.skipBtn.node.active = this._data.length == 0 ? true : false;
    },

    refreshList() {
        var children = this._listcontent.children;

        for (var i = 0; i < children.length; i++) {
            var item = children[i];
            var itemJs = item.getComponent('characterinfoBar');
            itemJs.select();
        }
    },

    updataList() {
        this.cleanList();
        for (var i = 0; i < this._data.length; i++) {
            var item = RolePool.create(this._data[i], this.onItemClick, this);
            this._listcontent.addChild(item);
        }
        var children = this._listcontent.children;
        console.log('----->children:', children);
    },

    onItemClick(data) {
        var uid = data._id;
        var user_id = userMode.getInstance().user.uid;
        if (uid == user_id) {
            console.log('----->onItemClick:', uid, user_id);
            return;
        }
        if(data.status){
            //如果是申请失败 --》删除
            //如果申请成功 --》创建角色（自动添加邀请码）
            // LayerManager.goToLayer("createRole", {invite:invite});
        }
        console.log('----->onItemClick:', data);
        var token = userMode.getInstance().user.token;
        var params = {
            token: token,
            invite: uid,
        }
        UserInfoModel.repFullUserInfo(params, this.repFullUserInfo, this);
    },
    repFullUserInfo(data) {
        userMode.getInstance().updataUser(data);
        MessageCenter.UPDATE_HUD.emit();
        MessageCenter.PAY_TIP.emit(data.status == allDefine.RoleStatus.NotActive);
        this.refreshList();
    },


    cleanList() {
        if (this._listcontent) {
            var children = this._listcontent.children;
            var num = children.length;
            for (var i = num - 1; i >= 0; i--) {
                RolePool.put(children[i]);
            }
            console.log('----->children:', children);
        }
    },


    onBackBtn() {
        LayerManager.goToLayer("mainMenu");
    },

    onCreateRoleBtn() {
        if (this._canCreateRole) {
            LayerManager.goToLayer("createRole");
        } else {
            var self = this;
            var onOk = function () {

            };
            var CONF = {
                title: '',
                content: "您尚有角色未到达满级，无法创建新角色",
                okLabel: null,
                cancelLabel: null,
                cancelCallback: null, // 取消
                cancelCallbackObj: null, // 取消
                okCallback: onOk, // 确定
                okCallbackObj: self, // 确定
            };
            popupManager.create('note', CONF);
        }

    },

    onSkipBtn() {
        LayerManager.goToLayer("mainMenu");
    },

    onIn: function () {
        cc.log('----->RoleList onIn');
        if (!this.enabled) {
            this.enabled = true;
        }
    },

    onOut: function () {
        cc.log('----->RoleList onOut');
        if (this.enabled) {
            this.enabled = false;
        }
    },

    setData(data) {
        
    },
    // update (dt) {},
});