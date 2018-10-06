/*
 * 是否包含中文
 */

var SYMBOLS = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
var UNITS = ['', '十', '百', '千', '万'];

var Tools = {
    /*
     * 是否包含中文
     */
    strHasChineseChar: function (str) {
        if (!!str && str.length > 0) {
            return str != str.replace(/^[\u4E00-\u9FA5]/g, '');
        }
        return false;
    },

    /*
     * 字符串是否数字
     */
    isStrNumber: function (str) {
        if (!!str && str.length > 0) {
            return str == parseInt(str) + '';
        }
        return false;
    },

    /*
     * 字符串是否英文
     */
    isStrAlphabetic: function (str) {
        if (!!str && str.length > 0) {
            return str != str.replace(/[a-zA-Z]/g, '');
        }
        return false;
    },

    /*
     * 获取一个字符串的字节长度
     * */
    getTextCharLength: function (str) {
        var len = 0;
        if (!str) return len;
        for (var i = 0; i < str.length; i++) {
            if (str.charCodeAt(i) > 127 || str.charCodeAt(i) == 94)
                len += 2;
            else
                len += 1;
        }
        return len;
    },

    /*
     * 截取字符串
     * */
    stripTextToLength: function (str, maxLength, isChar = false) {
        var len = isChar ? Tools.getTextCharLength(str) : str.length;
        while (len > maxLength) {
            str = str.substring(0, str.length - 1);
            len = isChar ? Tools.getTextCharLength(str) : str.length;
        }
        return str;
    },

    GetDistance: function (p1, p2) {
        return Math.sqrt((p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y));
    },

    getAngle: function (beginPoint, endPoint) {
        var len_y = endPoint.y - beginPoint.y;
        var len_x = endPoint.x - beginPoint.x;


        if (len_y == 0.0) {
            if (len_x < 0) {
                return 270;
            } else if (len_x > 0) {
                return 90;
            }
            return 0;
        }

        if (len_x == 0.0) {
            if (len_y >= 0) {
                return 0;
            } else if (len_y < 0) {
                return 180;
            }
        }

        return Math.atan2(len_x, len_y) * 180 / 3.1415926;
    },

    getDir: function (beginPoint, endPoint) {
        var len_y = endPoint.y - beginPoint.y;
        var len_x = endPoint.x - beginPoint.x;


        if (len_y == 0.0) {
            if (len_x < 0) {
                return "left";
            } else if (len_x > 0) {
                return "right";
            }
            return "top";
        }

        if (len_x == 0.0) {
            if (len_y >= 0) {
                return "top";
            } else if (len_y < 0) {
                return "bottom";
            }
        }

        if (len_y > 0) { //上面
            if (endPoint.x > beginPoint.x) {
                return "topRight"
            } else if (endPoint.x < beginPoint.x) {
                return "topLeft"
            }
        }

        if (len_y < 0) {
            if (endPoint.x > beginPoint.x) {
                return "bottomRight"
            } else if (endPoint.x < beginPoint.x) {
                return "bottomLeft"
            }
        }
        return "top"

    },

    randInt: function (start, end) {
        return start + Math.floor(Math.random() * (end - start));
    },

    loadGameConfig: function () {
        var allConfig = RES.getRes('game_config_json');
        var config = allConfig['config'];
        var chineseRegExp = /[\u4E00-\u9FA5\uF900-\uFA2D]+/g;

        var gameConfig = {};
        var t = egret.getTimer();

        for (var key in config) {

            gameConfig[key] = {
                all: [],
                map: {}
            };

            var tempConfig = allConfig[key];

            var mainKey = config[key][0];
            var secKey = config[key][1];

            for (var i = 0, len = tempConfig.length; i < len; i++) {

                // 尝试替换多语言
                for (var subKey in tempConfig[i]) {
                    if (chineseRegExp.test(tempConfig[i][subKey])) {
                        tempConfig[i][subKey] = game.Tools.lang(tempConfig[i][subKey]);;
                    }
                }

                gameConfig[key].all.push(tempConfig[i]);

                if (!!mainKey) {
                    var tempId = tempConfig[i][mainKey];
                    gameConfig[key].map[tempId] = gameConfig[key].map[tempId] || {};

                    if (!!secKey) {
                        gameConfig[key].map[tempId][secKey] = gameConfig[key].map[tempId][secKey] || {};
                        gameConfig[key].map[tempId][secKey][tempConfig[i][secKey]] = tempConfig[i];
                    } else {
                        gameConfig[key].map[tempId] = tempConfig[i];
                    }
                }
            }
        }
        console.log('parse config:', egret.getTimer() - t, 'ms');
        return gameConfig;
    },

    removeCarriageReturn: function (str) {
        str += '';
        str = str.replace(/\\r/g, '\r').replace(/\r/g, '');
        var arr = str.split("\n");

        str = "";
        for (var i = 0; i < arr.length; i++) {
            str += arr[i].trim();
        }
        return str;

    },

    slashAndReturnParse: function (str, viseversa) {
        if (viseversa) {
            if (!!str && str.length > 0) {
                if (str.search(/\\r/) != -1) {
                    str = str.replace(/\\r/g, '\r');
                }
                if (str.search(/\\n/) != -1) {
                    str = str.replace(/\\n/g, '\n');
                }
                return str;
            }
            return str;
        } else {
            if (!!str && str.length > 0) {
                if (str.search(/\r/) != -1) {
                    str = str.replace(/\r/g, '\\r');
                }
                if (str.search(/\n/) != -1) {
                    str = str.replace(/\n/g, '\\n');
                }
                return str;
            }
            return str;
        }
    },

    // lang : function(...args) {
    //     var str = arguments[0];
    //     var langStr = model.LocaleModel.Ins.getString(str);
    //     if (!!langStr && langStr.length > 0) {
    //         for (var i = 1; i < arguments.length; i++) {
    //             langStr = langStr.replace("%c", arguments[i]);
    //         }
    //         langStr = langStr.split("@@@@").join("\n");
    //         langStr = langStr.replace("$$$$", "w");
    //     }
    //     return langStr;
    // },


    /*
     * 数字变中文,目前只支持正整数部分,而且目前只支持到万级!
     *
     * @param readable 作用举例: 传入数字是101, 设置为true时返回"一百零一", 设置为false时返回"一零一".
     * */
    //noinspection TypeScriptValidateTypes
    getChineseNumber: function (num, readable) {
        if (num < 0) return '';

        var result = '';
        var splits = (num + '').split('.'),
            intPart = splits.shift(),
            decPart = splits.length ? splits.shift() : null;

        // 过滤尾部两个及以上的0
        if (readable) {
            intPart = intPart.replace(/0+$/g, function (str, ...args) {
                var s = '';
                for (var i = 0; i < str.length; i++) {
                    s += ' ';
                }
                return s;
            });
        }

        // 12300 -> 1 2 3 ' ' ' '
        splits = intPart.split('');
        var v, pv;
        for (var i = 0; i < splits.length; i++) {
            if (splits[i] == ' ') continue;
            v = parseInt(splits[i], 10);
            if (v == 0 && i > 0 && readable) {
                pv = parseInt(splits[i - 1], 10);
                if (pv == v) continue;
            }
            result += Tools.SYMBOLS[v];
            if (v != 0 && readable) {
                result += Tools.UNITS[splits.length - i - 1];
            }
        }

        return result;
    },

    /*
     * 类型判断
     *
     * @param t 要判断的对象
     * @param cmp 要判断的类型
     * */
    is: function (t, cmp) {
        var type = typeof t,
            cmpType = typeof cmp;

        if (t === undefined || type === undefined) return false;

        if (t === cmp) return true;
        if (type === cmp) return true;

        switch (cmp) {
            case String:
                if (type === 'string') return true;
                break;
            case Number:
                if (type === 'number') return true;
                break;
            case Boolean:
                if (type === 'boolean') return true;
                break;
            case Array:
                if (type === 'array') return true;
                break;
        }

        if (cmpType === 'function') {
            return t instanceof cmp;
        } else {
            return type === cmpType;
        }
    },

    /*
     * 超时处理通用方法,其实是单次计时功能
     *
     * @param time 毫秒数
     * */
    timeout: function (time, cb, context, ...params) {
        if (time > 0) {
            var ts = setTimeout(function () {
                game.Tools.clearTimeout(ts);

                if (cb) cb.apply(context, params);
            }, time);
            return ts;
        }
        return -1;
    },

    /*
     * 清除上一步的超时
     * */
    clearTimeout: function (id) {
        if (id != -1)
            clearTimeout(id);
    },

    clone: function (obj) {
        var o;
        if (typeof obj == "object") {
            if (obj === null) {
                o = null;
            } else {
                if (obj instanceof Array) {
                    o = [];
                    for (var i = 0, len = obj.length; i < len; i++) {
                        o.push(game.Tools.clone(obj[i]));
                    }
                } else {
                    o = {};
                    for (var j in obj) {
                        o[j] = game.Tools.clone(obj[j]);
                    }
                }
            }
        } else {
            o = obj;
        }
        return o;
    },

    strlen: function (str) {
        var len = 0;
        for (var i = 0; i < str.length; i++) {
            var c = str.charCodeAt(i);
            //单字节加1
            if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
                len++;
            } else {
                len += 2;
            }
        }
        return len;
    },

    getFormatText: function (text, maxLen = 10) {
        var str = "";
        var len = 0;
        maxLen = maxLen || 10;
        for (var i = 0; i < text.length; i++) {

            if (len < maxLen) {
                len = len + Tools.strlen(text[i]);
                str = str + text[i];
            } else {
                len = len + Tools.strlen("...");
                str = str + "...";
                break;
            }

        }
        return str;
    },

};

module.exports = Tools;