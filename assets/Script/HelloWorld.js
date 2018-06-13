cc.Class({
    extends: cc.Component,

    properties: {
        label: {
            default: null,
            type: cc.Label
        },
        // defaults, set visually when attaching this script to the Canvas
        text: 'Hello, World!'
    },

    // use this for initialization
    onLoad: function () {
        this.label.string = this.text;
    },

    // called every frame
    update: function (dt) {

    },

    //     onBtton: function(btn) {
    //     //这里 editbox 是一个 cc.EditBox 对象
    //     //这里的 customEventData 参数就等于你之前设置的 "foobar"

    //     cc.log('btn: ', btn);

    //     cc.director.loadScene('Login');
    // }
});
