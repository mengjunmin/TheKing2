/*
 *针对不同的功能生成独立的时间容器。
 *
 *
 *
 *
 */

var SignalEvent = require('./SignalEvent');


var MessageCenter = cc.Class({

    ctor() {
        console.log('--->MessageCenter ctor');
        this.GAME = new SignalEvent();
        this.GUI = new SignalEvent();
        this.UPDATE_HUD =  new SignalEvent();
        this.LOCKSCREEN =  new SignalEvent();
    },


});



var messageCenter = new MessageCenter();
module.exports = messageCenter;