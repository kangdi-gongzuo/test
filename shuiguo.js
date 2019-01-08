var express=require("express");
var app=express();
var fs=require("fs");

var page1="shuiguodian.html";
var page2=""

app.use(express.static("./public/css"))
app.use(express.static("./public/jquery"))



app.listen(81,function () {  
    console.log("81  ok")
})