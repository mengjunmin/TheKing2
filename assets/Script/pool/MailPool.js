


var MailPool =  cc.Class({

    ObjPool: null,
    Prefab:null,

    ctor () {
        cc.log('---->create MailPool'); // true
        this.ObjPool = new cc.NodePool();
    },


    init(prefab) {
        this.Prefab = prefab;
    },

    create (data) {
        if(!this.Prefab) return null;
        
        let  = null;
        if (this.ObjPool.size() > 0) {
            console.log('----->RolePool one from pool');
            mail = this.ObjPool.get();
        } else { 
            mail = cc.instantiate(this.Prefab);
            console.log('----->RolePool create one');
        }
        var js = mail.getComponent('mailitem'); 
        // js.setData(data);

        return  mail;
    },

    put(mail) {
        this.ObjPool.put(mail);
    },


});


var mailPool = new MailPool();
module.exports = mailPool;