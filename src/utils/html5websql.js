var db;
var log = true;

/**
 * 创建数据库
 * @param {Object} name
 * @param {Object} version
 * @param {Object} callback
 */
export function createDataBase(name, version) {
    version = version || "0.0"
    if (log)
        console.log("创建数据库: " + name + ", 版本: " + version)
    //数据库名称 版本号 描述 数据大小 回调函数(可省略)
    db = openDatabase(name, version, "WEBSQL 数据库", 2 * 1024 * 1024);
    return db;
}

/**
 * 执行SQL
 * @param {Object} sql
 * @param {Object} arg
 * @param {Object} callback
 */
export function exeSql(sql, arg, callback) {
    callback = callback || function () {
    };
    if (!db) {
        return;
    }
    if (!arg) {
        arg = [];
    }
    var err_cb = function (tx, err) {
        if (log)
            console.log("exeSql Error:" + err.message)
        callback(err, tx, "exeSql Error");
    }
    var succ_cb = function (tx, results) {
        if (log)
            console.log("exeSql Succsess: 执行成功")
        callback(null, tx, results);
    }
    db.transaction(function (tx) {
        tx.executeSql(sql, arg, succ_cb, err_cb);
        if (log)
            console.log("exeSql sql: " + sql);
    });
}


