var tool = {
	getDateSpan: function(action) {
		var star_time, end_time;
		if(action == "today") {
			star_time = this.getDateBefore(0) + " 00:00:00"
			end_time = this.getDateBefore(0) + " 23:59:59"
		}
		if(action == "yesterday") {
			star_time = this.getDateBefore(1) + " 00:00:00"
			end_time = this.getDateBefore(1) + " 23:59:59"
		}
		if(action == "lastweek") {
			star_time = this.getDateBefore(7) + " 00:00:00"
			end_time = this.getDateBefore(0) + " 23:59:59"
		}
		if(action == "lastmonth") {
			star_time = this.getDateBefore(30) + " 00:00:00"
			end_time = this.getDateBefore(0) + " 23:59:59"
		}
		//console.log({star_time:star_time,end_time:end_time});
		return {
			star_time: star_time,
			end_time: end_time
		};
	},

	//获取几天前的日期
	getDateBefore: function(n) {
		var uom = new Date(new Date() - 0 - n * 86400000);
		if(uom.getDate() >= 0 && uom.getDate() <= 9) {
			uom = uom.getFullYear() + "-" + (uom.getMonth() + 1) + "-0" + uom.getDate();
		} else {
			uom = uom.getFullYear() + "-" + (uom.getMonth() + 1) + "-" + uom.getDate();
		}
		return uom;
	},

	//获取当前时间
	getTodayBegin: function() {
		var date = new Date();
		var month = date.getMonth() + 1;
		var strDate = date.getDate();
		if(month >= 1 && month <= 9) {
			month = "0" + month;
		}
		if(strDate >= 0 && strDate <= 9) {
			strDate = "0" + strDate;
		}
		var currentdate = date.getFullYear() + "-" + month + "-" + strDate + " 00:00:00";
		return currentdate;
	},

	//获取当前时间
	getTodayEnd: function() {
		var date = new Date();
		var seperator1 = "-";
		var seperator2 = ":";
		var month = date.getMonth() + 1;
		var strDate = date.getDate();
		if(month >= 1 && month <= 9) {
			month = "0" + month;
		}
		if(strDate >= 0 && strDate <= 9) {
			strDate = "0" + strDate;
		}
		var currentdate = date.getFullYear() + "-" + month + "-" + strDate + " 23:59:59";
		return currentdate;
	},

	//获取当天日期    不带时分秒
	getTodayOnly: function() {
		var date = new Date();
		var date = new Date();
		var seperator1 = "-";
		var seperator2 = ":";
		var month = date.getMonth() + 1;
		var strDate = date.getDate();
		if(month >= 1 && month <= 9) {
			month = "0" + month;
		}
		if(strDate >= 0 && strDate <= 9) {
			strDate = "0" + strDate;
		}
		var currentdate = date.getFullYear() + "-" + month + "-" + strDate;
		return currentdate;
	},
	//当前时间 时分秒，日期
	getDetailedDate: function() {
		var date = new Date();
		var obj = {
			YY:date.getFullYear(),
			MM:date.getMonth() + 1,
			//MM:new Array('一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月')[this.month-1];
			DD:date.getDate(),
			WW:new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六")[date.getDay()],
			HH:date.getHours() < 10 ? "0" + date.getHours() : date.getHours(),
			mm:date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(),
			ss:date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds()
		}
		return obj
	},
	//解决浮点数计算不准确 默认保留6位小数
	signFigures: function(num, rank = 6) {
		if(!num) return(0);
		const sign = num / Math.abs(num);
		const number = num * sign;
		const temp = rank - 1 - Math.floor(Math.log10(number));
		let ans;
		if(temp > 0) {
			ans = parseFloat(number.toFixed(temp));
		} else if(temp < 0) {
			const temp = Math.pow(10, temp);
			ans = Math.round(number / temp) * temp;
		} else {
			ans = Math.round(number);
		}
		return(ans * sign);
	},

	//小数位取整  保留两位
	mathRound:function(x, num) {
		return Math.round(x * Math.pow(10, num)) / Math.pow(10, num);
	},

	//判断两个数组是否相等  ，返回值 Boolean
	arrayEqual：function(arr1,arr2){
		if (arr1 === arr2) return true;
	    if (arr1.length != arr2.length) return false;
	    for (var i = 0; i < arr1.length; ++i) {
	        if (arr1[i] !== arr2[i]) return false;
	    }
	    return true;
	},

	//深度拷贝，支持常见类型
	deepClone：function(values){
		var copy;
	    // Handle the 3 simple types, and null or undefined
	    if (null == values || "object" != typeof values) return values;
	    // Handle Date
	    if (values instanceof Date) {
	        copy = new Date();
	        copy.setTime(values.getTime());
	        return copy;
	    }
	    // Handle Array
	    if (values instanceof Array) {
	        copy = [];
	        for (var i = 0, len = values.length; i < len; i++) {
	            copy[i] = deepClone(values[i]);
	        }
	        return copy;
	    }
	    // Handle Object
	    if (values instanceof Object) {
	        copy = {};
	        for (var attr in values) {
	            if (values.hasOwnProperty(attr)) copy[attr] = deepClone(values[attr]);
	        }
	        return copy;
	    }
	    throw new Error("Unable to copy values! Its type isn't supported.");
	},

	//将现金转换成大小写中文
	digitUppercase：function(n){
		var fraction = ['角', '分'];
	    var digit = [
	        '零', '壹', '贰', '叁', '肆',
	        '伍', '陆', '柒', '捌', '玖'
	    ];
	    var unit = [
	        ['元', '万', '亿'],
	        ['', '拾', '佰', '仟']
	    ];
	    var head = n < 0 ? '欠' : '';
	    n = Math.abs(n);
	    var s = '';
	    for (var i = 0; i < fraction.length; i++) {
	        s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
	    }
	    s = s || '整';
	    n = Math.floor(n);
	    for (var i = 0; i < unit[0].length && n > 0; i++) {
	        var p = '';
	        for (var j = 0; j < unit[1].length && n > 0; j++) {
	            p = digit[n % 10] + unit[1][j] + p;
	            n = Math.floor(n / 10);
	        }
	        s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
	    }
	    return head + s.replace(/(零.)*零元/, '元')
	        .replace(/(零.)+/g, '零')
	        .replace(/^整$/, '零元整');
	},

	//格式化开始时间到当前时间已过多久   返回值String
	formatPassTime:function(startTime){
		var currentTime = Date.parse(new Date()),
	        time = currentTime - startTime,
	        day = parseInt(time / (1000 * 60 * 60 * 24)),
	        hour = parseInt(time / (1000 * 60 * 60)),
	        min = parseInt(time / (1000 * 60)),
	        month = parseInt(day / 30),
	        year = parseInt(month / 12);
	    if (year) return year + "年前"
	    if (month) return month + "个月前"
	    if (day) return day + "天前"
	    if (hour) return hour + "小时前"
	    if (min) return min + "分钟前"
	    else return '刚刚'
	},

	//格式化现在时间到设定的时间之间，相差多久  返回值 String
	formatRemainTime:function(){
		var startDate = new Date(); //开始时间
	    var endDate = new Date(endTime); //结束时间
	    var t = endDate.getTime() - startDate.getTime(); //时间差
	    var d = 0,
	        h = 0,
	        m = 0,
	        s = 0;
	    if (t >= 0) {
	        d = Math.floor(t / 1000 / 3600 / 24);
	        h = Math.floor(t / 1000 / 60 / 60 % 24);
	        m = Math.floor(t / 1000 / 60 % 60);
	        s = Math.floor(t / 1000 % 60);
	    }
	    return d + "天 " + h + "小时 " + m + "分钟 " + s + "秒";
	},

	//根据cookie名获取cookie
	getCookie：function(name){
		var arr = document.cookie.replace(/\s/g, "").split(';');
	    for (var i = 0; i < arr.length; i++) {
	        var tempArr = arr[i].split('=');
	        if (tempArr[0] == name) {
	            return decodeURIComponent(tempArr[1]);
	        }
	    }
	    return '';
	},

	//获取浏览器类型和版本号
	getExplore：function(){
		var sys = {},
	        ua = navigator.userAgent.toLowerCase(),
	        s;
	    (s = ua.match(/rv:([\d.]+)\) like gecko/)) ? sys.ie = s[1]:
	        (s = ua.match(/msie ([\d\.]+)/)) ? sys.ie = s[1] :
	        (s = ua.match(/edge\/([\d\.]+)/)) ? sys.edge = s[1] :
	        (s = ua.match(/firefox\/([\d\.]+)/)) ? sys.firefox = s[1] :
	        (s = ua.match(/(?:opera|opr).([\d\.]+)/)) ? sys.opera = s[1] :
	        (s = ua.match(/chrome\/([\d\.]+)/)) ? sys.chrome = s[1] :
	        (s = ua.match(/version\/([\d\.]+).*safari/)) ? sys.safari = s[1] : 0;
	    // 根据关系进行判断
	    if (sys.ie) return ('IE: ' + sys.ie)
	    if (sys.edge) return ('EDGE: ' + sys.edge)
	    if (sys.firefox) return ('Firefox: ' + sys.firefox)
	    if (sys.chrome) return ('Chrome: ' + sys.chrome)
	    if (sys.opera) return ('Opera: ' + sys.opera)
	    if (sys.safari) return ('Safari: ' + sys.safari)
	    return 'Unkonwn'
	},

	//根据keyCode获取键名(键盘事件),
	getKeyName:function(keycode){
		var keyCodeMap = {
		    8: 'Backspace',
		    9: 'Tab',
		    13: 'Enter',
		    16: 'Shift',
		    17: 'Ctrl',
		    18: 'Alt',
		    19: 'Pause',
		    20: 'Caps Lock',
		    27: 'Escape',
		    32: 'Space',
		    33: 'Page Up',
		    34: 'Page Down',
		    35: 'End',
		    36: 'Home',
		    37: 'Left',
		    38: 'Up',
		    39: 'Right',
		    40: 'Down',
		    42: 'Print Screen',
		    45: 'Insert',
		    46: 'Delete',

		    48: '0',
		    49: '1',
		    50: '2',
		    51: '3',
		    52: '4',
		    53: '5',
		    54: '6',
		    55: '7',
		    56: '8',
		    57: '9',

		    65: 'A',
		    66: 'B',
		    67: 'C',
		    68: 'D',
		    69: 'E',
		    70: 'F',
		    71: 'G',
		    72: 'H',
		    73: 'I',
		    74: 'J',
		    75: 'K',
		    76: 'L',
		    77: 'M',
		    78: 'N',
		    79: 'O',
		    80: 'P',
		    81: 'Q',
		    82: 'R',
		    83: 'S',
		    84: 'T',
		    85: 'U',
		    86: 'V',
		    87: 'W',
		    88: 'X',
		    89: 'Y',
		    90: 'Z',

		    91: 'Windows',
		    93: 'Right Click',

		    96: 'Numpad 0',
		    97: 'Numpad 1',
		    98: 'Numpad 2',
		    99: 'Numpad 3',
		    100: 'Numpad 4',
		    101: 'Numpad 5',
		    102: 'Numpad 6',
		    103: 'Numpad 7',
		    104: 'Numpad 8',
		    105: 'Numpad 9',
		    106: 'Numpad *',
		    107: 'Numpad +',
		    109: 'Numpad -',
		    110: 'Numpad .',
		    111: 'Numpad /',

		    112: 'F1',
		    113: 'F2',
		    114: 'F3',
		    115: 'F4',
		    116: 'F5',
		    117: 'F6',
		    118: 'F7',
		    119: 'F8',
		    120: 'F9',
		    121: 'F10',
		    122: 'F11',
		    123: 'F12',

		    144: 'Num Lock',
		    145: 'Scroll Lock',
		    182: 'My Computer',
		    183: 'My Calculator',
		    186: ';',
		    187: '=',
		    188: ',',
		    189: '-',
		    190: '.',
		    191: '/',
		    192: '`',
		    219: '[',
		    220: '\\',
		    221: ']',
		    222: '\''
		};
		if (keyCodeMap[keycode]) {
	        return keyCodeMap[keycode];
	    } else {
	        console.log('Unknow Key(Key Code:' + keycode + ')');
	        return '';
	    }
	},

	//获取当前操作系统的类型
	getOS：function(){
		var userAgent = 'navigator' in window && 'userAgent' in navigator && navigator.userAgent.toLowerCase() || '';
	    var vendor = 'navigator' in window && 'vendor' in navigator && navigator.vendor.toLowerCase() || '';
	    var appVersion = 'navigator' in window && 'appVersion' in navigator && navigator.appVersion.toLowerCase() || '';

	    if (/mac/i.test(appVersion)) return 'MacOSX'
	    if (/win/i.test(appVersion)) return 'windows'
	    if (/linux/i.test(appVersion)) return 'linux'
	    if (/iphone/i.test(userAgent) || /ipad/i.test(userAgent) || /ipod/i.test(userAgent)) 'ios'
	    if (/android/i.test(userAgent)) return 'android'
	    if (/win/i.test(appVersion) && /phone/i.test(userAgent)) return 'windowsPhone'
	},

	//邮箱格式验证    返回值boolean
	isEmail：function(str){
		return /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(str);
	},

	//判断对象是否是一个空的对象 返回值boolean
	isEmptyObject：function(obj){
		if (!obj || typeof obj !== 'object' || Array.isArray(obj))
	        return false
	    return !Object.keys(obj).length;
	},

	//判断省份证号是否正确  返回值boolean
	isIdCard：function(str){
		return /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(str)
	},

	//判断当前号码是否是正确的手机号 返回值boolean
	isPhoneNum：function(str){
		return /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(str);
	},

	//判断该当前url地址是否正确
	isUrl：function(str){
		return /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i.test(str);
	},

	//获取当前元素距离文档(document)的位置
	offset：function(ele){
		var pos = {
	        left: 0,
	        top: 0
	    };
	    while (ele) {
	        pos.left += ele.offsetLeft;
	        pos.top += ele.offsetTop;
	        ele = ele.offsetParent;
	    };
	    return pos;
	},

	//将url地址参数转换成对象
	parseQueryString：function(url){
		url = url == null ? window.location.href : url
	    var search = url.substring(url.lastIndexOf('?') + 1)
	    if (!search) {
	        return {}
	    }
	    return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
	},

	//生成随机颜色
	randomColor：function(){
		return '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).slice(-6);
	},

	//生成指定范围内的随机数
	randomNum：function(min, max){
		return Math.floor(Math.random() * (max-min+1) )+ min;
	},

	//设置cookie  键 值 过期时间
	setCookie：function(name, value, days){
		var date = new Date();
	    date.setDate(date.getDate() + days);
	    document.cookie = name + '=' + value + ';expires=' + date;
	},

	//删除cookie  依赖setCookie函数
	removeCookie：function(name){
		setCookie(name, '1', -1);
	},

	//获取页面滚动条到顶部的距离
	getScrollTop：function(){
		return (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
	},

	//设置滚动条顶部的距离
	setScrollTop：function(value){
		window.scrollTo(0, value);
    	return value;
	},

	//在duration时间内，滚动条平滑滚动到to指定位置		依赖getScrollTop ,setScrollTop 和 requestAnimFrame 函数
	scrollTo:function(to, duration){
		if (duration < 0) {
	        setScrollTop(to);
	        return
	    }
	    var diff = to - getScrollTop();
	    if (diff === 0) return
	    var step = diff / duration * 10;
	    requestAnimationFrame(
	        function () {
	            if (Math.abs(step) > Math.abs(diff)) {
	                setScrollTop(getScrollTop() + diff);
	                return;
	            }
	            setScrollTop(getScrollTop() + step);
	            if (diff > 0 && getScrollTop() >= to || diff < 0 && getScrollTop() <= to) {
	                return;
	            }
	            scrollTo(to, duration - 16);
	        });
	},

	//对象序列化
	stringfyQueryString：function(obj){
		if (!obj) return '';
	    var pairs = [];

	    for (var key in obj) {
	        var value = obj[key];

	        if (value instanceof Array) {
	            for (var i = 0; i < value.length; ++i) {
	                pairs.push(encodeURIComponent(key + '[' + i + ']') + '=' + encodeURIComponent(value[i]));
	            }
	            continue;
	        }

	        pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
	    }

	    return pairs.join('&');
	},

	/*H5软键盘缩回、弹起回调  
	  当软件键盘弹起会改变当前 window.innerHeight，监听这个值变化
	  downCb 当软键盘弹起后，缩回的回调
	  upCb 当软键盘弹起的回调
	*/
	windowResize:function(downCb, upCb){
		var clientHeight = window.innerHeight;
		downCb = typeof downCb === 'function' ? downCb : function () {}
		upCb = typeof upCb === 'function' ? upCb : function () {}
		window.addEventListener('resize', () => {
			var height = window.innerHeight;
			if (height === clientHeight) {
				downCb();
			}
			if (height < clientHeight) {
				upCb();
			}
		});
	}

};

var requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();


