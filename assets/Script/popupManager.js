

const popupManager = cc.Class({
    name: 'popupManager',
    properties: {
        layer: {
            default: null,
            type: cc.Node
        },

    },
    ctor () {

    },
    create (poolMng) {
        if (this.spawned >= this.total) {
            return;
        }
        let newFoe = poolMng.requestFoe(this.foeType);
        if (newFoe) {
            this.spawned++;
            if (this.spawned === this.total) {
                this.finished = true;
            }
            return newFoe;
        } else {
            cc.log('max foe count reached, will delay spawn');
            return null;
        }
    }
});

module.exports = popupManager;