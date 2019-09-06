/**
 * 该js为所有页面都必须加载的js
 * 可以用于全局添加某功能
 */


/**
 * 自动关闭窗口 可根据具体逻辑自定义
 */
function plusReady() {
    //设前景为白色
    plus.navigator.setStatusBarStyle("dark");
    // 开启一直保持程序唤醒状态
    plus.device.setWakelock(true);

    // plus.key.addEventListener(
    //   "backbutton",
    //   function () {
    //     var ws = plus.webview.currentWebview();
    //     var ls = plus.webview.getLaunchWebview();
    //     console.log("--------------")
    //     console.log(ws.id)
    //     console.log(ls.id)
    //     if (ws.webviewPreload == true) {
    //       plus.webview.hide(ws, 'auto');
    //     } else {
    //       plus.webview.close(ws, 'auto');
    //     }
    //   },
    //   false
    // );
}

if (window.plus) {
    plusReady();
} else {
    document.addEventListener("plusready", plusReady, false);
}


if (!Array.prototype.fill) {
    Array.prototype.fill = function (value) {

        // Steps 1-2.
        if (this == null) {
            throw new TypeError("this is null or not defined");
        }

        var O = Object(this);

        // Steps 3-5.
        var len = O.length >>> 0;

        // Steps 6-7.
        var start = arguments[1];
        var relativeStart = start >> 0;

        // Step 8.
        var k = relativeStart < 0 ?
            Math.max(len + relativeStart, 0) :
            Math.min(relativeStart, len);

        // Steps 9-10.
        var end = arguments[2];
        var relativeEnd = end === undefined ?
            len : end >> 0;

        // Step 11.
        var final = relativeEnd < 0 ?
            Math.max(len + relativeEnd, 0) :
            Math.min(relativeEnd, len);

        // Step 12.
        while (k < final) {
            O[k] = value;
            k++;
        }

        // Step 13.
        return O;
    };
}
