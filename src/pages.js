const path = require("path");

//生成每页的配置项
module.exports = {
    pages: [
        {
            id: "ship.index",
            entry: path.resolve(__dirname, "./page/index/index.js"), //指向入口文件
            title: "首页"
        },
        {
            id: "ship.login",
            entry: path.resolve(__dirname, "./page/login/login.js"),
            title: "登录",
        },
        {
            id: "ship.phoneLocalhost",
            entry: path.resolve(__dirname, "./page/login/phoneLocalhost.js"),
            title: "手机号归属",
        },
        {
            id: "demo.home",
            entry: path.resolve(__dirname, "./page/demo/home/home.js"),
            title: "首页",
        },
        {
            id: "demo.common",//静态Html文件拷贝
            htmlStatic: true,
            entry: path.resolve(__dirname, "./page/demo/common/login.html")
        },
        {
            id: "demo.news",
            entry: path.resolve(__dirname, "./page/demo/news/news.js"),
            title: "演示加载其它框架"
        },
        {
            id: "demo.point",
            entry: path.resolve(__dirname, "./page/demo/point/point.js"),
            title: "演示引入组件及传值"
        },
        {
            id: "demo.ftrem",
            entry: path.resolve(__dirname, "./page/demo/ftrem/ftrem.js"),
            title: "演示rem自适应"
        },
        {
            id: "demo.views",
            entry: path.resolve(__dirname, "./page/demo/views/views.js"),
            title: "演示vue-router"
        }
    ]
};