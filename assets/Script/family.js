var basePopup = require("basePopup");
var userMode = require("./mode/userMode");
var familyModel = require("./mode/familyModel");

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },



        backBtn: {
            default: null,
            type: cc.Button
        },

        joinBtn: {
            default: null,
            type: cc.Button
        },

        duihuanBtn: {
            default: null,
            type: cc.Button
        },

        tree1: {
            default: null,
            type: cc.Prefab,
        },

        tree2: {
            default: null,
            type: cc.Prefab,
        },

        treeNode: {
            default: null,
            type: cc.Node,
        }
    },
    mainSence: null,
    // LIFE-CYCLE CALLBACKS:
    ctor:function () {
        console.log('----->family  ctor');
         var self = this;
        
    },

    onLoad() {



    },

    start() {
        //发起联网请求。获取加载那个tree。


    },

    getList() {
        var uid = userMode.getInstance().user._id;
        var token = userMode.getInstance().user.token;


        var params = {
            invite: uid,
            token: token,
            deep: '-1,2',//-1，1
        };
        familyModel.repFamilyTree(params, this.repFamilyList, this);
    },

    repFamilyList(data) {
        var istree = data && data.length > 0;
        if (istree) {
            this.updataTree(data);

        } else {

        }

    },

    updataTree: function(data) {
        cc.log('----->updataTree: ', data);
        var children = this.treeNode.children;
        for (var i = 0; i < children.length; i++) {
            children[i].destroy();
        }

        var type = this.treeType(data);
        cc.log('----->Tree  type : ', type);
        var tree = null;
        if (type == 1) { //首领
            tree = cc.instantiate(this.tree1);
            var tree1js = tree.getComponent('tree1');
            tree1js.setData(data);
        } else if (type == 2) {
            tree = cc.instantiate(this.tree2);
            var tree2js = tree.getComponent('tree2');
            tree2js.setData(data);
        }

        if (tree) {
            this.treeNode.addChild(tree);
        }

    },

    treeType(data){
        var uid = userMode.getInstance().user._id;
        var ower = null;
        var father = null;

        for(var i=0;i<data.length;i++){
            ower = data[i];
            if(ower._id == uid){
                break;
            }
        }

        for(var i=0;i<data.length;i++){
            var one = data[i];
            if(one._id == ower.parent_invite){
                return 2;
            }
        }

        return 1;
    },

    onBack: function(obj, data) {
        cc.log('----->onBack');
        this.mainSence.goToLayer("mainMenu");
    },

    onJoin: function(obj, data) {
        cc.log('----->onJoin');
        var uid = userMode.getInstance().user.uid;
        var t = userMode.getInstance().user.t;
        var pp = {
            uid: uid,
            t: t,
        }
        familyModel.repFamilyJoin(pp, this.reqJoin, this);

    },

    reqJoin(data) {
        cc.log('----->reqJoin:', data);
        this.updataTree(data);
    },

    onDuihuan: function(obj, data) {
        cc.log('----->onDuihuan');


    },

    onIn: function() {
        cc.log('----->family onIn');
        var family = userMode.getInstance().user['family'];
        cc.log('----->family: ', family);
        // this.updataTree(null);
        // // this.getList();
        this.getList();

        this.joinBtn.node.active = family ? false : false;
    },

    onOut: function() {
        cc.log('----->family onOut');
    },

    // update (dt) {},
});