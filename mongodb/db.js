var mongodb = require("mongodb");//引入mongodb
var MongoClient = mongodb.MongoClient;
//1.创建MongoClient对象,用来连接数据
//2.数据库地址,端口号
var dbUrl="mongodb://localhost:27017";
var dbName="mydb1809";


//第一版
/*module.exports.insertOne=function(res,cName,obj){
	//3.关联数据库
	MongoClient.connect(dbUrl,{useNewUrlParser:true},function(err,db){//db,关联数据库成功
		//4.判断是否连接数据库成功
		if(err){
			//将连接失败的信息1返回给前台
			console.log("连接数据库失败",err);//网络中断/数据库地址错误/端口号错误/数据服务没有启动
			res.send({error:1});
		}else{
			console.log("数据库连接成功");
			//5.关联数据库
			var dbase = db.db(dbName);//数据库名
	
			//6.dbase要操作的数据库;collection关联集合;insert,如何操作数据(插入)
			dbase.collection(cName).insertOne(obj,function(err,result){
				if(err){
					console.log("数据添加到mongodb失败");
					//将操作失败的信息2返回给前台
					res.send({error:2});
				}else{
					//console.log("数据添加到mongodb成功",result);
					console.log("数据添加到mongodb成功",result.result);
					res.send(result.result);
					//7.关闭数据库连接
					db.close();
					//将操作 成功的信息3返回给前台
				}
			})
		}
	})
}*/

//连接数据库
function connectMGDB(cb,res){
	MongoClient.connect(dbUrl,{useNewUrlParser:true},function(err,db){//db2,关联数据库成功
		//4.判断是否连接数据库成功
		if(err){
			//将连接失败的信息1返回给前台
			console.log("连接数据库失败",err);//网络中断/数据库地址错误/端口号错误/数据服务没有启动
			res.send({error:1});
		}else{
			console.log("数据库连接成功");
			//5.关联数据库
			var dbase = db.db(dbName);//数据库名
			cb(dbase,db);
		}
	})
}

//第二版
/*module.exports.insertOne=function(res,cName,obj,cb){
	connectMGDB(function(dbase,db){
		dbase.collection(cName).insertOne(obj,function(err,result){
			if(err){
				console.log("数据添加到mongodb失败");
				res.send({error:2});
				//将操作失败的信息2返回给前台
			}else{
				//console.log("数据添加到mongodb成功",result);
				console.log("数据添加到mongodb成功",result.result);
				res.send(result.result);
				//7.关闭数据库连接
				db.close();
				//将操作 成功的信息3返回给前台
			}
		});
	},res)
}*/

//终极版
module.exports.insertOne=function(res,cName,obj,cb){
	connectMGDB(function(dbase,db){
		dbase.collection(cName).insertOne(obj,function(err,result){
			cb(err,result,db);
		});
	},res);
}

module.exports.insertMany=function(res,cName,arr,cb){
	connectMGDB(function(dbase,db){
		dbase.collection(cName).insertMany(arr,function(err,result){
			cb(err,result,db);
		});
	},res);
}

module.exports.find=function(res,cName,whereObj,cb){
	///////
/*	var whereObj={
		find:{
			age:{$gt:20}
		},
		sort:{
			age:-1
		},
		limit:3,
		skip:2
	}*/
	//三目运算符
	//whereObj.find(),若find这个属性不存在,则执行,whereObj.find={};
	whereObj.find ? whereObj.find : whereObj.find={};
	whereObj.sort ? whereObj.sort : whereObj.sort={};
	whereObj.limit ? whereObj.limit : whereObj.limit=0;
	whereObj.skip ? whereObj.skip : whereObj.skip=0;
	///////
	
	connectMGDB(function(dbase,db){
		dbase.collection(cName).find(whereObj.find).limit(whereObj.limit).skip(whereObj.skip).sort(whereObj.sort).toArray(function(err,result){
			cb(err,result,db);
		});	
	},res);
}

/////////////////////////
module.exports.deleteOne=function(res,cName,obj,cb){
	connectMGDB(function(dbase,db){
		dbase.collection(cName).deleteOne(obj,function(err,result){
			cb(err,result,db);
		});
	},res);
}

/////////////////////////
module.exports.updateOne=function(res,cName,whereObj,updateObj,cb){
	connectMGDB(function(dbase,db){
		dbase.collection(cName).updateOne(whereObj,updateObj,function(err,result){
			cb(err,result,db);
		});
	},res);
}
