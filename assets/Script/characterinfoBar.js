cc.Class({
    extends: cc.Component,

    properties: {
        avatar: {
            default: null,
            type: cc.Sprite
        },
        nickname: {
            default: null,
            type: cc.Label,
        },

        rankvalue: { //军衔
            default: null,
            type: cc.Label,
        },
        activevalue: { //活跃
            default: null,
            type: cc.Label,
        },
        scorevalue: { //活跃
            default: null,
            type: cc.Label,
        },

        _data: null,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {

    },

    setData(data) {
        this._data = data;
        this.updateView();
    },

    updateView() {
        this.nickname.string = this._data.nickname;
        this.rankvalue.string = this._data.rankvalue;
        this.activevalue.string = this._data.activevalue;
        this.scorevalue.string = this._data.scorevalue;

        this.setUserAvatar(this._data.avatar);
    },

    setUserAvatar:function(avatar){
        var self = this;
        
        var idx = avatar<10?('00'+avatar):('0'+avatar);
        var newavatar = "monster" + idx + '_s'
        cc.loader.loadRes(newavatar, cc.SpriteFrame, function (err, spriteFrame) {
            cc.log('----->spriteFrame:', spriteFrame);
            self.userAvatar.spriteFrame = spriteFrame;

        });
    },

    // update (dt) {},
});