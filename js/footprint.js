var myChart = echarts.init(document.getElementById('myMap'));

var data = [
    {name: '石家庄', value: ['1995.3 ～ forever', '你出生在这里~']},
    {name: '张家口', value: ['1996.1 ～ forever', '我呱呱坠地~']},
    {name: '秦皇岛', value: ['2015.4', '第一次一起远行。']},
    {name: '北京', value: ['2016 ～ now', '注定是充满回忆的地方。']},
    {name: '天津-北辰', value: ['2014.9 ～ 2018.6', '大学，让我们相遇。']},
    {name: '西安', value: ['Furture', '再次远行。']},
];
var geoCoordMap = {
    '石家庄':[114.502464,38.045475],
    '张家口':[114.884094,40.8119],
    '秦皇岛':[119.58658,39.94253],
    '北京':[116.40529,39.904987],
    '天津-北辰':[117.13482,39.225555],
    '西安':[108.94802,34.26316],
};

var convertData = function (data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
        var geoCoord = geoCoordMap[data[i].name];
        if (geoCoord) {
            res.push({
                name: data[i].name,
                value: geoCoord.concat(data[i].value)
            });
            //console.log(res)
        }
    }
    return res;
};

option = {
    // backgroundColor: '#404a59',
    title: {
    },
    tooltip: {
        trigger: 'item',
        padding: 10,
        backgroundColor: '#222',
        borderColor: '#777',
        borderWidth: 1,
        formatter: function (params) {
            name = params.name
            time = params.value[2]
            describe = params.value[3]
            return '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">'
                + name
                + '</div>'
                + time
                + '<br>'
                + describe;
        }
    },
    geo: {
        map: 'china',
        label: {
            emphasis: {
                show: false
            }
        },
        roam: false,
        itemStyle: {
            normal: {
                areaColor: '#e6e6e6',
                borderColor: '#111'
            },
            emphasis: {
                areaColor: '#cccccc'
            }
        }
    },
    series : [
        {
            name: '足迹',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            data: convertData(data),
            showEffectOn: 'render',
            rippleEffect: {
                brushType: 'stroke'
            },
            hoverAnimation: true,
            label: {
                normal: {
                    formatter: '{b}',
                    position: 'right',
                    show: true
                }
            },
            itemStyle: {
                normal: {
                    color: '#4d4d4d',
                    shadowBlur: 10,
                    shadowColor: '#333'
                }
            },
            zlevel: 1
        }
    ]
};

myChart.setOption(option);