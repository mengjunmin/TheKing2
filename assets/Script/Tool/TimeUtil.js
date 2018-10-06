/**
 * 
 */

var DateStruct = require('./DateStruct');

var YEAR = 'year';
var MONTH = 'month';
var DATE = 'date';
var HOUR = 'hour';
var MINUTE = 'minute';
var SECOND = 'second';
var MILISEC = 'milisec';

var MILI_SEC_OF_SEC = 1000;
var MILI_SEC_OF_MINUTE = MILI_SEC_OF_SEC * 60;
var MILI_SEC_OF_HOUR = MILI_SEC_OF_MINUTE * 60;
var MILI_SEC_OF_DAY = MILI_SEC_OF_HOUR * 24;

var _date = DateStruct.createFromPool();

var TimeUtil = {
    /*
     * 倒计时转换成倒计时文字
     *
     * @param leftMiliSec 倒计时的毫秒数
     * @param format 格式,格式中的{hh}会被替换成小时数, {mm}分钟,{ss}秒,{ms}毫秒
     * @param delimeter 用来区分format中的分隔符,在提供了format的情况下必须提供此字段
     * */
    timeLeftToTimeFormat : function(leftMiliSec, format = '{hh}:{mm}:{ss}', delimeter = ':') {
        var formats = format.split(delimeter),
            result = [];
        if (formats && formats.length) {
            var split;
            while (formats.length) {
                split = formats.shift();
                if (split.match('{h}') || split.match('{hh}')) {
                    var h = Math.floor(leftMiliSec / 3600000);
                    split = split.replace('{h}', h + '');
                    split = split.replace('{hh}', h < 10 ? '0' + h : h + '');
                    result.push(split);
                } else if (split.match('{m}') || split.match('{mm}')) {
                    var m = Math.floor(leftMiliSec % 3600000 / 60000);
                    split = split.replace('{m}', m + '');
                    split = split.replace('{mm}', m < 10 ? '0' + m : m + '');
                    result.push(split);
                } else if (split.match('{s}') || split.match('{ss}')) {
                    var s = Math.floor(leftMiliSec % 3600000 % 60000 / 1000);
                    split = split.replace('{s}', s + '');
                    split = split.replace('{ss}', s < 10 ? '0' + s : s + '');
                    result.push(split);
                } else if (split.match('{ms}') || split.match('{ms}')) {
                    var ms = Math.floor(leftMiliSec % 1000);
                    split = split.replace('{ms}', ms + '');
                    result.push(split);
                }
            }
        }
        return result.join(delimeter);
    },

    /*
     * 时间转日期,目前只支持年月日三个级别
     * */
    timeToDate : function(timestamp, format = '{yyyy}-{mm}-{dd}', delimeter = '-') {
        _date.update(timestamp);
        var result = [];

        var formats = format.split(delimeter),
            split;
        while (formats.length) {
            split = formats.shift();
            if (split.match('{yyyy}') || split.match('{yy}')) {
                var y = _date.getYear() + '';
                var year = split.match('{yy}') ? y.substr(y.length - 2) : y;
                result.push(year);
            } else if (split.match('{mm}')) {
                var m = _date.getMonthOfYear() + '';
                var month = m.length < 2 ? '0' + m : m;
                result.push(month);
            } else if (split.match('{dd}')) {
                var d = _date.getDayOfMonth() + '';
                var day = d.length < 2 ? '0' + d : d;
                result.push(day);
            } else if (split.match('{hh}')) {
                var h = _date.getHour() + '';
                var hour = h.length < 2 ? '0' + h : h;
                result.push(hour);
            }
        }

        return result.join(delimeter);
    },


    /*
     * 时间转日期,目前只支持年月日三个级别
     * */
    timeToDate2 : function(timestamp, format = '{yyyy}-{mm}-{dd}-{hh}') {
        _date.update(timestamp);
        var result = [];
        var y = _date.getYear() + '';
        var m = _date.getMonthOfYear() + '';
        var d = _date.getDayOfMonth() + '';
        var h = _date.getHour() + '';
        format = format.replace("{yyyy}", y);
        format = format.replace("{mm}", m)
        format = format.replace("{dd}", d)
        format = format.replace("{hh}", h)
        return format;
    },

    //日期字符串转时间戳
    timeStamp: function (date) {
        // var date = '2015-03-05 17:59:00.0';
        date = date.substring(0, 19);
        date = date.replace(/-/g, '/');
        var times = new Date(date).getTime();
        return times;
    },
    
    /*
     * 比较日期,是否同一时间
     * ds1:DateStruct
     * ds2:DateStruct
     * */
    compareDate : function(ds1, ds2, level = 'date') {
        var year = ds1.getYear() - ds2.getYear();
        if (year != 0) return year > 0 ? 1 : -1;
        if (level == YEAR) return 0;

        var month = ds1.getMonthOfYear() - ds2.getMonthOfYear();
        if (month != 0) return month > 0 ? 1 : -1;
        if (level == MONTH) return 0;

        var date = ds1.getDayOfMonth() - ds2.getDayOfMonth();
        if (date != 0) return date > 0 ? 1 : -1;
        if (level == DATE) return 0;

        var hour = ds1.getHour() - ds2.getHour();
        if (hour != 0) return hour > 0 ? 1 : -1;
        if (level == HOUR) return 0;

        var minute = ds1.getMinute() - ds2.getMinute();
        if (minute != 0) return minute > 0 ? 1 : -1;
        if (level == MINUTE) return 0;

        var second = ds1.getSecond() - ds2.getSecond();
        if (second != 0) return second > 0 ? 1 : -1;
        if (level == SECOND) return 0;

        var ms = ds1.getMiliSec() - ds2.getMiliSec();
        if (ms != 0) return ms > 0 ? 1 : -1;
        if (level == MILISEC) return 0;

        return 0;
    },

    /*
     * 比较日期,是否同一时间
     * ds1:DateStruct
     * ds2:DateStruct
     * */
    compareMisliSec : function(ds1, ds2) {
        var ms1 = ds1.getMiliSec(),
            ms2 = ds2.getMiliSec();
        if (ms1 == ms2) {
            return 0;
        } else if (ms1 < ms2) {
            return -1;
        } else {
            return 1;
        }
    },

    /*
     * 通过毫秒数获取一个更舒服的日期结构
     * return DateStruct
     * */
    getDate : function(milisec) {
        var ds = DateStruct.createFromPool();
        ds.update(milisec);
        return ds;
    },

    /*
     * 获取服务器日期
     * return DateStruct
     * */
    getServerDate : function() {
        return getDate(model.GeneralServerRequest.getServerTime());
    },

};

module.exports = TimeUtil;