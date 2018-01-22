//这个模块封装了对数据库的所有操作
var MongoClient = require('mongodb').MongoClient;
// var settings = require("../settings.js");

/**
 * 链接数据库
 * @param callback
 * @private
 */
function _connection(callback){
    var url='mongodb://localhost:27017';

    MongoClient.connect(url, function(err, client) {
        if (err) {
            console.log("数据库连接失败");
            return;
        }
        console.log("数据库连接成功...");
        //使用dbname数据库

        callback(client);


    })
}

/**
 * 插入输入库
 * @param collectionName  集合
 * @param data  数据
 * @param callback  回调函数
 */
exports.insertOne=function (collectionName,json,callback) {
    _connection(function (client) {
        const dbName = 'microplan';
        const db = client.db(dbName)
        db.collection(collectionName).insertOne(json,function(err,result){
            callback(err,result);
            client.close();
        });
    })
}

/**
 * 查询
 * @param collectionName
 * @param json
 * @param callback
 */
exports.find=function (collectionName,json,callback) {

        _connection(function (client) {
            var result = [];
            const dbName = 'microplan';
            const db = client.db(dbName);
            var cursor = db.collection(collectionName).find(json);
            cursor.each(function (err, doc) {
                if (err) {
                    callback(err, null);
                }
                if (doc != null) {
                    result.push(doc);
                } else {
                    callback(null, result);
                    client.close();
                }
            })
        })
}

/**
 * 分页查询
 * @param collectionName
 * @param json
 * @param args
 * @param callback
 */
exports.fenye=function (collectionName,json,args,callback) {
    if (arguments.length==4){
        _connection(function (client) {
            const pageMount=3;
            var result=[];
            const dbName = 'microplan';
            const db = client.db(dbName);
            var cursor=db.collection(collectionName).find(json).limit(pageMount).skip((args-1)*pageMount);
            cursor.each(function (err,doc) {
                if(err){
                    callback(err,null);
                }
                if (doc!=null){
                    result.push(doc);
                }else{
                    callback(null,result);
                    client.close();
                }
            })
        })
    }
}

/**
 * 删除
 * @param collectionName
 * @param json
 * @param callback
 */
exports.deleteMany=function (collectionName,json,callback) {
    _connection(function (client) {
        const dbName = 'microplan';
        const db = client.db(dbName);
        db.collection(collectionName).deleteMany(json,function(err,result){
            callback(err,result);
            client.close();
        })
    })
}

/**
 * 改
 * @param collectionName
 * @param json1
 * @param json2
 * @param callback
 */
exports.updateMany=function (collectionName,json1,json2,callback) {
    _connection(function (client) {
        const dbName='microplan';
        const db=client.db(dbName);
        db.collection(collectionName).updateMany(json1,json2,function (err,results) {
            callback(err,results);
            client.close();
        })
    })
}