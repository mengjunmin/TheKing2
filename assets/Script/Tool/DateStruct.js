/**
 * 
 */


/*
 * 更人性化的日期结构
 * */
var _pool = []; //DateStruct[]

var DateStruct = cc.Class({
    _date:null,

    ctor () {
        cc.log('----->DateStruct ctor');
    },
    /*
     * 返回到池里
     * */
    returnToPool() {
        if (_pool)
            _pool.push(this);
    },

    /*
     * 通过毫秒数更新该日期,在使用该类前,该方法应该至少被调用一次
     *
     * @param miliSec 从1970/01/01开始的毫秒数
     * */
    update(miliSec) {
        if (!this._date) this._date = new Date();
        this._date.setTime(miliSec);
    },

    /*
     * 通过Date的构造函数来创建日期.
     */
    create(argument) {
        this._date = new Date(argument);
    },

    /*
     * 用毫秒数的数值差更新该日期
     *
     * @param miliSec 传入正数为时间往后(如1970/01/01 - 1980/02/03),传入负数为时间往前(如1980/02/03 - 1970/01/01)
     * */
    offset(miliSec) {
        if (this._date) {
            this._date.setTime(this._date.getTime() + miliSec);
        }
    },

    /*
     * 获取当前的日期实例
     * return Date
     * */
    getOriginalDate() {
        return this._date;
    },

    /*
     * 获取当前日期的毫秒数
     * */
    getMiliSec() {
        return this.getOriginalDate().getTime();
    },

    /*
     * 一周里面的天数,返回值从1-7,而不是0-6
     *
     * @return number 1到7,即周一到周茹
     * */
    getDayOfWeek() {
        var day = this.getOriginalDate().getDay();
        return day == 0 ? 7 : day;
    },

    /*
     * 当前的年份
     *
     * @return number
     * */
    getYear() {
        return this.getOriginalDate().getFullYear();
    },

    /*
     * 返回当前的月份,从1-12,而不是0-11
     *
     * @return number 1到12,也就是一月到十二月
     * */
    getMonthOfYear() {
        var m = this.getOriginalDate().getMonth();
        return m + 1;
    },

    /*
     * 当前的日期,一个月里的某一天
     *
     * @return number
     * */
    getDayOfMonth() {
        var d = this.getOriginalDate().getDate();
        return d;
    },

    /*
     * 当前的日期,小时数
     *
     * @return number
     * */
    getHour() {
        var h = this.getOriginalDate().getHours();
        return h;
    },

    getMinute() {
        var m = this.getOriginalDate().getMinutes();
        return m;
    },

    getSecond() {
        var s = this.getOriginalDate().getSeconds();
        return s;
    },

});


/**
 * return DateStruct
 */
var CreateFromPool = function () {
    var d;
    if (_pool.length == 0) {
        d = new DateStruct();
    } else {
        d = this._pool.shift();
    }

    return d;
};


module.exports = {
    createFromPool : CreateFromPool,
};