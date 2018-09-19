


var SignalEvent =  cc.Class({

    bindFuncList: null,

    ctor () {
        cc.log('----> new event obj'); // true
        this.bindFuncList = [];
    },

    /**
     * 设置监听
     * @param {监听的回调方法} cbFunc 
     * @param {监听的回调方法} target 
     */
    // 注册事件监听
    on(cbFunc, cdTarget) {
        var event = {
            fun: cbFunc,
            obj: cdTarget
        }
        this.bindFuncList.push(event);
    },

    // 注销事件监听
    off(cbFunc, cdTarget) {
            //方法1
            // if (this.bindFuncList[key]) {
            //     var arr = [];
            //     for (var i = 0; i < this.bindFuncList[key].length; i++) {
            //         var one = this.bindFuncList[key][i];
            //         if (one['fun'] == cbFunc && one['obj'] == cdTarget) {
            //             continue;
            //         }
            //         arr.push(one);
            //     }
            //     this.bindFuncList[key] = arr;
            // }
            //方法2
            var num = this.bindFuncList.length;
            for (var i = num - 1; i >= 0; i--) {
                var one = this.bindFuncList[i];
                if (one['fun'] == cbFunc && one['obj'] == cdTarget) {
                    this.bindFuncList.splice(i, 1);
                }
            }

    },
    /**
     * 触发事件监听函数
     * @param {调用时传的参数} args 
     */
    // emit事件，发送消息
    emit(args) {
        var ary = this.bindFuncList;
        for (var i = 0; i<ary.length; i++) {
            var event = ary[i];
            event['fun'].call(event['obj'], args);
        }
    },


    // 清空全部的事件监听
    clear() {
        this.bindFuncList = [];
    },

    validateListener(listener, fnName) {

        if (typeof listener !== 'function') {
            throw new Error('listener is a required param of {fn}() and should be a Function.'.replace('{fn}', fnName));
        }

    },

});

module.exports = SignalEvent;