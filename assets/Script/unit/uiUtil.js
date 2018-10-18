/**
 * 
 */


var uiUtil = {
    /*
     * 设置头像框
     * */
    setFrame: function(frame, frameId) {

        // if (this._currFrame != '') {
        //     var frame = "frame" + this._currFrame;
        //     cc.loader.releaseRes(frame, cc.SpriteFrame);
        // }

        if (frameId < 10) {
            frameId = '00' + frameId;
        } else {
            frameId = '0' + frameId;
        }

        var newframe = "frame" + frameId;
        cc.loader.loadRes(newframe, cc.SpriteFrame, function(err, spriteFrame) {
            // cc.log('----->spriteFrame:', spriteFrame);
            frame.spriteFrame = spriteFrame;
        });
    },
    /*
     * 设置头像
     * */
    setAvatar: function(avatar, avatarId, size=0) {
        if (avatarId < 10) {
            avatarId = '00' + avatarId;
        } else {
            avatarId = '0' + avatarId;
        }

        // if (this._currAvatar != '') {
        //     var oldavatar = "monster" + this._currAvatar + '_s';
        //     cc.loader.releaseRes(oldavatar, cc.SpriteFrame);
        // }

        size = size==0?'_s':'_b';

        var newavatar = "monster" + avatarId + size;
        cc.loader.loadRes(newavatar, cc.SpriteFrame, function(err, spriteFrame) {
            // cc.log('----->spriteFrame:', spriteFrame);
            avatar.spriteFrame = spriteFrame;
        });
    },


};

module.exports = uiUtil;