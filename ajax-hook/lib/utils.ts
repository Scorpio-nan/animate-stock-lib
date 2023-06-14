//@ts-nocheck
/**
 * uuid 生成器
 * @param min 
 * @param max 
 * @returns 
 */
export function uuid(min:number, max:number) {
    var ORIGINAL = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-';
    var str = '';
    var range = Math.round(Math.random() * (max - min)) + min;
    for (var i = 0; i < range; i++) {
        var pos = Math.round(Math.random() * (ORIGINAL.length - 1));
        str += ORIGINAL[pos];
    }
    return str;
}


/**
 * 格式化时间
 * @param fmt 
 * @returns 
 */
export function dateFormat(fmt:string) {
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
}


/**
 * 判断对象上面是否有某个属性
 * @param obj 
 * @param element 
 * @returns 
 */
export function has(obj: any, element: string) {
    return  Object.prototype.hasOwnProperty.call(obj, element)
}


/**
 * 判断数据类型
 * @param para 
 * @returns 
 */
export function typeOf(para:any) {
    const str = Object.prototype.toString.call(para)
    return str.slice(8, str.length - 1).toLocaleLowerCase();
}


/**
 * get 请求提取里面的参数
 * @param url 
 * @returns 
 */
export function queryString(url:string) {
    const search = url.substring(url.lastIndexOf('?') + 1)
    if (!search) {
        return {}
    }
    return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');
}

/**
 * 构建 headers
 * @param headers 
 * @returns 
 */
export function headerStruct(headers: Record<string, any>) {
    const arr: any[] = [];
    for (let i in headers) {
        arr.push({
            name: i,
            demo: headers[i],
            remark: '',
            key: uuid(16, 22)
        })
    }
    return arr;
}


/**
 * 构建请求参数
 * @param request 
 * @param arr 
 */
export function paramsStruct(request: any, arr:any[] = []) {
    for (let i in request) {
        const isObj = typeOf(request[i]) == 'object' || typeOf(request[i]) == 'array';
        var obj:Record<string, any> = {
            name: i,
            remark: '',
            demo: isObj ? '' : request[i],
            required: false,
            type: typeOf(request[i]),
            key: uuid(16, 22)
        }
        if (typeOf(request[i]) == 'object') {
            obj.children = paramsStruct(request[i]);
        } 
        else if (typeOf(request[i]) == 'array') {
            for (let j = 0; j < request[i].length; j++) {
                obj.children = paramsStruct(request[i][j]);
            }
        }
        arr.push(obj);
    }
    return arr;
}


/**
 * 构建返回值
 * @param response 
 * @param arr 
 */
export function responseStruct(response: any, arr:any[] = []) {
    for (let i in response) {
        const isObj = typeOf(response[i]) == 'object' || typeOf(response[i]) == 'array';
        var obj:Record<string, any> = {
            name: i,
            remark: '',
            demo: isObj ? '' : response[i],
            required: false,
            type: typeOf(response[i]),
            key: uuid(16, 22)
        }
        if (typeOf(response[i]) == 'object') {
            obj.children = responseStruct(response[i]);
        } 
        else if (typeOf(response[i]) == 'array') {
            for (let j = 0; j < response[i].length; j++) {
                obj.children = responseStruct(response[i][j]);
            }
        }
        arr.push(obj);
    }
    return arr;
}
