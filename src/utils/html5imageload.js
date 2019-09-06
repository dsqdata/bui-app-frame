var imageload = {
    /*<img>设置图片
     *1.从本地获取,如果本地存在,则直接设置图片
     *2.如果本地不存在则联网下载,缓存到本地,再设置图片
     * */
    imgLoadNet: function (loadUrl, callback, force) {
        if (loadUrl == null) return;

        if (force === undefined || force === null) {
            force = false;
        }
        //图片下载成功 默认保存在本地相对路径的"_downloads"文件夹里面, 如"_downloads/logo.jpg"
        var filename = loadUrl.substring(loadUrl.lastIndexOf("/") + 1, loadUrl.length);
        var relativePath = "_downloads/" + filename;
        //检查图片是否已存在
        plus.io.resolveLocalFileSystemURL(relativePath, function (entry) {
            if (force) {
                plus.io.resolveLocalFileSystemURL(relativePath, function (entry) {
                    entry.remove(function (entry) {
                        imageload.processNet(relativePath, callback)
                    }, function (e) {
                        //console.log("文件删除失败=" + relativePath);
                    });
                });
            } else {
                callback(plus.io.convertLocalFileSystemURL(relativePath))
            }
        }, function (e) {
            //创建下载任务
            imageload.processNet(loadUrl, relativePath, callback)
        });
    },


    processNet: function (loadUrl, relativePath, callback) {
        var dtask = plus.downloader.createDownload(loadUrl, {}, function (d, status) {
            if (status == 200) {
                callback(plus.io.convertLocalFileSystemURL(relativePath))
            } else {
                //console.log("下载失败=" + status + "==" + relativePath);
                if (relativePath != null) {
                    plus.io.resolveLocalFileSystemURL(relativePath, function (entry) {
                        entry.remove(function (entry) {
                            //console.log("文件删除成功==" + relativePath);
                        }, function (e) {
                            //console.log("文件删除失败=" + relativePath);
                        });
                    });
                }
            }
        });
        //启动下载任务
        dtask.start();
    }
}

export default imageload;
