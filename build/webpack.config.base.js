const path = require("path");
const utils = require("./utils");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

const multiple = require("../src/pages.js");


// 创建多个实例
const extractCSS = new ExtractTextPlugin("css/[name]-css.css");
const extractLESS = new ExtractTextPlugin("css/[name]-less.css");

function resolve(dir) {
    return path.join(__dirname, "..", dir);
}

const entry = {};
const plugins = [];

const build = {
    assetsRoot: path.resolve(__dirname, "../dist"),
    assetsSubDirectory: "assets",
    assetsPublicPath: "./",
}

// 配置生成多页面
multiple.pages.forEach((value, index) => {
    if (!value.htmlStatic) {
        entry[value.id] = value.entry;
    }
});

multiple.pages.forEach((value, index) => {
    if (!value.htmlStatic) {

        if (!value.template) {
            value.template = path.resolve(__dirname, "../public/index.html"); //指向模板文件
        }
        if (!value.chunks) {
            value.chunks = [value.id, "common"];
        }
        plugins.push(
            new HtmlWebpackPlugin({
                template: value.template, //指向模板文件
                filename: value.id + ".html",
                minify: {
                    removeAttributeQuotes: true, //删除属性的双引号
                    collapseInlineTagWhitespace: true //折叠一行
                },
                chunks: value.chunks,
                hash: true, //hash 为了开发中js有缓存效果，加入hash，这样可以有效避免缓存JS
                title: value.title,
                plusReady: "<script src='html5plus://ready'></script>",
                muiCssString: "<link rel='stylesheet' href='assets/mui/css/mui.min.css'>",
                muiScriptString: "<script src='assets/mui/js/mui.min.js'></script>",
                hash: true //生成带有hash值
            })
        );
    } else {
        plugins.push(
            new CopyWebpackPlugin([
                {
                    from: value.entry,
                    to: "./" + value.id + ".html",
                    toType: "file",
                    ignore: [".*"]
                }
            ])
        );
    }
});


// 复制资源
plugins.push(
    new CopyWebpackPlugin([
        {
            from: path.resolve(__dirname, "../src/assets/myships"),
            to: build.assetsSubDirectory + "/myships",
            ignore: [".*"]
        },
        {
            from: path.resolve(__dirname, "../src/assets/mui"),
            to: build.assetsSubDirectory + "/mui",
            ignore: [".*"]
        }
    ])
)


const webpackConfig = {
    context: path.resolve(__dirname, "../"),
    entry: entry,
    output: {
        path: path.resolve(__dirname, "../dist"),
        filename: "js/[name].js",
        publicPath: "", //指定路径加到静态资源路径前面
    },
    stats: {
        // 如果有 抛异常 Entrypoint mini-css-extract-plugin = *
        //https://github.com/webpack-contrib/mini-css-extract-plugin/issues/39
        entrypoints: false,
        children: false
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: "babel-loader?cacheDirectory", //缓存loader执行结果 发现打包速度已经明显提升了
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: extractCSS.extract({
                    fallback: "style-loader",
                    use: ["css-loader", "less-loader"],
                    publicPath: "../"
                }),
            },
            {
                test: /\.less$/,
                use: extractLESS.extract({
                    fallback: "style-loader",
                    use: ["css-loader", "less-loader"],
                    publicPath: "../"
                }),
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: "url-loader",
                options: {
                    limit: 10000,
                    name: utils.assetsPath("img/[name].[ext]")
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: "url-loader",
                options: {
                    limit: 10000,
                    name: utils.assetsPath("media/[name].[ext]")
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: "url-loader",
                options: {
                    limit: 10000,
                    name: utils.assetsPath("fonts/[name].[ext]")
                }
            },
            {
                test: /\.vue$/,
                loader: "vue-loader"
            }
        ]
    },
    plugins: plugins.concat([
        extractCSS,
        extractLESS,
        new VueLoaderPlugin()
    ]),
    resolve: {
        alias: {
            "@": resolve("src"),
        }
    },
    //https://www.cnblogs.com/ufex/p/8758792.html 参考文章
    optimization: {
        splitChunks: {
            cacheGroups: {
                // 将 `node_modules`目录下被打包的代码到`common/common.js`
                common: {
                    test: /node_modules/,
                    chunks: "initial",  //只对入口文件处理
                    name: "common",
                    minChunks: 5, //表示被引用次数，默认为1；5说明如果项目中引用次数大过5次，则打包成公共模块
                    maxInitialRequests: 5, // 最大的初始化加载次数，默认为1
                    minSize: 0 //表示在压缩前的最小模块大小，默认为0
                }
            }
        }
    }
};

module.exports = webpackConfig;