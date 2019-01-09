var mongodb=require("mongodb");//引入mongodb模块
var MongoClient=mongodb.MongoClient;//1、创建MongoClient对象，用来连接数据
var dburl="mongodb://localhost:27017";//2、数据库地址，端口号


module.exports.addpost=function (req,res) {  
    var obj=req.body;
    obj.time=new Date().getTime()+"";
    console.log("从前台获取的数据：",obj)

    //关联数据库
    MongoClient.connect(dburl,{useNewUrlParser:true},function (err,db2) {  
        //4、判断是否连接数据库成功
        if (err) {
            //将连接失败的信息1返回给前台
            console.log("连接数据库失败",err)
            //网络中断/数据库地址错误/端口号错误/数据服务没有启动
        }else{
            console.log("数据库连接成功");
            //关联数据库
            var dbase=db2.db("mydb1809");//数据库名
            dbase.collection("goods").insertOne(obj,function (err,result) {  
                if (err) {
                    console.log("数据添加到mongodb失败");
                    res.send({err:0})
                    //将操作失败的信息2返回给前台
                }else{
                    console.log("数据添加到mongodb成功",result);
                    console.log("数据添加到mongodb成功",result.result);
                    res.send(result.result)
                    //7、关闭数据连接
                    db2.close();
                    //将操作成功的信息3返回给前台
                }
            })
        }
    })
}


module.exports.getdata=function (req,res) {  }