/**
 * net插件
 *
 * var token = localStorage.getItem("ACCESSTOKEN");
 */
// import axios from "axios"

var net = {}
var dev = false;
var log = true;
net.baseUrl = "http://39.106.132.201:9090/";
// net.baseUrl="http：//localhost:1111/"

// net.requestGet = async function (data) {
//   var token = localStorage.getItem("ACCESSTOKEN");
//   const conf = {
//     method: "get",
//     headers: {
//       Authorization: token
//     },
//     ...data
//   }
//   return await axios(conf)
// }
//
// net.requestPost = async function (data) {
//   var token = localStorage.getItem("ACCESSTOKEN");
//   const conf = {
//     method: "post",
//     headers: {
//       "x-access-token": token
//     },
//     ...data
//   }
//   return await axios(conf)
// }

/**
 * AJAX 基础请求
 * @param {Object} url
 * @param {Object} type
 * @param {Object} token
 * @param {Object} data
 * @param {Object} beforeSend
 * @param {Object} success
 * @param {Object} errors
 * @param {Object} complete
 * @param {Object} waiting
 */
net.ajax = function (url, type, token, data, beforeSend, success, errors, complete, waiting) {
    var err
    if (!errors) {
        err = function (data) {
            localStorage.clear();
            localStorage.setItem("ACCESSTOKEN", "")
            mui.openWindow({
                url: "./login.login.html",
                id: "login.login"
            });
        };
    } else {
        err = errors;
    }
    var headers = {
        "Access-Control-Allow-Headers": "X-Requested-With",
        "Content-Type": "application/json;charset=UTF-8",
        "Authorization": "Bearer " + token
    }
    if (url.indexOf("login") != -1 || url.indexOf("registe") != -1 || url.indexOf("forget") != -1 || url.indexOf("isRepeat") != -1 || url.indexOf("code") != -1 || url.indexOf("phoneLocal") != -1) {
        headers = {
            "Access-Control-Allow-Headers": "X-Requested-With",
            "Content-Type": "application/x-www-form-urlencoded",
        };
    }

    mui.ajax(url, {
        data: data,
        type: type,
        // crossDomain: true,
        headers: headers,
        beforeSend: function () {
            if (window.plus) {
                if (waiting && plus)
                    plus.nativeUI.showWaiting();
            }
        },
        complete: function () {
            if (window.plus) {
                if (waiting && plus)
                    plus.nativeUI.closeWaiting();
            }
        },
        success: function (data) {
            success(data);
        },
        error: err
    });
}

/**
 *  AJAX POST 请求
 * @param {Object} url
 * @param {Object} data
 * @param {Object} success
 * @param {Object} errors
 * @param {Object} waiting
 */
net.post = function (url, data, success, errors, waiting) {
    if (waiting == undefined || waiting) {
        waiting = true;
    }
    var rUrl = net.baseUrl + url
    var token = localStorage.getItem("ACCESSTOKEN");

    if (log) {
        console.log("ajax net post: " + rUrl)
        console.log("ajax net waiting: " + waiting);
    }
    net.ajax(rUrl, "POST", token, data, null, success, errors, null, waiting);
}

/**
 *  AJAX GET 请求
 * @param {Object} url
 * @param {Object} data
 * @param {Object} success
 * @param {Object} errors
 * @param {Object} waiting
 */
net.get = function (url, data, success, errors, waiting) {

    if (waiting == undefined || waiting) {
        waiting = true;
    }
    var rUrl = net.baseUrl + url
    if (data && JSON.stringify(data) !== "{}") {
        var params = Object.keys(data).map(function (key) {
            return encodeURIComponent(key) + "=" + encodeURIComponent(data[key]);
        }).join("&");
        rUrl = rUrl + "?" + params;
    }

    var token = localStorage.getItem("ACCESSTOKEN");

    if (log) {
        console.log("ajax net get: " + rUrl)
        console.log("ajax net waiting: " + waiting);
    }
    net.ajax(rUrl, "GET", token, null, null, success, errors, null, waiting)
}

/**
 * 图片压缩（需要获取本地文件权限）
 * @param {Object} src
 * @param {Object} callback
 */
net.zipImg = function (src, callback) {
    var filename = src.substring(src.lastIndexOf("/") + 1);
    plus.zip.compressImage({
        src: src,
        dst: "_doc/" + filename,
        overwrite: true,
        format: "jpg",
        quality: 80 //图片质量不再修改，以免失真
        //width: "1000px", //这里指定了宽度，同样可以修改
    },
    function (e) {
        callback(e.target);
    },
    function (err) {
        console.log("图片压缩错误!");
    });
}

/**
 * 图片上传
 * @param {Object} url
 * @param {Object} imgPath
 * @param {Object} callback(error,imgPath,data)
 */
net.uploadImg = function (url, imgPath, callback) {
    var rUrl = net.baseUrl + url
    var wt = plus.nativeUI.showWaiting();
    var task = plus.uploader.createUpload(rUrl, {
        method: "POST",
        blocksize: 204800,
        priority: 100,
        timeout: 20
    },
    function (t, status) {
        wt.close(); //关闭等待提示按钮
        if (status == 200) {
            var data = JSON.parse(t.responseText)
            if (callback) {
                callback(null, imgPath, data);
            }
        } else {
            if (callback) {
                callback("图片上传未知错误");
            }
        }
    });

    net.zipImg(imgPath, function (zipSrc) {
        task.addFile(zipSrc, {
            key: "single-file"
        });
        task.start();
    });
}
/**
 * 从相册获取图片
 * @param {Object} callback
 * @param {Object} url
 */
net.albumPhoto = function (callback, url) {
    plus.gallery.pick(function (path) {
        if (url != undefined) {
            net.uploadImg(url, path, callback);
        } else {
            callback(null, path);
        }
    }, function (e) {
        if (log) {
            console.log(e);
        }
    }, {filter: "image", multiple: false});
}
/**
 * 从照相机获取图片
 * @param {Object} callback
 * @param {Object} url
 */
net.cameraPhoto = function (callback, url) {
    var cmr = plus.camera.getCamera();
    var res = cmr.supportedImageResolutions[0];
    var fmt = cmr.supportedImageFormats[0];
    cmr.captureImage(function (p) {
        plus.io.resolveLocalFileSystemURL(p, function (entry) {
            if (url) {
                net.uploadImg(url, entry.toLocalURL(), callback);
            } else {
                callback(null, entry.toLocalURL());
            }
        }, function (e) {
            if (log) {
                console.log(e);
            }
            callback(e);
        });
    }, function (e) {
    }, {
        filename: "_doc/camera/"
    });
}

/**
 * 选择照片(相册、照相机)；如果url存在直接上传
 * @param {Object} callback
 * @param {Object} url
 */
net.selectImg = function (callback, url) {
    if (mui.os.plus) {
        var a = [{
            title: "拍照"
        }, {
            title: "从手机相册选择"
        }];
        plus.nativeUI.actionSheet({
            cancel: "取消",
            buttons: a
        }, function (b) { /*actionSheet 按钮点击事件*/
            switch (b.index) {
            case 0:
                break;
            case 1:
                net.cameraPhoto(callback, url);
                /*拍照*/
                break;
            case 2:
                net.albumPhoto(callback, url);
                /*相册*/
                break;
            default:
                break;
            }
        });
    }
}

net.lazyload = function (obj, callback) {
    var debug = true; // 默认打印调试日志
    if (obj.getAttribute("data-loaded")) {
        return;
    }
    var image_url = obj.getAttribute("data-lazyload");
    debug && console.log(image_url);
    // 1. 转换网络图片地址为本地缓存图片路径，判断该图片是否存在本地缓存
    // http://...jpg -> md5
    // 缓存目录 _downloads/image/(md5).jpg
    var image_md5 = md5(image_url);
    var local_image_url = "_downloads/image/" + image_md5 + ".jpg"; // 缓存本地图片url
    var absolute_image_path = plus.io.convertLocalFileSystemURL(local_image_url); // 平台绝对路径
    // new temp_img 用于判断图片文件是否存在
    var temp_img = new Image();
    temp_img.src = absolute_image_path;
    temp_img.onload = function () {
        debug && console.log("存在本地缓存图片文件" + local_image_url + "，直接显示");

        // 1.1 存在，则直接显示（本地已缓存，不需要淡入动画）
        obj.setAttribute("src", absolute_image_path);
        obj.setAttribute("data-loaded", true);
        obj.classList.add("img-lazyload");

        callback && callback();
        return;
    }
    temp_img.onerror = function () {
        debug && console.log("不存在本地缓存图片文件");
        // 1.2 下载图片缓存到本地
        debug && console.log("开始下载图片" + image_url + " 缓存到本地: " + local_image_url);

        function download_img() {
            var download_task = plus.downloader.createDownload(image_url, {
                filename: local_image_url // filename:下载任务在本地保存的文件路径
            }, function (download, status) {
                if (status != 200) {
                    // 下载失败,删除本地临时文件
                    debug && console.log("下载失败,status" + status);
                    if (local_image_url != null) {
                        plus.io.resolveLocalFileSystemURL(local_image_url, function (entry) {
                            entry.remove(function (entry) {
                                debug && console.log("临时文件删除成功" + local_image_url);
                                // 重新下载图片
                                download_img();
                            }, function (e) {
                                debug && console.log("临时文件删除失败" + local_image_url);
                            });
                        });
                    }
                } else {
                    // 把下载成功的图片显示
                    // 将本地URL路径转换成平台绝对路径
                    obj.setAttribute("src", plus.io.convertLocalFileSystemURL(local_image_url));
                    obj.setAttribute("data-loaded", true);
                    obj.classList.add("img-lazyload");
                    callback && callback();
                }
            });
            download_task.start();
        }

        download_img();
    };
}


export default net;
