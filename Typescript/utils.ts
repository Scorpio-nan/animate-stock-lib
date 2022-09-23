// string 转  bytes
function stringToByte(str:string) {
    var len, c;
    len = str.length;
    var bytes = [];
    for(var i = 0; i < len; i++) {
        c = str.charCodeAt(i);
        if(c >= 0x010000 && c <= 0x10FFFF) {
            bytes.push(((c >> 18) & 0x07) | 0xF0);
            bytes.push(((c >> 12) & 0x3F) | 0x80);
            bytes.push(((c >> 6) & 0x3F) | 0x80);
            bytes.push((c & 0x3F) | 0x80);
        } else if(c >= 0x000800 && c <= 0x00FFFF) {
            bytes.push(((c >> 12) & 0x0F) | 0xE0);
            bytes.push(((c >> 6) & 0x3F) | 0x80);
            bytes.push((c & 0x3F) | 0x80);
        } else if(c >= 0x000080 && c <= 0x0007FF) {
            bytes.push(((c >> 6) & 0x1F) | 0xC0);
            bytes.push((c & 0x3F) | 0x80);
        } else {
            bytes.push(c & 0xFF);
        }
    }
    return new Int8Array(bytes);
}

// string 转  bytes
function StringToBytes ( str:string ) {
    var re = [], idx;
    for(var i = 0; i < str.length; i++)
    {
        idx = str.charCodeAt(i);
        if(idx & 0xff00){
            re.push(idx >> 8);
            re.push(idx & 0xff);
        }else{
            re.push(idx);
        }
    }
    return re;
}


// string 转  affaybuffer
// 字符串转为ArrayBuffer对象，参数为字符串
function str2ab(str:string) {
     var buf = new ArrayBuffer(str.length*2); // 每个字符占用2个字节
     var bufView = new Uint16Array(buf);
     for (var i=0, strLen=str.length; i<strLen; i++) {
          bufView[i] = str.charCodeAt(i);
     }
     return buf;
}