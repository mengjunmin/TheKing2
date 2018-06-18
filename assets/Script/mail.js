var basePopup = require("./basePopup");



cc.Class({
    extends: basePopup,

    properties: {
        closeBtn:{
            default:null,
            type:cc.Button
        },
        itemPrefab :{
            default:null,
            type:cc.Prefab,
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },


    onCloseBtn(){
        console.log('  mail onCloseBtn');
        this.node.destroy();
    }
    // update (dt) {},
});
