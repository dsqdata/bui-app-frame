var update = {
    wgtWaiting: null,

    //检查更新资源
    checkUpdate: function (wgtVer) {

    },
    // 更新应用资源
    installWgt: function (path) {
        plus.nativeUI.showWaiting("安装更新文件...");
        plus.runtime.install(path, {
            force: true
        }, function () {
            plus.nativeUI.closeWaiting();
            plus.nativeUI.alert("应用资源更新完成！", function () {
                plus.runtime.restart();
            });
        }, function (e) {
            plus.nativeUI.closeWaiting();
            plus.nativeUI.alert("安装更新文件失败[" + e.code + "]：" + e.message);
        });
    },

    //下载增量更新资源
    downWgt: function (wgtUrl, newVer) {
        wgtUrl = wgtUrl.replace("client", "").replace(/\\/g, "/");
        this.wgtWaiting = plus.nativeUI.showWaiting("下载更新文件...");
        var task = plus.downloader.createDownload(wgtUrl, {
            filename: "_doc/update/" + newVer + "/"
        }, function (d, status) {
            if (status == 200) {
                this.installWgt(d.filename); // 安装wgt包
            } else {
                plus.nativeUI.alert("下载升级包失败！");
                plus.nativeUI.closeWaiting();
            }
        })
        task.addEventListener("statechanged", function (download, status) {
            switch (download.state) {
            case 2:
                this.wgtWaiting.setTitle("已连接到服务器");
                break;
            case 3:
                var percent = download.downloadedSize / download.totalSize * 100;
                this.wgtWaiting.setTitle("已下载 " + parseInt(percent) + "%");
                break;
            case 4:
                this.wgtWaiting.setTitle("下载完成");
                break;
            }
        });
        task.start();
    }

}

export default update;
