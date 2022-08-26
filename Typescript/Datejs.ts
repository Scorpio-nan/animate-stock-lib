interface Idate {
    startTime: string;
    endTime: string;
}

function dateFormat(date:Date) {
    var myyear = date.getFullYear();
    var mymonth = date.getMonth() + 1;
    var myweekday = date.getDate();

    var mounth:string = mymonth < 10 ? '0' + mymonth : String(mymonth);
    var week:string = myweekday < 10 ? '0' + myweekday : String(myweekday);
    return (myyear + "-" + mounth + "-" + week);
}

function fmtdate (fmt:string) {
    var t = new Date();
    var o:Record<string,any> = {
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
}

export const datejs = {
    today ():Idate {
        return {
            startTime: fmtdate('yyyy-MM-dd') + ' 00:00:00',
	 		endTime: fmtdate('yyyy-MM-dd') + ' 23:59:59',
        }
    },
    thisWeek ():Idate {
        var t = new Date();
		var currentDate = t;
		var week = currentDate.getDay();
		var millisecond = 1000 * 60 * 60 * 24;
		var minusDay = week != 0 ? week - 1 : 6;
		var monday = new Date(currentDate.getTime() - (minusDay * millisecond));
		var sunday = new Date(monday.getTime() + (6 * millisecond));  
        return {
            startTime: dateFormat(monday) + ' 00:00:00',
			endTime: dateFormat(sunday) + ' 23:59:59'
        }
    },
    thisMonth ():Idate {
        var currentDate = new Date();
		var currentMonth = currentDate.getMonth();
		var currentYear = currentDate.getFullYear();
		var firstDay = new Date(currentYear, currentMonth, 1);
		if (currentMonth == 11) {
			currentYear++;
			currentMonth = 0;
		} else {
			currentMonth++;
		}
		var millisecond = 1000 * 60 * 60 * 24;
		var nextMonthDayOne = new Date(currentYear, currentMonth, 1);
		var lastDay = new Date(nextMonthDayOne.getTime() - millisecond);
        return {
            startTime:dateFormat(firstDay) + ' 00:00:00',
			endTime:dateFormat(lastDay) + ' 23:59:59'
        }
    }
}