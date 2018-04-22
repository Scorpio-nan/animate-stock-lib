
//控制按钮频繁点击
var btn = document.querySelector('.btn');
var ClickTime = '',NowTime = '';
btn.onclick = function(){
	NowTime = new Date().getTime();
	if((ClickTime != '' || ClickTime != undefined) && NowTime - ClickTime < 8000){
		alert('您的点击操作太频繁了！')
		return false;
	}else{
		ClickTime = NowTime;
		alert('提交成功！');
	}
}