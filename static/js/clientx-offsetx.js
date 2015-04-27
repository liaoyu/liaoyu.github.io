/*
  * author : liaoyu
  * date   : 2014-12-28
*/

// IE 下 window.onclick 不起作用
var t = document.getElementById('positionDiv');
var c = document.getElementById('container');
var log = document.getElementById('log');
var html = "对象positionDiv的属性:<br />";


function computeX(event){
    event = event || window.event;
    
    document.all.x1.value  = event.clientX;
    document.all.x2.value  = event.clientY;
    document.all.x3.value  = getOffset(event).offsetX;
    document.all.x4.value  = getOffset(event).offsetY;
    document.all.x5.value  = event.screenX;
    document.all.x6.value  = event.screenY;
    document.all.x7.value  = event.x;
    document.all.x8.value  = event.y;
    document.all.x9.value  = event.pageX;
    document.all.x10.value = event.pageY;
    document.all.x11.value = getScroll().left;
    document.all.x12.value = getScroll().top;
}

// 跨浏览器获取可视区域大小
function getInner(){
    if(typeof window.innerHeight != 'undefined'){
        return {
            width : window.innerWidth,
            height : window.innerHeight
        }
    }else{
        // IE
        return {
            width : document.documentElement.clientWidth,
            height : document.documentElement.clientHeight
        }
    }
}

// 跨浏览器获取滚动条高度
function getScroll(){
    return {
        // chrome 下 document.documentElement.scrollTop 值为 0 ，而 document.body.scrollTop 为实际的值，firefox 下反之
        top : document.body.scrollTop || document.documentElement.scrollTop,
        left : document.body.scrollLeft || document.documentElement.scrollLeft
    }
}

// 获取当前元素距顶部及左边的距离
function getOffsetTL(element){
    var top = element.offsetTop;
    var left = element.offsetLeft;
    var parent = element.offsetParent;
    if(parent != null){
        // 需加入边框的宽度
        top += parent.offsetTop + parent.clientTop;
        left += parent.offsetLeft + parent.clientLeft;
        parent = parent.offsetParent;
    }
    // offsetTop 在 IE 包含边框，chrome 和 firefox 不包含
    return {
        top : top,
        left : left
    }
}

// 解决firefox无法获取 offsetY 的问题
function getOffset(event){
    var target = event.target || event.srcElement;
    if(typeof event.offsetX === 'number'){
        // 在 IE 下，offsetX 和 offsetY 少了左边或者上边边框的宽度
        return {
            offsetX : event.offsetX,
            offsetY : event.offsetY
        }
    }else{
        var offsetTL = getOffsetTL(target);
        return {
            offsetX : event.pageX - offsetTL.left,
            offsetY : event.pageY - offsetTL.top
        }
    }
}

function appendLog(target, attr){
    html += attr + ":\t" + target[attr] + "<br />";
}

document.onclick = computeX;

// positionDiv位置信息
appendLog(t, "clientHeight");
appendLog(t, "clientTop");
appendLog(t, "offsetHeight");
appendLog(t, "offsetLeft");
// 如何父对象未设置position且父对象的父对象仍未设置position(直到body)，则offsetParent为body 
// appendLog(t, "offsetParent");
appendLog(t, "scrollHeight");
appendLog(t, "scrollTop");

// container位置信息
html += "对象container的属性:<br />"
appendLog(c, "scrollHeight");
appendLog(c, "scrollTop");

// 基本信息
html += "其它信息:<br />"
html += "可视区域Width：" + getInner().width + "<br />";
html += "可视区域Height：" + getInner().height + "<br />";

log.innerHTML = html;


/*
    screenX 屏幕绝对位置
    pageY   点击处至页面顶部距离(包含滚动条距离)
    chrome下：
        clientX 与x相等
        clientY 为可视区域至顶部的距离(不含滚动条距离)
        offsetY 为距当前窗口顶部距离(包含滚动条距离)
    Firefox下：
        event.x 未定义
        offsetY 未定义
        clientY 与chrome下一致
    IE8下：
        pageY 未定义
        event.Y 与 chrome 下的 pageY 一致
        clientY 与 chrome 下一致
        offsetY 较 chrome下去除了顶部滚动条的高度(当点击点位于顶部滚动条时为负值，比如滚动条高度为10px时(-10~0))
*/