/**
 * 功能：任意形式的日期时间格式转化。（日期时间形式）与（字符串时间形式）与（时间戳）之间的转换
 * 情况：
 * （日期时间形式）转（时间戳）             示例：format( new Date(),'number' )
 * （日期时间形式）转（字符串时间形式）      示例：format( new Date(),'yyyy-MM-dd HH:mm:ss' )
 * （时间戳）转（日期时间形式）             示例：format( 1578569175547,'date' )
 * （时间戳）转（字符串时间形式）           示例：format( 1578569175547,'yyyy年MM月dd日 HH时mm分ss秒' )
 *      这里的时间戳也可以是字符串          示例：format( '1578569175547','date' ), format( '1578569175547','yyyy年MM月dd日 HH时mm分ss秒 )
 * （字符串时间形式）转（日期时间形式）      示例：format( '2020-01-09 16:05:08', 'date')
 * （字符串时间形式）转（时间戳）           示例：format( '2020年01月09日', 'number' )
 * （字符串时间形式）转（字符串时间形式）    示例：format( '2020年01月09日 16时05分08秒', 'yyyy-MM-dd HH:mm:ss' )
 * @param time   [Date,String]
 *      time参数为字符串时，时间书写顺序必须为 年,月,日,时,分,秒
 *      示例：new Date()； 1532916562571； 2018年10月20日 16时35分28秒； 2018:10:20 16:35:28；
 * @param type  [String]
 *      yyyy代表年份; MM代表月份; dd代表天数; HH代表小时; mm代表分钟; ss代表秒数; e ee eee代表 二 周二 星期二
 *      示例：yyyy-MM-dd HH:mm:ss  yyyy年MM月dd日 HH时mm分ss秒
 * @return  [Date,String]
 */

 export const format = (time, type) => {
    // 先来一个参数校验
    if (type === undefined || type === '' || type === null) {
      console.log('%c param type is requied', 'background:#aaa;color:#bada55')
      return null
    } else if (typeof time === 'number') {
      if (String(time).length !== 13) {
        console.log('%c param time is timestamp but length is not 13', 'background:#aaa;color:#bada55')
        return null
      }
    } else if (typeof time === 'string') {
      if (time.length === 13 && !isNaN(Number(time))) {
        return format(Number(time), type)
      }
    }
  
    if (time instanceof Date) {
      // （日期时间形式）
      if (type === 'number') {
        // 转（时间戳）
        return new Date(time).getTime()
      } else {
        // 转（字符串时间形式）
        return DateToString(time, type)
      }
    } else if (typeof time === 'number') {
      // （时间戳）
      if (type === 'date') {
        // 转（日期时间形式）
        return new Date(time)
      } else {
        // 转（字符串时间形式）
        return DateToString(new Date(time), type)
      }
    } else if (typeof time === 'string') {
      // （字符串时间形式）
      if (type === 'date') {
        // 转（日期时间形式）
        return stringToDate(time)
      } else if (type === 'number') {
        // 转（时间戳）
        return stringToDate(time).getTime()
      } else {
        // 转（字符串时间形式）
        const date = format(time, 'date')
        return format(date, type)
      }
    }
  
    if (time instanceof Date) {
      if (type === undefined) { console.log("%c function format's param type is undefined", 'background:#aaa;color:#bada55'); return null }
      return DateToString(time, type)
    } else if (typeof time === 'string') {
      // const result = stringToDate(time)
      return format(time, type)
    } else {
      console.log("%c function format's param time is not [Date | String] type", 'background:#aaa;color:#bada55')
      return null
    }
  }
  
  /**
  * 功能：将（字符串时间形式）转化为（日期时间形式）
  * @param time     [Date,String]
  *      time参数为字符串时，时间书写顺序必须为 年,月,日,时,分,秒
  *      示例：new Date()； 1532916562571； 2018年10月20日 16时35分28秒； 2018:10:20 16:35:28；
  * @return       [Date]
  */
  function stringToDate(time) {
    if (typeof time !== 'string') { console.log("%c function stringToDate's param time is not String type", 'background:#aaa;color:#bada55'); return null }
  
    time = initStringBlank(time) // 将连续的空格全转化成单个空格
    time = deleteDayAfter(time) // 将"28日"的"28"后面的字符删除，直到遇到空格
  
    const year = time.substring(0, 4)
    const month = time.substring(5, 7) - 1
    const day = time.substring(8, 10)
    const hour = time.substring(11, 13)
    const minute = time.substring(14, 16)
    const second = time.substring(17, 19)
  
    return new Date(year, month, day, hour, minute, second)
  }
  
  /**
  * 功能：将（日期时间形式）的转化为（字符串时间形式）
  * @param date   [Date]
  * @param type  [String]
  *      yyyy,MM,dd,hh,mm,ss 分别代表年,月,日,时,分,秒;
  *      并且规定MM代表月份,mm代表分钟;其他位置,大小写都可以识别
  *      返回结果只会替换第一个匹配到的字符
  * @return    [String]
  */
  function DateToString(date, type) {
    if (!(date instanceof Date)) { console.log("%c function DateTotime's param date is not Date type", 'background:#aaa;color:#bada55'); return null }
    if (!(typeof type === 'string')) { console.log("%c function DateTotime's param type is not String type", 'background:#aaa;color:#bada55'); return null }
  
    const year = date.getFullYear()
    const month = numToTwo(date.getMonth() + 1)
    const day = numToTwo(date.getDate())
    const hour = numToTwo(date.getHours())
    const minute = numToTwo(date.getMinutes())
    const second = numToTwo(date.getSeconds())
    return type.replace(/[yy|YY]{4}/, year).replace(/MM/, month).replace(/[dd|DD]{2}/, day).replace(/[hh|HH]{2}/, hour).replace(/mm/, minute).replace(/[ss|SS]{2}/, second)
  }
  
  /**
  * 功能：将字符串内两格以上的连续空格替换成一个格子的空格
  * @param time  String
  *      所有的数字至少为两位数 09 07
  * @returns {*} String
  */
  function initStringBlank(time) {
    time = time.replace(/ {2}/g, ' ')
    if (time.indexOf('  ') !== -1) {
      time = initStringBlank(time)
    }
    return time
  }
  
  /**
  * 限制：stringToDate的附属函数
  * 功能：将"28日"后面的"28"后面的其他字符全都删掉，直到遇到空格
  * @param time
  */
  function deleteDayAfter(time) {
    if (time.length > 10) {
      if (time.substring(10, 11) !== ' ') {
        time = time.substring(0, 10) + time.substring(11)
        time = deleteDayAfter(time)
      }
      return time
    } else {
      return time
    }
  }
  
  /**
  * 功能：将100以内的数字，格式化转化为两位数形式
  * @param num
  * @return {*}
  */
  function numToTwo(num) {
    if (num < 10) {
      return '0' + num
    } else {
      return num
    }
  }
  
  