
var express = require('express')
var bodyParser = require('body-parser');
var app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var db = require("./dao/db")
var utl = require("./utl/utl")


app.get('/',function(req,res){
    res.send("niaho")
    console.log("访问成功")
})

app.post('/addshare',function(req,res){
    let json = req.body
    json.index = utl.random_str()
    console.log(json)
    db.insertOne("task",json,function(err,result){
        res.json(result)
    })
})

app.get('/getshare',function(req,res){
    db.find('task',{},function(err,result){
        res.json(result)
    })
})

app.post('/addcomment',function(req,res){
    let json = req.body
    let index = json.index
    delete json.index
    db.find('task',{"index":index},function(err,result){
        console.log(result)
        let commentArray=result[0].comment ? result[0].comment :[]
        console.log(commentArray)
        commentArray.push(json)
        db.updateMany('task',{"index":index},{$set:{"comment":commentArray}},function(err,result){
            res.json(result)
        })
    })
})
    
app.post('/adduser',function(req,res){
    let json = req.body
    json.index = utl.random_str()
    console.log(json)
    //这里没有查询对比
    db.insertOne("users",json,function(err,result){
        res.json(result)
    })
})

app.post('/login',function(req,res){
    let json = req.body
    console.log(json)
    db.find('users',{username: json.username},function(err,result){
        if (json.password != result[0].password){
            res.json({"state":0,"message":"登录失败"})
        }else{
            res.json({"state":1,"message":"成功"})        
        }
    })

})

    





var server=app.listen(3000,function(){
    var host = server.address().address;
    var port = server.address().port;
    console.log('server listening at http://192.168.1.198', host, port);
})