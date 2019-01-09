var express=require("express");
var app=express();
var fs=require("fs");
var bodyParser=require("body-parser");

//// 创建 application/x-www-form-urlencoded 编码解析
//以下用来接受前台post传递过来的字符串
var urlencodeParser=bodyParser.urlencoded({extended:false});

var page2="view/shuiguoku.html";
var page1="view/shuiguodian.html";

app.use(express.static("./public"));
app.use(express.static("./view"));

//引入模块
var luoji=require("./app/luoji");

app.get("/",function (req,res) {  
    res.sendFile(__dirname+"/"+page1);
})

app.get("/",function (req,res) {  
    res.sendFile(__dirname+"/"+page2);
})

app.post("/addPost",urlencodeParser,luoji.addpost);
app.get("/getData",luoji.getdata);



app.listen(81,function () {  
    console.log("81  ok")
})