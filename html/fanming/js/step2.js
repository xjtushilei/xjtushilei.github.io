function ystepInit()
{
$(".ystep").loadStep({
      size: "large",
      color: "green",
      steps: [{
        title: "<div class='text-center' style='top: -20px;left: -30px;position: relative;'>Input</div>",
        content: "Please Input"
      },{
         title: "<div class='text-center' style='top: -20px;left: -30px;position: relative;'>Graph Construction</div>",
        content: "the APK file is disassembled to generate the Dalvik code and a SARG is constructed."
      },{
        title: "<div class='text-center' style='top: -20px;left: -30px;position: relative;'>Community Detection</div>",
        content: " the SARG is divided into a set of subgraphs with community detection algorithm."
      },{
        title: "<div class='text-center' style='top: -20px;left: -30px;position: relative;'>Feature Construction</div>",
        content: "the subgraphs of the new malware are matched with the fregraph-based features to generate a feature vector."
      }]
    });
    $(".ystep").setStep(3);
}
function drawlist(id,fileName,weight,xml){
    var dom = document.getElementById(id);
    var myChart = echarts.init(dom);

    var graph = echarts.dataTool.gexf.parse(xml);
    // console.log(echarts.dataTool.gexf.parse(xml));
    var nodeNum=graph.nodes.length;
    var edgeNum=graph.links.length;
    var sensitiveNodeNum=0;
    graph.nodes.forEach(function (node) {
        if(node.id.indexOf("Normal")==-1){node.name=node.id;sensitiveNodeNum++;}   //判断是否是红色节点.true则表示是红色节点
        node.symbolSize = 10;
        node.x = node.y = null;
        node.draggable = true;
     });
    // console.log(filename)
    option = {
        title: {
            text: "Weight: "+weight+"\n"+"Node Num : "+nodeNum+"\n"+"Edge Num : "+edgeNum+"\n"+"Sensitive Node Num :"
            +sensitiveNodeNum,
            top: 'top',
            left: 'center',
            textStyle:{
                fontWeight:'normal',
                fontSize:15
            }
        },
        tooltip: {},
        animation: true,
        radius : '50%',
        series : [
        {
            type: 'graph',
            layout: 'force',
            data: graph.nodes,
            links: graph.links,
            roam: true,
            top:'10%',
            edgeSymbol: ['circle', 'arrow'],
            edgeSymbolSize: [4, 10],
            focusNodeAdjacency: true,
            label: {
                emphasis: {
                    position: 'right',
                    show: true
                }
            },
            force: {
                repulsion: 65,
                gravity:0.3
            }
        }
        ]
    };

    myChart.setOption(option);

}

function drawmain(){

var dom = document.getElementById("kg");
var myChart = echarts.init(dom);
    myChart.showLoading();
var q=getCookie("q");
    $.ajax({
            type: "get",
            url: 'data/1.json',
            // url: 'http://'+ip+':8080/fanming/getGraph/get',
            data:{q:q},
            // cache:false,
            dataType: 'json',
            // async:false,
            success: function(json) {
            var xml=json.xml;
            myChart.hideLoading();
            var graph = echarts.dataTool.gexf.parse(xml);

            var nodeNum=graph.nodes.length;
            var edgeNum=graph.links.length;
            var sensitiveNodeNum=0;
            graph.nodes.forEach(function (node) {
                node.symbolSize = 10;
                if(node.id.indexOf("Normal")==-1){node.name=node.id;sensitiveNodeNum++;}   //判断是否是红色节点.true则表示是红色节点
                node.x = node.y = null;
                node.draggable = true;
             });


            option = {
                title: {
                    //"File Name : "+json.fileName+"\n"+
                    text: "Node Num : "+nodeNum+"\n"+"Edge Num : "+edgeNum+"\n"+"Sensitive Node Num :"
            +sensitiveNodeNum,
                    top: 'top',
                    bottom:'auto',
                    left: 'center',
                    textStyle:{
                        fontWeight:'normal',
                        fontSize:15
                    }
                },
                tooltip: {},
                animation: true,
                radius : '50%',
                series : [
                {
                    type: 'graph',
                    layout: 'force',
                    // name:"鼠标放到点上的标题",
                    data: graph.nodes,
                    links: graph.links,
                    roam: true,
                    // top:'10%',
                    edgeSymbol: ['circle', 'arrow'],
                    edgeSymbolSize: [4,9],
                    focusNodeAdjacency: true,
                    label: {
                        emphasis: {
                            position: 'right',
                            show: true
                        }
                    },
                    force: {
                        repulsion: 40,
                        gravity:0.3
                    }
                }
                ]
            };

            myChart.setOption(option);
            }
        });


}

function result(){
    $(".ystep").setStep(4);
    var q=getCookie("q");
    $.ajax({
        // url: 'http://'+ip+':8080/fanming/getGraph/getresult',
        url:'data/3.txt',
        type: 'get',
        dataType: 'text',
        data: {q: q},
    })
    .done(function(result) {
        console.log("success");
        $("#myModalLabel").text( 'Result')
        $("#myModalContent").html(result);
        $('#myModal').modal('toggle');
    })
    .fail(function() {
        console.log("error");
    })
    .always(function() {
        console.log("complete");
    });
    
    
}