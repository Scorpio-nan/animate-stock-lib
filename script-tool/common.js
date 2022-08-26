
//控制按钮频繁点击
var btn = document.querySelector('.btn');
var ClickTime = '', NowTime = '';
btn.onclick = function () {
	NowTime = new Date().getTime();
	if ((ClickTime != '' || ClickTime != undefined) && NowTime - ClickTime < 8000) {
		alert('您的点击操作太频繁了！')
		return false;
	} else {
		ClickTime = NowTime;
		alert('提交成功！');
	}
}






// 给inpu框录入text，并且手动触发input框的事件
function inputValue(dom, data) {
	var evt = new InputEvent('input', {
		inputType: 'insertText',
		data: data,
		dataTransfer: null,
		isComposing: false
	});
	dom.value = data;
	dom.dispatchEvent(evt);
}

function inputValue(el, value) {
	const prop = HTMLInputElement.prototype;
	const setValue = Object.getOwnPropertyDescriptor(prop, 'value').set;
	setValue.call(el, value);
	const event = new Event('input', { bubbles: true });
	el.dispatchEvent(event);
}


function inputValue(dom, data) {
	let evt = document.createEvent('HTMLEvents');
	evt.initEvent('input', true, true);
	dom.value = data;
	dom.dispatchEvent(evt);
}








const trim = function (string) {
	return (string || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '');
};

/* istanbul ignore next */
export function hasClass(el, cls) {
	if (!el || !cls) return false;
	if (cls.indexOf(' ') !== -1) throw new Error('className should not contain space.');
	if (el.classList) {
		return el.classList.contains(cls);
	} else {
		return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1;
	}
};

/* istanbul ignore next */
export function addClass(el, cls) {
	if (!el) return;
	var curClass = el.className;
	var classes = (cls || '').split(' ');

	for (var i = 0, j = classes.length; i < j; i++) {
		var clsName = classes[i];
		if (!clsName) continue;

		if (el.classList) {
			el.classList.add(clsName);
		} else if (!hasClass(el, clsName)) {
			curClass += ' ' + clsName;
		}
	}
	if (!el.classList) {
		el.setAttribute('class', curClass);
	}
};

/* istanbul ignore next */
export function removeClass(el, cls) {
	if (!el || !cls) return;
	var classes = cls.split(' ');
	var curClass = ' ' + el.className + ' ';

	for (var i = 0, j = classes.length; i < j; i++) {
		var clsName = classes[i];
		if (!clsName) continue;

		if (el.classList) {
			el.classList.remove(clsName);
		} else if (hasClass(el, clsName)) {
			curClass = curClass.replace(' ' + clsName + ' ', ' ');
		}
	}
	if (!el.classList) {
		el.setAttribute('class', trim(curClass));
	}
};

/* istanbul ignore next */
export const getStyle = ieVersion < 9 ? function (element, styleName) {
	if (isServer) return;
	if (!element || !styleName) return null;
	styleName = camelCase(styleName);
	if (styleName === 'float') {
		styleName = 'styleFloat';
	}
	try {
		switch (styleName) {
			case 'opacity':
				try {
					return element.filters.item('alpha').opacity / 100;
				} catch (e) {
					return 1.0;
				}
			default:
				return (element.style[styleName] || element.currentStyle ? element.currentStyle[styleName] : null);
		}
	} catch (e) {
		return element.style[styleName];
	}
} : function (element, styleName) {
	if (isServer) return;
	if (!element || !styleName) return null;
	styleName = camelCase(styleName);
	if (styleName === 'float') {
		styleName = 'cssFloat';
	}
	try {
		var computed = document.defaultView.getComputedStyle(element, '');
		return element.style[styleName] || computed ? computed[styleName] : null;
	} catch (e) {
		return element.style[styleName];
	}
};

/* istanbul ignore next */
export function setStyle(element, styleName, value) {
	if (!element || !styleName) return;

	if (typeof styleName === 'object') {
		for (var prop in styleName) {
			if (styleName.hasOwnProperty(prop)) {
				setStyle(element, prop, styleName[prop]);
			}
		}
	} else {
		styleName = camelCase(styleName);
		if (styleName === 'opacity' && ieVersion < 9) {
			element.style.filter = isNaN(value) ? '' : 'alpha(opacity=' + value * 100 + ')';
		} else {
			element.style[styleName] = value;
		}
	}
};






/**
 * base 64 转 pdf
 */

function base64ToBlob(code) {
	//Base64一行不能超过76字符，超过则添加回车换行符。因此需要把base64字段中的换行符，回车符给去掉，有时候因为存在需要把加号空格之类的换回来，取决于base64存取时的规则。
	code = code.replace(/[\n\r]/g, '');
	var raw = window.atob(code);
	let rawLength = raw.length;
	//转换成pdf.js能直接解析的Uint8Array类型
	let uInt8Array = new Uint8Array(rawLength);
	for (let i = 0; i < rawLength; ++i) {
		uInt8Array[i] = raw.charCodeAt(i);
	}
	return new Blob([uInt8Array], { type: 'application/pdf' });//转成pdf类型
}
let data = 'base64:xxx';
let blob = base64ToBlob(data);
//获取当前url，直接放到iframe就能用，下载同理
let blobURL = window.URL.createObjectURL(blob);











/**
 * desc: base64对象转blob文件对象
 * @param urlData  ：数据的base64对象
 * @param type  ：类型 png,pdf,doc,mp3等;
 * @returns {Blob}：Blob文件对象
 */
function base64ToBlob(urlData, type) {
	let arr = urlData.split(',');
	let array = arr[0].match(/:(.*?);/);
	let mime = (array && array.length > 1 ? array[1] : type) || type;
	// 去掉url的头，并转化为byte
	let bytes = window.atob(arr[1]);
	// 处理异常,将ascii码小于0的转换为大于0
	let ab = new ArrayBuffer(bytes.length);
	// 生成视图（直接针对内存）：8位无符号整数，长度1个字节
	let ia = new Uint8Array(ab);
	for (let i = 0; i < bytes.length; i++) {
		ia[i] = bytes.charCodeAt(i);
	}
	return new Blob([ab], {
		type: mime
	});
}
/**
 * desc: 下载导出文件
 * @param blob  ：返回数据的blob对象或链接
 * @param fileName  ：下载后文件名标记
 * @param fileType  ：文件类 word(docx) excel(xlsx) ppt等
 */
function downloadExportFile(blob, fileName, fileType) {
	let downloadElement = document.createElement('a');
	let href = blob;
	if (typeof blob == 'string') {
		downloadElement.target = '_blank';
	} else {
		href = window.URL.createObjectURL(blob); //创建下载的链接
	}
	downloadElement.href = href;
	downloadElement.download = fileName + '.' + fileType; //下载后文件名
	document.body.appendChild(downloadElement);
	downloadElement.click(); //触发点击下载
	document.body.removeChild(downloadElement); //下载完成移除元素
	if (typeof blob != 'string') {
		window.URL.revokeObjectURL(href); //释放掉blob对象
	}
}

/**
 * desc: base64转文件并下载
 * @param base64 {String} : base64数据
 * @param fileType {String} : 要导出的文件类型png,pdf,doc,mp3等
 * @param fileName {String} : 文件名
 */
function downloadFile(base64, fileName, fileType) {
	let typeHeader = 'data:application/' + fileType + ';base64,' // 定义base64 头部文件类型
	let converedBase64 = typeHeader + base64;  // 拼接最终的base64
	let blob = base64ToBlob(converedBase64, fileType)  // 转成blob对象
	downloadExportFile(blob, fileName, fileType) // 下载文件
}


//downloadFile('你的base64数据','download','.pdf');