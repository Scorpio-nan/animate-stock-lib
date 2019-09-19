var tool = {
	getDateSpan: function(action) {
		var star_time, end_time;
		if (action == "today") {
			star_time = this.getDateBefore(0) + " 00:00:00"
			end_time = this.getDateBefore(0) + " 23:59:59"
		}
		if (action == "yesterday") {
			star_time = this.getDateBefore(1) + " 00:00:00"
			end_time = this.getDateBefore(1) + " 23:59:59"
		}
		if (action == "lastweek") {
			star_time = this.getDateBefore(7) + " 00:00:00"
			end_time = this.getDateBefore(0) + " 23:59:59"
		}
		if (action == "lastmonth") {
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
		var dd = new Date();  
	    dd.setDate(dd.getDate()+n);
	    var y = dd.getFullYear();  
	    var m = (dd.getMonth()+1)<10 ? ('0'+(dd.getMonth()+1)) : (dd.getMonth()+1);  
	    var d = dd.getDate() <10 ? ('0'+ dd.getDate()) :dd.getDate();  
	    return y+"-"+m+"-"+d;
	},

	//获取当前时间
	getTodayBegin: function() {
		var date = new Date();
		var month = date.getMonth() + 1;
		var strDate = date.getDate();
		if (month >= 1 && month <= 9) {
			month = "0" + month;
		}
		if (strDate >= 0 && strDate <= 9) {
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
		if (month >= 1 && month <= 9) {
			month = "0" + month;
		}
		if (strDate >= 0 && strDate <= 9) {
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
		if (month >= 1 && month <= 9) {
			month = "0" + month;
		}
		if (strDate >= 0 && strDate <= 9) {
			strDate = "0" + strDate;
		}
		var currentdate = date.getFullYear() + "-" + month + "-" + strDate;
		return currentdate;
	},
	//当前时间 时分秒，日期
	getDetailedDate: function() {
		var date = new Date();
		var obj = {
			YY: date.getFullYear(),
			MM: date.getMonth() + 1,
			//MM:new Array('一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月')[this.month-1];
			DD: date.getDate(),
			WW: new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六")[date.getDay()],
			HH: date.getHours() < 10 ? "0" + date.getHours() : date.getHours(),
			mm: date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(),
			ss: date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds()
		}
		return obj
	},
	//解决浮点数计算不准确 默认保留6位小数
	signFigures: function(num, rank = 6) {
		if (!num) return (0);
		const sign = num / Math.abs(num);
		const number = num * sign;
		const temp = rank - 1 - Math.floor(Math.log10(number));
		let ans;
		if (temp > 0) {
			ans = parseFloat(number.toFixed(temp));
		} else if (temp < 0) {
			const temp = Math.pow(10, temp);
			ans = Math.round(number / temp) * temp;
		} else {
			ans = Math.round(number);
		}
		return (ans * sign);
	},

	//小数位取整  保留两位
	mathRound: function(x, num) {
		return Math.round(x * Math.pow(10, num)) / Math.pow(10, num);
	},

	//判断两个数组是否相等  ，返回值 Boolean
	arrayEqual: function(arr1, arr2) {
		if (arr1 === arr2) return true;
		if (arr1.length != arr2.length) return false;
		for (var i = 0; i < arr1.length; ++i) {
			if (arr1[i] !== arr2[i]) return false;
		}
		return true;
	},

	//深度拷贝，支持常见类型
	deepClone: function(values) {
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
	digitUppercase: function(n) {
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
	formatPassTime: function(startTime) {
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
	formatRemainTime: function(endTime) {
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
	getCookie: function(name) {
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
	getExplore: function() {
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
	getKeyName: function(keycode) {
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
	getOS: function() {
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
	isEmail: function(str) {
		return /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(str);
	},

	//判断对象是否是一个空的对象 返回值boolean
	isEmptyObject: function(obj) {
		if (!obj || typeof obj !== 'object' || Array.isArray(obj))
			return false
		return !Object.keys(obj).length;
	},

	//判断省份证号是否正确  返回值boolean
	isIdCard: function(str) {
		return /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(str);
	},

	//判断当前号码是否是正确的手机号 返回值boolean
	isPhoneNum: function(str) {
		return /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(str);
	},
	//匹配国际电话号码
	phoneCheck:function(str){
		return /\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{1,14}$/.test(str);
	},
	//判断该当前url地址是否正确
	isUrl: function(str) {
		return /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i.test(str);
	},

	//获取当前元素距离文档(document)的位置
	offset: function(ele) {
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
	parseQueryString: function(url) {
		url = url == null ? window.location.href : url
		var search = url.substring(url.lastIndexOf('?') + 1)
		if (!search) {
			return {}
		}
		return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
	},

	//生成随机颜色
	randomColor: function() {
		return '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).slice(-6);
	},

	//生成指定范围内的随机数
	randomNum: function(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	},

	//设置cookie  键 值 过期时间
	setCookie: function(name, value, days) {
		var date = new Date();
		date.setDate(date.getDate() + days);
		document.cookie = name + '=' + value + ';expires=' + date;
	},

	//删除cookie  依赖setCookie函数
	removeCookie: function(name) {
		setCookie(name, '1', -1);
	},

	//获取页面滚动条到顶部的距离
	getScrollTop: function() {
		//return (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
		var scrollPos;
		if (window.pageYOffset) {
			scrollPos = window.pageYOffset;
		} else if (document.compatMode && document.compatMode != 'BackCompat') {
			scrollPos = document.documentElement.scrollTop;
		} else if (document.body) {
			scrollPos = document.body.scrollTop;
		}
		return scrollPos;
	},

	//设置滚动条顶部的距离
	setScrollTop: function(value) {
		window.scrollTo(0, value);
		return value;
	},

	//在duration时间内，滚动条平滑滚动到to指定位置		依赖getScrollTop ,setScrollTop 和 requestAnimFrame 函数
	scrollTo: function(to, duration) {
		if (duration < 0) {
			setScrollTop(to);
			return
		}
		var diff = to - getScrollTop();
		if (diff === 0) return
		var step = diff / duration * 10;
		requestAnimationFrame(
			function() {
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
	stringfyQueryString: function(obj) {
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
	windowResize: function(downCb, upCb) {
		var clientHeight = window.innerHeight;
		downCb = typeof downCb === 'function' ? downCb : function() {}
		upCb = typeof upCb === 'function' ? upCb : function() {}
		window.addEventListener('resize', () => {
			var height = window.innerHeight;
			if (height === clientHeight) {
				downCb();
			}
			if (height < clientHeight) {
				upCb();
			}
		});
	},

	//判断当前设备是手持设备还是客户端	 手持设备返回 0 ，客户端返回 1
	browserRedirect: function() {
		var sUserAgent = navigator.userAgent.toLowerCase();
		var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
		var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
		var bIsMidp = sUserAgent.match(/midp/i) == "midp";
		var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
		var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
		var bIsAndroid = sUserAgent.match(/android/i) == "android";
		var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
		var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
		if (!(bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM)) {
			return false;
		}
		//是手持设备
		return true;
	},

	//正则表达式替换		例：将<>, 替换
	RepalaceStr: function() {
		return text.replace(/[<>,]/g, function(match, pos, orgtext) {
			switch (match) {
				case '<':
					return '(';
				case '>':
					return ')';
				case ',':
					return '，';
			}
		})
	},

	//最高效率求数组里面最大，最小值  传1取最大值，传0取最小值
	MaxMinNum: function(arr, m) {
		if (m == 1) {
			return Math.max.apply(Math, arr);
		} else {
			return Math.min.apply(Math, arr);
		}
	},
	//随机生成数字和字母的组合
	randomWord: function(randomFlag, min, max) {
		var str = "",
			range = min,
			arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
		// 随机产生
		if (randomFlag) {
			range = Math.round(Math.random() * (max - min)) + min;
		}
		for (var i = 0; i < range; i++) {
			var pos = Math.round(Math.random() * (arr.length - 1));
			str += arr[pos];
		}
		return str;
	},
	//获取本周，上周，本月，上月时间   依赖makedate（）
	querySubmit(timer) {
		var Today = new Date();
		var weekday = new Date();
		var lastweekstart = new Date();
		var lastweekend = new Date();
		var monthstart = new Date();
		var lastmonthstart = new Date();
		var lastmonthend = new Date();

		weekday.setDate(Today.getDate() - 6); //本周开始时间时间
		lastweekstart.setDate(Today.getDate() - Today.getDay() - 6); //上周开始时间
		lastweekend.setDate(Today.getDate() - Today.getDay()); //上周结束时间
		monthstart.setDate(1); //本月第一天
		lastmonthstart.setMonth(Today.getMonth() - 1); //上月第一天
		lastmonthstart.setDate(1); //上月第一天
		lastmonthend.setDate(monthstart.getDate() - 1); //上月最后一天

		var start_date = new Date();
		var end_date = new Date();
		switch (timer) {
			case 0:
				start_date = makedate(Today);
				end_date = makedate(Today);
				break;
			case 1:
				start_date = makedate(lastweekend);
				end_date = makedate(Today);
				break;
			case 2:
				start_date = makedate(lastweekstart);
				end_date = makedate(lastweekend);
				break;
			case 3:
				start_date = makedate(monthstart);
				end_date = makedate(Today);
				break;
			case 4:
				start_date = this.makedate(lastmonthstart);
				end_date = this.makedate(lastmonthend);
				break;
		};
		return {
			start: start_date,
			end: end_date
		}
	},
	makedate(vals) {
		var val = new Date(vals);
		var month = val.getMonth() + 1;
		var strDate = val.getDate();
		if (month >= 1 && month <= 9) {
			month = "0" + month;
		}
		if (strDate >= 0 && strDate <= 9) {
			strDate = "0" + strDate;
		}
		var dateTemp = val.getFullYear() + "-" + month + "-" + strDate;
		return dateTemp
	},

	//数字的排列组合  从 m 中获取 n 的组合
	getFlagArrs(m, n) {
		if (!n || n < 1) {
			return [];
		}
		var resultArrs = [],
			flagArr = [],
			isEnd = false,
			i, j, leftCnt;
		for (i = 0; i < m; i++) {
			flagArr[i] = i < n ? 1 : 0;
		}
		resultArrs.push(flagArr.concat());
		while (!isEnd) {
			leftCnt = 0;
			for (i = 0; i < m - 1; i++) {
				if (flagArr[i] == 1 && flagArr[i + 1] == 0) {
					for (j = 0; j < i; j++) {
						flagArr[j] = j < leftCnt ? 1 : 0;
					}
					flagArr[i] = 0;
					flagArr[i + 1] = 1;
					var aTmp = flagArr.concat();
					resultArrs.push(aTmp);
					if (aTmp.slice(-n).join("").indexOf('0') == -1) {
						isEnd = true;
					}
					break;
				}
				flagArr[i] == 1 && leftCnt++;
			}
		}
		return resultArrs;
	},
	//从 m 中 获取 n 的组合
	arrayCombine(callback, itemNum, targetArr) {
		if (!targetArr || !targetArr.length) {
			return [];
		}
		var len = targetArr.length;
		var resultArrs = [];
		if (len == itemNum) {
			resultArrs.push(targetArr);
			return callback(resultArrs);
		} else if (len < itemNum) {
			return callback(resultArrs);
		}
		var flagArrs = this.getFlagArrs(len, itemNum);
		while (flagArrs.length) {
			var flagArr = flagArrs.shift();
			var combArr = [];
			for (var i = 0; i < len; i++) {
				flagArr[i] && combArr.push(targetArr[i]);
			}
			resultArrs.push(combArr);
		}
		callback(resultArrs);
	},
	//将秒数转换成日期格式   （开奖时间）
	myTimeStamp: function(second_time) {

		var time = parseInt(second_time);
		var second = parseInt(second_time) % 60;
		var min = parseInt(second_time / 60);

		if (second < 10) {
			second = '0' + second;
		}
		if (min >= 10) {
			min = min % 60;
			time = min + ":" + second + "";
			var hour = parseInt(parseInt(second_time / 60 / 60));
		} else {
			time = '0' + min + ":" + second + "";
		}

		if (hour > 0) {
			hour = hour % 24
			time = hour + "时:" + min + ":" + second;
			var day = parseInt(parseInt(parseInt(second_time / 60) / 60) / 24);
		}
		if (day > 0) {
			time = day + "天" + hour + "时" + min + "分" + second + "";
		}
		return time;
	},

	//判断当前手持设备是否是爱疯叉
	isIphoneX: function() {
		if((/iphone/gi.test(navigator.userAgent) && (screen.height == 812 && screen.width == 375)) ||
		   (/iphone/gi.test(navigator.userAgent) && (screen.height == 896 && screen.width == 414)) ||
		   (/iphone/gi.test(navigator.userAgent) && (Math.floor(screen.height/screen.width*100) == 216))
		){
			return true;
		}
		return false;
	},

	//判断两个时间之间相差的天数    需要先把时间转换成  2018-06-23 00:00:00  (dataFormat库)
	daysBetween(sDate1, sDate2) {
		var time1 = Date.parse(new Date(sDate1));
		var time2 = Date.parse(new Date(sDate2));
		var nDays = Math.abs(parseInt((time2 - time1) / 1000 / 3600 / 24));
		return nDays;
	},

	//随机生成多少位的字符串，用于制作token
	randomString: function(len) {　　
		len = len || 32;　　
		var $chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';　　
		var maxPos = $chars.length;　　
		var pwd = '';　　
		for (i = 0; i < len; i++) {
			//0~32的整数
			　　　　
			pwd += $chars.charAt(Math.floor(Math.random() * (maxPos + 1)));　　
		}　　
		return pwd;
	},

	//将html转换成字符串格式   (前后端传值时需要)
	htmlEncodeByRegExp: function(str) {
		var s = "";
		if (str.length == 0) return "";
		s = str.replace(/&/g, "&amp;");
		s = s.replace(/</g, "&lt;");
		s = s.replace(/>/g, "&gt;");
		s = s.replace(/ /g, "&nbsp;");
		s = s.replace(/\'/g, "&#39;");
		s = s.replace(/\"/g, "&quot;");
		return s;
	},

	//将字符串解码成html格式
	htmlDecodeByRegExp: function(str) {
		var s = "";
		if (str.length == 0) return "";
		s = str.replace(/&amp;/g, "&");
		s = s.replace(/&lt;/g, "<");
		s = s.replace(/&gt;/g, ">");
		s = s.replace(/&nbsp;/g, " ");
		s = s.replace(/&#39;/g, "\'");
		s = s.replace(/&quot;/g, "\"");
		return s;
	},

	//将多维数组转换成一维数组    
	unid: function(arr) {
		var arr1 = (arr + '').split(','); //将数组转字符串后再以逗号分隔转为数组
		var arr2 = arr1.map(function(x) {
			return Number(x);
		});
		return arr2;
	},
	/*
	 * @ele  监听对象 
	 * @type 事件名称
	 * @handle回调函数
	 */
	addHandler: function(ele, type, handler) {
		if (ele.addEventListener) {
			ele.addEventListener(type, handler)
		} else if (ele.attachEvent) {
			ele.attachEvent('on' + type, handler)
		} else {
			ele['on' + type]
		}
	},
	//移除事件监听
	removeHandler: function(ele, type, handler) {
		if (ele.removeEventListener) {
			ele.removeEventListener(type, handler)
		} else if (ele.attachEvent) {
			ele.detachEvent('on' + type, handler)
		} else {
			ele['on' + type]
		}
	},
	//响应式字体大小    依赖fontAdapt函数     750设计稿  1rem = 100px
	getFontSize: function() {
		var doc = document,
			win = window;
		var docEl = doc.documentElement,
			resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
			recalc = function() {
				var clientWidth = docEl.clientWidth;
				if (!clientWidth) return;
				//如果屏幕大于750（750是根据我效果图设置的，具体数值参考效果图），就设置clientWidth=750，防止font-size会超过100px
				if (clientWidth > 750) {
					clientWidth = 750
				}
				//设置根元素font-size大小
				docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
			};
		//屏幕大小改变，或者横竖屏切换时，触发函数
		win.addEventListener(resizeEvt, recalc, false);
		//文档加载完成时，触发函数
		doc.addEventListener('DOMContentLoaded', recalc, false);
	},

	//将数组里面的2进制数转换成10进制
	binaryArrayToNumber: function(arr) {
		var str = arr.join('');
		str.toString(2);
		return parseInt(str, 2);
	},

	//求一个数组里面的所有数的最小公倍数
	smallestCommons: function(arr) {
		//判断是否为质数
		var isPrime = function(n) {
			for (var i = 2; i < n; i++) {
				if (n % i === 0) return false;
			}
			return true;
		};
		//分解为质因数
		var getPrime = function(n) {
			var result = [],
				primes = [];
			for (var i = 2; i <= n; i++) {
				if (isPrime(i)) primes.push(i);
			}
			while (!isPrime(n)) {
				for (i = 0; i < primes.length; i++) {
					if (n % primes[i] === 0) {
						n = n / primes[i];
						result.push(primes[i]);
						break;
					}
				}
			}
			result.push(n);
			return result;
		};

		var primes = [];
		var begin = Math.min(arr[0], arr[1]);
		var end = Math.max(arr[0], arr[1]);
		//提取每个数的质因数
		for (var i = begin; i < end + 1; i++) {
			primes.push(getPrime(i));
		}

		//找出公共质因数
		var public_primes = [];
		for (i = 0; i < primes.length; i++) {
			for (var j = 0; j < primes[i].length; j++) {
				public_primes.push(primes[i][j]);
				//将之后数组中的相同质因数删除
				for (var k = i + 1; k < primes.length; k++) {
					if (primes[k].indexOf(primes[i][j]) !== -1) {
						primes[k].splice(primes[k].indexOf(primes[i][j]), 1);
					}
				}
			}
		}
		var result = 1;
		for (i = 0; i < public_primes.length; i++) {
			result *= public_primes[i];
		}
		return result;
	},

	//判断一个数被开方之后是整数还是小数   整数true，小数false
	isSquare: function(n) {
		if (n < 0) return false;
		return Math.sqrt(n).toString().indexOf('.') < 0;
	},

	//将阿拉伯数字替换成罗马数字显示
	convert: function(num) {
		var a = [
			["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"],
			["", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"],
			["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"],
			["", "M", "MM", "MMM"]
		];
		var i = a[3][Math.floor(num / 1000)];
		var j = a[2][Math.floor(num % 1000 / 100)];
		var k = a[1][Math.floor(num % 100 / 10)];
		var l = a[0][num % 10];
		return i + j + k + l;
	},

	//JS防抖功能  scroll，resize等高频繁操作的时候
	/*
	 *	@func  function 监听事件的回调
	 *	@wait	 number	多久触发一次
	 *	@inmmediate		boolean	是否是及时触发
	 * eg:document.addEventLinster('scroll',debounce(function(){},1000,true),false);
	 */
	debounce:function(func, wait, immediate) {
		var timeout;
		return function() {
			var context = this,
				args = arguments;
			var later = function() {
				timeout = null;
				if (!immediate) func.apply(context, args);
			};
			var callNow = immediate && !timeout;
			if (!timeout) {
				clearTimeout(timeout);
				timeout = setTimeout(later, wait);
			}
			if (callNow) func.apply(context, args);
		};
	},
	
	//银行卡序列化    4位一个空格
	bankCardSerialization:function(str){
		return str.replace(/\s/g, '').replace(/(.{4})/g, "$1 ");
	},
	
	//银行卡只显示后4位 
	bankCardRef:function(str){
		return str.replace(/\s/g,'').replace(/(\d{4})\d+(\d{4})$/, "**** **** **** $2");
	},
	
	/*
	* APP版本更新对比
	* ov  旧版本  string  1.0.0
	* nv  新版本  string  2.5.0
	* return      boolean
	**/
	compareVersion:function (ov, nv) {
		if(!ov || !nv || ov == "" || nv == "") {
			return false;
		}
		var b = false,
			ova = ov.split(".", 4),
			nva = nv.split(".", 4);
		for(var i = 0; i < ova.length && i < nva.length; i++) {
			var so = ova[i],
				no = parseInt(so),
				sn = nva[i],
				nn = parseInt(sn);
			if(nn > no || sn.length > so.length) {
				return true;
			} else if(nn < no) {
				return false;
			}
		}
		if(nva.length > ova.length && 0 == nv.indexOf(ov)) {
			return true;
		}
	},
	
	// 获取当前网页的信息
	getClientInfo:function(){
		var s = "";
		s += " 网页可见区域宽："+ document.body.clientWidth;
		s += "\n 网页可见区域高："+ document.body.clientHeight;
		s += "\n 网页可见区域宽："+ document.body.offsetWidth + " (包括边线和滚动条的宽)";
		s += "\n 网页可见区域高："+ document.body.offsetHeight + " (包括边线的宽)";
		s += "\n 网页正文全文宽："+ document.body.scrollWidth;
		s += "\n 网页正文全文高："+ document.body.scrollHeight;
		s += "\n 网页被卷去的高(ff)："+ document.body.scrollTop;
		s += "\n 网页被卷去的高(ie)："+ document.documentElement.scrollTop;
		s += "\n 网页被卷去的左："+ document.body.scrollLeft;
		s += "\n 网页正文部分上："+ window.screenTop;
		s += "\n 网页正文部分左："+ window.screenLeft;
		s += "\n 屏幕分辨率的高："+ window.screen.height;
		s += "\n 屏幕分辨率的宽："+ window.screen.width;
		s += "\n 屏幕可用工作区高度："+ window.screen.availHeight;
		s += "\n 屏幕可用工作区宽度："+ window.screen.availWidth;
		s += "\n 你的屏幕设置是 "+ window.screen.colorDepth +" 位彩色";
		s += "\n 你的屏幕设置 "+ window.screen.deviceXDPI +" 像素/英寸";
		return s;
	},
	
	//对多个数组进行排列组合 
	Combol:function(arr){
		var sarr = [[]];
		for (var i = 0; i < arr.length; i++) {
			var tarr = [];
			for (var j = 0; j < sarr.length; j++)
				for (var k = 0; k < arr[i].length; k++)
					tarr.push(sarr[j].concat(arr[i][k]));
			sarr = tarr;
		} 
		return sarr;
	},
	
	//
    //递归排列
    // 从 arr[1...n] 中任选 num(0 < num <= n) 个数的所有排列
    //
	recursion_permutate:function(arr, num){
		var r = [];
        (function f(t, a, n) {
            if (n == 0) return r.push(t);
            for (var i = 0, l = a.length; i < l; i++) {
                f(t.concat(a[i]), a.slice(0, i).concat(a.slice(i + 1)), n - 1);
            }
        })([], arr, num);
        return r;
	},
	
	//在数组里面选3个进行双数组合  
	/*
	 * [0,1]     001, 110
	 * [0,1,2]   001, 002, 110, 112, 220, 221
	 */
	
	arrayFunCombin:function(strArray){
		var len=strArray.length;
		var newArray=new Array();
		for(var i=0;i<len;i++){
			for(var j=0;j<len;j++){
				for(var k=0;k<len;k++){
					if(strArray[i] == strArray[j] && strArray[i] == strArray[k]) continue;
					newArray.push(strArray[i]+","+strArray[j]+","+strArray[k]);
				}
			}
		}
		return newArray.filter(a => {
			a = a.split(',');
			if(a[0] === a[1]) return true;
		});
	},
	
	//将dom转换成字符串输出
	/*
	 * dom  document.getElementById();
	 **/
	getDomToString:function(dom){
		var serilaiz = new XMLSerializer();
		return serilaiz.serializeToString(dom);
	},
	
	//时间秒转换成  时:分:秒
	formatSeconds:function(value){
		var secondTime = parseInt(value);// 秒
        var minuteTime = 0;// 分
        var hourTime = 0;// 小时
        if(secondTime > 60) {
            minuteTime = parseInt(secondTime / 60);
            secondTime = parseInt(secondTime % 60);
            if(minuteTime > 60) {
                hourTime = parseInt(minuteTime / 60);
                minuteTime = parseInt(minuteTime % 60);
            }
        }
        var result = " " + parseInt(secondTime) + " 秒";
        if(minuteTime > 0) {
            result = " " + parseInt(minuteTime) + " 分" + result;
        }
        if(hourTime > 0) {
            result = " " + parseInt(hourTime) + " 小时" + result;
        }
        return result;
	},
	
	//将秒数时间秒转换成  天:时:分:秒
	/** 
	 * @param  {number} 150               
	 */
	SecondToDate:function(msd){
		var time =msd
		if (null != time && "" != time) {
			if (time > 60 && time < 60 * 60) {
				time = parseInt(time / 60.0) + "分钟" + parseInt((parseFloat(time / 60.0) -
					parseInt(time / 60.0)) * 60) + "秒";
			}
			else if (time >= 60 * 60 && time < 60 * 60 * 24) {
				time = parseInt(time / 3600.0) + "小时" + parseInt((parseFloat(time / 3600.0) -
					parseInt(time / 3600.0)) * 60) + "分钟" +
					parseInt((parseFloat((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60) -
					parseInt((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60)) * 60) + "秒";
			} else if (time >= 60 * 60 * 24) {
				time = parseInt(time / 3600.0/24) + "天" +parseInt((parseFloat(time / 3600.0/24)-
					parseInt(time / 3600.0/24))*24) + "小时" + parseInt((parseFloat(time / 3600.0) -
					parseInt(time / 3600.0)) * 60) + "分钟" +
					parseInt((parseFloat((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60) -
					parseInt((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60)) * 60) + "秒";
			}
			else {
				time = parseInt(time) + "秒";
			}
		}
		return time;
	},
	
	//时间戳转换成正常的日期格式
	/** 
	 * 时间戳格式化函数 
	 * @param  {string} format    格式 
	 * @param  {int}    timestamp 要格式化的时间 默认为当前时间 
	 * @return {string}           格式化的时间字符串 
	 */
	TimestampToDate:function(timestamp){
		
		var date = new Date(timestamp );
        var Y = date.getFullYear() + '-';

        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';

        var D = date.getDate() + ' ';

        var h = date.getHours() + ':';

        var m = date.getMinutes() + ':';

        var s = date.getSeconds();

        return Y+M+D+h+m+s;
	}


};

//数组随机排序     array.shuffle();
Array.prototype.shuffle = function() {
	var input = this;
	for(var i = input.length - 1; i >= 0; i--) {
		var randomIndex = Math.floor(Math.random() * (i + 1));
		var itemAtIndex = input[randomIndex];
		input[randomIndex] = input[i];
		input[i] = itemAtIndex;
	}
	return input;
}
//数组冒泡排序     arr.bubSort()
Array.prototype.bubSort = function() {
	for(let i = 0; i < this.length; i++) {
		for(let j = 0; j < this.length; j++) {
			if(this[i] < this[j]) {
				var temp = this[j];
				this[j] = this[i];
				this[i] = temp;
			}
		}
	}
	return this;
}

//数组快速排序     arr.quickSort()
Array.prototype.quickSort = function() {
	if(this.length <= 1)  {
		return this;
	}
	var pivotIndex = Math.floor(this.length >> 1);
	var pivot = this.splice(pivotIndex, 1)[0];
	var lef =   [],
		rig =   [];
	for(var i = 0; i < this.length; i++)  {
		if(this[i]  < pivot)  {
			lef.push(this[i]);
		} else {
			rig.push(this[i]);
		}
	}
	//递归
	return lef.quickSort().concat(pivot, rig.quickSort()); 
}

//数组插入排序     插入一个数值，并进行排序 (常用斗地主游戏开发)      arr.insertSort(100)
Array.prototype.insertSort = function(a) {
	for(var i = 1; i < this.length; i++)  {
		if(this[i]  >= a)  {
			for(var j = this.length; j > i; j--)  {
				this[j]  = this[j - 1];
			}
			this[i]  = a;
			break;
		}
	}
	if(this[this.length - 1] < a) this.push(a);
	return this;
}

// 数组希尔排序  
Array.prototype.shellSort = function() {
	var gap = Math.ceil(this.length / 2);
	while(gap > 0)  {
		for(var k = 0; k < gap; k++)  {
			var tagArr =   [];
			tagArr.push(this[k]);
			for(var i = k + gap; i < this.length; i = i + gap)  {
				var temp = this[i];
				tagArr.push(temp);
				for(var j = i - gap; j >  -1; j = j - gap)  {
					if(this[j]  > temp)  {
						this[j + gap]  = this[j];
					} else {
						break;
					}
				}
				this[j + gap]  = temp;
			}
		}
		gap = parseInt(gap / 2);
	}
	return this;
}
			

var requestAnimFrame = (function() {
	return window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		function(callback) {
			window.setTimeout(callback, 1000 / 60);
		};
})();