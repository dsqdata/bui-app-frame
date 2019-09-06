"use strict";

const path = require("path");
const ip = require("ip");
module.exports = {
    dev: {
        vConsole: false, //是否显示VConsole
        assetsSubDirectory: "static",
        assetsPublicPath: "/",
        host: ip.address(), // can be overwritten by process.env.HOST
        port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
        autoOpenBrowser: false,
        errorOverlay: true,
        notifyOnErrors: true,
        poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-
        useEslint: true,
        showEslintErrorsInOverlay: false,
        devtool: "cheap-module-eval-source-map",
        cacheBusting: true,
        cssSourceMap: true
    },

    build: {
        vConsole: false, //是否显示VConsole
        index: path.resolve(__dirname, "../dist/index.html"),
        assetsRoot: path.resolve(__dirname, "../dist"),
        assetsSubDirectory: "assets",
        assetsPublicPath: "./",
        productionSourceMap: false,
        productionGzip: false,
        productionGzipExtensions: ["js", "css"],
        bundleAnalyzerReport: process.env.npm_config_report
    }
};
