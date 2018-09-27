const lib = {
	//将字符串排列组合成不同的字符串    anagrams('abc') -> ['abc','acb','bac','bca','cab','cba']
	anagrams: str => {
		if (str.length <= 2) return str.length === 2 ? [str, str[1] + str[0]] : [str];
		return str.split('').reduce((acc, letter, i) => acc.concat(anagrams(str.slice(0, i) + str.slice(i + 1)).map(val => letter + val)), []);
	},

	//求数组的平均数     average([1,2,3]) -> 2
	average: arr => arr.reduce((acc, val) => acc + val, 0) / arr.length,

	//大写每个单词的首字母    capitalizeEveryWord('hello world!') -> 'Hello World!'
	capitalizeEveryWord: str => str.replace(/\b[a-z]/g, char => char.toUpperCase()),

	//首字母大写		capitalize('myName', true) -> 'Myname'
	capitalize: (str, lowerRest = false) => str.slice(0, 1).toUpperCase() + (lowerRest ? str.slice(1).toLowerCase() : str.slice(1)),

	//查看一个数在数组中出现的次数		countOccurrences([1,1,2,1,2,3], 1) -> 3
	countOccurrences: (arr, value) => arr.reduce((a, v) => v === value ? a + 1 : a + 0, 0),

	//过滤数组中的非唯一值    filterNonUnique([1,2,2,3,4,4,5]) -> [1,3,5]
	filterNonUnique: arr => arr.filter(i => arr.indexOf(i) === arr.lastIndexOf(i)),

	//获取最大公约数		gcd (8, 36) -> 4
	gcd: (x, y) => !y ? x : gcd(y, x % y),

	//范围内的随机整数	 randomIntegerInRange(0, 5) -> 2	
	randomIntegerInRange: (min, max) => Math.floor(Math.random() * (max - min + 1)) + min,

	//范围内的随机整数      randomInRange(2,10) -> 6.0211363285087005
	randomInRange: (min, max) => Math.random() * (max - min) + min,

	//随机化数组顺序     shuffle([1,2,3]) -> [2,3,1]
	shuffle: arr => arr.sort(() => Math.random() - 0.5),
	//按照字母顺序排列		sortCharactersInString('cabbage') -> 'aabbceg'
	sortCharactersInString: str => str.split('').sort((a, b) => a.localeCompare(b)).join(''),

	//求数组总和		sum([1,2,3,4]) -> 10
	sum: arr => arr.reduce((acc, val) => acc + val, 0),

	//数组去重		unique([1,2,2,3,4,4,5]) -> [1,2,3,4,5]
	unique: arr => [...new Set(arr)],

	//url 序列化   将参数转换成对象		getUrlParameters('http://url.com/page?name=Adam&surname=Smith') -> {name: 'Adam', surname: 'Smith'}
	getUrlParameters: url => url.match(/([^?=&]+)(=([^&]*))/g).reduce((a, v) => (a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1), a), {}),

}