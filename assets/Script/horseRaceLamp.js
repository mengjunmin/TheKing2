var basePopup = require("./basePopup");
var mailModel = require("./mode/mailModel");
var userMode = require("./mode/userMode");

cc.Class({
    extends: cc.Component,

    properties: {
        connettext :{
            default:null,
            type:cc.RichText,
        },
        bg:{
            default:null,
            type:cc.Sprite,
        },

        _data:null,
        _allNote:null,

        _isPlay:null,
        _idx:0,
    },

    // LIFE-CYCLE CALLBACKS:
    ctor:function () {
         var self = this;
        
    },

    onLoad () {
        this._allNote = [];
        this._isPlay = false;
        this._idx = 0;

    },

    setData(data){
        //解析数据
        for(var i=0;i<data.length;i++){

        }
        var mis = "<color=#00ff00>据台媒消息</color>台湾地标101前的广场近来有人群聚集并高举<color=#00ffff>五星红旗</color>欢迎大陆游客来台观光。";
        this._allNote.push(mis);
        this._allNote.push(mis);
        this._allNote.push(mis);
        //启动跑马灯  <color=#00ff00>Rich</c><color=#0fffff>Text</color>
        console.log('----->this._allNote ', this._allNote);
        this.showNote();
    },

    start () {
        var self = this;
        console.log('----->this.bg ', this.bg);
        this.bg.enabled = false;
        var time = 5;
        this.scheduleOnce(function () {
            // self.getNote();
            // self.runNoteTimer();
            // self.setData([]);
        }, time);
    },

    runNoteTimer(){
        var self = this;
        var time = 60*5;
        this.schedule(function () {
            self.getNote();
        }, time);
    },

    showNote(){
        var num = this._allNote.length;
        if(num==0){
            this.connettext.string = '';
            this._isPlay = false;
            this.bg.enabled = false;
        }else{
            if(!this._isPlay){
                var note = this._allNote.shift();
                this.connettext.string = note;
                this.connettext.node.x = 0;
                this._isPlay = true;
                this.bg.enabled = true;
                // console.log('----->showNote this.connettext.string ', this.connettext);
            }
        }


    },

    getNote(){
        var uid = userMode.getInstance().user.uid;
        var t = userMode.getInstance().user.t;
        var pp = {
            uid: uid,
            t: t,
        }
        mailModel.repNote(pp, this.repNote, this);
        // this.repMailList(null);
    },

    repNote(data){
        console.log("======>repNote");
        this.setData(data);
    },




    update (dt) {
        if(!this._isPlay){
            return;
        }
        this._idx++;
        this._idx = this._idx%1;
        
        if(this._idx == 0){
            this.connettext.node.x--;
            if( this.connettext.node.x < -(this.node.width+this.connettext.node.width) ){
                this._isPlay = false;
                this.showNote();
            }
        }


    },



});
