var ip="123.139.159.38";
// var ip="localhost";
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

$(".ystep").setStep(2);

var dom = document.getElementById("kg");

dom.style.height = window.innerHeight-20+'px';

var myChart = echarts.init(dom);
function getclass()
{  
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
                console.log(echarts.dataTool.gexf.parse(xml));

                var sensitiveNodeNum=0;
                graph.nodes.forEach(function (node) {
                    // node.itemStyle = null;
                    node.symbolSize = 10;
                    node.value = "";
                    if(node.id.indexOf("Normal")==-1){node.name=node.id;sensitiveNodeNum++;}   //判断是否是红色节点.true则表示是红色节点
                    

                // Use random x, y
                node.x = node.y = null;
                node.draggable = true;
                 });

                console.log(graph);
                $("#fileName").text(json.fileName);
                $("#nodeNum").text(graph.nodes.length);
                $("#edgeNum").text(graph.links.length);
                $("#sensitiveNodeNum").text(sensitiveNodeNum);
                option = {
                    // title: {
                    //     text: '图的标题',
                    //     subtext: '子标题',
                    //     top: 'top',
                    //     left: 'center'
                    // },
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
                        top:'5%',
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
                            repulsion: 66,
                            gravity:0.3
                        }
                    }
                    ]
                };

                myChart.setOption(option);
                }
            });


};
getclass();


