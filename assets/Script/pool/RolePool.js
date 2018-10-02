


var RolePool =  cc.Class({

    ObjPool: null,
    Prefab:null,

    ctor () {
        cc.log('---->create RolePool'); // true
        this.ObjPool = new cc.NodePool();
    },


    init(prefab) {
        this.Prefab = prefab;
    },

    create (data) {
        if(!this.Prefab) return null;
        
        let role = null;
        if (this.ObjPool.size() > 0) {
            console.log('----->RolePool one from pool');
            role = this.ObjPool.get();
        } else { 
            role = cc.instantiate(this.Prefab);
            console.log('----->RolePool create one');
        }
        var js = role.getComponent('characterInfoBar'); 
        // js.setData(data);

        return  role;
    },

    put(role) {
        this.ObjPool.put(role);
    },


});


var rolePool = new RolePool();
module.exports = rolePool;