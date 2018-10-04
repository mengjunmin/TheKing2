var mailModel = require("./mode/mailModel");
var userMode = require("./mode/userMode");
var RolePool = require('./pool/RolePool');
var characterinfoModel = require("./mode/characterinfoModel");
var popupManager = require("./unit/popupManager");
var MessageCenter = require('./Signal/MessageCenter');


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

    setData(data) {
        this._conf = data;
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
        console.log('----->onItemClick:', data);
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
        this.mainSence.goToLayer("mainMenu");
    },

    onCreateRoleBtn() {
        if (this._canCreateRole) {
            this.mainSence.goToLayer("createRole");
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
                cancelCallbackObj: self, // 取消
                okCallback: onOk, // 确定
                okCallbackObj: self, // 确定
            };
            popupManager.create('note', CONF);
        }

    },

    onSkipBtn() {
        this.mainSence.goToLayer("mainMenu");
    },

    onIn: function () {
        cc.log('----->RoleList onIn');
        // if(!this.enabled){
        //     this.enabled = true;
        // }
    },

    onOut: function () {
        cc.log('----->RoleList onOut');
        // if(this.enabled){
        //     this.enabled = false;
        // }
    },


    // update (dt) {},
});