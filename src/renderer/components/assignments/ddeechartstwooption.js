//scatter.js

export const option = {
    title: {
        text: "设备元数据分布",
        subtext: ""
    },
    tooltip: {
        trigger: "axis",
        showDelay: 0,
        axisPointer: {
            type: "cross",
            lineStyle: {
                type: "dashed",
                width: 1
            }
        }
    },
    legend: {
        data: ["脉冲数", "设备温度"]
    },
    xAxis: [
        {
            type: "value",
            min: 'dataMin',
            max: 'dataMax',
            splitLine: {
                show: true
            },
            power: 1,
            precision: 2,
            scale: true
        }
    ],
    yAxis: [
        {
            type: "value",
            min: 'dataMin',
            max: 'dataMax',
            splitLine: {
                show: true
            },
            power: 1,
            precision: 2,
            scale: true
        }
    ],
    dataZoom: [
        {
            type: 'slider',
            show: true,
            xAxisIndex: [0],
            start: 100,
            end: 200
        },
        {
            type: 'slider',
            show: true,
            yAxisIndex: [0],
            left: '93%',
            start: 100,
            end: 200
        },
        {
            type: 'inside',
            xAxisIndex: [0],
            start: 1,
            end: 35
        },
        {
            type: 'inside',
            yAxisIndex: [0],
            start: 29,
            end: 36
        }
    ],
    series: [
        {
            name: "脉冲数",
            type: "effectScatter",
            itemStyle: {
                normal: {
                    opacity: 0.8
                }
            },
            symbolSize: 14,
            data: [[111.2, 51.6],[111.2, 51.6], [172.9, 62.5], [153.4, 42], [160, 50], [147.2, 49.8], [168.2, 49.2], [175, 73.2], [157, 47.8], [167.6, 68.8], [159.5, 50.6], [175, 82.5], [166.8, 57.2], [176.5, 87.8], [170.2, 72.8], [174, 54.5], [173, 59.8], [179.9, 67.3], [170.5, 67.8], [162.6, 61.4]]
        },
        {
            name: "设备温度",
            type: "scatter",
            itemStyle: {
                normal: {
                    opacity: 1
                }
            },
            symbolSize: 14,
            // symbolSize: function (val) {
            //    //104,65.6 data中的值
            //     return val[1] * 0.1;
            // },
            data: [[104, 65.6], [164.1, 55.2], [163, 57], [171.5, 61.4], [184.2, 76.8], [174, 86.8], [182, 72], [167, 64.6], [177.8, 74.8], [180.3, 93.2], [180.3, 82.7], [177.8, 58], [177.8, 79.5], [177.8, 78.6], [177.8, 71.8], [177.8, 72], [177.8, 81.8], [180.3, 83.2]]
        }
    ]
}