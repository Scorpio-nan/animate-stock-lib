var DD = {
	/*
		 * 时间格式化
		 * @param String  'yyyy-MM-dd hh:mm:ss'
		 * @return String  2019-10-01 23:25:01
	 **/
	formatDate(fmt){
		var t = new Date();
		var o = {
	        "M+": t.getMonth() + 1, 
	        "d+": t.getDate(),
	        "h+": t.getHours(), 
	        "m+": t.getMinutes(), 
	        "s+": t.getSeconds(), 
	        "q+": Math.floor((t.getMonth() + 3) / 3),  
	        "S": t.getMilliseconds() 
	    };
	    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (t.getFullYear() + "").substr(4 - RegExp.$1.length));
	    for (var k in o)
	        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	    return fmt;
	},
	/*
		 * 获取今天的前多少天
		 * @param Number  30
		 * @return String  2019-10-01 23:25:01
	 **/
	getBeforeDays(before){
		var t = new Date();
		var n = new Date(t);
		n.setDate(t.getDate() - before);
		var yy = n.getFullYear();
		var MM = n.getMonth() + 1 < 10 ? '0' + n.getMonth() : n.getMonth() + 1;
		var dd = n.getDate() < 10 ? '0' + n.getDate() : n.getDate();
		var hh = n.getHours() < 10 ? '0' + n.getHours() : n.getHours();
		var mm = n.getMinutes() < 10 ? '0' + n.getMinutes() : n.getMinutes();
		var ss = n.getSeconds() < 10 ? '0' + n.getSeconds() : n.getSeconds();

		return yy + '-' + MM + '-' + dd + ' ' + hh + ':' + mm + ':' + ss;
	},
	/*
		 * 获取今天的开始和结束时间
		 * @return Object  
		 *	{
		 *		startTime:2019-10-01 00:00:00,
		 *		endTime:2019-10-01 23:59:59
		 *	}
	 **/
	getTodayTime(){
	 	return {
	 		startTime: this.formatDate('yyyy-MM-dd') + ' 00:00:00',
	 		endTime: this.formatDate('yyyy-MM-dd') + ' 23:59:59',
	 	}
	},
	/*
		 * 获取昨天的开始和结束时间
		 * @return Object  
		 *	{
		 *		startTime:2019-10-01 00:00:00,
		 *		endTime:2019-10-01 23:59:59
		 *	}
	 **/
	getYesterday(){
		var t = new Date();
		var fmt = 'yyyy-MM-dd';
		var o = {
	        "M+": t.getMonth() + 1, 
	        "d+": t.getDate() - 1,
	        "h+": t.getHours(), 
	        "m+": t.getMinutes(), 
	        "s+": t.getSeconds(), 
	        "q+": Math.floor((t.getMonth() + 3) / 3),  
	        "S": t.getMilliseconds() 
	    };
	    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (t.getFullYear() + "").substr(4 - RegExp.$1.length));
	    for (var k in o)
	        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	    return {
	    	startTime:fmt + ' 00:00:00',
	    	endTime:fmt + ' 23:59:59'
	    };
	},

	/*
		 * 获取本周的开始到结束时间
		 * @return Object  
		 *	{
		 *		startTime:2019-10-01 00:00:00,
		 *		endTime:2019-10-01 23:59:59
		 *	}
	 **/
	getCurrentWeek(){
		var t = new Date();
		var currentDate = t;
		var week = currentDate.getDay();
		var month = currentDate.getDate();
		//一天的毫秒数  
		var millisecond = 1000 * 60 * 60 * 24;
		var minusDay = week != 0 ? week - 1 : 6;
		var monday = new Date(currentDate.getTime() - (minusDay * millisecond));
		var sunday = new Date(monday.getTime() + (6 * millisecond));  
		return {
			startTime:this.formatDate(monday) + ' 00:00:00',
			endTime:this.formatDate(sunday) + ' 23:59:59'
		};
	},

	/*
		 * 获取上周的开始到上周的结束时间
		 * @return Object  
		 *	{
		 *		startTime:2019-10-01 00:00:00,
		 *		endTime:2019-10-01 23:59:59
		 *	}
	 **/
	getBeforeOneWeek(){
		var currentDate = new Date();
		var week = currentDate.getDay();
		var month = currentDate.getDate();
		var millisecond = 1000 * 60 * 60 * 24;
		var minusDay = week != 0 ? week - 1 : 6;
		var currentWeekDayOne = new Date(currentDate.getTime() - (millisecond * minusDay));
		var priorWeekLastDay = new Date(currentWeekDayOne.getTime() - millisecond);
		var priorWeekFirstDay = new Date(priorWeekLastDay.getTime() - (millisecond * 6));
		return {
			startTime:this.formatDate(priorWeekFirstDay) + ' 00:00:00',
			endTime:this.formatDate(priorWeekLastDay) + ' 23:59:59'
		};
	},

	/*
		 * 获取本月的开始到今天的结束时间
		 * @return Object  
		 *	{
		 *		startTime:2019-10-01 00:00:00,
		 *		endTime:2019-10-01 23:59:59
		 *	}
	 **/
	getCurrentMonth(){
		var currentDate = new Date();
		var currentMonth = currentDate.getMonth();
		var currentYear = currentDate.getFullYear();
		//求出本月第一天  
		var firstDay = new Date(currentYear, currentMonth, 1);
		//当为12月的时候年份需要加1  
		//月份需要更新为0 也就是下一年的第一个月  
		if (currentMonth == 11) {
			currentYear++;
			currentMonth = 0; //就为  
		} else {
			//否则只是月份增加,以便求的下一月的第一天  
			currentMonth++;
		}
		//一天的毫秒数  
		var millisecond = 1000 * 60 * 60 * 24;
		//下月的第一天  
		var nextMonthDayOne = new Date(currentYear, currentMonth, 1);
		//求出上月的最后一天  
		var lastDay = new Date(nextMonthDayOne.getTime() - millisecond);
		return {
			startTime:this.formatDate(firstDay) + ' 00:00:00',
			endTime:this.formatDate(lastDay) + ' 23:59:59'
		};
	},
	/*
		 * 获取上月的开始到结束时间
		 * @return Object  
		 *	{
		 *		startTime:2019-10-01 00:00:00,
		 *		endTime:2019-10-01 23:59:59
		 *	}
	 **/
	getBeforeOneMonth(){
		//获取当前时间  
		var currentDate = new Date();
		//获得当前月份0-11  
		var currentMonth = currentDate.getMonth();
		//获得当前年份4位年  
		var currentYear = currentDate.getFullYear();
		//获得上一个月的第一天  
		var priorMonthFirstDay = this.getPriorMonthFirstDay(currentYear, currentMonth);
		//获得上一月的最后一天  
		var priorMonthLastDay = new Date(priorMonthFirstDay.getFullYear(), priorMonthFirstDay.getMonth(), this.getMonthDays(priorMonthFirstDay.getFullYear(), priorMonthFirstDay.getMonth()));
		//返回  
		return {
			startTime:this.formatDate(priorMonthFirstDay) + ' 00:00:00',
			endTime:this.formatDate(priorMonthLastDay) + ' 23:59:59'
		};
	},
	/*
		 * 获取某个月有多少天
		 * @year    Number  2019
		 * @month   Number  3	这里不能直接拿当月的时间, 要用需要月份的时间 - 1 个月；要拿正确的日期用下面一个函数
		 * @return 	Number  28  
	 **/
	getMonthDays(year, month){
		//本月第一天 1-31  
		var relativeDate = new Date(year, month, 1);
		//获得当前月份0-11  
		var relativeMonth = relativeDate.getMonth();
		//获得当前年份4位年  
		var relativeYear = relativeDate.getFullYear();
		//当为12月的时候年份需要加1  
		//月份需要更新为0 也就是下一年的第一个月  
		if (relativeMonth == 11) {
			relativeYear++;
			relativeMonth = 0;
		} else {
			//否则只是月份增加,以便求的下一月的第一天  
			relativeMonth++;
		}
		//一天的毫秒数  
		var millisecond = 1000 * 60 * 60 * 24;
		//下月的第一天  
		var nextMonthDayOne = new Date(relativeYear, relativeMonth, 1);
		//返回得到上月的最后一天,也就是本月总天数  
		return new Date(nextMonthDayOne.getTime() - millisecond).getDate();
	},
	/*
		 * 获取某个月有多少天
		 * @year    Number  2019
		 * @month   Number  3	
		 * @return 	Number  28  
	 **/
	getMonthRealDays(year, month){
		//本月第一天 1-31  
		var relativeDate = new Date(year, month - 1, 1);
		//获得当前月份0-11  
		var relativeMonth = relativeDate.getMonth();
		//获得当前年份4位年  
		var relativeYear = relativeDate.getFullYear();
		//当为12月的时候年份需要加1  
		//月份需要更新为0 也就是下一年的第一个月  
		if (relativeMonth == 11) {
			relativeYear++;
			relativeMonth = 0;
		} else {
			//否则只是月份增加,以便求的下一月的第一天  
			relativeMonth++;
		}
		//一天的毫秒数  
		var millisecond = 1000 * 60 * 60 * 24;
		//下月的第一天  
		var nextMonthDayOne = new Date(relativeYear, relativeMonth, 1);
		//返回得到上月的最后一天,也就是本月总天数  
		return new Date(nextMonthDayOne.getTime() - millisecond).getDate();
	},

	/*
		 * 获取本季度的起止日期
		 * @return Object  
		 *	{
		 *		startTime:2019-10-01 00:00:00,
		 *		endTime:2019-10-01 23:59:59
		 *	} 
	 **/
	getCurrentSeason(){
		//获取当前时间  
		var currentDate = new Date();
		//获得当前月份0-11  
		var currentMonth = currentDate.getMonth();
		//获得当前年份4位年  
		var currentYear = currentDate.getFullYear();
		//获得本季度开始月份  
		var quarterSeasonStartMonth = this.getQuarterSeasonStartMonth(currentMonth);
		//获得本季度结束月份  
		var quarterSeasonEndMonth = quarterSeasonStartMonth + 2;


		//获得本季度开始的日期  
		var quarterSeasonStartDate = new Date(currentYear, quarterSeasonStartMonth, 1);
		//获得本季度结束的日期  
		var quarterSeasonEndDate = new Date(currentYear, quarterSeasonEndMonth, this.getMonthDays(currentYear, quarterSeasonEndMonth));
		return {
			startTime:this.formatDate(quarterSeasonStartDate) + ' 00:00:00',
			endTime:this.formatDate(quarterSeasonEndDate) + ' 23:59:59'
		};
	},


	getDateBefore(n) {
		var uom = new Date(new Date() - 0 - n * 86400000);
		if(uom.getDate() >= 0 && uom.getDate() <= 9) {
			uom = uom.getFullYear() + "-" + (uom.getMonth() + 1) + "-0" + uom.getDate();
		} else {
			uom = uom.getFullYear() + "-" + (uom.getMonth() + 1) + "-" + uom.getDate();
		}
		return uom;
	},
	/**
	* 格式化时间
	* @param date  Sun Nov 03 2019 16:18:04 GMT+0800 (中国标准时间)
	* @return String 2019-10-01
	**/
	formatDate(date){
	    var myyear = date.getFullYear();
	    var mymonth = date.getMonth() + 1;
	    var myweekday = date.getDate();
	    if (mymonth < 10) {
	        mymonth = "0" + mymonth;
	    }
	    if (myweekday < 10) {
	        myweekday = "0" + myweekday;
	    }
	    return (myyear + "-" + mymonth + "-" + myweekday);
	},
	/**
	* 返回上一个月的第一天Date类型
	* @param year 年
	* @param month 月
	**/
	getPriorMonthFirstDay(year, month) {
		//年份为0代表,是本年的第一月,所以不能减  
		if (month == 0) {
			month = 11; //月份为上年的最后月份  
			year--; //年份减1  
			return new Date(year, month, 1);
		}
		//否则,只减去月份  
		month--;
		return new Date(year, month, 1); ;
	},
	/**
	 * 获取本季度开始的月份
	 * @param month 需要计算的月份
	 **/
	getQuarterSeasonStartMonth(month){
		var quarterMonthStart = 0;
		var spring = 0; //春  
		var summer = 3; //夏  
		var fall = 6;   //秋  
		var winter = 9; //冬  
		//月份从0-11  
		if (month < 3) {
			return spring;
		}

		if (month < 6) {
			return summer;
		}
		if (month < 9) {
			return fall;
		}
		return winter;
	}
}
