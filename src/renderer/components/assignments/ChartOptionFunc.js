//散点图调用函数
//xData 不传参
//Ydata 设备元数据：脉冲数:xxx，设备温度:0
//lend 图例 ：脉冲数，设备温度 ...
export const myChart2OptionFun = (xData,YData,lend) => {
    var option = {
        title: {
            text: "mqtt散点图",
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
            top: 25,
            itemGap: 5,            // 间隔
            data: lend,
        },
        xAxis: [
            {
                scale: true,
				type:'value' ,
				//data:['0','1','2','3','4','5','6','7','8','9','10']
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
                type: 'inside',
                show: true,
                xAxisIndex: [0],
                start: 0,
                end : 100
            },
            {
                type: 'inside',
                show: true,
                yAxisIndex: [0],
                left: '93%',
                start: 0,
                end : 100
            }
        ],
        series:  YData
    }
    return option
}
//
