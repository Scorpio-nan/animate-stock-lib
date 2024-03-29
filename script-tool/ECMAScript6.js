const lib = {
	/**
	 * 将字符串排列组合成不同的字符串    anagrams('abc') -> ['abc','acb','bac','bca','cab','cba']
	 * @param {*} str 
	 * @returns 
	 */
	anagrams: str => {
		if (str.length <= 2) return str.length === 2 ? [str, str[1] + str[0]] : [str];
		return str.split('').reduce((acc, letter, i) => acc.concat(anagrams(str.slice(0, i) + str.slice(i + 1)).map(val => letter + val)), []);
	},

	/**
	 * 求数组的平均数     average([1,2,3]) -> 2
	 * @param {*} arr 
	 * @returns 
	 */
	average: arr => arr.reduce((acc, val) => acc + val, 0) / arr.length,

	/**
	 * 大写每个单词的首字母    capitalizeEveryWord('hello world!') -> 'Hello World!'
	 * @param {*} str 
	 * @returns 
	 */
	capitalizeEveryWord: str => str.replace(/\b[a-z]/g, char => char.toUpperCase()),

	/**
	 * 首字母大写		capitalize('myName', true) -> 'Myname'
	 * @param {*} str 
	 * @param {*} lowerRest 
	 * @returns 
	 */
	capitalize: (str, lowerRest = false) => str.slice(0, 1).toUpperCase() + (lowerRest ? str.slice(1).toLowerCase() : str.slice(1)),

	/**
	 * 查看一个数在数组中出现的次数		countOccurrences([1,1,2,1,2,3], 1) -> 3
	 * @param {*} arr 
	 * @param {*} value 
	 * @returns 
	 */
	countOccurrences: (arr, value) => arr.reduce((a, v) => v === value ? a + 1 : a + 0, 0),

	/**
	 * 过滤数组中的非唯一值    filterNonUnique([1,2,2,3,4,4,5]) -> [1,3,5]
	 * @param {*} arr 
	 * @returns 
	 */
	filterNonUnique: arr => arr.filter(i => arr.indexOf(i) === arr.lastIndexOf(i)),

	/**
	 * 获取最大公约数		gcd (8, 36) -> 4
	 * @param {*} x 
	 * @param {*} y 
	 * @returns 
	 */
	gcd: (x, y) => !y ? x : gcd(y, x % y),

	/**
	 * 范围内的随机整数	 randomIntegerInRange(0, 5) -> 2
	 * @param {*} min 
	 * @param {*} max 
	 * @returns 
	 */	
	randomIntegerInRange: (min, max) => Math.floor(Math.random() * (max - min + 1)) + min,

	/**
	 * 范围内的随机整数      randomInRange(2,10) -> 6.0211363285087005
	 * @param {*} min 
	 * @param {*} max 
	 * @returns 
	 */
	randomInRange: (min, max) => Math.random() * (max - min) + min,

	/**
	 * 随机化数组顺序     shuffle([1,2,3]) -> [2,3,1]
	 * @param {*} arr 
	 * @returns 
	 */
	shuffle: arr => arr.sort(() => Math.random() - 0.5),
	
	/**
	 * 按照字母顺序排列		sortCharactersInString('cabbage') -> 'aabbceg'
	 * @param {*} str 
	 * @returns 
	 */
	sortCharactersInString: str => str.split('').sort((a, b) => a.localeCompare(b)).join(''),

	/**
	 * 求数组总和		sum([1,2,3,4]) -> 10
	 * @param {*} arr 
	 * @returns 
	 */
	sum: arr => arr.reduce((acc, val) => acc + val, 0),

	/**
	 * 数组去重		unique([1,2,2,3,4,4,5]) -> [1,2,3,4,5]
	 * @param {*} arr 
	 * @returns 
	 */
	unique: arr => [...new Set(arr)],

	/**
	 * url 序列化   将参数转换成对象		getUrlParameters('http://url.com/page?name=Adam&surname=Smith') -> {name: 'Adam', surname: 'Smith'}
	 * @param {*} url 
	 * @returns 
	 */
	getUrlParameters: url => url.match(/([^?=&]+)(=([^&]*))/g).reduce((a, v) => (a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1), a), {}),

	/**
	 * 对数组里面的数字进行随机排序, 常用于洗牌算法
	 * @param {*} arr 
	 * @returns 
	 */
	shuffleArray: (arr) => arr.sort(() => Math.random() - 0.5),
	
	/**
	 * 生成随机颜色
	 * @returns 
	 */
	rundomColor: () => '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).slice(-6),

	/**
	 * 判断数据类型
	 * @param {*} para 
	 * @returns 
	 *  console.log(Object.prototype.toString.call("123"))           -------->[object String]
		console.log(Object.prototype.toString.call(123))             -------->[object Number]
		console.log(Object.prototype.toString.call(true))            -------->[object Boolean]
		console.log(Object.prototype.toString.call([1, 2, 3]))       -------->[object Array]
		console.log(Object.prototype.toString.call(null))            -------->[object Null]
		console.log(Object.prototype.toString.call(undefined))       -------->[object Undefined]
		console.log(Object.prototype.toString.call({name: 'Hello'})) -------->[object Object]
		console.log(Object.prototype.toString.call(function () {}))  -------->[object Function]
		console.log(Object.prototype.toString.call(new Date()))      -------->[object Date]
		console.log(Object.prototype.toString.call(/\d/))            -------->[object RegExp]
		console.log(Object.prototype.toString.call(Symbol()))        -------->[object Symbol]
	 */
	type: (para) =>  Object.prototype.toString.call(para),

	/**
	 * 将多维数组转换成 一维数组  
	 * 	arr3 = [
			[1, 2],
			[3, 4],
			[5, [7, [9, 10], 8], 6],
		]
		=>  [ 1, 2, 3, 4, 5, 7, 9, 10, 8, 6 ]
	 * @param {*} arr 
	 * @returns 
	 */
	flatten: arr => arr.reduce((pre,cur) => pre.concat(Array.isArray(cur) ? flatten(cur) : cur), []),


	/**
	 * 将数组按照 x 位分块   arr4 = [1, 2, 3, 4, 5, 6], 3   => [ [ 1, 2, 3 ], [ 4, 5, 6 ] ]
	 * @param {*} arr 
	 * @param {*} size 
	 * @returns 
	 */
	chunk: (arr, size) =>  arr.reduce((res, cur) => (res[res.length - 1].length < size ? res[res.length - 1].push(cur) : res.push([cur]), res),[[]] ),

	
	/**
	 * 统计字符串中重复字符的个数  text = "划水水摸鱼鱼"  =>  { '划': 1, '水': 2, '摸': 1, '鱼': 2 }
	 * @param {*} text 
	 * @returns 
	 */
	countChar: text => {
		text = text.split("");
		return text.reduce((record, c) => {
			record[c] = (record[c] || 0) + 1;
			return record;
		}, {});
	},

	/**
	 * 取数组对象的最大值的一个
	 * [
	 * 	  	{ value:10, key: 'aaa'},
	 * 		{ value:2, key: 'vv'},
	 * 		{ value:8, key: 'ccc'}
	 * ]
	 * @param {*} key 
	 * @returns 
	 * maxItem(arr, 'value')
	 */
	maxItem: (arr, key) => arr.reduce((prev, current) => prev[key] > current[key] ? prev : current),

	/**
	 * 设备类型, true 是 mobile, false 是 pc
	 * @returns 
	 */
	isMobile: () => window.navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i),
	
	/**
	 * 
	 * @param {*} data 
	 * @returns
	 * const list = [
			{id: 1, name: 1, pid: -1, childrenList: [
				{id: 7, name: 7, pid: 1, childrenList: []},
				{id: 8, name: 8, pid: 1, childrenList: []},
				{id: 9, name: 9, pid: 1, childrenList: []},
			]},
			{id: 2, name: 2, pid: -1, childrenList: [
				{id: 3, name: 3, pid: 2, childrenList: []},
				{id: 4, name: 4, pid: 2, childrenList: []},
				{id: 5, name: 5, pid: 2, childrenList: []},
				{id: 6, name: 6, pid: 2, childrenList: []},
			]},
		];
		flatten(list);
		// 下面为输出结果
		[
			{"id":1,"name":1,"pid":-1},
			{"id":7,"name":7,"pid":1},
			{"id":8,"name":8,"pid":1},
			{"id":9,"name":9,"pid":1},
			{"id":2,"name":2,"pid":-1},
			{"id":3,"name":3,"pid":2},
			{"id":4,"name":4,"pid":2},
			{"id":5,"name":5,"pid":2},
			{"id":6,"name":6,"pid":2}
		] 
	 */
	flattenReduce: (data)=> data.reduce((arr, {id, name, pid, childrenList = []})=> arr.concat([{id, name, pid}], flatten(childrenList)), []),

	
	/**
	 * 快速创建序列 (指定范围和步长)
	 * range(0, 4, 1);
	 * [0, 1, 2, 3, 4]
	 */
	range: (start, stop, step) => Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + (i * step)),

	/**
	 * 全排列
	 * permute('abc')
	 * [ 'abc', 'acb', 'bac', 'bca', 'cab', 'cba' ]
	 * 
	 * @param {*} string 
	 * @returns 
	 */
	permute: string => {
		const result = []
		const map = new Map()
		const dfs = (path) => {
			if (path.length === string.length) {
				result.push(path)
				return
			}
			for (let i = 0; i < string.length; i++) {
				if (map.get(string[i])) continue
				map.set(string[i], true)
				path += string[i]
				dfs(path)
				path = path.substring(0, path.length - 1)
				map.set(string[i], false)
			}
		}
		dfs('')
		return result
	},

	/**
	 * 判断对象上面是否有某个属性
	 * @param {*} obj 
	 * @param {*} element 
	 * @returns 
	 */
	has: (obj, element) => Object.prototype.hasOwnProperty.call(obj, element)
}