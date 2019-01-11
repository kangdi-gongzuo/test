var mongodb=require("mongodb");//引入mongodb模块
/* var MongoClient=mongodb.MongoClient;//1、创建MongoClient对象，用来连接数据
var dburl="mongodb://localhost:27017";//2、数据库地址，端口号 */
var db=require("./../mongodb/db")//运算

//添加数据部分
module.exports.addpost=function (req,res) {  
    var obj=req.body;
    obj.time=new Date().getTime()+"";
    console.log("10从前台获取的数据：",obj)

   /*  //关联数据库
    MongoClient.connect(dburl,{useNewUrlParser:true},function (err,db2) {  
        //4、判断是否连接数据库成功
        if (err) {
            //将连接失败的信息1返回给前台
            console.log("连接数据库失败",err)
            //网络中断/数据库地址错误/端口号错误/数据服务没有启动
        }else{
            console.log("数据库连接成功");
            //关联数据库
            var dbase=db2.db("mydb1809");//数据库名 */
            db.insertOne(res,"goods",obj,function (err,result,db) {  
                if (err) {
                    console.log("25数据添加到mongodb失败");
                    res.send({err:0})
                    //将操作失败的信息2返回给前台
                }else{
                    // console.log("28数据添加到mongodb成功",result);
                    console.log("29数据添加到mongodb成功",result.result);
                    res.send(result.result)
                    //7、关闭数据连接
                    db.close();
                    //将操作成功的信息3返回给前台
                }
            })
    
}

//获取数据部分
module.exports.getdata=function (req,res) {  
    var obj=req.query;
    console.log("44getData obj",obj)
    
    db.find(res,"goods",obj,function(err,result,db){
		if(err){
				console.log("48查询数据失败");
				res.send({error:1});
			}else{
				console.log("51查询数据成功");
				console.log("52result:",result);
				res.send(result);
				db.close();
			}
	});
}


//删除数据部分
module.exports.delpost=function (req,res) {  
    var obj=req.body;
    console.log("63前台传过来的ID值",obj);
    var id=mongodb.ObjectId(obj.id);
    var obj2={_id:id};
    console.log(obj,"66数据格式：",typeof obj);
    db.deleteOne(res,"goods",obj2,function (err,result,db) {  
        if (err) {
            console.log("69删除失败");
            res.send({err:0})
        }else{
            // console.log("71删除成功：",result);
            console.log("72删除成功：",result.result);
            res.send(result.result);
            db.close()//关闭数据库
        }
    })
}

module.exports.qrxgpost=function (req,res) {  
    var obj=req.body;
    console.log("82前台传过来的修改信息：",obj);
    var id=mongodb.ObjectId(obj._id)
    // var id=obj._id
    var whereObj={_id:id};
    console.log("84修改条件：",whereObj);
    var qrxgObj={
        $set:obj
    }
    console.log("88修改后的数据",qrxgObj)
    db.updateOne(res,"goods",whereObj,qrxgObj,function (err,result,db) {  
        if (err) {
            console.log("91数据更改失败");
            res.send({err:0})
        }else{
            console.log("94更改成功：",result.result);
            res.send(result.result);
            db.close();
        }
    })
}