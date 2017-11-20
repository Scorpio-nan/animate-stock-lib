// JavaScript Document
/**
 * 设计稿：750px
 * 设备像素比：2（以这个为基准）
 * viewport：device-width
 *
 * 设计为750px
 * 用rem为布局单位，将页面分为7.5份（即是7.5rem）
 * rem = device-width / 7.5
 *
 */

var docEl = document.documentElement;
var designWidth = docEl.getAttribute('data-design-width') || 750;
var rem, width, preWidth, timer;
function setRem() {
    // 判断<html />的宽度
    width = docEl.getBoundingClientRect().width;
    if (width === preWidth) return;
    preWidth = width;

    // 1rem = 1px
    rem = width / designWidth;

    // font-size必须大于12px，所以rem值必须大于12
    rem *= 100;

    docEl.style.fontSize = rem + 'px';
}

function changeRem() {
    setRem();
}

window.addEventListener('resize', function () {
    clearTimeout(timer);
    timer = setTimeout(changeRem, 300);
});
window.addEventListener('orientationchange', function () {
    clearTimeout(timer);
    timer = setTimeout(changeRem, 300);
});

setRem();

