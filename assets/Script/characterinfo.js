
var mailModel = require("./mode/mailModel");
var userMode = require("./mode/userMode");
var RolePool = require('./pool/RolePool');


cc.Class({
    extends: cc.Component,

    properties: {
        backBtn:{
            default:null,
            type:cc.Button
        },
        createBtn:{
            default:null,
            type:cc.Button
        },
        skipBtn:{
            default:null,
            type:cc.Button
        },
        itemPrefab :{
            default:null,
            type:cc.Prefab,
        },

        mainSence: null,

        _list:null,
        _listcontent:null,
        _data:null,


    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.log('onLoad: ');
        console.log('mail list  onLoad');
        RolePool.init(this.itemPrefab);
        this._list = this.node.getChildByName('scrollview');
        var view = this._list.getChildByName('view');
        this._listcontent = view.getChildByName('content');

    },

    setData(data){
        this._conf = data;
    },

    start () {
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

    getRoleList(){
        var uid = userMode.getInstance().user.uid;
        var t = userMode.getInstance().user.t;
        var pp = {
            uid: uid,
            t: t,
        }
        // mailModel.repMailList(pp, this.repMailList, this);
        this.repMailList(null);
    },

    repMailList(data){
        console.log("======>repMailList");
        // this._data = data.list;
        this._data = [
            {
                "id": 1,
                "title": "11111",
                "content": "121212",
                "action": "",
                "status": 0
            },
            {
                "id": 1,
                "title": "222222",
                "content": "212121212",
                "action": "",
                "status": 1
            },
            {
                "id": 1,
                "title": "3333333",
                "content": "212121212",
                "action": "",
                "status": 1
            },
            {
                "id": 1,
                "title": "4444444",
                "content": "212121212",
                "action": "",
                "status": 1
            },
            {
                "id": 1,
                "title": "4444444",
                "content": "212121212",
                "action": "",
                "status": 1
            },
            {
                "id": 1,
                "title": "4444444",
                "content": "212121212",
                "action": "",
                "status": 1
            },
            {
                "id": 1,
                "title": "4444444",
                "content": "212121212",
                "action": "",
                "status": 1
            }
        ];

        this.updataList();
    },

    updataList(){
        this.cleanList();
        for(var i=0;i<this._data.length;i++){
            // var item = cc.instantiate(this.itemPrefab);
            // // var itemJs = item.getComponent('characterInfoBar');
            // // itemJs.setData(this._data[i]);
            // this._listcontent.addChild(item);
            console.log('----->i:', i);

            var item = RolePool.create(null);
            this._listcontent.addChild(item);
        }
        var children = this._listcontent.children;
        console.log('----->children:', children);
    },



    cleanList(){
        if(this._listcontent){
            var children = this._listcontent.children;
            var num = children.length;
            for(var i=num-1;i>=0;i--){
                RolePool.put(children[i]);
            }
            console.log('----->children:', children);
        }
    },


    onBackBtn(){
        this.mainSence.goToLayer("mainMenu");
    },

    onCreateRoleBtn(){
        this.mainSence.goToLayer("createRole");
    },

    onSkipBtn(){
        this.mainSence.goToLayer("mainMenu");
    },

    onIn: function() {
        cc.log('----->createRole onIn');
        if(!this.enabled){
            this.enabled = true;
        }
    },

    onOut: function() {
        cc.log('----->createRole onOut');
        if(this.enabled){
            this.enabled = false;
        }
    },


    // update (dt) {},
});
