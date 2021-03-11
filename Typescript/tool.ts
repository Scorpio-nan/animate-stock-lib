class Tool{
	public constructor(){};
	//时间格式化		
	/*
	* getRangeDate( -6 );			// 结果：2017-02-09
	* getRangeDate( -6, 'one' );	// 结果：2017-02-09
	* getRangeDate( -6, 'more' ); 	// 结果：["2017-02-09", "2017-02-10", "2017-02-11", "2017-02-12", "2017-02-13", "2017-02-14", "2017-02-15"]
	**/
	public getRangeDate( range: number, type?: string ):string {
        const formatDate = ( time: any ) => {
            // 格式化日期，获取今天的日期
            const Dates = new Date( time );
            const year: number = Dates.getFullYear();
            const month: any = ( Dates.getMonth() + 1 ) < 10 ? '0' + ( Dates.getMonth() + 1 ) : ( Dates.getMonth() + 1 );
            const day: any = Dates.getDate() < 10 ? '0' + Dates.getDate() : Dates.getDate();
            return year + '-' + month + '-' + day;
        };

        const now = formatDate( new Date().getTime() ); // 当前时间
        if(range == 0) return now;
        const resultArr: Array<any> = [];
        let changeDate: string;
        if ( range ) {
            if ( type ) {
                if ( type === 'one' ) {
                    changeDate = formatDate( new Date().getTime() + ( 1000 * 3600 * 24 * range ) );
                }
                if ( type === 'more' ) {
                    if ( range < 0 ) {
                        for ( let i = Math.abs( range ); i >= 0; i-- ) {
                            resultArr.push( formatDate( new Date().getTime() + ( -1000 * 3600 * 24 * i ) ) );
                        }
                    } else {
                        for ( let i = 1; i <= range; i++ ) {
                            resultArr.push( formatDate( new Date().getTime() + ( 1000 * 3600 * 24 * i ) ) );
                        }
                    }
                }
            } else {
                changeDate = formatDate( new Date().getTime() + ( 1000 * 3600 * 24 * range ) );
            }
        }
        return changeDate;
    }
	
}




export function DateFormat(fmt: string = "yyyy-MM-dd hh:mm:ss"): string {
    var d: Date = new Date();
    let o: any = {
        "M+": d.getMonth() + 1,
        "d+": d.getDate(),
        "h+": d.getHours(),
        "m+": d.getMinutes(),
        "s+": d.getSeconds(),
        "q+": Math.floor((d.getMonth() + 3) / 3),
        "S": d.getMilliseconds()
    }
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (d.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (let k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}

/**
 * 获取几天前的日期
 */
export function getDateBefore(n:number):string{
    var dd:Date = new Date();
    dd.setDate(dd.getDate() + n);
    var y = dd.getFullYear();  
	var m = (dd.getMonth()+1)<10 ? ('0'+(dd.getMonth()+1)) : (dd.getMonth()+1);  
    var d = dd.getDate() <10 ? ('0'+ dd.getDate()) :dd.getDate();  
    return y+"-"+m+"-"+d;
}

interface t {
    start_time:string
    end_time:string
}

export enum timeSpan {
    today = "today",
    yestaday = "yestaday",
    lasetweek = "lasetweek",
    week = "week",
    lastmonth = "lastmonth",
    month = "month",
    all = "all"
}

export function getDateSpan(action:string):t{
    var start,end;
    var d:Date = new Date();
    switch(action){
        case "today":
            start = getDateBefore(0) + "00:00:00";
            end = getDateBefore(0) + "23:59:59";
            break;
        case "yestaday":
            start = getDateBefore(1) + " 00:00:00";
			end = getDateBefore(1) + " 23:59:59";
            break;
        case "lasetweek":
            start = getDateBefore(7) + " 00:00:00";
            end = getDateBefore(0) + " 23:59:59";
            break;
        case "week":
            start = getDateBefore(d.getDay()) + " 00:00:00";
            end = getDateBefore(0) + " 23:59:59";
            break;
        case "lastmonth":
            start = getDateBefore(30) + " 00:00:00";
            end = getDateBefore(0) + " 23:59:59";
            break;
        case "month":
            start = getDateBefore(d.getDate()) + " 00:00:00";
            end = getDateBefore(0) + " 23:59:59";
            break;
        case "all":
            start = "2017-01-01 00:00:00";
            end = getDateBefore(0) + " 23:59:59";
            break;
    }
    return {
        start_time:start,
        end_time:start
    }
}

let obj = {};
const $on = (name:string,fn:Function)=>{
    if(!obj[name]){
        obj[name] = [];
    }
    obj[name].push(fn);
}

const $emit = (name:string,val:any = null)=>{
    if(obj[name]){
        obj[name].map((fn)=>{
            fn(val);
        });
    }
}

const $off = (name:string,fn:Function)=>{
    if(obj[name]){
        if(fn){
            let index = obj[name].indexOf(fn);
            if(index > -1){
                obj[name].splice(index,1);
            }           
        }else{
            obj[name].length = 0;
        }  
    }
}

export const Event = {
    $on,
    $emit,
    $off
}


/**
 * 随机生成字符串
 * @param len 生成多少位字符
 */
export function RandomString(len: number = 32): string {
    var str = "",
        range = len,
        arr = ['2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    for (var i = 0; i <= range; i++) {
        var pos = Math.round(Math.random() * (arr.length - 1));
        str += arr[pos];
    }
    return str;
}


/**
 * 将url里面的参数解析出来
 * @param url 需要解析的url
 */
export function QueryString(url:string):any{
    var search = url.substring(url.lastIndexOf('?') + 1)
    if (!search) {
        return {}
    }
    return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');
}
