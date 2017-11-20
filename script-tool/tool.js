export default {
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
		this.year = date.getFullYear();
		this.month = date.getMonth() + 1;
		//this.month = new Array('一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月')[this.month-1];
		this.date = date.getDate();
		this.week = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六")[date.getDay()];
		this.hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
		this.minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
		this.second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
		var obj = {
			year: this.year,
			month: this.month,
			date: this.date,
			week: this.week,
			hour: this.hour,
			minute: this.minute,
			second: this.second
		}
		return obj;
	},
	//解决浮点数计算不准确
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
};