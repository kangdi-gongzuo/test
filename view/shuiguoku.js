var tempId;//用户记录被修改的那条数据的_id

$(function () {  
    tableShow();//判断table内是否有数据
    getData({})//获取所有数据
    //添加数据
    $("#add").click(function () {  
        var jianJie=$("#jianJie").val();
        var pirce=$("#pirce").val();
        var kuCun=$("#kuCun").val();
        if (!jianJie||!pirce||!kuCun) {
            if (!jianJie) {
                $("#tishi2").html("物品简介不能为空")
            }else if (!pirce) {
                $("#tishi").html("物品价格不能为空")
            }else if (!kuCun) {
                $("#tishi3").html("物品库存不能为空")
            }
        }else{
            myurl="/addPost";
            var obj={
                tpdz:$("#tpdz").val(),
                kuCun:kuCun,
                jianjie:jianJie,
                pirce:pirce,
                zhongLei:$("#zhongLei").val()
            }
            $.post(myurl,obj,function (data) {  
                console.log("添加返回的数据：",data)
                if (data.ok==1) {
                    getData({})
                    $("#tpdz").val("");
                    $("#jianJie").val("");
                    $("#pirce").val("");
                    $("#zhongLei").val("a");
                    $("#kuCun").val("");
                }
            })
        }
    })
    $("#qrxg").click(function () {  
        var jianJie=$("#jianJie").val();
        var pirce=$("#pirce").val();
        var kuCun=$("#kuCun").val();
        if (!jianJie||!pirce||!kuCun) {
            if (!jianJie) {
                $("#tishi2").html("物品简介不能为空")
            }else if (!pirce) {
                $("#tishi").html("物品价格不能为空")
            }else if (!kuCun) {
                $("#tishi3").html("物品库存不能为空")
            }
        }else{
            myurl="/qrxgPost";
            var obj={
                tpdz:$("#tpdz").val(),
                kuCun:kuCun,
                jianjie:jianJie,
                pirce:pirce,
                zhongLei:$("#zhongLei").val(),
                id:tempId
            }
            $.post(myurl,obj,function (data) {  
                console.log("添加返回的数据：",data)
                if (data.ok==1) {
                    getData({})
                    $("#tpdz").val("");
                    $("#jianJie").val("");
                    $("#pirce").val("");
                    $("#zhongLei").val("a");
                    $("#kuCun").val("");

                    $("#qrxg").hide();
                    $("#add").show();
                }
            })
        }
    })
})


//获取数据
function getData(obj) {  
    $.ajax({   
        url:"/getData",
        type:"get",
        timeout:0,
        beforeSend:function () {  
            $("#loading").show()
        },
        success:function (data) {  
            showPage(data)
        },
        error:function () {  
            console.log("40 获取后台数据失败")
        },
        complete:function () {  
            $("#loading").hide()
        }
    })
}


//渲染页面
function showPage(arr) {  
    console.log("51返回的数据：",arr)
    var trtd="";
    for (var i = 0; i < arr.length; i++) {
        trtd+=`<tr>
        <td><img src="img/${arr[i].tpdz}" alt=""></td>
        <td>${arr[i].jianjie}</td>
        <td>${arr[i].pirce}</td>
        <td>${arr[i].kuCun}</td>
        <td>${sel(arr[i].zhongLei)}</td>
        <td>
            <span onclick=del("${arr[i]._id}")>删除 </span>
            <span  onclick=xiuGai(${JSON.stringify(arr[i])})>修改</span>
        </td>
        </tr>`
    }
    $("tbody").html(trtd)
}

//渲染类别
function sel(k) {  
    var obj={
        b:"冰箱",
        c:"电脑",
        d:"手机"
    }
    console.log("74 种类",obj[k])
    return obj[k];
}

//行内删除
function del(id) {  
    console.log("93 删除",id);
    var obj={id:id}
    $.post("/delpost",obj,function (data) {  
        console.log("删除后返回的值：",data)
        getData({})
    })
}


//修改部分
function xiuGai(obj) {  
    console.log("104修改返回值：",obj);
    tempId=obj._id;
    $("#tpdz").val(obj.tpdz);
    $("#jianJie").val(obj.jianjie);
    $("#pirce").val(obj.pirce);
    $("#zhongLei").val(obj.zhongLei);
    $("#kuCun").val(obj.kuCun);
    $("#add").hide();
    $("#qrxg").show();
}

//判断是否有商品
function tableShow() {  
    var trs=$("#tab1 tr");
    console.log(trs);
    if (trs.length<=1) {
        $("#tab").hide()
    }else{
        $("#tab").show()
    }
}