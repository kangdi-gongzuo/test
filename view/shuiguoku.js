$(function () {  
    tableShow();//判断table内是否有数据
    getData({})//获取所有数据
    $("#add").click(function () {  
        var jianJie=$("#jianJie").val();
        var pirce=$("#pirce").val();
        if (!jianJie||!pirce) {
            if (!jianJie) {
                $("#tishi2").html("物品简介不能为空")
            }else if (!pirce) {
                $("#tishi").html("物品价格不能为空")
            }
        }else{
            myurl="/addPost";
            var obj={
                tpdz:$("#tpdz").val(),
                jianjie:jianJie,
                pirce:pirce,
                zhongLei:$("#zhongLei").val()
            }
            $.post(myurl,obj,function (data) {  
                console.log("添加返回的数据：",data)
            })
        }
    })
})

function getData(obj) {  
    $.ajax({   
        url:"/getData",
        type:"get",
        timeout:0,
        beforeSend:function () {  
            $("#loading").show()
        },
        success:function (data) {  
            show(data)
        },
        error:function () {  
            console.log("40 获取后台数据失败")
        },
        complete:function () {  
            $("#loading").hide()
        }
    })
}


function tableShow() {  
    var trs=$("#tab1 tr");
    console.log(trs);
    if (trs.length<=1) {
        $("#tab").hide()
    }else{
        $("#tab").show()
    }
}