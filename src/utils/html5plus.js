import pageRoute from '../pages'


/**
 * 打开一个webview窗口
 */
export function openPageHtml5(id, extras = {}) {
    // var token = localStorage.getItem("ACCESSTOKEN");
    // if (token === null) {//需要登录
    //   mui.openWindow({
    //     url: "./login.login.html",
    //     id: "login.login"
    //   })
    // } else {
    localStorage.setItem(id, JSON.stringify(extras))
    mui.openWindow({
        url: id + ".html",
        id: id
    })
    // }
}


/**
 * 打开一个webview窗口
 */
export function openPageWeb(id, extras = {}) {
    var page = pageRoute[id]
    var token = localStorage.getItem("ACCESSTOKEN");
    if (page.login && token === null) {//需要登录
        mui.openWindow({
            url: "./login.login.html",
            id: "login.login"
        })
    } else {
        mui.openWindow({
            url: id + ".html",
            id: id,
            extras: extras
        })
    }
}

/**
 * 打开一个webview窗口
 */
export function openPageNav(id, style = {}, extras = {}) {
    var page = pageRoute[id]
    var token = localStorage.getItem("ACCESSTOKEN");
    if (page.login && token === null) {//需要登录
        mui.openWindow({
            url: "./login.login.html",
            id: "login.login"
        })
    } else {
        plus.nativeUI.showWaiting();
        plus.webview.open(
            id + ".html",
            id,
            {
                titleNView: {
                    backgroundColor: "#3e91ff", // 导航栏背景色
                    titleText: page.title, // 导航栏标题
                    titleColor: "#ffffff", // 文字颜色
                    // type: "transparent", // 透明渐变样式
                    autoBackButton: true, // 自动绘制返回箭头
                    splitLine: {
                        // 底部分割线
                        color: "#3e91ff"
                    }
                },
            },
            "slide-in-right",
            420,
            function () {
                plus.nativeUI.closeWaiting();
            }
        );
    }
}


//----------------------------------------------------------------------------------------------------------------------
/**
 * 判断是否为Android平台
 * @returns {Array|{index: number, input: string}}
 */
export function isAndroid() {
    const ua = navigator.userAgent;
    return ua.match(/(Android);?[\s\/]+([\d.]+)?/);
}

/**
 * 判断是否为IOS平台
 * @returns {Array|{index: number, input: string}}
 */
export function isIos() {
    const ua = navigator.userAgent;
    return ua.match(/(iPhone\sOS)\s([\d_]+)/);
}

// var iphone = ua.match(/(iPhone\sOS)\s([\d_]+)/);
// var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
// var wechat = ua.match(/(MicroMessenger)\/([\d\.]+)/i);


/**
 * 使用Mui-NavBar 时候需要处理沉浸式
 */
export function processImmersed() {
    document.addEventListener('plusready', function () {
        console.log("Immersed-UserAgent: " + navigator.userAgent);
    }, false);
    var immersed = 0;
    var ms = (/Html5Plus\/.+\s\(.*(Immersed\/(\d+\.?\d*).*)\)/gi).exec(navigator.userAgent);
    if (ms && ms.length >= 3) {
        immersed = parseFloat(ms[2]);
    }
    window.immersed = immersed;
    window.screenHeight = window.screen.height;
    console.log(immersed)
    // if (!immersed) {
    //   return;
    // }
    var topoffset = '44px';
    // 获取状态栏高度并根据业务需求处理，这里重新计算了子窗口的偏移位置
    topoffset = (immersed + 44) + 'px';

    console.log(topoffset)
    if (document.querySelector("header")) {
        document.querySelector("header").style.height = topoffset;
        document.querySelector("header").style.paddingTop = immersed + "px";
    }
    if (document.querySelector('.mui-content-contain')) {
        document.querySelector('.mui-content-contain').style.paddingTop = topoffset;
    }
    if (document.querySelector('.mui-content-padding')) {
        document.querySelector('.mui-content-padding').style.paddingTop = topoffset;
    }
}


/**
 * 发送自定义事件
 * @param {*} webview
 * @param {*} eventType
 * @param {*} data
 */
export const fire = function (webview, eventType, data) {
    webview &&
    webview.evalJS(`
  document.dispatchEvent(new CustomEvent("${eventType}", {
    detail:${JSON.stringify(data)},
    bubbles: true,
    cancelable: true
  }));
  `);
};


/**
 * 打开一个webview窗口
 */
export function openWebview(config, style = {}, extras = {}) {
    var wv = plus.webview.create(
        config.url,
        config.id,
        {
            top: 0, // 新页面顶部位置
            bottom: 0, // 新页面底部位置
            render: "always",
            popGesture: "hide",
            bounce: "vertical",
            bounceBackground: "#efeff4",
            titleNView: {
                // 详情页原生导航配置
                backgroundColor: "#f7f7f7", // 导航栏背景色
                titleText: config.title, // 导航栏标题
                titleColor: "#000000", // 文字颜色
                type: "transparent", // 透明渐变样式
                autoBackButton: true, // 自动绘制返回箭头
                splitLine: {
                    // 底部分割线
                    color: "#3e91ff"
                }
            },
            ...style
        },
        extras
    );
    var w = plus.nativeUI.showWaiting();
    // 监听窗口加载成功
    wv.addEventListener(
        "loaded",
        function () {
            wv.show("slide-in-right"); // 显示窗口
            w.close();
            w = null;
        },
        false
    );
}

// webview.open  打开得很快 但是不能传参
export function openWebviewFast(url, id, title) {
    plus.nativeUI.showWaiting();
    plus.webview.open(
        url,
        id,
        {
            titleNView: {
                backgroundColor: "#3e91ff", // 导航栏背景色
                titleText: title, // 导航栏标题
                titleColor: "#ffffff", // 文字颜色
                // type: "transparent", // 透明渐变样式
                autoBackButton: true, // 自动绘制返回箭头
                splitLine: {
                    // 底部分割线
                    color: "#3e91ff"
                }
            },
        },
        "slide-in-right",
        420,
        function () {
            plus.nativeUI.closeWaiting();
        }
    );
}

// 预加载页面 速度很快,但是不要加载超过10个
export function preLoad(webviews = []) {
    webviews.map(webview => {
        const fullExtras = {
            webviewPreload: true,
            ...webview.extras
        };
        plus.webview.create(
            webview.url,
            webview.id,
            {
                top: 0, // 新页面顶部位置
                bottom: 0, // 新页面底部位置
                render: "always",
                popGesture: "hide",
                bounce: "vertical",
                bounceBackground: "#efeff4",
                titleNView: {
                    // 详情页原生导航配置
                    backgroundColor: "#f7f7f7", // 导航栏背景色
                    titleText: webview.title, // 导航栏标题
                    titleColor: "#000000", // 文字颜色
                    type: "transparent", // 透明渐变样式
                    autoBackButton: true, // 自动绘制返回箭头
                    splitLine: {
                        // 底部分割线
                        color: "#cccccc"
                    }
                },
                ...webview.style
            },
            fullExtras
        );
    });
}

export function showWebviewById(id) {
    plus.webview.show(id, "slide-in-right", 200);
}
