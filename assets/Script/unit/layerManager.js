

var _sence = null;
var _layer = null;


var _alllayer = {
    'family': null,
    'mainMenu': null,
    'userinfo': null,
    'gamelobby': null,
    'createRole': null,
    'roleList': null,
};

var _currLayerName = '';
var _currLayer = null;

var layerManager = {
    // 成员变量
    init(sence) {
        _sence = sence;
        _layer = sence.baselayerNode;
    },

    goToLayer(layername, data=null) {
        var ws = cc.winSize;
        if(_currLayerName == layername){
            return;
        }

        if(_currLayer){
            _currLayer.com.x = -ws.width;
            _currLayer.js.onOut();
        }

        var nextLayer = _alllayer[layername];
        if(!nextLayer){
            nextLayer = this.createLayer(layername);
            _alllayer[layername] = nextLayer;
        }
        _alllayer[layername].com.x = 0;
        _alllayer[layername].js.onIn();

        if(data){
            _alllayer[layername].js.setData(data);
        }
        
        _currLayerName = layername;
        _currLayer = nextLayer;

    },

    createLayer(layer) {
        var Prefab = null;
        var Js = null;
        var Obj = null;

        if (layer == "mainMenu") {
            Prefab = cc.instantiate(_sence.menuPrefab);
            _layer.addChild(Prefab);
            Js = Prefab.getComponent('mainMenu');
            Js.mainSence = _sence;

        } else if (layer == "family") {
            Prefab = cc.instantiate(_sence.familyPrefab);
            _layer.addChild(Prefab);
            Js = Prefab.getComponent('family');
            Js.mainSence = _sence;

        } else if (layer == "userinfo") {
            Prefab = cc.instantiate(_sence.userinfoPrefab);
            _layer.addChild(Prefab);
            Js = Prefab.getComponent('userInfo');
            Js.mainSence = _sence;

        } else if (layer == "gamelobby") {
            Prefab = cc.instantiate(_sence.gameLobbyPrefab);
            _layer.addChild(Prefab);
            Js = Prefab.getComponent('gamelobby');
            Js.mainSence = _sence;

        } else if (layer == "createRole") {
            Prefab = cc.instantiate(_sence.createRolePrefab);
            _layer.addChild(Prefab);
            Js = Prefab.getComponent('createRole');
            Js.mainSence = _sence;

        } else if (layer == "roleList") {
            Prefab = cc.instantiate(_sence.characterInfoPrefab);
            _layer.addChild(Prefab);
            Js = Prefab.getComponent('characterinfo');
            Js.mainSence = _sence;
        }

        if(Prefab && Js){
            Obj = {
                com: Prefab,
                js: Js
            };
        }
        return Obj;
    },

    getSence(){
        return _sence;
    },
    getLayerNode(){
        return _layer;
    },

    getCurrLayer(){
        return _currLayer;
    },
    getCurrLayerName(){
        return _currLayerName;
    },

    getAllLayer(){
        return _alllayer;
    },
};


module.exports = layerManager;